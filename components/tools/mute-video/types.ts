export interface MuteVideoMeta {
  fileName: string;
  fileSize: number;
  duration: number; // in seconds
  width: number;
  height: number;
  videoUrl: string;
  mimeType: string;
}

export type MuteOutputFormat = "mp4" | "webm";

export interface MuteOptions {
  outputFormat: MuteOutputFormat;
  playbackSpeed: number; // 1, 1.25, 1.5
}

export interface MuteResult {
  blob: Blob;
  url: string;
  fileSizeBytes: number;
  duration: number;
}
