"use client";

import React, { useState } from "react";
import { StagedSplitFile, SplitOptions, SplitResult } from "./types";
import {
  parsePdfForSplitting,
  executeSplitPdf,
  createSampleSplitPdf,
  formatBytes,
} from "./splitPdfEngine";
import { SplitPdfHeaderBar } from "./SplitPdfHeaderBar";
import { SplitPdfDropzone } from "./SplitPdfDropzone";
import { SplitPdfStage } from "./SplitPdfStage";
import { SplitPdfControls } from "./SplitPdfControls";

export const SplitPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedSplitFile | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [result, setResult] = useState<SplitResult | null>(null);

  const [options, setOptions] = useState<SplitOptions>({
    mode: "extract-all",
    rangesText: "1-2, 3-4",
    selectedPages: [1, 2],
    prefixFileName: "",
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForSplitting(file);
      setStagedFile(parsed);
      setOptions((prev) => ({
        ...prev,
        selectedPages: Array.from({ length: parsed.pageCount }, (_, i) => i + 1),
        prefixFileName: parsed.name.replace(/\.[^/.]+$/, ""),
      }));
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to load PDF. Please ensure the file is not corrupted.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleLoadSample = async () => {
    try {
      setIsLoadingFile(true);
      const sample = await createSampleSplitPdf();
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

  const handleTogglePage = (pageNum: number) => {
    setOptions((prev) => {
      const exists = prev.selectedPages.includes(pageNum);
      const updated = exists
        ? prev.selectedPages.filter((p) => p !== pageNum)
        : [...prev.selectedPages, pageNum].sort((a, b) => a - b);
      return { ...prev, selectedPages: updated };
    });
  };

  const handleSelectAllPages = () => {
    if (!stagedFile) return;
    setOptions((prev) => ({
      ...prev,
      selectedPages: Array.from({ length: stagedFile.pageCount }, (_, i) => i + 1),
    }));
  };

  const handleClearSelectedPages = () => {
    setOptions((prev) => ({
      ...prev,
      selectedPages: [],
    }));
  };

  const handleSplit = async () => {
    if (!stagedFile) return;
    try {
      setIsProcessing(true);
      const res = await executeSplitPdf(stagedFile, options);
      setResult(res);

      // If single file, trigger direct download
      if (res.files.length === 1) {
        const single = res.files[0];
        const a = document.createElement("a");
        a.href = single.downloadUrl;
        a.download = single.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else if (res.zipDownloadUrl) {
        // Trigger ZIP download
        const a = document.createElement("a");
        a.href = res.zipDownloadUrl;
        a.download = res.zipFileName || "split_pdfs.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while splitting the document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <SplitPdfHeaderBar
        stagedFile={stagedFile}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <SplitPdfDropzone
              onFileSelected={handleFileSelected}
              onLoadSample={handleLoadSample}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Pages Grid */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <SplitPdfStage
                stagedFile={stagedFile}
                options={options}
                onTogglePage={handleTogglePage}
              />

              {/* Split Download Result Card */}
              {result && (
                <div className="rounded-2xl bg-surface-container-low p-5 border border-primary/30 shadow-lg flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎉</span>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">
                          Splitting Complete! ({result.totalOutputFiles} output {result.totalOutputFiles === 1 ? "file" : "files"})
                        </h4>
                        <p className="text-[11px] text-on-surface-variant">
                          All files processed locally in your browser.
                        </p>
                      </div>
                    </div>
                    {result.zipDownloadUrl && (
                      <a
                        href={result.zipDownloadUrl}
                        download={result.zipFileName}
                        className="px-4 py-2 rounded-full bg-[#006591] text-white text-xs font-bold hover:bg-[#007cb3] transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <span>📦</span>
                        <span>Download ZIP Archive</span>
                      </a>
                    )}
                  </div>

                  {/* Individual files listing */}
                  <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pt-2 border-t border-outline-variant/20">
                    {result.files.map((rf, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-xl bg-surface text-xs border border-outline-variant/30"
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span className="text-blue-500 font-bold">📄</span>
                          <span className="font-semibold text-on-surface truncate">{rf.fileName}</span>
                          <span className="text-outline text-[11px]">
                            ({rf.pageCount} pgs • {formatBytes(rf.sizeBytes)})
                          </span>
                        </div>
                        <a
                          href={rf.downloadUrl}
                          download={rf.fileName}
                          className="px-3 py-1 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-[11px] transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <SplitPdfControls
                options={options}
                totalPages={stagedFile.pageCount}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onSplit={handleSplit}
                onSelectAllPages={handleSelectAllPages}
                onClearSelectedPages={handleClearSelectedPages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
