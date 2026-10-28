export interface StagedAudioFile {
  id: string;
  name: string;
  size: number;
  type: string;
  duration: number;
  sampleRate: number;
  numberOfChannels: number;
  audioBuffer: AudioBuffer;
}

export interface AudioSpeedOptions {
  speed: number; // e.g. 0.5 to 2.5
  preservePitch: boolean;
  semitones: number; // -12 to +12
}

export interface ProcessedAudioResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  duration: number;
  sizeBytes: number;
}
