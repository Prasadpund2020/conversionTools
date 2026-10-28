'use client';

import React from 'react';
import Link from 'next/link';
import { StagedImageFile } from './types';

interface BlurFaceHeaderBarProps {
  stagedFile: StagedImageFile | null;
  onReset: () => void;
}

export const BlurFaceHeaderBar: React.FC<BlurFaceHeaderBarProps> = ({
  stagedFile,
  onReset,
}) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/40 dark:border-white/10 mb-8">
      <div className="flex items-center gap-3">
        <Link
          href="/all-tools"
          className="clay-btn-ghost p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Back to All Tools"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 text-lg">
          🛡️
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Blur Faces & Censor Photos
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
              Privacy Shield
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pixelate or blur faces, license plates, and sensitive documents with zero server uploads
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {stagedFile && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>New Photo</span>
          </button>
        )}
      </div>
    </header>
  );
};
