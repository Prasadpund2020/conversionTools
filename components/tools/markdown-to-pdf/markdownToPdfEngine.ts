import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { MarkdownToPdfOptions, MarkdownPdfResult } from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Word wrap helper for PDF text lines
 */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (!word) continue;
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.length > 0 ? lines : [''];
}

/**
 * Converts Markdown string into a styled PDF document
 */
export async function convertMarkdownToPdf(
  markdownText: string,
  docTitle: string,
  options: MarkdownToPdfOptions
): Promise<MarkdownPdfResult> {
  const doc = await PDFDocument.create();

  // Page dimensions (points: 1 in = 72 pt)
  // A4: 595.28 x 841.89 pt, Letter: 612 x 792 pt
  const [pageW, pageH] =
    options.pageSize === 'Letter' ? [612, 792] : [595.28, 841.89];

  const margin = 54; // 0.75 in
  const usableWidth = pageW - margin * 2;

  // Fonts
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  const fontMono = await doc.embedFont(StandardFonts.Courier);

  // Size scalers
  const baseSize = options.fontSize === 'small' ? 9.5 : options.fontSize === 'large' ? 12 : 10.5;
  const lineHeight = baseSize * 1.45;

  let currentPage = doc.addPage([pageW, pageH]);
  let cursorY = pageH - margin;

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY - neededHeight < margin) {
      currentPage = doc.addPage([pageW, pageH]);
      cursorY = pageH - margin;
    }
  };

  // Optional Header
  if (options.includeHeader && docTitle) {
    currentPage.drawText(docTitle, {
      x: margin,
      y: pageH - 36,
      size: 9,
      font: fontRegular,
      color: rgb(0.5, 0.55, 0.6),
    });
    currentPage.drawLine({
      start: { x: margin, y: pageH - 42 },
      end: { x: pageW - margin, y: pageH - 42 },
      thickness: 0.5,
      color: rgb(0.85, 0.88, 0.9),
    });
  }

  const rawLines = markdownText.split('\n');
  let inCodeBlock = false;

  for (let l = 0; l < rawLines.length; l++) {
    const raw = rawLines[l];
    const trimmed = raw.trim();

    // Fenced code blocks
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      cursorY -= 6;
      continue;
    }

    if (inCodeBlock) {
      checkPageBreak(lineHeight + 4);
      // Code background line
      currentPage.drawRectangle({
        x: margin,
        y: cursorY - 3,
        width: usableWidth,
        height: lineHeight + 3,
        color: rgb(0.95, 0.96, 0.98),
      });

      currentPage.drawText(raw.slice(0, 80), {
        x: margin + 6,
        y: cursorY,
        size: baseSize - 1,
        font: fontMono,
        color: rgb(0.15, 0.2, 0.3),
      });
      cursorY -= lineHeight;
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      checkPageBreak(18);
      cursorY -= 8;
      currentPage.drawLine({
        start: { x: margin, y: cursorY },
        end: { x: pageW - margin, y: cursorY },
        thickness: 0.75,
        color: rgb(0.8, 0.83, 0.88),
      });
      cursorY -= 12;
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      const text = trimmed.slice(2);
      checkPageBreak(36);
      cursorY -= 10;
      currentPage.drawText(text, {
        x: margin,
        y: cursorY,
        size: baseSize * 1.8,
        font: fontBold,
        color: rgb(0.08, 0.12, 0.2),
      });
      cursorY -= baseSize * 2.1;
      continue;
    } else if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3);
      checkPageBreak(30);
      cursorY -= 8;
      currentPage.drawText(text, {
        x: margin,
        y: cursorY,
        size: baseSize * 1.45,
        font: fontBold,
        color: rgb(0.12, 0.16, 0.25),
      });
      cursorY -= baseSize * 1.75;
      continue;
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4);
      checkPageBreak(24);
      cursorY -= 6;
      currentPage.drawText(text, {
        x: margin,
        y: cursorY,
        size: baseSize * 1.2,
        font: fontBold,
        color: rgb(0.15, 0.2, 0.3),
      });
      cursorY -= baseSize * 1.5;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const text = trimmed.replace(/^>\s*/, '');
      const wrapped = wrapText(text, Math.floor(usableWidth / (baseSize * 0.58)) - 4);
      checkPageBreak(wrapped.length * lineHeight + 8);

      const blockHeight = wrapped.length * lineHeight;
      currentPage.drawLine({
        start: { x: margin + 4, y: cursorY + 8 },
        end: { x: margin + 4, y: cursorY - blockHeight + 8 },
        thickness: 3,
        color: rgb(0.4, 0.55, 0.9),
      });

      for (const line of wrapped) {
        currentPage.drawText(line, {
          x: margin + 16,
          y: cursorY,
          size: baseSize,
          font: fontOblique,
          color: rgb(0.3, 0.35, 0.45),
        });
        cursorY -= lineHeight;
      }
      cursorY -= 6;
      continue;
    }

    // Lists (Bullet or Numbered)
    const bulletMatch = trimmed.match(/^([-*]|\d+\.)\s+(.+)/);
    if (bulletMatch) {
      const prefix = bulletMatch[1].match(/\d/) ? bulletMatch[1] : '•';
      const content = bulletMatch[2];
      const wrapped = wrapText(content, Math.floor(usableWidth / (baseSize * 0.58)) - 4);

      checkPageBreak(wrapped.length * lineHeight + 4);

      currentPage.drawText(prefix, {
        x: margin + 8,
        y: cursorY,
        size: baseSize,
        font: fontBold,
        color: rgb(0.2, 0.45, 0.85),
      });

      for (let w = 0; w < wrapped.length; w++) {
        currentPage.drawText(wrapped[w], {
          x: margin + 22,
          y: cursorY,
          size: baseSize,
          font: fontRegular,
          color: rgb(0.15, 0.2, 0.28),
        });
        cursorY -= lineHeight;
      }
      continue;
    }

    // Empty lines (paragraph breaks)
    if (!trimmed) {
      cursorY -= lineHeight * 0.6;
      continue;
    }

    // Standard Paragraph text with word wrap
    // Remove markdown inline markers for clean PDF rendering
    const cleanParagraph = trimmed
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1');

    const wrappedLines = wrapText(cleanParagraph, Math.floor(usableWidth / (baseSize * 0.58)));
    checkPageBreak(wrappedLines.length * lineHeight);

    for (const line of wrappedLines) {
      currentPage.drawText(line, {
        x: margin,
        y: cursorY,
        size: baseSize,
        font: fontRegular,
        color: rgb(0.12, 0.16, 0.24),
      });
      cursorY -= lineHeight;
    }
  }

  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
  const downloadUrl = URL.createObjectURL(blob);
  const baseName = docTitle.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase() || 'document';
  const fileName = `${baseName}.pdf`;

  return {
    blob,
    downloadUrl,
    fileName,
    pageCount: doc.getPageCount(),
    sizeBytes: pdfBytes.length,
  };
}
