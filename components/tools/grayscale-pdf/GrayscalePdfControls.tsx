'use client';

import React from 'react';
import { GrayscaleOptions, GrayscaleMode, GrayscaleDpi } from './types';

interface GrayscalePdfControlsProps {
  options: GrayscaleOptions;
  pageCount: number;
  isProcessing: boolean;
  progressPercent: number;
  statusText: string;
  onOptionsChange: (newOptions: Partial<GrayscaleOptions>) => void;
  onConvert: () => void;
}

export const GrayscalePdfControls: React.FC<GrayscalePdfControlsProps> = ({
  options,
  pageCount,
  isProcessing,
  progressPercent,
  statusText,
  onOptionsChange,
  onConvert,
}) => {
  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Monochrome Profile</h2>
      </div>

      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Conversion Style
        </label>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ mode: 'grayscale' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
              options.mode === 'grayscale'
                ? 'bg-slate-800 text-white shadow-md shadow-slate-900/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>Smooth 256 Grayscale (Recommended)</span>
            {options.mode === 'grayscale' && <span>✓</span>}
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ mode: 'high-contrast' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
              options.mode === 'high-contrast'
                ? 'bg-slate-800 text-white shadow-md shadow-slate-900/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>High Contrast (Crisp Document Text)</span>
            {options.mode === 'high-contrast' && <span>✓</span>}
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ mode: 'pure-bw' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
              options.mode === 'pure-bw'
                ? 'bg-slate-800 text-white shadow-md shadow-slate-900/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>Pure Black & White (1-Bit Threshold)</span>
            {options.mode === 'pure-bw' && <span>✓</span>}
          </button>
        </div>
      </div>

      {/* DPI Resolution */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Output Print Resolution</span>
          <span className="text-slate-600 dark:text-slate-300 font-mono font-bold">
            {options.dpi} DPI
          </span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([150, 200, 300] as GrayscaleDpi[]).map((d) => (
            <button
              key={d}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ dpi: d })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                options.dpi === d
                  ? 'bg-slate-800 text-white shadow-md shadow-slate-900/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {d} DPI {d === 150 ? '(Fast)' : d === 300 ? '(HQ)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Contrast adjustment */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Contrast Adjustment</span>
          <span className="font-mono">{options.contrast > 0 ? `+${options.contrast}` : options.contrast}</span>
        </div>
        <input
          type="range"
          min="-40"
          max="40"
          step="5"
          value={options.contrast}
          disabled={isProcessing}
          onChange={(e) => onOptionsChange({ contrast: parseInt(e.target.value, 10) })}
          className="w-full accent-slate-800 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />
      </div>

      {/* Action Button & Progress */}
      <div className="pt-2">
        {isProcessing ? (
          <div className="space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-slate-800 dark:bg-slate-200 h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[200px]">{statusText || 'Converting pages...'}</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {progressPercent}%
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConvert}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-slate-800 to-slate-950 hover:from-slate-700 hover:to-slate-900 active:scale-[0.98] transition-all shadow-lg shadow-slate-900/30 flex items-center justify-center gap-2"
          >
            <span>Convert {pageCount} Pages to Grayscale</span>
          </button>
        )}
      </div>
    </div>
  );
};
