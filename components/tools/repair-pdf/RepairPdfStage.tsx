"use client";

import React from "react";
import { StagedDamagedPdf, RepairResult } from "./types";
import { formatBytes } from "./repairPdfEngine";

interface Props {
  stagedFile: StagedDamagedPdf;
  result: RepairResult | null;
  isProcessing: boolean;
}

export const RepairPdfStage: React.FC<Props> = ({
  stagedFile,
  result,
  isProcessing,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* File Overview Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl font-bold">
            📄
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">{stagedFile.name}</h4>
            <p className="text-outline text-[11px]">
              Raw Size: {formatBytes(stagedFile.size)} • Ready for Reconstruction
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold text-xs">
          {isProcessing ? "Reconstructing..." : result ? "Repair Complete" : "Staged for Scan"}
        </span>
      </div>

      {/* Diagnostic Recovery Log Viewport */}
      <div className="w-full rounded-3xl bg-surface-container-low p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20 text-xs">
          <span className="font-bold text-on-surface flex items-center gap-2">
            <span>🔬</span>
            <span>Diagnostic & Recovery Stream</span>
          </span>
          <span className="text-[10px] text-outline font-mono">100% In-Memory</span>
        </div>

        {result && result.diagnostics.length > 0 ? (
          <div className="flex flex-col gap-2 font-mono text-xs max-h-64 overflow-y-auto bg-black/90 p-4 rounded-2xl border border-gray-800 text-gray-200">
            {result.diagnostics.map((d, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-gray-500 text-[10px]">{d.timestamp}</span>
                <span
                  className={
                    d.type === "success"
                      ? "text-emerald-400 font-bold"
                      : d.type === "warning"
                      ? "text-amber-400"
                      : d.type === "recovered"
                      ? "text-cyan-400 font-bold"
                      : "text-gray-300"
                  }
                >
                  [{d.type.toUpperCase()}] {d.message}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-surface border border-dashed border-outline-variant/40 text-center flex flex-col items-center justify-center gap-2">
            <span className="text-2xl">🔧</span>
            <p className="text-xs font-semibold text-on-surface">
              Click &quot;Reconstruct &amp; Repair PDF&quot; to begin deep binary structural analysis.
            </p>
            <p className="text-[11px] text-outline max-w-sm">
              The engine will scan the byte stream, fix header and trailer terminators, re-index indirect
              objects, and rebuild the cross-reference table.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
