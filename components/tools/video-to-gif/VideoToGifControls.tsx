'use client';

import React from 'react';
import { GifOptions, GifFps, GifResolution } from './types';

interface VideoToGifControlsProps {
  options: GifOptions;
  duration: number;
  isProcessing: boolean;
  progressPercent: number;
  statusText: string;
  onOptionsChange: (newOptions: Partial<GifOptions>) => void;
  onConvert: () => void;
}

export const VideoToGifControls: React.FC<VideoToGifControlsProps> = ({
  options,
  duration,
  isProcessing,
  progressPercent,
  statusText,
  onOptionsChange,
  onConvert,
}) => {
  const selectedDuration = Math.max(0.1, options.endTime - options.startTime);
  const estimatedFrames = Math.round(selectedDuration * options.fps);

  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">GIF Output Settings</h2>
      </div>

      {/* Frame Rate Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Frame Rate (FPS)</span>
          <span className="text-purple-600 dark:text-purple-400 font-mono lowercase">
            {options.fps} fps
          </span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([10, 15, 24] as GifFps[]).map((fpsVal) => (
            <button
              key={fpsVal}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ fps: fpsVal })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                options.fps === fpsVal
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {fpsVal} FPS {fpsVal === 15 ? '⭐' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Width (Resolution)</span>
          <span className="text-purple-600 dark:text-purple-400 font-mono">
            {options.width}px
          </span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {([320, 480, 640] as GifResolution[]).map((w) => (
            <button
              key={w}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ width: w })}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                options.width === w
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {w}p {w === 480 ? 'HD' : w === 640 ? 'Full' : 'Light'}
            </button>
          ))}
        </div>
      </div>

      {/* Speed Multiplier */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Playback Speed</span>
          <span className="text-purple-600 dark:text-purple-400 font-mono">
            {options.speed}x
          </span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[0.5, 1.0, 1.5, 2.0].map((s) => (
            <button
              key={s}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ speed: s })}
              className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                options.speed === s
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Trim Stats */}
      <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30 text-xs space-y-1">
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Clip Duration:</span>
          <span className="font-mono font-semibold">{selectedDuration.toFixed(1)}s</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-300">
          <span>Est. Frame Count:</span>
          <span className="font-mono font-semibold">~{estimatedFrames} frames</span>
        </div>
      </div>

      {/* Action Button & Progress */}
      <div className="pt-2">
        {isProcessing ? (
          <div className="space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{statusText || 'Processing frames...'}</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {progressPercent}%
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onConvert}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
          >
            <span>✨</span>
            <span>Generate Animated GIF</span>
          </button>
        )}
      </div>
    </div>
  );
};
