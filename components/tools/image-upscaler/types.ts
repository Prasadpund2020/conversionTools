export type UpscaleFactor = 2 | 4;
export type UpscaleAlgorithm = 'smooth' | 'sharp' | 'pixel-art';

export interface UpscaleOptions {
  factor: UpscaleFactor;
  algorithm: UpscaleAlgorithm;
  sharpenAmount: number; // 0 to 100
}

export interface StagedImageUpscalerFile {
  id: string;
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  imageUrl: string;
  imageElement: HTMLImageElement;
}

export interface UpscaleResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  width: number;
  height: number;
  sizeBytes: number;
}
