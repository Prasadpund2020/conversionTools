"use client";

import React from "react";
import Link from "next/link";
import { StagedCompressFile } from "./types";
import { formatBytes } from "./compressPdfEngine";

interface Props {
  stagedFile: StagedCompressFile | null;
  onLoadSample: () => void;
  onReset: () => void;
}

export const CompressPdfHeaderBar: React.FC<Props> = ({
  stagedFile,
  onLoadSample,
  onReset,
}) => {
  return (
    <div className="w-full bg-surface-container-low/70 border-b border-outline-variant/30 px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
      {/* Breadcrumb & Title */}
      <div className="flex items-center gap-3">
        <Link
          href="/all-tools"
          className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
        >
          Tools
        </Link>
        <span className="text-outline text-xs">•</span>
        <Link
          href="/all-tools/pdf"
          className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-wider"
        >
          PDF Tools
        </Link>
        <span className="text-outline text-xs">•</span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#059669] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            ⚡
          </div>
          <span className="text-sm font-bold text-on-surface">Compress PDF</span>
        </div>
      </div>

      {/* Action shortcuts / File badge */}
      <div className="flex items-center gap-2">
        {stagedFile ? (
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold truncate max-w-[150px]">{stagedFile.name}</span>
            <span className="text-outline">({stagedFile.pageCount} pgs • {formatBytes(stagedFile.size)})</span>
            <button
              onClick={onReset}
              className="ml-1 text-on-surface-variant hover:text-error transition-colors"
              title="Remove file"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={onLoadSample}
            className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📄</span>
            <span>Load Test Benchmark PDF</span>
          </button>
        )}
      </div>
    </div>
  );
};
