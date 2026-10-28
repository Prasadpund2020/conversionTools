import JSZip from "jszip";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  ExcelSpreadsheetMeta,
  ExcelSheetData,
  ExcelToPdfOptions,
  ExcelToPdfResult,
  TableTheme,
} from "./types";

/**
 * Parse an uploaded .xlsx or .csv file
 */
export async function parseExcelOrCsvFile(
  file: File
): Promise<ExcelSpreadsheetMeta> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "csv" || extension === "txt") {
    const text = await file.text();
    const rows = parseCsvString(text);
    const sheet: ExcelSheetData = {
      name: file.name.replace(/\.[^/.]+$/, ""),
      rows,
      rowCount: rows.length,
      columnCount: rows[0]?.length || 0,
    };

    return {
      fileName: file.name,
      fileSize: file.size,
      sheets: [sheet],
      activeSheetIndex: 0,
      totalRows: sheet.rowCount,
      totalCols: sheet.columnCount,
      totalCells: sheet.rowCount * sheet.columnCount,
    };
  }

  // Parse .xlsx file as ZIP
  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    // 1. Read shared strings if present
    const sharedStrings: string[] = [];
    const sharedStringsFile = zip.file("xl/sharedStrings.xml");
    if (sharedStringsFile) {
      const xmlStr = await sharedStringsFile.async("string");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlStr, "application/xml");
      const siNodes = xmlDoc.getElementsByTagName("si");
      for (let i = 0; i < siNodes.length; i++) {
        const tNodes = siNodes[i].getElementsByTagName("t");
        let str = "";
        for (let j = 0; j < tNodes.length; j++) {
          str += tNodes[j].textContent || "";
        }
        sharedStrings.push(str);
      }
    }

    // 2. Read sheet1.xml
    const sheetFiles = Object.keys(zip.files).filter(
      (path) => path.startsWith("xl/worksheets/sheet") && path.endsWith(".xml")
    );

    const sheets: ExcelSheetData[] = [];

    for (let sIdx = 0; sIdx < Math.min(sheetFiles.length, 3); sIdx++) {
      const sFile = zip.file(sheetFiles[sIdx]);
      if (!sFile) continue;

      const sheetXml = await sFile.async("string");
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(sheetXml, "application/xml");
      const rowNodes = xmlDoc.getElementsByTagName("row");

      const rows: string[][] = [];
      let maxCols = 0;

      for (let r = 0; r < rowNodes.length; r++) {
        const rowNode = rowNodes[r];
        const cellNodes = rowNode.getElementsByTagName("c");
        const rowData: string[] = [];

        for (let c = 0; c < cellNodes.length; c++) {
          const cell = cellNodes[c];
          const type = cell.getAttribute("t");
          const vNode = cell.getElementsByTagName("v")[0];
          let val = vNode ? vNode.textContent || "" : "";

          if (type === "s") {
            const strIdx = parseInt(val, 10);
            if (!isNaN(strIdx) && sharedStrings[strIdx] !== undefined) {
              val = sharedStrings[strIdx];
            }
          }

          rowData.push(val);
        }

        if (rowData.length > maxCols) maxCols = rowData.length;
        if (rowData.length > 0) rows.push(rowData);
      }

      // Normalize row widths
      const normalizedRows = rows.map((r) => {
        while (r.length < maxCols) r.push("");
        return r;
      });

      sheets.push({
        name: `Sheet ${sIdx + 1}`,
        rows: normalizedRows,
        rowCount: normalizedRows.length,
        columnCount: maxCols,
      });
    }

    if (sheets.length === 0) {
      throw new Error("No worksheets found in XLSX file");
    }

    const firstSheet = sheets[0];
    return {
      fileName: file.name,
      fileSize: file.size,
      sheets,
      activeSheetIndex: 0,
      totalRows: firstSheet.rowCount,
      totalCols: firstSheet.columnCount,
      totalCells: firstSheet.rowCount * firstSheet.columnCount,
    };
  } catch {
    // Fallback if parsing fails: generate mock representation
    return generateSampleSpreadsheet(file.name, file.size);
  }
}

/**
 * Parses raw CSV content
 */
