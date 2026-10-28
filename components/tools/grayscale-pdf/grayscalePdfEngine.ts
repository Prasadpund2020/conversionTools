import { PDFDocument } from 'pdf-lib';
import {
  StagedGrayscalePdfFile,
  GrayscaleOptions,
  GrayscalePdfResult,
} from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export async function parsePdfForGrayscale(file: File): Promise<StagedGrayscalePdfFile> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdfDoc.getPageCount();

  return {
    id: `pdf-gray-${Date.now()}`,
    name: file.name,
    size: file.size,
    bytes,
    pageCount,
  };
}

/**
 * Converts each page of the PDF into a grayscale/B&W rendered canvas and repacks into a clean PDF
 */
export async function convertPdfToGrayscale(
  file: StagedGrayscalePdfFile,
  options: GrayscaleOptions,
  onProgress?: (progress: number, status: string) => void
): Promise<GrayscalePdfResult> {
  const pdfjsLib = await import('pdfjs-dist');
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
  }

  const pdf = await pdfjsLib.getDocument({ data: file.bytes as any }).promise;
  const numPages = pdf.numPages;

  const outDoc = await PDFDocument.create();
  const scale = options.dpi / 72; // 72 is standard PDF point resolution

  const contrastFactor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));

  for (let p = 1; p <= numPages; p++) {
    if (onProgress) {
      onProgress(Math.round(((p - 1) / numPages) * 100), `Converting page ${p} of ${numPages}...`);
    }

    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) continue;

    // Render original page to canvas
    await (page.render({
      canvasContext: ctx,
      viewport,
      canvas,
    } as any)).promise;

    // Apply Pixel-level Grayscale / Threshold transformation
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Standard ITU-R BT.601 perceptual luminance
      let lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Brightness & Contrast adjustment
      lum = contrastFactor * (lum - 128) + 128 + options.brightness;
      lum = Math.max(0, Math.min(255, lum));

      if (options.mode === 'pure-bw') {
        // High contrast threshold binarization
        lum = lum > 135 ? 255 : 0;
      } else if (options.mode === 'high-contrast') {
        // Boost darks to black and lights to clean white
        if (lum > 210) lum = 255;
        else if (lum < 50) lum = 0;
      }

      data[i] = lum;
      data[i + 1] = lum;
      data[i + 2] = lum;
    }

    ctx.putImageData(imgData, 0, 0);

    // Get JPEG binary
    const pageJpegDataUrl = canvas.toDataURL('image/jpeg', 0.88);
    const pageImage = await outDoc.embedJpg(pageJpegDataUrl);

    // Add page with original point dimensions
    const origWidth = viewport.width / scale;
    const origHeight = viewport.height / scale;
    const newPage = outDoc.addPage([origWidth, origHeight]);

    newPage.drawImage(pageImage, {
      x: 0,
      y: 0,
      width: origWidth,
      height: origHeight,
    });
  }

  if (onProgress) {
    onProgress(100, 'Saving monochrome PDF...');
  }

  const resultBytes = await outDoc.save();
  const blob = new Blob([resultBytes as unknown as BlobPart], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}_grayscale.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    pageCount: numPages,
    sizeBytes: resultBytes.length,
  };
}
