"use client";

import React, { useState } from "react";
import { StagedPdfFile, WatermarkOptions, WatermarkResult } from "./types";
import {
  parsePdfDocument,
  applyWatermarkToPdf,
  createSampleWatermarkPdf,
} from "./watermarkPdfEngine";
import { WatermarkPdfHeaderBar } from "./WatermarkPdfHeaderBar";
import { WatermarkPdfDropzone } from "./WatermarkPdfDropzone";
import { WatermarkPdfStage } from "./WatermarkPdfStage";
import { WatermarkPdfControls } from "./WatermarkPdfControls";

export const WatermarkPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedPdfFile | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [result, setResult] = useState<WatermarkResult | null>(null);

  const [options, setOptions] = useState<WatermarkOptions>({
    type: "text",
    text: "CONFIDENTIAL",
    font: "Helvetica",
    fontSize: 48,
    color: "#dc2626",
    opacity: 0.3,
    rotation: -45,
    position: "center",
    layer: "front",
    tiled: false,
    pagesRange: "all",
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfDocument(file);
      setStagedFile(parsed);
      setActivePage(1);
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to parse PDF file. Ensure it is a valid, uncorrupted PDF.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleLoadSample = async () => {
    try {
      setIsLoadingFile(true);
      const sampleFile = await createSampleWatermarkPdf();
      await handleFileSelected(sampleFile);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleReset = () => {
    setStagedFile(null);
    setResult(null);
    setActivePage(1);
  };

  const handleApply = async () => {
    if (!stagedFile) return;
    try {
      setIsProcessing(true);
      const res = await applyWatermarkToPdf(stagedFile, options);
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
      alert("Error applying watermark. Please verify document permissions.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <WatermarkPdfHeaderBar
        stagedFile={stagedFile}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <WatermarkPdfDropzone
              onFileSelected={handleFileSelected}
              onLoadSample={handleLoadSample}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center & Left Preview Stage */}
            <div className="xl:col-span-8">
              <WatermarkPdfStage
                stagedFile={stagedFile}
                options={options}
                activePage={activePage}
                onPageChange={setActivePage}
              />
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <WatermarkPdfControls
                options={options}
                totalPages={stagedFile.pageCount}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onApply={handleApply}
              />

              {result && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-950 dark:text-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">✅</span>
                    <div>
                      <p className="font-bold">Watermark applied successfully!</p>
                      <p className="text-[11px] opacity-80">{result.fileName}</p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-3 py-1.5 rounded-full bg-[#023b2c] text-white font-bold hover:bg-[#034d3a] transition-all cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
