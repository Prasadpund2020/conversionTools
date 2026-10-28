"use client";

import React, { useRef, useState, useEffect } from "react";
import { MuteVideoMeta, MuteOptions } from "./types";

interface MuteVideoPlayerStageProps {
  meta: MuteVideoMeta;
  options: MuteOptions;
  isProcessing: boolean;
}

export default function MuteVideoPlayerStage({
  meta,
  options,
  isProcessing,
}: MuteVideoPlayerStageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleAudioPreview = () => {
    if (!videoRef.current) return;
    const nextMuted = !isAudioMuted;
    videoRef.current.muted = nextMuted;
    setIsAudioMuted(nextMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = options.playbackSpeed;
    }
  }, [options.playbackSpeed]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Preview Mode:</span>
          <button
            type="button"
            onClick={toggleAudioPreview}
            className={`px-3 py-1 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              isAudioMuted
                ? "bg-rose-50 border-rose-300 text-rose-700"
                : "bg-emerald-50 border-emerald-300 text-emerald-700"
            }`}
          >
            {isAudioMuted ? (
              <>
                <svg className="w-3.5 h-3.5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
                <span>Auditioning Muted Audio</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>Auditioning With Sound</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Lossless Silent Stream</span>
        </div>
      </div>

      {/* Video Stage Container */}
      <div className="relative w-full rounded-3xl bg-stone-900 border border-stone-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[420px] shadow-2xl overflow-hidden">
        <video
          ref={videoRef}
          src={meta.videoUrl}
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="max-h-[460px] w-auto max-w-full rounded-2xl object-contain shadow-md cursor-pointer"
          onClick={togglePlay}
          playsInline
        />

        {/* Video Overlay Controls Pill */}
        <div className="mt-4 flex items-center justify-between w-full max-w-xl bg-stone-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-stone-700/60 text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="w-8 h-8 rounded-xl bg-rose-600 hover:bg-rose-700 flex items-center justify-center transition-all cursor-pointer"
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
              onClick={toggleAudioPreview}
              className="px-2.5 py-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              {isAudioMuted ? "Unmute Preview" : "Mute Preview"}
            </button>
          </div>

          <div className="font-mono text-stone-300 text-xs">
            <span className="text-rose-400 font-bold">{formatSeconds(currentTime)}</span>
            <span className="opacity-50"> / </span>
            <span>{formatSeconds(meta.duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
