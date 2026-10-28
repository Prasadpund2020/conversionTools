"use client";

import React, { useRef, useState, useEffect } from "react";
import { AudioConvertSource, AudioConvertOptions, AudioConvertResult } from "./types";

interface ConvertAudioStageProps {
  meta: AudioConvertSource;
  options: AudioConvertOptions;
  result: AudioConvertResult | null;
  isProcessing: boolean;
}

export default function ConvertAudioStage({
  meta,
  options,
  result,
  isProcessing,
}: ConvertAudioStageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setIsPlaying(false);
    }

    const targetUrl = result ? result.url : meta.audioUrl;
    if (targetUrl) {
      const wasPlaying = isPlaying;
      audioRef.current.src = targetUrl;
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }

    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, [result, meta.audioUrl, isPlaying]);

  // Draw Audio Waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !meta.audioBuffer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#0f172a"; // Deep navy
    ctx.fillRect(0, 0, width, height);

    // Baseline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    const data = meta.audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    const barGradient = ctx.createLinearGradient(0, 0, 0, height);
    barGradient.addColorStop(0, "#38bdf8"); // Sky light
    barGradient.addColorStop(0.5, "#0ea5e9"); // Sky
    barGradient.addColorStop(1, "#0284c7"); // Blue

    ctx.fillStyle = barGradient;

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      const barHeight = Math.max(2, (max - min) * amp * 0.95);
      ctx.fillRect(i, height / 2 - barHeight / 2, 1, barHeight);
    }
  }, [meta.audioBuffer]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Stage Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Target Encoding:</span>
          <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase">
            .{options.targetFormat} • {options.bitrate} kbps • {options.sampleRate} Hz
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          <span className="w-2 h-2 rounded-full bg-sky-500" />
          <span>Multi-Format Transcoder</span>
        </div>
      </div>

      {/* Main Waveform Stage Container */}
      <div className="relative w-full rounded-3xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[380px] shadow-2xl overflow-hidden">
        {isProcessing && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
            <span className="text-xs font-bold text-stone-300">Encoding audio frames...</span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={760}
          height={220}
          className="w-full h-[220px] rounded-xl object-contain mb-4"
        />

        {/* Audition Player Pill */}
        <div className="flex items-center justify-between w-full max-w-md bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 rounded-xl bg-sky-500 hover:bg-sky-600 flex items-center justify-center transition-all cursor-pointer text-slate-950 shadow-md"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 fill-slate-950" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-slate-950 ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <span className="text-xs font-bold text-slate-300">
              {isPlaying ? "Auditioning Track..." : "Audition Track"}
            </span>
          </div>

          <div className="font-mono text-slate-400 text-xs">
            {meta.duration.toFixed(1)}s • {options.channelMode}
          </div>
        </div>
      </div>
    </div>
  );
}
