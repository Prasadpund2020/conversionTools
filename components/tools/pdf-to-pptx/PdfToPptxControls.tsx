'use client';

import React from 'react';
import { PptxOptions, PptxSlideRatio } from './types';

interface PdfToPptxControlsProps {
  options: PptxOptions;
  slideCount: number;
  isProcessing: boolean;
  progressPercent: number;
  statusText: string;
  onOptionsChange: (newOptions: Partial<PptxOptions>) => void;
  onConvert: () => void;
}

export const PdfToPptxControls: React.FC<PdfToPptxControlsProps> = ({
  options,
  slideCount,
  isProcessing,
  progressPercent,
  statusText,
  onOptionsChange,
  onConvert,
}) => {
  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Slide Deck Settings</h2>
      </div>

      {/* Slide Aspect Ratio */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Presentation Aspect Ratio</span>
          <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
            {options.ratio}
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ ratio: '16:9' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.ratio === '16:9'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            16:9 Widescreen (Modern)
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ ratio: '4:3' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.ratio === '4:3'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            4:3 Standard (Classic)
          </button>
        </div>
      </div>

      {/* Render Quality */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Graphic Rendering Fidelity</span>
          <span className="text-orange-600 dark:text-orange-400 font-mono">
            {options.quality >= 0.9 ? 'Ultra HD' : 'Standard'}
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ quality: 0.85 })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.quality < 0.9
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Balanced (Light .pptx)
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ quality: 0.94 })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.quality >= 0.9
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Presentation Crisp (HQ)
          </button>
        </div>
      </div>

      {/* Compatibility Notice */}
      <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs text-slate-600 dark:text-slate-300 space-y-1">
        <p className="font-semibold text-orange-800 dark:text-orange-300">Format Compatibility:</p>
        <p>
          Creates standard OpenXML PowerPoint format (.pptx) fully editable in Microsoft PowerPoint 2007+, Google Slides, and Apple Keynote.
        </p>
      </div>

      {/* Action Button & Progress */}
      <div className="pt-2">
        {isProcessing ? (
          <div className="space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-600 h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[200px]">{statusText || 'Converting slides...'}</span>
              <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                {progressPercent}%
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConvert}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
          >
            <span>Convert {slideCount} Pages to .PPTX</span>
          </button>
        )}
      </div>
    </div>
  );
};
