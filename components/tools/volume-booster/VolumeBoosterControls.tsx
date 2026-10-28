"use client";

import React from "react";
import { AudioMeta, BoosterOptions, BoosterResult } from "./types";

interface VolumeBoosterControlsProps {
  meta: AudioMeta;
  options: BoosterOptions;
  onOptionsChange: (newOptions: BoosterOptions) => void;
  result: BoosterResult | null;
  isProcessing: boolean;
  onDownload: () => void;
}

export default function VolumeBoosterControls({
  meta,
  options,
  onOptionsChange,
  result,
  isProcessing,
  onDownload,
}: VolumeBoosterControlsProps) {
  const updateOption = <K extends keyof BoosterOptions>(
    key: K,
    value: BoosterOptions[K]
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

  const boostPercent = Math.round(options.boostMultiplier * 100);

  return (
    <div className="flex flex-col gap-5 bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm">
      {/* Track Information Card */}
      <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-0.5">
              Active Audio
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

      {/* Boost Multiplier Slider & Presets */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
            Volume Boost Gain
          </label>
          <span className="text-xs font-black text-amber-600 font-mono px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200">
            {boostPercent}% ({options.boostMultiplier.toFixed(2)}x)
          </span>
        </div>

        <input
          type="range"
          min={1.0}
          max={3.0}
          step={0.05}
          value={options.boostMultiplier}
          onChange={(e) => updateOption("boostMultiplier", parseFloat(e.target.value))}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />

        {/* Quick Presets */}
        <div className="grid grid-cols-5 gap-1.5 mt-2.5">
          {[1.25, 1.5, 2.0, 2.5, 3.0].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => updateOption("boostMultiplier", preset)}
              className={`py-1 text-[11px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                Math.abs(options.boostMultiplier - preset) < 0.02
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
              }`}
            >
              {Math.round(preset * 100)}%
            </button>
          ))}
        </div>
      </div>

      {/* Equalizer Filters */}
      <div className="flex flex-col gap-3 pt-2 border-t border-stone-100">
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
            <span>Bass Boost (Low Shelf)</span>
            <span className="font-mono text-amber-700">+{options.bassBoostDb} dB</span>
          </div>
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={options.bassBoostDb}
            onChange={(e) => updateOption("bassBoostDb", parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
            <span>Treble Clarity (High Shelf)</span>
            <span className="font-mono text-amber-700">+{options.trebleBoostDb} dB</span>
          </div>
          <input
            type="range"
            min={0}
            max={8}
            step={1}
            value={options.trebleBoostDb}
            onChange={(e) => updateOption("trebleBoostDb", parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
        </div>
      </div>

      {/* Anti-Clipping Soft Limiter Toggle */}
      <div className="pt-2 border-t border-stone-100">
        <label className="flex items-start justify-between gap-3 text-xs text-stone-700 cursor-pointer">
          <div>
            <span className="font-bold block text-stone-900">Anti-Clipping Soft Limiter</span>
            <span className="text-[11px] text-stone-500">Smooths dynamic peaks to eliminate harsh distortion when boosted to 300%.</span>
          </div>
          <input
            type="checkbox"
            checked={options.limiterEnabled}
            onChange={(e) => updateOption("limiterEnabled", e.target.checked)}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0 mt-0.5"
          />
        </label>
      </div>

      {/* Download CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onDownload}
          disabled={!result || isProcessing}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Amplifying Audio Track...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Boosted Audio</span>
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
