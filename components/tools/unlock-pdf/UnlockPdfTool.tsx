'use client';

import React, { useState } from 'react';
import { UnlockPdfHeaderBar } from './UnlockPdfHeaderBar';
import { UnlockPdfDropzone } from './UnlockPdfDropzone';
import { UnlockPdfControls } from './UnlockPdfControls';
import { UnlockPdfStage } from './UnlockPdfStage';
import { StagedUnlockPdfFile, UnlockPdfResult } from './types';
import { parsePdfForUnlock, unlockPdfDocument } from './unlockPdfEngine';

export const UnlockPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedUnlockPdfFile | null>(null);
  const [password, setPassword] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UnlockPdfResult | null>(null);

  const handleFileSelected = async (file: File) => {
    setIsParsing(true);
    setError(null);
    setResult(null);
    setPassword('');

    try {
      const parsed = await parsePdfForUnlock(file);
      setStagedFile(parsed);
    } catch (err: unknown) {
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
    setPassword('');
    setResult(null);
    setError(null);
  };

  const handleUnlock = async () => {
    if (!stagedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const res = await unlockPdfDocument(stagedFile, password);
      setResult(res);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to decrypt PDF. Please double check the password and try again.';
      setError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <UnlockPdfHeaderBar stagedFile={stagedFile} onReset={handleReset} />

      {!stagedFile ? (
        <UnlockPdfDropzone
          onFileSelected={handleFileSelected}
          isParsing={isParsing}
          error={error}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <UnlockPdfStage stagedFile={stagedFile} result={result} />
          </div>
          <div className="lg:col-span-5 xl:col-span-4 sticky top-6">
            <UnlockPdfControls
              stagedFile={stagedFile}
              password={password}
              isProcessing={isProcessing}
              onPasswordChange={setPassword}
              onUnlock={handleUnlock}
            />
          </div>
        </div>
      )}
    </div>
  );
};
