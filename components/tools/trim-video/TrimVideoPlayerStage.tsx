"use client";

import React, { useRef, useState, useEffect } from "react";
import { VideoMeta, TrimOptions } from "./types";
import { formatTime } from "./trimVideoEngine";

interface TrimVideoPlayerStageProps {
  meta: VideoMeta;
  options: TrimOptions;
  onOptionsChange: (newOptions: TrimOptions) => void;
  isProcessing: boolean;
}

export default function TrimVideoPlayerStage({
  meta,
  options,
  onOptionsChange,
  isProcessing,
}: TrimVideoPlayerStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const duration = meta.duration || 10;
  const startPercent = (options.startTime / duration) * 100;
  const endPercent = (options.endTime / duration) * 100;

  // Handle video time updates
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current.currentTime >= options.endTime) {
        videoRef.current.currentTime = options.startTime;
      }
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Preview only the trimmed segment
  const previewTrimSegment = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = options.startTime;
    videoRef.current.play();
    setIsPlaying(true);

    const checkEnd = () => {
      if (videoRef.current && videoRef.current.currentTime >= options.endTime) {
        videoRef.current.pause();
        setIsPlaying(false);
        videoRef.current.removeEventListener("timeupdate", checkEnd);
      }
    };
    videoRef.current.addEventListener("timeupdate", checkEnd);
  };

  // Seek video
  const handleSeek = (newTime: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = options.playbackSpeed;
      videoRef.current.muted = options.removeAudio;
    }
  }, [options.playbackSpeed, options.removeAudio]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Video Viewport Container */}
      <div className="relative w-full rounded-3xl bg-stone-900 border border-stone-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[420px] shadow-2xl overflow-hidden">
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          src={meta.videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="max-h-[460px] w-auto max-w-full rounded-2xl object-contain shadow-md cursor-pointer"
          onClick={togglePlay}
          playsInline
        />

        {/* Video Overlays (Controls Pill) */}
        <div className="mt-4 flex items-center justify-between w-full max-w-xl bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-stone-700/60 text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all cursor-pointer"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={previewTrimSegment}
              className="px-2.5 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Audition Trim
            </button>
          </div>

          <div className="font-mono text-stone-300 text-xs">
            <span className="text-purple-400 font-bold">{formatTime(currentTime)}</span>
            <span className="opacity-50"> / </span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Dual Handle Scrubber Timeline Deck */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-stone-200/80 p-5 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-bold text-stone-800">
          <div className="flex items-center gap-2">
            <span>Trim Range:</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[11px]">
              {formatTime(options.startTime)} → {formatTime(options.endTime)}
            </span>
          </div>
          <span className="text-stone-500 font-medium text-xs">
            Duration: <strong className="text-purple-700 font-bold">{formatTime(options.endTime - options.startTime)}</strong>
          </span>
        </div>

        {/* Visual Timeline Track */}
        <div className="relative h-10 w-full bg-stone-100 rounded-xl overflow-hidden border border-stone-200/80 flex items-center select-none">
          {/* Dimmed left area */}
          <div style={{ width: `${startPercent}%` }} className="h-full bg-stone-300/40" />

          {/* Active Highlighted Trim Window */}
          <div
            style={{ width: `${endPercent - startPercent}%` }}
            className="h-full bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 border-y-2 border-purple-500 relative flex items-center justify-between"
          >
            <div className="w-1.5 h-6 bg-purple-600 rounded-full mx-1" />
            <div className="text-[10px] font-bold text-purple-900 tracking-wider uppercase opacity-75">
              Keep Clip
            </div>
            <div className="w-1.5 h-6 bg-purple-600 rounded-full mx-1" />
          </div>

          {/* Dimmed right area */}
          <div style={{ width: `${100 - endPercent}%` }} className="h-full bg-stone-300/40" />

          {/* Current playback playhead needle */}
          <div
            style={{ left: `${(currentTime / duration) * 100}%` }}
            className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10 pointer-events-none"
          >
            <div className="w-2 h-2 rounded-full bg-rose-600 -translate-x-[3px] -translate-y-0.5" />
          </div>
        </div>

        {/* Start / End Range Sliders */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <div className="flex justify-between text-[11px] font-medium text-stone-500 mb-1">
              <span>Start Cut</span>
              <span className="font-mono font-bold text-stone-700">{formatTime(options.startTime)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={options.endTime - 0.2}
              step={0.1}
              value={options.startTime}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onOptionsChange({ ...options, startTime: val });
                handleSeek(val);
              }}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-stone-500 mb-1">
              <span>End Cut</span>
              <span className="font-mono font-bold text-stone-700">{formatTime(options.endTime)}</span>
            </div>
            <input
              type="range"
              min={options.startTime + 0.2}
              max={duration}
              step={0.1}
              value={options.endTime}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onOptionsChange({ ...options, endTime: val });
                handleSeek(val);
              }}
              className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
