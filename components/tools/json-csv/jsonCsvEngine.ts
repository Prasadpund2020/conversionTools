import { JsonCsvOptions, JsonCsvResult, Delimiter } from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Escapes a cell for CSV formatting according to RFC 4180
 */
function escapeCsvCell(val: any, delimiter: Delimiter): string {
  if (val === null || val === undefined) return '';
  let str = typeof val === 'object' ? JSON.stringify(val) : String(val);

  if (
    str.includes(delimiter) ||
    str.includes('"') ||
    str.includes('\n') ||
    str.includes('\r')
  ) {
    str = '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * Converts a JSON string or object array into CSV text
 */
export function convertJsonToCsv(
  jsonInput: string,
  options: JsonCsvOptions,
  baseName: string = 'converted'
): JsonCsvResult {
  const parsed = JSON.parse(jsonInput);
  let arrayData: any[] = [];

  if (Array.isArray(parsed)) {
    arrayData = parsed;
  } else if (typeof parsed === 'object' && parsed !== null) {
    // Check if there is an array property inside the object (common API pattern)
    const arrayKey = Object.keys(parsed).find((k) => Array.isArray(parsed[k]));
    if (arrayKey) {
      arrayData = parsed[arrayKey];
    } else {
      // Single record
      arrayData = [parsed];
    }
  } else {
    throw new Error('JSON must be an array of objects or an object representing a record.');
  }

  if (arrayData.length === 0) {
    throw new Error('JSON array is empty.');
  }

  // Extract all distinct keys across all records
  const headersSet = new Set<string>();
  arrayData.forEach((row) => {
    if (row && typeof row === 'object') {
      Object.keys(row).forEach((k) => headersSet.add(k));
    }
  });

  const headers = Array.from(headersSet);
  if (headers.length === 0) {
    throw new Error('No valid properties found in JSON objects.');
  }

  const lines: string[] = [];
  if (options.includeHeaders) {
    lines.push(headers.map((h) => escapeCsvCell(h, options.delimiter)).join(options.delimiter));
  }

  const previewRows: string[][] = [];
  if (options.includeHeaders) {
    previewRows.push(headers);
  }

  arrayData.forEach((row, idx) => {
    const rowVals = headers.map((h) => {
      const val = row ? row[h] : '';
      return escapeCsvCell(val, options.delimiter);
    });
    lines.push(rowVals.join(options.delimiter));

    if (idx < 50) {
      previewRows.push(headers.map((h) => (row ? String(row[h] ?? '') : '')));
    }
  });

  const outputText = lines.join('\n');
  const blob = new Blob([outputText], {
    type: options.delimiter === '\t' ? 'text/tab-separated-values;charset=utf-8;' : 'text/csv;charset=utf-8;',
  });
  const ext = options.delimiter === '\t' ? '.tsv' : '.csv';
  const fileName = `${baseName.replace(/\.[^/.]+$/, '')}${ext}`;

  return {
    outputText,
    rowCount: arrayData.length,
    columnCount: headers.length,
    fileName,
    downloadUrl: URL.createObjectURL(blob),
    sizeBytes: blob.size,
    previewRows,
  };
}

/**
 * Robust RFC-4180 CSV / TSV parser into array of rows
 */
function parseCsvRows(text: string, delimiter: Delimiter): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuote = false;

  const len = text.length;
  for (let i = 0; i < len; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === delimiter && !insideQuote) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n in CRLF
      }
      currentRow.push(currentField);
      currentField = '';
      if (currentRow.some((c) => c.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some((c) => c.trim().length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Converts CSV / TSV text into JSON string
 */
export function convertCsvToJson(
  csvInput: string,
  options: JsonCsvOptions,
  baseName: string = 'converted'
): JsonCsvResult {
  const rows = parseCsvRows(csvInput.trim(), options.delimiter);
  if (rows.length === 0) {
    throw new Error('CSV data is empty or invalid.');
  }

  let headers: string[] = [];
  let dataRows: string[][] = [];

  if (options.includeHeaders && rows.length > 1) {
    headers = rows[0].map((h, i) => (h.trim() ? h.trim() : `column_${i + 1}`));
    dataRows = rows.slice(1);
  } else {
    headers = rows[0].map((_, i) => `column_${i + 1}`);
    dataRows = rows;
  }

  const jsonArray = dataRows.map((r) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      let val = r[i] !== undefined ? r[i].trim() : '';
      // Try to parse number or boolean if clean
      if (/^-?\d+(\.\d+)?$/.test(val)) {
        obj[h] = Number(val);
      } else if (val.toLowerCase() === 'true') {
        obj[h] = true;
      } else if (val.toLowerCase() === 'false') {
        obj[h] = false;
      } else {
        obj[h] = val;
      }
    });
    return obj;
  });

  const outputText = options.prettyJson
    ? JSON.stringify(jsonArray, null, 2)
    : JSON.stringify(jsonArray);

  const blob = new Blob([outputText], { type: 'application/json;charset=utf-8;' });
  const fileName = `${baseName.replace(/\.[^/.]+$/, '')}.json`;

  const previewRows = [headers, ...dataRows.slice(0, 50)];

  return {
    outputText,
    rowCount: jsonArray.length,
    columnCount: headers.length,
    fileName,
    downloadUrl: URL.createObjectURL(blob),
    sizeBytes: blob.size,
    previewRows,
  };
}
