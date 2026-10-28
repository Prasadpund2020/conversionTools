export type CompressionLevel = "extreme" | "recommended" | "low";

export interface CompressOptions {
  level: CompressionLevel;
  stripMetadata: boolean;
  cleanObjects: boolean;
  removeBookmarks: boolean;
}

export interface StagedCompressFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface CompressResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  originalSize: number;
  compressedSize: number;
  savedBytes: number;
  savingsPercentage: number;
  pageCount: number;
}
