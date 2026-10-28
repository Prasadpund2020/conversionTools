import { StagedVideoFile, GifOptions, GifResult } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(1);
  return `${mins}:${parseFloat(secs) < 10 ? "0" : ""}${secs}`;
}

export async function parseVideoForGif(file: File): Promise<StagedVideoFile> {
  const videoUrl = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.preload = "auto";
  video.muted = true;
  video.playsInline = true;
  video.src = videoUrl;

  await new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error("Unable to parse video file format."));
  });

  return {
    id: `vid-gif-${Date.now()}`,
    name: file.name,
    size: file.size,
    duration: video.duration || 5,
    videoUrl,
    videoElement: video,
  };
}

// Minimal fast GIF89a stream encoder
class SimpleGifEncoder {
  private width: number;
  private height: number;
  private delay100ths: number;
  private buffer: number[] = [];

  constructor(width: number, height: number, fps: number) {
    this.width = width;
    this.height = height;
    this.delay100ths = Math.max(2, Math.round(100 / fps));
    this.writeHeader();
  }

  private writeHeader() {
    // 'GIF89a'
    const header = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];
    for (const b of header) this.buffer.push(b);

    // Logical Screen Width & Height (LE 16-bit)
    this.buffer.push(this.width & 0xff, (this.width >> 8) & 0xff);
    this.buffer.push(this.height & 0xff, (this.height >> 8) & 0xff);

    // GCT Flag: no global color table initially (0x70)
    this.buffer.push(0x70, 0x00, 0x00);

    // Netscape 2.0 Loop Extension
    const loopExt = [
      0x21, 0xff, 0x0b, 0x4e, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2e, 0x30,
      0x03, 0x01, 0x00, 0x00, 0x00,
    ];
    for (const b of loopExt) this.buffer.push(b);
  }

  public addFrame(imageData: ImageData) {
    const data = imageData.data;
    const totalPixels = this.width * this.height;

    // Build 64-color quantized palette (4 levels per RGB channel)
    // 4x4x4 = 64 colors for fast in-browser palette indexing
    const palette: number[][] = [];
    for (let r = 0; r < 4; r++) {
      for (let g = 0; g < 4; g++) {
        for (let b = 0; b < 4; b++) {
          palette.push([Math.round(r * 85), Math.round(g * 85), Math.round(b * 85)]);
        }
      }
    }
    // Pad palette to 64 entries (power of 2: 2^6 = 64, bit size = 6)
    while (palette.length < 64) palette.push([0, 0, 0]);

    // Graphic Control Extension (delay)
    this.buffer.push(0x21, 0xf9, 0x04, 0x00);
    this.buffer.push(this.delay100ths & 0xff, (this.delay100ths >> 8) & 0xff);
    this.buffer.push(0x00, 0x00);

    // Image Descriptor
    this.buffer.push(0x2c, 0x00, 0x00, 0x00, 0x00);
    this.buffer.push(this.width & 0xff, (this.width >> 8) & 0xff);
    this.buffer.push(this.height & 0xff, (this.height >> 8) & 0xff);

    // Local Color Table Flag: has LCT, size = 64 (0x85)
    this.buffer.push(0x85);

    // Write Local Color Table (64 * 3 = 192 bytes)
    for (const color of palette) {
      this.buffer.push(color[0], color[1], color[2]);
    }

    // Convert pixels to palette indices
    const indices = new Uint8Array(totalPixels);
    for (let i = 0; i < totalPixels; i++) {
      const pIdx = i * 4;
      const pr = data[pIdx];
      const pg = data[pIdx + 1];
      const pb = data[pIdx + 2];
      const rLevel = Math.min(3, Math.floor(pr / 64));
      const gLevel = Math.min(3, Math.floor(pg / 64));
      const bLevel = Math.min(3, Math.floor(pb / 64));
      indices[i] = rLevel * 16 + gLevel * 4 + bLevel;
    }

    // Encode indices as uncompressed LZW raster data
    this.buffer.push(0x06); // Minimum LZW code size = 6
    let offset = 0;
    while (offset < totalPixels) {
      const blockSize = Math.min(254, totalPixels - offset);
      this.buffer.push(blockSize);
      for (let j = 0; j < blockSize; j++) {
        this.buffer.push(indices[offset + j]);
      }
      offset += blockSize;
    }
    this.buffer.push(0x00); // Block terminator
  }

  public finish(): Blob {
    this.buffer.push(0x3b); // Trailer
    return new Blob([new Uint8Array(this.buffer)], { type: "image/gif" });
  }
}

export async function convertVideoToGif(
  videoFile: StagedVideoFile,
  options: GifOptions,
  onProgress?: (progress: number) => void
): Promise<GifResult> {
  const video = videoFile.videoElement;
  const start = Math.max(0, options.startTime);
  const end = Math.min(videoFile.duration, Math.max(start + 0.5, options.endTime));
  const duration = end - start;

  const aspect = video.videoHeight / (video.videoWidth || 1);
  const outWidth = options.width;
  const outHeight = Math.round(outWidth * aspect);

  const canvas = document.createElement("canvas");
  canvas.width = outWidth;
  canvas.height = outHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  const totalFrames = Math.max(5, Math.min(100, Math.round(duration * options.fps)));
  const interval = duration / totalFrames;

  const encoder = new SimpleGifEncoder(outWidth, outHeight, options.fps);

  for (let f = 0; f < totalFrames; f++) {
    const targetTime = start + f * interval;
    video.currentTime = targetTime;

    await new Promise<void>((resolve) => {
      const handleSeek = () => {
        video.removeEventListener("seeked", handleSeek);
        resolve();
      };
      video.addEventListener("seeked", handleSeek);
    });

    ctx.drawImage(video, 0, 0, outWidth, outHeight);
    const imgData = ctx.getImageData(0, 0, outWidth, outHeight);
    encoder.addFrame(imgData);

    if (onProgress) {
      onProgress(Math.round(((f + 1) / totalFrames) * 100));
    }
  }

  const blob = encoder.finish();
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = videoFile.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_animated.gif`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    frameCount: totalFrames,
    width: outWidth,
    height: outHeight,
  };
}
