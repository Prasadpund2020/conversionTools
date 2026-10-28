'use client';

import React from 'react';
import { UpscaleOptions, UpscaleFactor, UpscaleAlgorithm } from './types';

interface ImageUpscalerControlsProps {
  options: UpscaleOptions;
  origWidth: number;
  origHeight: number;
  isProcessing: boolean;
  progressPercent: number;
  statusText: string;
  onOptionsChange: (newOptions: Partial<UpscaleOptions>) => void;
  onUpscale: () => void;
}

export const ImageUpscalerControls: React.FC<ImageUpscalerControlsProps> = ({
  options,
  origWidth,
  origHeight,
  isProcessing,
  progressPercent,
  statusText,
  onOptionsChange,
  onUpscale,
}) => {
  const newWidth = origWidth * options.factor;
  const newHeight = origHeight * options.factor;

  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Upscale Parameters</h2>
      </div>

      {/* Factor Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Upscale Factor</span>
          <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
            {options.factor}x Enlarge
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {([2, 4] as UpscaleFactor[]).map((f) => (
            <button
              key={f}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ factor: f })}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                options.factor === f
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {f}x Factor {f === 2 ? '(Double)' : '(4x Super Res)'}
            </button>
          ))}
        </div>
      </div>

      {/* Dimension preview badge */}
      <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30 text-xs space-y-1.5">
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Original Dimensions:</span>
          <span className="font-mono">{origWidth} × {origHeight} px</span>
        </div>
        <div className="flex justify-between text-blue-700 dark:text-blue-300 font-bold border-t border-blue-200/50 dark:border-blue-900/30 pt-1">
          <span>Target Resolution:</span>
          <span className="font-mono">{newWidth} × {newHeight} px</span>
        </div>
      </div>

      {/* Algorithm Style */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Scaling Engine
        </label>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ algorithm: 'smooth' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
              options.algorithm === 'smooth'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>Bicubic Smooth (Photos & Portraits)</span>
            {options.algorithm === 'smooth' && <span>✓</span>}
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ algorithm: 'sharp' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
              options.algorithm === 'sharp'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>Sharp Edge Enhancement (Text & Graphics)</span>
            {options.algorithm === 'sharp' && <span>✓</span>}
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => onOptionsChange({ algorithm: 'pixel-art' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between transition-all ${
              options.algorithm === 'pixel-art'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span>Crisp Pixel Art (Retro & Icons)</span>
            {options.algorithm === 'pixel-art' && <span>✓</span>}
          </button>
        </div>
      </div>

      {/* Action Button & Progress */}
      <div className="pt-2">
        {isProcessing ? (
          <div className="space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[200px]">{statusText || 'Upscaling pixels...'}</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                {progressPercent}%
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onUpscale}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <span>Upscale to {newWidth} × {newHeight} px</span>
          </button>
        )}
      </div>
    </div>
  );
};
