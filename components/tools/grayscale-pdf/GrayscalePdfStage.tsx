'use client';

import React from 'react';
import { StagedGrayscalePdfFile, GrayscalePdfResult, GrayscaleOptions } from './types';
import { formatBytes } from './grayscalePdfEngine';

interface GrayscalePdfStageProps {
  stagedFile: StagedGrayscalePdfFile;
  options: GrayscaleOptions;
  result: GrayscalePdfResult | null;
}

export const GrayscalePdfStage: React.FC<GrayscalePdfStageProps> = ({
  stagedFile,
  options,
  result,
}) => {
  return (
    <div className="space-y-6">
      {/* File Overview Card */}
      <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-100 text-xl shadow-inner">
              📄
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate max-w-[300px]">
                {stagedFile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatBytes(stagedFile.size)} • {stagedFile.pageCount} Pages
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono">
            {options.dpi} DPI • {options.mode}
          </span>
        </div>

        {/* Visual Grayscale Preview Banner */}
        <div className="p-8 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
          {/* Swatch gradient preview */}
          <div className="w-full max-w-sm h-8 rounded-lg overflow-hidden border border-white/20 flex shadow-md">
            <div className="flex-1 bg-black" />
            <div className="flex-1 bg-slate-800" />
            <div className="flex-1 bg-slate-600" />
            <div className="flex-1 bg-slate-400" />
            <div className="flex-1 bg-slate-200" />
            <div className="flex-1 bg-white" />
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-200">
              Monochrome Desaturation Pipeline
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              All RGB color planes across vector drawings, photos, and backgrounds will be converted to luminance channels.
            </p>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-slate-500/10 via-slate-800/10 to-transparent backdrop-blur-xl border border-slate-500/30 dark:border-slate-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Grayscale PDF Ready!
              </h3>
            </div>
            <span className="text-xs font-mono bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-full font-semibold">
              {formatBytes(result.sizeBytes)} • {result.pageCount} pgs
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Successfully generated monochrome PDF. All pages have been desaturated and optimized for printer toner efficiency.
          </p>

          <div className="flex justify-end pt-2">
            <a
              href={result.downloadUrl}
              download={result.fileName}
              className="clay-btn-slate py-3 px-6 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 transition-all shadow-lg shadow-slate-900/25 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Grayscale PDF</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
