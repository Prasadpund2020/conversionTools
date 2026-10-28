import { PDFDocument, degrees } from "pdf-lib";
import { StagedOrganizeFile, PageCardItem, OrganizePdfResult } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForOrganize(file: File): Promise<{
  staged: StagedOrganizeFile;
  initialPages: PageCardItem[];
}> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  const initialPages: PageCardItem[] = Array.from({ length: pageCount }, (_, i) => ({
    id: `page-${i + 1}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    originalIndex: i,
    displayPageNumber: i + 1,
    rotation: 0,
  }));

  return {
    staged: {
      id: `pdf-org-${Date.now()}`,
      name: file.name,
      size: file.size,
      pageCount,
      bytes,
    },
    initialPages,
  };
}

export async function saveOrganizedPdf(
  file: StagedOrganizeFile,
  pages: PageCardItem[]
): Promise<OrganizePdfResult> {
  if (pages.length === 0) {
    throw new Error("Cannot save an empty PDF document. Please keep at least one page.");
  }

  const srcDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
  const newDoc = await PDFDocument.create();

  // Copy pages in the specified order
  for (const item of pages) {
    const [copiedPage] = await newDoc.copyPages(srcDoc, [item.originalIndex]);
    if (item.rotation !== 0) {
      const currentRot = copiedPage.getRotation().angle;
      copiedPage.setRotation(degrees((currentRot + item.rotation) % 360));
    }
    newDoc.addPage(copiedPage);
  }

  const pdfBytes = await newDoc.save({ useObjectStreams: true });
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_organized.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    pageCount: pages.length,
  };
}
