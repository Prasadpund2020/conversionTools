'use client';

import React, { useState } from 'react';
import { PdfToPptxHeaderBar } from './PdfToPptxHeaderBar';
import { PdfToPptxDropzone } from './PdfToPptxDropzone';
import { PdfToPptxControls } from './PdfToPptxControls';
import { PdfToPptxStage } from './PdfToPptxStage';
import { StagedPdfToPptxFile, PptxOptions, PptxResult } from './types';
import { parsePdfForPptx, convertPdfToPptx } from './pdfToPptxEngine';

export const PdfToPptxTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedPdfToPptxFile | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PptxResult | null>(null);

  const [options, setOptions] = useState<PptxOptions>({
    ratio: '16:9',
    quality: 0.88,
  });

  const handleFileSelected = async (file: File) => {
    setIsParsing(true);
    setError(null);
    setResult(null);

    try {
      const parsed = await parsePdfForPptx(file);
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

  const handleOptionsChange = (newOptions: Partial<PptxOptions>) => {
    setOptions((prev) => ({ ...prev, ...newOptions }));
  };

  const handleConvert = async () => {
    if (!stagedFile) return;

    setIsProcessing(true);
    setProgressPercent(0);
    setStatusText('Converting PDF pages to PowerPoint slides...');
    setError(null);

    try {
      const res = await convertPdfToPptx(
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
          'Failed to convert PDF to PowerPoint. Please check document contents.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <PdfToPptxHeaderBar
        stagedFile={stagedFile}
        isProcessing={isProcessing}
        onReset={handleReset}
      />

      {!stagedFile ? (
        <PdfToPptxDropzone
          onFileSelected={handleFileSelected}
          isParsing={isParsing}
          error={error}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <PdfToPptxStage
              stagedFile={stagedFile}
              options={options}
              result={result}
            />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <PdfToPptxControls
              options={options}
              slideCount={stagedFile.pageCount}
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
