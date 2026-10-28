'use client';

import React, { useState } from 'react';
import { Base64Result, Base64Mode } from './types';
import { formatBytes } from './base64ConverterEngine';

interface Base64ConverterStageProps {
  mode: Base64Mode;
  selectedFile: File | null;
  base64InputText: string;
  onChangeBase64Input: (text: string) => void;
  result: Base64Result | null;
  onDownload: () => void;
  onClear: () => void;
}

export const Base64ConverterStage: React.FC<Base64ConverterStageProps> = ({
  mode,
  selectedFile,
  base64InputText,
  onChangeBase64Input,
  result,
  onDownload,
  onClear,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!result?.base64String) return;
    navigator.clipboard.writeText(result.base64String);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Decoded File Download Banner */}
      {result && mode === 'decode' && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base">
                Decoded File Ready!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {result.fileName} • {result.mimeType} • {formatBytes(result.sizeBytes)}
              </p>
            </div>
          </div>

          <button
            onClick={onDownload}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Decoded File</span>
          </button>
        </div>
      )}

      {/* Main Dual Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Source */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-[500px]">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              {mode === 'encode' ? 'Source File' : 'Input Base64 String'}
            </span>
            {mode === 'decode' && base64InputText.length > 0 && (
              <button onClick={onClear} className="text-[11px] text-rose-500 hover:underline">
                Clear
              </button>
            )}
          </div>

          <div className="flex-1 p-4 overflow-auto">
            {mode === 'encode' ? (
              selectedFile ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                      {selectedFile.name}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {selectedFile.type || 'Binary file'} • {formatBytes(selectedFile.size)}
                    </p>
                  </div>
                  <button
                    onClick={onClear}
                    className="text-xs text-rose-500 hover:underline font-medium"
                  >
                    Choose different file
                  </button>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <p className="text-xs">No file selected</p>
                </div>
              )
            ) : (
              <textarea
                value={base64InputText}
                onChange={(e) => onChangeBase64Input(e.target.value)}
                placeholder="Paste raw Base64 string or data:image/...;base64,... URI here..."
                className="w-full h-full font-mono text-xs text-slate-800 dark:text-slate-200 bg-transparent resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
            )}
          </div>
        </div>

        {/* Right Side: Output */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-[500px]">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Preview'}
            </span>

            {mode === 'encode' && result && (
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold flex items-center gap-1 hover:bg-emerald-100 transition-colors"
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy String</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 p-4 overflow-auto font-mono text-xs text-slate-800 dark:text-slate-200">
            {result ? (
              mode === 'encode' ? (
                <div className="space-y-4">
                  {result.isImage && result.dataUri && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
                      <img
                        src={result.dataUri}
                        alt="Preview"
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200 dark:border-slate-700 bg-white"
                      />
                      <div className="text-[11px] font-sans text-slate-500">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Image Preview</span>
                        <p>{result.mimeType}</p>
                      </div>
                    </div>
                  )}

                  <pre className="whitespace-pre-wrap break-all leading-relaxed select-all">
                    {result.base64String}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  {result.isImage && result.downloadUrl ? (
                    <div className="max-w-xs max-h-56 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                      <img
                        src={result.downloadUrl}
                        alt="Decoded Preview"
                        className="w-full h-full object-contain bg-slate-50 dark:bg-slate-800"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600 dark:text-teal-400">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h5 className="font-bold text-slate-800 dark:text-slate-100 text-sm font-sans">
                      {result.fileName}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                      {result.mimeType} • {formatBytes(result.sizeBytes)}
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-xs">
                  {mode === 'encode'
                    ? 'Base64 string will appear here'
                    : 'Decoded file details will appear here'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
