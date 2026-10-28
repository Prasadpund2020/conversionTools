'use client';

import React from 'react';
import { CensorMode, CensorShape, CensorRegion, BlurFaceOptions } from './types';

interface BlurFaceControlsProps {
  options: BlurFaceOptions;
  regions: CensorRegion[];
  onOptionsChange: (newOptions: Partial<BlurFaceOptions>) => void;
  onClearRegions: () => void;
  onExport: (format: 'png' | 'jpeg') => void;
}

export const BlurFaceControls: React.FC<BlurFaceControlsProps> = ({
  options,
  regions,
  onOptionsChange,
  onClearRegions,
  onExport,
}) => {
  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h2 className="font-bold text-slate-800 dark:text-slate-100">Censor Tool Settings</h2>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-semibold">
          {regions.length} {regions.length === 1 ? 'Box' : 'Boxes'}
        </span>
      </div>

      {/* Censor Mode (Blur, Pixelate, Blackout) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Censor Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onOptionsChange({ activeMode: 'blur' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.activeMode === 'blur'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Smooth Blur
          </button>
          <button
            type="button"
            onClick={() => onOptionsChange({ activeMode: 'pixelate' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.activeMode === 'pixelate'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Pixelate Mosaic
          </button>
          <button
            type="button"
            onClick={() => onOptionsChange({ activeMode: 'blackout' })}
            className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.activeMode === 'blackout'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Blackout Bar
          </button>
        </div>
      </div>

      {/* Shape Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Censor Shape
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOptionsChange({ activeShape: 'ellipse' })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.activeShape === 'ellipse'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded-full border-2 border-current inline-block" />
            <span>Oval (Face)</span>
          </button>
          <button
            type="button"
            onClick={() => onOptionsChange({ activeShape: 'rect' })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
              options.activeShape === 'rect'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <span className="w-3.5 h-3.5 rounded border-2 border-current inline-block" />
            <span>Rectangle (Card/ID)</span>
          </button>
        </div>
      </div>

      {/* Intensity Slider (only for blur and pixelate) */}
      {options.activeMode !== 'blackout' && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>{options.activeMode === 'blur' ? 'Blur Radius' : 'Pixel Block Size'}</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-mono">
              {options.intensity}px
            </span>
          </div>
          <input
            type="range"
            min={options.activeMode === 'blur' ? 6 : 8}
            max={options.activeMode === 'blur' ? 36 : 40}
            step="2"
            value={options.intensity}
            onChange={(e) => onOptionsChange({ intensity: parseInt(e.target.value, 10) })}
            className="w-full accent-cyan-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      )}

      {/* Guide Note */}
      <div className="p-3 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/50 dark:border-cyan-900/30 text-xs text-slate-600 dark:text-slate-300 space-y-1">
        <p className="font-semibold text-cyan-800 dark:text-cyan-300">How to censor:</p>
        <p>Click & drag across any face or text on the photo to draw a censor region.</p>
      </div>

      {/* Region Actions */}
      {regions.length > 0 && (
        <button
          type="button"
          onClick={onClearRegions}
          className="w-full py-2 px-3 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/40 flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span>Clear All {regions.length} Censor Boxes</span>
        </button>
      )}

      {/* Export Options */}
      <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Save Photo
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onExport('png')}
            className="clay-btn-cyan py-3 px-3 rounded-xl font-bold text-white bg-cyan-600 hover:bg-cyan-500 active:scale-95 transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center gap-2 text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PNG</span>
          </button>
          <button
            type="button"
            onClick={() => onExport('jpeg')}
            className="clay-btn-blue py-3 px-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 text-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download JPG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
