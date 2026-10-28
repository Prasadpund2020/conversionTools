'use client';

import React from 'react';
import { MarkdownToPdfOptions, MarkdownFontSize } from './types';

interface MarkdownToPdfControlsProps {
  options: MarkdownToPdfOptions;
  onChangeOptions: (opts: Partial<MarkdownToPdfOptions>) => void;
  onConvert: () => void;
  isProcessing: boolean;
  onReset: () => void;
  canConvert: boolean;
}

export const MarkdownToPdfControls: React.FC<MarkdownToPdfControlsProps> = ({
  options,
  onChangeOptions,
  onConvert,
  isProcessing,
  onReset,
  canConvert,
}) => {
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          PDF Page Settings
        </h3>
        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors"
        >
          Clear & Start New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Page Size */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Paper Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['A4', 'Letter'] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onChangeOptions({ pageSize: size })}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                  options.pageSize === size
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Typography Scale
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['small', 'medium', 'large'] as MarkdownFontSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onChangeOptions({ fontSize: size })}
                className={`py-2 px-2 text-xs capitalize font-medium rounded-xl border transition-all text-center ${
                  options.fontSize === size
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Header toggle */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Header & Footer
          </label>
          <button
            type="button"
            onClick={() => onChangeOptions({ includeHeader: !options.includeHeader })}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
              options.includeHeader
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <span>Page Numbers</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              {options.includeHeader ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onConvert}
          disabled={!canConvert || isProcessing}
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
            !canConvert || isProcessing
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/20 active:scale-[0.99]'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Convert Markdown to PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
