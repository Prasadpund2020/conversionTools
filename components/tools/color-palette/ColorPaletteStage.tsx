'use client';

import React, { useState } from 'react';
import { StagedColorPaletteFile, SwatchColor } from './types';

interface ColorPaletteStageProps {
  stagedFile: StagedColorPaletteFile;
  swatches: SwatchColor[];
}

export const ColorPaletteStage: React.FC<ColorPaletteStageProps> = ({
  stagedFile,
  swatches,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Photo Preview & Continuous Palette Ribbon */}
      <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🎨</span>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[280px]">
              {stagedFile.name}
            </h3>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300">
            {stagedFile.width} × {stagedFile.height} px
          </span>
        </div>

        {/* Image Preview Container */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950/90 flex items-center justify-center max-h-[380px] p-2 shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stagedFile.imageUrl}
            alt="Source photo"
            className="max-h-[350px] w-auto object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Seamless Palette Ribbon */}
        <div className="h-10 rounded-xl overflow-hidden flex shadow-md border border-white/20">
          {swatches.map((swatch, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: swatch.hex }}
              className="flex-1 h-full cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleCopy(swatch.hex)}
              title={`Click to copy ${swatch.hex}`}
            />
          ))}
        </div>
      </div>

      {/* Swatch Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {swatches.map((swatch, idx) => {
          const isCopied = copiedHex === swatch.hex;
          return (
            <div
              key={idx}
              onClick={() => handleCopy(swatch.hex)}
              className="clay-card p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-md hover:scale-[1.03] active:scale-95 transition-all cursor-pointer group space-y-2.5"
            >
              {/* Color Block */}
              <div
                style={{ backgroundColor: swatch.hex }}
                className="w-full h-16 rounded-lg shadow-inner flex items-center justify-center text-white"
              >
                {isCopied && (
                  <span className="text-[11px] font-bold bg-black/60 px-2 py-0.5 rounded-full shadow">
                    Copied!
                  </span>
                )}
              </div>

              {/* Color Metadata */}
              <div className="space-y-0.5 text-center">
                <div className="font-mono font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {swatch.hex}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  {swatch.rgb.join(', ')}
                </div>
                <div className="text-[10px] text-pink-600 dark:text-pink-400 font-semibold">
                  {swatch.percentage}% share
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
