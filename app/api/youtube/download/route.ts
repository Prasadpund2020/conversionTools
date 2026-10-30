import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs";
import path from "path";

const RequestSchema = z.object({
  sourceUrl: z.string().min(1, "Media source URL is required"),
  fileName: z.string().optional(),
  title: z.string().optional(),
});

/**
 * Checks ISO Base Media File Format (MP4) container signature:
 * Bytes 4-7 must equal ASCII "ftyp" (0x66, 0x74, 0x79, 0x70)
 */
function isValidMp4Container(buffer: Uint8Array): { isValid: boolean; brand?: string; reason?: string } {
  if (buffer.length < 16) {
    return { isValid: false, reason: "File too small (< 16 bytes) to contain MP4 header." };
  }

  // Check if buffer is HTML/XML
  const headerStr = new TextDecoder().decode(buffer.slice(0, Math.min(100, buffer.length))).trim().toLowerCase();
  if (headerStr.startsWith("<!doctype") || headerStr.startsWith("<html") || headerStr.startsWith("<?xml")) {
    return { isValid: false, reason: "Received HTML or XML error page instead of media stream." };
  }

  // Check if buffer is JSON
  if (headerStr.startsWith("{") || headerStr.startsWith("[")) {
    return { isValid: false, reason: "Received JSON response instead of media stream." };
  }

  // Check for dummy all-zero buffer (like the old 1024 zero bytes)
  let allZero = true;
  for (let i = 0; i < Math.min(128, buffer.length); i++) {
    if (buffer[i] !== 0) {
      allZero = false;
      break;
    }
  }
  if (allZero) {
    return { isValid: false, reason: "Corrupted or placeholder buffer of all zeros detected." };
  }

  // ISO BMFF box signature check: offset 4-7 must be 'ftyp'
  const isFtyp =
    buffer[4] === 0x66 && // 'f'
    buffer[5] === 0x74 && // 't'
    buffer[6] === 0x79 && // 'y'
    buffer[7] === 0x70;   // 'p'

  if (!isFtyp) {
    return { isValid: false, reason: "Missing 'ftyp' container signature at byte offset 4." };
  }

  const brand = new TextDecoder().decode(buffer.slice(8, 12));
  return { isValid: true, brand };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid download request. An authorized downloadable source is required." },
        { status: 400 }
      );
    }

    const { sourceUrl, fileName, title } = parsed.data;

    // Check if user is asking for arbitrary YouTube video download without authorized stream
    if (
      sourceUrl.includes("youtube.com") ||
      sourceUrl.includes("youtu.be")
    ) {
      return NextResponse.json(
        {
          error:
            "Download not authorized: Official YouTube APIs do not provide downloadable MP4 video bytes for arbitrary YouTube videos. Bypassing YouTube's restrictions or scraping unauthorized streams is not supported. An authorized downloadable media source is required.",
        },
        { status: 403 }
      );
    }

    let fileBuffer: Buffer;
    let contentType = "video/mp4";

    // Scenario A: Local authorized sample file (/samples/flower.mp4)
    if (sourceUrl.startsWith("/samples/") || sourceUrl === "flower.mp4") {
      const cleanRelative = sourceUrl.replace(/^\/+/, "");
      const localFilePath = path.join(process.cwd(), "public", cleanRelative);

      if (!fs.existsSync(localFilePath)) {
        return NextResponse.json(
          { error: "Unsupported download source: Local authorized media file not found." },
          { status: 404 }
        );
      }

      fileBuffer = fs.readFileSync(localFilePath);
    } else {
      // Scenario B: Remote authorized media stream
      let remoteRes: Response;
      try {
        remoteRes = await fetch(sourceUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });
      } catch {
        return NextResponse.json(
          { error: "Network error: Failed to connect to authorized media source." },
          { status: 502 }
        );
      }

      if (!remoteRes.ok) {
        return NextResponse.json(
          {
            error: `Unsupported download source: Remote source responded with HTTP ${remoteRes.status}.`,
          },
          { status: 502 }
        );
      }

      const remoteContentType = remoteRes.headers.get("content-type") || "";
      if (
        remoteContentType.includes("text/html") ||
        remoteContentType.includes("application/json") ||
        remoteContentType.includes("application/xml")
      ) {
        return NextResponse.json(
          {
            error: `Invalid media response: Source returned non-video content (${remoteContentType}).`,
          },
          { status: 422 }
        );
      }

      if (remoteContentType.includes("video/")) {
        contentType = remoteContentType;
      }

      const arrayBuf = await remoteRes.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuf);
    }

    // Validate size: must be at least 10 KB to be a valid video container
    if (fileBuffer.length < 10240) {
      return NextResponse.json(
        {
          error: `Corrupted or incomplete file: Retrieved file size (${fileBuffer.length} bytes) is too small to be a genuine video.`,
        },
        { status: 422 }
      );
    }

    // Validate MP4 container signature ('ftyp' box)
    const verification = isValidMp4Container(new Uint8Array(fileBuffer));
    if (!verification.isValid) {
      return NextResponse.json(
        {
          error: `Corrupted or incomplete file: ${verification.reason || "Invalid MP4 container signature."}`,
        },
        { status: 422 }
      );
    }

    const safeTitle = (title || "video")
      .replace(/[^a-zA-Z0-9_\-\s]/g, "")
      .trim()
      .replace(/\s+/g, "_")
      .slice(0, 80);

    const outFileName = fileName || `${safeTitle}.mp4`;

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", `attachment; filename="${outFileName}"`);
    headers.set("Content-Length", fileBuffer.length.toString());
    headers.set("X-Media-Brand", verification.brand || "isom");
    headers.set("Cache-Control", "no-store");

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Download processing error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
