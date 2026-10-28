"use client";

import React, { useState } from "react";
import { EpubBookMeta, EpubToPdfOptions, EpubToPdfResult } from "./types";

interface EpubToPdfPreviewStageProps {
  meta: EpubBookMeta;
  options: EpubToPdfOptions;
  result: EpubToPdfResult | null;
  isProcessing: boolean;
}

export default function EpubToPdfPreviewStage({
  meta,
  options,
  result,
  isProcessing,
}: EpubToPdfPreviewStageProps) {
  const [zoom, setZoom] = useState(100);
  const [activePreviewChapterIndex, setActivePreviewChapterIndex] = useState(0);

  const chapter = meta.chapters[activePreviewChapterIndex] || meta.chapters[0];

  const fontClass = options.fontFamily === "serif" ? "font-serif" : "font-sans";

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Stage Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Preview:</span>
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
            {options.trimSize} Trim Format
          </span>
          {result && (
            <span className="hidden sm:inline-flex text-[11px] text-stone-500 font-medium">
              • {result.pageCount} Book Pages Generated
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

      {/* Book Stage Container */}
      <div className="relative w-full rounded-3xl bg-stone-100/90 border border-stone-200/80 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[580px] overflow-auto shadow-inner">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-purple-600/20 border-t-purple-600 rounded-full animate-spin" />
            <span className="text-xs font-bold text-stone-700">Typesetting book pages...</span>
          </div>
        )}

        {/* Scaled Book Page */}
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
          className={`w-full max-w-[540px] min-h-[720px] bg-[#fdfbf7] rounded-lg shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] p-10 sm:p-14 flex flex-col justify-between transition-transform duration-200 border-l-4 border-l-stone-300/60 ${fontClass}`}
        >
          <div>
            {/* Running Header */}
            {options.includeRunningHeader && (
              <div className="flex items-center justify-between pb-3 mb-8 border-b border-stone-200/60 text-[10px] text-stone-400 italic">
                <span>{meta.title}</span>
                <span>{meta.author}</span>
              </div>
            )}

            {/* Chapter Heading */}
            {chapter && (
              <div className="mb-6 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-700 block mb-1">
                  Book Chapter
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                  {chapter.title}
                </h2>
                <div className="w-8 h-0.5 bg-purple-200 mx-auto mt-2" />
              </div>
            )}

            {/* Chapter Paragraphs */}
            <div className="flex flex-col gap-4 text-stone-800 text-xs sm:text-[13px] leading-relaxed text-justify">
              {chapter?.content.slice(0, 5).map((para, pIdx) => {
                if (pIdx === 0) {
                  const firstLetter = para.charAt(0);
                  const rest = para.slice(1);
                  return (
                    <p key={pIdx}>
                      <span className="float-left text-3xl font-black text-purple-900 leading-none pr-1.5 pt-0.5">
                        {firstLetter}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return <p key={pIdx}>{para}</p>;
              })}
            </div>
          </div>

          {/* Bottom Page Numbering */}
          {options.includePageNumbers && (
            <div className="text-center pt-6 mt-8 border-t border-stone-100 text-[11px] text-stone-400 font-serif">
              — {activePreviewChapterIndex + 1} —
            </div>
          )}
        </div>

        {/* Chapter Carousel Buttons under page */}
        {meta.chapters.length > 1 && (
          <div className="flex items-center gap-2 mt-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 shadow-xs text-xs font-bold">
            <button
              type="button"
              disabled={activePreviewChapterIndex === 0}
              onClick={() => setActivePreviewChapterIndex((i) => Math.max(0, i - 1))}
              className="p-1 rounded-md text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
            >
              ← Prev Chapter
            </button>
            <span className="text-stone-400 px-2">
              {activePreviewChapterIndex + 1} of {meta.chapters.length}
            </span>
            <button
              type="button"
              disabled={activePreviewChapterIndex >= meta.chapters.length - 1}
              onClick={() => setActivePreviewChapterIndex((i) => Math.min(meta.chapters.length - 1, i + 1))}
              className="p-1 rounded-md text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
            >
              Next Chapter →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
