"use client";

import React, { useState } from "react";
import { StagedDamagedPdf, RepairOptions, RepairResult } from "./types";
import { parsePdfForRepair, repairCorruptedPdf, formatBytes } from "./repairPdfEngine";
import { RepairPdfHeaderBar } from "./RepairPdfHeaderBar";
import { RepairPdfDropzone } from "./RepairPdfDropzone";
import { RepairPdfStage } from "./RepairPdfStage";
import { RepairPdfControls } from "./RepairPdfControls";

export const RepairPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedDamagedPdf | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [result, setResult] = useState<RepairResult | null>(null);

  const [options, setOptions] = useState<RepairOptions>({
    forceTrailerRebuild: true,
    stripCorruptAnnotations: true,
    sanitizeStreams: true,
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForRepair(file);
      setStagedFile(parsed);
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to read raw file bytes.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleReset = () => {
    setStagedFile(null);
    setResult(null);
  };

  const handleRepair = async () => {
    if (!stagedFile) return;
    try {
      setIsProcessing(true);
      const res = await repairCorruptedPdf(stagedFile, options);
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
      alert("PDF repair failed: Document may be severely corrupted beyond recovery.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <RepairPdfHeaderBar
        stagedFile={stagedFile}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <RepairPdfDropzone
              onFileSelected={handleFileSelected}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Diagnostic Output */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <RepairPdfStage
                stagedFile={stagedFile}
                result={result}
                isProcessing={isProcessing}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="text-sm font-bold text-amber-950 dark:text-amber-100">
                        PDF successfully reconstructed! ({result.pagesRecovered} pages salvaged)
                      </h4>
                      <p className="text-xs text-amber-800 dark:text-amber-300">
                        {result.fileName} ({formatBytes(result.repairedSize)})
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#ca8a04] text-white text-xs font-bold hover:bg-[#a16207] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <RepairPdfControls
                options={options}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onRepair={handleRepair}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
