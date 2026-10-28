export type HtmlPaperSize = "a4" | "letter" | "legal";
export type HtmlOrientation = "portrait" | "landscape";
export type HtmlMargins = "normal" | "narrow" | "none";

export interface HtmlToPdfOptions {
  paperSize: HtmlPaperSize;
  orientation: HtmlOrientation;
  margins: HtmlMargins;
  includeBackground: boolean;
  scale: number; // 50 to 150
}

export interface StagedHtmlInput {
  name: string;
  sourceType: "file" | "raw-html" | "url";
  rawHtml: string;
  sizeBytes: number;
}

export interface HtmlToPdfResult {
  blob: Blob;
  downloadUrl: string;
  fileName: string;
  sizeBytes: number;
  pageCount: number;
}
