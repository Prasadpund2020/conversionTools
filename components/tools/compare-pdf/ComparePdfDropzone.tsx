"use client";

import React, { useRef, useState } from "react";
import { StagedComparePdf } from "./types";
import { formatBytes } from "./comparePdfEngine";

interface Props {
  docA: StagedComparePdf | null;
  docB: StagedComparePdf | null;
  onSelectDocA: (file: File) => void;
  onSelectDocB: (file: File) => void;
  isLoading: boolean;
}

export const ComparePdfDropzone: React.FC<Props> = ({
  docA,
  docB,
  onSelectDocA,
  onSelectDocB,
  isLoading,
}) => {
  const [isDragA, setIsDragA] = useState(false);
  const [isDragB, setIsDragB] = useState(false);
  const inputRefA = useRef<HTMLInputElement>(null);
  const inputRefB = useRef<HTMLInputElement>(null);

  const handleDropA = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragA(false);
    if (e.dataTransfer.files?.[0]?.name.toLowerCase().endsWith(".pdf")) {
      onSelectDocA(e.dataTransfer.files[0]);
    }
  };

  const handleDropB = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragB(false);
    if (e.dataTransfer.files?.[0]?.name.toLowerCase().endsWith(".pdf")) {
      onSelectDocB(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      <div className="text-center flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-on-surface">Upload Documents to Compare</h3>
        <p className="text-sm text-on-surface-variant">
          Select two PDF revisions to analyze side-by-side differences, text modifications, and layout shifts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document A (Original) */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragA(true);
          }}
          onDragLeave={() => setIsDragA(false)}
          onDrop={handleDropA}
          onClick={() => inputRefA.current?.click()}
          className={`relative rounded-3xl p-8 text-center cursor-pointer transition-all border-2 border-dashed flex flex-col items-center justify-center gap-3 ${
            docA
              ? "border-cyan-500 bg-cyan-500/10"
              : isDragA
              ? "border-[#0891b2] bg-[#0891b2]/10 scale-[1.01]"
              : "border-outline-variant/60 bg-surface-container-low hover:border-cyan-500 hover:bg-surface-container-high/40"
          } shadow-xl min-h-[220px]`}
        >
          <input
            ref={inputRefA}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onSelectDocA(e.target.files[0])}
          />
          <div className="w-14 h-14 rounded-2xl bg-[#0891b2] text-white flex items-center justify-center text-2xl shadow-md">
            📄
          </div>
          {docA ? (
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-cyan-600 tracking-wider">
                Original Document (A)
              </span>
              <span className="font-bold text-sm text-on-surface truncate max-w-[200px]">
                {docA.name}
              </span>
              <span className="text-[11px] text-outline">
                {docA.pageCount} Pages • {formatBytes(docA.size)}
              </span>
              <span className="text-[10px] text-cyan-700 underline mt-1">Click to replace</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-outline tracking-wider">
                Document A (Original)
              </span>
              <span className="font-semibold text-sm text-on-surface">Drop or choose first PDF</span>
              <span className="text-[11px] text-outline">Baseline revision</span>
            </div>
          )}
        </div>

        {/* Document B (Updated Revision) */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragB(true);
          }}
          onDragLeave={() => setIsDragB(false)}
          onDrop={handleDropB}
          onClick={() => inputRefB.current?.click()}
          className={`relative rounded-3xl p-8 text-center cursor-pointer transition-all border-2 border-dashed flex flex-col items-center justify-center gap-3 ${
            docB
              ? "border-emerald-500 bg-emerald-500/10"
              : isDragB
              ? "border-emerald-600 bg-emerald-600/10 scale-[1.01]"
              : "border-outline-variant/60 bg-surface-container-low hover:border-emerald-500 hover:bg-surface-container-high/40"
          } shadow-xl min-h-[220px]`}
        >
          <input
            ref={inputRefB}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onSelectDocB(e.target.files[0])}
          />
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md">
            📑
          </div>
          {docB ? (
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-emerald-600 tracking-wider">
                Updated Document (B)
              </span>
              <span className="font-bold text-sm text-on-surface truncate max-w-[200px]">
                {docB.name}
              </span>
              <span className="text-[11px] text-outline">
                {docB.pageCount} Pages • {formatBytes(docB.size)}
              </span>
              <span className="text-[10px] text-emerald-700 underline mt-1">Click to replace</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold text-outline tracking-wider">
                Document B (New Revision)
              </span>
              <span className="font-semibold text-sm text-on-surface">Drop or choose second PDF</span>
              <span className="text-[11px] text-outline">Updated file to compare</span>
            </div>
          )}
        </div>
      </div>

      {/* Privacy guarantee badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-on-surface-variant">
        <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
          🔒 100% Client-Side Comparison
        </span>
        <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
          ⚡ Side-by-Side In-Memory Analysis
        </span>
        <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
          🚫 No Server Uploads
        </span>
      </div>
    </div>
  );
};
