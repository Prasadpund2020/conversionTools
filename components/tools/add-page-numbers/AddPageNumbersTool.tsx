"use client";

import React, { useState } from "react";
import { StagedNumberPdfFile, PageNumberOptions, PageNumberResult } from "./types";
import { parsePdfForNumbering, addPageNumbersToPdf } from "./addPageNumbersEngine";
import { AddPageNumbersHeaderBar } from "./AddPageNumbersHeaderBar";
import { AddPageNumbersDropzone } from "./AddPageNumbersDropzone";
import { AddPageNumbersStage } from "./AddPageNumbersStage";
import { AddPageNumbersControls } from "./AddPageNumbersControls";

export const AddPageNumbersTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedNumberPdfFile | null>(null);
  const [activePage, setActivePage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [result, setResult] = useState<PageNumberResult | null>(null);

  const [options, setOptions] = useState<PageNumberOptions>({
    position: "bottom-center",
    format: "page-n-of-total",
    font: "Helvetica",
    fontSize: 11,
    fontColor: "#374151",
    startNumber: 1,
    batesPrefix: "CONF",
    batesPadding: 6,
    marginPoints: 30,
    pagesRange: "all",
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForNumbering(file);
      setStagedFile(parsed);
      setActivePage(1);
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to read PDF document. Please verify it is a valid PDF.");
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
      const res = await addPageNumbersToPdf(stagedFile, options);
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
      alert("Error adding page numbers to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <AddPageNumbersHeaderBar
        stagedFile={stagedFile}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <AddPageNumbersDropzone
              onFileSelected={handleFileSelected}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Paper layout */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <AddPageNumbersStage
                stagedFile={stagedFile}
                options={options}
                activePage={activePage}
                onPageChange={setActivePage}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-blue-500/10 border border-blue-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="text-sm font-bold text-blue-950 dark:text-blue-100">
                        Page numbers stamped successfully!
                      </h4>
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        {result.fileName} ({result.pageCount} pages)
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#2563eb] text-white text-xs font-bold hover:bg-[#1d4ed8] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <AddPageNumbersControls
                options={options}
                totalPages={stagedFile.pageCount}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onApply={handleApply}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
