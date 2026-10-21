"use client";

import React from "react";
import { ToolItem } from "@/types/tools";
import { QUICK_TOOLS } from "@/data/tools";
import ToolIcon from "@/components/ToolIcon";

interface QuickToolsClipboardProps {
  onSelectTool: (tool: ToolItem) => void;
}

export default function QuickToolsClipboard({
  onSelectTool,
}: QuickToolsClipboardProps) {
  return (
    <aside className="relative w-64 self-start mt-2 z-20 select-none">
      {/* Metal Bulldog Clip on Top of the Paper */}
      <div className="absolute -top-4 right-10 z-30 flex flex-col items-center pointer-events-none">
        {/* Wire loop arms */}
        <div className="w-7 h-5 rounded-t-full border-2 border-slate-700 bg-transparent mb-[-2px]"></div>
        {/* Clip body */}
        <div className="w-10 h-4 bg-slate-900 rounded-sm shadow-md border-t border-slate-600 flex items-center justify-center">
          <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>

      {/* The Paper Document / Clipboard Sheet */}
      <div className="paper-shadow bg-gradient-to-b from-white to-stone-50 rounded-lg p-5 pt-7 border border-stone-200/90 rotate-[0.5deg]">
        <h3 className="font-serif italic font-bold text-lg text-slate-800 tracking-wide border-b border-stone-200/80 pb-3">
          Quick Tools
        </h3>

        {/* List of Fast Access Tools */}
        <ul className="divide-y divide-stone-100 mt-1 text-xs">
          {QUICK_TOOLS.map((tool) => {
            const badgeBg = tool.quickBadge?.bg || "bg-slate-100";
            const badgeText = tool.quickBadge?.text || "text-slate-600";

            return (
              <li
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="py-2 flex items-center justify-between hover:bg-stone-50 px-1 rounded cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-md ${badgeBg} ${badgeText} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}
                  >
                    <ToolIcon iconType={tool.iconType} className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    {tool.title}
                  </span>
                </div>
                <svg
                  className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
