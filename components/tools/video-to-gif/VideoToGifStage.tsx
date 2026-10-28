'use client';

import React, { useRef, useState, useEffect } from 'react';
import { StagedVideoFile, GifOptions, GifResult } from './types';

interface VideoToGifStageProps {
  stagedFile: StagedVideoFile;
  options: GifOptions;
  result: GifResult | null;
  onOptionsChange: (newOptions: Partial<GifOptions>) => void;
}

export const VideoToGifStage: React.FC<VideoToGifStageProps> = ({
  stagedFile,
  options,
  result,
  onOptionsChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.currentTime >= options.endTime) {
        video.currentTime = options.startTime;
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [options.startTime, options.endTime]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      if (video.currentTime < options.startTime || video.currentTime >= options.endTime) {
        video.currentTime = options.startTime;
      }
      video.play();
    }
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val < options.endTime) {
      onOptionsChange({ startTime: val });
      if (videoRef.current) {
        videoRef.current.currentTime = val;
      }
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val > options.startTime) {
      onOptionsChange({ endTime: val });
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${m}:${s < 10 ? '0' : ''}${s}.${ms}`;
  };

  return (
    <div className="space-y-6">
      {/* Video Preview Card */}
      <div className="clay-card p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🎬</span>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[240px]">
              {stagedFile.name}
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
            {formatTime(currentTime)} / {formatTime(stagedFile.duration)}
          </span>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center group shadow-inner">
          <video
            ref={videoRef}
            src={stagedFile.videoUrl}
            playsInline
            className="w-full h-full object-contain"
          />

          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Dual Trim Sliders */}
        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                Trim Start: {formatTime(options.startTime)}
              </span>
              <span>{formatTime(stagedFile.duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={stagedFile.duration}
              step="0.1"
              value={options.startTime}
              onChange={handleStartChange}
              className="w-full accent-purple-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-pink-600 dark:text-pink-400">
                Trim End: {formatTime(options.endTime)}
              </span>
              <span>Total Duration: {formatTime(stagedFile.duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={stagedFile.duration}
              step="0.1"
              value={options.endTime}
              onChange={handleEndChange}
              className="w-full accent-pink-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Generated Result Output */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-transparent backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                GIF Created Successfully!
              </h3>
            </div>
            <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
              {(result.sizeBytes / (1024 * 1024)).toFixed(2)} MB • {result.frameCount} frames
            </span>
          </div>

          <div className="rounded-xl overflow-hidden bg-slate-900/80 p-2 flex items-center justify-center max-h-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.downloadUrl}
              alt="Generated animated GIF"
              className="max-h-[360px] w-auto object-contain rounded-lg shadow-md"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <a
              href={result.downloadUrl}
              download={result.fileName}
              className="clay-btn-emerald py-3 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Animated GIF</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
