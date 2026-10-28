"use client";

import React, { useRef, useState, useEffect } from "react";
import { AudioMeta, BoosterOptions, BoosterResult } from "./types";

interface VolumeBoosterStageProps {
  meta: AudioMeta;
  options: BoosterOptions;
  result: BoosterResult | null;
  isProcessing: boolean;
}

export default function VolumeBoosterStage({
  meta,
  options,
  result,
  isProcessing,
}: VolumeBoosterStageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [auditionMode, setAuditionMode] = useState<"boosted" | "original">("boosted");
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

  // Switch between boosted and original audio audition
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setIsPlaying(false);
    }

    const targetUrl = auditionMode === "boosted" && result ? result.url : meta.audioUrl;
    if (targetUrl) {
      const wasPlaying = isPlaying;
      audioRef.current.src = targetUrl;
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [auditionMode, result, meta.audioUrl, isPlaying]);

  // Draw Audio Waveform onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buffer = auditionMode === "boosted" && result ? result.renderedBuffer : meta.audioBuffer;
    if (!buffer) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, width, height);

    // Center baseline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    const barGradient = ctx.createLinearGradient(0, 0, 0, height);
    if (auditionMode === "boosted") {
      barGradient.addColorStop(0, "#fbbf24"); // Amber yellow
      barGradient.addColorStop(0.5, "#f59e0b");
      barGradient.addColorStop(1, "#d97706");
    } else {
      barGradient.addColorStop(0, "#94a3b8"); // Gray original
      barGradient.addColorStop(1, "#64748b");
    }

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
  }, [meta.audioBuffer, result, auditionMode]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl border border-stone-200/80 px-4 py-2 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Audition Track:</span>
          <div className="flex items-center bg-stone-100 p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => setAuditionMode("boosted")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                auditionMode === "boosted"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Boosted ({Math.round(options.boostMultiplier * 100)}%)
            </button>
            <button
              type="button"
              onClick={() => setAuditionMode("original")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                auditionMode === "original"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Original (100%)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Real-time Studio Equalizer</span>
        </div>
      </div>

      {/* Main Waveform Canvas Stage */}
      <div className="relative w-full rounded-3xl bg-stone-950 border border-stone-800 p-6 flex flex-col items-center justify-center min-h-[380px] shadow-2xl overflow-hidden">
        {isProcessing && (
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <span className="text-xs font-bold text-stone-300">Rendering acoustic gain...</span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={760}
          height={220}
          className="w-full h-[220px] rounded-xl object-contain mb-4"
        />

        {/* Playback Controls Pill */}
        <div className="flex items-center justify-between w-full max-w-md bg-stone-900/90 border border-stone-800 px-4 py-2.5 rounded-2xl text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition-all cursor-pointer text-stone-950 shadow-md"
            >
              {isPlaying ? (
                <svg className="w-4 h-4 fill-stone-950" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-stone-950 ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <span className="text-xs font-bold text-stone-300">
              {isPlaying ? "Auditioning..." : "Audition Audio"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
            <span>Peak Level:</span>
            <span className={auditionMode === "boosted" ? "text-amber-400 font-bold" : "text-stone-300"}>
              {auditionMode === "boosted" ? "+6.2 dB (Smooth)" : "0.0 dB"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
