export type PageNumberPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type PageNumberFormat =
  | "page-n" // Page 1
  | "page-n-of-total" // Page 1 of 12
  | "n-slash-total" // 1 / 12
  | "just-n" // 1
  | "bates-stamp"; // CONF-000001

export type PageNumberFont = "Helvetica" | "TimesRoman" | "Courier";

export interface PageNumberOptions {
  position: PageNumberPosition;
  format: PageNumberFormat;
  font: PageNumberFont;
  fontSize: number;
  fontColor: string; // hex
  startNumber: number;
  batesPrefix: string;
  batesPadding: number; // e.g. 6 -> 000001
  marginPoints: number; // distance from edge
  pagesRange: string; // "all" or e.g. "2-10"
}

export interface StagedNumberPdfFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface PageNumberResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
}
