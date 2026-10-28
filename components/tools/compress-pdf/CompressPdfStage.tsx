"use client";

import React from "react";
import { StagedCompressFile, CompressOptions, CompressResult } from "./types";
import { formatBytes } from "./compressPdfEngine";

interface Props {
  stagedFile: StagedCompressFile;
  options: CompressOptions;
  result: CompressResult | null;
}

export const CompressPdfStage: React.FC<Props> = ({
  stagedFile,
  options,
  result,
}) => {
  const getEstimatedSavings = () => {
    switch (options.level) {
      case "extreme":
        return 75;
      case "recommended":
        return 50;
      case "low":
        return 25;
      default:
        return 50;
    }
  };

  const estimatedSavings = getEstimatedSavings();
  const estimatedSize = Math.round(stagedFile.size * (1 - estimatedSavings / 100));

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Metrics Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-6 shadow-xl border border-outline-variant/30 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <h4 className="text-sm font-bold text-on-surface">{stagedFile.name}</h4>
              <p className="text-xs text-outline">{stagedFile.pageCount} Pages in document</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
            Client-Side Flate Engine
          </span>
        </div>

        {/* Compression Comparison Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original Size Card */}
          <div className="p-4 rounded-xl bg-surface border border-outline-variant/30 flex flex-col justify-between gap-2 shadow-inner">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Original Size
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-on-surface font-mono">
                {formatBytes(stagedFile.size)}
              </span>
              <span className="text-xs text-outline">100%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400 w-full rounded-full"></div>
            </div>
          </div>

          {/* Compressed / Target Size Card */}
          <div className="p-4 rounded-xl bg-surface border border-emerald-500/30 flex flex-col justify-between gap-2 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                {result ? "Compressed Size" : "Estimated Target"}
              </span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                {result ? `-${result.savingsPercentage}%` : `~-${estimatedSavings}%`}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 font-mono">
                {formatBytes(result ? result.compressedSize : estimatedSize)}
              </span>
              {result && (
                <span className="text-xs text-emerald-600 font-semibold">
                  Saved {formatBytes(result.savedBytes)}!
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-emerald-100 dark:bg-emerald-950 rounded-full overflow-hidden">
              <div
                style={{ width: `${result ? 100 - result.savingsPercentage : 100 - estimatedSavings}%` }}
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Quality Guarantee Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-md border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center text-xl font-bold">
            🔍
          </div>
          <div>
            <h5 className="font-bold text-on-surface">Zero Text Blurriness Guarantee</h5>
            <p className="text-[11px] text-on-surface-variant">
              Vector fonts and layout lines remain mathematically lossless while uncompressed stream blocks are compacted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
