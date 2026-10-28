'use client';

import React, { useRef } from 'react';
import { AudioJoinerOptions } from './types';
import { formatTime } from './audioJoinerEngine';

interface AudioJoinerControlsProps {
  options: AudioJoinerOptions;
  totalDuration: number;
  trackCount: number;
  isProcessing: boolean;
  progressPercent: number;
  statusText: string;
  onOptionsChange: (newOptions: Partial<AudioJoinerOptions>) => void;
  onAddMoreFiles: (files: File[]) => void;
  onMerge: () => void;
}

export const AudioJoinerControls: React.FC<AudioJoinerControlsProps> = ({
  options,
  totalDuration,
  trackCount,
  isProcessing,
  progressPercent,
  statusText,
  onOptionsChange,
  onAddMoreFiles,
  onMerge,
}) => {
  const addFilesInputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddMoreFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Merger Settings</h2>
      </div>

      {/* Crossfade Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Crossfade Duration</span>
          <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">
            {options.crossfadeDuration === 0 ? 'None (Gapless)' : `${options.crossfadeDuration}s Blend`}
          </span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {([0, 1, 2, 3] as const).map((secs) => (
            <button
              key={secs}
              type="button"
              disabled={isProcessing}
              onClick={() => onOptionsChange({ crossfadeDuration: secs })}
              className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                options.crossfadeDuration === secs
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {secs === 0 ? '0s' : `${secs}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Track Stats Overview */}
      <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-900/30 text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
          <span>Total Audio Tracks:</span>
          <span className="font-mono font-semibold">{trackCount} Tracks</span>
        </div>
        <div className="flex items-center justify-between text-purple-700 dark:text-purple-300 font-bold border-t border-purple-200/40 dark:border-purple-900/30 pt-1.5">
          <span>Estimated Length:</span>
          <span className="font-mono">{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Add More Tracks Button */}
      <div>
        <input
          ref={addFilesInputRef}
          type="file"
          accept="audio/*"
          multiple
          onChange={handleAddFiles}
          className="hidden"
        />
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => addFilesInputRef.current?.click()}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800 transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add More Audio Tracks</span>
        </button>
      </div>

      {/* Action Button & Progress */}
      <div className="pt-2">
        {isProcessing ? (
          <div className="space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-purple-600 h-full transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[200px]">{statusText || 'Merging audio tracks...'}</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {progressPercent}%
              </span>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={trackCount === 0}
            onClick={onMerge}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 active:scale-[0.98] transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span>Merge {trackCount} Tracks to Master WAV</span>
          </button>
        )}
      </div>
    </div>
  );
};
