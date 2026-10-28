export interface VideoMeta {
  fileName: string;
  fileSize: number;
  duration: number; // in seconds
  width: number;
  height: number;
  videoUrl: string;
  mimeType: string;
}

export type TrimOutputFormat = "mp4" | "webm";
export type VideoResolutionOption = "original" | "1080p" | "720p" | "480p";

export interface TrimOptions {
  startTime: number; // in seconds
  endTime: number; // in seconds
  outputFormat: TrimOutputFormat;
  resolution: VideoResolutionOption;
  playbackSpeed: number; // 0.5, 1, 1.25, 1.5, 2
  removeAudio: boolean;
}

export interface TrimResult {
  blob: Blob;
  url: string;
  fileSizeBytes: number;
  trimmedDuration: number;
}
