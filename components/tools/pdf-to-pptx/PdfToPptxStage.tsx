'use client';

import React from 'react';
import { StagedPdfToPptxFile, PptxResult, PptxOptions } from './types';
import { formatBytes } from './pdfToPptxEngine';

interface PdfToPptxStageProps {
  stagedFile: StagedPdfToPptxFile;
  options: PptxOptions;
  result: PptxResult | null;
}

export const PdfToPptxStage: React.FC<PdfToPptxStageProps> = ({
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
            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xl shadow-inner">
              📊
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate max-w-[300px]">
                {stagedFile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatBytes(stagedFile.size)} • {stagedFile.pageCount} Slides
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 font-mono">
            {options.ratio} Widescreen
          </span>
        </div>

        {/* Presentation Visual Card */}
        <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
          <div className="w-16 h-12 rounded-lg border-2 border-orange-500/50 bg-black/40 flex items-center justify-center shadow-lg">
            <span className="text-orange-400 text-lg font-bold">PPTX</span>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-base text-slate-100">
              {stagedFile.pageCount} Presentation Slides
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Each PDF page will be mapped as a dedicated PowerPoint slide preserving typography, layout, and graphics.
            </p>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-transparent backdrop-blur-xl border border-orange-500/30 dark:border-orange-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                PowerPoint Presentation Ready!
              </h3>
            </div>
            <span className="text-xs font-mono bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-full font-semibold">
              {formatBytes(result.sizeBytes)} • {result.slideCount} slides
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            OpenXML PowerPoint (.pptx) file successfully packaged. Ready for immediate playback and editing in PowerPoint or Google Slides.
          </p>

          <div className="flex justify-end pt-2">
            <a
              href={result.downloadUrl}
              download={result.fileName}
              className="clay-btn-orange py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 active:scale-95 transition-all shadow-lg shadow-orange-500/25 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download .PPTX File</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
