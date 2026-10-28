"use client";

import React from "react";
import { PdfToExcelOptions, ExportSpreadsheetFormat } from "./types";

interface Props {
  options: PdfToExcelOptions;
  totalSheets: number;
  isProcessing: boolean;
  onOptionsChange: (newOptions: PdfToExcelOptions) => void;
  onExport: () => void;
}

export const PdfToExcelControls: React.FC<Props> = ({
  options,
  totalSheets,
  isProcessing,
  onOptionsChange,
  onExport,
}) => {
  const setFormat = (exportFormat: ExportSpreadsheetFormat) => {
    onOptionsChange({ ...options, exportFormat });
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#16a34a] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Export Format
        </h3>

        {/* Format Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setFormat("xlsx")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              options.exportFormat === "xlsx"
                ? "bg-[#16a34a] text-white shadow-md ring-2 ring-emerald-400"
                : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
            }`}
          >
            <span className="text-base">📊</span>
            <span>Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat("csv")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              options.exportFormat === "csv"
                ? "bg-[#16a34a] text-white shadow-md ring-2 ring-emerald-400"
                : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
            }`}
          >
            <span className="text-base">📑</span>
            <span>CSV (.csv)</span>
          </button>

          <button
            type="button"
            onClick={() => setFormat("json")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              options.exportFormat === "json"
                ? "bg-[#16a34a] text-white shadow-md ring-2 ring-emerald-400"
                : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
            }`}
          >
            <span className="text-base">📦</span>
            <span>JSON (.json)</span>
          </button>
        </div>

        {/* Sheet / Page Selector */}
        {totalSheets > 1 && (
          <div className="flex flex-col gap-1.5 bg-surface-container p-3 rounded-xl shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface uppercase tracking-wider text-[11px]">
                Sheet / Page
              </span>
              <span className="font-mono text-[#16a34a] font-bold">
                {options.activeSheetPage} of {totalSheets}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                disabled={options.activeSheetPage <= 1}
                onClick={() =>
                  onOptionsChange({
                    ...options,
                    activeSheetPage: Math.max(1, options.activeSheetPage - 1),
                  })
                }
                className="flex-1 py-1.5 px-3 rounded-lg bg-surface text-xs font-bold text-on-surface hover:bg-surface-container-highest disabled:opacity-40 cursor-pointer shadow-sm"
              >
                ← Prev Page
              </button>
              <button
                type="button"
                disabled={options.activeSheetPage >= totalSheets}
                onClick={() =>
                  onOptionsChange({
                    ...options,
                    activeSheetPage: Math.min(totalSheets, options.activeSheetPage + 1),
                  })
                }
                className="flex-1 py-1.5 px-3 rounded-lg bg-surface text-xs font-bold text-on-surface hover:bg-surface-container-highest disabled:opacity-40 cursor-pointer shadow-sm"
              >
                Next Page →
              </button>
            </div>
          </div>
        )}

        {/* Table Detection Strategy */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Column Extraction Mode
          </label>
          <select
            value={options.detectionMode}
            onChange={(e) =>
              onOptionsChange({
                ...options,
                detectionMode: e.target.value as any,
              })
            }
            className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
          >
            <option value="auto">Auto Coordinate Alignment</option>
            <option value="whitespace-columns">Multi-Space Delimited</option>
            <option value="comma-tab">Tabular Data Grid</option>
          </select>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onExport}
          disabled={isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(22,163,74,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#16a34a] hover:bg-[#15803d] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>📥</span>
            <span>
              {isProcessing
                ? "Synthesizing Spreadsheet..."
                : `Export as ${options.exportFormat.toUpperCase()}`}
            </span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
