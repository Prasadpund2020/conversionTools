"use client";

import React from "react";
import {
  VideoMeta,
  TrimOptions,
  TrimResult,
  TrimOutputFormat,
  VideoResolutionOption,
} from "./types";
import { formatTime } from "./trimVideoEngine";

interface TrimVideoControlsProps {
  meta: VideoMeta;
  options: TrimOptions;
  onOptionsChange: (newOptions: TrimOptions) => void;
  result: TrimResult | null;
  isProcessing: boolean;
  progress: number;
  onExecuteTrim: () => void;
  onDownload: () => void;
}

export default function TrimVideoControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  progress,
  onExecuteTrim,
  onDownload,
}: TrimVideoControlsProps) {
  const updateOption = <K extends keyof TrimOptions>(
    key: K,
    value: TrimOptions[K]
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

  const trimDuration = Math.max(0, options.endTime - options.startTime);

  return (
    <div className="flex flex-col gap-5 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
      {/* File & Video Info Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block mb-0.5">
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

        {/* Video Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Original</span>
            <span className="text-xs font-black text-stone-800">{formatTime(meta.duration)}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Trimmed</span>
            <span className="text-xs font-black text-purple-600">{formatTime(trimDuration)}</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Res</span>
            <span className="text-xs font-black text-stone-800">{meta.width}×{meta.height}</span>
          </div>
        </div>
      </div>

      {/* Start and End Times Manual Input */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1">
            Start Time (s)
          </label>
          <input
            type="number"
            min={0}
            max={options.endTime - 0.2}
            step={0.1}
            value={Number(options.startTime.toFixed(1))}
            onChange={(e) => updateOption("startTime", Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full py-2 px-3 text-xs font-mono font-bold bg-white border border-stone-200 rounded-xl text-stone-800 focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1">
            End Time (s)
          </label>
          <input
            type="number"
            min={options.startTime + 0.2}
            max={meta.duration}
            step={0.1}
            value={Number(options.endTime.toFixed(1))}
            onChange={(e) => updateOption("endTime", Math.min(meta.duration, parseFloat(e.target.value) || 0))}
            className="w-full py-2 px-3 text-xs font-mono font-bold bg-white border border-stone-200 rounded-xl text-stone-800 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Output Format */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Target Video Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(["mp4", "webm"] as TrimOutputFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => updateOption("outputFormat", fmt)}
              className={`py-2 px-3 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                options.outputFormat === fmt
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution & Speed */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Resolution
          </label>
          <select
            value={options.resolution}
            onChange={(e) => updateOption("resolution", e.target.value as VideoResolutionOption)}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-purple-500"
          >
            <option value="original">Original ({meta.height}p)</option>
            <option value="720p">720p HD</option>
            <option value="480p">480p SD</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Speed
          </label>
          <select
            value={options.playbackSpeed}
            onChange={(e) => updateOption("playbackSpeed", Number(e.target.value))}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-purple-500"
          >
            <option value={1}>1.0x (Normal)</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x (Fast)</option>
            <option value={2}>2.0x (2x Speed)</option>
          </select>
        </div>
      </div>

      {/* Audio Strip Toggle */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Mute &amp; Strip Audio Track</span>
          <input
            type="checkbox"
            checked={options.removeAudio}
            onChange={(e) => updateOption("removeAudio", e.target.checked)}
            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Progress Bar during execution */}
      {isProcessing && (
        <div className="flex flex-col gap-1.5 pt-2">
          <div className="flex justify-between text-[11px] font-bold text-stone-600">
            <span>Rendering Trimmed Clip...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-150"
            />
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <button
          type="button"
          onClick={onExecuteTrim}
          disabled={isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing Trim in Browser...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
              </svg>
              <span>Cut &amp; Render Clip ({formatTime(trimDuration)})</span>
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
            <span>Download Trimmed File ({formatFileSize(result.fileSizeBytes)})</span>
          </button>
        )}
      </div>
    </div>
  );
}
