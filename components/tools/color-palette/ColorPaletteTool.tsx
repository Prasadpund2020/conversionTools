'use client';

import React, { useState, useEffect } from 'react';
import { ColorPaletteHeaderBar } from './ColorPaletteHeaderBar';
import { ColorPaletteDropzone } from './ColorPaletteDropzone';
import { ColorPaletteControls } from './ColorPaletteControls';
import { ColorPaletteStage } from './ColorPaletteStage';
import { StagedColorPaletteFile, ColorPaletteOptions, SwatchColor } from './types';
import { extractColorPalette } from './colorPaletteEngine';

export const ColorPaletteTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedColorPaletteFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [swatches, setSwatches] = useState<SwatchColor[]>([]);

  const [options, setOptions] = useState<ColorPaletteOptions>({
    colorCount: 6,
    sortOrder: 'dominance',
  });

  const handleFileSelected = (file: File) => {
    setError(null);
    setSwatches([]);

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const staged: StagedColorPaletteFile = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        imageUrl,
        imageElement: img,
      };
      setStagedFile(staged);
      const extracted = extractColorPalette(img, options);
      setSwatches(extracted);
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
    setSwatches([]);
    setError(null);
  };

  const handleOptionsChange = (newOptions: Partial<ColorPaletteOptions>) => {
    const updated = { ...options, ...newOptions };
    setOptions(updated);
    if (stagedFile?.imageElement) {
      const extracted = extractColorPalette(stagedFile.imageElement, updated);
      setSwatches(extracted);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <ColorPaletteHeaderBar stagedFile={stagedFile} onReset={handleReset} />

      {!stagedFile ? (
        <ColorPaletteDropzone onFileSelected={handleFileSelected} error={error} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <ColorPaletteStage stagedFile={stagedFile} swatches={swatches} />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <ColorPaletteControls
              options={options}
              swatches={swatches}
              imageName={stagedFile.name}
              onOptionsChange={handleOptionsChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
