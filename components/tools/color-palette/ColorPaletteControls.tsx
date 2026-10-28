'use client';

import React, { useState } from 'react';
import { ColorPaletteOptions, SwatchColor } from './types';
import { generateSwatchCardImage } from './colorPaletteEngine';

interface ColorPaletteControlsProps {
  options: ColorPaletteOptions;
  swatches: SwatchColor[];
  imageName: string;
  onOptionsChange: (newOptions: Partial<ColorPaletteOptions>) => void;
}

export const ColorPaletteControls: React.FC<ColorPaletteControlsProps> = ({
  options,
  swatches,
  imageName,
  onOptionsChange,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const copyCssVariables = () => {
    const cssLines = swatches.map(
      (s, idx) => `  --color-${idx + 1}: ${s.hex}; /* ${s.rgb.join(', ')} */`
    );
    const text = `:root {\n${cssLines.join('\n')}\n}`;
    navigator.clipboard.writeText(text);
    setCopiedType('css');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const copyJson = () => {
    const json = JSON.stringify(swatches, null, 2);
    navigator.clipboard.writeText(json);
    setCopiedType('json');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const downloadSwatchCard = () => {
    const dataUrl = generateSwatchCardImage(swatches, imageName);
    if (!dataUrl) return;

    const a = document.createElement('a');
    a.href = dataUrl;
    const baseName = imageName.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}_color_swatches.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        <h2 className="font-bold text-slate-800 dark:text-slate-100">Palette Tokens</h2>
      </div>

      {/* Swatch Count */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Palette Size</span>
          <span className="text-pink-600 dark:text-pink-400 font-mono font-bold">
            {options.colorCount} Colors
          </span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {([5, 6, 8, 10] as const).map((cnt) => (
            <button
              key={cnt}
              type="button"
              onClick={() => onOptionsChange({ colorCount: cnt })}
              className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                options.colorCount === cnt
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cnt}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Sort Swatches
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['dominance', 'hue', 'luminance'] as const).map((srt) => (
            <button
              key={srt}
              type="button"
              onClick={() => onOptionsChange({ sortOrder: srt })}
              className={`py-2 px-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                options.sortOrder === srt
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {srt}
            </button>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Export Palette
        </label>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={copyCssVariables}
            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all"
          >
            {copiedType === 'css' ? <span>✓ Copied CSS!</span> : <span>Copy CSS Variables</span>}
          </button>
          <button
            type="button"
            onClick={copyJson}
            className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-all"
          >
            {copiedType === 'json' ? <span>✓ Copied JSON!</span> : <span>Copy JSON</span>}
          </button>
        </div>

        <button
          type="button"
          onClick={downloadSwatchCard}
          className="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-[0.98] transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 text-xs"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download Swatch Card Image (PNG)</span>
        </button>
      </div>
    </div>
  );
};
