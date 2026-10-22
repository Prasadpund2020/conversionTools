"use client";

import React, { useState } from "react";

interface Category3DStageProps {
  category: string;
}

export default function Category3DStage({ category }: Category3DStageProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Render category-specific 3D floating cards
  const renderCards = () => {
    switch (category) {
      case "pdf":
        return (
          <>
            {/* 1. Master PDF File Card (Top Left) */}
            <div
              onMouseEnter={() => setHoveredCard("pdf")}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute left-6 top-3 p-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-[0_14px_32px_rgba(239,68,68,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-20 cursor-default"
              style={{
                transform: hoveredCard === "pdf" ? "rotate(-4deg) translateY(-8px) scale(1.1)" : "rotate(-9deg)",
              }}
            >
              <div className="w-14 h-17 rounded-xl bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 p-2 flex flex-col justify-between shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-400/80 rounded-bl-md shadow-xs" />
                <span className="text-[7px] text-red-200 font-mono font-bold">.PDF</span>
                <span className="font-black text-sm text-white tracking-wider self-center">PDF</span>
                <div className="w-8 h-1 rounded-full bg-white/40 self-center mb-0.5" />
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800 tracking-tight">
                Document
              </div>
            </div>

            {/* 2. Word Conversion Transformer Card (Top Right) */}
            <div
              onMouseEnter={() => setHoveredCard("word")}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute right-8 top-1 p-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-[0_14px_32px_rgba(59,130,246,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-20 cursor-default"
              style={{
                transform: hoveredCard === "word" ? "rotate(3deg) translateY(-8px) scale(1.1)" : "rotate(8deg)",
              }}
            >
              <div className="w-14 h-17 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 p-2 flex flex-col justify-between shadow-md relative overflow-hidden">
                <span className="text-[7px] text-blue-200 font-mono font-bold">.DOCX</span>
                <div className="flex items-center justify-center gap-1">
                  <span className="font-black text-xs text-white">WORD</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[8px] text-blue-200 font-mono">
                  <span>⇄</span>
                  <span>PDF</span>
                </div>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800 tracking-tight">
                Converter
              </div>
            </div>

            {/* 3. Verified E-Signature Card (Bottom Left) */}
            <div
              onMouseEnter={() => setHoveredCard("sign")}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute left-10 bottom-4 p-2.5 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/95 shadow-[0_16px_36px_rgba(16,185,129,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-30 cursor-default"
              style={{
                transform: hoveredCard === "sign" ? "rotate(-1deg) translateY(-8px) scale(1.1)" : "rotate(-5deg)",
              }}
            >
              <div className="w-13 h-15 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 p-2 flex flex-col items-center justify-between shadow-md">
                <span className="text-[7px] text-emerald-100 font-mono font-bold">E-SIGN</span>
                {/* Signature feather pen icon */}
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <div className="px-1.5 py-0.5 rounded-full bg-white/20 text-[7px] text-white font-mono font-bold">
                  VERIFIED
                </div>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800 tracking-tight">
                Signatures
              </div>
            </div>

            {/* 4. AES-256 Encryption Lock Card (Bottom Right) */}
            <div
              onMouseEnter={() => setHoveredCard("lock")}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute right-10 bottom-2 p-2.5 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/95 shadow-[0_16px_36px_rgba(168,85,247,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300 hover:scale-110 hover:-translate-y-2 z-30 cursor-default"
              style={{
                transform: hoveredCard === "lock" ? "rotate(2deg) translateY(-8px) scale(1.1)" : "rotate(6deg)",
              }}
            >
              <div className="w-13 h-15 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-800 p-2 flex flex-col items-center justify-between shadow-md">
                <span className="text-[7px] text-purple-200 font-mono font-bold">256-BIT</span>
                {/* Padlock Icon */}
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <div className="px-1.5 py-0.5 rounded-full bg-white/20 text-[7px] text-white font-mono font-bold">
                  PROTECT
                </div>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800 tracking-tight">
                Security
              </div>
            </div>
          </>
        );

      case "image":
        return (
          <>
            {/* 1. Visual Photo Canvas (Top Left) */}
            <div className="absolute left-6 top-3 p-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-20 rotate-[-8deg]">
              <div className="w-14 h-17 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-2 flex flex-col justify-between shadow-md">
                <span className="text-[7px] text-blue-200 font-mono font-bold">.RAW</span>
                <svg className="w-6 h-6 text-white self-center" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <div className="w-8 h-1 rounded-full bg-white/40 self-center" />
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Photo</div>
            </div>

            {/* 2. WebP Compression -80% (Top Right) */}
            <div className="absolute right-8 top-1 p-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-20 rotate-[8deg]">
              <div className="w-14 h-17 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 p-2 flex flex-col justify-between shadow-md text-white text-center">
                <span className="text-[7px] text-emerald-200 font-mono font-bold">WEBP</span>
                <span className="text-base font-black leading-none">-75%</span>
                <span className="text-[8px] text-emerald-100 font-mono">Smaller</span>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Compress</div>
            </div>

            {/* 3. Remove Background Magic Wand (Bottom Left) */}
            <div className="absolute left-10 bottom-4 p-2.5 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/95 shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-30 rotate-[-4deg]">
              <div className="w-13 h-15 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-2 flex flex-col items-center justify-between shadow-md text-white">
                <span className="text-[7px] text-fuchsia-200 font-mono font-bold">AUTO-AI</span>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="text-[7px] text-fuchsia-100 font-mono font-bold">TRANSPARENT</span>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Cutout</div>
            </div>

            {/* 4. Format Conversion PNG / JPG (Bottom Right) */}
            <div className="absolute right-10 bottom-2 p-2.5 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/95 shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-30 rotate-[6deg]">
              <div className="w-13 h-15 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-2 flex flex-col items-center justify-between shadow-md text-white">
                <span className="text-[7px] text-amber-100 font-mono font-bold">MULTI</span>
                <span className="text-xs font-black">PNG⇄JPG</span>
                <span className="text-[7px] text-amber-100 font-mono font-bold">CONVERT</span>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Formats</div>
            </div>
          </>
        );

      default:
        return (
          <>
            {/* Generic High-Precision Media Atelier Stage */}
            <div className="absolute left-6 top-3 p-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-20 rotate-[-8deg]">
              <div className="w-14 h-17 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 flex flex-col justify-between shadow-md text-white">
                <span className="text-[7px] text-indigo-200 font-mono font-bold">MEDIA</span>
                <span className="text-xs font-black self-center">HIGH RES</span>
                <div className="w-8 h-1 rounded-full bg-white/40 self-center" />
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Input</div>
            </div>

            <div className="absolute right-8 top-1 p-3 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/90 shadow-lg hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-20 rotate-[8deg]">
              <div className="w-14 h-17 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 p-2 flex flex-col justify-between shadow-md text-white text-center">
                <span className="text-[7px] text-amber-100 font-mono font-bold">TURBO</span>
                <span className="text-sm font-black">FAST</span>
                <span className="text-[8px] text-amber-100 font-mono">0s Queue</span>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Speed</div>
            </div>

            <div className="absolute left-10 bottom-4 p-2.5 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/95 shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-30 rotate-[-4deg]">
              <div className="w-13 h-15 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-2 flex flex-col items-center justify-between shadow-md text-white">
                <span className="text-[7px] text-emerald-100 font-mono font-bold">CLIENT</span>
                <span className="text-xs font-black">RAM ONLY</span>
                <span className="text-[7px] text-emerald-100 font-mono font-bold">PRIVATE</span>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Local</div>
            </div>

            <div className="absolute right-10 bottom-2 p-2.5 rounded-2xl backdrop-blur-xl bg-white/80 border border-white/95 shadow-xl hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-30 rotate-[6deg]">
              <div className="w-13 h-15 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 p-2 flex flex-col items-center justify-between shadow-md text-white">
                <span className="text-[7px] text-slate-300 font-mono font-bold">OUTPUT</span>
                <span className="text-xs font-black">100% OK</span>
                <span className="text-[7px] text-slate-300 font-mono font-bold">LOSSLESS</span>
              </div>
              <div className="mt-1.5 text-center text-[10px] font-bold text-stone-800">Ready</div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="relative w-full max-w-[460px] h-[320px] flex items-center justify-center select-none overflow-visible">
      {/* 1. Architectural Arched Window with Ambient Ring Light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Arch Frame */}
        <div className="w-[360px] h-[270px] rounded-t-full border border-stone-300/40 bg-gradient-to-b from-stone-100/40 via-amber-50/20 to-transparent shadow-inner relative overflow-hidden">
          {/* Subtle botanical leaves */}
          <div className="absolute -left-6 bottom-4 w-28 h-36 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 150" fill="currentColor" className="text-emerald-900 w-full h-full">
              <path d="M10 140 Q 30 100 20 60 Q 40 40 50 10 Q 55 50 45 90 Q 35 120 10 140 Z" />
              <path d="M30 140 Q 60 110 70 70 Q 80 50 90 20 Q 80 60 65 100 Q 50 130 30 140 Z" />
            </svg>
          </div>
          {/* Arch Crossbars */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-stone-200/50" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-stone-200/50" />
        </div>

        {/* Luminous Glowing Golden Neon Ring */}
        <div className="absolute top-8 w-[250px] h-[250px] rounded-full border-2 border-amber-300/50 shadow-[0_0_40px_rgba(245,158,11,0.25)] opacity-80 animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* 2. Desk Lamp Spotlight and Stacked Books Accent */}
      <div className="absolute right-2 top-2 pointer-events-none z-20 flex flex-col items-center">
        {/* Lamp Fixture */}
        <div className="relative">
          <div className="w-13 h-7 bg-gradient-to-r from-stone-800 via-stone-900 to-black rounded-t-full border-t border-stone-600 shadow-lg relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-1.5 bg-amber-400 rounded-xs" />
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-amber-400/80" />
          </div>
          {/* Spotlight Cone */}
          <div
            className="w-20 h-44 bg-gradient-to-b from-amber-200/30 via-amber-100/10 to-transparent blur-md"
            style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Lamp Stand */}
        <div className="absolute top-5 right-2 w-1 h-32 bg-gradient-to-b from-stone-700 via-stone-800 to-stone-950 rounded-full" />

        {/* Stacked Mini Books */}
        <div className="absolute bottom-2 -right-1 flex flex-col gap-1 items-end opacity-90">
          <div className="w-14 h-4 rounded-xs bg-[#b45309] text-amber-100 text-[7px] font-mono font-bold flex items-center justify-center tracking-widest shadow-xs">
            FAST
          </div>
          <div className="w-18 h-4 rounded-xs bg-[#1e293b] text-slate-200 text-[7px] font-mono font-bold flex items-center justify-center tracking-widest shadow-xs">
            SECURE
          </div>
          <div className="w-20 h-4.5 rounded-xs bg-[#0f172a] text-slate-300 text-[7px] font-mono font-bold flex items-center justify-center tracking-widest shadow-xs">
            OFFLINE
          </div>
        </div>
      </div>

      {/* 3. The 3D Dark Granite Pedestal */}
      <div className="absolute bottom-3 inset-x-0 flex flex-col items-center pointer-events-none z-10">
        <div className="relative w-68 h-18 rounded-[50%] bg-gradient-to-b from-stone-800 via-stone-900 to-black border-2 border-amber-400/80 shadow-[0_0_24px_rgba(245,158,11,0.5),inset_0_2px_8px_rgba(255,255,255,0.25)] flex items-center justify-center">
          <div className="w-60 h-14 rounded-[50%] bg-gradient-to-tr from-stone-950 via-stone-900/90 to-stone-800/80 border border-stone-700/60 shadow-inner flex items-center justify-center">
            <div className="w-44 h-8 rounded-[50%] border border-amber-300/30 bg-amber-400/5 shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
          </div>
        </div>
        <div className="w-68 h-6 -mt-9 rounded-b-3xl bg-gradient-to-b from-black via-stone-950 to-transparent blur-[2px] opacity-70" />
      </div>

      {/* 4. Layered 3D Floating Glass Cards */}
      <div className="relative z-30 w-full max-w-[340px] h-[240px] mb-6">
        {renderCards()}
      </div>
    </div>
  );
}
