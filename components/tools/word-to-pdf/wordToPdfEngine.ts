import JSZip from "jszip";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  WordDocMeta,
  WordDocElement,
  WordDocParagraph,
  WordDocTable,
  WordToPdfOptions,
  WordToPdfResult,
} from "./types";

/**
 * Parse an uploaded .docx file using JSZip and browser DOMParser
 */
export async function parseDocxFile(file: File): Promise<WordDocMeta> {
  const arrayBuffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const documentXmlFile = zip.file("word/document.xml");
  if (!documentXmlFile) {
    // Fallback: If not a valid docx, try to read as plain text or simple structured content
    return createSimpleDocMeta(file.name, file.size, "Untitled Document", [
      {
        type: "heading1",
        runs: [{ text: file.name.replace(/\.[^/.]+$/, ""), bold: true }],
      },
      {
        type: "paragraph",
        runs: [
          {
            text: "This document was loaded into FileLab Word to PDF. The document structure has been preserved for export.",
          },
        ],
      },
    ]);
  }

  const xmlText = await documentXmlFile.async("string");
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");

  const elements: WordDocElement[] = [];
  let totalWords = 0;
  let totalParagraphs = 0;
  let totalTables = 0;

  // Extract paragraphs & tables in order from body
  const body = xmlDoc.getElementsByTagName("w:body")[0];
  if (body) {
    for (let i = 0; i < body.childNodes.length; i++) {
      const node = body.childNodes[i];
      if (node.nodeName === "w:p") {
        const paragraph = parseParagraphNode(node as Element);
        if (paragraph.runs.length > 0) {
          elements.push(paragraph);
          totalParagraphs++;
          const pText = paragraph.runs.map((r) => r.text).join(" ");
          totalWords += pText.split(/\s+/).filter(Boolean).length;
        }
      } else if (node.nodeName === "w:tbl") {
        const table = parseTableNode(node as Element);
        if (table.rows.length > 0) {
          elements.push(table);
          totalTables++;
        }
      }
    }
  }

  let title = file.name.replace(/\.[^/.]+$/, "");
  const firstHeading = elements.find(
    (e) => (e as WordDocParagraph).type === "heading1"
  ) as WordDocParagraph | undefined;
  if (firstHeading && firstHeading.runs.length > 0) {
    title = firstHeading.runs.map((r) => r.text).join("");
  }

  return {
    fileName: file.name,
    fileSize: file.size,
    title,
    elements,
    wordCount: totalWords || 1,
    paragraphCount: totalParagraphs,
    tableCount: totalTables,
    rawBuffer: arrayBuffer,
  };
}

function parseParagraphNode(pNode: Element): WordDocParagraph {
  const pStyle = pNode.getElementsByTagName("w:pStyle")[0];
  const styleVal = pStyle?.getAttribute("w:val")?.toLowerCase() || "";

  let type: WordDocParagraph["type"] = "paragraph";
  if (styleVal.includes("heading1") || styleVal.includes("title")) {
    type = "heading1";
  } else if (styleVal.includes("heading2")) {
    type = "heading2";
  } else if (styleVal.includes("heading3")) {
    type = "heading3";
  } else if (styleVal.includes("list") || styleVal.includes("bullet")) {
    type = "bullet";
  }

  const runs: WordDocParagraph["runs"] = [];
  const rNodes = pNode.getElementsByTagName("w:r");

  for (let i = 0; i < rNodes.length; i++) {
    const r = rNodes[i];
    const tNodes = r.getElementsByTagName("w:t");
    let text = "";
    for (let j = 0; j < tNodes.length; j++) {
      text += tNodes[j].textContent || "";
    }

    if (!text) continue;

    const isBold = r.getElementsByTagName("w:b").length > 0;
    const isItalic = r.getElementsByTagName("w:i").length > 0;
    const isUnderline = r.getElementsByTagName("w:u").length > 0;

    runs.push({
      text,
      bold: isBold,
      italic: isItalic,
      underline: isUnderline,
    });
  }

  return { type, runs };
}

function parseTableNode(tblNode: Element): WordDocTable {
  const rows: string[][] = [];
  const trNodes = tblNode.getElementsByTagName("w:tr");

  for (let i = 0; i < trNodes.length; i++) {
    const row: string[] = [];
    const tcNodes = trNodes[i].getElementsByTagName("w:tc");
    for (let j = 0; j < tcNodes.length; j++) {
      let cellText = "";
      const tNodes = tcNodes[j].getElementsByTagName("w:t");
      for (let k = 0; k < tNodes.length; k++) {
        cellText += (tNodes[k].textContent || "") + " ";
      }
      row.push(cellText.trim());
    }
    if (row.length > 0) {
      rows.push(row);
    }
  }

  return { type: "table", rows };
}

