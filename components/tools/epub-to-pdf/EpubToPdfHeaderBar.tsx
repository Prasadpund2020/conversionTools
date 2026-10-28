"use client";

import React from "react";
import Link from "next/link";

interface EpubToPdfHeaderBarProps {
  onReset: () => void;
  onLoadSample: () => void;
  isProcessing: boolean;
  pageCount?: number;
}

export default function EpubToPdfHeaderBar({
  onReset,
  onLoadSample,
  isProcessing,
  pageCount,
}: EpubToPdfHeaderBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Claymorphic Tool Tile (ePub Purple Theme) */}
        <div
          className="w-16 h-16 rounded-2xl bg-white shadow-[0_12px_24px_-6px_rgba(124,58,237,0.22),0_4px_10px_rgba(0,0,0,0.06)] flex items-center justify-center relative group cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{
            boxShadow:
              "0 14px 28px -6px rgba(124,58,237,0.22), inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -3px 5px rgba(0,0,0,0.07)",
          }}
        >
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.1)]">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-600 text-[9px] font-bold text-white items-center justify-center">
              ✓
            </span>
          </span>
        </div>

        {/* Title & Eyebrow */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-bold uppercase tracking-wider">
            <Link href="/all-tools" className="hover:text-purple-700 transition-colors">
              Tools
            </Link>
            <span>/</span>
            <Link href="/all-tools/edit-convert" className="hover:text-purple-700 transition-colors">
              Edit &amp; Convert
            </Link>
            <span>/</span>
            <span className="text-purple-700 font-bold">ePub to PDF</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
              Book Typesetter
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2 mt-0.5">
            ePub to PDF Book Typesetter
            {pageCount !== undefined && (
              <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg">
                {pageCount} Book Pages
              </span>
            )}
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Transform eBook ePub files into beautifully typeset, printable PDF books with cover pages and chapter tables.
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLoadSample}
          disabled={isProcessing}
          className="px-3 py-2 text-xs font-bold rounded-xl border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="Load sample classic eBook"
        >
          <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Load Classic Novel
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isProcessing}
          className="px-3 py-2 text-xs font-bold rounded-xl border border-rose-200 bg-rose-50/80 text-rose-700 hover:bg-rose-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="Clear and convert another eBook"
        >
          <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  );
}
