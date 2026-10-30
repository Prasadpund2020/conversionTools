import { DownloadResult, YouTubeVideoMetadata } from "./types";

/**
 * Extracts YouTube video ID from various standard URL structures or recognized test tokens:
 * - https://www.youtube.com/watch?v=xxxx
 * - https://youtu.be/xxxx
 * - https://www.youtube.com/shorts/xxxx
 * - https://www.youtube.com/embed/xxxx
 * - raw 11-char ID
 */
export function extractYouTubeVideoId(input: string): string | null {
  const cleanInput = input.trim();
  if (!cleanInput) return null;

  if (cleanInput === "test-authorized" || cleanInput === "authorized-test") {
    return "test-authorized";
  }

  // Check 11-character video ID directly
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanInput)) {
    return cleanInput;
  }

  const patterns = [
    /(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const regex of patterns) {
    const match = cleanInput.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Client-side verification of MP4 ISO Base Media container signature.
 * Ensures the response received is not HTML, JSON, all-zeros dummy buffer, or truncated.
 */
export function verifyMp4Header(buffer: Uint8Array): {
  isValid: boolean;
  brand?: string;
  error?: string;
} {
  if (buffer.length < 16) {
    return {
      isValid: false,
      error: "Corrupted or incomplete file: Data is too short (< 16 bytes) to contain an MP4 container header.",
    };
  }

  // Check for HTML/XML or JSON responses mistakenly renamed to MP4
  const headerPreview = new TextDecoder()
    .decode(buffer.slice(0, Math.min(120, buffer.length)))
    .trim()
    .toLowerCase();

  if (
    headerPreview.startsWith("<!doctype") ||
    headerPreview.startsWith("<html") ||
    headerPreview.startsWith("<?xml")
  ) {
    return {
      isValid: false,
      error: "Invalid media response: Source returned an HTML/XML document instead of an MP4 media stream.",
    };
  }

  if (headerPreview.startsWith("{") || headerPreview.startsWith("[")) {
    return {
      isValid: false,
      error: "Invalid media response: Source returned a JSON payload instead of an MP4 media stream.",
    };
  }

  // Check for dummy all-zero buffer (e.g. the old 1024 zero-byte bug)
  let allZero = true;
  for (let i = 0; i < Math.min(128, buffer.length); i++) {
    if (buffer[i] !== 0) {
      allZero = false;
      break;
    }
  }
  if (allZero) {
    return {
      isValid: false,
      error: "Corrupted or placeholder file: Data consists entirely of blank zero bytes.",
    };
  }

  // Check standard ISO BMFF box header at bytes 4-7 for 'ftyp'
  const isFtyp =
    buffer[4] === 0x66 && // 'f'
    buffer[5] === 0x74 && // 't'
    buffer[6] === 0x79 && // 'y'
    buffer[7] === 0x70;   // 'p'

  if (!isFtyp) {
    return {
      isValid: false,
      error: "Corrupted or incomplete file: Missing 'ftyp' box in MP4 container header.",
    };
  }

  const brand = new TextDecoder().decode(buffer.slice(8, 12)).trim();
  return { isValid: true, brand };
}

/**
 * Fetches real YouTube metadata via official YouTube oEmbed API through our server route
 */
export async function resolveYouTubeVideo(
  urlOrId: string,
  authorizedSource?: string
): Promise<YouTubeVideoMetadata> {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) {
    throw new Error(
      "Invalid YouTube URL. Please enter a valid YouTube video link (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)."
    );
  }

  const queryParams = new URLSearchParams({ url: urlOrId.trim() });
  if (authorizedSource) {
    queryParams.set("authorizedSource", authorizedSource.trim());
  }

  let res: Response;
  try {
    res = await fetch(`/api/youtube/info?${queryParams.toString()}`);
  } catch {
    throw new Error("Network error while connecting to YouTube service.");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        data.error || "Video unavailable. The video may be private, deleted, or region-restricted."
      );
    }
    if (res.status === 400) {
      throw new Error(data.error || "Invalid YouTube URL format.");
    }
    throw new Error(
      data.error || `Failed to fetch video information (HTTP ${res.status}).`
    );
  }

  return data as YouTubeVideoMetadata;
}

/**
 * Downloads a genuine MP4 video file from an authorized media source.
 * Strict validation: HTTP status, Content-Type, binary signature ('ftyp'), and file size.
 */
export async function downloadAuthorizedMp4(
  video: YouTubeVideoMetadata
): Promise<DownloadResult> {
  if (!video.hasAuthorizedDownload || !video.authorizedDownloadUrl) {
    throw new Error(
      "Download not authorized: Official YouTube APIs do not provide raw downloadable MP4 bytes for arbitrary YouTube videos. Direct MP4 downloads are supported only when an authorized downloadable media stream is provided."
    );
  }

  const sanitizedTitle = (video.title || "video")
    .replace(/[^a-zA-Z0-9_\-\s]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 80);

  const fileName = `${sanitizedTitle}.mp4`;

  let response: Response;
  try {
    response = await fetch("/api/youtube/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceUrl: video.authorizedDownloadUrl,
        fileName,
        title: video.title,
      }),
    });
  } catch {
    throw new Error("Network error during download transfer.");
  }

  if (!response.ok) {
    const errorJson = await response.json().catch(() => null);
    if (errorJson && errorJson.error) {
      throw new Error(errorJson.error);
    }
    if (response.status === 403) {
      throw new Error("Download not authorized for this media source.");
    }
    if (response.status === 404) {
      throw new Error("Video unavailable: The requested media stream was not found.");
    }
    throw new Error(`Unsupported download source: Remote responded with HTTP ${response.status}.`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("video/mp4") && !contentType.includes("video/")) {
    throw new Error(
      `Invalid media response: Server returned Content-Type "${contentType}" instead of a valid video stream.`
    );
  }

  const rawBytes = await response.arrayBuffer();
  const uint8 = new Uint8Array(rawBytes);

  // Validate file size: must not be 0 or small placeholder
  if (uint8.length < 10240) {
    throw new Error(
      `Corrupted or incomplete file: Downloaded file size (${uint8.length} bytes) is too small to be a genuine MP4 video.`
    );
  }

  // Verify binary container signature
  const headerCheck = verifyMp4Header(uint8);
  if (!headerCheck.isValid) {
    throw new Error(headerCheck.error || "Corrupted or incomplete file: Missing valid MP4 container signature.");
  }

  // Create genuine MP4 Blob
  const blob = new Blob([uint8], { type: "video/mp4" });
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);

  return {
    blob,
    fileName,
    fileSizeBytes: uint8.length,
    fileSizeFormatted: formatBytes(uint8.length),
  };
}
