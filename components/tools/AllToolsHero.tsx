"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Hero3DStage from "@/components/tools/Hero3DStage";

export interface CategoryCardData {
  id: string;
  name: string;
  countLabel: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  cardHoverBg: string;
  cardBorder: string;
  activeRing: string;
  arrowBg: string;
  arrowColor: string;
  icon: React.ReactNode;
}

interface AllToolsHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  totalCount?: number;
}

export const HERO_CATEGORIES: CategoryCardData[] = [
  {
    id: "pdf",
    name: "PDF Tools",
    countLabel: "6+ tools",
    badgeBg: "bg-red-500",
    badgeText: "text-white font-bold text-[10px]",
    cardBg: "bg-[#fff2f2]",
    cardHoverBg: "hover:bg-[#ffe6e6]",
    cardBorder: "border-red-200/70",
    activeRing: "ring-2 ring-red-400 bg-[#ffe8e8]",
    arrowBg: "bg-red-100/80",
    arrowColor: "text-red-600",
    icon: (
      <span className="font-black text-[11px] tracking-tight text-white uppercase">
        PDF
      </span>
    ),
  },
  {
    id: "image",
    name: "Image Tools",
    countLabel: "8+ tools",
    badgeBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    badgeText: "text-white",
    cardBg: "bg-[#edf5ff]",
    cardHoverBg: "hover:bg-[#e0efff]",
    cardBorder: "border-blue-200/70",
    activeRing: "ring-2 ring-blue-400 bg-[#e0efff]",
    arrowBg: "bg-blue-100/80",
    arrowColor: "text-blue-600",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "video",
    name: "Video Tools",
    countLabel: "5+ tools",
    badgeBg: "bg-gradient-to-br from-purple-500 to-violet-600",
    badgeText: "text-white",
    cardBg: "bg-[#f5efff]",
    cardHoverBg: "hover:bg-[#ede0ff]",
    cardBorder: "border-purple-200/70",
    activeRing: "ring-2 ring-purple-400 bg-[#ede0ff]",
    arrowBg: "bg-purple-100/80",
    arrowColor: "text-purple-600",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "audio",
    name: "Audio Tools",
    countLabel: "4+ tools",
    badgeBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    badgeText: "text-white",
    cardBg: "bg-[#eefcf4]",
    cardHoverBg: "hover:bg-[#e0f9ec]",
    cardBorder: "border-emerald-200/70",
    activeRing: "ring-2 ring-emerald-400 bg-[#e0f9ec]",
    arrowBg: "bg-emerald-100/80",
    arrowColor: "text-emerald-600",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    id: "text",
    name: "Text Tools",
    countLabel: "5+ tools",
    badgeBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    badgeText: "text-white",
    cardBg: "bg-[#fff8ea]",
    cardHoverBg: "hover:bg-[#fff0ce]",
    cardBorder: "border-amber-200/70",
    activeRing: "ring-2 ring-amber-400 bg-[#fff0ce]",
    arrowBg: "bg-amber-100/80",
    arrowColor: "text-amber-600",
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "other",
    name: "Other Tools",
    countLabel: "5+ tools",
    badgeBg: "bg-gradient-to-br from-slate-600 to-slate-800",
    badgeText: "text-white",
    cardBg: "bg-[#f5f6f8]",
    cardHoverBg: "hover:bg-[#eaecee]",
    cardBorder: "border-stone-200/80",
    activeRing: "ring-2 ring-slate-400 bg-[#eaecee]",
    arrowBg: "bg-stone-200/80",
    arrowColor: "text-slate-700",
    icon: (
      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
];

export default function AllToolsHero({
  searchQuery,
  onSearchChange,
  activeCategory,
  onSelectCategory,
  totalCount = 33,
}: AllToolsHeroProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "FileLab Studio",
        item: "https://filelab.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Tools",
        item: "https://filelab.app/all-tools",
      },
    ],
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Scroll smoothly to results if needed
    const resultsElement = document.getElementById("tools-workspace");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-10">
      {/* Schema.org breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* 1. Top Breadcrumbs & Tools Count Bar */}
      <div className="flex items-center justify-between mb-4">
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
          <span className="font-bold text-stone-900">All Tools</span>
        </nav>

        {/* 33+ Tools Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-xs font-bold text-stone-800 backdrop-blur-sm">
          <svg
            className="w-3.5 h-3.5 text-stone-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>{totalCount}+ Tools</span>
        </div>
      </div>

      {/* 2. Main Hero Architectural Showcase Card */}
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
          {/* Left Column: Atelier Copy & Glowing Search Bar */}
          <div className="w-full lg:max-w-[620px] z-10">
            {/* Eyebrow rule */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-6 h-[1.5px] bg-stone-400/80" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-stone-500 uppercase">
                The Complete Tool Atelier
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight text-stone-900 leading-[1.08] mb-3">
              All File{" "}
              <span className="text-[#a86828] font-black inline-block">
                Utilities
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mb-6">
              Every document converter, visual editor, sound extractor, and media
              courier in one place. Processed entirely inside your browser
              memory with zero server uploads.
            </p>

            {/* HERO SEARCH BAR with Glowing Ambient Aura & Round Arrow Button */}
            <form onSubmit={handleSubmit} className="relative max-w-lg w-full mb-6 group">
              {/* Luminous Golden Ambient Glow Halo */}
              <div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300/40 via-amber-200/50 to-amber-400/30 blur-md opacity-80 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-300 pointer-events-none"
                aria-hidden="true"
              />

              <div
                className="relative flex items-center bg-white rounded-full p-1.5 pl-4 sm:pl-5 border border-amber-300/70 shadow-[0_4px_22px_rgba(180,115,35,0.16)] group-hover:shadow-[0_6px_28px_rgba(180,115,35,0.22)] focus-within:ring-2 focus-within:ring-amber-500/40 focus-within:border-amber-500 transition-all duration-300"
              >
                {/* Search Magnifying Glass Icon */}
                <svg
                  className="w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors mr-3 flex-shrink-0"
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
                  placeholder={`Search all ${totalCount}+ tools...`}
                  className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none pr-3"
                  aria-label="Search all tools"
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
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#151c24] hover:bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-md group-hover:scale-[1.02]"
                  aria-label="Search"
                  title="Search tools"
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

            {/* TRUST BADGES ROW (100% Secure, Super Fast, Privacy First) */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 select-none">
              {/* 100% Secure */}
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
                    100% Secure
                  </div>
                  <div className="text-[11px] text-stone-500 leading-tight">
                    No file uploads
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden sm:block w-px h-7 bg-stone-300/80" />

              {/* Super Fast */}
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
                    Super Fast
                  </div>
                  <div className="text-[11px] text-stone-500 leading-tight">
                    Process in seconds
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
                    Privacy First
                  </div>
                  <div className="text-[11px] text-stone-500 leading-tight">
                    All offline in browser
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code-Based 3D Floating Atelier Stage */}
          <div className="hidden lg:flex items-center justify-end relative w-full lg:w-[480px]">
            <Hero3DStage
              onSelectCategory={onSelectCategory}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      </div>

      {/* 3. Bottom Category Dock (6 Cards Row matching reference mockup) */}
      <div className="mt-4 p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {HERO_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(isSelected ? "all" : cat.id)}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-200 text-left border ${
                  isSelected
                    ? `${cat.activeRing} shadow-sm scale-[1.01]`
                    : `${cat.cardBg} ${cat.cardHoverBg} ${cat.cardBorder} hover:shadow-xs`
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  {/* Category Rounded Badge Icon */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${cat.badgeBg} flex items-center justify-center flex-shrink-0 shadow-xs`}
                  >
                    {cat.icon}
                  </div>

                  {/* Title & Count */}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900 truncate leading-tight">
                      {cat.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-stone-500 truncate leading-tight">
                      {cat.countLabel}
                    </div>
                  </div>
                </div>

                {/* Circular Chevron Arrow Button */}
                <div
                  className={`w-6 h-6 rounded-full ${cat.arrowBg} ${cat.arrowColor} flex items-center justify-center flex-shrink-0 ml-1.5 transition-transform group-hover:scale-105`}
                >
                  <svg
                    className={`w-3 h-3 ${isSelected ? "rotate-90" : ""} transition-transform`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
