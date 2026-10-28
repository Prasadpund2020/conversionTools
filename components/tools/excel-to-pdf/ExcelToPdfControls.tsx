"use client";

import React from "react";
import {
  ExcelSpreadsheetMeta,
  ExcelToPdfOptions,
  ExcelToPdfResult,
  ExcelPageSize,
  ExcelOrientation,
  TableTheme,
} from "./types";

interface ExcelToPdfControlsProps {
  meta: ExcelSpreadsheetMeta;
  options: ExcelToPdfOptions;
  onOptionsChange: (newOptions: ExcelToPdfOptions) => void;
  result: ExcelToPdfResult | null;
  isProcessing: boolean;
  onDownload: () => void;
}

export default function ExcelToPdfControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  onDownload,
}: ExcelToPdfControlsProps) {
  const updateOption = <K extends keyof ExcelToPdfOptions>(
    key: K,
    value: ExcelToPdfOptions[K]
  ) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const currentSheet = meta.sheets[options.selectedSheetIndex] || meta.sheets[0];

  return (
    <div className="flex flex-col gap-5 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
      {/* File & Sheet Summary */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-0.5">
              Active Workbook
            </span>
            <h4 className="text-xs font-bold text-stone-900 truncate" title={meta.fileName}>
              {meta.fileName}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-500 shrink-0">
            {formatFileSize(meta.fileSize)}
          </span>
        </div>

        {/* Quick Grid Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Rows</span>
            <span className="text-xs font-black text-stone-800">{currentSheet.rowCount}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Columns</span>
            <span className="text-xs font-black text-stone-800">{currentSheet.columnCount}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Sheets</span>
            <span className="text-xs font-black text-stone-800">{meta.sheets.length}</span>
          </div>
        </div>
      </div>

      {/* Multi-sheet selector if workbook has >1 sheet */}
      {meta.sheets.length > 1 && (
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
            Worksheet to Export
          </label>
          <div className="flex flex-wrap gap-1.5">
            {meta.sheets.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => updateOption("selectedSheetIndex", idx)}
                className={`py-1.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  options.selectedSheetIndex === idx
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page Orientation */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Page Orientation
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["landscape", "portrait"] as ExcelOrientation[]).map((ori) => (
            <button
              key={ori}
              type="button"
              onClick={() => updateOption("orientation", ori)}
              className={`py-2 px-3 text-xs font-bold rounded-xl border capitalize transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                options.orientation === ori
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <svg className={`w-3.5 h-3.5 ${ori === "landscape" ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="5" y="3" width="14" height="18" rx="2" strokeWidth="2" />
              </svg>
              {ori}
            </button>
          ))}
        </div>
      </div>

      {/* Table Color Theme */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Table Style Theme
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "emerald" as TableTheme, name: "Emerald Pro", color: "bg-emerald-600" },
            { id: "classic" as TableTheme, name: "Classic Navy", color: "bg-blue-800" },
            { id: "slate" as TableTheme, name: "Corporate Slate", color: "bg-slate-700" },
            { id: "minimal" as TableTheme, name: "Clean Minimal", color: "bg-stone-400" },
          ].map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => updateOption("theme", theme.id)}
              className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                options.theme === theme.id
                  ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700"
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${theme.color}`} />
              <span className="text-[11px] truncate">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Options: Page Size & Font Size */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Page Size
          </label>
          <select
            value={options.pageSize}
            onChange={(e) => updateOption("pageSize", e.target.value as ExcelPageSize)}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="A4">A4 (Standard)</option>
            <option value="Letter">US Letter</option>
            <option value="Legal">Legal</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Cell Font Size
          </label>
          <select
            value={options.fontSize}
            onChange={(e) => updateOption("fontSize", Number(e.target.value))}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-emerald-500"
          >
            <option value={7}>Compact (7 pt)</option>
            <option value={8}>Standard (8 pt)</option>
            <option value={9}>Readable (9 pt)</option>
            <option value={10}>Large (10 pt)</option>
          </select>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-stone-100">
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Display Gridlines</span>
          <input
            type="checkbox"
            checked={options.showGridlines}
            onChange={(e) => updateOption("showGridlines", e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Zebra Row Striping</span>
          <input
            type="checkbox"
            checked={options.zebraStriping}
            onChange={(e) => updateOption("zebraStriping", e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Repeat Header on Every Page</span>
          <input
            type="checkbox"
            checked={options.repeatHeaderOnPages}
            onChange={(e) => updateOption("repeatHeaderOnPages", e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Include Sheet Name &amp; Page Numbers</span>
          <input
            type="checkbox"
            checked={options.includePageNumbers}
            onChange={(e) => updateOption("includePageNumbers", e.target.checked)}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Download CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!result || isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Formatting PDF Table...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF Spreadsheet</span>
              {result && (
                <span className="text-[11px] font-normal opacity-80">
                  ({formatFileSize(result.fileSizeBytes)})
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
