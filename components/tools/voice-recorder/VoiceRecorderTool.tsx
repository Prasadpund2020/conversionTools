'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VoiceRecorderHeaderBar } from './VoiceRecorderHeaderBar';
import { VoiceRecorderStage } from './VoiceRecorderStage';
import { RecordingStatus, RecordedAudioResult } from './types';
import { getSupportedMimeType } from './voiceRecorderEngine';

export const VoiceRecorderTool: React.FC = () => {
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [result, setResult] = useState<RecordedAudioResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleStart = async () => {
    setError(null);
    setResult(null);
    setElapsedSeconds(0);
    recordedChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // AudioContext Analyser
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      setAnalyser(analyserNode);

      // MediaRecorder
      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(recordedChunksRef.current, {
          type: mimeType || 'audio/webm',
        });
        const downloadUrl = URL.createObjectURL(finalBlob);
        const ext = mimeType.includes('mp4') ? 'mp4' : 'webm';
        const fileName = `voice_recording_${Date.now()}.${ext}`;

        setResult({
          blob: finalBlob,
          downloadUrl,
          duration: elapsedSeconds,
          sizeBytes: finalBlob.size,
          mimeType: finalBlob.type,
          fileName,
        });

        // Release mic stream
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start(250);
      setStatus('recording');

      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 0.1);
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(
        'Unable to access microphone. Please grant browser microphone permission and try again.'
      );
      setStatus('idle');
    }
  };

  const handlePause = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.pause();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setStatus('paused');
    }
  };

  const handleResume = () => {
    if (mediaRecorderRef.current && status === 'paused') {
      mediaRecorderRef.current.resume();
      timerIntervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 0.1);
      }, 100);
      setStatus('recording');
    }
  };

  const handleStop = () => {
    if (mediaRecorderRef.current && (status === 'recording' || status === 'paused')) {
      mediaRecorderRef.current.stop();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setStatus('stopped');
    }
  };

  const handleReset = () => {
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setResult(null);
    setStatus('idle');
    setElapsedSeconds(0);
    setError(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <VoiceRecorderHeaderBar onReset={handleReset} hasRecording={!!result} />

      {error && (
        <div className="p-4 mb-6 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 flex items-center gap-3 text-red-700 dark:text-red-300 text-sm">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <VoiceRecorderStage
        status={status}
        elapsedSeconds={elapsedSeconds}
        analyser={analyser}
        result={result}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
      />
    </div>
  );
};