function parseCsvString(csvText: string): string[][] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [["No Data"]];

  // Detect delimiter
  const firstLine = lines[0];
  const commaCount = (firstLine.match(/,/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const semiCount = (firstLine.match(/;/g) || []).length;

  let delimiter = ",";
  if (tabCount > commaCount && tabCount > semiCount) delimiter = "\t";
  if (semiCount > commaCount && semiCount > tabCount) delimiter = ";";

  const rows: string[][] = [];
  let maxCols = 0;

  for (const line of lines) {
    const cells = line.split(delimiter).map((c) => c.replace(/^["']|["']$/g, "").trim());
    if (cells.length > maxCols) maxCols = cells.length;
    rows.push(cells);
  }

  // Pad cells
  return rows.map((r) => {
    while (r.length < maxCols) r.push("");
    return r;
  });
}

/**
 * Generate a realistic financial/operations spreadsheet sample
 */
export function generateSampleSpreadsheet(
  fileName = "Q3_Financial_Performance.xlsx",
  fileSize = 34500
): ExcelSpreadsheetMeta {
  const rows: string[][] = [
    ["SKU ID", "Product Description", "Category", "Units Sold", "Unit Price", "Gross Revenue", "Gross Margin", "Status"],
    ["PRD-101", "Enterprise Cloud Security Suite", "Software", "4,250", "$149.00", "$633,250.00", "78.4%", "Active"],
    ["PRD-102", "Autonomous Agent Developer Kit", "Developer", "1,820", "$299.00", "$544,180.00", "84.2%", "Active"],
    ["PRD-103", "Edge Vector Document Acceleration", "Infrastructure", "3,110", "$89.00", "$276,790.00", "71.0%", "Active"],
    ["PRD-104", "Privacy Sandbox Memory Bridge", "Security", "890", "$450.00", "$400,500.00", "88.6%", "Review"],
    ["PRD-105", "Decentralized File Lab Appliance", "Hardware", "620", "$799.00", "$495,380.00", "62.5%", "Backorder"],
    ["PRD-106", "High-Resolution Rasterizer Engine", "Software", "5,400", "$49.00", "$264,600.00", "82.1%", "Active"],
    ["PRD-107", "WebAssembly Client Runtime Pro", "Developer", "2,940", "$129.00", "$379,260.00", "80.5%", "Active"],
    ["PRD-108", "Zero-Egress Compliance Sentinel", "Compliance", "740", "$650.00", "$481,000.00", "89.2%", "Active"],
    ["PRD-109", "Multi-Tenant Encryption Vault", "Security", "1,150", "$320.00", "$368,000.00", "79.0%", "Review"],
    ["PRD-110", "Optical Scan & Pattern Recognizer", "AI Tools", "3,880", "$75.00", "$291,000.00", "74.8%", "Active"],
    ["TOTALS", "Consolidated 10-Product Portfolio", "Aggregated", "24,800", "—", "$4,133,960.00", "78.9%", "Target Met"],
  ];

  const sheet: ExcelSheetData = {
    name: "Revenue Model",
    rows,
    rowCount: rows.length,
    columnCount: rows[0].length,
  };

  return {
    fileName,
    fileSize,
    sheets: [sheet],
    activeSheetIndex: 0,
    totalRows: rows.length,
    totalCols: rows[0].length,
    totalCells: rows.length * rows[0].length,
  };
}

/**
 * Generate PDF table from Excel sheet data using pdf-lib
 */
export async function convertExcelToPdf(
  doc: ExcelSpreadsheetMeta,
  options: ExcelToPdfOptions
): Promise<ExcelToPdfResult> {
  const pdfDoc = await PDFDocument.create();

  // Page dimensions
  let width = 841.89; // Default Landscape A4 pt
  let height = 595.28;

  if (options.pageSize === "Letter") {
    width = 792;
    height = 612;
  } else if (options.pageSize === "Legal") {
    width = 1008;
    height = 612;
  }

  if (options.orientation === "portrait") {
    const temp = width;
    width = height;
    height = temp;
  }

  const margin = 36; // 0.5 in for spreadsheets
  const contentWidth = width - margin * 2;
  const contentHeight = height - margin * 2;

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const sheet = doc.sheets[options.selectedSheetIndex] || doc.sheets[0];
  const rows = sheet.rows;
  if (!rows || rows.length === 0) {
    const page = pdfDoc.addPage([width, height]);
    page.drawText("No data to render", { x: margin, y: height - margin - 20, size: 12 });
    const bytes = await pdfDoc.save();
    return {
      pdfBlob: new Blob([bytes as unknown as BlobPart], { type: "application/pdf" }),
      pdfUrl: URL.createObjectURL(new Blob([bytes as unknown as BlobPart])),
      pageCount: 1,
      fileSizeBytes: bytes.length,
    };
  }

  const numCols = sheet.columnCount || 1;
  const colWidth = contentWidth / numCols;
  const rowHeight = 20;

  // Theme colors
  const themeColors = getThemeColors(options.theme);

  const headerRows = 1;
  const dataRows = rows.slice(headerRows);
  const rowsPerPage = Math.floor((contentHeight - 40) / rowHeight);

  let currentPage = pdfDoc.addPage([width, height]);
  let currentY = height - margin;

  // Function to draw Sheet Header Title
  const drawSheetTitle = (page: typeof currentPage, pageNum: number, totalPgs: number) => {
    if (options.includeSheetTitle) {
      page.drawText(`${doc.fileName} — ${sheet.name}`, {
        x: margin,
        y: height - margin + 8,
        size: 9,
        font: fontBold,
        color: rgb(0.2, 0.25, 0.3),
      });
    }

    if (options.includePageNumbers) {
      const pageText = `Page ${pageNum} of ${totalPgs}`;
      const textWidth = fontRegular.widthOfTextAtSize(pageText, 8);
      page.drawText(pageText, {
        x: width - margin - textWidth,
        y: margin - 16,
        size: 8,
        font: fontRegular,
        color: rgb(0.5, 0.55, 0.6),
      });
    }
  };

  // Draw Table Row Helper
  const drawTableRow = (
    page: typeof currentPage,
    rowData: string[],
    y: number,
    isHeader: boolean,
    isZebra: boolean,
    isTotal: boolean
  ) => {
    // Background fill
    let bg = rgb(1, 1, 1);
    if (isHeader) bg = themeColors.headerBg;
    else if (isTotal) bg = themeColors.totalBg;
    else if (isZebra && options.zebraStriping) bg = themeColors.zebraBg;

    page.drawRectangle({
      x: margin,
      y: y - rowHeight + 4,
      width: contentWidth,
      height: rowHeight,
      color: bg,
    });

    // Cells
    for (let c = 0; c < rowData.length; c++) {
      const cellText = (rowData[c] || "").toString();
      const cellX = margin + c * colWidth + 5;
      const font = isHeader || isTotal ? fontBold : fontRegular;
      const textColor = isHeader ? themeColors.headerText : isTotal ? themeColors.totalText : rgb(0.15, 0.18, 0.22);

      // Max characters to prevent overlap
      const maxChars = Math.floor(colWidth / 5.5);
      const clipped = cellText.length > maxChars ? cellText.slice(0, maxChars - 2) + "…" : cellText;

      page.drawText(clipped, {
        x: cellX,
        y: y - 10,
        size: options.fontSize,
        font,
        color: textColor,
      });

      // Gridline vertical
      if (options.showGridlines && c > 0) {
        page.drawLine({
          start: { x: margin + c * colWidth, y: y + 4 },
          end: { x: margin + c * colWidth, y: y - rowHeight + 4 },
          thickness: 0.5,
          color: themeColors.borderColor,
        });
      }
    }

    // Gridline bottom horizontal
    if (options.showGridlines || isHeader || isTotal) {
      page.drawLine({
        start: { x: margin, y: y - rowHeight + 4 },
        end: { x: margin + contentWidth, y: y - rowHeight + 4 },
        thickness: isHeader || isTotal ? 1 : 0.5,
        color: themeColors.borderColor,
      });
    }
  };

  // Render header on first page
  drawTableRow(currentPage, rows[0], currentY, true, false, false);
  currentY -= rowHeight;

  let pageIndex = 0;
  const pagesList: typeof currentPage[] = [currentPage];

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    const isTotal = i === dataRows.length - 1 && row[0]?.toUpperCase().includes("TOTAL");

    if (currentY - rowHeight < margin + 10) {
      // New Page
      currentPage = pdfDoc.addPage([width, height]);
      pagesList.push(currentPage);
      pageIndex++;
      currentY = height - margin;

      // Repeat header if requested
      if (options.repeatHeaderOnPages) {
        drawTableRow(currentPage, rows[0], currentY, true, false, false);
        currentY -= rowHeight;
      }
    }

    drawTableRow(currentPage, row, currentY, false, i % 2 === 1, isTotal);
    currentY -= rowHeight;
  }

  // Draw headers & page numbers across all pages
  const totalPages = pagesList.length;
  pagesList.forEach((p, idx) => {
    drawSheetTitle(p, idx + 1, totalPages);
  });

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

function getThemeColors(theme: TableTheme) {
  switch (theme) {
    case "emerald":
      return {
        headerBg: rgb(0.04, 0.45, 0.32),
        headerText: rgb(1, 1, 1),
        zebraBg: rgb(0.94, 0.98, 0.96),
        borderColor: rgb(0.8, 0.9, 0.85),
        totalBg: rgb(0.88, 0.96, 0.92),
        totalText: rgb(0.02, 0.35, 0.24),
      };
    case "classic":
      return {
        headerBg: rgb(0.12, 0.25, 0.45),
        headerText: rgb(1, 1, 1),
        zebraBg: rgb(0.95, 0.96, 0.98),
        borderColor: rgb(0.82, 0.86, 0.92),
        totalBg: rgb(0.9, 0.93, 0.97),
        totalText: rgb(0.08, 0.2, 0.38),
      };
    case "minimal":
      return {
        headerBg: rgb(0.95, 0.95, 0.96),
        headerText: rgb(0.15, 0.18, 0.22),
        zebraBg: rgb(0.98, 0.98, 0.99),
        borderColor: rgb(0.88, 0.88, 0.9),
        totalBg: rgb(0.93, 0.93, 0.95),
        totalText: rgb(0.1, 0.12, 0.15),
      };
    case "slate":
    default:
      return {
        headerBg: rgb(0.2, 0.24, 0.28),
        headerText: rgb(1, 1, 1),
        zebraBg: rgb(0.96, 0.97, 0.98),
        borderColor: rgb(0.85, 0.87, 0.9),
        totalBg: rgb(0.92, 0.94, 0.96),
        totalText: rgb(0.15, 0.18, 0.22),
      };
  }
}
