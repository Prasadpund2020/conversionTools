"use client";

import React, { useState } from "react";
import { OcrOptions, OcrResult, OcrImageMeta, OcrMode } from "./types";

interface OcrScannerControlsProps {
  meta: OcrImageMeta;
  options: OcrOptions;
  onOptionsChange: (newOptions: OcrOptions) => void;
  result: OcrResult | null;
  isProcessing: boolean;
  onCopyText: () => void;
  onDownloadTxt: () => void;
  onDownloadJson: () => void;
  onDownloadPdf: () => void;
  isCopied: boolean;
  onSearchReplace: (search: string, replace: string) => void;
}

export default function OcrScannerControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  onCopyText,
  onDownloadTxt,
  onDownloadJson,
  onDownloadPdf,
  isCopied,
  onSearchReplace,
}: OcrScannerControlsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");

  const updateOption = <K extends keyof OcrOptions>(
    key: K,
    value: OcrOptions[K]
  ) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  const handleApplyReplace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    onSearchReplace(searchTerm, replaceTerm);
    setSearchTerm("");
    setReplaceTerm("");
  };

  return (
    <div className="flex flex-col gap-5 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
      {/* File & OCR Performance Metric Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
              Target Document
            </span>
            <h4 className="text-xs font-bold text-stone-900 truncate" title={meta.fileName}>
              {meta.fileName}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-500 shrink-0">
            {meta.width} × {meta.height} px
          </span>
        </div>

        {/* OCR Result Stats */}
        {result && (
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
            <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
              <span className="text-[10px] text-stone-400 block font-medium">Words</span>
              <span className="text-xs font-black text-stone-800">{result.wordCount}</span>
            </div>
            <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
              <span className="text-[10px] text-stone-400 block font-medium">Confidence</span>
              <span className="text-xs font-black text-emerald-600">{result.confidence.toFixed(1)}%</span>
            </div>
            <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
              <span className="text-[10px] text-stone-400 block font-medium">Latency</span>
              <span className="text-xs font-black text-stone-800">{result.processingTimeMs} ms</span>
            </div>
          </div>
        )}
      </div>

      {/* OCR Recognition Mode */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Recognition Mode
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "general" as OcrMode, label: "All Text" },
            { id: "receipt" as OcrMode, label: "Invoices / Tables" },
            { id: "code" as OcrMode, label: "Code & Logs" },
            { id: "numbers" as OcrMode, label: "Numerical Only" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => updateOption("mode", m.id)}
              className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                options.mode === m.id
                  ? "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Image Filters / Contrast Adjustments */}
      <div className="flex flex-col gap-3">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
          Preprocessing Filters
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Enhance Edge Contrast</span>
          <input
            type="checkbox"
            checked={options.enhanceContrast}
            onChange={(e) => updateOption("enhanceContrast", e.target.checked)}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Invert Dark Backgrounds</span>
          <input
            type="checkbox"
            checked={options.invertColors}
            onChange={(e) => updateOption("invertColors", e.target.checked)}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Search & Replace Tool */}
      <form onSubmit={handleApplyReplace} className="flex flex-col gap-2 pt-2 border-t border-stone-100">
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
          Find &amp; Replace in Extracted Text
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Find text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-1.5 px-3 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            className="py-1.5 px-3 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <button
          type="submit"
          disabled={!searchTerm}
          className="py-1.5 px-3 text-xs font-bold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors disabled:opacity-50 cursor-pointer text-center"
        >
          Replace All Instances
        </button>
      </form>

      {/* Primary Actions: Copy & Exports */}
      <div className="flex flex-col gap-2 pt-2 border-t border-stone-100">
        <button
          type="button"
          onClick={onCopyText}
          disabled={!result || isProcessing}
          className="w-full py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm shadow-md shadow-amber-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isCopied ? (
            <>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy Full Extracted Text</span>
            </>
          )}
        </button>

        {/* Secondary Export Grid */}
        <div className="grid grid-cols-3 gap-2 mt-1">
          <button
            type="button"
            onClick={onDownloadTxt}
            disabled={!result}
            className="py-2 px-2 text-xs font-bold rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-center transition-all cursor-pointer disabled:opacity-50"
          >
            .TXT File
          </button>
          <button
            type="button"
            onClick={onDownloadJson}
            disabled={!result}
            className="py-2 px-2 text-xs font-bold rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-center transition-all cursor-pointer disabled:opacity-50"
          >
            .JSON Bounding
          </button>
          <button
            type="button"
            onClick={onDownloadPdf}
            disabled={!result}
            className="py-2 px-2 text-xs font-bold rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-center transition-all cursor-pointer disabled:opacity-50"
          >
            .PDF Doc
          </button>
        </div>
      </div>
    </div>
  );
}
