export type WatermarkType = "text" | "image";
export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type WatermarkLayer = "front" | "behind";
export type WatermarkFont = "Helvetica" | "TimesRoman" | "Courier";

export interface WatermarkOptions {
  type: WatermarkType;
  text: string;
  font: WatermarkFont;
  fontSize: number;
  color: string; // hex
  opacity: number; // 0 to 1
  rotation: number; // degrees, e.g. -45, 0, 90
  position: WatermarkPosition;
  layer: WatermarkLayer;
  tiled: boolean;
  pagesRange: string; // "all" or e.g. "1-5, 8"
  imageFile?: File | null;
  imageDataUrl?: string | null;
}

export interface StagedPdfFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface WatermarkResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
}
