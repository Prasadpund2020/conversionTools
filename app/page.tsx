"use client";
// FileLab Home Workspace
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RadialHub from "@/components/RadialHub";
import QuickToolsClipboard from "@/components/QuickToolsClipboard";
import DesktopProps from "@/components/DesktopProps";
import ToolModal from "@/components/ToolModal";
import SearchModal from "@/components/SearchModal";
import AllToolsGrid from "@/components/AllToolsGrid";
import RecentModal from "@/components/RecentModal";
import SettingsModal from "@/components/SettingsModal";
import { ToolCategory, ToolItem } from "@/types/tools";
import { RADIAL_TOOLS } from "@/data/tools";

export default function Home() {
  const [activeView, setActiveView] = useState<"workspace" | "all-tools">("workspace");
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);
  const [initialFile, setInitialFile] = useState<File | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [recentTools, setRecentTools] = useState<ToolItem[]>(() => [
    RADIAL_TOOLS[0], // PDF to Word
    RADIAL_TOOLS[1], // Compress Image
    RADIAL_TOOLS[6], // Video to MP3
  ]);

  // Load recent tools from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("filelab_recent_tools");
      if (saved) {
        setRecentTools(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleRecordRecent = (tool: ToolItem) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((t) => t.id !== tool.id);
      const updated = [tool, ...filtered].slice(0, 8);
      try {
        localStorage.setItem("filelab_recent_tools", JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleClearRecent = () => {
    setRecentTools([]);
    try {
      localStorage.removeItem("filelab_recent_tools");
    } catch {
      // Ignore
    }
  };

  const handleSelectTool = (tool: ToolItem) => {
    setInitialFile(null);
    setSelectedTool(tool);
  };

  const handleFileDrop = (file: File) => {
    setInitialFile(file);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "pdf") {
      setSelectedTool(RADIAL_TOOLS[0]);
    } else if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
      setSelectedTool(RADIAL_TOOLS[1]);
    } else if (["mp4", "mov", "mkv", "avi"].includes(ext || "")) {
      setSelectedTool(RADIAL_TOOLS[6]);
    } else {
      setSelectedTool(RADIAL_TOOLS[0]);
    }
  };

  const handleCategorySelect = (cat: ToolCategory) => {
    setActiveCategory(cat);
    if (activeView === "workspace" && cat !== "all") {
      setActiveView("all-tools");
    }
  };

  return (
    <>
      {/* Main Viewport Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 py-6 select-none">
        {/* TopBar Component */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRecent={() => setIsRecentOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onToggleAllTools={() =>
            setActiveView((prev) => (prev === "workspace" ? "all-tools" : "workspace"))
          }
          activeView={activeView}
        />

        {/* Workspace Center Stage or All Tools Grid */}
        {activeView === "workspace" ? (
          <main className="relative w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 my-2">
            {/* Left Glass Sidebar */}
            <Sidebar
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
            />

            {/* Center Radial Stage */}
            <RadialHub
              onSelectTool={handleSelectTool}
              onFileDrop={handleFileDrop}
            />

            {/* Right Skeuomorphic Clipboard */}
            <QuickToolsClipboard onSelectTool={handleSelectTool} />
          </main>
        ) : (
          <AllToolsGrid
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onSelectTool={handleSelectTool}
            onBackToDesk={() => setActiveView("workspace")}
          />
        )}

        {/* Desktop Props & Foliage Accessories */}
        <DesktopProps />
      </div>

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