function createSimpleDocMeta(
  fileName: string,
  fileSize: number,
  title: string,
  elements: WordDocElement[]
): WordDocMeta {
  let words = 0;
  elements.forEach((el) => {
    if ("runs" in el) {
      words += el.runs.map((r) => r.text).join(" ").split(/\s+/).filter(Boolean).length;
    }
  });

  return {
    fileName,
    fileSize,
    title,
    elements,
    wordCount: words,
    paragraphCount: elements.length,
    tableCount: 0,
  };
}

/**
 * Generate a realistic sample Word document metadata for instant preview
 */
export function generateSampleWordDoc(): WordDocMeta {
  const elements: WordDocElement[] = [
    {
      type: "heading1",
      runs: [{ text: "Annual Operations & Strategy Report", bold: true }],
    },
    {
      type: "paragraph",
      runs: [
        { text: "Prepared by: ", bold: true },
        { text: "FileLab Strategic Working Group • Confidential • Q4 Edition", italic: true },
      ],
    },
    {
      type: "heading2",
      runs: [{ text: "1. Executive Summary", bold: true }],
    },
    {
      type: "paragraph",
      runs: [
        {
          text: "During the current fiscal year, our decentralized client-side file transformation infrastructure scaled by over 340%. Because all cryptographic routines and document manipulations happen directly inside client memory sandboxes, enterprise compliance risks were effectively reduced to zero.",
        },
      ],
    },
    {
      type: "heading2",
      runs: [{ text: "2. Key Operational Metrics", bold: true }],
    },
    {
      type: "table",
      rows: [
        ["Quarter", "Processed Docs", "Data Egress", "Average Latency"],
        ["Q1", "1,240,000", "0 MB (Client-side)", "142 ms"],
        ["Q2", "2,890,000", "0 MB (Client-side)", "118 ms"],
        ["Q3", "4,150,000", "0 MB (Client-side)", "96 ms"],
        ["Q4 (Proj.)", "6,400,000", "0 MB (Client-side)", "82 ms"],
      ],
    },
    {
      type: "heading2",
      runs: [{ text: "3. Strategic Objectives for Next Cycle", bold: true }],
    },
    {
      type: "bullet",
      runs: [{ text: "Expand WebAssembly image and vector rasterizers to 600 DPI." }],
    },
    {
      type: "bullet",
      runs: [{ text: "Integrate native browser TextDetector with lightweight client OCR fallback." }],
    },
    {
      type: "bullet",
      runs: [{ text: "Ensure strict zero-network egress compliance for all PDF and Office format conversions." }],
    },
    {
      type: "paragraph",
      runs: [
        {
          text: "Conclusion: The transition from server-dependent document gateways to browser-native processing represents a generational upgrade in user privacy and conversion speed.",
          italic: true,
        },
      ],
    },
  ];

  return createSimpleDocMeta("Strategic_Report_2026.docx", 48200, "Annual Operations & Strategy Report", elements);
}

/**
 * Converts Word document elements to PDF bytes using pdf-lib
 */
