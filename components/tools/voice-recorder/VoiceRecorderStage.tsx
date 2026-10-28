'use client';

import React, { useRef, useEffect } from 'react';
import { RecordingStatus, RecordedAudioResult } from './types';
import { formatSeconds, formatBytes } from './voiceRecorderEngine';

interface VoiceRecorderStageProps {
  status: RecordingStatus;
  elapsedSeconds: number;
  analyser: AnalyserNode | null;
  result: RecordedAudioResult | null;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export const VoiceRecorderStage: React.FC<VoiceRecorderStageProps> = ({
  status,
  elapsedSeconds,
  analyser,
  result,
  onStart,
  onPause,
  onResume,
  onStop,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Draw live waveform from AnalyserNode
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      animationFrameId.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (!analyser || status === 'idle' || status === 'stopped') {
        // Draw idle flat line
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.lineWidth = 3;
      ctx.strokeStyle = status === 'paused' ? '#f59e0b' : '#f43f5e';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    draw();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [analyser, status]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Studio Stage Card */}
      <div className="clay-card p-8 rounded-3xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl text-center space-y-6">
        {/* Status Badge & Timer */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {status === 'recording' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider">
                  Recording Live
                </span>
              </>
            )}
            {status === 'paused' && (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                  Paused
                </span>
              </>
            )}
            {status === 'idle' && <span>Ready to Record</span>}
            {status === 'stopped' && <span>Recording Completed</span>}
          </div>

          <div className="font-mono text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatSeconds(elapsedSeconds)}
          </div>
        </div>

        {/* Real-time Oscilloscope Waveform Canvas */}
        <div className="w-full h-36 bg-slate-950/90 rounded-2xl overflow-hidden p-4 flex items-center justify-center shadow-inner relative border border-slate-800">
          <canvas
            ref={canvasRef}
            width={700}
            height={140}
            className="w-full h-full object-contain"
          />

          {status === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 pointer-events-none">
              Click Start Recording to activate microphone
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {status === 'idle' && (
            <button
              type="button"
              onClick={onStart}
              className="clay-btn-rose px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 transition-all shadow-xl shadow-rose-500/30 flex items-center gap-3 text-base"
            >
              <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
              <span>Start Recording</span>
            </button>
          )}

          {status === 'recording' && (
            <>
              <button
                type="button"
                onClick={onPause}
                className="py-3 px-6 rounded-xl font-semibold bg-amber-500 hover:bg-amber-400 text-white shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                <span>Pause</span>
              </button>
              <button
                type="button"
                onClick={onStop}
                className="clay-btn-rose py-3 px-8 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
                <span>Stop & Finish</span>
              </button>
            </>
          )}

          {status === 'paused' && (
            <>
              <button
                type="button"
                onClick={onResume}
                className="py-3 px-6 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Resume</span>
              </button>
              <button
                type="button"
                onClick={onStop}
                className="clay-btn-rose py-3 px-8 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/25 active:scale-95 transition-all flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
                <span>Stop & Finish</span>
              </button>
            </>
          )}

          {status === 'stopped' && (
            <button
              type="button"
              onClick={onStart}
              className="px-6 py-3 rounded-xl font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 transition-all flex items-center gap-2 text-sm"
            >
              <span>Record Again</span>
            </button>
          )}
        </div>
      </div>

      {/* Output Audio Card */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-rose-500/10 to-transparent backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Recording Complete & Ready to Download
              </h3>
            </div>
            <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
              {formatSeconds(result.duration)} • {formatBytes(result.sizeBytes)}
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
              <span>Download Audio File</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
