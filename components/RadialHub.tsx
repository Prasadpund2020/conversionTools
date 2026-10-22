"use client";

import React, { useState, useRef } from "react";
import { ToolItem } from "@/types/tools";
import { RADIAL_TOOLS, ALL_TOOLS } from "@/data/tools";
import ToolIcon from "@/components/ToolIcon";

interface RadialHubProps {
  onSelectTool: (tool: ToolItem) => void;
  onFileDrop?: (file: File) => void;
}

export default function RadialHub({ onSelectTool, onFileDrop }: RadialHubProps) {
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
      const file = e.dataTransfer.files[0];
      if (onFileDrop) {
        onFileDrop(file);
      } else {
        // Auto-select smart tool by file type
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext === "pdf") {
          onSelectTool(RADIAL_TOOLS[0]); // PDF to Word
        } else if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
          onSelectTool(RADIAL_TOOLS[1]); // Compress Image
        } else if (["mp4", "mov", "mkv", "avi"].includes(ext || "")) {
          onSelectTool(RADIAL_TOOLS[6]); // Video to MP3
        } else if (["html", "htm"].includes(ext || "")) {
          const htmlTool = ALL_TOOLS.find((t) => t.id === "html-to-pdf");
          onSelectTool(htmlTool || RADIAL_TOOLS[0]);
        } else {
          onSelectTool(RADIAL_TOOLS[0]);
        }
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (onFileDrop) {
        onFileDrop(file);
      } else {
        onSelectTool(RADIAL_TOOLS[0]);
      }
    }
  };

  return (
    <section 
      className="relative flex-1 w-full my-2" 
      data-purpose="radial-hub"
    >
      {/* Hidden file input for central hub click */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* ================================================================ */}
      {/* MOBILE & COMPACT VIEW (block md:hidden): TOUCH CARD & CLAY GRID */}
      {/* ================================================================ */}
      <div className="block md:hidden w-full max-w-lg mx-auto space-y-4">
        {/* Mobile Central Upload Hub */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative central-hub w-full max-w-[280px] sm:max-w-xs h-48 sm:h-52 mx-auto rounded-3xl border border-slate-200/90 flex flex-col items-center justify-center text-center p-5 cursor-pointer shadow-lg transition-all duration-200 ${
            isDragOver 
              ? "scale-102 ring-4 ring-blue-400 ring-offset-2 bg-blue-50/70" 
              : "active:scale-98 hover:shadow-xl"
          }`}
          title="Tap to browse or drop file"
        >
          {/* Dashed inner border ring */}
          <div className={`absolute inset-2.5 rounded-2xl border-2 border-dashed pointer-events-none transition-colors ${
            isDragOver ? "border-blue-500" : "border-slate-300"
          }`} />

          {/* Upload badge */}
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100/80 flex items-center justify-center text-blue-600 mb-2 shadow-xs">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
            </svg>
          </div>

          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            {isDragOver ? "Drop file right here" : "Choose File or Drop Here"}
          </h2>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] leading-tight">
            Tap to browse local documents • 100% private
          </p>

          <span className="absolute -top-3 right-3 font-handwriting text-xs font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200/80 shadow-xs rotate-2">
            Local & Fast ✨
          </span>
        </div>

        {/* Mobile Tools Section Header */}
        <div className="flex items-center justify-between px-1 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Popular Tools
            </span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Instant Access
            </span>
          </div>
          <span className="font-handwriting text-sm font-semibold text-slate-500 rotate-[-2deg]">
            One tap launch ⚡
          </span>
        </div>

        {/* Mobile 8 Clay Tools Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* 1. PDF to Word */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[0])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-red w-11 h-11 rounded-xl flex flex-col items-center justify-center text-white p-1">
                <ToolIcon iconType="pdf-word" className="w-5 h-5" />
                <span className="text-[7px] font-black uppercase tracking-tight">PDF</span>
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                to Word
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                PDF to Word
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Convert docs</span>
            </div>
          </button>

          {/* 2. Compress Image */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[1])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-green w-11 h-11 rounded-xl flex items-center justify-center text-white">
                <ToolIcon iconType="image" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                Smaller size
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                Compress Image
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Keep quality</span>
            </div>
          </button>

          {/* 3. PDF Merge */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[2])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-blue w-11 h-11 rounded-xl flex items-center justify-center text-white">
                <ToolIcon iconType="merge" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded-md">
                Combine
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                PDF Merge
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Join files</span>
            </div>
          </button>

          {/* 4. PDF to JPG */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[3])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-pink w-11 h-11 rounded-xl flex items-center justify-center text-white">
                <ToolIcon iconType="zoom-in" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-pink-700 bg-pink-50 px-1.5 py-0.5 rounded-md">
                Pages to JPG
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                PDF to JPG
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Save images</span>
            </div>
          </button>

          {/* 5. Remove Background */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[4])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-cyan w-11 h-11 rounded-xl flex items-center justify-center text-slate-800">
                <ToolIcon iconType="cutout" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded-md">
                AI Cutout
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                Remove BG
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Auto cutout</span>
            </div>
          </button>

          {/* 6. YouTube Downloader */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[5])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-yellow w-11 h-11 rounded-xl flex items-center justify-center text-slate-800">
                <ToolIcon iconType="play-down" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md">
                Video DL
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                YouTube DL
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Save videos</span>
            </div>
          </button>

          {/* 7. Video to MP3 */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[6])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-purple w-11 h-11 rounded-xl flex items-center justify-center text-white">
                <ToolIcon iconType="play" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded-md">
                Extract audio
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                Video to MP3
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Save as audio</span>
            </div>
          </button>

          {/* 8. Image to PDF */}
          <button
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[7])}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm hover:shadow-md active:scale-95 transition-all text-left flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="clay-btn clay-orange w-11 h-11 rounded-xl flex items-center justify-center text-orange-500">
                <ToolIcon iconType="photo" className="w-5 h-5" />
              </div>
              <span className="font-handwriting text-[11px] font-semibold text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-md">
                Images to PDF
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                Image to PDF
              </span>
              <span className="text-[10px] text-slate-400 block truncate">Make document</span>
            </div>
          </button>
        </div>
      </div>

      {/* ================================================================ */}
      {/* DESKTOP VIEW (hidden md:flex): SKEUOMORPHIC RADIAL ORBIT STAGE   */}
      {/* ================================================================ */}
      <div className="hidden md:flex relative flex-1 items-center justify-center min-h-[580px] w-full max-w-4xl mx-auto">
        {/* Central Circular Hub Drop Zone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`central-hub w-72 h-72 rounded-full border border-slate-200/80 flex flex-col items-center justify-center text-center p-6 z-10 cursor-pointer transition-all duration-300 ${
            isDragOver 
              ? "scale-108 ring-4 ring-blue-400 ring-offset-4 shadow-2xl bg-blue-50/50" 
              : "hover:scale-105"
          }`}
          title="Drop file here or choose a tool"
        >
          {/* Dashed inner border ring */}
          <div className={`absolute inset-3 rounded-full border border-dashed pointer-events-none transition-colors ${
            isDragOver ? "border-blue-500 scale-98" : "border-slate-300"
          }`}></div>

          {/* Upload Tray Icon */}
          <div className="mb-2 text-slate-700 transition-transform group-hover:-translate-y-1">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
            </svg>
          </div>

          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            {isDragOver ? "Drop file right here" : "Choose a tool"}
          </h2>
          <p className="text-[11px] leading-tight text-slate-400 mt-1 max-w-[150px]">
            {isDragOver ? "Release to start conversion" : "Select a tool from the options around or drop a file"}
          </p>
        </div>

        {/* RADIAL 3D BUTTONS & HANDWRITTEN ANNOTATIONS */}

        {/* 1. Top (12 o'clock): PDF to Word */}
        <div className="absolute -top-1 flex flex-col items-center z-20">
          <div className="absolute -top-7 font-handwriting text-base font-semibold text-slate-600 rotate-[-4deg] whitespace-nowrap pointer-events-none">
            PDF to Word
            <svg className="w-5 h-4 text-slate-500 inline-block -rotate-12 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[0])}
            className="clay-btn clay-red w-16 h-16 rounded-[22px] flex flex-col items-center justify-center text-white p-2 border-none outline-none"
            title="PDF to Word"
          >
            <ToolIcon iconType="pdf-word" className="w-7 h-7" />
            <span className="text-[9px] font-black tracking-tighter mt-0.5 uppercase">PDF</span>
          </button>
        </div>

        {/* 2. Top-Right (1:30): Compress Image */}
        <div className="absolute top-12 right-24 lg:right-28 flex flex-col items-center z-20">
          <div className="absolute -top-8 -right-8 font-handwriting text-sm leading-tight font-semibold text-slate-600 rotate-6 whitespace-nowrap text-left pointer-events-none">
            Smaller size<br /><span className="ml-1">Same quality</span>
            <svg className="w-6 h-4 text-slate-500 inline-block rotate-[80deg] -ml-1 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[1])}
            className="clay-btn clay-green w-16 h-16 rounded-[22px] flex items-center justify-center text-white border-none outline-none"
            title="Compress Image"
          >
            <ToolIcon iconType="image" className="w-8 h-8" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">Compress Image</span>
        </div>

        {/* 3. Right (3 o'clock): PDF Merge */}
        <div className="absolute right-10 lg:right-14 flex flex-col items-center z-20">
          <div className="absolute -top-7 -right-14 font-handwriting text-sm font-semibold text-slate-600 rotate-[-5deg] whitespace-nowrap pointer-events-none">
            Combine<br />PDF files
            <svg className="w-5 h-4 text-slate-500 inline-block rotate-90 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[2])}
            className="clay-btn clay-blue w-16 h-16 rounded-[22px] flex items-center justify-center text-white border-none outline-none"
            title="PDF Merge"
          >
            <ToolIcon iconType="merge" className="w-8 h-8" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">PDF Merge</span>
        </div>

        {/* 4. Bottom-Right (4:30): PDF to JPG */}
        <div className="absolute bottom-12 right-24 lg:right-28 flex flex-col items-center z-20">
          <div className="absolute -top-3 -right-20 font-handwriting text-sm font-semibold text-slate-600 rotate-6 whitespace-nowrap leading-tight pointer-events-none">
            Convert<br />pages to images
            <svg className="w-5 h-4 text-slate-500 block rotate-180 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[3])}
            className="clay-btn clay-pink w-16 h-16 rounded-[22px] flex items-center justify-center text-white border-none outline-none"
            title="PDF to JPG"
          >
            <ToolIcon iconType="zoom-in" className="w-8 h-8" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">PDF to JPG</span>
        </div>

        {/* 5. Bottom (6 o'clock): Remove Background */}
        <div className="absolute -bottom-1 flex flex-col items-center z-20">
          <div className="absolute top-1 -right-24 font-handwriting text-sm font-semibold text-slate-600 rotate-[-4deg] whitespace-nowrap pointer-events-none">
            <svg className="w-5 h-4 text-slate-500 inline-block -rotate-90 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
            AI powered<br /><span className="ml-4">Cutout</span>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[4])}
            className="clay-btn clay-cyan w-16 h-16 rounded-[22px] flex items-center justify-center text-slate-800 border-none outline-none"
            title="Remove Background"
          >
            <ToolIcon iconType="cutout" className="w-8 h-8" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">Remove Background</span>
        </div>

        {/* 6. Bottom-Left (7:30): YouTube Downloader */}
        <div className="absolute bottom-12 left-24 lg:left-28 flex flex-col items-center z-20">
          <div className="absolute -top-7 -left-12 font-handwriting text-sm font-semibold text-slate-600 rotate-[-12deg] whitespace-nowrap pointer-events-none">
            Download<br />videos
            <svg className="w-5 h-4 text-slate-500 block rotate-12 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[5])}
            className="clay-btn clay-yellow w-16 h-16 rounded-[22px] flex items-center justify-center text-slate-800 border-none outline-none"
            title="YouTube Downloader"
          >
            <ToolIcon iconType="play-down" className="w-7 h-7" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">YouTube Downloader</span>
        </div>

        {/* 7. Left (9 o'clock): Video to MP3 */}
        <div className="absolute left-10 lg:left-14 flex flex-col items-center z-20">
          <div className="absolute -top-8 -left-12 font-handwriting text-sm font-semibold text-slate-600 rotate-[-10deg] whitespace-nowrap pointer-events-none">
            Extract<br />audio
            <svg className="w-5 h-4 text-slate-500 inline-block -rotate-45 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[6])}
            className="clay-btn clay-purple w-16 h-16 rounded-[22px] flex items-center justify-center text-white border-none outline-none"
            title="Video to MP3"
          >
            <ToolIcon iconType="play" className="w-8 h-8" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">Video to MP3</span>
        </div>

        {/* 8. Top-Left (10:30): Image to PDF */}
        <div className="absolute top-12 left-24 lg:left-28 flex flex-col items-center z-20">
          <div className="absolute -top-7 -left-10 font-handwriting text-sm font-semibold text-slate-600 rotate-[-10deg] whitespace-nowrap pointer-events-none">
            Turn images<br />into PDF
            <svg className="w-5 h-4 text-slate-500 inline-block rotate-45 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
            </svg>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(RADIAL_TOOLS[7])}
            className="clay-btn clay-orange w-16 h-16 rounded-[22px] flex items-center justify-center text-orange-500 border-none outline-none"
            title="Image to PDF"
          >
            <ToolIcon iconType="photo" className="w-8 h-8" />
          </button>
          <span className="text-[11px] font-semibold text-slate-700 mt-2 whitespace-nowrap">Image to PDF</span>
        </div>
      </div>
    </section>
  );
}

