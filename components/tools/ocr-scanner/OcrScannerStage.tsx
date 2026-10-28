"use client";

import React, { useState } from "react";
import { OcrImageMeta, OcrResult, OcrOptions } from "./types";

interface OcrScannerStageProps {
  meta: OcrImageMeta;
  result: OcrResult | null;
  options: OcrOptions;
  isProcessing: boolean;
  onTextEdit: (newText: string) => void;
}

export default function OcrScannerStage({
  meta,
  result,
  options,
  isProcessing,
  onTextEdit,
}: OcrScannerStageProps) {
  const [viewMode, setViewMode] = useState<"split" | "image" | "text">("split");
  const [hoveredBlockIndex, setHoveredBlockIndex] = useState<number | null>(null);

  const fullText = result?.fullText || "";
  const lines = fullText.split("\n");

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top View Switcher Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Display Mode:</span>
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl">
            {(["split", "image", "text"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-bold capitalize rounded-lg transition-all cursor-pointer ${
                  viewMode === mode
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {mode === "split" ? "Split View" : mode === "image" ? "Scan Bounds" : "Clean Text"}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{result.blocks.length} Text Blocks Mapped</span>
          </div>
        )}
      </div>

      {/* Main Workspace Stage */}
      <div className="relative w-full rounded-3xl bg-stone-100/90 border border-stone-200/80 p-4 sm:p-6 min-h-[580px] shadow-inner">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-amber-600/20 border-t-amber-600 rounded-full animate-spin" />
            <span className="text-xs font-bold text-stone-700">Segmenting document characters...</span>
          </div>
        )}

        <div className={`grid gap-6 ${viewMode === "split" ? "grid-cols-1 xl:grid-cols-2" : "grid-cols-1"}`}>
          {/* IMAGE VIEW WITH BOUNDING BOXES */}
          {(viewMode === "split" || viewMode === "image") && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1">
                <span>Original Document with Optical Overlay</span>
                <span className="text-[10px] text-stone-400 font-mono">Hover block to inspect</span>
              </div>

              <div className="relative bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex items-center justify-center p-3 select-none">
                <div className="relative inline-block max-w-full">
                  <img
                    src={meta.dataUrl}
                    alt={meta.fileName}
                    className={`max-h-[540px] w-auto object-contain rounded-lg ${
                      options.invertColors ? "invert" : ""
                    }`}
                  />

                  {/* Bounding Box Highlights */}
                  {result &&
                    result.blocks.map((block, idx) => {
                      const scaleX = 100 / meta.width;
                      const scaleY = 100 / meta.height;

                      const isHovered = hoveredBlockIndex === idx;

                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredBlockIndex(idx)}
                          onMouseLeave={() => setHoveredBlockIndex(null)}
                          style={{
                            left: `${block.boundingBox.x * scaleX}%`,
                            top: `${block.boundingBox.y * scaleY}%`,
                            width: `${block.boundingBox.width * scaleX}%`,
                            height: `${block.boundingBox.height * scaleY}%`,
                          }}
                          className={`absolute border rounded-xs transition-all cursor-pointer ${
                            isHovered
                              ? "bg-amber-400/35 border-amber-600 z-10 shadow-sm"
                              : "bg-amber-400/15 border-amber-500/60 hover:bg-amber-400/30"
                          }`}
                          title={`${block.text} (${(block.confidence * 100).toFixed(0)}%)`}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* EXTRACTED TEXT EDITOR */}
          {(viewMode === "split" || viewMode === "text") && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1">
                <span>Extracted Searchable Text (Editable)</span>
                <span className="text-[10px] text-stone-400 font-mono">
                  {result?.characterCount || 0} chars • {lines.length} lines
                </span>
              </div>

              <div className="relative bg-white rounded-2xl shadow-sm border border-stone-200 p-4 flex flex-col min-h-[460px] max-h-[560px]">
                <textarea
                  value={fullText}
                  onChange={(e) => onTextEdit(e.target.value)}
                  placeholder="Extracted OCR text will appear here..."
                  className="w-full flex-1 p-2 font-mono text-xs sm:text-sm text-stone-800 leading-relaxed bg-transparent border-0 focus:ring-0 resize-none outline-none overflow-y-auto"
                />

                {/* Bottom Status Ribbon */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>Direct Browser Memory OCR Sandbox</span>
                  <span className="text-amber-700 font-bold">100% Client Decoded</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
