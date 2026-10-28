'use client';

import React, { useState } from 'react';
import { MarkdownToPdfHeaderBar } from './MarkdownToPdfHeaderBar';
import { MarkdownToPdfDropzone } from './MarkdownToPdfDropzone';
import { MarkdownToPdfControls } from './MarkdownToPdfControls';
import { MarkdownToPdfStage } from './MarkdownToPdfStage';
import { MarkdownToPdfOptions, MarkdownPdfResult } from './types';
import { convertMarkdownToPdf } from './markdownToPdfEngine';

export const MarkdownToPdfTool: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>('');
  const [docTitle, setDocTitle] = useState<string>('Document');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [result, setResult] = useState<MarkdownPdfResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [options, setOptions] = useState<MarkdownToPdfOptions>({
    fontSize: 'medium',
    pageSize: 'A4',
    includeHeader: true,
  });

  const handleFileUploaded = (content: string, name: string) => {
    setMarkdownText(content);
    setDocTitle(name || 'Document');
    setHasStarted(true);
    setResult(null);
    setError(null);
  };

  const handleStartBlank = () => {
    setMarkdownText('');
    setDocTitle('Document');
    setHasStarted(true);
    setResult(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!markdownText.trim()) {
      setError('Please enter or upload some Markdown content first.');
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const res = await convertMarkdownToPdf(markdownText, docTitle || 'Document', options);
      setResult(res);
    } catch (err: any) {
      console.error('Markdown to PDF error:', err);
      setError(err?.message || 'Failed to generate PDF from Markdown.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.downloadUrl;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (result) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setMarkdownText('');
    setDocTitle('Document');
    setResult(null);
    setHasStarted(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      <MarkdownToPdfHeaderBar onReset={handleReset} hasText={hasStarted} />

      {error && (
        <div className="max-w-4xl mx-auto p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-600 dark:text-rose-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-xs font-semibold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {!hasStarted ? (
        <div className="space-y-4">
          <MarkdownToPdfDropzone onFileUploaded={handleFileUploaded} error={error} />
          <div className="text-center">
            <button
              onClick={handleStartBlank}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 underline decoration-2 underline-offset-4"
            >
              Or open blank editor to type from scratch &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <MarkdownToPdfControls
            options={options}
            onChangeOptions={(opts) => setOptions((prev) => ({ ...prev, ...opts }))}
            onConvert={handleConvert}
            isProcessing={isProcessing}
            onReset={handleReset}
            canConvert={markdownText.trim().length > 0}
          />

          <MarkdownToPdfStage
            markdownText={markdownText}
            docTitle={docTitle}
            onChangeTitle={setDocTitle}
            onChangeText={setMarkdownText}
            result={result}
            onDownload={handleDownload}
            onClear={() => setMarkdownText('')}
          />
        </div>
      )}
    </div>
  );
};
