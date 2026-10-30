import { PDFDocument } from 'pdf-lib';
import { decryptPDF } from '@pdfsmaller/pdf-decrypt';
import { StagedUnlockPdfFile, UnlockPdfResult } from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Checks whether a PDF file requires a password or is already decrypted
 */
export async function parsePdfForUnlock(file: File): Promise<StagedUnlockPdfFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  let isEncrypted = false;
  let pageCount: number | undefined = undefined;

  try {
    // Attempt standard load
    const doc = await PDFDocument.load(bytes);
    pageCount = doc.getPageCount();
    isEncrypted = false;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message.toLowerCase() : '';
    if (msg.includes('encrypt') || msg.includes('password') || msg.includes('protect')) {
      isEncrypted = true;
    } else {
      // Try with ignoreEncryption to test if it's an encrypted PDF
      try {
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        pageCount = doc.getPageCount();
        isEncrypted = true;
      } catch {
        isEncrypted = true;
      }
    }
  }

  return {
    id: `unlock-${Date.now()}`,
    name: file.name,
    size: file.size,
    bytes,
    isEncrypted,
    pageCount,
  };
}

/**
 * Decrypts a PDF with the user-provided password and saves an unencrypted copy
 */
export async function unlockPdfDocument(
  file: StagedUnlockPdfFile,
  password: string
): Promise<UnlockPdfResult> {
  let decryptedBytes: Uint8Array;
  let pageCount = file.pageCount || 1;

  try {
    // Attempt modern full-stream decryption (AES-256 and RC4)
    decryptedBytes = await decryptPDF(file.bytes, password);
    const doc = await PDFDocument.load(decryptedBytes, { ignoreEncryption: true });
    pageCount = doc.getPageCount();
  } catch (decryptErr: unknown) {
    // If decryptPDF threw an invalid password error, bubble it up
    const decryptMsg = decryptErr instanceof Error ? decryptErr.message : '';
    if (decryptMsg.toLowerCase().includes('incorrect password') || decryptMsg.toLowerCase().includes('password does not match')) {
      throw new Error('Incorrect password. Please verify the password and try again.');
    }

    // Fallback: try pdf-lib for permissions-only restriction removal
    try {
      const doc = await PDFDocument.load(file.bytes, { ignoreEncryption: true });
      pageCount = doc.getPageCount();

      const cleanDoc = await PDFDocument.create();
      const pageIndices = Array.from({ length: pageCount }, (_, i) => i);
      const copiedPages = await cleanDoc.copyPages(doc, pageIndices);
      copiedPages.forEach((page) => cleanDoc.addPage(page));

      decryptedBytes = await cleanDoc.save();
    } catch {
      throw new Error(
        'Incorrect password or unsupported encryption format. Please check the password and try again.'
      );
    }
  }

  const blob = new Blob([decryptedBytes as unknown as BlobPart], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}_unlocked.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    pageCount,
    sizeBytes: decryptedBytes.length,
  };
}
