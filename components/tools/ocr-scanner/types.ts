export interface OcrBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface OcrDetectedBlock {
  text: string;
  confidence: number;
  boundingBox: OcrBoundingBox;
}

export interface OcrImageMeta {
  fileName: string;
  fileSize: number;
  width: number;
  height: number;
  dataUrl: string;
}

export type OcrMode = "general" | "receipt" | "code" | "numbers";

export interface OcrOptions {
  mode: OcrMode;
  enhanceContrast: boolean;
  threshold: number; // 0-255 binarization threshold (default 128)
  invertColors: boolean;
  autoCleanText: boolean;
}

export interface OcrResult {
  fullText: string;
  blocks: OcrDetectedBlock[];
  wordCount: number;
  characterCount: number;
  lineCount: number;
  confidence: number;
  processingTimeMs: number;
}
