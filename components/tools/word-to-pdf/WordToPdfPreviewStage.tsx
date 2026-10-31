"use client";

import React, { useState } from "react";
import { WordDocMeta, WordToPdfOptions, WordToPdfResult } from "./types";

interface WordToPdfPreviewStageProps {
  meta: WordDocMeta;
  options: WordToPdfOptions;
  result: WordToPdfResult | null;
  isProcessing: boolean;
}

export default function WordToPdfPreviewStage({
  meta,
  options,
  result,
  isProcessing,
}: WordToPdfPreviewStageProps) {
  const [zoom, setZoom] = useState(100);

  const fontClass =
    options.fontFamily === "serif"
      ? "font-serif"
      : options.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Floating Canvas Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Preview Mode:</span>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
            Live Layout Locked
          </span>
          {result && (
            <span className="hidden sm:inline-flex text-[11px] text-stone-500 font-medium">
              • {result.pageCount} Generated Page{result.pageCount !== 1 ? "s" : ""}
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

      {/* Viewport Desk Area */}
      <div className="relative w-full rounded-3xl bg-stone-100/90 border border-stone-200/80 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[580px] overflow-auto shadow-inner">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <span className="text-xs font-bold text-stone-700">Updating PDF layout...</span>
          </div>
        )}

        {/* Realistic Virtual Document Paper */}
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
          className={`w-full max-w-[620px] min-h-[780px] bg-white rounded-lg shadow-[0_16px_36px_-12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)] p-8 sm:p-12 flex flex-col justify-between transition-transform duration-200 ${fontClass}`}
        >
          <div>
            {/* Header if enabled */}
            {options.includeHeader && (
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200 text-[10px] text-stone-400 font-medium">
                <span>{options.documentTitle || meta.title}</span>
                <span>Free Converting Tools Client Engine</span>
              </div>
            )}

            {/* Document Content Elements */}
            <div className="flex flex-col gap-4 text-stone-800">
              {meta.elements.map((el, idx) => {
                if (el.type === "table") {
                  return (
                    <div key={idx} className="my-2 overflow-x-auto rounded-xl border border-stone-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody>
                          {el.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className={rIdx === 0 ? "bg-blue-50/70 font-bold text-blue-950" : "border-t border-stone-100 hover:bg-stone-50/50"}
                            >
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="py-2 px-3 text-[11px] border-r border-stone-100 last:border-r-0">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                if (el.type === "heading1") {
                  return (
                    <h1 key={idx} className="text-xl sm:text-2xl font-black text-blue-950 tracking-tight mt-2 mb-1">
                      {el.runs.map((r, rIdx) => (
                        <span key={rIdx} className={r.bold ? "font-black" : ""}>
                          {r.text}
                        </span>
                      ))}
                    </h1>
                  );
                }

                if (el.type === "heading2") {
                  return (
                    <h2 key={idx} className="text-base font-bold text-stone-900 tracking-tight mt-3 mb-1">
                      {el.runs.map((r, rIdx) => (
                        <span key={rIdx}>{r.text}</span>
                      ))}
                    </h2>
                  );
                }

                if (el.type === "bullet") {
                  return (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-stone-700 pl-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>
                        {el.runs.map((r, rIdx) => (
                          <span key={rIdx}>{r.text}</span>
                        ))}
                      </span>
                    </div>
                  );
                }

                // Normal paragraph
                return (
                  <p key={idx} className="text-xs sm:text-[13px] leading-relaxed text-stone-700">
                    {el.runs.map((r, rIdx) => (
                      <span
                        key={rIdx}
                        className={`${r.bold ? "font-bold text-stone-900" : ""} ${r.italic ? "italic" : ""} ${
                          r.underline ? "underline" : ""
                        }`}
                      >
                        {r.text}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Footer if enabled */}
          {options.includePageNumbers && (
            <div className="flex items-center justify-between pt-4 mt-8 border-t border-stone-100 text-[10px] text-stone-400">
              <span>{meta.fileName}</span>
              <span>Page 1 of {result?.pageCount || 1}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
