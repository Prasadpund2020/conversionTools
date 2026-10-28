"use client";

import React from "react";
import { MuteVideoMeta, MuteOptions, MuteResult, MuteOutputFormat } from "./types";

interface MuteVideoControlsProps {
  meta: MuteVideoMeta;
  options: MuteOptions;
  onOptionsChange: (newOptions: MuteOptions) => void;
  result: MuteResult | null;
  isProcessing: boolean;
  progress: number;
  onExecuteMute: () => void;
  onDownload: () => void;
}

export default function MuteVideoControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  progress,
  onExecuteMute,
  onDownload,
}: MuteVideoControlsProps) {
  const updateOption = <K extends keyof MuteOptions>(
    key: K,
    value: MuteOptions[K]
  ) => {
    onOptionsChange({
      ...options,
      [key]: value,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col gap-5 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
      {/* File & Video Metadata Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block mb-0.5">
              Source Video
            </span>
            <h4 className="text-xs font-bold text-stone-900 truncate" title={meta.fileName}>
              {meta.fileName}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-500 shrink-0">
            {formatFileSize(meta.fileSize)}
          </span>
        </div>

        {/* Video Specs */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Duration</span>
            <span className="text-xs font-black text-stone-800">{meta.duration.toFixed(1)}s</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Dimensions</span>
            <span className="text-xs font-black text-stone-800">{meta.width}×{meta.height}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Audio Track</span>
            <span className="text-xs font-black text-rose-600">To Remove</span>
          </div>
        </div>
      </div>

      {/* Target Output Format */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Output Muted Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["mp4", "webm"] as MuteOutputFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => updateOption("outputFormat", fmt)}
              className={`py-2 px-3 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                options.outputFormat === fmt
                  ? "bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Speed Multiplier */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Playback Speed
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[1.0, 1.25, 1.5].map((spd) => (
            <button
              key={spd}
              type="button"
              onClick={() => updateOption("playbackSpeed", spd)}
              className={`py-1.5 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                options.playbackSpeed === spd
                  ? "bg-rose-50 border-rose-500 text-rose-900"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700"
              }`}
            >
              {spd}x {spd === 1.0 ? "(Normal)" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar during execution */}
      {isProcessing && (
        <div className="flex flex-col gap-1.5 pt-2">
          <div className="flex justify-between text-[11px] font-bold text-stone-600">
            <span>Stripping Audio Tracks...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-rose-600 to-red-500 transition-all duration-150"
            />
          </div>
        </div>
      )}

      {/* Action CTA */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={onExecuteMute}
          disabled={isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Encoding Silent Video...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
              <span>Strip Audio &amp; Mute Video</span>
            </>
          )}
        </button>

        {result && (
          <button
            type="button"
            onClick={onDownload}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Muted Video ({formatFileSize(result.fileSizeBytes)})</span>
          </button>
        )}
      </div>
    </div>
  );
}
