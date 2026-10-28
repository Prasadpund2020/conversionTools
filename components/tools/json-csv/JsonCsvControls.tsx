'use client';

import React from 'react';
import { JsonCsvOptions, ConversionDirection, Delimiter } from './types';

interface JsonCsvControlsProps {
  options: JsonCsvOptions;
  onChangeOptions: (opts: Partial<JsonCsvOptions>) => void;
  onConvert: () => void;
  onSwapDirection: () => void;
  onReset: () => void;
  canConvert: boolean;
}

export const JsonCsvControls: React.FC<JsonCsvControlsProps> = ({
  options,
  onChangeOptions,
  onConvert,
  onSwapDirection,
  onReset,
  canConvert,
}) => {
  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Conversion Settings
        </h3>

        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Direction
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onChangeOptions({ direction: 'json-to-csv' })}
              className={`flex-1 py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                options.direction === 'json-to-csv'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              JSON → CSV
            </button>
            <button
              type="button"
              onClick={onSwapDirection}
              title="Swap Direction"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onChangeOptions({ direction: 'csv-to-json' })}
              className={`flex-1 py-2 px-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                options.direction === 'csv-to-json'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              CSV → JSON
            </button>
          </div>
        </div>

        {/* Delimiter */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Delimiter / Separator
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Comma (,)', val: ',' as Delimiter },
              { label: 'Tab (\\t)', val: '\t' as Delimiter },
              { label: 'Semicolon (;)', val: ';' as Delimiter },
            ].map((del) => (
              <button
                key={del.val}
                type="button"
                onClick={() => onChangeOptions({ delimiter: del.val })}
                className={`py-2 px-1 text-xs font-medium rounded-xl border transition-all text-center truncate ${
                  options.delimiter === del.val
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {del.label}
              </button>
            ))}
          </div>
        </div>

        {/* Formatting toggle */}
        <div>
          <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
            Output Options
          </label>
          {options.direction === 'csv-to-json' ? (
            <button
              type="button"
              onClick={() => onChangeOptions({ prettyJson: !options.prettyJson })}
              className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
                options.prettyJson
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              <span>Pretty Print (2 Spaces)</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                {options.prettyJson ? 'ON' : 'OFF'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onChangeOptions({ includeHeaders: !options.includeHeaders })}
              className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
                options.includeHeaders
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
            >
              <span>Header Row (Column Names)</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                {options.includeHeaders ? 'ON' : 'OFF'}
              </span>
            </button>
          )}
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
          <span>Convert Now ({options.direction === 'json-to-csv' ? 'JSON to CSV' : 'CSV to JSON'})</span>
        </button>
      </div>
    </div>
  );
};
