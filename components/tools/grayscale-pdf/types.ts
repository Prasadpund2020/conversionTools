export type GrayscaleMode = 'grayscale' | 'high-contrast' | 'pure-bw';
export type GrayscaleDpi = 150 | 200 | 300;

export interface GrayscaleOptions {
  mode: GrayscaleMode;
  dpi: GrayscaleDpi;
  brightness: number; // -50 to 50
  contrast: number; // -50 to 50
}

export interface StagedGrayscalePdfFile {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
  pageCount: number;
}

export interface GrayscalePdfResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  pageCount: number;
  sizeBytes: number;
}
