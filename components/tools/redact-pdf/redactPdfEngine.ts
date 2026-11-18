import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { StagedRedactFile, RedactionBox, RedactResult, RedactOptions } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForRedact(file: File): Promise<StagedRedactFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-redact-${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export async function applyRedactionsToPdf(
  file: StagedRedactFile,
  boxes: RedactionBox[],
  options: RedactOptions
): Promise<RedactResult> {
  const pdfDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const totalPages = pdfDoc.getPageCount();
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (const box of boxes) {
    if (box.page < 1 || box.page > totalPages) continue;
    const page = pages[box.page - 1];
    const { width: pWidth, height: pHeight } = page.getSize();

    // Convert from CSS top-left percentage to PDF bottom-left points
    const pdfX = (box.x / 100) * pWidth;
    const pdfWidth = (box.width / 100) * pWidth;
    const pdfHeight = (box.height / 100) * pHeight;
    const pdfY = pHeight - (box.y / 100) * pHeight - pdfHeight;

    const isWhiteout = box.style === "whiteout";
    const boxColor = isWhiteout ? rgb(1, 1, 1) : rgb(0, 0, 0);

    // Draw opaque barrier rectangle
    page.drawRectangle({
      x: pdfX,
      y: pdfY,
      width: pdfWidth,
      height: pdfHeight,
      color: boxColor,
      borderWidth: 0,
      opacity: 1.0,
    });

    // If redacted-label style, print [REDACTED] or custom overlay
    if (box.style === "redacted-label") {
      const labelText = options.customOverlayText || "REDACTED";
      const fontSize = Math.max(7, Math.min(pdfHeight * 0.55, 14));
      const textWidth = font.widthOfTextAtSize(labelText, fontSize);
      const textHeight = font.heightAtSize(fontSize);

      if (pdfWidth >= textWidth + 4 && pdfHeight >= textHeight + 2) {
        page.drawText(labelText, {
          x: pdfX + (pdfWidth - textWidth) / 2,
          y: pdfY + (pdfHeight - textHeight) / 2 + 1,
          size: fontSize,
          font,
          color: rgb(1, 1, 1),
        });
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_redacted.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    redactionsApplied: boxes.length,
    pageCount: totalPages,
  };
}
