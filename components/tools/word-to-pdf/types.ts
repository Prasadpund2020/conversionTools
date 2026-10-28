export interface WordDocRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  color?: string;
}

export interface WordDocParagraph {
  type: "heading1" | "heading2" | "heading3" | "paragraph" | "bullet" | "quote";
  runs: WordDocRun[];
  alignment?: "left" | "center" | "right" | "justify";
}

export interface WordDocTable {
  type: "table";
  rows: string[][];
}

export type WordDocElement = WordDocParagraph | WordDocTable;

export interface WordDocMeta {
  fileName: string;
  fileSize: number;
  title: string;
  author?: string;
  createdDate?: string;
  elements: WordDocElement[];
  wordCount: number;
  paragraphCount: number;
  tableCount: number;
  rawBuffer?: ArrayBuffer;
}

export type PageSizeOption = "A4" | "Letter" | "Legal";
export type OrientationOption = "portrait" | "landscape";
export type FontFamilyOption = "sans" | "serif" | "mono";
export type MarginOption = "normal" | "compact" | "wide";

export interface WordToPdfOptions {
  pageSize: PageSizeOption;
  orientation: OrientationOption;
  fontFamily: FontFamilyOption;
  margins: MarginOption;
  includePageNumbers: boolean;
  includeHeader: boolean;
  documentTitle: string;
  lineSpacing: number; // 1.2, 1.5, 2.0
}

export interface WordToPdfResult {
  pdfBlob: Blob;
  pdfUrl: string;
  pageCount: number;
  fileSizeBytes: number;
}
