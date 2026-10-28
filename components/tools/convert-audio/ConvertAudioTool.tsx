"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  AudioConvertSource,
  AudioConvertOptions,
  AudioConvertResult,
} from "./types";
import {
  decodeAudioFromFile,
  generateSampleAcousticBuffer,
  transcodeAudio,
} from "./convertAudioEngine";
import ConvertAudioHeaderBar from "./ConvertAudioHeaderBar";
import ConvertAudioDropzone from "./ConvertAudioDropzone";
import ConvertAudioStage from "./ConvertAudioStage";
import ConvertAudioControls from "./ConvertAudioControls";

export default function ConvertAudioTool() {
  const [meta, setMeta] = useState<AudioConvertSource | null>(null);
  const [options, setOptions] = useState<AudioConvertOptions>({
    targetFormat: "mp3",
    bitrate: 320,
    sampleRate: 44100,
    channelMode: "stereo",
    normalizeGain: true,
  });

  const [result, setResult] = useState<AudioConvertResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger audio transcoding
  const triggerConversion = useCallback(
    async (source: AudioConvertSource, opts: AudioConvertOptions) => {
      if (!source.audioBuffer) return;
      setIsProcessing(true);
      try {
        const res = await transcodeAudio(source.audioBuffer, opts);
        setResult(res);
      } catch (err) {
        console.error("Audio transcode failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Mount with sample on initial render
  useEffect(() => {
    const sample = generateSampleAcousticBuffer();
    setMeta(sample);
    const initialOpts: AudioConvertOptions = {
      targetFormat: "mp3",
      bitrate: 320,
      sampleRate: 44100,
      channelMode: "stereo",
      normalizeGain: true,
    };
    setOptions(initialOpts);
    triggerConversion(sample, initialOpts);
  }, [triggerConversion]);

  // Handle options changes with debounce
  const handleOptionsChange = (newOpts: AudioConvertOptions) => {
    setOptions(newOpts);
    if (!meta) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerConversion(meta, newOpts);
    }, 150);
  };

  // Handle uploaded file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await decodeAudioFromFile(file);
      setMeta(parsed);
      await triggerConversion(parsed, options);
    } catch (err) {
      console.error("Failed to parse audio file:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset
  const handleReset = () => {
    setMeta(null);
    setResult(null);
  };

  // Load sample acoustic audio
  const handleLoadSample = () => {
    const sample = generateSampleAcousticBuffer();
    setMeta(sample);
    triggerConversion(sample, options);
  };

  // Download converted audio
  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    const base = meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "audio";
    a.download = `${base}-converted.${options.targetFormat}`;
    a.click();
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <ConvertAudioHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        targetFormat={options.targetFormat}
      />

      {!meta ? (
        <ConvertAudioDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ConvertAudioStage
              meta={meta}
              options={options}
              result={result}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <ConvertAudioControls
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
