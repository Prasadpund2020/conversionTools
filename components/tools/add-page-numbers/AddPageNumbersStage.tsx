"use client";

import React from "react";
import { StagedNumberPdfFile, PageNumberOptions } from "./types";
import { formatPageNumberText } from "./addPageNumbersEngine";

interface Props {
  stagedFile: StagedNumberPdfFile;
  options: PageNumberOptions;
  activePage: number;
  onPageChange: (page: number) => void;
}

export const AddPageNumbersStage: React.FC<Props> = ({
  stagedFile,
  options,
  activePage,
  onPageChange,
}) => {
  const currentStampText = formatPageNumberText(
    activePage - 1,
    stagedFile.pageCount,
    options
  );

  const getPositionClasses = () => {
    switch (options.position) {
      case "top-left":
        return "items-start justify-start p-6";
      case "top-center":
        return "items-start justify-center p-6";
      case "top-right":
        return "items-start justify-end p-6";
      case "bottom-left":
        return "items-end justify-start p-6";
      case "bottom-center":
        return "items-end justify-center p-6";
      case "bottom-right":
        return "items-end justify-end p-6";
      default:
        return "items-end justify-center p-6";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Overview Toolbar */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-on-surface">{stagedFile.name}</span>
          <span className="text-outline">
            (Page {activePage} of {stagedFile.pageCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <button
              type="button"
              disabled={activePage <= 1}
              onClick={() => onPageChange(activePage - 1)}
              className="w-7 h-7 rounded bg-surface-container hover:bg-surface flex items-center justify-center disabled:opacity-30 cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              disabled={activePage >= stagedFile.pageCount}
              onClick={() => onPageChange(activePage + 1)}
              className="w-7 h-7 rounded bg-surface-container hover:bg-surface flex items-center justify-center disabled:opacity-30 cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Paper Presentation Board */}
      <div className="w-full rounded-3xl bg-surface-container-low p-6 shadow-2xl border border-outline-variant/30 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[620px] aspect-[1/1.414] bg-white rounded-xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden border border-gray-200 select-none">
          {/* Mock Document Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-800 tracking-wide">
              {stagedFile.name}
            </span>
            <span className="text-[10px] font-mono text-gray-400">PAGE NUMBERS PREVIEW</span>
          </div>

          {/* Mock Document Body Content */}
          <div className="my-auto flex flex-col gap-3">
            <h3 className="text-base font-bold text-gray-900">
              Document Page Layout &amp; Content Stream
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Page numbers and Bates identifiers are stamped dynamically according to your
              placement rules without disturbing the existing text flows or margins.
            </p>
            <div className="space-y-2 pt-2">
              <div className="w-full h-2 bg-gray-100 rounded"></div>
              <div className="w-5/6 h-2 bg-gray-100 rounded"></div>
              <div className="w-4/6 h-2 bg-gray-100 rounded"></div>
              <div className="w-3/6 h-2 bg-gray-100 rounded"></div>
            </div>
          </div>

          {/* Mock Document Footer */}
          <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-mono flex justify-between">
            <span>FileLab Document Services</span>
            <span>Verified Stream</span>
          </div>

          {/* PAGE NUMBER STAMP OVERLAY */}
          <div className={`absolute inset-0 pointer-events-none flex ${getPositionClasses()}`}>
            <div
              style={{
                fontSize: `${options.fontSize}px`,
                fontFamily:
                  options.font === "TimesRoman"
                    ? "serif"
                    : options.font === "Courier"
                    ? "monospace"
                    : "sans-serif",
                color: options.fontColor,
              }}
              className="font-bold tracking-tight bg-blue-50/80 border border-blue-400/40 px-2 py-0.5 rounded shadow-sm"
            >
              {currentStampText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
