"use client";

import React from "react";
import Link from "next/link";
import { StagedComparePdf } from "./types";
import { formatBytes } from "./comparePdfEngine";

interface Props {
  docA: StagedComparePdf | null;
  docB: StagedComparePdf | null;
  onReset: () => void;
}

export const ComparePdfHeaderBar: React.FC<Props> = ({
  docA,
  docB,
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
          <div className="w-6 h-6 rounded-md bg-[#0891b2] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            ⚖️
          </div>
          <span className="text-sm font-bold text-on-surface">Compare Revisions</span>
        </div>
      </div>

      {/* Action shortcuts / File status badges */}
      <div className="flex items-center gap-2">
        {(docA || docB) && (
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface shadow-inner">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span className="font-semibold truncate max-w-[120px]">
              {docA ? docA.name : "Waiting for A"}
            </span>
            <span className="text-outline">vs</span>
            <span className="font-semibold truncate max-w-[120px]">
              {docB ? docB.name : "Waiting for B"}
            </span>
            <button
              onClick={onReset}
              className="ml-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              title="Reset comparison"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
