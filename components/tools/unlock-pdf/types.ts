export interface StagedUnlockPdfFile {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
  isEncrypted: boolean;
  pageCount?: number;
}

export interface UnlockPdfResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  pageCount: number;
  sizeBytes: number;
}
