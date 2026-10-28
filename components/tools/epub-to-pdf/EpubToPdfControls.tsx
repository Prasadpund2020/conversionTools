"use client";

import React from "react";
import {
  EpubBookMeta,
  EpubToPdfOptions,
  EpubToPdfResult,
  BookTrimSize,
  BookFontFamily,
} from "./types";

interface EpubToPdfControlsProps {
  meta: EpubBookMeta;
  options: EpubToPdfOptions;
  onOptionsChange: (newOptions: EpubToPdfOptions) => void;
  result: EpubToPdfResult | null;
  isProcessing: boolean;
  onDownload: () => void;
}

export default function EpubToPdfControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  onDownload,
}: EpubToPdfControlsProps) {
  const updateOption = <K extends keyof EpubToPdfOptions>(
    key: K,
    value: EpubToPdfOptions[K]
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
      {/* Book Metadata Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block mb-0.5">
              Manuscript Information
            </span>
            <h4 className="text-xs font-bold text-stone-900 truncate" title={meta.title}>
              {meta.title}
            </h4>
            <span className="text-[11px] text-stone-500 block truncate">By {meta.author}</span>
          </div>
          <span className="text-[11px] font-mono text-stone-500 shrink-0">
            {formatFileSize(meta.fileSize)}
          </span>
        </div>

        {/* Quick Book Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Chapters</span>
            <span className="text-xs font-black text-stone-800">{meta.totalChapters}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Words</span>
            <span className="text-xs font-black text-stone-800">{meta.totalWords}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Est. Read</span>
            <span className="text-xs font-black text-stone-800">
              {Math.max(1, Math.round(meta.totalWords / 250))}m
            </span>
          </div>
        </div>
      </div>

      {/* Book Trim Size */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Book Trim Size
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "6x9" as BookTrimSize, name: "6×9″ Trade", sub: "Standard Novel" },
            { id: "5x8" as BookTrimSize, name: "5×8″ Pocket", sub: "Compact Paperback" },
            { id: "A4" as BookTrimSize, name: "A4 Standard", sub: "Document Format" },
            { id: "Letter" as BookTrimSize, name: "US Letter", sub: "Print Binder" },
          ].map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => updateOption("trimSize", size.id)}
              className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                options.trimSize === size.id
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              <div className="text-xs font-bold">{size.name}</div>
              <div className={`text-[10px] ${options.trimSize === size.id ? "text-purple-200" : "text-stone-400"}`}>
                {size.sub}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Typography & Spacing */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Book Font
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "serif" as BookFontFamily, label: "Serif" },
              { id: "sans" as BookFontFamily, label: "Sans" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => updateOption("fontFamily", f.id)}
                className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                  options.fontFamily === f.id
                    ? "bg-purple-50 text-purple-900 border-purple-500"
                    : "bg-white text-stone-700 border-stone-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Font Size
          </label>
          <select
            value={options.fontSize}
            onChange={(e) => updateOption("fontSize", Number(e.target.value))}
            className="w-full py-1.5 px-2 text-xs font-bold bg-white border border-stone-200 rounded-lg text-stone-700 focus:ring-2 focus:ring-purple-500"
          >
            <option value={10}>10 pt (Small)</option>
            <option value={11}>11 pt (Standard)</option>
            <option value={12}>12 pt (Comfortable)</option>
            <option value={13}>13 pt (Large)</option>
          </select>
        </div>
      </div>

      {/* Chapter Scope Selector */}
      {meta.chapters.length > 1 && (
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Chapters to Render
          </label>
          <select
            value={options.selectedChapterIndex}
            onChange={(e) => updateOption("selectedChapterIndex", Number(e.target.value))}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-purple-500"
          >
            <option value={-1}>All Chapters ({meta.chapters.length})</option>
            {meta.chapters.map((ch, idx) => (
              <option key={idx} value={idx}>
                {ch.title.slice(0, 36)}…
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Book Design Toggles */}
      <div className="flex flex-col gap-2.5 pt-2 border-t border-stone-100">
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Generate Cover Page</span>
          <input
            type="checkbox"
            checked={options.includeCoverPage}
            onChange={(e) => updateOption("includeCoverPage", e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Include Table of Contents</span>
          <input
            type="checkbox"
            checked={options.includeTableOfContents}
            onChange={(e) => updateOption("includeTableOfContents", e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Running Book Headers</span>
          <input
            type="checkbox"
            checked={options.includeRunningHeader}
            onChange={(e) => updateOption("includeRunningHeader", e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Bottom Page Numbers</span>
          <input
            type="checkbox"
            checked={options.includePageNumbers}
            onChange={(e) => updateOption("includePageNumbers", e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Download CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!result || isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Typesetting Book PDF...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Book PDF</span>
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
