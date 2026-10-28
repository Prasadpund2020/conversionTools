'use client';

import React, { useState } from 'react';
import { ImageUpscalerHeaderBar } from './ImageUpscalerHeaderBar';
import { ImageUpscalerDropzone } from './ImageUpscalerDropzone';
import { ImageUpscalerControls } from './ImageUpscalerControls';
import { ImageUpscalerStage } from './ImageUpscalerStage';
import { StagedImageUpscalerFile, UpscaleOptions, UpscaleResult } from './types';
import { upscaleImage } from './imageUpscalerEngine';

export const ImageUpscalerTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedImageUpscalerFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UpscaleResult | null>(null);

  const [options, setOptions] = useState<UpscaleOptions>({
    factor: 2,
    algorithm: 'smooth',
    sharpenAmount: 30,
  });

  const handleFileSelected = (file: File) => {
    setError(null);
    setResult(null);

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setStagedFile({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        imageUrl,
        imageElement: img,
      });
    };

    img.onerror = () => {
      setError('Unable to load image. Please verify file integrity.');
    };
  };

  const handleReset = () => {
    if (stagedFile?.imageUrl) {
      URL.revokeObjectURL(stagedFile.imageUrl);
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

  const handleOptionsChange = (newOptions: Partial<UpscaleOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleUpscale = async () => {
    if (!stagedFile) return;

    setIsProcessing(true);
    setProgressPercent(0);
    setStatusText('Upscaling image...');
    setError(null);

    try {
      const res = await upscaleImage(
        stagedFile,
        options,
        (progress, status) => {
          setProgressPercent(progress);
          setStatusText(status);
        }
      );
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to upscale image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <ImageUpscalerHeaderBar
        stagedFile={stagedFile}
        isProcessing={isProcessing}
        onReset={handleReset}
      />

      {!stagedFile ? (
        <ImageUpscalerDropzone onFileSelected={handleFileSelected} error={error} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <ImageUpscalerStage
              stagedFile={stagedFile}
              options={options}
              result={result}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <ImageUpscalerControls
              options={options}
              origWidth={stagedFile.width}
              origHeight={stagedFile.height}
              isProcessing={isProcessing}
              progressPercent={progressPercent}
              statusText={statusText}
              onOptionsChange={handleOptionsChange}
              onUpscale={handleUpscale}
            />
          </div>
        </div>
      )}
    </div>
  );
};
