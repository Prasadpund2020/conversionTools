'use client';

import React, { useState } from 'react';
import { AudioSpeedHeaderBar } from './AudioSpeedHeaderBar';
import { AudioSpeedDropzone } from './AudioSpeedDropzone';
import { AudioSpeedControls } from './AudioSpeedControls';
import { AudioSpeedStage } from './AudioSpeedStage';
import { StagedAudioFile, AudioSpeedOptions, ProcessedAudioResult } from './types';
import { decodeAudioFile, processAudioSpeed, audioBufferToWav } from './audioSpeedEngine';

export const AudioSpeedTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedAudioFile | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessedAudioResult | null>(null);

  const [options, setOptions] = useState<AudioSpeedOptions>({
    speed: 1.25,
    preservePitch: true,
    semitones: 0,
  });

  const handleFileSelected = async (file: File) => {
    setIsDecoding(true);
    setError(null);
    setResult(null);

    try {
      const decoded = await decodeAudioFile(file);
      setStagedFile({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        duration: decoded.duration,
        sampleRate: decoded.sampleRate,
        numberOfChannels: decoded.numberOfChannels,
        audioBuffer: decoded.audioBuffer,
      });
    } catch (err: any) {
      console.error(err);
      setError('Failed to decode audio file. Please ensure it is a valid audio format.');
    } finally {
      setIsDecoding(false);
    }
  };

  const handleReset = () => {
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setStagedFile(null);
    setResult(null);
    setError(null);
  };

  const handleOptionsChange = (newOptions: Partial<AudioSpeedOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleProcessAndDownload = () => {
    if (!stagedFile) return;

    setIsProcessing(true);
    setError(null);

    setTimeout(() => {
      try {
        const processedBuffer = processAudioSpeed(stagedFile.audioBuffer, options.speed);
        const wavBlob = audioBufferToWav(processedBuffer);
        const downloadUrl = URL.createObjectURL(wavBlob);
        const baseName = stagedFile.name.replace(/\.[^/.]+$/, '');
        const fileName = `${baseName}_${options.speed}x.wav`;

        setResult({
          blob: wavBlob,
          downloadUrl,
          fileName,
          duration: processedBuffer.duration,
          sizeBytes: wavBlob.size,
        });
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Failed to process audio speed.');
      } finally {
        setIsProcessing(false);
      }
    }, 50);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <AudioSpeedHeaderBar stagedFile={stagedFile} onReset={handleReset} />

      {!stagedFile ? (
        <AudioSpeedDropzone
          onFileSelected={handleFileSelected}
          isDecoding={isDecoding}
          error={error}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <AudioSpeedStage stagedFile={stagedFile} options={options} result={result} />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <AudioSpeedControls
              options={options}
              stagedFile={stagedFile}
              isProcessing={isProcessing}
              onOptionsChange={handleOptionsChange}
              onProcessAndDownload={handleProcessAndDownload}
            />
          </div>
        </div>
      )}
    </div>
  );
};
