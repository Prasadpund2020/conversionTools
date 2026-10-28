'use client';

import React from 'react';
import { Base64Options, Base64Mode } from './types';

interface Base64ConverterControlsProps {
  options: Base64Options;
  onChangeOptions: (opts: Partial<Base64Options>) => void;
  onConvert: () => void;
  onReset: () => void;
  canConvert: boolean;
  fileName?: string;
}

export const Base64ConverterControls: React.FC<Base64ConverterControlsProps> = ({
  options,
  onChangeOptions,
  onConvert,
  onReset,
  canConvert,
  fileName,
}) => {
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Base64 Format Settings
        </h3>

        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors"
        >
          Reset / Clear
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Operation Mode
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'encode' as Base64Mode, label: 'File ➔ Base64' },
              { id: 'decode' as Base64Mode, label: 'Base64 ➔ File' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onChangeOptions({ mode: m.id })}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                  options.mode === m.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data URI prefix toggle */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Data URI Prefix (data:mime;base64,)
          </label>
          <button
            type="button"
            disabled={options.mode === 'decode'}
            onClick={() => onChangeOptions({ includeDataUriPrefix: !options.includeDataUriPrefix })}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
              options.mode === 'decode'
                ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400'
                : options.includeDataUriPrefix
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <span>Data URI Scheme</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              {options.includeDataUriPrefix ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Line wrap toggle */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Line Wrap (MIME Standard 76 Chars)
          </label>
          <button
            type="button"
            disabled={options.mode === 'decode' || options.includeDataUriPrefix}
            onClick={() => onChangeOptions({ lineWrap: !options.lineWrap })}
            className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
              options.mode === 'decode' || options.includeDataUriPrefix
                ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-400'
                : options.lineWrap
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <span>Break Lines</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              {options.lineWrap ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={onConvert}
          disabled={!canConvert}
          className={`w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
            !canConvert
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-500/20 active:scale-[0.99]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>
            {options.mode === 'encode' ? 'Encode to Base64 String' : 'Decode Base64 to File'}
          </span>
        </button>
      </div>
    </div>
  );
};
