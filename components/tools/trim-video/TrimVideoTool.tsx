"use client";

import React, { useState, useEffect, useCallback } from "react";
import { VideoMeta, TrimOptions, TrimResult } from "./types";
import {
  loadVideoMeta,
  generateSampleVideo,
  trimVideo,
} from "./trimVideoEngine";
import TrimVideoHeaderBar from "./TrimVideoHeaderBar";
import TrimVideoDropzone from "./TrimVideoDropzone";
import TrimVideoPlayerStage from "./TrimVideoPlayerStage";
import TrimVideoControls from "./TrimVideoControls";

export default function TrimVideoTool() {
  const [meta, setMeta] = useState<VideoMeta | null>(null);
  const [options, setOptions] = useState<TrimOptions>({
    startTime: 1.5,
    endTime: 7.5,
    outputFormat: "mp4",
    resolution: "original",
    playbackSpeed: 1,
    removeAudio: false,
  });

  const [result, setResult] = useState<TrimResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load sample on mount
  useEffect(() => {
    generateSampleVideo().then((sample) => {
      setMeta(sample);
      setOptions({
        startTime: 1.5,
        endTime: Math.min(sample.duration, 7.5),
        outputFormat: "mp4",
        resolution: "original",
        playbackSpeed: 1,
        removeAudio: false,
      });
    });
  }, []);

  // Execute trim
  const handleExecuteTrim = useCallback(async () => {
    if (!meta) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const res = await trimVideo(meta, options, (p) => setProgress(p));
      setResult(res);
    } catch (err) {
      console.error("Video trim failed:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [meta, options]);

  // Handle uploaded file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await loadVideoMeta(file);
      setMeta(parsed);
      setOptions({
        startTime: 0,
        endTime: Math.min(parsed.duration, 15),
        outputFormat: "mp4",
        resolution: "original",
        playbackSpeed: 1,
        removeAudio: false,
      });
      setResult(null);
    } catch (err) {
      console.error("Failed to load video:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset
  const handleReset = () => {
    setMeta(null);
    setResult(null);
  };

  // Load sample demo
  const handleLoadSample = async () => {
    setIsProcessing(true);
    try {
      const sample = await generateSampleVideo();
      setMeta(sample);
      setOptions({
        startTime: 1.5,
        endTime: 7.5,
        outputFormat: "mp4",
        resolution: "original",
        playbackSpeed: 1,
        removeAudio: false,
      });
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download trimmed clip
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const base = meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "video";
    a.download = `${base}-trimmed.${options.outputFormat}`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <TrimVideoHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        duration={meta?.duration}
      />

      {!meta ? (
        <TrimVideoDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Player & Timeline Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <TrimVideoPlayerStage
              meta={meta}
              options={options}
              onOptionsChange={setOptions}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <TrimVideoControls
              meta={meta}
              options={options}
              onOptionsChange={setOptions}
              result={result}
              isProcessing={isProcessing}
              progress={progress}
              onExecuteTrim={handleExecuteTrim}
              onDownload={handleDownload}
            />
          </div>
        </div>
      )}
    </div>
  );
}
