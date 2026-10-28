"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  OcrImageMeta,
  OcrOptions,
  OcrResult,
} from "./types";
import {
  loadImageMeta,
  generateSampleInvoiceImage,
  performClientOcr,
  exportOcrToPdf,
} from "./ocrScannerEngine";
import OcrScannerHeaderBar from "./OcrScannerHeaderBar";
import OcrScannerDropzone from "./OcrScannerDropzone";
import OcrScannerStage from "./OcrScannerStage";
import OcrScannerControls from "./OcrScannerControls";

export default function OcrScannerTool() {
  const [meta, setMeta] = useState<OcrImageMeta | null>(null);
  const [options, setOptions] = useState<OcrOptions>({
    mode: "general",
    enhanceContrast: true,
    threshold: 128,
    invertColors: false,
    autoCleanText: true,
  });

  const [result, setResult] = useState<OcrResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger OCR extraction
  const triggerOcr = useCallback(
    async (sourceMeta: OcrImageMeta, currentOpts: OcrOptions) => {
      setIsProcessing(true);
      try {
        const res = await performClientOcr(sourceMeta, currentOpts);
        setResult(res);
      } catch (err) {
        console.error("OCR execution failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Mount with sample on initial render
  useEffect(() => {
    const sample = generateSampleInvoiceImage();
    setMeta(sample);
    const initialOpts: OcrOptions = {
      mode: "general",
      enhanceContrast: true,
      threshold: 128,
      invertColors: false,
      autoCleanText: true,
    };
    setOptions(initialOpts);
    triggerOcr(sample, initialOpts);
  }, [triggerOcr]);

  // Handle options changes with debounce
  const handleOptionsChange = (newOpts: OcrOptions) => {
    setOptions(newOpts);
    if (!meta) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerOcr(meta, newOpts);
    }, 150);
  };

  // Handle file select
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await loadImageMeta(file);
      setMeta(parsed);
      await triggerOcr(parsed, options);
    } catch (err) {
      console.error("Failed to load image:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset
  const handleReset = () => {
    setMeta(null);
    setResult(null);
  };

  // Load sample invoice
  const handleLoadSample = () => {
    const sample = generateSampleInvoiceImage();
    setMeta(sample);
    triggerOcr(sample, options);
  };

  // Copy full text
  const handleCopyText = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.fullText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download TXT
  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result.fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "ocr"}-extracted.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download JSON
  const handleDownloadJson = () => {
    if (!result) return;
    const jsonStr = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "ocr"}-blocks.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    if (!result) return;
    const pdfUrl = await exportOcrToPdf(
      result.fullText,
      meta?.fileName || "Document"
    );
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `${meta?.fileName ? meta.fileName.replace(/\.[^/.]+$/, "") : "ocr"}-text.pdf`;
    a.click();
    URL.revokeObjectURL(pdfUrl);
  };

  // Find & Replace
  const handleSearchReplace = (search: string, replace: string) => {
    if (!result) return;
    const updated = result.fullText.replaceAll(search, replace);
    setResult({
      ...result,
      fullText: updated,
      characterCount: updated.length,
      wordCount: updated.split(/\s+/).filter(Boolean).length,
    });
  };

  // Manual text edits
  const handleTextEdit = (newText: string) => {
    if (!result) return;
    setResult({
      ...result,
      fullText: newText,
      characterCount: newText.length,
      wordCount: newText.split(/\s+/).filter(Boolean).length,
      lineCount: newText.split("\n").length,
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <OcrScannerHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        wordCount={result?.wordCount}
      />

      {!meta ? (
        <OcrScannerDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <OcrScannerStage
              meta={meta}
              result={result}
              options={options}
              isProcessing={isProcessing}
              onTextEdit={handleTextEdit}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <OcrScannerControls
              meta={meta}
              options={options}
              onOptionsChange={handleOptionsChange}
              result={result}
              isProcessing={isProcessing}
              onCopyText={handleCopyText}
              onDownloadTxt={handleDownloadTxt}
              onDownloadJson={handleDownloadJson}
              onDownloadPdf={handleDownloadPdf}
              isCopied={isCopied}
              onSearchReplace={handleSearchReplace}
            />
          </div>
        </div>
      )}
    </div>
  );
}
