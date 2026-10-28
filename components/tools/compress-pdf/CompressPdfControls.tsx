"use client";

import React from "react";
import { CompressOptions, CompressionLevel } from "./types";

interface Props {
  options: CompressOptions;
  isProcessing: boolean;
  onOptionsChange: (newOptions: CompressOptions) => void;
  onCompress: () => void;
}

export const CompressPdfControls: React.FC<Props> = ({
  options,
  isProcessing,
  onOptionsChange,
  onCompress,
}) => {
  const setLevel = (level: CompressionLevel) => {
    onOptionsChange({ ...options, level });
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#059669] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Compression Mode
        </h3>

        {/* Compression Presets */}
        <div className="flex flex-col gap-2">
          {/* Recommended */}
          <button
            type="button"
            onClick={() => setLevel("recommended")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.level === "recommended"
                ? "border-[#059669] bg-[#059669]/10 text-on-surface shadow-sm ring-1 ring-[#059669]"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span>Recommended</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold uppercase">
                  Best Balance
                </span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600">-50% Size</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Optimal balance between high compression ratio and crisp, readable document quality.
            </p>
          </button>

          {/* Extreme */}
          <button
            type="button"
            onClick={() => setLevel("extreme")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.level === "extreme"
                ? "border-[#059669] bg-[#059669]/10 text-on-surface shadow-sm ring-1 ring-[#059669]"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Extreme Compression</span>
              <span className="text-xs font-mono font-bold text-amber-600">-75% Size</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Maximum byte reduction. Strips non-essential streams, ideal for emailing and archiving.
            </p>
          </button>

          {/* Low */}
          <button
            type="button"
            onClick={() => setLevel("low")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
              options.level === "low"
                ? "border-[#059669] bg-[#059669]/10 text-on-surface shadow-sm ring-1 ring-[#059669]"
                : "border-outline-variant/40 bg-surface text-on-surface-variant hover:bg-surface-container"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Low Compression</span>
              <span className="text-xs font-mono font-bold text-blue-600">-25% Size</span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Light byte cleanup. Keeps maximum vector resolution, original metadata, and lossless quality.
            </p>
          </button>
        </div>

        {/* Advanced Toggles */}
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Optimization Filters
          </span>

          <label className="flex items-center justify-between p-2 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <span>Strip document metadata</span>
            <input
              type="checkbox"
              checked={options.stripMetadata}
              onChange={(e) => onOptionsChange({ ...options, stripMetadata: e.target.checked })}
              className="accent-[#059669]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <span>Compress Object Streams</span>
            <input
              type="checkbox"
              checked={options.cleanObjects}
              onChange={(e) => onOptionsChange({ ...options, cleanObjects: e.target.checked })}
              className="accent-[#059669]"
            />
          </label>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onCompress}
          disabled={isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(5,150,105,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#059669] hover:bg-[#047857] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>🗜️</span>
            <span>{isProcessing ? "Optimizing PDF..." : "Compress & Download"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
