"use client";

import React from "react";
import {
  PageNumberOptions,
  PageNumberPosition,
  PageNumberFormat,
  PageNumberFont,
} from "./types";

interface Props {
  options: PageNumberOptions;
  totalPages: number;
  isProcessing: boolean;
  onOptionsChange: (newOptions: PageNumberOptions) => void;
  onApply: () => void;
}

const POSITIONS: { id: PageNumberPosition; label: string }[] = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

export const AddPageNumbersControls: React.FC<Props> = ({
  options,
  totalPages,
  isProcessing,
  onOptionsChange,
  onApply,
}) => {
  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#2563eb] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Page Number Setup
        </h3>

        {/* Position Grid (Top 3 and Bottom 3) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Position on Page
          </label>
          <div className="grid grid-cols-3 gap-1 bg-surface-container p-2 rounded-xl shadow-inner">
            {POSITIONS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onOptionsChange({ ...options, position: p.id })}
                className={`py-2 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  options.position === p.id
                    ? "bg-[#2563eb] text-white shadow-sm"
                    : "bg-surface text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Format Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Numbering Format
          </label>
          <select
            value={options.format}
            onChange={(e) =>
              onOptionsChange({ ...options, format: e.target.value as PageNumberFormat })
            }
            className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
          >
            <option value="page-n">Page 1 (Page {`{n}`})</option>
            <option value="page-n-of-total">Page 1 of {totalPages} (Page {`{n}`} of {`{total}`})</option>
            <option value="n-slash-total">1 / {totalPages} ({`{n}`} / {`{total}`})</option>
            <option value="just-n">1 ({`{n}`})</option>
            <option value="bates-stamp">Legal Bates Stamping (CONF-000001)</option>
          </select>
        </div>

        {/* Bates Stamping Fields if selected */}
        {options.format === "bates-stamp" && (
          <div className="grid grid-cols-2 gap-2 bg-surface-container p-3 rounded-xl shadow-inner">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant">Prefix</label>
              <input
                type="text"
                value={options.batesPrefix}
                onChange={(e) => onOptionsChange({ ...options, batesPrefix: e.target.value })}
                placeholder="e.g. CONF"
                className="w-full px-2 py-1 rounded-lg bg-surface text-xs font-semibold border border-outline-variant/40"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant">Digits</label>
              <select
                value={options.batesPadding}
                onChange={(e) =>
                  onOptionsChange({ ...options, batesPadding: parseInt(e.target.value, 10) })
                }
                className="w-full px-2 py-1 rounded-lg bg-surface text-xs font-semibold border border-outline-variant/40"
              >
                <option value={4}>4 (0001)</option>
                <option value={6}>6 (000001)</option>
                <option value={8}>8 (00000001)</option>
              </select>
            </div>
          </div>
        )}

        {/* Typography & Color */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Typeface
            </label>
            <select
              value={options.font}
              onChange={(e) =>
                onOptionsChange({ ...options, font: e.target.value as PageNumberFont })
              }
              className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
            >
              <option value="Helvetica">Helvetica</option>
              <option value="TimesRoman">Times Roman</option>
              <option value="Courier">Courier Mono</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Font Size ({options.fontSize}pt)
            </label>
            <input
              type="range"
              min={8}
              max={24}
              value={options.fontSize}
              onChange={(e) =>
                onOptionsChange({ ...options, fontSize: parseInt(e.target.value, 10) })
              }
              className="w-full accent-blue-600 cursor-pointer pt-2"
            />
          </div>
        </div>

        {/* Starting Number & Page Range */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Start Index
            </label>
            <input
              type="number"
              min={1}
              value={options.startNumber}
              onChange={(e) =>
                onOptionsChange({ ...options, startNumber: parseInt(e.target.value, 10) || 1 })
              }
              className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Apply to Pages
            </label>
            <input
              type="text"
              value={options.pagesRange}
              onChange={(e) => onOptionsChange({ ...options, pagesRange: e.target.value })}
              placeholder="all or 2-10"
              className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
            />
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onApply}
          disabled={isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(37,99,235,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#2563eb] hover:bg-[#1d4ed8] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>🔢</span>
            <span>{isProcessing ? "Stamping Page Numbers..." : "Stamp Numbers & Download"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
