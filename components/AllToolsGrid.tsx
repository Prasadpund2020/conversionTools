"use client";

import React from "react";
import { ToolItem, ToolCategory } from "@/types/tools";
import { ALL_TOOLS, CATEGORIES } from "@/data/tools";
import ToolIcon from "@/components/ToolIcon";

interface AllToolsGridProps {
  activeCategory: ToolCategory;
  onSelectCategory: (category: ToolCategory) => void;
  onSelectTool: (tool: ToolItem) => void;
  onBackToDesk: () => void;
}

export default function AllToolsGrid({
  activeCategory,
  onSelectCategory,
  onSelectTool,
  onBackToDesk,
}: AllToolsGridProps) {
  const filteredTools = ALL_TOOLS.filter((tool) =>
    activeCategory === "all" ? true : tool.category === activeCategory
  );

  return (
    <div className="w-full flex-1 flex flex-col my-2 animate-in fade-in duration-200">
      {/* Top Banner and Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/80 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              All FileLab Tools
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {filteredTools.length} Available
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            100% Client-side and secure file utilities running entirely in your browser.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Desk Workspace Back Button */}
          <button
            type="button"
            onClick={onBackToDesk}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold shadow-sm hover:bg-slate-900 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Desk</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white/80 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/60"
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Tools Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="group relative bg-white/80 hover:bg-white backdrop-blur-md rounded-2xl p-4 border border-white/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`clay-btn ${tool.clayColor} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}
                >
                  <ToolIcon iconType={tool.iconType} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {tool.category}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-blue-600">
              <span>Open Tool</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
