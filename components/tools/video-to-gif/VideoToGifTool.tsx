'use client';

import React, { useState } from 'react';
import { VideoToGifHeaderBar } from './VideoToGifHeaderBar';
import { VideoToGifDropzone } from './VideoToGifDropzone';
import { VideoToGifControls } from './VideoToGifControls';
import { VideoToGifStage } from './VideoToGifStage';
import { convertVideoToGif, parseVideoForGif } from './videoToGifEngine';
import { StagedVideoFile, GifOptions, GifResult } from './types';

export const VideoToGifTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedVideoFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GifResult | null>(null);

  const [options, setOptions] = useState<GifOptions>({
    startTime: 0,
    endTime: 3,
    fps: 15,
    width: 480,
    speed: 1.0,
    loop: true,
  });

  const handleFileSelected = async (file: File) => {
    setError(null);
    setResult(null);

    try {
      const staged = await parseVideoForGif(file);
      setStagedFile(staged);
      setOptions({
        startTime: 0,
        endTime: Math.min(5, staged.duration),
        fps: 15,
        width: 480,
        speed: 1.0,
        loop: true,
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Unable to load video file. Please check file format.');
    }
  };

  const handleOptionsChange = (newOptions: Partial<GifOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleReset = () => {
    if (stagedFile?.videoUrl) {
      URL.revokeObjectURL(stagedFile.videoUrl);
    }
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setStagedFile(null);
    setResult(null);
    setError(null);
    setProgressPercent(0);
    setStatusText('');
  };

  const handleConvert = async () => {
    if (!stagedFile) return;

    setIsProcessing(true);
    setProgressPercent(0);
    setStatusText('Preparing video frames...');
    setError(null);

    try {
      const res = await convertVideoToGif(
        stagedFile,
        options,
        (progress: number) => {
          setProgressPercent(progress);
          setStatusText(`Extracting & encoding frames... ${progress}%`);
        }
      );
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to convert video to GIF. Please try a shorter duration.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <VideoToGifHeaderBar
        stagedFile={stagedFile}
        isProcessing={isProcessing}
        onReset={handleReset}
      />

      {!stagedFile ? (
        <VideoToGifDropzone
          onFileSelected={handleFileSelected}
          isProcessing={isProcessing}
          error={error}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <VideoToGifStage
              stagedFile={stagedFile}
              options={options}
              result={result}
              onOptionsChange={handleOptionsChange}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <VideoToGifControls
              options={options}
              duration={stagedFile.duration}
              isProcessing={isProcessing}
              progressPercent={progressPercent}
              statusText={statusText}
              onOptionsChange={handleOptionsChange}
              onConvert={handleConvert}
            />
          </div>
        </div>
      )}
    </div>
  );
};
