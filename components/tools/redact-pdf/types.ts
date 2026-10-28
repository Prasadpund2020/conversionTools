export type RedactionStyle = "blackout" | "whiteout" | "redacted-label";

export interface RedactionBox {
  id: string;
  page: number; // 1-indexed
  x: number; // percentage (0 to 100) or points
  y: number; // percentage (0 to 100) or points
  width: number;
  height: number;
  style: RedactionStyle;
}

export interface RedactOptions {
  activeStyle: RedactionStyle;
  customOverlayText: string;
  autoSearchText: string;
}

export interface StagedRedactFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface RedactResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  redactionsApplied: number;
  pageCount: number;
}
