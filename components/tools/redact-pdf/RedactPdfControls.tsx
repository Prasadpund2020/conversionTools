"use client";

import React from "react";
import { RedactionBox, RedactOptions, RedactionStyle } from "./types";

interface Props {
  options: RedactOptions;
  boxes: RedactionBox[];
  activePage: number;
  isProcessing: boolean;
  onOptionsChange: (newOptions: RedactOptions) => void;
  onRemoveBox: (id: string) => void;
  onClearAllBoxes: () => void;
  onAddQuickPreset: (preset: "ssn" | "email" | "account") => void;
  onApplyRedactions: () => void;
}

export const RedactPdfControls: React.FC<Props> = ({
  options,
  boxes,
  activePage,
  isProcessing,
  onOptionsChange,
  onRemoveBox,
  onClearAllBoxes,
  onAddQuickPreset,
  onApplyRedactions,
}) => {
  const setStyle = (style: RedactionStyle) => {
    onOptionsChange({ ...options, activeStyle: style });
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#1f2937] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Redaction Style
        </h3>

        {/* Style Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setStyle("blackout")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              options.activeStyle === "blackout"
                ? "bg-black text-white shadow-md ring-2 ring-slate-400"
                : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
            }`}
          >
            <span className="w-4 h-4 bg-black rounded border border-gray-600"></span>
            <span>Blackout</span>
          </button>

          <button
            type="button"
            onClick={() => setStyle("whiteout")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              options.activeStyle === "whiteout"
                ? "bg-slate-200 text-slate-900 shadow-md ring-2 ring-slate-400"
                : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
            }`}
          >
            <span className="w-4 h-4 bg-white rounded border border-gray-400"></span>
            <span>Whiteout</span>
          </button>

          <button
            type="button"
            onClick={() => setStyle("redacted-label")}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
              options.activeStyle === "redacted-label"
                ? "bg-black text-white shadow-md ring-2 ring-slate-400"
                : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
            }`}
          >
            <span className="px-1 text-[8px] bg-black text-white rounded font-mono">REDACT</span>
            <span>Stamped</span>
          </button>
        </div>

        {/* Quick Presets for Demo / Easy Placement */}
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Quick Auto-Redact Zones
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onAddQuickPreset("ssn")}
              className="py-1.5 px-2 rounded-lg bg-surface hover:bg-surface-container-high text-[11px] font-semibold text-on-surface shadow-inner cursor-pointer"
            >
              + SSN Line
            </button>
            <button
              type="button"
              onClick={() => onAddQuickPreset("email")}
              className="py-1.5 px-2 rounded-lg bg-surface hover:bg-surface-container-high text-[11px] font-semibold text-on-surface shadow-inner cursor-pointer"
            >
              + Email
            </button>
            <button
              type="button"
              onClick={() => onAddQuickPreset("account")}
              className="py-1.5 px-2 rounded-lg bg-surface hover:bg-surface-container-high text-[11px] font-semibold text-on-surface shadow-inner cursor-pointer"
            >
              + Balance
            </button>
          </div>
        </div>

        {/* Redaction Boxes Queue */}
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface">Staged Blocks ({boxes.length})</span>
            {boxes.length > 0 && (
              <button
                type="button"
                onClick={onClearAllBoxes}
                className="text-[11px] text-red-500 hover:underline cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          {boxes.length === 0 ? (
            <div className="p-4 rounded-xl bg-surface border border-dashed border-outline-variant/40 text-center text-xs text-outline">
              Drag on the preview page or click a Quick Zone to create a blackout box.
            </div>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto">
              {boxes.map((b, idx) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-surface border border-outline-variant/30 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded ${
                        b.style === "whiteout" ? "bg-white border border-gray-400" : "bg-black"
                      }`}
                    ></span>
                    <span className="font-semibold text-on-surface">
                      Redaction #{idx + 1} (Pg {b.page})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveBox(b.id)}
                    className="text-on-surface-variant hover:text-error text-xs"
                    title="Delete box"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onApplyRedactions}
          disabled={boxes.length === 0 || isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(0,0,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#111827] hover:bg-black active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>⬛</span>
            <span>{isProcessing ? "Burning Redactions..." : "Burn Redactions & Download"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
