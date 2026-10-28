"use client";

import React, { useState, useRef } from "react";

interface ConvertAudioDropzoneProps {
  onFileSelect: (file: File) => void;
  onLoadSample: () => void;
  isProcessing: boolean;
}

export default function ConvertAudioDropzone({
  onFileSelect,
  onLoadSample,
  isProcessing,
}: ConvertAudioDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full rounded-3xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer ${
        isDragging
          ? "border-sky-500 bg-sky-50/60 shadow-lg scale-[1.01]"
          : "border-stone-300/80 bg-white/60 hover:bg-white/90 hover:border-sky-400 shadow-sm"
      }`}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.wav,.mp3,.aac,.flac,.ogg,.m4a"
        onChange={handleInputChange}
        className="hidden"
        disabled={isProcessing}
      />

      {/* Decorative Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 mb-4 transition-transform hover:scale-105">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>

      <h3 className="text-lg font-bold text-stone-900 mb-1">
        Drop your audio file (.wav, .flac, .aac, .ogg, .mp3) here
      </h3>
      <p className="text-sm text-stone-500 max-w-md mb-5">
        Transcode high-resolution studio tracks and audio recordings with custom bitrates in pure client memory.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={isProcessing}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Choose Audio File
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onLoadSample();
          }}
          disabled={isProcessing}
          className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Try Acoustic Sample
        </button>
      </div>

      {/* Security note badge */}
      <div className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-sky-900 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
        <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>100% Client-Side Transcoder: Zero telemetry, zero external cloud conversions</span>
      </div>
    </div>
  );
}
