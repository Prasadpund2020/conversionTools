"use client";

import React, { useState, useEffect, useRef } from "react";
import { ToolItem } from "@/types/tools";
import ToolIcon from "@/components/ToolIcon";

interface ToolModalProps {
  tool: ToolItem | null;
  initialFile?: File | null;
  onClose: () => void;
  onRecordRecent: (tool: ToolItem) => void;
}

export default function ToolModal({
  tool,
  initialFile,
  onClose,
  onRecordRecent,
}: ToolModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [compressionQuality, setCompressionQuality] = useState(75);
  const [videoFormat, setVideoFormat] = useState("1080p");
  const [isDragOver, setIsDragOver] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tool) {
      onRecordRecent(tool);
      setIsCompleted(false);
      setProgress(0);
      setIsProcessing(false);
      if (initialFile) {
        setSelectedFiles([initialFile]);
      } else {
        setSelectedFiles([]);
      }
    }
  }, [tool, initialFile]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!tool) return null;

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);
    setSelectedFiles((prev) => (tool.id === "pdf-merge" ? [...prev, ...fileList] : fileList));
    setIsCompleted(false);
  };

  const handleStartProcess = () => {
    if (selectedFiles.length === 0 && !videoUrl && tool.category !== "downloaders") {
      fileInputRef.current?.click();
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setIsCompleted(false);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsCompleted(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 180);
  };

  const handleDownload = () => {
    const filename = selectedFiles[0]?.name 
      ? `processed_${selectedFiles[0].name.replace(/\.[^/.]+$/, "")}.${
          tool.id.includes("word") ? "docx" : tool.id.includes("jpg") ? "zip" : tool.id.includes("mp3") ? "mp3" : "pdf"
        }`
      : `filelab_${tool.id}_output.zip`;

    const blob = new Blob(["FileLab processed output sample"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tool-modal-title"
        className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/80 p-6 sm:p-8 overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className={`clay-btn ${tool.clayColor} w-13 h-13 rounded-2xl flex items-center justify-center text-white flex-shrink-0 shadow-md`}>
              <ToolIcon iconType={tool.iconType} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="tool-modal-title" className="text-xl font-bold text-slate-800 tracking-tight">
                  {tool.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {tool.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{tool.description}</p>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors"
            title="Close (Esc)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-4">
          {/* If Tool is a Video / Social Downloader */}
          {tool.category === "downloaders" ? (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Paste Video URL (YouTube, Reels, TikTok)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                  className="px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  Paste Demo
                </button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-600">Quality:</span>
                {["1080p HD", "720p HD", "MP3 Audio (320kbps)"].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setVideoFormat(q)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      videoFormat === q
                        ? "bg-slate-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* File Upload / Drag Zone */
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFileSelect(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragOver
                  ? "border-blue-500 bg-blue-50/60 scale-[1.01]"
                  : selectedFiles.length > 0
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple={tool.id === "pdf-merge"}
                accept={tool.acceptedFormats || "*"}
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />

              {selectedFiles.length > 0 ? (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate max-w-sm mx-auto">
                    {selectedFiles.length === 1
                      ? selectedFiles[0].name
                      : `${selectedFiles.length} files selected for merging`}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {(selectedFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2)} MB total • Click to change file
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    Click to browse or drop your {tool.acceptedFormats ? tool.acceptedFormats.replace(/,/g, ", ") : "file"} here
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Encrypted and processed locally on your device
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tool specific custom settings */}
          {tool.id.includes("compress") && (
            <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Compression Level:</span>
                <span className="font-bold text-blue-600">{compressionQuality}% (Estimated -{100 - compressionQuality}%)</span>
              </div>
              <input
                type="range"
                min="30"
                max="90"
                value={compressionQuality}
                onChange={(e) => setCompressionQuality(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Maximum Compression</span>
                <span>Balanced Quality</span>
                <span>Highest Fidelity</span>
              </div>
            </div>
          )}

          {/* Progress Bar Animation */}
          {isProcessing && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Processing in browser memory...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Completed Message */}
          {isCompleted && (
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Conversion Complete!</h4>
                  <p className="text-[11px] text-emerald-700">Ready for instant local download.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>

          {!isCompleted ? (
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleStartProcess}
              className={`clay-btn ${tool.clayColor} px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md disabled:opacity-50`}
            >
              {isProcessing
                ? "Processing..."
                : selectedFiles.length > 0 || videoUrl
                ? tool.actionText || `Process ${tool.title}`
                : "Select File"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDownload}
              className="clay-btn clay-green px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md"
            >
              Download Output
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
