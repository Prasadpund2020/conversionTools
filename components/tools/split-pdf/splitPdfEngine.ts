import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { StagedSplitFile, SplitOptions, SplitResult, SplitResultFile } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForSplitting(file: File): Promise<StagedSplitFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-split-${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export function parseRanges(rangesStr: string, totalPages: number): number[][] {
  const result: number[][] = [];
  const parts = rangesStr.split(",").map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end)) {
        const minP = Math.max(1, Math.min(start, end));
        const maxP = Math.min(totalPages, Math.max(start, end));
        const rangePages: number[] = [];
        for (let p = minP; p <= maxP; p++) {
          rangePages.push(p);
        }
        if (rangePages.length > 0) result.push(rangePages);
      }
    } else {
      const p = parseInt(part, 10);
      if (!isNaN(p) && p >= 1 && p <= totalPages) {
        result.push([p]);
      }
    }
  }

  return result.length > 0 ? result : [Array.from({ length: totalPages }, (_, i) => i + 1)];
}

export async function executeSplitPdf(
  file: StagedSplitFile,
  options: SplitOptions
): Promise<SplitResult> {
  const srcDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const prefix = options.prefixFileName.trim() || baseName;

  const resultFiles: SplitResultFile[] = [];

  if (options.mode === "extract-all") {
    // Each page becomes an individual PDF
    for (let i = 0; i < totalPages; i++) {
      const newDoc = await PDFDocument.create();
      const [copiedPage] = await newDoc.copyPages(srcDoc, [i]);
      newDoc.addPage(copiedPage);

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const fileName = `${prefix}_page_${i + 1}.pdf`;

      resultFiles.push({
        fileName,
        blob,
        downloadUrl,
        sizeBytes: blob.size,
        pageCount: 1,
      });
    }
  } else if (options.mode === "by-ranges") {
    // Each range group becomes a separate PDF
    const ranges = parseRanges(options.rangesText, totalPages);
    for (let rIdx = 0; rIdx < ranges.length; rIdx++) {
      const pageList = ranges[rIdx];
      const newDoc = await PDFDocument.create();
      // zero-indexed
      const zeroIndices = pageList.map((p) => p - 1);
      const copiedPages = await newDoc.copyPages(srcDoc, zeroIndices);
      copiedPages.forEach((p) => newDoc.addPage(p));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const fileName = `${prefix}_range_${pageList[0]}-${pageList[pageList.length - 1]}.pdf`;

      resultFiles.push({
        fileName,
        blob,
        downloadUrl,
        sizeBytes: blob.size,
        pageCount: pageList.length,
      });
    }
  } else {
    // selected-single: Combines selectedPages into one new PDF
    const pagesToKeep = options.selectedPages.length > 0 ? options.selectedPages : [1];
    const newDoc = await PDFDocument.create();
    const zeroIndices = pagesToKeep.map((p) => p - 1).filter((idx) => idx >= 0 && idx < totalPages);
    const copiedPages = await newDoc.copyPages(srcDoc, zeroIndices);
    copiedPages.forEach((p) => newDoc.addPage(p));

    const pdfBytes = await newDoc.save();
    const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
    const downloadUrl = URL.createObjectURL(blob);
    const fileName = `${prefix}_extracted.pdf`;

    resultFiles.push({
      fileName,
      blob,
      downloadUrl,
      sizeBytes: blob.size,
      pageCount: pagesToKeep.length,
    });
  }

  // If more than 1 file, also zip them together
  let zipBlob: Blob | null = null;
  let zipDownloadUrl: string | null = null;
  let zipFileName = `${prefix}_split_bundle.zip`;

  if (resultFiles.length > 1) {
    const zip = new JSZip();
    for (const rf of resultFiles) {
      zip.file(rf.fileName, rf.blob);
    }
    zipBlob = await zip.generateAsync({ type: "blob" });
    zipDownloadUrl = URL.createObjectURL(zipBlob);
  }

  return {
    mode: options.mode,
    files: resultFiles,
    zipBlob,
    zipDownloadUrl,
    zipFileName,
    totalOutputFiles: resultFiles.length,
  };
}

export async function createSampleSplitPdf(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  // Create 6 demo pages
  for (let i = 1; i <= 6; i++) {
    const page = pdfDoc.addPage([595.28, 841.89]);
    page.drawText(`Document Section ${i}`, {
      x: 50,
      y: 780,
      size: 24,
    });
    page.drawText(`Page ${i} of 6 • Sample Multi-Page Split File`, {
      x: 50,
      y: 740,
      size: 14,
    });
    page.drawText(`This page was generated for testing page range splitting and extraction.`, {
      x: 50,
      y: 680,
      size: 12,
    });
  }

  const bytes = await pdfDoc.save();
  return new File([bytes as unknown as BlobPart], "Annual_Report_6_Pages.pdf", {
    type: "application/pdf",
  });
}
