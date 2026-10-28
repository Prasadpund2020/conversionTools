export interface ExcelSheetData {
  name: string;
  rows: string[][];
  rowCount: number;
  columnCount: number;
}

export interface ExcelSpreadsheetMeta {
  fileName: string;
  fileSize: number;
  sheets: ExcelSheetData[];
  activeSheetIndex: number;
  totalRows: number;
  totalCols: number;
  totalCells: number;
}

export type TableTheme = "emerald" | "classic" | "minimal" | "slate";
export type ExcelPageSize = "A4" | "Letter" | "Legal";
export type ExcelOrientation = "landscape" | "portrait";

export interface ExcelToPdfOptions {
  pageSize: ExcelPageSize;
  orientation: ExcelOrientation;
  theme: TableTheme;
  showGridlines: boolean;
  zebraStriping: boolean;
  repeatHeaderOnPages: boolean;
  includePageNumbers: boolean;
  includeSheetTitle: boolean;
  fontSize: number; // 7, 8, 9, 10
  selectedSheetIndex: number;
}

export interface ExcelToPdfResult {
  pdfBlob: Blob;
  pdfUrl: string;
  pageCount: number;
  fileSizeBytes: number;
}
