"use client";

import React from "react";
import { HtmlToPdfOptions, HtmlPaperSize, HtmlOrientation, HtmlMargins } from "./types";

interface Props {
  options: HtmlToPdfOptions;
  isProcessing: boolean;
  onOptionsChange: (newOptions: HtmlToPdfOptions) => void;
  onConvert: () => void;
}

export const HtmlToPdfControls: React.FC<Props> = ({
  options,
  isProcessing,
  onOptionsChange,
  onConvert,
}) => {
  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#ea580c] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Page Setup
        </h3>

        {/* Paper Size */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Paper Size
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["a4", "letter", "legal"] as HtmlPaperSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onOptionsChange({ ...options, paperSize: size })}
                className={`py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                  options.paperSize === size
                    ? "bg-[#ea580c] text-white shadow-md"
                    : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Orientation
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(["portrait", "landscape"] as HtmlOrientation[]).map((ori) => (
              <button
                key={ori}
                type="button"
                onClick={() => onOptionsChange({ ...options, orientation: ori })}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  options.orientation === ori
                    ? "bg-[#ea580c] text-white shadow-md"
                    : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
                }`}
              >
                {ori === "portrait" ? "📄 Portrait" : "📑 Landscape"}
              </button>
            ))}
          </div>
        </div>

        {/* Margins */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Margins
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(["normal", "narrow", "none"] as HtmlMargins[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onOptionsChange({ ...options, margins: m })}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  options.margins === m
                    ? "bg-[#ea580c] text-white shadow-md"
                    : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Background Toggle */}
        <label className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
          <span>Print Background Graphics</span>
          <input
            type="checkbox"
            checked={options.includeBackground}
            onChange={(e) =>
              onOptionsChange({ ...options, includeBackground: e.target.checked })
            }
            className="w-4 h-4 rounded accent-orange-500 cursor-pointer"
          />
        </label>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onConvert}
          disabled={isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(234,88,12,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#ea580c] hover:bg-[#c2410c] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>🌐</span>
            <span>{isProcessing ? "Rendering PDF..." : "Convert to PDF & Download"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
