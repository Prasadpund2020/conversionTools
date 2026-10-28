'use client';

import React, { useRef, useState } from 'react';

interface JsonCsvDropzoneProps {
  onFileLoaded: (content: string, name: string, isJson: boolean) => void;
  error?: string | null;
}

export const JsonCsvDropzone: React.FC<JsonCsvDropzoneProps> = ({
  onFileLoaded,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      readFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      readFile(e.target.files[0]);
    }
  };

  const readFile = (file: File) => {
    const isJson = file.name.toLowerCase().endsWith('.json');
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      onFileLoaded(text || '', file.name, isJson);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 scale-[0.99]'
            : 'border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 hover:border-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
        } backdrop-blur-sm shadow-sm`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.csv,.tsv,.txt"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Drop JSON or CSV file here
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Supports .json, .csv, and .tsv formats. Auto-detects format and opens the live data workspace.
            </p>
          </div>

          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs tracking-wide shadow-sm hover:opacity-90 transition-opacity"
          >
            Browse File
          </button>
        </div>
      </div>
    </div>
  );
};
