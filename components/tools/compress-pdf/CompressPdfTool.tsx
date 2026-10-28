"use client";

import React, { useState } from "react";
import { StagedCompressFile, CompressOptions, CompressResult } from "./types";
import {
  parsePdfForCompression,
  compressPdfDocument,
  createSampleCompressPdf,
  formatBytes,
} from "./compressPdfEngine";
import { CompressPdfHeaderBar } from "./CompressPdfHeaderBar";
import { CompressPdfDropzone } from "./CompressPdfDropzone";
import { CompressPdfStage } from "./CompressPdfStage";
import { CompressPdfControls } from "./CompressPdfControls";

export const CompressPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedCompressFile | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [result, setResult] = useState<CompressResult | null>(null);

  const [options, setOptions] = useState<CompressOptions>({
    level: "recommended",
    stripMetadata: true,
    cleanObjects: true,
    removeBookmarks: false,
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForCompression(file);
      setStagedFile(parsed);
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to load PDF file. Please ensure it is a valid PDF.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleLoadSample = async () => {
    try {
      setIsLoadingFile(true);
      const sample = await createSampleCompressPdf();
      await handleFileSelected(sample);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleReset = () => {
    setStagedFile(null);
    setResult(null);
  };

  const handleCompress = async () => {
    if (!stagedFile) return;
    try {
      setIsProcessing(true);
      const res = await compressPdfDocument(stagedFile, options);
      setResult(res);

      // Trigger automatic instant download
      const a = document.createElement("a");
      a.href = res.downloadUrl;
      a.download = res.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Error occurred while compressing document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <CompressPdfHeaderBar
        stagedFile={stagedFile}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <CompressPdfDropzone
              onFileSelected={handleFileSelected}
              onLoadSample={handleLoadSample}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Comparison Visualizer */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <CompressPdfStage
                stagedFile={stagedFile}
                options={options}
                result={result}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                        PDF successfully compressed by {result.savingsPercentage}%!
                      </h4>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        Reduced from {formatBytes(result.originalSize)} down to{" "}
                        {formatBytes(result.compressedSize)} (Saved {formatBytes(result.savedBytes)}).
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#059669] text-white text-xs font-bold hover:bg-[#047857] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <CompressPdfControls
                options={options}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onCompress={handleCompress}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
