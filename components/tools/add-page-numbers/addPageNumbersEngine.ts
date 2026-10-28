import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import {
  StagedNumberPdfFile,
  PageNumberOptions,
  PageNumberResult,
  PageNumberPosition,
} from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function parseHexColor(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) / 255 || 0;
  const g = parseInt(clean.substring(2, 4), 16) / 255 || 0;
  const b = parseInt(clean.substring(4, 6), 16) / 255 || 0;
  return rgb(r, g, b);
}

export async function parsePdfForNumbering(file: File): Promise<StagedNumberPdfFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-num-${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export function parseTargetPages(rangeStr: string, totalPages: number): number[] {
  if (!rangeStr || rangeStr.toLowerCase() === "all") {
    return Array.from({ length: totalPages }, (_, i) => i);
  }
  const pages = new Set<number>();
  const parts = rangeStr.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [start, end] = trimmed.split("-").map((n) => parseInt(n.trim(), 10));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
          pages.add(i - 1);
        }
      }
    } else {
      const num = parseInt(trimmed, 10);
      if (!isNaN(num) && num >= 1 && num <= totalPages) {
        pages.add(num - 1);
      }
    }
  }
  return Array.from(pages).sort((a, b) => a - b);
}

export function formatPageNumberText(
  pageIndex: number, // 0-indexed in sequence
  totalPages: number,
  options: PageNumberOptions
): string {
  const currentNum = options.startNumber + pageIndex;

  switch (options.format) {
    case "page-n":
      return `Page ${currentNum}`;
    case "page-n-of-total":
      return `Page ${currentNum} of ${totalPages}`;
    case "n-slash-total":
      return `${currentNum} / ${totalPages}`;
    case "just-n":
      return `${currentNum}`;
    case "bates-stamp": {
      const prefix = options.batesPrefix.trim();
      const paddedNum = String(currentNum).padStart(options.batesPadding, "0");
      return prefix ? `${prefix}-${paddedNum}` : paddedNum;
    }
    default:
      return `${currentNum}`;
  }
}

function calculateCoordinates(
  pos: PageNumberPosition,
  pageWidth: number,
  pageHeight: number,
  textWidth: number,
  textHeight: number,
  margin: number
): { x: number; y: number } {
  switch (pos) {
    case "top-left":
      return { x: margin, y: pageHeight - margin - textHeight };
    case "top-center":
      return { x: (pageWidth - textWidth) / 2, y: pageHeight - margin - textHeight };
    case "top-right":
      return { x: pageWidth - margin - textWidth, y: pageHeight - margin - textHeight };
    case "bottom-left":
      return { x: margin, y: margin };
    case "bottom-center":
      return { x: (pageWidth - textWidth) / 2, y: margin };
    case "bottom-right":
      return { x: pageWidth - margin - textWidth, y: margin };
    default:
      return { x: (pageWidth - textWidth) / 2, y: margin };
  }
}

export async function addPageNumbersToPdf(
  file: StagedNumberPdfFile,
  options: PageNumberOptions
): Promise<PageNumberResult> {
  const pdfDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const targetIndices = parseTargetPages(options.pagesRange, totalPages);

  let font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  if (options.font === "TimesRoman") {
    font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  } else if (options.font === "Courier") {
    font = await pdfDoc.embedFont(StandardFonts.Courier);
  }

  const textColor = parseHexColor(options.fontColor);
  const pages = pdfDoc.getPages();

  let targetSeqIndex = 0;
  for (let i = 0; i < totalPages; i++) {
    if (!targetIndices.includes(i)) continue;

    const page = pages[i];
    const { width, height } = page.getSize();
    const stampText = formatPageNumberText(targetSeqIndex, totalPages, options);
    targetSeqIndex++;

    const textWidth = font.widthOfTextAtSize(stampText, options.fontSize);
    const textHeight = font.heightAtSize(options.fontSize);

    const { x, y } = calculateCoordinates(
      options.position,
      width,
      height,
      textWidth,
      textHeight,
      options.marginPoints
    );

    page.drawText(stampText, {
      x,
      y,
      size: options.fontSize,
      font,
      color: textColor,
    });
  }

  const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_numbered.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    pageCount: totalPages,
  };
}
