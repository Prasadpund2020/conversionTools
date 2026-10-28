"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AudioMeta, BoosterOptions, BoosterResult } from "./types";
import {
  decodeAudioFromMediaFile,
  generateSampleAudioBuffer,
  processVolumeBoost,
} from "./volumeBoosterEngine";
import VolumeBoosterHeaderBar from "./VolumeBoosterHeaderBar";
import VolumeBoosterDropzone from "./VolumeBoosterDropzone";
import VolumeBoosterStage from "./VolumeBoosterStage";
import VolumeBoosterControls from "./VolumeBoosterControls";

export default function VolumeBoosterTool() {
  const [meta, setMeta] = useState<AudioMeta | null>(null);
  const [options, setOptions] = useState<BoosterOptions>({
    boostMultiplier: 2.0, // 200% default
    limiterEnabled: true,
    bassBoostDb: 3,
    trebleBoostDb: 2,
    outputFormat: "wav",
  });

  const [result, setResult] = useState<BoosterResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger audio gain rendering
  const triggerBoostExecution = useCallback(
    async (source: AudioMeta, opts: BoosterOptions) => {
      if (!source.audioBuffer) return;
      setIsProcessing(true);
      try {
        const res = await processVolumeBoost(source.audioBuffer, opts);
        setResult(res);
      } catch (err) {
        console.error("Volume boost failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Mount with sample on initial render
  useEffect(() => {
    const sample = generateSampleAudioBuffer();
    setMeta(sample);
    const initialOpts: BoosterOptions = {
      boostMultiplier: 2.0,
      limiterEnabled: true,
      bassBoostDb: 3,
      trebleBoostDb: 2,
      outputFormat: "wav",
    };
    setOptions(initialOpts);
    triggerBoostExecution(sample, initialOpts);
  }, [triggerBoostExecution]);

  // Handle options changes with debounce
  const handleOptionsChange = (newOpts: BoosterOptions) => {
    setOptions(newOpts);
    if (!meta) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerBoostExecution(meta, newOpts);
    }, 150);
  };

  // Handle uploaded file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await decodeAudioFromMediaFile(file);
      setMeta(parsed);
      await triggerBoostExecution(parsed, options);
    } catch (err) {
      console.error("Failed to parse media audio:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset
  const handleReset = () => {
    setMeta(null);
    setResult(null);
  };

  // Load sample studio audio
  const handleLoadSample = () => {
    const sample = generateSampleAudioBuffer();
    setMeta(sample);
    triggerBoostExecution(sample, options);
  };

  // Download boosted audio
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const base = meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "audio";
    const percent = Math.round(options.boostMultiplier * 100);
    a.download = `${base}-boosted-${percent}pct.wav`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <VolumeBoosterHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        boostMultiplier={options.boostMultiplier}
      />

      {!meta ? (
        <VolumeBoosterDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Waveform Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <VolumeBoosterStage
              meta={meta}
              options={options}
              result={result}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <VolumeBoosterControls
              meta={meta}
              options={options}
              onOptionsChange={handleOptionsChange}
              result={result}
              isProcessing={isProcessing}
              onDownload={handleDownload}
            />
          </div>
        </div>
      )}
    </div>
  );
}
