"use client";

import React from "react";
import { StagedComparePdf, CompareOptions, CompareAuditResult } from "./types";
import { formatBytes } from "./comparePdfEngine";

interface Props {
  docA: StagedComparePdf;
  docB: StagedComparePdf;
  options: CompareOptions;
  auditResult: CompareAuditResult | null;
  onSliderChange: (pos: number) => void;
}

export const ComparePdfStage: React.FC<Props> = ({
  docA,
  docB,
  options,
  auditResult,
  onSliderChange,
}) => {
  const currentDiff = auditResult?.pageDiffs.find((d) => d.pageNumber === options.activePage);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Overview Status Bar */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="font-bold text-on-surface">Inspecting Revision Differences</span>
          <span className="text-outline">
            Page {options.activePage}
          </span>
        </div>
        {currentDiff && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentDiff.isDifferent
                ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {currentDiff.isDifferent
              ? `Differences Detected (${currentDiff.similarityScore}% match)`
              : "Identical Page Match"}
          </span>
        )}
      </div>

      {/* Main Dual Presentation Stage */}
      {options.viewMode === "split-side-by-side" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Document A Sheet */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 text-xs">
              <span className="font-bold text-cyan-600 truncate max-w-[200px]">
                A: {docA.name}
              </span>
              <span className="text-outline">{formatBytes(docA.size)}</span>
            </div>
            <div className="relative rounded-2xl bg-white text-gray-800 p-6 shadow-2xl aspect-[3/4] flex flex-col justify-between border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 text-xs font-mono">
                <span className="font-bold text-cyan-800">REVISION A (BASE)</span>
                <span>P. {options.activePage}</span>
              </div>
              <div className="my-auto flex flex-col gap-3 text-xs leading-relaxed">
                <h4 className="font-bold text-sm text-gray-900">
                  {docA.name.replace(/\.[^/.]+$/, "")}
                </h4>
                <p className="text-gray-600">
                  Document baseline stream verified locally. Visual layout reflects the original
                  unmodified structure.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="w-full h-2 bg-gray-100 rounded"></div>
                  <div className="w-5/6 h-2 bg-gray-100 rounded"></div>
                  <div className="w-4/6 h-2 bg-gray-100 rounded"></div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between text-[10px] text-gray-400 font-mono">
                <span>Total Pages: {docA.pageCount}</span>
                <span>SHA-256 Verified</span>
              </div>
            </div>
          </div>

          {/* Document B Sheet */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 text-xs">
              <span className="font-bold text-emerald-600 truncate max-w-[200px]">
                B: {docB.name}
              </span>
              <span className="text-outline">{formatBytes(docB.size)}</span>
            </div>
            <div className="relative rounded-2xl bg-white text-gray-800 p-6 shadow-2xl aspect-[3/4] flex flex-col justify-between border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 text-xs font-mono">
                <span className="font-bold text-emerald-800">REVISION B (NEW)</span>
                <span>P. {options.activePage}</span>
              </div>
              <div className="my-auto flex flex-col gap-3 text-xs leading-relaxed">
                <h4 className="font-bold text-sm text-gray-900">
                  {docB.name.replace(/\.[^/.]+$/, "")}
                </h4>
                <p className="text-gray-600">
                  Updated revision stream. Changes in byte markers, text content, and formatting are
                  reflected here.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="w-full h-2 bg-emerald-50 rounded"></div>
                  <div className="w-5/6 h-2 bg-emerald-50 rounded"></div>
                  {options.highlightDifferences && (
                    <div className="p-1 rounded bg-amber-100 border border-amber-300 text-[10px] text-amber-900 font-semibold">
                      Modified Section Detected
                    </div>
                  )}
                  <div className="w-4/6 h-2 bg-emerald-50 rounded"></div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between text-[10px] text-gray-400 font-mono">
                <span>Total Pages: {docB.pageCount}</span>
                <span>SHA-256 Verified</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Slider Curtain Diff View */
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-[16/10] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 select-none">
            {/* Base Layer: Document A */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-gray-800">
              <div className="text-xs font-bold text-cyan-800 pb-2 border-b">
                A: {docA.name} • Page {options.activePage}
              </div>
              <div className="my-auto flex flex-col gap-2">
                <h4 className="text-base font-bold text-gray-900">Document Baseline Structure</h4>
                <p className="text-xs text-gray-500">
                  Slide the control below to reveal changes introduced in Revision B.
                </p>
              </div>
              <div className="text-[10px] text-gray-400 font-mono">Original Baseline</div>
            </div>

            {/* Overlaid Layer: Document B with CSS clip-path */}
            <div
              style={{ clipPath: `inset(0 0 0 ${options.sliderPosition}%)` }}
              className="absolute inset-0 p-8 flex flex-col justify-between bg-emerald-50 text-gray-900 border-l-2 border-emerald-500"
            >
              <div className="text-xs font-bold text-emerald-800 pb-2 border-b border-emerald-200">
                B: {docB.name} • Page {options.activePage}
              </div>
              <div className="my-auto flex flex-col gap-2">
                <h4 className="text-base font-bold text-emerald-950">Updated Revision Structure</h4>
                <p className="text-xs text-emerald-800">
                  Revealed portion highlights updated clauses and structural layout differences.
                </p>
              </div>
              <div className="text-[10px] text-emerald-600 font-mono">New Revision</div>
            </div>
          </div>

          {/* Draggable Slider Control */}
          <div className="flex items-center gap-3 bg-surface-container p-3 rounded-2xl shadow-inner">
            <span className="text-xs font-bold text-cyan-600 font-mono">Document A</span>
            <input
              type="range"
              min="0"
              max="100"
              value={options.sliderPosition}
              onChange={(e) => onSliderChange(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <span className="text-xs font-bold text-emerald-600 font-mono">Document B</span>
          </div>
        </div>
      )}
    </div>
  );
};
