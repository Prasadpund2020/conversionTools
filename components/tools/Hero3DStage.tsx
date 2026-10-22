"use client";

import React, { useState } from "react";

interface Hero3DStageProps {
  onSelectCategory?: (category: string) => void;
  activeCategory?: string;
}

export default function Hero3DStage({
  onSelectCategory,
  activeCategory,
}: Hero3DStageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCardClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(activeCategory === catId ? "all" : catId);
    }
  };

  return (
    <div className="relative w-full max-w-[480px] h-[340px] flex items-center justify-center select-none overflow-visible">
      {/* 1. Background Architectural Arch & Ambient Light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Soft Window Arch Frame */}
        <div className="w-[380px] h-[290px] rounded-t-full border border-stone-300/40 bg-gradient-to-b from-stone-100/40 via-amber-50/20 to-transparent shadow-inner relative overflow-hidden">
          {/* Subtle nature silhouette / foliage */}
          <div className="absolute -left-6 bottom-4 w-28 h-40 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 150" fill="currentColor" className="text-emerald-900 w-full h-full">
              <path d="M10 140 Q 30 100 20 60 Q 40 40 50 10 Q 55 50 45 90 Q 35 120 10 140 Z" />
              <path d="M30 140 Q 60 110 70 70 Q 80 50 90 20 Q 80 60 65 100 Q 50 130 30 140 Z" />
              <path d="M25 100 Q 50 80 65 50 Q 50 70 35 90 Z" />
            </svg>
          </div>

          {/* Ambient Window Cross Bars */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-stone-200/50" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-stone-200/50" />
        </div>

        {/* Luminous Neon Golden Ring behind the pedestal */}
        <div className="absolute top-10 w-[270px] h-[270px] rounded-full border-2 border-amber-300/50 shadow-[0_0_45px_rgba(245,158,11,0.25)] opacity-85 animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* 2. Sleek Desk Lamp with Ambient Spotlight (Right Side) */}
      <div className="absolute right-3 top-2 pointer-events-none z-20 flex flex-col items-center">
        {/* Lamp Shade & Bulb */}
        <div className="relative">
          <div className="w-14 h-8 bg-gradient-to-r from-stone-800 via-stone-900 to-black rounded-t-full border-t border-stone-600 shadow-lg relative">
            {/* Brass Ring Accents */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-2 bg-amber-400 rounded-sm" />
            <div className="absolute bottom-0 inset-x-0 h-1 bg-amber-400/80" />
          </div>
          {/* Spotlight Cone */}
          <div
            className="w-24 h-48 bg-gradient-to-b from-amber-200/30 via-amber-100/10 to-transparent blur-md"
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Curved Lamp Arm */}
        <div className="absolute top-6 right-2 w-1.5 h-36 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950 rounded-full shadow-sm" />

        {/* Stacked Hardcover Books at the base */}
        <div className="absolute bottom-2 -right-1 flex flex-col gap-1 items-end opacity-90">
          <div className="w-16 h-4 rounded-xs bg-[#b45309] text-amber-100 text-[8px] font-mono font-bold flex items-center justify-center tracking-widest shadow-xs">
            FAST
          </div>
          <div className="w-20 h-4.5 rounded-xs bg-[#1e293b] text-slate-200 text-[8px] font-mono font-bold flex items-center justify-center tracking-widest shadow-xs">
            SECURE
          </div>
          <div className="w-22 h-4.5 rounded-xs bg-[#0f172a] text-slate-300 text-[8px] font-mono font-bold flex items-center justify-center tracking-widest shadow-xs">
            OFFLINE
          </div>
          <div className="w-24 h-5 rounded-xs bg-[#451a03] text-amber-200 text-[8px] font-mono font-bold flex items-center justify-center tracking-widest shadow-sm">
            PRODUCTIVE
          </div>
        </div>
      </div>

      {/* 3. The 3D Marble Pedestal Base */}
      <div className="absolute bottom-4 inset-x-0 flex flex-col items-center pointer-events-none z-10">
        {/* Upper Elliptical Podium Surface with Glowing Golden Neon Rim */}
        <div className="relative w-72 h-20 rounded-[50%] bg-gradient-to-b from-stone-800 via-stone-900 to-black border-2 border-amber-400/80 shadow-[0_0_24px_rgba(245,158,11,0.5),inset_0_2px_8px_rgba(255,255,255,0.25)] flex items-center justify-center">
          {/* Subtle reflective sheen / marble texture overlay */}
          <div className="w-64 h-16 rounded-[50%] bg-gradient-to-tr from-stone-950 via-stone-900/90 to-stone-800/80 border border-stone-700/60 shadow-inner flex items-center justify-center">
            {/* Center soft glow ring */}
            <div className="w-48 h-10 rounded-[50%] border border-amber-300/30 bg-amber-400/5 shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
          </div>
        </div>

        {/* Cylinder Body Shadow */}
        <div className="w-72 h-6 -mt-10 rounded-b-3xl bg-gradient-to-b from-black via-stone-950 to-transparent blur-[2px] opacity-70" />
      </div>

      {/* 4. Floating 3D Frosted Glass Cards (Interactive & Responsive) */}
      <div className="relative z-30 w-full max-w-[360px] h-[250px] mb-6">
        {/* CARD 1: PDF (Top Left, Angled) */}
        <button
          type="button"
          onClick={() => handleCardClick("pdf")}
          onMouseEnter={() => setHoveredCard("pdf")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`absolute left-4 top-2 group p-2.5 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer ${
            activeCategory === "pdf"
              ? "scale-110 ring-2 ring-red-400 bg-white/90 shadow-[0_16px_36px_rgba(239,68,68,0.25)]"
              : "hover:scale-108 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_18px_35px_rgba(0,0,0,0.12)]"
          }`}
          style={{
            transform: hoveredCard === "pdf" ? "rotate(-4deg) translateY(-8px) scale(1.08)" : "rotate(-9deg)",
          }}
          title="Filter by PDF Tools"
        >
          {/* Red PDF File Badge */}
          <div className="w-13 h-15 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-rose-700 p-1.5 flex flex-col items-center justify-between shadow-md relative overflow-hidden">
            {/* Folded Corner Accent */}
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-400/80 rounded-bl-md shadow-xs" />
            <div className="w-full flex justify-start">
              <span className="text-[7px] text-red-200 font-mono font-semibold">.PDF</span>
            </div>
            <span className="font-black text-xs text-white tracking-wider">PDF</span>
            <div className="w-6 h-0.5 rounded-full bg-white/40 mb-1" />
          </div>
          <div className="mt-1.5 text-center text-[10px] font-bold text-stone-700 tracking-tight">
            PDF
          </div>
        </button>

        {/* CARD 2: Image (Top Center, Elevated) */}
        <button
          type="button"
          onClick={() => handleCardClick("image")}
          onMouseEnter={() => setHoveredCard("image")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`absolute left-[135px] top-0 group p-2.5 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-[0_14px_30px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer ${
            activeCategory === "image"
              ? "scale-110 ring-2 ring-blue-400 bg-white/90 shadow-[0_16px_36px_rgba(59,130,246,0.25)]"
              : "hover:scale-108 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_18px_35px_rgba(0,0,0,0.12)]"
          }`}
          style={{
            transform: hoveredCard === "image" ? "rotate(0deg) translateY(-8px) scale(1.08)" : "rotate(2deg)",
          }}
          title="Filter by Image Tools"
        >
          {/* Blue Image Badge */}
          <div className="w-13 h-15 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-sky-600 p-1.5 flex flex-col items-center justify-between shadow-md relative overflow-hidden">
            <div className="w-full flex justify-start">
              <span className="text-[7px] text-blue-200 font-mono font-semibold">.IMG</span>
            </div>
            {/* Landscape Mountains & Sun SVG */}
            <svg className="w-6 h-6 text-white drop-shadow-xs" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <div className="w-6 h-0.5 rounded-full bg-white/40 mb-1" />
          </div>
          <div className="mt-1.5 text-center text-[10px] font-bold text-stone-700 tracking-tight">
            Image
          </div>
        </button>

        {/* CARD 3: Excel / Document (Top Right) */}
        <button
          type="button"
          onClick={() => handleCardClick("text")}
          onMouseEnter={() => setHoveredCard("excel")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`absolute right-6 top-5 group p-2.5 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/80 shadow-[0_12px_28px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer ${
            activeCategory === "text"
              ? "scale-110 ring-2 ring-emerald-400 bg-white/90 shadow-[0_16px_36px_rgba(16,185,129,0.25)]"
              : "hover:scale-108 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_18px_35px_rgba(0,0,0,0.12)]"
          }`}
          style={{
            transform: hoveredCard === "excel" ? "rotate(4deg) translateY(-8px) scale(1.08)" : "rotate(10deg)",
          }}
          title="Filter by Document & Text Tools"
        >
          {/* Emerald Excel/Sheet Badge */}
          <div className="w-13 h-15 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-1.5 flex flex-col items-center justify-between shadow-md relative overflow-hidden">
            <div className="w-full flex justify-start">
              <span className="text-[7px] text-emerald-200 font-mono font-semibold">.XLSX</span>
            </div>
            {/* Sheet / X Icon */}
            <div className="font-black text-sm text-white tracking-widest flex items-center justify-center">
              X
            </div>
            <div className="w-6 h-0.5 rounded-full bg-white/40 mb-1" />
          </div>
          <div className="mt-1.5 text-center text-[10px] font-bold text-stone-700 tracking-tight">
            Excel
          </div>
        </button>

        {/* CARD 4: Video (Bottom Left, Forefront) */}
        <button
          type="button"
          onClick={() => handleCardClick("video")}
          onMouseEnter={() => setHoveredCard("video")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`absolute left-8 bottom-4 group p-2.5 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 cursor-pointer z-30 ${
            activeCategory === "video"
              ? "scale-110 ring-2 ring-purple-400 bg-white shadow-[0_18px_40px_rgba(168,85,247,0.3)]"
              : "hover:scale-108 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          }`}
          style={{
            transform: hoveredCard === "video" ? "rotate(-2deg) translateY(-8px) scale(1.08)" : "rotate(-6deg)",
          }}
          title="Filter by Video Tools"
        >
          {/* Purple Video Badge */}
          <div className="w-13 h-15 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-700 p-1.5 flex flex-col items-center justify-between shadow-md relative overflow-hidden">
            <div className="w-full flex justify-start">
              <span className="text-[7px] text-purple-200 font-mono font-semibold">.MP4</span>
            </div>
            {/* Video Play Icon */}
            <svg className="w-5 h-5 text-white drop-shadow-xs" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <div className="w-6 h-0.5 rounded-full bg-white/40 mb-1" />
          </div>
          <div className="mt-1.5 text-center text-[10px] font-bold text-stone-700 tracking-tight">
            Video
          </div>
        </button>

        {/* CARD 5: Audio (Bottom Center, Forefront) */}
        <button
          type="button"
          onClick={() => handleCardClick("audio")}
          onMouseEnter={() => setHoveredCard("audio")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`absolute left-[138px] bottom-2 group p-2.5 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 cursor-pointer z-30 ${
            activeCategory === "audio"
              ? "scale-110 ring-2 ring-amber-400 bg-white shadow-[0_18px_40px_rgba(245,158,11,0.3)]"
              : "hover:scale-108 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          }`}
          style={{
            transform: hoveredCard === "audio" ? "rotate(0deg) translateY(-8px) scale(1.08)" : "rotate(3deg)",
          }}
          title="Filter by Audio Tools"
        >
          {/* Orange/Amber Audio Badge */}
          <div className="w-13 h-15 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 p-1.5 flex flex-col items-center justify-between shadow-md relative overflow-hidden">
            <div className="w-full flex justify-start">
              <span className="text-[7px] text-amber-100 font-mono font-semibold">.MP3</span>
            </div>
            {/* Music Note Icon */}
            <svg className="w-5 h-5 text-white drop-shadow-xs" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
            <div className="w-6 h-0.5 rounded-full bg-white/40 mb-1" />
          </div>
          <div className="mt-1.5 text-center text-[10px] font-bold text-stone-700 tracking-tight">
            Audio
          </div>
        </button>

        {/* CARD 6: Text / Code (Bottom Right, Forefront) */}
        <button
          type="button"
          onClick={() => handleCardClick("other")}
          onMouseEnter={() => setHoveredCard("text")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`absolute right-8 bottom-3 group p-2.5 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-[0_16px_35px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 cursor-pointer z-30 ${
            activeCategory === "other"
              ? "scale-110 ring-2 ring-slate-400 bg-white shadow-[0_18px_40px_rgba(100,116,139,0.3)]"
              : "hover:scale-108 hover:-translate-y-2 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          }`}
          style={{
            transform: hoveredCard === "text" ? "rotate(4deg) translateY(-8px) scale(1.08)" : "rotate(9deg)",
          }}
          title="Filter by Text & Utilities"
        >
          {/* Silver/Slate Text Document Badge */}
          <div className="w-13 h-15 sm:w-14 sm:h-16 rounded-xl bg-gradient-to-br from-slate-100 via-stone-200 to-slate-300 p-1.5 flex flex-col items-center justify-between shadow-md border border-stone-300/80 relative overflow-hidden">
            <div className="w-full flex justify-start">
              <span className="text-[7px] text-slate-500 font-mono font-bold">.TXT</span>
            </div>
            {/* Document Lines SVG */}
            <div className="w-full px-1 flex flex-col gap-1">
              <div className="w-3/4 h-0.5 rounded-full bg-slate-600" />
              <div className="w-full h-0.5 rounded-full bg-slate-500" />
              <div className="w-5/6 h-0.5 rounded-full bg-slate-400" />
            </div>
            <div className="w-6 h-0.5 rounded-full bg-slate-400 mb-1" />
          </div>
          <div className="mt-1.5 text-center text-[10px] font-bold text-stone-700 tracking-tight">
            Text
          </div>
        </button>
      </div>
    </div>
  );
}
