"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Category3DStage from "@/components/tools/Category3DStage";

interface CategoryHeroProps {
  category: string;
  categoryName: string;
  departmentNumber: string;
  description: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  toolCount: number;
}

export default function CategoryHero({
  category,
  categoryName,
  departmentNumber,
  description,
  searchQuery,
  onSearchChange,
  toolCount,
}: CategoryHeroProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Category theme styling configurations
  const THEMES: Record<
    string,
    {
      titleAccent: string;
      eyebrow: string;
      glowGradient: string;
      glowBorder: string;
      glowRing: string;
      submitBtn: string;
      departmentBadge: string;
    }
  > = {
    pdf: {
      titleAccent: "text-[#c23333]",
      eyebrow: "DEPARTMENT 01 · DOCUMENT ATELIER",
      glowGradient: "from-rose-300/40 via-red-200/50 to-rose-400/30",
      glowBorder: "border-rose-300/70",
      glowRing: "focus-within:ring-rose-500/40 focus-within:border-rose-500",
      submitBtn: "bg-[#182029] hover:bg-black",
      departmentBadge: "bg-rose-100/90 text-rose-800 border-rose-200/80",
    },
    image: {
      titleAccent: "text-[#0d9488]",
      eyebrow: "DEPARTMENT 02 · VISUAL DARKROOM",
      glowGradient: "from-teal-300/40 via-emerald-200/50 to-teal-400/30",
      glowBorder: "border-teal-300/70",
      glowRing: "focus-within:ring-teal-500/40 focus-within:border-teal-500",
      submitBtn: "bg-[#182029] hover:bg-black",
      departmentBadge: "bg-teal-100/90 text-teal-800 border-teal-200/80",
    },
    "video-audio": {
      titleAccent: "text-[#7c3aed]",
      eyebrow: "DEPARTMENT 03 · SOUNDSTAGE & CINEMA",
      glowGradient: "from-purple-300/40 via-violet-200/50 to-purple-400/30",
      glowBorder: "border-purple-300/70",
      glowRing: "focus-within:ring-purple-500/40 focus-within:border-purple-500",
      submitBtn: "bg-[#182029] hover:bg-black",
      departmentBadge: "bg-purple-100/90 text-purple-800 border-purple-200/80",
    },
    downloaders: {
      titleAccent: "text-[#d97706]",
      eyebrow: "DEPARTMENT 04 · MEDIA COURIER",
      glowGradient: "from-amber-300/40 via-orange-200/50 to-amber-400/30",
      glowBorder: "border-amber-300/70",
      glowRing: "focus-within:ring-amber-500/40 focus-within:border-amber-500",
      submitBtn: "bg-[#182029] hover:bg-black",
      departmentBadge: "bg-amber-100/90 text-amber-800 border-amber-200/80",
    },
    "edit-convert": {
      titleAccent: "text-[#2563eb]",
      eyebrow: "DEPARTMENT 05 · UNIVERSAL PRESS",
      glowGradient: "from-blue-300/40 via-indigo-200/50 to-blue-400/30",
      glowBorder: "border-blue-300/70",
      glowRing: "focus-within:ring-blue-500/40 focus-within:border-blue-500",
      submitBtn: "bg-[#182029] hover:bg-black",
      departmentBadge: "bg-blue-100/90 text-blue-800 border-blue-200/80",
    },
  };

  const theme = THEMES[category] || {
    titleAccent: "text-[#a86828]",
    eyebrow: "SPECIAL COLLECTION · TOOLS ATELIER",
    glowGradient: "from-amber-300/40 via-amber-200/50 to-amber-400/30",
    glowBorder: "border-amber-300/70",
    glowRing: "focus-within:ring-amber-500/40 focus-within:border-amber-500",
    submitBtn: "bg-[#182029] hover:bg-black",
    departmentBadge: "bg-stone-100 text-stone-800 border-stone-200/80",
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = document.getElementById("category-tools-grid");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-8">
      {/* 1. Top Breadcrumbs & Department Pill Navigation */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        {/* Breadcrumb Pill */}
        <nav
          aria-label="Breadcrumb navigation"
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs font-medium text-stone-600 backdrop-blur-sm"
        >
          <Link
            href="/"
            className="w-5 h-5 rounded-md bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700 transition-colors"
            title="Home"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Link>
          <span className="text-stone-300">›</span>
          <Link
            href="/"
            className="hover:text-stone-900 transition-colors text-stone-600"
          >
            FileLab Studio
          </Link>
          <span className="text-stone-300">›</span>
          <Link
            href="/all-tools"
            className="hover:text-stone-900 transition-colors text-stone-600"
          >
            All Tools
          </Link>
          <span className="text-stone-300">›</span>
          <span className="font-bold text-stone-900">{categoryName}</span>
        </nav>

        {/* Count and Department Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs font-bold text-stone-800 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {toolCount} {categoryName}
          </span>
        </div>
      </div>

      {/* 2. Main Architectural Category Showcase Card */}
      <div className="relative rounded-[32px] bg-gradient-to-br from-[#faf7f2] via-[#f7f2ea] to-[#efe9dd] border border-[#e8dfd2] p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
        {/* Subtle architectural noise/grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #785b3a 0.8px, transparent 0.8px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
          {/* Left Column: Department Headline & Search */}
          <div className="w-full lg:max-w-[620px] z-10">
            {/* Eyebrow rule & department badge */}
            <div className="flex items-center gap-2.5 mb-3 flex-wrap">
              <span className="w-6 h-[1.5px] bg-stone-400/80" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
                {theme.eyebrow}
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${theme.departmentBadge}`}
              >
                {departmentNumber}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-stone-900 leading-[1.08] mb-3">
              <span className={`${theme.titleAccent} font-black`}>
                {categoryName}
              </span>{" "}
              Utilities
            </h1>

            {/* Subtitle description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mb-6">
              {description}
            </p>

            {/* HERO SEARCH BAR with Glowing Ambient Aura & Round Arrow Button */}
            <form
              onSubmit={handleSubmit}
              className="relative max-w-lg w-full mb-6 group"
            >
              {/* Luminous Golden Ambient Glow Halo */}
              <div
                className={`absolute -inset-1 rounded-full bg-gradient-to-r ${theme.glowGradient} blur-md opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-300 pointer-events-none`}
                aria-hidden="true"
              />

              <div
                className={`relative flex items-center bg-white rounded-full p-1.5 pl-4 sm:pl-5 border ${theme.glowBorder} shadow-[0_4px_22px_rgba(180,115,35,0.14)] group-hover:shadow-[0_6px_28px_rgba(180,115,35,0.2)] focus-within:ring-2 ${theme.glowRing} transition-all duration-300`}
              >
                {/* Search Magnifying Glass Icon */}
                <svg
                  className="w-5 h-5 text-stone-400 group-focus-within:text-stone-700 transition-colors mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>

                {/* Input Text Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={`Search within ${toolCount} ${categoryName.toLowerCase()}...`}
                  className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none pr-3"
                  aria-label={`Search ${categoryName}`}
                />

                {/* Quick Clear Button */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      onSearchChange("");
                      inputRef.current?.focus();
                    }}
                    className="mr-2 text-xs text-stone-400 hover:text-stone-700 font-bold p-1 transition-colors"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}

                {/* Circular Action Arrow Button */}
                <button
                  type="submit"
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${theme.submitBtn} text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-md group-hover:scale-[1.02]`}
                  aria-label="Search"
                  title="Search"
                >
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* TRUST BADGES ROW (100% In-Browser, Super Fast, Privacy First) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 select-none">
              {/* 100% In-Browser */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    100% In-Browser
                  </div>
                  <div className="text-[11px] text-stone-500 leading-tight">
                    Zero files leave machine
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-7 bg-stone-300/80" />

              {/* Instant Execution */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    Process in RAM
                  </div>
                  <div className="text-[11px] text-stone-500 leading-tight">
                    Zero server queues
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-7 bg-stone-300/80" />

              {/* Privacy First */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    Privacy Guaranteed
                  </div>
                  <div className="text-[11px] text-stone-500 leading-tight">
                    No logs or uploads
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code-Based 3D Floating Category Stage */}
          <div className="hidden lg:flex items-center justify-end relative w-full lg:w-[460px]">
            <Category3DStage category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}
