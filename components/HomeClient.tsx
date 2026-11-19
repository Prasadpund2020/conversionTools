"use client";

import React, { useState, useMemo, useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RadialHub from "@/components/RadialHub";
import QuickToolsClipboard from "@/components/QuickToolsClipboard";
import DesktopProps from "@/components/DesktopProps";
import ToolModal from "@/components/ToolModal";
import SearchModal from "@/components/SearchModal";
import RecentModal from "@/components/RecentModal";
import SettingsModal from "@/components/SettingsModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolItem } from "@/types/tools";
import { RADIAL_TOOLS, ALL_TOOLS } from "@/data/tools";
import { getToolUrl } from "@/lib/tools";
import Footer from "@/components/Footer";

const subscribeNever = () => () => {};

const getDefaultRecentTools = (): ToolItem[] => [
  RADIAL_TOOLS[0], // PDF to Word
  RADIAL_TOOLS[1], // Compress Image
  RADIAL_TOOLS[6], // Video to MP3
];

function getSavedRecentSnapshot(): string | null {
  try {
    return localStorage.getItem("fct_recent_tools");
  } catch {
    return null;
  }
}

const getSavedRecentServerSnapshot = (): string | null => null;

export default function HomeClient() {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [initialFile] = useState<File | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persisted recent tools are read from localStorage once on the client
  // (server/hydration snapshot is null). Local edits are kept in recentOverride.
  const savedRecentRaw = useSyncExternalStore(
    subscribeNever,
    getSavedRecentSnapshot,
    getSavedRecentServerSnapshot
  );
  const [recentOverride, setRecentOverride] = useState<ToolItem[] | null>(null);
  const savedRecentTools = useMemo<ToolItem[]>(() => {
    try {
      if (savedRecentRaw) {
        return JSON.parse(savedRecentRaw);
      }
    } catch {
      // Ignore localStorage errors
    }
    return getDefaultRecentTools();
  }, [savedRecentRaw]);
  const recentTools = recentOverride ?? savedRecentTools;

  const handleRecordRecent = (tool: ToolItem) => {
    setRecentOverride((prev) => {
      const filtered = (prev ?? savedRecentTools).filter((t) => t.id !== tool.id);
      const updated = [tool, ...filtered].slice(0, 8);
      try {
        localStorage.setItem("fct_recent_tools", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleClearRecent = () => {
    setRecentOverride([]);
    try {
      localStorage.removeItem("fct_recent_tools");
    } catch {
      // Ignore
    }
  };

  const [selectedRadialTool, setSelectedRadialTool] = useState<ToolItem | null>(null);

  const router = useRouter();

  const handleSelectTool = (tool: ToolItem) => {
    handleRecordRecent(tool);
    const isRadial = RADIAL_TOOLS.some((t) => t.id === tool.id);
    if (isRadial) {
      setSelectedRadialTool(tool);
    } else {
      router.push(getToolUrl(tool));
    }
  };

  const handleFileDrop = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    let targetTool = RADIAL_TOOLS[0];
    if (ext === "pdf") {
      targetTool = RADIAL_TOOLS[0];
    } else if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
      targetTool = RADIAL_TOOLS[1];
    } else if (["mp4", "mov", "mkv", "avi"].includes(ext || "")) {
      targetTool = RADIAL_TOOLS[6];
    } else if (["html", "htm"].includes(ext || "")) {
      targetTool = ALL_TOOLS.find((t) => t.id === "html-to-pdf") || RADIAL_TOOLS[0];
    }
    handleRecordRecent(targetTool);
    setSelectedRadialTool(targetTool);
  };

  return (
    <>
      {/* Main Viewport Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-3 sm:px-6 lg:px-8 py-3 sm:py-6 pb-24 md:pb-6 select-none overflow-x-hidden">
        {/* TopBar Component */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRecent={() => setIsRecentOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Semantic SEO & Accessibility Shell */}
        <section className="sr-only" aria-label="Free Online Conversion Tools Overview">
          <h1>Free Online File Conversion, Compression &amp; Download Tools</h1>
          <p>
            Free tools for PDF comparison, image conversion, resizing, barcode
            scanning, and Base64 encoding. Open a tool page for its formats and
            limits. Media link pages do not download platform videos.
          </p>
          <nav aria-label="Popular Free File Tools">
            <h2>Popular Free File Tools</h2>
            <ul>
              <li><Link href="/all-tools/pdf/pdf-to-word">PDF to Word Converter</Link></li>
              <li><Link href="/all-tools/image/compress-image">Compress Image Online</Link></li>
              <li><Link href="/all-tools/pdf/pdf-merge">Merge PDF Files</Link></li>
              <li><Link href="/all-tools/pdf/pdf-to-jpg">PDF to JPG Converter</Link></li>
              <li><Link href="/all-tools/image/remove-bg">Remove Image Background</Link></li>
              <li><Link href="/all-tools/video-audio/video-to-mp3">Video to MP3 Audio Converter</Link></li>
              <li><Link href="/all-tools/pdf/image-to-pdf">Image to PDF Generator</Link></li>
              <li><Link href="/all-tools/pdf/compare-pdf">Compare PDF files online</Link></li>
              <li><Link href="/all-tools/image/convert-webp">Convert images to WebP</Link></li>
              <li><Link href="/all-tools/more/barcode-scanner">Online barcode scanner</Link></li>
              <li><Link href="/all-tools">Browse all free tools</Link></li>
            </ul>
          </nav>
        </section>

        {/* Workspace Center Stage: Always Desk on Home Page */}
        <main className="relative w-full flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 lg:gap-6 my-1 sm:my-2">
          {/* Left Glass Sidebar (Desktop) / Category Pills Strip (Mobile/Tablet) */}
          <Sidebar activeCategory="all" />

          {/* Center Stage: Touch Hub on Mobile / Radial Hub on Desktop */}
          <RadialHub
            activeTool={selectedRadialTool}
            onSelectTool={handleSelectTool}
            onResetActiveTool={() => setSelectedRadialTool(null)}
            onFileDrop={handleFileDrop}
          />

          {/* Right Skeuomorphic Clipboard (Desktop) / Mobile Quick Tools Card */}
          <QuickToolsClipboard onSelectTool={handleSelectTool} />
        </main>

        {/* Desktop Props & Foliage Accessories (Desktop only) */}
        <DesktopProps />

        <section className="w-full max-w-5xl mx-auto mt-4 mb-2 px-1 select-text" aria-label="What you can do">
          <h2 className="text-sm font-bold text-stone-800 mb-2">Start with the job, not a generic converter</h2>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <li>
              <Link href="/all-tools/pdf" className="font-semibold text-stone-800 hover:underline">PDF tools</Link>
              {" "}for comparing files, visual redaction, stamps, and page order.
            </li>
            <li>
              <Link href="/all-tools/image" className="font-semibold text-stone-800 hover:underline">Image tools</Link>
              {" "}for WebP, JPG to PNG, resizing, watermarks, and solid-background cutouts.
            </li>
            <li>
              <Link href="/all-tools/edit-convert" className="font-semibold text-stone-800 hover:underline">Edit and convert</Link>
              {" "}for Markdown to PDF and text reading from a photo.
            </li>
            <li>
              <Link href="/all-tools/more/barcode-scanner" className="font-semibold text-stone-800 hover:underline">Barcode scanner</Link>
              {" "}uses your camera in Chrome or Edge, with no separate app.
            </li>
          </ul>
        </section>

        {/* Global Studio Footer */}
        <Footer />
      </div>

      {/* ================================================================ */}
      {/* MOBILE FLOATING BOTTOM NAVIGATION DOCK (Thumb-Friendly on mobile) */}
      {/* ================================================================ */}
      <nav 
        className="fixed bottom-3 left-4 right-4 z-40 md:hidden bg-white/95 backdrop-blur-xl border border-white/80 shadow-xl rounded-2xl p-1.5 flex items-center justify-around select-none"
        aria-label="Mobile Navigation"
      >
        {/* Desk View Tab */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all bg-slate-800 text-white shadow-xs no-underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold mt-0.5">Desk</span>
        </Link>

        {/* All Tools View Tab */}
        <Link
          href="/all-tools"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all no-underline text-slate-500 hover:text-slate-800"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[10px] font-bold mt-0.5">All Tools</span>
        </Link>

        {/* Search Trigger */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] font-bold mt-0.5">Search</span>
        </button>

        {/* Recent Trigger */}
        <button
          type="button"
          onClick={() => setIsRecentOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-bold mt-0.5">Recent</span>
          {recentTools.length > 0 && (
            <span className="absolute top-1 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
          )}
        </button>
      </nav>

      {/* Interactive Tool Modal */}
      <ToolModal
        tool={selectedTool}
        initialFile={initialFile}
        onClose={() => setSelectedTool(null)}
        onRecordRecent={handleRecordRecent}
      />

      {/* Command Palette / Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTool={handleSelectTool}
      />

      {/* Recent Tools Modal */}
      <RecentModal
        isOpen={isRecentOpen}
        recentTools={recentTools}
        onClose={() => setIsRecentOpen(false)}
        onSelectTool={handleSelectTool}
        onClearRecent={handleClearRecent}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
