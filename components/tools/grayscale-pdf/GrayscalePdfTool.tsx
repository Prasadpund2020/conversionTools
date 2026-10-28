'use client';

import React, { useState } from 'react';
import { GrayscalePdfHeaderBar } from './GrayscalePdfHeaderBar';
import { GrayscalePdfDropzone } from './GrayscalePdfDropzone';
import { GrayscalePdfControls } from './GrayscalePdfControls';
import { GrayscalePdfStage } from './GrayscalePdfStage';
import { StagedGrayscalePdfFile, GrayscaleOptions, GrayscalePdfResult } from './types';
import { parsePdfForGrayscale, convertPdfToGrayscale } from './grayscalePdfEngine';

export const GrayscalePdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedGrayscalePdfFile | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GrayscalePdfResult | null>(null);

  const [options, setOptions] = useState<GrayscaleOptions>({
    mode: 'grayscale',
    dpi: 150,
    brightness: 0,
    contrast: 0,
  });

  const handleFileSelected = async (file: File) => {
    setIsParsing(true);
    setError(null);
    setResult(null);

    try {
      const parsed = await parsePdfForGrayscale(file);
      setStagedFile(parsed);
    } catch (err: any) {
      console.error(err);
      setError('Unable to parse the PDF document. Please verify the file.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleReset = () => {
    if (result?.downloadUrl) {
      URL.revokeObjectURL(result.downloadUrl);
    }
    setStagedFile(null);
    setResult(null);
    setError(null);
    setProgressPercent(0);
    setStatusText('');
  };

  const handleOptionsChange = (newOptions: Partial<GrayscaleOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleConvert = async () => {
    if (!stagedFile) return;

    setIsProcessing(true);
    setProgressPercent(0);
    setStatusText('Starting monochrome conversion...');
    setError(null);

    try {
      const res = await convertPdfToGrayscale(
        stagedFile,
        options,
        (progress, status) => {
          setProgressPercent(progress);
          setStatusText(status);
        }
      );
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          'Failed to convert PDF to grayscale. Please check document contents.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <GrayscalePdfHeaderBar
        stagedFile={stagedFile}
        isProcessing={isProcessing}
        onReset={handleReset}
      />

      {!stagedFile ? (
        <GrayscalePdfDropzone
          onFileSelected={handleFileSelected}
          isParsing={isParsing}
          error={error}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <GrayscalePdfStage
              stagedFile={stagedFile}
              options={options}
              result={result}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <GrayscalePdfControls
              options={options}
              pageCount={stagedFile.pageCount}
              isProcessing={isProcessing}
              progressPercent={progressPercent}
              statusText={statusText}
              onOptionsChange={handleOptionsChange}
              onConvert={handleConvert}
            />
          </div>
        </div>
      )}
    </div>
  );
};
