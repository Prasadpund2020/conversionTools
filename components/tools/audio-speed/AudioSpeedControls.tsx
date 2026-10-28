'use client';

import React from 'react';
import { AudioSpeedOptions, StagedAudioFile } from './types';

interface AudioSpeedControlsProps {
  options: AudioSpeedOptions;
  stagedFile: StagedAudioFile;
  isProcessing: boolean;
  onOptionsChange: (newOptions: Partial<AudioSpeedOptions>) => void;
  onProcessAndDownload: () => void;
}

export const AudioSpeedControls: React.FC<AudioSpeedControlsProps> = ({
  options,
  stagedFile,
  isProcessing,
  onOptionsChange,
  onProcessAndDownload,
}) => {
  const newDuration = stagedFile.duration / options.speed;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const presets = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Speed Multiplier</h2>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Speed Presets</span>
          <span className="text-orange-600 dark:text-orange-400 font-mono font-bold text-sm">
            {options.speed.toFixed(2)}x
          </span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {presets.map((s) => (
            <button
              key={s}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ speed: s })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                Math.abs(options.speed - s) < 0.01
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s}x {s === 1.0 ? '(Normal)' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Slower (0.25x)</span>
          <span>Faster (3.0x)</span>
        </div>
        <input
          type="range"
          min="0.25"
          max="3.0"
          step="0.05"
          value={options.speed}
          disabled={isProcessing}
          onChange={(e) => onOptionsChange({ speed: parseFloat(e.target.value) })}
          className="w-full accent-orange-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
        />
      </div>

      {/* Duration comparison */}
      <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200/50 dark:border-orange-900/30 text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Original Duration:
          </span>
          <span className="font-mono font-semibold">{formatTime(stagedFile.duration)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-900 dark:text-slate-100 font-bold border-t border-orange-200/40 dark:border-orange-900/30 pt-1.5">
          <span className="flex items-center gap-1.5 text-orange-700 dark:text-orange-400">
            <span className="text-sm">⚡</span>
            New Output Duration:
          </span>
          <span className="font-mono text-orange-600 dark:text-orange-400">
            {formatTime(newDuration)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={isProcessing}
          onClick={onProcessAndDownload}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 active:scale-[0.98] transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Resampling Audio Buffer...</span>
            </div>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export & Download 16-Bit WAV</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
