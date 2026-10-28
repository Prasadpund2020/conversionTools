export type ConversionDirection = 'json-to-csv' | 'csv-to-json';

export type Delimiter = ',' | '\t' | ';';

export interface JsonCsvOptions {
  direction: ConversionDirection;
  delimiter: Delimiter;
  prettyJson: boolean;
  includeHeaders: boolean;
}

export interface JsonCsvResult {
  outputText: string;
  rowCount: number;
  columnCount: number;
  fileName: string;
  downloadUrl: string;
  sizeBytes: number;
  previewRows?: string[][];
}
