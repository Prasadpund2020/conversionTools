"use client";

import React, { useRef, useState } from "react";

interface PdfMergeDropzoneProps {
  onFilesSelect: (files: FileList) => void;
}

export default function PdfMergeDropzone({ onFilesSelect }: PdfMergeDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelect(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelect(e.target.files);
      e.target.value = "";
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto py-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all duration-200 bg-white/90 shadow-sm ${
          isDragOver
            ? "border-blue-500 bg-blue-50/60 scale-[1.01]"
            : "border-stone-300 hover:border-blue-500 hover:bg-stone-50/80"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-100 shadow-md flex items-center justify-center text-blue-600 mb-5">
          <svg
            className="w-10 h-10 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
            />
          </svg>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 tracking-tight">
          Drop multiple PDF files here
        </h3>
        <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-6">
          Combine reports, invoices, contracts, and scans in any order. 100% private
          in-browser merging with zero server uploads.
        </p>

        <button
          type="button"
          onClick={openFilePicker}
          className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span>Upload PDF Files</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-center mt-6">
          <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold font-mono tracking-wide border border-blue-100">
            .PDF
          </span>
          <span className="text-xs text-stone-400">Select multiple files at once</span>
        </div>
      </div>
    </div>
  );
}
