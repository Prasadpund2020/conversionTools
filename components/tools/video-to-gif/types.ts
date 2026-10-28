export type GifFps = 10 | 15 | 24;
export type GifResolution = 320 | 480 | 640;

export interface GifOptions {
  startTime: number;
  endTime: number;
  fps: GifFps;
  width: GifResolution;
  speed: number;
  loop: boolean;
}

export interface StagedVideoFile {
  id: string;
  name: string;
  size: number;
  duration: number;
  videoUrl: string;
  videoElement: HTMLVideoElement;
}

export interface GifResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  frameCount: number;
  width: number;
  height: number;
}
