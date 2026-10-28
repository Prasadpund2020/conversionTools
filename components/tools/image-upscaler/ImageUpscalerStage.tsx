'use client';

import React from 'react';
import { StagedImageUpscalerFile, UpscaleResult, UpscaleOptions } from './types';
import { formatBytes } from './imageUpscalerEngine';

interface ImageUpscalerStageProps {
  stagedFile: StagedImageUpscalerFile;
  options: UpscaleOptions;
  result: UpscaleResult | null;
}

export const ImageUpscalerStage: React.FC<ImageUpscalerStageProps> = ({
  stagedFile,
  options,
  result,
}) => {
  return (
    <div className="space-y-6">
      {/* File Overview Card */}
      <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl shadow-inner">
              🖼️
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate max-w-[300px]">
                {stagedFile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatBytes(stagedFile.size)} • {stagedFile.width} × {stagedFile.height} px
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-mono">
            {options.factor}x Upscale
          </span>
        </div>

        {/* Live Image Container */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950/90 flex items-center justify-center max-h-[460px] p-2 shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={stagedFile.imageUrl}
            alt="Source preview"
            className="max-h-[420px] w-auto object-contain rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-transparent backdrop-blur-xl border border-blue-500/30 dark:border-blue-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                Super Resolution Image Ready!
              </h3>
            </div>
            <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full font-semibold">
              {result.width} × {result.height} px • {formatBytes(result.sizeBytes)}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden bg-slate-950/90 p-2 flex items-center justify-center max-h-[440px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.downloadUrl}
              alt="Upscaled output"
              className="max-h-[400px] w-auto object-contain rounded-lg shadow-lg"
            />
          </div>

          <div className="flex justify-end pt-2">
            <a
              href={result.downloadUrl}
              download={result.fileName}
              className="clay-btn-blue py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Upscaled PNG</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
