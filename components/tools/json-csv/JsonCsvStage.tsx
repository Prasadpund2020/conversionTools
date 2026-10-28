'use client';

import React, { useState } from 'react';
import { JsonCsvResult, ConversionDirection } from './types';
import { formatBytes } from './jsonCsvEngine';

interface JsonCsvStageProps {
  inputText: string;
  onChangeInput: (text: string) => void;
  direction: ConversionDirection;
  result: JsonCsvResult | null;
  onDownload: () => void;
  onClear: () => void;
}

export const JsonCsvStage: React.FC<JsonCsvStageProps> = ({
  inputText,
  onChangeInput,
  direction,
  result,
  onDownload,
  onClear,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'text' | 'table'>('text');

  const handleCopy = () => {
    if (!result?.outputText) return;
    navigator.clipboard.writeText(result.outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputPlaceholder =
    direction === 'json-to-csv'
      ? `Paste JSON array here, for example:\n[\n  {"name": "Alice", "role": "Engineer", "age": 28},\n  {"name": "Bob", "role": "Designer", "age": 32}\n]`
      : `Paste CSV content here, for example:\nname,role,age\nAlice,Engineer,28\nBob,Designer,32`;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Result action banner if converted */}
      {result && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base">
                Converted Successfully!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {result.fileName} • {result.rowCount} records • {result.columnCount} fields • {formatBytes(result.sizeBytes)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={onDownload}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download {direction === 'json-to-csv' ? 'CSV' : 'JSON'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Dual Pane Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Pane: Input */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-[520px]">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Input: {direction === 'json-to-csv' ? 'JSON Source' : 'CSV / TSV Source'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {inputText.length} chars
              </span>
              {inputText.length > 0 && (
                <button
                  onClick={onClear}
                  className="text-[11px] text-rose-500 hover:underline ml-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder={inputPlaceholder}
            className="flex-1 w-full p-4 font-mono text-xs text-slate-800 dark:text-slate-200 bg-transparent resize-none focus:outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Right Pane: Output (Text / Table View) */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-[520px]">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              Output: {direction === 'json-to-csv' ? 'CSV Result' : 'JSON Result'}
            </span>

            {/* View toggle if result has rows */}
            {result?.previewRows && result.previewRows.length > 0 && (
              <div className="flex items-center bg-slate-200/60 dark:bg-slate-800 p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    activeTab === 'text'
                      ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Raw Code
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('table')}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    activeTab === 'table'
                      ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Table View
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-800 dark:text-slate-200">
            {result ? (
              activeTab === 'table' && result.previewRows && result.previewRows.length > 0 ? (
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left border border-slate-200 dark:border-slate-800 rounded-lg">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 font-bold text-slate-700 dark:text-slate-300">
                      <tr>
                        {result.previewRows[0].map((header, i) => (
                          <th key={i} className="px-3 py-2 border-r border-slate-200 dark:border-slate-800 last:border-0 truncate max-w-[150px]">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {result.previewRows.slice(1).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-3 py-1.5 border-r border-slate-100 dark:border-slate-800 last:border-0 truncate max-w-[180px]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {result.rowCount > 50 && (
                    <p className="text-[11px] text-slate-400 mt-2 text-center">
                      Showing preview of first 50 rows. Download full file to see all {result.rowCount} records.
                    </p>
                  )}
                </div>
              ) : (
                <pre className="whitespace-pre-wrap leading-relaxed select-all">
                  {result.outputText}
                </pre>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <p className="text-xs">Converted output will appear here after clicking Convert</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
