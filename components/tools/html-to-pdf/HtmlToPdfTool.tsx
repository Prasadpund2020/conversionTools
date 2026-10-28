"use client";

import React, { useState } from "react";
import { StagedHtmlInput, HtmlToPdfOptions, HtmlToPdfResult } from "./types";
import { convertHtmlToPdf, formatBytes } from "./htmlToPdfEngine";
import { HtmlToPdfHeaderBar } from "./HtmlToPdfHeaderBar";
import { HtmlToPdfDropzone } from "./HtmlToPdfDropzone";
import { HtmlToPdfStage } from "./HtmlToPdfStage";
import { HtmlToPdfControls } from "./HtmlToPdfControls";

export const HtmlToPdfTool: React.FC = () => {
  const [stagedInput, setStagedInput] = useState<StagedHtmlInput | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HtmlToPdfResult | null>(null);

  const [options, setOptions] = useState<HtmlToPdfOptions>({
    paperSize: "a4",
    orientation: "portrait",
    margins: "normal",
    includeBackground: true,
    scale: 100,
  });

  const handleInputReady = (input: StagedHtmlInput) => {
    setStagedInput(input);
    setResult(null);
  };

  const handleReset = () => {
    setStagedInput(null);
    setResult(null);
  };

  const handleConvert = async () => {
    if (!stagedInput) return;
    try {
      setIsProcessing(true);
      const res = await convertHtmlToPdf(stagedInput, options);
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
      alert("Error generating PDF from HTML.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <HtmlToPdfHeaderBar
        stagedInput={stagedInput}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedInput ? (
          <div className="my-auto py-8">
            <HtmlToPdfDropzone
              onInputReady={handleInputReady}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Live sandboxed preview */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <HtmlToPdfStage
                stagedInput={stagedInput}
                options={options}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-orange-500/10 border border-orange-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="text-sm font-bold text-orange-950 dark:text-orange-100">
                        HTML converted to PDF successfully!
                      </h4>
                      <p className="text-xs text-orange-800 dark:text-orange-300">
                        {result.fileName} ({formatBytes(result.sizeBytes)})
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#ea580c] text-white text-xs font-bold hover:bg-[#c2410c] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <HtmlToPdfControls
                options={options}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onConvert={handleConvert}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
