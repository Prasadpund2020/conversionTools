import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import { StagedPdfFile, WatermarkOptions, WatermarkResult, WatermarkPosition } from "./types";

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

export async function parsePdfDocument(file: File): Promise<StagedPdfFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-${Date.now()}`,
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

function getPositionCoordinates(
  pos: WatermarkPosition,
  pageWidth: number,
  pageHeight: number,
  elementWidth: number,
  elementHeight: number
): { x: number; y: number } {
  const margin = 50;
  switch (pos) {
    case "top-left":
      return { x: margin, y: pageHeight - margin - elementHeight };
    case "top-center":
      return { x: (pageWidth - elementWidth) / 2, y: pageHeight - margin - elementHeight };
    case "top-right":
      return { x: pageWidth - margin - elementWidth, y: pageHeight - margin - elementHeight };
    case "middle-left":
      return { x: margin, y: (pageHeight - elementHeight) / 2 };
    case "center":
      return { x: (pageWidth - elementWidth) / 2, y: (pageHeight - elementHeight) / 2 };
    case "middle-right":
      return { x: pageWidth - margin - elementWidth, y: (pageHeight - elementHeight) / 2 };
    case "bottom-left":
      return { x: margin, y: margin };
    case "bottom-center":
      return { x: (pageWidth - elementWidth) / 2, y: margin };
    case "bottom-right":
      return { x: pageWidth - margin - elementWidth, y: margin };
    default:
      return { x: (pageWidth - elementWidth) / 2, y: (pageHeight - elementHeight) / 2 };
  }
}

export async function applyWatermarkToPdf(
  file: StagedPdfFile,
  options: WatermarkOptions
): Promise<WatermarkResult> {
  const pdfDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const targetIndices = parseTargetPages(options.pagesRange, totalPages);

  // Font setup
  let selectedFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  if (options.font === "TimesRoman") {
    selectedFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  } else if (options.font === "Courier") {
    selectedFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
  }

  // Image setup if provided
  let embeddedImage: any = null;
  if (options.type === "image" && options.imageDataUrl) {
    const res = await fetch(options.imageDataUrl);
    const imgBytes = await res.arrayBuffer();
    if (options.imageDataUrl.includes("image/png")) {
      embeddedImage = await pdfDoc.embedPng(imgBytes);
    } else {
      embeddedImage = await pdfDoc.embedJpg(imgBytes);
    }
  }

  const textColor = parseHexColor(options.color);
  const pages = pdfDoc.getPages();

  for (const pageIdx of targetIndices) {
    const page = pages[pageIdx];
    const { width, height } = page.getSize();

    if (options.type === "text" && options.text.trim()) {
      const text = options.text.trim();
      const textWidth = selectedFont.widthOfTextAtSize(text, options.fontSize);
      const textHeight = selectedFont.heightAtSize(options.fontSize);

      if (options.tiled) {
        // Tile 3x3 pattern
        const cols = 3;
        const rows = 3;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = (width / cols) * (c + 0.5);
            const cy = (height / rows) * (r + 0.5);
            page.drawText(text, {
              x: cx - textWidth / 2,
              y: cy - textHeight / 2,
              size: options.fontSize * 0.75,
              font: selectedFont,
              color: textColor,
              opacity: options.opacity,
              rotate: degrees(options.rotation),
            });
          }
        }
      } else {
        const { x, y } = getPositionCoordinates(
          options.position,
          width,
          height,
          textWidth,
          textHeight
        );

        page.drawText(text, {
          x,
          y,
          size: options.fontSize,
          font: selectedFont,
          color: textColor,
          opacity: options.opacity,
          rotate: degrees(options.rotation),
        });
      }
    } else if (options.type === "image" && embeddedImage) {
      const imgWidth = Math.min(width * 0.4, 250);
      const scale = imgWidth / embeddedImage.width;
      const imgHeight = embeddedImage.height * scale;

      if (options.tiled) {
        const cols = 3;
        const rows = 3;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const cx = (width / cols) * (c + 0.5);
            const cy = (height / rows) * (r + 0.5);
            page.drawImage(embeddedImage, {
              x: cx - (imgWidth * 0.6) / 2,
              y: cy - (imgHeight * 0.6) / 2,
              width: imgWidth * 0.6,
              height: imgHeight * 0.6,
              opacity: options.opacity,
              rotate: degrees(options.rotation),
            });
          }
        }
      } else {
        const { x, y } = getPositionCoordinates(
          options.position,
          width,
          height,
          imgWidth,
          imgHeight
        );

        page.drawImage(embeddedImage, {
          x,
          y,
          width: imgWidth,
          height: imgHeight,
          opacity: options.opacity,
          rotate: degrees(options.rotation),
        });
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_watermarked.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    pageCount: totalPages,
  };
}

export async function createSampleWatermarkPdf(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Create 3 demo pages
  for (let i = 1; i <= 3; i++) {
    const page = pdfDoc.addPage([600, 400]);
    page.drawText(`FileLab Sample Document`, {
      x: 50,
      y: 340,
      size: 20,
      font: boldFont,
      color: rgb(0.05, 0.4, 0.55),
    });
    page.drawText(`Page ${i} of 3 • Confidential Quarterly Report`, {
      x: 50,
      y: 310,
      size: 12,
      font,
      color: rgb(0.3, 0.35, 0.4),
    });
    page.drawText(`This sample document demonstrates client-side PDF watermarking.`, {
      x: 50,
      y: 260,
      size: 11,
      font,
      color: rgb(0.2, 0.2, 0.2),
    });
    page.drawText(`All stamps and watermarks are embedded directly in your browser.`, {
      x: 50,
      y: 240,
      size: 11,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  const bytes = await pdfDoc.save();
  return new File([bytes as unknown as BlobPart], "Pitch_Deck_Confidential.pdf", {
    type: "application/pdf",
  });
}
