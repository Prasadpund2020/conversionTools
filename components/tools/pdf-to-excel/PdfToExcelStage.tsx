"use client";

import React from "react";
import { StagedPdfToExcelFile, ExtractedTableSheet, PdfToExcelOptions } from "./types";
import { formatBytes } from "./pdfToExcelEngine";

interface Props {
  stagedFile: StagedPdfToExcelFile;
  sheets: ExtractedTableSheet[];
  options: PdfToExcelOptions;
  isProcessing: boolean;
}

export const PdfToExcelStage: React.FC<Props> = ({
  stagedFile,
  sheets,
  options,
  isProcessing,
}) => {
  const currentSheet = sheets[options.activeSheetPage - 1] || sheets[0];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* File Overview Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
            📊
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">{stagedFile.name}</h4>
            <p className="text-outline text-[11px]">
              {stagedFile.pageCount} Pages • {formatBytes(stagedFile.size)}
            </p>
          </div>
        </div>
        {currentSheet && (
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
            {currentSheet.rowCount} Rows • {currentSheet.columnCount} Columns
          </span>
        )}
      </div>

      {/* Spreadsheet Matrix Grid */}
      <div className="w-full rounded-3xl bg-surface-container-low p-5 shadow-2xl border border-outline-variant/30 flex flex-col gap-3 overflow-hidden">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 text-xs">
          <span className="font-bold text-on-surface">
            Extracted Sheet: Page {options.activeSheetPage}
          </span>
          <span className="text-[10px] text-outline font-mono">Live Matrix Grid</span>
        </div>

        {currentSheet ? (
          <div className="w-full overflow-x-auto max-h-[420px] rounded-xl border border-outline-variant/40 bg-surface shadow-inner">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-b border-emerald-200 dark:border-emerald-800">
                  <th className="p-2 border-r border-emerald-200 dark:border-emerald-800 w-10 text-center font-mono text-[10px] text-outline">
                    #
                  </th>
                  {currentSheet.headers.map((h, i) => (
                    <th
                      key={i}
                      className="p-2 border-r border-emerald-200 dark:border-emerald-800 font-bold font-mono text-xs whitespace-nowrap min-w-[120px]"
                    >
                      {String.fromCharCode(65 + (i % 26))} • {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentSheet.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b border-outline-variant/20 hover:bg-surface-container transition-colors"
                  >
                    <td className="p-2 border-r border-outline-variant/20 text-center font-mono text-[10px] text-outline bg-surface-container-low">
                      {rIdx + 1}
                    </td>
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="p-2 border-r border-outline-variant/20 whitespace-nowrap text-on-surface"
                      >
                        {cell || <span className="text-outline text-[10px] italic">empty</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-outline">
            {isProcessing ? "Extracting tabular data from document..." : "No table detected."}
          </div>
        )}
      </div>
    </div>
  );
};
