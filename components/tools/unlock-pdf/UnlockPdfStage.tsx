'use client';

import React from 'react';
import { StagedUnlockPdfFile, UnlockPdfResult } from './types';
import { formatBytes } from './unlockPdfEngine';

interface UnlockPdfStageProps {
  stagedFile: StagedUnlockPdfFile;
  result: UnlockPdfResult | null;
}

export const UnlockPdfStage: React.FC<UnlockPdfStageProps> = ({
  stagedFile,
  result,
}) => {
  return (
    <div className="space-y-6">
      {/* File Overview Card */}
      <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl shadow-inner">
              📄
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate max-w-[300px]">
                {stagedFile.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formatBytes(stagedFile.size)} {stagedFile.pageCount ? `• ${stagedFile.pageCount} Pages` : ''}
              </p>
            </div>
          </div>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
              stagedFile.isEncrypted
                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                stagedFile.isEncrypted ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
            {stagedFile.isEncrypted ? 'Password Protected' : 'Ready to Unlock'}
          </span>
        </div>

        {/* Security Padlock Visual Banner */}
        <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col items-center justify-center text-center space-y-4 shadow-inner">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg">
            {result ? '🔓' : '🔒'}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-lg">
              {result ? 'Document Security Permanently Removed' : 'Protected Document Detected'}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              {result
                ? 'Your new PDF has no encryption keys. You can open, print, and copy text freely.'
                : 'Enter your authorization password in the settings panel to generate an unrestricted clean copy.'}
            </p>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="clay-card p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                PDF Unlocked Successfully!
              </h3>
            </div>
            <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-full font-semibold">
              {formatBytes(result.sizeBytes)} • {result.pageCount} pgs
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300">
            Password protection and editing restrictions have been completely stripped. The document is ready to download.
          </p>

          <div className="flex justify-end pt-2">
            <a
              href={result.downloadUrl}
              download={result.fileName}
              className="clay-btn-emerald py-3 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Unlocked PDF</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
