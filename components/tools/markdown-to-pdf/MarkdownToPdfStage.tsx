'use client';

import React, { useMemo } from 'react';
import { MarkdownPdfResult } from './types';
import { formatBytes } from './markdownToPdfEngine';

interface MarkdownToPdfStageProps {
  markdownText: string;
  docTitle: string;
  onChangeTitle: (title: string) => void;
  onChangeText: (text: string) => void;
  result: MarkdownPdfResult | null;
  onDownload: () => void;
  onClear: () => void;
}

export const MarkdownToPdfStage: React.FC<MarkdownToPdfStageProps> = ({
  markdownText,
  docTitle,
  onChangeTitle,
  onChangeText,
  result,
  onDownload,
  onClear,
}) => {
  // Simple quick preview renderer for the right pane
  const renderedPreview = useMemo(() => {
    if (!markdownText.trim()) return '';
    return markdownText
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold text-slate-900 dark:text-white mt-6 mb-3 border-b-2 border-emerald-500 pb-1">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-emerald-500 pl-3 my-2 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 py-1 rounded-r">$1</blockquote>')
      .replace(/```([\s\S]*?)```/gm, '<pre class="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-xs my-3 overflow-x-auto"><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-rose-500 dark:text-rose-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>')
      .replace(/\n$/gim, '<br />');
  }, [markdownText]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Result Card if converted */}
      {result && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base">
                PDF Ready to Download
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {result.fileName} • {result.pageCount} {result.pageCount === 1 ? 'page' : 'pages'} • {formatBytes(result.sizeBytes)}
              </p>
            </div>
          </div>
          <button
            onClick={onDownload}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-medium text-sm rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      )}

      {/* Document Title Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 min-w-max">
          Document Title:
        </label>
        <input
          type="text"
          value={docTitle}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Untitled Document"
          className="flex-1 w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
        <button
          onClick={onClear}
          className="text-xs text-slate-400 hover:text-rose-500 px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all"
        >
          Clear Text
        </button>
      </div>

      {/* Dual Pane: Editor & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Pane */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-[540px]">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Markdown Editor
            </span>
            <span className="text-[11px] text-slate-400">
              {markdownText.length} chars • {markdownText.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            value={markdownText}
            onChange={(e) => onChangeText(e.target.value)}
            placeholder="Type or paste your Markdown here...

# Example Heading
Write your content here. Supports **bold**, *italic*, lists, code blocks, and blockquotes."
            className="flex-1 w-full p-4 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-transparent resize-none focus:outline-none focus:ring-0 leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Live Preview Pane */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden h-[540px]">
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Visual Preview
            </span>
            <span className="text-[11px] text-slate-400">Rendered view</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm">
            {renderedPreview ? (
              <div
                dangerouslySetInnerHTML={{ __html: renderedPreview }}
                className="space-y-2 leading-relaxed"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-xs">Preview will appear here when you enter markdown</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
