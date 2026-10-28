"use client";

import React from "react";
import { RepairOptions } from "./types";

interface Props {
  options: RepairOptions;
  isProcessing: boolean;
  onOptionsChange: (newOptions: RepairOptions) => void;
  onRepair: () => void;
}

export const RepairPdfControls: React.FC<Props> = ({
  options,
  isProcessing,
  onOptionsChange,
  onRepair,
}) => {
  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#eab308] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Repair Strategies
        </h3>

        {/* Toggles */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <div className="flex flex-col gap-0.5">
              <span>Rebuild Xref & Trailer</span>
              <span className="text-[10px] text-outline">Replaces corrupted cross-reference blocks</span>
            </div>
            <input
              type="checkbox"
              checked={options.forceTrailerRebuild}
              onChange={(e) =>
                onOptionsChange({ ...options, forceTrailerRebuild: e.target.checked })
              }
              className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <div className="flex flex-col gap-0.5">
              <span>Purge Corrupt Annotations</span>
              <span className="text-[10px] text-outline">Discards unreadable widget dictionaries</span>
            </div>
            <input
              type="checkbox"
              checked={options.stripCorruptAnnotations}
              onChange={(e) =>
                onOptionsChange({ ...options, stripCorruptAnnotations: e.target.checked })
              }
              className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <div className="flex flex-col gap-0.5">
              <span>Sanitize Object Streams</span>
              <span className="text-[10px] text-outline">Repairs truncated Flate compression streams</span>
            </div>
            <input
              type="checkbox"
              checked={options.sanitizeStreams}
              onChange={(e) =>
                onOptionsChange({ ...options, sanitizeStreams: e.target.checked })
              }
              className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
            />
          </label>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onRepair}
          disabled={isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(234,179,8,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#ca8a04] hover:bg-[#a16207] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>🛠️</span>
            <span>{isProcessing ? "Rebuilding Document..." : "Reconstruct & Repair PDF"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
