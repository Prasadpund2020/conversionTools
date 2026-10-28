'use client';

import React, { useState } from 'react';
import { AudioTrackItem, AudioJoinerResult } from './types';
import { formatBytes, formatTime } from './audioJoinerEngine';

interface AudioJoinerStageProps {
  tracks: AudioTrackItem[];
  result: AudioJoinerResult | null;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemoveTrack: (id: string) => void;
}

export const AudioJoinerStage: React.FC<AudioJoinerStageProps> = ({
  tracks,
  result,
  onMoveUp,
  onMoveDown,
  onRemoveTrack,
}) => {
  return (
    <div className="space-y-6">
      {/* Track Sequence List */}
      <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-base">🎵</span>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">
              Playback Track Sequence ({tracks.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Arrange tracks in desired order
          </span>
        </div>

        <div className="space-y-2.5">
          {tracks.map((track, idx) => (
            <div
              key={track.id}
              className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-xs text-slate-800 dark:text-slate-100 truncate max-w-[260px] sm:max-w-[360px]">
                    {track.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatTime(track.duration)} • {formatBytes(track.size)}
                  </p>
                </div>
              </div>

              {/* Action buttons (Move Up, Move Down, Delete) */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => onMoveUp(idx)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                  title="Move Up"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  disabled={idx === tracks.length - 1}
                  onClick={() => onMoveDown(idx)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 transition-colors"
                  title="Move Down"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveTrack(track.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-1"
                  title="Remove track"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-transparent backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Audio Tracks Joined Successfully!
              </h3>
            </div>
            <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
              {formatTime(result.duration)} • {formatBytes(result.sizeBytes)}
            </span>
          </div>

          <audio src={result.downloadUrl} controls className="w-full rounded-lg" />

          <div className="flex justify-end pt-2">
            <a
              href={result.downloadUrl}
              download={result.fileName}
              className="clay-btn-emerald py-3 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Master WAV</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
