export type MarkdownFontSize = 'small' | 'medium' | 'large';

export interface MarkdownToPdfOptions {
  fontSize: MarkdownFontSize;
  pageSize: 'A4' | 'Letter';
  includeHeader: boolean;
}

export interface MarkdownPdfResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  pageCount: number;
  sizeBytes: number;
}
