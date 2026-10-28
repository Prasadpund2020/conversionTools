"use client";

import React from "react";
import Link from "next/link";

interface VolumeBoosterHeaderBarProps {
  onReset: () => void;
  onLoadSample: () => void;
  isProcessing: boolean;
  boostMultiplier: number;
}

export default function VolumeBoosterHeaderBar({
  onReset,
  onLoadSample,
  isProcessing,
  boostMultiplier,
}: VolumeBoosterHeaderBarProps) {
  const boostPercent = Math.round(boostMultiplier * 100);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Claymorphic Tool Tile (Booster Amber Theme) */}
        <div
          className="w-16 h-16 rounded-2xl bg-white shadow-[0_12px_24px_-6px_rgba(217,119,6,0.22),0_4px_10px_rgba(0,0,0,0.06)] flex items-center justify-center relative group cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{
            boxShadow:
              "0 14px 28px -6px rgba(217,119,6,0.22), inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -3px 5px rgba(0,0,0,0.07)",
          }}
        >
          <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.1)]">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </svg>
          </div>

          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-600 text-[9px] font-bold text-white items-center justify-center">
              ✓
            </span>
          </span>
        </div>

        {/* Title & Eyebrow */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-bold uppercase tracking-wider">
            <Link href="/all-tools" className="hover:text-amber-700 transition-colors">
              Tools
            </Link>
            <span>/</span>
            <Link href="/all-tools/video-audio" className="hover:text-amber-700 transition-colors">
              Video &amp; Audio
            </Link>
            <span>/</span>
            <span className="text-amber-700 font-bold">Audio Booster</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              300% Amplifier
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2 mt-0.5">
            Volume &amp; Audio Booster
            <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
              {boostPercent}% Gain
            </span>
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Amplify quiet audio and video tracks up to 300% with equalizer smoothing and anti-clipping limiter.
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
          title="Load sample studio audio"
        >
          <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Load Studio Sample
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isProcessing}
          className="px-3 py-2 text-xs font-bold rounded-xl border border-rose-200 bg-rose-50/80 text-rose-700 hover:bg-rose-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="Clear and boost another file"
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
