export interface AudioTrackItem {
  id: string;
  name: string;
  size: number;
  duration: number;
  sampleRate: number;
  numberOfChannels: number;
  audioBuffer: AudioBuffer;
}

export interface AudioJoinerOptions {
  crossfadeDuration: number; // in seconds: 0, 1, 2, 3
  outputFormat: 'wav';
}

export interface AudioJoinerResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  duration: number;
  sizeBytes: number;
  trackCount: number;
}
