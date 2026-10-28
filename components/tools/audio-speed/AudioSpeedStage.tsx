'use client';

import React, { useRef, useState, useEffect } from 'react';
import { StagedAudioFile, AudioSpeedOptions, ProcessedAudioResult } from './types';

interface AudioSpeedStageProps {
  stagedFile: StagedAudioFile;
  options: AudioSpeedOptions;
  result: ProcessedAudioResult | null;
}

export const AudioSpeedStage: React.FC<AudioSpeedStageProps> = ({
  stagedFile,
  options,
  result,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = options.speed;
    }
  }, [options.speed]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.playbackRate = options.speed;
      audio.play().catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const val = parseFloat(e.target.value);
    if (audio) {
      audio.currentTime = val;
      setCurrentTime(val);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Audio Waveform Player Card */}
      <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400 text-lg">
              🎵
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[280px]">
                {stagedFile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {stagedFile.sampleRate} Hz • {stagedFile.numberOfChannels === 2 ? 'Stereo' : 'Mono'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 font-semibold">
            {formatTime(currentTime)} / {formatTime(stagedFile.duration)}
          </span>
        </div>

        {/* Decorative Waveform Bars */}
        <div className="h-24 bg-slate-950/90 rounded-xl p-4 flex items-center justify-between gap-1 overflow-hidden shadow-inner">
          {Array.from({ length: 48 }).map((_, i) => {
            const heightPercent = 20 + Math.sin(i * 0.4) * 35 + Math.cos(i * 0.8) * 25;
            const isPassed =
              stagedFile.duration > 0 && currentTime / stagedFile.duration > i / 48;
            return (
              <div
                key={i}
                style={{ height: `${Math.max(12, Math.min(100, heightPercent))}%` }}
                className={`w-full rounded-full transition-all duration-150 ${
                  isPassed
                    ? 'bg-orange-500 shadow-sm shadow-orange-500/50'
                    : 'bg-slate-700/60'
                } ${isPlaying ? 'animate-pulse' : ''}`}
              />
            );
          })}
        </div>

        {/* Playback Controls & Scrubber */}
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max={stagedFile.duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-orange-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {formatTime(currentTime)}
            </span>

            <button
              type="button"
              onClick={togglePlay}
              className="clay-btn-orange w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 active:scale-95 transition-all shadow-md shadow-orange-500/30"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {formatTime(stagedFile.duration)}
            </span>
          </div>
        </div>

        {/* Audio Element for native preview with playbackRate */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>

      {/* Result Card when processed */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-orange-500/10 to-transparent backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Speed Adjusted Audio Ready!
              </h3>
            </div>
            <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
              {(result.sizeBytes / (1024 * 1024)).toFixed(2)} MB • {formatTime(result.duration)}
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
              <span>Download {result.fileName}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
