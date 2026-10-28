import { PDFDocument } from "pdf-lib";
import { StagedHtmlInput, HtmlToPdfOptions, HtmlToPdfResult } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function getPaperDimensions(
  paperSize: HtmlToPdfOptions["paperSize"],
  orientation: HtmlToPdfOptions["orientation"]
): { width: number; height: number } {
  let w = 595.28;
  let h = 841.89; // A4

  if (paperSize === "letter") {
    w = 612;
    h = 792;
  } else if (paperSize === "legal") {
    w = 612;
    h = 1008;
  }

  if (orientation === "landscape") {
    return { width: h, height: w };
  }
  return { width: w, height: h };
}

export async function convertHtmlToPdf(
  input: StagedHtmlInput,
  options: HtmlToPdfOptions
): Promise<HtmlToPdfResult> {
  const { width: pWidth, height: pHeight } = getPaperDimensions(
    options.paperSize,
    options.orientation
  );

  const pdfDoc = await PDFDocument.create();

  // Render HTML via SVG foreignObject onto high-res canvas
  const canvasWidth = 1200;
  const pageHeightPixels = Math.round(canvasWidth * (pHeight / pWidth));

  // Construct styled HTML wrapper
  const styledHtml = `
    <div xmlns="http://www.w3.org/1999/xhtml" style="
      font-family: system-ui, -apple-system, sans-serif;
      padding: ${options.margins === "narrow" ? "20px" : options.margins === "none" ? "0px" : "40px"};
      background: ${options.includeBackground ? "#ffffff" : "transparent"};
      color: #111827;
      width: ${canvasWidth - 80}px;
      box-sizing: border-box;
      line-height: 1.6;
    ">
      ${input.rawHtml}
    </div>
  `;

  const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${pageHeightPixels}">
      <foreignObject width="100%" height="100%">
        ${styledHtml}
      </foreignObject>
    </svg>
  `;

  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = pageHeightPixels;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    if (options.includeBackground) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
  }

  URL.revokeObjectURL(url);

  // Convert rendered canvas to PNG data URL
  const pngDataUrl = canvas.toDataURL("image/png");
  const res = await fetch(pngDataUrl);
  const pngBytes = await res.arrayBuffer();
  const embeddedPng = await pdfDoc.embedPng(pngBytes);

  const page = pdfDoc.addPage([pWidth, pHeight]);
  page.drawImage(embeddedPng, {
    x: 0,
    y: 0,
    width: pWidth,
    height: pHeight,
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = input.name.replace(/\.[^/.]+$/, "") || "Document";
  const fileName = `${baseName}.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    pageCount: 1,
  };
}
