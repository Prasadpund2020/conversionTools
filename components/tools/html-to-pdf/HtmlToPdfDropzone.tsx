"use client";

import React, { useRef, useState } from "react";
import { StagedHtmlInput } from "./types";

interface Props {
  onInputReady: (input: StagedHtmlInput) => void;
  isLoading: boolean;
}

export const HtmlToPdfDropzone: React.FC<Props> = ({
  onInputReady,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<"file" | "paste">("file");
  const [isDragOver, setIsDragOver] = useState(false);
  const [pastedHtml, setPastedHtml] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawHtml = (event.target?.result as string) || "";
      onInputReady({
        name: file.name,
        sourceType: "file",
        rawHtml,
        sizeBytes: file.size,
      });
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedHtml.trim()) return;
    onInputReady({
      name: "Pasted_Code.html",
      sourceType: "raw-html",
      rawHtml: pastedHtml.trim(),
      sizeBytes: new Blob([pastedHtml]).size,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
      {/* Switcher Tab */}
      <div className="w-full grid grid-cols-2 p-1 bg-surface-container rounded-2xl shadow-inner max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab("file")}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "file"
              ? "bg-[#ea580c] text-white shadow-md"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span>📁</span>
          <span>Upload HTML File</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("paste")}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "paste"
              ? "bg-[#ea580c] text-white shadow-md"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span>📝</span>
          <span>Paste HTML Code</span>
        </button>
      </div>

      {activeTab === "file" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all border-2 border-dashed ${
            isDragOver
              ? "border-orange-500 bg-orange-500/10 scale-[1.01]"
              : "border-outline-variant/60 bg-surface-container-low hover:border-orange-500 hover:bg-surface-container-high/40"
          } shadow-xl flex flex-col items-center justify-center gap-4`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.htm,text/html"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <div className="w-20 h-20 rounded-3xl bg-[#ea580c] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(234,88,12,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]">
            <span className="text-3xl">🌐</span>
          </div>

          <div className="flex flex-col gap-1 max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-on-surface">
              {isLoading ? "Reading HTML Document..." : "Choose or drop an HTML file"}
            </h3>
            <p className="text-sm text-on-surface-variant">
              Convert web pages, receipts, invoices, and HTML exports into clean vector PDF documents.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-on-surface-variant">
            <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
              🔒 100% In-Browser Rendering
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container shadow-inner">
              ⚡ Preserves CSS & Typography
            </span>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handlePasteSubmit}
          className="rounded-3xl p-6 bg-surface-container-low border border-outline-variant/40 shadow-xl flex flex-col gap-3"
        >
          <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            Paste HTML Code / Web Markup
          </label>
          <textarea
            rows={8}
            value={pastedHtml}
            onChange={(e) => setPastedHtml(e.target.value)}
            placeholder="<html><body><h1>Invoice #1042</h1><p>Services rendered...</p></body></html>"
            className="w-full p-4 rounded-2xl bg-surface font-mono text-xs border border-outline-variant/40 text-on-surface shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          <button
            type="submit"
            disabled={!pastedHtml.trim()}
            className="w-full py-3 rounded-full bg-[#ea580c] text-white font-bold text-xs hover:bg-[#c2410c] transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            Load & Preview HTML →
          </button>
        </form>
      )}
    </div>
  );
};
