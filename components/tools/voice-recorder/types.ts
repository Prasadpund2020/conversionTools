export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped';

export interface RecordedAudioResult {
  blob: Blob;
  downloadUrl: string;
  duration: number;
  sizeBytes: number;
  mimeType: string;
  fileName: string;
}
