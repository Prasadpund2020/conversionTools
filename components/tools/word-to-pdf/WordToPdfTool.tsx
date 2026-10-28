"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  WordDocMeta,
  WordToPdfOptions,
  WordToPdfResult,
} from "./types";
import {
  parseDocxFile,
  generateSampleWordDoc,
  convertWordToPdf,
} from "./wordToPdfEngine";
import WordToPdfHeaderBar from "./WordToPdfHeaderBar";
import WordToPdfDropzone from "./WordToPdfDropzone";
import WordToPdfPreviewStage from "./WordToPdfPreviewStage";
import WordToPdfControls from "./WordToPdfControls";

export default function WordToPdfTool() {
  const [meta, setMeta] = useState<WordDocMeta | null>(null);
  const [options, setOptions] = useState<WordToPdfOptions>({
    pageSize: "A4",
    orientation: "portrait",
    fontFamily: "sans",
    margins: "normal",
    includePageNumbers: true,
    includeHeader: true,
    documentTitle: "",
    lineSpacing: 1.5,
  });

  const [result, setResult] = useState<WordToPdfResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger conversion
  const triggerConversion = useCallback(
    async (sourceDoc: WordDocMeta, currentOpts: WordToPdfOptions) => {
      setIsProcessing(true);
      try {
        const res = await convertWordToPdf(sourceDoc, currentOpts);
        setResult(res);
      } catch (err) {
        console.error("Word to PDF conversion failed:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  // Load sample on initial mount
  useEffect(() => {
    const sample = generateSampleWordDoc();
    setMeta(sample);
    const initialOpts: WordToPdfOptions = {
      pageSize: "A4",
      orientation: "portrait",
      fontFamily: "sans",
      margins: "normal",
      includePageNumbers: true,
      includeHeader: true,
      documentTitle: sample.title,
      lineSpacing: 1.5,
    };
    setOptions(initialOpts);
    triggerConversion(sample, initialOpts);
  }, [triggerConversion]);

  // Handle options changes with debounce
  const handleOptionsChange = (newOpts: WordToPdfOptions) => {
    setOptions(newOpts);
    if (!meta) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      triggerConversion(meta, newOpts);
    }, 150);
  };

  // Handle uploaded file
  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await parseDocxFile(file);
      setMeta(parsed);
      const updatedOpts: WordToPdfOptions = {
        ...options,
        documentTitle: parsed.title,
      };
      setOptions(updatedOpts);
      await triggerConversion(parsed, updatedOpts);
    } catch (err) {
      console.error("Failed to parse file:", err);
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
    const sample = generateSampleWordDoc();
    setMeta(sample);
    const updatedOpts = {
      ...options,
      documentTitle: sample.title,
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
      : "document";
    link.download = `${baseName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Bar */}
      <WordToPdfHeaderBar
        onReset={handleReset}
        onLoadSample={handleLoadSample}
        isProcessing={isProcessing}
        pageCount={result?.pageCount}
      />

      {!meta ? (
        <WordToPdfDropzone
          onFileSelect={handleFileSelect}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Stage (Center) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <WordToPdfPreviewStage
              meta={meta}
              options={options}
              result={result}
              isProcessing={isProcessing}
            />
          </div>

          {/* Controls Sidebar (Right) */}
          <div className="lg:col-span-4 sticky top-24">
            <WordToPdfControls
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
