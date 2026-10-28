"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  EpubBookMeta,
  EpubToPdfOptions,
  EpubToPdfResult,
} from "./types";
import {
  parseEpubFile,
  generateSampleEpubBook,
  convertEpubToPdf,
} from "./epubToPdfEngine";
import EpubToPdfHeaderBar from "./EpubToPdfHeaderBar";
import EpubToPdfDropzone from "./EpubToPdfDropzone";
import EpubToPdfPreviewStage from "./EpubToPdfPreviewStage";
import EpubToPdfControls from "./EpubToPdfControls";

export default function EpubToPdfTool() {
  const [meta, setMeta] = useState<EpubBookMeta | null>(null);
  const [options, setOptions] = useState<EpubToPdfOptions>({
    trimSize: "6x9",
    fontFamily: "serif",
    fontSize: 11,
    lineSpacing: 1.6,
    includeCoverPage: true,
    includeTableOfContents: true,
    includeRunningHeader: true,
    includePageNumbers: true,
    selectedChapterIndex: -1,
  });

  const [result, setResult] = useState<EpubToPdfResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger conversion
  const triggerConversion = useCallback(
    async (sourceBook: EpubBookMeta, currentOpts: EpubToPdfOptions) => {
      setIsProcessing(true);
      try {
        const res = await convertEpubToPdf(sourceBook, currentOpts);
        setResult(res);
      } catch (err) {
        console.error("ePub to PDF conversion failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Mount with sample on initial render
  useEffect(() => {
    const sample = generateSampleEpubBook();
    setMeta(sample);
    const initialOpts: EpubToPdfOptions = {
      trimSize: "6x9",
      fontFamily: "serif",
      fontSize: 11,
      lineSpacing: 1.6,
      includeCoverPage: true,
      includeTableOfContents: true,
      includeRunningHeader: true,
      includePageNumbers: true,
      selectedChapterIndex: -1,
    };
    setOptions(initialOpts);
    triggerConversion(sample, initialOpts);
  }, [triggerConversion]);

  // Handle options changes with debounce
  const handleOptionsChange = (newOpts: EpubToPdfOptions) => {
    setOptions(newOpts);
    if (!meta) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerConversion(meta, newOpts);
    }, 150);
  };

  // Handle uploaded EPUB file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await parseEpubFile(file);
      setMeta(parsed);
      const updatedOpts: EpubToPdfOptions = {
        ...options,
        selectedChapterIndex: -1,
      };
      setOptions(updatedOpts);
      await triggerConversion(parsed, updatedOpts);
    } catch (err) {
      console.error("Failed to parse EPUB:", err);
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
    const sample = generateSampleEpubBook();
    setMeta(sample);
    const updatedOpts = {
      ...options,
      selectedChapterIndex: -1,
    };
    setOptions(updatedOpts);
    triggerConversion(sample, updatedOpts);
  };

  // Download PDF file
  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = result.pdfUrl;
    const baseName = meta?.title
      ? meta.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "ebook";
    link.download = `${baseName}-typeset.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <EpubToPdfHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        pageCount={result?.pageCount}
      />

      {!meta ? (
        <EpubToPdfDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <EpubToPdfPreviewStage
              meta={meta}
              options={options}
              result={result}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <EpubToPdfControls
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
