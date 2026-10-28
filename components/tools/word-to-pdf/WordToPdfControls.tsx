"use client";

import React from "react";
import {
  WordToPdfOptions,
  WordDocMeta,
  WordToPdfResult,
  PageSizeOption,
  OrientationOption,
  FontFamilyOption,
  MarginOption,
} from "./types";

interface WordToPdfControlsProps {
  meta: WordDocMeta;
  options: WordToPdfOptions;
  onOptionsChange: (newOptions: WordToPdfOptions) => void;
  result: WordToPdfResult | null;
  isProcessing: boolean;
  onDownload: () => void;
}

export default function WordToPdfControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  onDownload,
}: WordToPdfControlsProps) {
  const updateOption = <K extends keyof WordToPdfOptions>(
    key: K,
    value: WordToPdfOptions[K]
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

  return (
    <div className="flex flex-col gap-5 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
      {/* File Summary Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
              Source Document
            </span>
            <h4 className="text-xs font-bold text-stone-900 truncate" title={meta.fileName}>
              {meta.fileName}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-500 shrink-0">
            {formatFileSize(meta.fileSize)}
          </span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Words</span>
            <span className="text-xs font-black text-stone-800">{meta.wordCount}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Paragraphs</span>
            <span className="text-xs font-black text-stone-800">{meta.paragraphCount}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Tables</span>
            <span className="text-xs font-black text-stone-800">{meta.tableCount}</span>
          </div>
        </div>
      </div>

      {/* Page Layout Settings */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Page Size &amp; Format
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["A4", "Letter", "Legal"] as PageSizeOption[]).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => updateOption("pageSize", size)}
              className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                options.pageSize === size
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Page Orientation */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Orientation
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["portrait", "landscape"] as OrientationOption[]).map((ori) => (
            <button
              key={ori}
              type="button"
              onClick={() => updateOption("orientation", ori)}
              className={`py-2 px-3 text-xs font-bold rounded-xl border capitalize transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                options.orientation === ori
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
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

      {/* Typography / Font Family */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Font Family
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "sans" as FontFamilyOption, label: "Sans-Serif", sample: "Helvetica" },
            { id: "serif" as FontFamilyOption, label: "Serif", sample: "Times" },
            { id: "mono" as FontFamilyOption, label: "Monospace", sample: "Courier" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => updateOption("fontFamily", f.id)}
              className={`p-2 text-left rounded-xl border transition-all cursor-pointer ${
                options.fontFamily === f.id
                  ? "bg-blue-50 border-blue-500 text-blue-900"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700"
              }`}
            >
              <div className="text-[11px] font-bold">{f.label}</div>
              <div className="text-[9px] text-stone-400 font-mono">{f.sample}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Margins */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Document Margins
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "compact" as MarginOption, label: "Narrow (0.5″)" },
            { id: "normal" as MarginOption, label: "Normal (0.75″)" },
            { id: "wide" as MarginOption, label: "Wide (1.0″)" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => updateOption("margins", m.id)}
              className={`py-2 px-2 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                options.margins === m.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Header & Page Number Toggles */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-stone-100">
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Include Page Numbers</span>
          <input
            type="checkbox"
            checked={options.includePageNumbers}
            onChange={(e) => updateOption("includePageNumbers", e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Include Document Title Header</span>
          <input
            type="checkbox"
            checked={options.includeHeader}
            onChange={(e) => updateOption("includeHeader", e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Download CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!result || isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF Document</span>
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
