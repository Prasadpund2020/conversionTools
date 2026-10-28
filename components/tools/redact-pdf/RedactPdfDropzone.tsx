"use client";

import React, { useRef, useState } from "react";

interface Props {
  onFileSelected: (file: File) => void;
  onLoadSample: () => void;
  isLoading: boolean;
}

export const RedactPdfDropzone: React.FC<Props> = ({
  onFileSelected,
  onLoadSample,
  isLoading,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith(".pdf")) {
        onFileSelected(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative w-full max-w-3xl mx-auto rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all border-2 border-dashed ${
        isDragOver
          ? "border-slate-800 bg-slate-800/10 scale-[1.01]"
          : "border-outline-variant/60 bg-surface-container-low hover:border-slate-600 hover:bg-surface-container-high/40"
      } shadow-xl flex flex-col items-center justify-center gap-4`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Decorative Clay Stamp Badge */}
      <div className="w-20 h-20 rounded-3xl bg-[#1f2937] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(31,41,55,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]">
        <span className="text-3xl">⬛</span>
      </div>

      <div className="flex flex-col gap-1 max-w-md">
        <h3 className="text-xl md:text-2xl font-bold text-on-surface">
          {isLoading ? "Reading PDF Document..." : "Choose or drop a PDF to redact"}
        </h3>
        <p className="text-sm text-on-surface-variant">
          Permanently blackout sensitive personal identifiers, bank figures, and confidential lines directly in your browser.
        </p>
      </div>

      {/* Privacy guarantee badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-on-surface-variant">
        <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
          🔒 100% Client-Side
        </span>
        <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
          ⬛ Irreversible Burn-In
        </span>
        <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
          🛡️ No Server Exposure
        </span>
      </div>

      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLoadSample();
          }}
          className="text-xs font-bold text-[#1f2937] dark:text-slate-300 hover:underline cursor-pointer"
        >
          Or click to try with a Patient Medical Record Sample →
        </button>
      </div>
    </div>
  );
};
