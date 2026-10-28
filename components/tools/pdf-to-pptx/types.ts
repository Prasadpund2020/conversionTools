export type PptxSlideRatio = '16:9' | '4:3' | 'original';

export interface PptxOptions {
  ratio: PptxSlideRatio;
  quality: number; // 0.8 - 0.95
}

export interface StagedPdfToPptxFile {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
  pageCount: number;
}

export interface PptxResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  slideCount: number;
  sizeBytes: number;
}
