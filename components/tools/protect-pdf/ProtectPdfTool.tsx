"use client";

import React, { useState } from "react";
import { StagedProtectFile, ProtectOptions, ProtectResult } from "./types";
import {
  parsePdfForProtect,
  protectPdfDocument,
  createSampleProtectPdf,
} from "./protectPdfEngine";
import { ProtectPdfHeaderBar } from "./ProtectPdfHeaderBar";
import { ProtectPdfDropzone } from "./ProtectPdfDropzone";
import { ProtectPdfStage } from "./ProtectPdfStage";
import { ProtectPdfControls } from "./ProtectPdfControls";

export const ProtectPdfTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedProtectFile | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = useState<boolean>(false);
  const [result, setResult] = useState<ProtectResult | null>(null);

  const [options, setOptions] = useState<ProtectOptions>({
    userPassword: "",
    confirmPassword: "",
    ownerPassword: "",
    allowPrinting: true,
    allowCopying: false,
    allowModifying: false,
    encryptionStrength: "aes-128",
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForProtect(file);
      setStagedFile(parsed);
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to read PDF file. Please ensure it is a valid, uncorrupted PDF.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleLoadSample = async () => {
    try {
      setIsLoadingFile(true);
      const sample = await createSampleProtectPdf();
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
    setOptions((prev) => ({ ...prev, userPassword: "", confirmPassword: "" }));
  };

  const handleProtect = async () => {
    if (!stagedFile || !options.userPassword) return;
    try {
      setIsProcessing(true);
      const res = await protectPdfDocument(stagedFile, options);
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
      alert("Failed to encrypt PDF document.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <ProtectPdfHeaderBar
        stagedFile={stagedFile}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <ProtectPdfDropzone
              onFileSelected={handleFileSelected}
              onLoadSample={handleLoadSample}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <ProtectPdfStage
                stagedFile={stagedFile}
                options={options}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🔐</span>
                    <div>
                      <h4 className="text-sm font-bold text-red-950 dark:text-red-100">
                        PDF successfully encrypted and protected!
                      </h4>
                      <p className="text-xs text-red-800 dark:text-red-300">
                        {result.fileName} is now locked with your password.
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#b91c1c] text-white text-xs font-bold hover:bg-[#991b1b] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <ProtectPdfControls
                options={options}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onProtect={handleProtect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
