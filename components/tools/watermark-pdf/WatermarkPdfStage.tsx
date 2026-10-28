"use client";

import React, { useState } from "react";
import { StagedPdfFile, WatermarkOptions } from "./types";

interface Props {
  stagedFile: StagedPdfFile;
  options: WatermarkOptions;
  activePage: number;
  onPageChange: (page: number) => void;
}

export const WatermarkPdfStage: React.FC<Props> = ({
  stagedFile,
  options,
  activePage,
  onPageChange,
}) => {
  const [zoom, setZoom] = useState(100);

  const getPositionClasses = () => {
    switch (options.position) {
      case "top-left":
        return "items-start justify-start p-6";
      case "top-center":
        return "items-start justify-center p-6";
      case "top-right":
        return "items-start justify-end p-6";
      case "middle-left":
        return "items-center justify-start p-6";
      case "center":
        return "items-center justify-center p-6";
      case "middle-right":
        return "items-center justify-end p-6";
      case "bottom-left":
        return "items-end justify-start p-6";
      case "bottom-center":
        return "items-end justify-center p-6";
      case "bottom-right":
        return "items-end justify-end p-6";
      default:
        return "items-center justify-center p-6";
    }
  };

  const getFontFamily = () => {
    switch (options.font) {
      case "Helvetica":
        return "sans-serif";
      case "TimesRoman":
        return "serif";
      case "Courier":
        return "monospace";
      default:
        return "sans-serif";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Stage Canvas Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col items-center border border-outline-variant/30 overflow-hidden">
        {/* Canvas Toolbar */}
        <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded-full shadow-inner text-xs">
            <button
              type="button"
              onClick={() => setZoom(100)}
              className="px-2 py-0.5 rounded bg-surface text-on-surface hover:bg-surface-container-high transition-all"
            >
              Fit
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(150, z + 10))}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-surface-container-high"
            >
              +
            </button>
            <span className="font-mono px-1 font-semibold">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(70, z - 10))}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-surface-container-high"
            >
              -
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <span>
              Page <strong className="text-on-surface">{activePage}</strong> of {stagedFile.pageCount}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={activePage <= 1}
                onClick={() => onPageChange(activePage - 1)}
                className="w-6 h-6 rounded bg-surface-container hover:bg-surface flex items-center justify-center disabled:opacity-30 cursor-pointer"
              >
                ←
              </button>
              <button
                type="button"
                disabled={activePage >= stagedFile.pageCount}
                onClick={() => onPageChange(activePage + 1)}
                className="w-6 h-6 rounded bg-surface-container hover:bg-surface flex items-center justify-center disabled:opacity-30 cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Paper Presentation Board */}
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          className="relative w-full max-w-[720px] aspect-[16/10] bg-white rounded-xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden select-none border border-outline-variant/30 transition-transform"
        >
          {/* Mock Document Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#023b2c] text-white flex items-center justify-center font-bold text-xs">
                FL
              </div>
              <span className="text-xs font-bold text-gray-800 tracking-tight">
                {stagedFile.name} • Page {activePage}
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-400">SECURE PREVIEW</span>
          </div>

          {/* Document Content Mock */}
          <div className="my-auto grid grid-cols-12 gap-4 items-center">
            <div className="col-span-8 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-[#023b2c] uppercase tracking-wider">
                CONFIDENTIAL SECTION • MEMORANDUM
              </span>
              <h4 className="text-base font-extrabold text-gray-900 leading-snug">
                Executive Strategy Brief & Portfolio Metrics
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                This document is prepared strictly for internal board review. All proprietary models,
                financial disclosures, and customer contracts herein remain trade secrets.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <div className="h-1.5 w-16 bg-gray-200 rounded"></div>
                <div className="h-1.5 w-24 bg-gray-200 rounded"></div>
                <div className="h-1.5 w-12 bg-emerald-200 rounded"></div>
              </div>
            </div>
            <div className="col-span-4 h-24 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-center p-2 text-[10px] text-gray-400">
              <span className="text-lg mb-1">📊</span>
              <span>Encrypted Data Vector</span>
            </div>
          </div>

          {/* Footer Mock */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400">
            <span>Strictly Confidential • FileLab Enterprise Engine</span>
            <span>Ref: FL-2024-PDF</span>
          </div>

          {/* WATERMARK OVERLAY LAYER */}
          <div className={`absolute inset-0 pointer-events-none flex ${options.tiled ? "p-4" : getPositionClasses()}`}>
            {options.tiled ? (
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2 items-center justify-items-center">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      transform: `rotate(${options.rotation}deg)`,
                      opacity: options.opacity,
                      color: options.color,
                      fontFamily: getFontFamily(),
                      fontSize: `${Math.round(options.fontSize * 0.45)}px`,
                    }}
                    className="font-extrabold tracking-widest uppercase select-none text-center whitespace-nowrap"
                  >
                    {options.type === "text" ? (
                      options.text || "WATERMARK"
                    ) : options.imageDataUrl ? (
                      <img
                        src={options.imageDataUrl}
                        alt="Watermark"
                        className="w-16 h-10 object-contain"
                      />
                    ) : (
                      "LOGO"
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  transform: `rotate(${options.rotation}deg)`,
                  opacity: options.opacity,
                  color: options.color,
                  fontFamily: getFontFamily(),
                  fontSize: `${Math.round(options.fontSize * 0.65)}px`,
                }}
                className="font-extrabold tracking-widest uppercase select-none text-center whitespace-nowrap shadow-sm p-2"
              >
                {options.type === "text" ? (
                  options.text || "CONFIDENTIAL"
                ) : options.imageDataUrl ? (
                  <img
                    src={options.imageDataUrl}
                    alt="Watermark"
                    className="max-w-[180px] max-h-[100px] object-contain"
                  />
                ) : (
                  "LOGO"
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pages Scroller Tray */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-md flex flex-col gap-2 border border-outline-variant/30">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-on-surface">PDF Pages ({stagedFile.pageCount})</span>
          <span className="text-outline text-[11px]">Click thumbnail to inspect watermark stamp</span>
        </div>
        <div className="w-full flex items-center gap-3 overflow-x-auto pb-1 pt-1">
          {Array.from({ length: stagedFile.pageCount }).map((_, i) => {
            const pageNum = i + 1;
            const isActive = activePage === pageNum;
            return (
              <div
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                  isActive ? "scale-105" : "opacity-80 hover:opacity-100"
                }`}
              >
                <div
                  className={`relative w-18 h-12 rounded-lg bg-white shadow-sm flex flex-col justify-between p-1 overflow-hidden border ${
                    isActive ? "border-2 border-[#023b2c] shadow-md" : "border-outline-variant/40"
                  }`}
                >
                  <div className="w-8 h-1 bg-gray-200 rounded"></div>
                  <span className="text-[7px] text-gray-400 uppercase font-mono text-center truncate">
                    {options.text || "WM"}
                  </span>
                  <div className="w-full flex justify-between text-[7px] text-gray-400 font-mono">
                    <span>{pageNum}</span>
                    <span className="text-emerald-600 font-bold">✓</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? "font-bold text-[#023b2c]" : "text-on-surface-variant"
                  }`}
                >
                  P. {pageNum}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
