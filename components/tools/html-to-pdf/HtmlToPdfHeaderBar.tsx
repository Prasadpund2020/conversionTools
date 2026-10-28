"use client";

import React from "react";
import Link from "next/link";
import { StagedHtmlInput } from "./types";
import { formatBytes } from "./htmlToPdfEngine";

interface Props {
  stagedInput: StagedHtmlInput | null;
  onReset: () => void;
}

export const HtmlToPdfHeaderBar: React.FC<Props> = ({
  stagedInput,
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
          <div className="w-6 h-6 rounded-md bg-[#ea580c] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            🌐
          </div>
          <span className="text-sm font-bold text-on-surface">HTML to PDF</span>
        </div>
      </div>

      {/* Action shortcuts / File badge */}
      <div className="flex items-center gap-2">
        {stagedInput && (
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface shadow-inner">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="font-semibold truncate max-w-[150px]">{stagedInput.name}</span>
            <span className="text-outline">({formatBytes(stagedInput.sizeBytes)})</span>
            <button
              onClick={onReset}
              className="ml-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              title="Clear HTML input"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
