import { PDFDocument } from "pdf-lib";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt";
import { StagedProtectFile, ProtectOptions, ProtectResult } from "./types";

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function evaluatePasswordStrength(password: string): {
  score: number; // 0 to 100
  label: "Weak" | "Fair" | "Good" | "Strong";
  color: string;
} {
  if (!password) {
    return { score: 0, label: "Weak", color: "#ef4444" };
  }

  let score = 0;
  if (password.length >= 6) score += 25;
  if (password.length >= 10) score += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  if (/\d/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;

  if (score <= 35) return { score, label: "Weak", color: "#ef4444" };
  if (score <= 60) return { score, label: "Fair", color: "#f59e0b" };
  if (score <= 80) return { score, label: "Good", color: "#3b82f6" };
  return { score: 100, label: "Strong", color: "#10b981" };
}

export async function parsePdfForProtect(file: File): Promise<StagedProtectFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-protect-${Date.now()}`,
    name: file.name,
    size: file.size,
    pageCount,
    bytes,
  };
}

export async function protectPdfDocument(
  file: StagedProtectFile,
  options: ProtectOptions
): Promise<ProtectResult> {
  const password = options.userPassword.trim();
  if (!password) {
    throw new Error("A document password is required to encrypt the PDF.");
  }

  // Determine page count
  let pageCount = file.pageCount;
  try {
    const pdfDoc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
    pageCount = pdfDoc.getPageCount();
  } catch {
    // Keep fallback page count
  }

  // Algorithm selection: AES-256 (default, ISO 32000-2 standard) or RC4 128-bit (ISO 32000-1)
  const algorithm = options.encryptionStrength === "standard-rc4" ? "RC4" : "AES-256";

  const ownerPassword = options.ownerPassword?.trim() || password;

  const encryptedBytes = await encryptPDF(file.bytes, password, {
    algorithm,
    ownerPassword,
    allowPrinting: options.allowPrinting,
    allowCopying: options.allowCopying,
    allowModifying: options.allowModifying,
    allowAnnotating: options.allowModifying,
    allowFillingForms: true,
  });

  const blob = new Blob([encryptedBytes as unknown as BlobPart], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const fileName = `${baseName}_protected.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    sizeBytes: blob.size,
    pageCount,
  };
}

export async function createSampleProtectPdf(): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  page.drawText("Confidential Board Strategy Memo", {
    x: 50,
    y: 780,
    size: 22,
  });
  page.drawText(
    "This document demonstrates client-side 256-bit encryption and permission controls.",
    { x: 50, y: 740, size: 12 }
  );
  page.drawText("When protected, viewing requires the defined user password.", {
    x: 50,
    y: 710,
    size: 11,
  });

  const bytes = await pdfDoc.save();
  return new File([bytes as unknown as BlobPart], "Confidential_Board_Memo.pdf", {
    type: "application/pdf",
  });
}
