'use client';

import React, { useState } from 'react';
import { BlurFaceHeaderBar } from './BlurFaceHeaderBar';
import { BlurFaceDropzone } from './BlurFaceDropzone';
import { BlurFaceControls } from './BlurFaceControls';
import { BlurFaceStage } from './BlurFaceStage';
import { StagedImageFile, BlurFaceOptions, CensorRegion } from './types';
import { renderCensoredCanvas, exportCensoredImage } from './blurFaceEngine';

export const BlurFaceTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedImageFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [regions, setRegions] = useState<CensorRegion[]>([]);

  const [options, setOptions] = useState<BlurFaceOptions>({
    activeMode: 'blur',
    activeShape: 'ellipse',
    intensity: 16,
  });

  const handleFileSelected = (file: File) => {
    setError(null);
    setRegions([]);

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
    setStagedFile(null);
    setRegions([]);
    setError(null);
  };

  const handleOptionsChange = (newOptions: Partial<BlurFaceOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleAddRegion = (region: CensorRegion) => {
    setRegions((prev) => [...prev, region]);
  };

  const handleRemoveRegion = (id: string) => {
    setRegions((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearRegions = () => {
    setRegions([]);
  };

  const handleExport = async (format: 'png' | 'jpeg') => {
    if (!stagedFile) return;

    try {
      const renderedCanvas = renderCensoredCanvas(stagedFile.imageElement, regions);
      const { downloadUrl, fileName } = await exportCensoredImage(
        renderedCanvas,
        stagedFile.name,
        format
      );

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 4000);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to export image.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <BlurFaceHeaderBar stagedFile={stagedFile} onReset={handleReset} />

      {!stagedFile ? (
        <BlurFaceDropzone onFileSelected={handleFileSelected} error={error} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <BlurFaceStage
              stagedFile={stagedFile}
              options={options}
              regions={regions}
              onAddRegion={handleAddRegion}
              onRemoveRegion={handleRemoveRegion}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <BlurFaceControls
              options={options}
              regions={regions}
              onOptionsChange={handleOptionsChange}
              onClearRegions={handleClearRegions}
              onExport={handleExport}
            />
          </div>
        </div>
      )}
    </div>
  );
};
