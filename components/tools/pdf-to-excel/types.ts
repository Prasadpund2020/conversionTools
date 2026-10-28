export interface StagedPdfToExcelFile {
  id: string;
  name: string;
  size: number;
  pageCount: number;
  bytes: Uint8Array;
}

export type TableDetectionMode = "auto" | "comma-tab" | "whitespace-columns";
export type ExportSpreadsheetFormat = "xlsx" | "csv" | "json";

export interface PdfToExcelOptions {
  detectionMode: TableDetectionMode;
  exportFormat: ExportSpreadsheetFormat;
  includeHeaders: boolean;
  activeSheetPage: number;
}

export interface ExtractedTableSheet {
  pageNumber: number;
  headers: string[];
  rows: string[][];
  rowCount: number;
  columnCount: number;
}

export interface PdfToExcelResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  totalSheets: number;
  totalRows: number;
  format: ExportSpreadsheetFormat;
}
