"use client";

import React from "react";
import { CompareOptions, CompareViewMode, CompareAuditResult } from "./types";

interface Props {
  options: CompareOptions;
  auditResult: CompareAuditResult | null;
  maxPages: number;
  onOptionsChange: (newOptions: CompareOptions) => void;
  onExportReport: () => void;
}

export const ComparePdfControls: React.FC<Props> = ({
  options,
  auditResult,
  maxPages,
  onOptionsChange,
  onExportReport,
}) => {
  const setViewMode = (viewMode: CompareViewMode) => {
    onOptionsChange({ ...options, viewMode });
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#0891b2] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Comparison Mode
        </h3>

        {/* View Mode Tabs */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setViewMode("split-side-by-side")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.viewMode === "split-side-by-side"
                ? "border-[#0891b2] bg-[#0891b2]/10 text-on-surface shadow-sm ring-1 ring-[#0891b2]"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Side-by-Side View</span>
              <span className="text-xs">⚖️</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Parallel dual-pane view with synchronized page alignment.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("slider-diff")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.viewMode === "slider-diff"
                ? "border-[#0891b2] bg-[#0891b2]/10 text-on-surface shadow-sm ring-1 ring-[#0891b2]"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Curtain Slider</span>
              <span className="text-xs">↔️</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Interactive draggable swipe curtain revealing differences beneath.
            </p>
          </button>
        </div>

        {/* Highlight Difference Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface">
          <span className="flex items-center gap-2">
            <span>✨</span>
            <span>Highlight Variance</span>
          </span>
          <input
            type="checkbox"
            checked={options.highlightDifferences}
            onChange={(e) =>
              onOptionsChange({ ...options, highlightDifferences: e.target.checked })
            }
            className="w-4 h-4 rounded accent-[#0891b2] cursor-pointer"
          />
        </div>

        {/* Page Switcher */}
        <div className="flex flex-col gap-1.5 bg-surface-container p-3 rounded-xl shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface uppercase tracking-wider text-[11px]">
              Inspecting Page
            </span>
            <span className="font-mono text-[#0891b2] font-bold">
              {options.activePage} / {maxPages}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              disabled={options.activePage <= 1}
              onClick={() =>
                onOptionsChange({ ...options, activePage: Math.max(1, options.activePage - 1) })
              }
              className="flex-1 py-1.5 px-3 rounded-lg bg-surface text-xs font-bold text-on-surface hover:bg-surface-container-highest disabled:opacity-40 cursor-pointer shadow-sm"
            >
              ← Previous Page
            </button>
            <button
              type="button"
              disabled={options.activePage >= maxPages}
              onClick={() =>
                onOptionsChange({
                  ...options,
                  activePage: Math.min(maxPages, options.activePage + 1),
                })
              }
              className="flex-1 py-1.5 px-3 rounded-lg bg-surface text-xs font-bold text-on-surface hover:bg-surface-container-highest disabled:opacity-40 cursor-pointer shadow-sm"
            >
              Next Page →
            </button>
          </div>
        </div>

        {/* Audit Summary Box */}
        {auditResult && (
          <div className="p-3 rounded-xl bg-surface border border-outline-variant/30 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-on-surface">Similarity Match:</span>
              <span className="font-mono font-bold text-cyan-600">
                {auditResult.overallSimilarity}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                style={{ width: `${auditResult.overallSimilarity}%` }}
                className="h-full bg-cyan-600 rounded-full"
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={onExportReport}
          className="w-full min-h-[48px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(8,145,178,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#0891b2] hover:bg-[#0e7490] active:translate-y-0.5 cursor-pointer mt-1"
        >
          <span className="flex items-center gap-2">
            <span>📥</span>
            <span>Export Comparison Audit (JSON)</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
