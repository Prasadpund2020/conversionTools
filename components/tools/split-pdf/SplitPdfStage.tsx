"use client";

import React from "react";
import { StagedSplitFile, SplitOptions } from "./types";
import { formatBytes } from "./splitPdfEngine";

interface Props {
  stagedFile: StagedSplitFile;
  options: SplitOptions;
  onTogglePage: (pageNum: number) => void;
}

export const SplitPdfStage: React.FC<Props> = ({
  stagedFile,
  options,
  onTogglePage,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* File Overview Bar */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-md flex items-center justify-between border border-outline-variant/30 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">📄</span>
          <div>
            <span className="font-bold text-on-surface block">{stagedFile.name}</span>
            <span className="text-outline text-[11px]">
              {stagedFile.pageCount} Pages • {formatBytes(stagedFile.size)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-surface-container text-[#006591] font-bold text-xs">
            {options.mode === "extract-all" && "Splitting all pages into separate PDFs"}
            {options.mode === "by-ranges" && `Splitting by range: ${options.rangesText || "1-" + stagedFile.pageCount}`}
            {options.mode === "selected-single" && `${options.selectedPages.length} pages selected`}
          </span>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="w-full rounded-2xl bg-surface-container-low p-6 shadow-xl border border-outline-variant/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-on-surface">Page Thumbnails & Selection</h4>
          <span className="text-xs text-outline">
            {options.mode === "selected-single"
              ? "Click on any thumbnail to include or exclude"
              : "Review document page numbers"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: stagedFile.pageCount }).map((_, i) => {
            const pageNum = i + 1;
            const isSelected = options.selectedPages.includes(pageNum);

            return (
              <div
                key={pageNum}
                onClick={() => {
                  if (options.mode === "selected-single") {
                    onTogglePage(pageNum);
                  }
                }}
                className={`group relative rounded-xl p-3 flex flex-col justify-between aspect-[3/4] bg-white text-gray-800 shadow-sm transition-all border ${
                  options.mode === "selected-single"
                    ? isSelected
                      ? "border-2 border-[#006591] ring-2 ring-[#006591]/20 shadow-md cursor-pointer scale-[1.02]"
                      : "border-outline-variant/30 opacity-60 hover:opacity-100 cursor-pointer"
                    : "border-outline-variant/30"
                }`}
              >
                {/* Header within mock page */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-1 bg-gray-200 rounded"></div>
                  {options.mode === "selected-single" ? (
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isSelected
                          ? "bg-[#006591] text-white"
                          : "border border-gray-300 text-transparent"
                      }`}
                    >
                      ✓
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-gray-400">P.{pageNum}</span>
                  )}
                </div>

                {/* Mock page skeleton content */}
                <div className="my-auto flex flex-col gap-1.5 px-1">
                  <div className="w-full h-1.5 bg-gray-200 rounded"></div>
                  <div className="w-4/5 h-1.5 bg-gray-200 rounded"></div>
                  <div className="w-full h-1.5 bg-gray-100 rounded"></div>
                  <div className="w-2/3 h-1.5 bg-gray-100 rounded"></div>
                  <div className="w-1/2 h-1.5 bg-gray-100 rounded"></div>
                </div>

                {/* Footer page badge */}
                <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
                  <span>Page {pageNum}</span>
                  <span className="text-[#006591] font-semibold">FL-PDF</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
