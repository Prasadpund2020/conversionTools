"use client";

import React from "react";
import Link from "next/link";
import { StagedOrganizeFile } from "./types";
import { formatBytes } from "./organizePdfEngine";

interface Props {
  stagedFile: StagedOrganizeFile | null;
  currentPageCount: number;
  onReset: () => void;
}

export const OrganizePdfHeaderBar: React.FC<Props> = ({
  stagedFile,
  currentPageCount,
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
          <div className="w-6 h-6 rounded-md bg-[#9333ea] text-white flex items-center justify-center text-xs font-bold shadow-sm">
            📑
          </div>
          <span className="text-sm font-bold text-on-surface">Organize PDF</span>
        </div>
      </div>

      {/* Action shortcuts / File badge */}
      <div className="flex items-center gap-2">
        {stagedFile && (
          <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface shadow-inner">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="font-semibold truncate max-w-[150px]">{stagedFile.name}</span>
            <span className="text-outline">
              ({currentPageCount} pgs • {formatBytes(stagedFile.size)})
            </span>
            <button
              onClick={onReset}
              className="ml-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
              title="Remove file"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
