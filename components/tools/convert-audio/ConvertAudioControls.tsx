"use client";

import React from "react";
import {
  AudioConvertSource,
  AudioConvertOptions,
  AudioConvertResult,
  AudioTargetFormat,
  AudioBitrate,
  AudioChannelMode,
} from "./types";

interface ConvertAudioControlsProps {
  meta: AudioConvertSource;
  options: AudioConvertOptions;
  onOptionsChange: (newOptions: AudioConvertOptions) => void;
  result: AudioConvertResult | null;
  isProcessing: boolean;
  onDownload: () => void;
}

export default function ConvertAudioControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  onDownload,
}: ConvertAudioControlsProps) {
  const updateOption = <K extends keyof AudioConvertOptions>(
    key: K,
    value: AudioConvertOptions[K]
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
      {/* Track Information Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block mb-0.5">
              Source Master
            </span>
            <h4 className="text-xs font-bold text-stone-900 truncate" title={meta.fileName}>
              {meta.fileName}
            </h4>
          </div>
          <span className="text-[11px] font-mono text-stone-500 shrink-0">
            {formatFileSize(meta.fileSize)}
          </span>
        </div>

        {/* Quick Audio Specs */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200/60 text-center">
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Duration</span>
            <span className="text-xs font-black text-stone-800">{meta.duration.toFixed(1)}s</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Sample Rate</span>
            <span className="text-xs font-black text-stone-800">{meta.sampleRate / 1000}kHz</span>
          </div>
          <div className="bg-white rounded-xl py-1.5 px-2 border border-stone-200/50">
            <span className="text-[10px] text-stone-400 block font-medium">Channels</span>
            <span className="text-xs font-black text-stone-800">{meta.channels === 2 ? "Stereo" : "Mono"}</span>
          </div>
        </div>
      </div>

      {/* Target Format Picker */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Convert To Format
        </label>
        <div className="grid grid-cols-5 gap-1.5">
          {(["mp3", "wav", "aac", "flac", "ogg"] as AudioTargetFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => updateOption("targetFormat", fmt)}
              className={`py-2 text-xs font-bold uppercase rounded-xl border text-center transition-all cursor-pointer ${
                options.targetFormat === fmt
                  ? "bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-500/20"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              .{fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Bitrate Selector (if not wav/flac) */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Target Bitrate
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { rate: 320 as AudioBitrate, label: "320k", sub: "Studio" },
            { rate: 256 as AudioBitrate, label: "256k", sub: "High" },
            { rate: 192 as AudioBitrate, label: "192k", sub: "Standard" },
            { rate: 128 as AudioBitrate, label: "128k", sub: "Compact" },
          ].map((b) => (
            <button
              key={b.rate}
              type="button"
              onClick={() => updateOption("bitrate", b.rate)}
              className={`p-2 text-center rounded-xl border transition-all cursor-pointer ${
                options.bitrate === b.rate
                  ? "bg-sky-50 border-sky-500 text-sky-900"
                  : "bg-white border-stone-200 hover:bg-stone-50 text-stone-700"
              }`}
            >
              <div className="text-xs font-black">{b.label}</div>
              <div className="text-[9px] text-stone-400 font-medium">{b.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sample Rate & Channel Mode */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Sample Rate
          </label>
          <select
            value={options.sampleRate}
            onChange={(e) => updateOption("sampleRate", Number(e.target.value))}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value={48000}>48,000 Hz (Cinema)</option>
            <option value={44100}>44,100 Hz (CD Audio)</option>
            <option value={22050}>22,050 Hz (Podcast)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1.5">
            Channel Mode
          </label>
          <select
            value={options.channelMode}
            onChange={(e) => updateOption("channelMode", e.target.value as AudioChannelMode)}
            className="w-full py-2 px-2.5 text-xs font-bold bg-white border border-stone-200 rounded-xl text-stone-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value="stereo">Stereo (2-Ch)</option>
            <option value="mono">Mono Downmix (1-Ch)</option>
          </select>
        </div>
      </div>

      {/* Normalize Volume Toggle */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
          <span className="font-semibold">Normalize Peak Dynamic Gain</span>
          <input
            type="checkbox"
            checked={options.normalizeGain}
            onChange={(e) => updateOption("normalizeGain", e.target.checked)}
            className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
          />
        </label>
      </div>

      {/* Download CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!result || isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Transcoding Audio Stream...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download .{options.targetFormat.toUpperCase()}</span>
              {result && (
                <span className="text-[11px] font-normal opacity-90">
                  ({formatFileSize(result.fileSizeBytes)})
                </span>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
