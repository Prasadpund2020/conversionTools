"use client";

import React, { useState } from "react";
import { StagedRedactFile, RedactionBox, RedactOptions, RedactResult } from "./types";
import {
  parsePdfForRedact,
  applyRedactionsToPdf,
  createSampleRedactPdf,
} from "./redactPdfEngine";
import { RedactPdfHeaderBar } from "./RedactPdfHeaderBar";
import { RedactPdfDropzone } from "./RedactPdfDropzone";
import { RedactPdfStage } from "./RedactPdfStage";
import { RedactPdfControls } from "./RedactPdfControls";

export const RedactPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedRedactFile | null>(null);
  const [activePage, setActivePage] = useState<number>(1);
  const [boxes, setBoxes] = useState<RedactionBox[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [result, setResult] = useState<RedactResult | null>(null);

  const [options, setOptions] = useState<RedactOptions>({
    activeStyle: "blackout",
    customOverlayText: "REDACTED",
    autoSearchText: "",
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForRedact(file);
      setStagedFile(parsed);
      setActivePage(1);
      setBoxes([]);
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
      const sample = await createSampleRedactPdf();
      await handleFileSelected(sample);
      // Pre-populate with sample redaction boxes
      setBoxes([
        {
          id: "ssn-box",
          page: 1,
          x: 44,
          y: 28,
          width: 32,
          height: 6,
          style: "blackout",
        },
        {
          id: "email-box",
          page: 1,
          x: 32,
          y: 38,
          width: 48,
          height: 6,
          style: "redacted-label",
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleReset = () => {
    setStagedFile(null);
    setBoxes([]);
    setResult(null);
  };

  const handleAddBox = (box: RedactionBox) => {
    setBoxes((prev) => [...prev, box]);
  };

  const handleRemoveBox = (id: string) => {
    setBoxes((prev) => prev.filter((b) => b.id !== id));
  };

  const handleClearAllBoxes = () => {
    setBoxes([]);
  };

  const handleAddQuickPreset = (preset: "ssn" | "email" | "account") => {
    if (preset === "ssn") {
      handleAddBox({
        id: `ssn-${Date.now()}`,
        page: activePage,
        x: 44,
        y: 28,
        width: 32,
        height: 6,
        style: options.activeStyle,
      });
    } else if (preset === "email") {
      handleAddBox({
        id: `email-${Date.now()}`,
        page: activePage,
        x: 32,
        y: 38,
        width: 48,
        height: 6,
        style: options.activeStyle,
      });
    } else {
      handleAddBox({
        id: `acc-${Date.now()}`,
        page: activePage,
        x: 48,
        y: 48,
        width: 44,
        height: 6,
        style: options.activeStyle,
      });
    }
  };

  const handleApplyRedactions = async () => {
    if (!stagedFile || boxes.length === 0) return;
    try {
      setIsProcessing(true);
      const res = await applyRedactionsToPdf(stagedFile, boxes, options);
      setResult(res);

      // Trigger automatic download
      const a = document.createElement("a");
      a.href = res.downloadUrl;
      a.download = res.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert("Failed to apply redactions to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <RedactPdfHeaderBar
        stagedFile={stagedFile}
        boxesCount={boxes.length}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <RedactPdfDropzone
              onFileSelected={handleFileSelected}
              onLoadSample={handleLoadSample}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Interactive drawing */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <RedactPdfStage
                stagedFile={stagedFile}
                boxes={boxes}
                activePage={activePage}
                options={options}
                onPageChange={setActivePage}
                onAddBox={handleAddBox}
                onRemoveBox={handleRemoveBox}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-slate-900 text-white p-5 shadow-lg flex items-center justify-between border border-slate-700">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⬛</span>
                    <div>
                      <h4 className="text-sm font-bold">
                        Successfully burned {result.redactionsApplied} redaction blocks!
                      </h4>
                      <p className="text-xs text-slate-300">
                        {result.fileName} saved with permanent content concealment.
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-slate-200 transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <RedactPdfControls
                options={options}
                boxes={boxes}
                activePage={activePage}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onRemoveBox={handleRemoveBox}
                onClearAllBoxes={handleClearAllBoxes}
                onAddQuickPreset={handleAddQuickPreset}
                onApplyRedactions={handleApplyRedactions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
