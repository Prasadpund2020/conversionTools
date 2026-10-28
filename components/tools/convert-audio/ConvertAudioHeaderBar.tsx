"use client";

import React from "react";
import Link from "next/link";
import { AudioTargetFormat } from "./types";

interface ConvertAudioHeaderBarProps {
  onReset: () => void;
  onLoadSample: () => void;
  isProcessing: boolean;
  targetFormat: AudioTargetFormat;
}

export default function ConvertAudioHeaderBar({
  onReset,
  onLoadSample,
  isProcessing,
  targetFormat,
}: ConvertAudioHeaderBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        {/* Claymorphic Tool Tile (Sky Blue Audio Theme) */}
        <div
          className="w-16 h-16 rounded-2xl bg-white shadow-[0_12px_24px_-6px_rgba(14,165,233,0.22),0_4px_10px_rgba(0,0,0,0.06)] flex items-center justify-center relative group cursor-pointer transition-transform duration-300 hover:scale-105"
          style={{
            boxShadow:
              "0 14px 28px -6px rgba(14,165,233,0.22), inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -3px 5px rgba(0,0,0,0.07)",
          }}
        >
          <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-2px_4px_rgba(0,0,0,0.1)]">
            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>

          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-600 text-[9px] font-bold text-white items-center justify-center">
              ✓
            </span>
          </span>
        </div>

        {/* Title & Eyebrow */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-stone-500 text-xs font-bold uppercase tracking-wider">
            <Link href="/all-tools" className="hover:text-sky-700 transition-colors">
              Tools
            </Link>
            <span>/</span>
            <Link href="/all-tools/video-audio" className="hover:text-sky-700 transition-colors">
              Video &amp; Audio
            </Link>
            <span>/</span>
            <span className="text-sky-700 font-bold">Audio Converter</span>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase">
              To .{targetFormat}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2 mt-0.5">
            Audio Converter &amp; Transcoder
            <span className="hidden sm:inline-flex items-center text-xs font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg">
              Lossless Web Audio
            </span>
          </h1>
          <p className="text-xs text-stone-500 font-medium">
            Transcode between MP3, WAV, AAC, FLAC, and OGG formats with customized sample rates and bitrates.
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
          title="Load sample acoustic audio"
        >
          <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Load Acoustic Sample
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={isProcessing}
          className="px-3 py-2 text-xs font-bold rounded-xl border border-rose-200 bg-rose-50/80 text-rose-700 hover:bg-rose-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          title="Clear and convert another audio file"
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
