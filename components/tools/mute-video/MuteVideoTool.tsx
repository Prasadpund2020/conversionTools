"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MuteVideoMeta, MuteOptions, MuteResult } from "./types";
import {
  loadMuteVideoMeta,
  generateSampleVideoWithSound,
  executeMuteVideo,
} from "./muteVideoEngine";
import MuteVideoHeaderBar from "./MuteVideoHeaderBar";
import MuteVideoDropzone from "./MuteVideoDropzone";
import MuteVideoPlayerStage from "./MuteVideoPlayerStage";
import MuteVideoControls from "./MuteVideoControls";

export default function MuteVideoTool() {
  const [meta, setMeta] = useState<MuteVideoMeta | null>(null);
  const [options, setOptions] = useState<MuteOptions>({
    outputFormat: "mp4",
    playbackSpeed: 1,
  });

  const [result, setResult] = useState<MuteResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Mount with sample video on initial render
  useEffect(() => {
    generateSampleVideoWithSound().then((sample) => {
      setMeta(sample);
      setOptions({
        outputFormat: "mp4",
        playbackSpeed: 1,
      });
    });
  }, []);

  // Execute Mute
  const handleExecuteMute = useCallback(async () => {
    if (!meta) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const res = await executeMuteVideo(meta, options, (p) => setProgress(p));
      setResult(res);
    } catch (err) {
      console.error("Muting video failed:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [meta, options]);

  // Handle uploaded video file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await loadMuteVideoMeta(file);
      setMeta(parsed);
      setResult(null);
    } catch (err) {
      console.error("Failed to parse video:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset
  const handleReset = () => {
    setMeta(null);
    setResult(null);
  };

  // Load sample video with sound
  const handleLoadSample = async () => {
    setIsProcessing(true);
    try {
      const sample = await generateSampleVideoWithSound();
      setMeta(sample);
      setResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download muted video
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const base = meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "video";
    a.download = `${base}-muted.${options.outputFormat}`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <MuteVideoHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        duration={meta?.duration}
      />

      {!meta ? (
        <MuteVideoDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <MuteVideoPlayerStage
              meta={meta}
              options={options}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <MuteVideoControls
              meta={meta}
              options={options}
              onOptionsChange={setOptions}
              result={result}
              isProcessing={isProcessing}
              progress={progress}
              onExecuteMute={handleExecuteMute}
              onDownload={handleDownload}
            />
          </div>
        </div>
      )}
    </div>
  );
}
