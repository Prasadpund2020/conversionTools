export interface StagedDamagedPdf {
  id: string;
  name: string;
  size: number;
  bytes: Uint8Array;
  initialError?: string;
}

export interface RepairOptions {
  forceTrailerRebuild: boolean;
  stripCorruptAnnotations: boolean;
  sanitizeStreams: boolean;
}

export interface RepairDiagnosticItem {
  type: "info" | "warning" | "success" | "recovered";
  message: string;
  timestamp: string;
}

export interface RepairResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  originalSize: number;
  repairedSize: number;
  pagesRecovered: number;
  diagnostics: RepairDiagnosticItem[];
}