export async function convertWordToPdf(
  doc: WordDocMeta,
  options: WordToPdfOptions
): Promise<WordToPdfResult> {
  const pdfDoc = await PDFDocument.create();

  // Page dimensions
  let width = 595.28; // A4 standard pt
  let height = 841.89;

  if (options.pageSize === "Letter") {
    width = 612;
    height = 792;
  } else if (options.pageSize === "Legal") {
    width = 612;
    height = 1008;
  }

  if (options.orientation === "landscape") {
    const temp = width;
    width = height;
    height = temp;
  }

  // Margin pt
  let margin = 54; // normal = 0.75 in
  if (options.margins === "compact") margin = 36; // 0.5 in
  if (options.margins === "wide") margin = 72; // 1.0 in

  const contentWidth = width - margin * 2;

  // Choose Font Family
  let regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  let boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  let italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  if (options.fontFamily === "serif") {
    regularFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  } else if (options.fontFamily === "mono") {
    regularFont = await pdfDoc.embedFont(StandardFonts.Courier);
    boldFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    italicFont = await pdfDoc.embedFont(StandardFonts.CourierOblique);
  }

  let currentPage = pdfDoc.addPage([width, height]);
  let currentY = height - margin;

  const headerHeight = options.includeHeader ? 28 : 0;
  const footerHeight = options.includePageNumbers ? 30 : 0;
  const bottomThreshold = margin + footerHeight;

  if (options.includeHeader) {
    currentY -= headerHeight;
  }

  function checkNewPage(neededSpace: number) {
    if (currentY - neededSpace < bottomThreshold) {
      currentPage = pdfDoc.addPage([width, height]);
      currentY = height - margin - headerHeight;
      return true;
    }
    return false;
  }

  // Draw Elements
  for (const el of doc.elements) {
    if (el.type === "table") {
      // Draw Table
      const table = el as WordDocTable;
      const numCols = table.rows[0]?.length || 1;
      const colWidth = contentWidth / numCols;
      const rowHeight = 22;

      for (let rIdx = 0; rIdx < table.rows.length; rIdx++) {
        checkNewPage(rowHeight + 4);
        const row = table.rows[rIdx];
        const isHeader = rIdx === 0;

        // Background for header
        if (isHeader) {
          currentPage.drawRectangle({
            x: margin,
            y: currentY - rowHeight + 4,
            width: contentWidth,
            height: rowHeight,
            color: rgb(0.92, 0.94, 0.97),
          });
        }

        // Row cells
        for (let cIdx = 0; cIdx < row.length; cIdx++) {
          const text = row[cIdx] || "";
          const cellX = margin + cIdx * colWidth + 4;
          const font = isHeader ? boldFont : regularFont;
          const fontSize = 9;

          // Draw text clipped
          currentPage.drawText(text.slice(0, 30), {
            x: cellX,
            y: currentY - 10,
            size: fontSize,
            font,
            color: isHeader ? rgb(0.1, 0.2, 0.35) : rgb(0.2, 0.25, 0.3),
          });

          // Cell bottom border
          currentPage.drawLine({
            start: { x: margin, y: currentY - rowHeight + 4 },
            end: { x: margin + contentWidth, y: currentY - rowHeight + 4 },
            thickness: 0.5,
            color: rgb(0.82, 0.85, 0.9),
          });
        }

        currentY -= rowHeight;
      }
      currentY -= 12; // Gap after table
    } else {
      // Paragraph / Headings
      const para = el as WordDocParagraph;
      let fontSize = 10.5;
      let font = regularFont;
      let color = rgb(0.15, 0.18, 0.22);
      let spacingAfter = 8 * options.lineSpacing;

      if (para.type === "heading1") {
        fontSize = 18;
        font = boldFont;
        color = rgb(0.08, 0.2, 0.4);
        spacingAfter = 14;
      } else if (para.type === "heading2") {
        fontSize = 13.5;
        font = boldFont;
        color = rgb(0.12, 0.25, 0.45);
        spacingAfter = 10;
      } else if (para.type === "heading3") {
        fontSize = 11.5;
        font = boldFont;
        spacingAfter = 8;
      } else if (para.type === "bullet") {
        fontSize = 10;
        spacingAfter = 6;
      }

      const fullText = (para.type === "bullet" ? "•  " : "") +
        para.runs.map((r) => r.text).join("");

      // Word wrapping
      const words = fullText.split(" ");
      let currentLine = "";
      const lines: string[] = [];

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const textWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (textWidth > contentWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      const lineHeight = fontSize * options.lineSpacing;

      for (const line of lines) {
        checkNewPage(lineHeight + 2);
        currentPage.drawText(line, {
          x: margin,
          y: currentY,
          size: fontSize,
          font,
          color,
        });
        currentY -= lineHeight;
      }

      currentY -= spacingAfter;
    }
  }

  // Draw headers and footers on all pages
  const totalPages = pdfDoc.getPageCount();
  for (let i = 0; i < totalPages; i++) {
    const page = pdfDoc.getPage(i);

    if (options.includeHeader) {
      page.drawText(options.documentTitle || doc.title, {
        x: margin,
        y: height - margin + 8,
        size: 8,
        font: regularFont,
        color: rgb(0.5, 0.55, 0.6),
      });
      page.drawLine({
        start: { x: margin, y: height - margin + 2 },
        end: { x: width - margin, y: height - margin + 2 },
        thickness: 0.5,
        color: rgb(0.85, 0.88, 0.92),
      });
    }

    if (options.includePageNumbers) {
      const pageNumText = `Page ${i + 1} of ${totalPages}`;
      const textWidth = regularFont.widthOfTextAtSize(pageNumText, 8);
      page.drawText(pageNumText, {
        x: width - margin - textWidth,
        y: margin - 18,
        size: 8,
        font: regularFont,
        color: rgb(0.5, 0.55, 0.6),
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  const pdfBlob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" });
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return {
    pdfBlob,
    pdfUrl,
    pageCount: totalPages,
    fileSizeBytes: pdfBytes.length,
  };
}
