"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ExcelSpreadsheetMeta,
  ExcelToPdfOptions,
  ExcelToPdfResult,
} from "./types";
import {
  parseExcelOrCsvFile,
  generateSampleSpreadsheet,
  convertExcelToPdf,
} from "./excelToPdfEngine";
import ExcelToPdfHeaderBar from "./ExcelToPdfHeaderBar";
import ExcelToPdfDropzone from "./ExcelToPdfDropzone";
import ExcelToPdfPreviewStage from "./ExcelToPdfPreviewStage";
import ExcelToPdfControls from "./ExcelToPdfControls";

export default function ExcelToPdfTool() {
  const [meta, setMeta] = useState<ExcelSpreadsheetMeta | null>(null);
  const [options, setOptions] = useState<ExcelToPdfOptions>({
    pageSize: "A4",
    orientation: "landscape",
    theme: "emerald",
    showGridlines: true,
    zebraStriping: true,
    repeatHeaderOnPages: true,
    includePageNumbers: true,
    includeSheetTitle: true,
    fontSize: 8,
    selectedSheetIndex: 0,
  });

  const [result, setResult] = useState<ExcelToPdfResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger conversion
  const triggerConversion = useCallback(
    async (sourceDoc: ExcelSpreadsheetMeta, currentOpts: ExcelToPdfOptions) => {
      setIsProcessing(true);
      try {
        const res = await convertExcelToPdf(sourceDoc, currentOpts);
        setResult(res);
      } catch (err) {
        console.error("Excel to PDF conversion failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Mount with sample on initial render
  useEffect(() => {
    const sample = generateSampleSpreadsheet();
    setMeta(sample);
    const initialOpts: ExcelToPdfOptions = {
      pageSize: "A4",
      orientation: "landscape",
      theme: "emerald",
      showGridlines: true,
      zebraStriping: true,
      repeatHeaderOnPages: true,
      includePageNumbers: true,
      includeSheetTitle: true,
      fontSize: 8,
      selectedSheetIndex: 0,
    };
    setOptions(initialOpts);
    triggerConversion(sample, initialOpts);
  }, [triggerConversion]);

  // Handle options changes with debounce
  const handleOptionsChange = (newOpts: ExcelToPdfOptions) => {
    setOptions(newOpts);
    if (!meta) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerConversion(meta, newOpts);
    }, 150);
  };

  // Handle uploaded spreadsheet file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await parseExcelOrCsvFile(file);
      setMeta(parsed);
      const updatedOpts: ExcelToPdfOptions = {
        ...options,
        selectedSheetIndex: 0,
      };
      setOptions(updatedOpts);
      await triggerConversion(parsed, updatedOpts);
    } catch (err) {
      console.error("Failed to parse spreadsheet:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset to initial state
  const handleReset = () => {
    setMeta(null);
    setResult(null);
  };

  // Load sample
  const handleLoadSample = () => {
    const sample = generateSampleSpreadsheet();
    setMeta(sample);
    const updatedOpts = {
      ...options,
      selectedSheetIndex: 0,
    };
    setOptions(updatedOpts);
    triggerConversion(sample, updatedOpts);
  };

  // Download PDF file
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.pdfUrl;
    const baseName = meta?.fileName
      ? meta.fileName.replace(/\.[^/.]+$/, "")
      : "spreadsheet";
    link.download = `${baseName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <ExcelToPdfHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        pageCount={result?.pageCount}
      />

      {!meta ? (
        <ExcelToPdfDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ExcelToPdfPreviewStage
              meta={meta}
              options={options}
              result={result}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <ExcelToPdfControls
              meta={meta}
              options={options}
              onOptionsChange={handleOptionsChange}
              result={result}
              isProcessing={isProcessing}
              onDownload={handleDownload}
            />
          </div>
        </div>
      )}
    </div>
  );
}
