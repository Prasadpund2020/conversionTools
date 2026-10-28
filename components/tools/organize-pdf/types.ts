export interface PageCardItem {
  id: string;
  originalIndex: number; // 0-indexed original page
  displayPageNumber: number; // 1-indexed original page
  rotation: number; // 0, 90, 180, 270
}

export interface StagedOrganizeFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export interface OrganizePdfResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
}
