import { PDFDocument } from "pdf-lib";
import { StagedComparePdf, CompareAuditResult, PageDiffSummary } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForComparison(file: File): Promise<StagedComparePdf> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-comp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export async function performPdfComparison(
  docA: StagedComparePdf,
  docB: StagedComparePdf
): Promise<CompareAuditResult> {
  const pdfA = await PDFDocument.load(docA.bytes, { ignoreEncryption: true });
  const pdfB = await PDFDocument.load(docB.bytes, { ignoreEncryption: true });

  const countA = pdfA.getPageCount();
  const countB = pdfB.getPageCount();
  const maxPages = Math.max(countA, countB);

  const pagesA = pdfA.getPages();
  const pagesB = pdfB.getPages();

  const diffs: PageDiffSummary[] = [];
  let totalScore = 0;

  for (let i = 0; i < maxPages; i++) {
    const pageNum = i + 1;
    const pageA = i < countA ? pagesA[i] : null;
    const pageB = i < countB ? pagesB[i] : null;

    if (!pageA || !pageB) {
      diffs.push({
        pageNumber: pageNum,
        isDifferent: true,
        similarityScore: 0,
        sizeDifferenceBytes: 0,
      });
      continue;
    }

    const sizeA = pageA.getSize();
    const sizeB = pageB.getSize();

    const dimensionMatch =
      Math.abs(sizeA.width - sizeB.width) < 0.5 && Math.abs(sizeA.height - sizeB.height) < 0.5;

    // Structural heuristic calculation
    const rotMatch = pageA.getRotation().angle === pageB.getRotation().angle;
    let score = 100;
    if (!dimensionMatch) score -= 30;
    if (!rotMatch) score -= 20;

    // Byte slice variance sample
    const sampleLen = Math.min(docA.bytes.length, docB.bytes.length);
    if (sampleLen > 0) {
      let byteDiffCount = 0;
      const step = Math.max(1, Math.floor(sampleLen / 200));
      for (let s = 0; s < sampleLen; s += step) {
        if (docA.bytes[s] !== docB.bytes[s]) {
          byteDiffCount++;
        }
      }
      const variance = (byteDiffCount / (sampleLen / step)) * 30;
      score = Math.max(10, Math.min(100, Math.round(score - variance)));
    }

    const isDiff = score < 95;
    totalScore += score;

    diffs.push({
      pageNumber: pageNum,
      isDifferent: isDiff,
      similarityScore: score,
      sizeDifferenceBytes: Math.abs(docA.size - docB.size),
    });
  }

  const overall = maxPages > 0 ? Math.round(totalScore / maxPages) : 100;

  return {
    docAName: docA.name,
    docBName: docB.name,
    totalPagesA: countA,
    totalPagesB: countB,
    pageDiffs: diffs,
    overallSimilarity: overall,
  };
}
