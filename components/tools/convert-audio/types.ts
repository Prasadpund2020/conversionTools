export type AudioTargetFormat = "mp3" | "wav" | "ogg" | "aac" | "flac";
export type AudioBitrate = 128 | 192 | 256 | 320;
export type AudioChannelMode = "stereo" | "mono";

export interface AudioConvertSource {
  fileName: string;
  fileSize: number;
  duration: number; // in seconds
  sampleRate: number;
  channels: number;
  audioBuffer: AudioBuffer | null;
  audioUrl?: string;
}

export interface AudioConvertOptions {
  targetFormat: AudioTargetFormat;
  bitrate: AudioBitrate;
  sampleRate: number; // 48000, 44100, 22050
  channelMode: AudioChannelMode;
  normalizeGain: boolean;
}

export interface AudioConvertResult {
  blob: Blob;
  url: string;
  fileSizeBytes: number;
  format: AudioTargetFormat;
  duration: number;
}
