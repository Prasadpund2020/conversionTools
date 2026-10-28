'use client';

import React, { useState } from 'react';
import { JsonCsvHeaderBar } from './JsonCsvHeaderBar';
import { JsonCsvDropzone } from './JsonCsvDropzone';
import { JsonCsvControls } from './JsonCsvControls';
import { JsonCsvStage } from './JsonCsvStage';
import { JsonCsvOptions, JsonCsvResult } from './types';
import { convertJsonToCsv, convertCsvToJson } from './jsonCsvEngine';

export const JsonCsvTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [baseFileName, setBaseFileName] = useState<string>('converted');
  const [hasLoadedFile, setHasLoadedFile] = useState<boolean>(false);
  const [result, setResult] = useState<JsonCsvResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [options, setOptions] = useState<JsonCsvOptions>({
    direction: 'json-to-csv',
    delimiter: ',',
    prettyJson: true,
    includeHeaders: true,
  });

  const handleFileLoaded = (content: string, name: string, isJson: boolean) => {
    setInputText(content);
    setBaseFileName(name.replace(/\.[^/.]+$/, ''));
    setOptions((prev) => ({
      ...prev,
      direction: isJson ? 'json-to-csv' : 'csv-to-json',
    }));
    setHasLoadedFile(true);
    setResult(null);
    setError(null);
  };

  const handleStartBlank = () => {
    setInputText('');
    setBaseFileName('converted');
    setHasLoadedFile(true);
    setResult(null);
    setError(null);
  };

  const handleSwapDirection = () => {
    const nextDir = options.direction === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv';
    setOptions((prev) => ({ ...prev, direction: nextDir }));

    // If we already have result output, move it to input!
    if (result?.outputText) {
      setInputText(result.outputText);
      setResult(null);
    }
  };

  const handleConvert = () => {
    if (!inputText.trim()) {
      setError('Please provide input text or upload a file first.');
      return;
    }
    setError(null);

    try {
      if (options.direction === 'json-to-csv') {
        const res = convertJsonToCsv(inputText, options, baseFileName);
        setResult(res);
      } else {
        const res = convertCsvToJson(inputText, options, baseFileName);
        setResult(res);
      }
    } catch (err: any) {
      console.error('Conversion error:', err);
      setError(err?.message || 'Failed to convert data. Please verify your input format.');
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
    setInputText('');
    setBaseFileName('converted');
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      <JsonCsvHeaderBar />

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

      {!hasLoadedFile && inputText.length === 0 ? (
        <div className="space-y-4">
          <JsonCsvDropzone onFileLoaded={handleFileLoaded} error={error} />
          <div className="text-center">
            <button
              onClick={handleStartBlank}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 underline decoration-2 underline-offset-4"
            >
              Or open blank editor to paste data manually &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <JsonCsvControls
            options={options}
            onChangeOptions={(opts) => setOptions((prev) => ({ ...prev, ...opts }))}
            onConvert={handleConvert}
            onSwapDirection={handleSwapDirection}
            onReset={handleReset}
            canConvert={inputText.trim().length > 0}
          />

          <JsonCsvStage
            inputText={inputText}
            onChangeInput={setInputText}
            direction={options.direction}
            result={result}
            onDownload={handleDownload}
            onClear={() => setInputText('')}
          />
        </div>
      )}
    </div>
  );
};
