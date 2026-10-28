'use client';

import React, { useState } from 'react';
import { Base64ConverterHeaderBar } from './Base64ConverterHeaderBar';
import { Base64ConverterDropzone } from './Base64ConverterDropzone';
import { Base64ConverterControls } from './Base64ConverterControls';
import { Base64ConverterStage } from './Base64ConverterStage';
import { Base64Options, Base64Result } from './types';
import { encodeFileToBase64, decodeBase64ToFile } from './base64ConverterEngine';

export const Base64ConverterTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64InputText, setBase64InputText] = useState<string>('');
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [result, setResult] = useState<Base64Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [options, setOptions] = useState<Base64Options>({
    mode: 'encode',
    includeDataUriPrefix: true,
    lineWrap: false,
  });

  const handleFileLoaded = async (file: File) => {
    setSelectedFile(file);
    setHasStarted(true);
    setOptions((prev) => ({ ...prev, mode: 'encode' }));
    setError(null);

    try {
      const res = await encodeFileToBase64(file, {
        ...options,
        mode: 'encode',
      });
      setResult(res);
    } catch (err: any) {
      console.error('Encoding error:', err);
      setError(err?.message || 'Failed to encode file.');
    }
  };

  const handleStartDecodeMode = () => {
    setSelectedFile(null);
    setBase64InputText('');
    setHasStarted(true);
    setOptions((prev) => ({ ...prev, mode: 'decode' }));
    setResult(null);
    setError(null);
  };

  const handleConvert = async () => {
    setError(null);

    try {
      if (options.mode === 'encode') {
        if (!selectedFile) {
          setError('Please choose or drop a file to encode.');
          return;
        }
        const res = await encodeFileToBase64(selectedFile, options);
        setResult(res);
      } else {
        if (!base64InputText.trim()) {
          setError('Please paste a Base64 string to decode.');
          return;
        }
        const res = decodeBase64ToFile(base64InputText);
        setResult(res);
      }
    } catch (err: any) {
      console.error('Base64 error:', err);
      setError(err?.message || 'Failed to process Base64 operation.');
    }
  };

  const handleDownload = () => {
    if (!result?.downloadUrl) return;
    const a = document.createElement('a');
    a.href = result.downloadUrl;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (result?.downloadUrl && result.downloadUrl.startsWith('blob:')) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setSelectedFile(null);
    setBase64InputText('');
    setResult(null);
    setHasStarted(false);
    setError(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Base64ConverterHeaderBar />

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
          <Base64ConverterDropzone onFileLoaded={handleFileLoaded} error={error} />
          <div className="text-center">
            <button
              onClick={handleStartDecodeMode}
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 underline decoration-2 underline-offset-4"
            >
              Or decode existing Base64 string to a file &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Base64ConverterControls
            options={options}
            onChangeOptions={(opts) => {
              setOptions((prev) => ({ ...prev, ...opts }));
              // Automatically re-encode if file exists and toggled
              if (selectedFile && opts.mode !== 'decode') {
                encodeFileToBase64(selectedFile, { ...options, ...opts }).then(setResult).catch(() => {});
              }
            }}
            onConvert={handleConvert}
            onReset={handleReset}
            canConvert={
              options.mode === 'encode'
                ? selectedFile !== null
                : base64InputText.trim().length > 0
            }
            fileName={selectedFile?.name}
          />

          <Base64ConverterStage
            mode={options.mode}
            selectedFile={selectedFile}
            base64InputText={base64InputText}
            onChangeBase64Input={setBase64InputText}
            result={result}
            onDownload={handleDownload}
            onClear={() => {
              setSelectedFile(null);
              setBase64InputText('');
              setResult(null);
            }}
          />
        </div>
      )}
    </div>
  );
};
