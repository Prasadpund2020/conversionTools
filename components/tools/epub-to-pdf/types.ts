export interface EpubChapter {
  id: string;
  title: string;
  content: string[]; // paragraphs
  wordCount: number;
}

export interface EpubBookMeta {
  fileName: string;
  fileSize: number;
  title: string;
  author: string;
  language: string;
  publisher?: string;
  description?: string;
  coverDataUrl?: string;
  chapters: EpubChapter[];
  totalWords: number;
  totalChapters: number;
}

export type BookTrimSize = "6x9" | "5x8" | "A4" | "Letter";
export type BookFontFamily = "serif" | "sans";

export interface EpubToPdfOptions {
  trimSize: BookTrimSize;
  fontFamily: BookFontFamily;
  fontSize: number; // 10, 11, 12, 13
  lineSpacing: number; // 1.4, 1.6, 1.8
  includeCoverPage: boolean;
  includeTableOfContents: boolean;
  includeRunningHeader: boolean;
  includePageNumbers: boolean;
  selectedChapterIndex: number; // -1 for all
}

export interface EpubToPdfResult {
  pdfBlob: Blob;
  pdfUrl: string;
  pageCount: number;
  fileSizeBytes: number;
}
