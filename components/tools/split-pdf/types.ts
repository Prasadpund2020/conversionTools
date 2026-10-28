export type SplitMode = "extract-all" | "by-ranges" | "selected-single";

export interface SplitOptions {
  mode: SplitMode;
  rangesText: string; // e.g. "1-2, 3-5"
  selectedPages: number[]; // 1-indexed page numbers
  prefixFileName: string;
}

export interface StagedSplitFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface SplitResultFile {
  fileName: string;
  blob: Blob;
  downloadUrl: string;
  sizeBytes: number;
  pageCount: number;
}

export interface SplitResult {
  mode: SplitMode;
  files: SplitResultFile[];
  zipBlob?: Blob | null;
  zipDownloadUrl?: string | null;
  zipFileName?: string;
  totalOutputFiles: number;
}
