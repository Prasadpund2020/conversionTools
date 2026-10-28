export interface AudioMeta {
  fileName: string;
  fileSize: number;
  duration: number; // in seconds
  sampleRate: number;
  channels: number;
  audioBuffer: AudioBuffer | null;
  audioUrl?: string;
}

export type BoostOutputFormat = "wav" | "mp3";

export interface BoosterOptions {
  boostMultiplier: number; // 1.0 to 3.0 (100% to 300%)
  limiterEnabled: boolean;
  bassBoostDb: number; // 0 to 12 dB
  trebleBoostDb: number; // 0 to 8 dB
  outputFormat: BoostOutputFormat;
}

export interface BoosterResult {
  blob: Blob;
  url: string;
  fileSizeBytes: number;
  renderedBuffer: AudioBuffer;
}
