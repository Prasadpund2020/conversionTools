import { PDFDocument } from "pdf-lib";
import { StagedCompressFile, CompressOptions, CompressResult } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForCompression(file: File): Promise<StagedCompressFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-comp-${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export async function compressPdfDocument(
  file: StagedCompressFile,
  options: CompressOptions
): Promise<CompressResult> {
  const srcDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const totalPages = srcDoc.getPageCount();

  // Create clean target document to discard obsolete revisions and dangling pointers
  const compDoc = await PDFDocument.create();

  // Copy all pages into the pristine new container
  const pageIndices = srcDoc.getPageIndices();
  const copiedPages = await compDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => compDoc.addPage(page));

  // Metadata handling
  if (options.stripMetadata) {
    compDoc.setTitle("");
    compDoc.setAuthor("");
    compDoc.setSubject("");
    compDoc.setKeywords([]);
    compDoc.setProducer("FileLab In-Browser Compressor");
    compDoc.setCreator("FileLab");
  } else {
    try {
      const title = srcDoc.getTitle();
      if (title) compDoc.setTitle(title);
      const author = srcDoc.getAuthor();
      if (author) compDoc.setAuthor(author);
    } catch {
      // ignore
    }
  }

  // Save with modern Flate object stream compression
  // useObjectStreams: true groups indirect objects into compressed stream blocks
  const compressedBytes = await compDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    updateFieldAppearances: false,
  });

  // Calculate actual compression vs original
  let finalBytes: Uint8Array = compressedBytes;
  let finalSize = compressedBytes.length;

  // In case the file had very little overhead and compressed size is comparable,
  // we ensure optimal bytes are delivered
  if (finalSize > file.size && options.level !== "extreme") {
    finalBytes = file.bytes;
    finalSize = file.size;
  }

  const originalSize = file.size;
  const savedBytes = Math.max(0, originalSize - finalSize);
  const savingsPercentage = originalSize > 0 ? Math.round((savedBytes / originalSize) * 100) : 0;

  const blob = new Blob([finalBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_compressed.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    originalSize,
    compressedSize: finalSize,
    savedBytes,
    savingsPercentage,
    pageCount: totalPages,
  };
}

export async function createSampleCompressPdf(): Promise<File> {
  const pdfDoc = await PDFDocument.create();

  // Add metadata to demonstrate stripping
  pdfDoc.setTitle("Internal Diagnostic Specifications 2026");
  pdfDoc.setAuthor("FileLab Enterprise Architecture Team");
  pdfDoc.setSubject("Comprehensive Benchmark Test for Object Stream Compression");
  pdfDoc.setKeywords(["pdf", "compression", "benchmark", "enterprise", "confidential"]);

  // Create 4 pages with lots of redundant content to compress
  for (let i = 1; i <= 4; i++) {
    const page = pdfDoc.addPage([595.28, 841.89]);
    page.drawText(`High Density Benchmark Section ${i}`, {
      x: 50,
      y: 780,
      size: 20,
    });
    page.drawText(
      `This benchmark document contains full metadata headers and object references designed for stream optimization.`,
      { x: 50, y: 740, size: 11 }
    );
    for (let line = 0; line < 15; line++) {
      page.drawText(`Record #${line + 1}: Data stream block identifier [HASH-99824-${line * 37}]`, {
        x: 50,
        y: 690 - line * 20,
        size: 9,
      });
    }
  }

  const bytes = await pdfDoc.save();
  return new File([bytes as unknown as BlobPart], "Diagnostic_Report_Large.pdf", {
    type: "application/pdf",
  });
}
