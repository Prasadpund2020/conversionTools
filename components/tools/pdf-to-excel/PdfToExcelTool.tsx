"use client";

import React, { useState } from "react";
import {
  StagedPdfToExcelFile,
  ExtractedTableSheet,
  PdfToExcelOptions,
  PdfToExcelResult,
} from "./types";
import {
  parsePdfForExcel,
  extractTablesFromPdf,
  exportPdfTables,
} from "./pdfToExcelEngine";
import { PdfToExcelHeaderBar } from "./PdfToExcelHeaderBar";
import { PdfToExcelDropzone } from "./PdfToExcelDropzone";
import { PdfToExcelStage } from "./PdfToExcelStage";
import { PdfToExcelControls } from "./PdfToExcelControls";

export const PdfToExcelTool: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<StagedPdfToExcelFile | null>(null);
  const [sheets, setSheets] = useState<ExtractedTableSheet[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [result, setResult] = useState<PdfToExcelResult | null>(null);

  const [options, setOptions] = useState<PdfToExcelOptions>({
    detectionMode: "auto",
    exportFormat: "xlsx",
    includeHeaders: true,
    activeSheetPage: 1,
  });

  const handleFileSelected = async (file: File) => {
    try {
      setIsLoadingFile(true);
      const parsed = await parsePdfForExcel(file);
      setStagedFile(parsed);
      const extracted = await extractTablesFromPdf(parsed);
      setSheets(extracted);
      setOptions((prev) => ({ ...prev, activeSheetPage: 1 }));
      setResult(null);
    } catch (err) {
      console.error(err);
      alert("Failed to parse PDF document for tabular extraction.");
    } finally {
      setIsLoadingFile(false);
    }
  };

  const handleReset = () => {
    setStagedFile(null);
    setSheets([]);
    setResult(null);
  };

  const handleExport = async () => {
    if (!stagedFile || sheets.length === 0) return;
    try {
      setIsProcessing(true);
      const res = await exportPdfTables(stagedFile, sheets, options);
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
      alert("Error occurred while generating spreadsheet.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[600px] bg-surface rounded-3xl border border-outline-variant/30 shadow-2xl overflow-hidden">
      {/* Header Bar */}
      <PdfToExcelHeaderBar
        stagedFile={stagedFile}
        onReset={handleReset}
      />

      <div className="w-full p-4 md:p-8 flex-1 flex flex-col">
        {!stagedFile ? (
          <div className="my-auto py-8">
            <PdfToExcelDropzone
              onFileSelected={handleFileSelected}
              isLoading={isLoadingFile}
            />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Center Stage: Spreadsheet Grid */}
            <div className="xl:col-span-8 flex flex-col gap-4">
              <PdfToExcelStage
                stagedFile={stagedFile}
                sheets={sheets}
                options={options}
                isProcessing={isProcessing}
              />

              {/* Success Result Card */}
              {result && (
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-5 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🎉</span>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950 dark:text-emerald-100">
                        Spreadsheet exported successfully ({result.totalRows} rows)!
                      </h4>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        {result.fileName} ready for Microsoft Excel, Google Sheets, or Numbers.
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.downloadUrl}
                    download={result.fileName}
                    className="px-4 py-2 rounded-full bg-[#16a34a] text-white text-xs font-bold hover:bg-[#15803d] transition-all shadow-md cursor-pointer"
                  >
                    Download Again
                  </a>
                </div>
              )}
            </div>

            {/* Right Controls Panel */}
            <div className="xl:col-span-4">
              <PdfToExcelControls
                options={options}
                totalSheets={sheets.length}
                isProcessing={isProcessing}
                onOptionsChange={setOptions}
                onExport={handleExport}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
