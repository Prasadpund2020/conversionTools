"use client";

import React from "react";
import { SplitOptions, SplitMode } from "./types";

interface Props {
  options: SplitOptions;
  totalPages: number;
  isProcessing: boolean;
  onOptionsChange: (newOptions: SplitOptions) => void;
  onSplit: () => void;
  onSelectAllPages: () => void;
  onClearSelectedPages: () => void;
}

export const SplitPdfControls: React.FC<Props> = ({
  options,
  totalPages,
  isProcessing,
  onOptionsChange,
  onSplit,
  onSelectAllPages,
  onClearSelectedPages,
}) => {
  const setMode = (mode: SplitMode) => {
    onOptionsChange({ ...options, mode });
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#006591] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Splitting Method
        </h3>

        {/* Mode Selector */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setMode("extract-all")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.mode === "extract-all"
                ? "border-[#006591] bg-[#006591]/10 text-on-surface shadow-sm"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Extract All Pages</span>
              <span className="text-xs">📁</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Splits every single page into an individual PDF file and bundles them into a ZIP archive.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("by-ranges")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.mode === "by-ranges"
                ? "border-[#006591] bg-[#006591]/10 text-on-surface shadow-sm"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Split by Custom Ranges</span>
              <span className="text-xs">📐</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Divide into separate documents by page intervals (e.g. 1-2, 3-5).
            </p>
          </button>

          <button
            type="button"
            onClick={() => setMode("selected-single")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.mode === "selected-single"
                ? "border-[#006591] bg-[#006591]/10 text-on-surface shadow-sm"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Extract Selected Pages</span>
              <span className="text-xs">🎯</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Combine your manually checked thumbnail pages into a single new PDF document.
            </p>
          </button>
        </div>

        {/* Dynamic configuration according to mode */}
        {options.mode === "by-ranges" && (
          <div className="flex flex-col gap-2 bg-surface-container p-3 rounded-xl shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-on-surface uppercase tracking-wider text-[11px]">
                Page Ranges
              </label>
              <span className="text-outline font-mono">Total {totalPages} pgs</span>
            </div>
            <input
              type="text"
              value={options.rangesText}
              onChange={(e) => onOptionsChange({ ...options, rangesText: e.target.value })}
              placeholder="e.g. 1-2, 3-5, 6"
              className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#006591]"
            />
            <p className="text-[10px] text-on-surface-variant">
              Separate distinct ranges with commas. Each range will be exported as its own file.
            </p>
          </div>
        )}

        {options.mode === "selected-single" && (
          <div className="flex flex-col gap-2 bg-surface-container p-3 rounded-xl shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-on-surface">Selected Pages:</span>
              <span className="font-mono font-bold text-[#006591]">
                {options.selectedPages.length} of {totalPages}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onSelectAllPages}
                className="flex-1 py-1 px-2 rounded-lg bg-surface text-[11px] font-semibold text-on-surface hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={onClearSelectedPages}
                className="flex-1 py-1 px-2 rounded-lg bg-surface text-[11px] font-semibold text-on-surface hover:bg-surface-container-highest cursor-pointer transition-colors shadow-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* Output File Prefix */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            File Name Prefix
          </label>
          <input
            type="text"
            value={options.prefixFileName}
            onChange={(e) => onOptionsChange({ ...options, prefixFileName: e.target.value })}
            placeholder="e.g. Split_Document"
            className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#006591]"
          />
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onSplit}
          disabled={isProcessing || (options.mode === "selected-single" && options.selectedPages.length === 0)}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(0,101,145,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#006591] hover:bg-[#007cb3] active:translate-y-0.5 cursor-pointer disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            <span>✂️</span>
            <span>{isProcessing ? "Splitting Document..." : "Split & Download"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
