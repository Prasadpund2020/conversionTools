"use client";

import React, { useState } from "react";
import { StagedOrganizeFile, PageCardItem, OrganizePdfResult } from "./types";
import { parsePdfForOrganize, saveOrganizedPdf, formatBytes } from "./organizePdfEngine";
import { OrganizePdfHeaderBar } from "./OrganizePdfHeaderBar";
import { OrganizePdfDropzone } from "./OrganizePdfDropzone";
import { OrganizePdfStage } from "./OrganizePdfStage";
import { OrganizePdfControls } from "./OrganizePdfControls";

export const OrganizePdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedOrganizeFile | null>(null);
  const [pages, setPages] = useState<PageCardItem[]>([]);
  const [initialPages, setInitialPages] = useState<PageCardItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [result, setResult] = useState<OrganizePdfResult | null>(null);

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const { staged, initialPages } = await parsePdfForOrganize(file);
      setStagedFile(staged);
      setPages(initialPages);
      setInitialPages(initialPages);
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
    setPages([]);
    setInitialPages([]);
    setResult(null);
  };

  const handleRotatePage = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const handleRotateAll = () => {
    setPages((prev) => prev.map((p) => ({ ...p, rotation: (p.rotation + 90) % 360 })));
  };

  const handleMovePage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= pages.length) return;

    setPages((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return updated;
    });
  };

  const handleDuplicatePage = (id: string) => {
    const item = pages.find((p) => p.id === id);
    if (!item) return;
    const newItem: PageCardItem = {
      ...item,
      id: `dup-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    const idx = pages.findIndex((p) => p.id === id);
    setPages((prev) => {
      const updated = [...prev];
      updated.splice(idx + 1, 0, newItem);
      return updated;
    });
  };

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleReverseOrder = () => {
    setPages((prev) => [...prev].reverse());
  };

  const handleResetOrder = () => {
    setPages(initialPages);
  };

  const handleSave = async () => {
    if (!stagedFile || pages.length === 0) return;
    try {
      setIsProcessing(true);
      const res = await saveOrganizedPdf(stagedFile, pages);
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
      alert("Error generating organized PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <OrganizePdfHeaderBar
        stagedFile={stagedFile}
        currentPageCount={pages.length}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <OrganizePdfDropzone
              onFileSelected={handleFileSelected}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Pages Grid */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <OrganizePdfStage
                stagedFile={stagedFile}
                pages={pages}
                onRotatePage={handleRotatePage}
                onMovePage={handleMovePage}
                onDuplicatePage={handleDuplicatePage}
                onDeletePage={handleDeletePage}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-purple-500/10 border border-purple-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="text-sm font-bold text-purple-950 dark:text-purple-100">
                        PDF restructured and saved ({result.pageCount} pages)!
                      </h4>
                      <p className="text-xs text-purple-800 dark:text-purple-300">
                        {result.fileName} ({formatBytes(result.sizeBytes)})
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#9333ea] text-white text-xs font-bold hover:bg-[#7e22ce] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <OrganizePdfControls
                pageCount={pages.length}
                isProcessing={isProcessing}
                onRotateAll={handleRotateAll}
                onReverseOrder={handleReverseOrder}
                onResetOrder={handleResetOrder}
                onSave={handleSave}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
