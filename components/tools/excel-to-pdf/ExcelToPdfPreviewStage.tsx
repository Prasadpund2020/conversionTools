"use client";

import React, { useState } from "react";
import { ExcelSpreadsheetMeta, ExcelToPdfOptions, ExcelToPdfResult } from "./types";

interface ExcelToPdfPreviewStageProps {
  meta: ExcelSpreadsheetMeta;
  options: ExcelToPdfOptions;
  result: ExcelToPdfResult | null;
  isProcessing: boolean;
}

export default function ExcelToPdfPreviewStage({
  meta,
  options,
  result,
  isProcessing,
}: ExcelToPdfPreviewStageProps) {
  const [zoom, setZoom] = useState(100);

  const currentSheet = meta.sheets[options.selectedSheetIndex] || meta.sheets[0];
  const rows = currentSheet.rows;

  const getColLetter = (index: number) => {
    let letter = "";
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  };

  const getHeaderThemeClasses = () => {
    switch (options.theme) {
      case "emerald":
        return "bg-emerald-700 text-white font-bold";
      case "classic":
        return "bg-blue-800 text-white font-bold";
      case "minimal":
        return "bg-stone-200 text-stone-800 font-bold";
      case "slate":
      default:
        return "bg-slate-800 text-white font-bold";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Stage Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Preview:</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            {currentSheet.name} ({currentSheet.rowCount} rows × {currentSheet.columnCount} cols)
          </span>
          {result && (
            <span className="hidden sm:inline-flex text-[11px] text-stone-500 font-medium">
              • {result.pageCount} PDF Page{result.pageCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(60, z - 10))}
            className="w-7 h-7 rounded-lg bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all shadow-xs cursor-pointer"
            title="Zoom out"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          <span className="text-xs font-mono font-bold text-stone-600 px-2 min-w-[44px] text-center">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(140, z + 10))}
            className="w-7 h-7 rounded-lg bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all shadow-xs cursor-pointer"
            title="Zoom in"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setZoom(100)}
            className="text-[10px] font-bold text-stone-500 hover:text-stone-800 px-1.5 py-1 rounded-md hover:bg-white transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Spreadsheet Stage Container */}
      <div className="relative w-full rounded-3xl bg-stone-100/90 border border-stone-200/80 p-6 sm:p-8 flex flex-col items-center justify-start min-h-[560px] overflow-auto shadow-inner">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-emerald-600/20 border-t-emerald-600 rounded-full animate-spin" />
            <span className="text-xs font-bold text-stone-700">Recalculating PDF dimensions...</span>
          </div>
        )}

        {/* Scaled Virtual Sheet Card */}
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
          className="w-full bg-white rounded-xl shadow-[0_16px_36px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden transition-transform duration-200"
        >
          {/* Virtual Sheet Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 border-b border-stone-200 text-xs font-medium text-stone-600">
            <span className="font-bold text-stone-800">{meta.fileName}</span>
            <span className="text-[11px] font-mono text-stone-500">
              Format: {options.pageSize} ({options.orientation})
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto max-h-[620px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                {/* Column Letters Bar */}
                <tr className="bg-stone-100 text-stone-500 font-mono text-[10px] border-b border-stone-200">
                  <th className="w-10 py-1 px-2 text-center border-r border-stone-200 bg-stone-200/50">#</th>
                  {Array.from({ length: currentSheet.columnCount }).map((_, c) => (
                    <th key={c} className="py-1 px-3 border-r border-stone-200 text-center font-bold">
                      {getColLetter(c)}
                    </th>
                  ))}
                </tr>

                {/* Table Header Row */}
                {rows.length > 0 && (
                  <tr className={`border-b border-stone-200 ${getHeaderThemeClasses()}`}>
                    <td className="w-10 py-2.5 px-2 text-center text-[10px] bg-stone-200/50 text-stone-600 font-mono border-r border-stone-200">
                      1
                    </td>
                    {rows[0].map((cell, cIdx) => (
                      <th key={cIdx} className="py-2.5 px-3 text-[11px] border-r border-stone-200 last:border-r-0 truncate max-w-[180px]">
                        {cell}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>

              <tbody>
                {rows.slice(1).map((row, rIdx) => {
                  const isZebra = options.zebraStriping && rIdx % 2 === 1;
                  const isTotal = row[0]?.toUpperCase().includes("TOTAL");
                  return (
                    <tr
                      key={rIdx}
                      className={`transition-colors border-b border-stone-100 hover:bg-emerald-50/40 ${
                        isTotal
                          ? "bg-stone-100 font-black text-stone-900 border-t-2 border-stone-300"
                          : isZebra
                          ? "bg-stone-50/70"
                          : "bg-white"
                      }`}
                    >
                      <td className="w-10 py-2 px-2 text-center text-[10px] text-stone-400 font-mono bg-stone-50/80 border-r border-stone-200">
                        {rIdx + 2}
                      </td>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2 px-3 text-[11px] truncate max-w-[180px] ${
                            options.showGridlines ? "border-r border-stone-200/70 last:border-r-0" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
