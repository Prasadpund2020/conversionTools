"use client";

import React, { useState } from "react";
import { StagedComparePdf, CompareOptions, CompareAuditResult } from "./types";
import { parsePdfForComparison, performPdfComparison } from "./comparePdfEngine";
import { ComparePdfHeaderBar } from "./ComparePdfHeaderBar";
import { ComparePdfDropzone } from "./ComparePdfDropzone";
import { ComparePdfStage } from "./ComparePdfStage";
import { ComparePdfControls } from "./ComparePdfControls";

export const ComparePdfTool: React.FC = () => {
  const [docA, setDocA] = useState<StagedComparePdf | null>(null);
  const [docB, setDocB] = useState<StagedComparePdf | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [auditResult, setAuditResult] = useState<CompareAuditResult | null>(null);

  const [options, setOptions] = useState<CompareOptions>({
    viewMode: "split-side-by-side",
    sliderPosition: 50,
    highlightDifferences: true,
    activePage: 1,
    zoomLevel: 100,
  });

  const handleSelectDocA = async (file: File) => {
    try {
      setIsLoading(true);
      const parsed = await parsePdfForComparison(file);
      setDocA(parsed);
      if (docB) {
        const audit = await performPdfComparison(parsed, docB);
        setAuditResult(audit);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to read Document A. Please select a valid PDF file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectDocB = async (file: File) => {
    try {
      setIsLoading(true);
      const parsed = await parsePdfForComparison(file);
      setDocB(parsed);
      if (docA) {
        const audit = await performPdfComparison(docA, parsed);
        setAuditResult(audit);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to read Document B. Please select a valid PDF file.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDocA(null);
    setDocB(null);
    setAuditResult(null);
    setOptions((prev) => ({ ...prev, activePage: 1 }));
  };

  const handleExportReport = () => {
    if (!auditResult) return;
    const reportData = JSON.stringify(auditResult, null, 2);
    const blob = new Blob([reportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Comparison_Audit_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const maxPages = Math.max(docA?.pageCount || 1, docB?.pageCount || 1);
  const isReady = docA !== null && docB !== null;

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <ComparePdfHeaderBar
        docA={docA}
        docB={docB}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!isReady ? (
          <div className="my-auto py-8">
            <ComparePdfDropzone
              docA={docA}
              docB={docB}
              onSelectDocA={handleSelectDocA}
              onSelectDocB={handleSelectDocB}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Dual document viewer */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <ComparePdfStage
                docA={docA}
                docB={docB}
                options={options}
                auditResult={auditResult}
                onSliderChange={(pos) => setOptions((o) => ({ ...o, sliderPosition: pos }))}
              />
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <ComparePdfControls
                options={options}
                auditResult={auditResult}
                maxPages={maxPages}
                onOptionsChange={setOptions}
                onExportReport={handleExportReport}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
