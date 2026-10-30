'use client';

import React, { useState } from 'react';
import { StagedUnlockPdfFile } from './types';

interface UnlockPdfControlsProps {
  stagedFile: StagedUnlockPdfFile;
  password: string;
  isProcessing: boolean;
  onPasswordChange: (password: string) => void;
  onUnlock: () => void;
}

export const UnlockPdfControls: React.FC<UnlockPdfControlsProps> = ({
  stagedFile,
  password,
  isProcessing,
  onPasswordChange,
  onUnlock,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="clay-card p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-6">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          <h2 className="font-bold text-slate-800 dark:text-slate-100">Unlock Credentials</h2>
        </div>
        <span className="text-[11px] text-slate-400 truncate max-w-[140px]" title={stagedFile.name}>
          {stagedFile.name}
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Enter PDF Password</span>
          <span className="text-xs text-slate-400 lowercase font-normal">(if required to open)</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            disabled={isProcessing}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Type document password..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm pr-12 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 text-xs"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-xs text-slate-600 dark:text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-emerald-800 dark:text-emerald-300">
          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>What gets unlocked?</span>
        </div>
        <p>
          Once unlocked, the output PDF will open directly without asking for a password, and all restrictions on printing, copying text, or editing are completely eliminated.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          disabled={isProcessing}
          onClick={onUnlock}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Decrypting PDF Document...</span>
            </div>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span>Unlock & Remove Password</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
