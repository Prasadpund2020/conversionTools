"use client";

import React from "react";
import { StagedOrganizeFile, PageCardItem } from "./types";
import { formatBytes } from "./organizePdfEngine";

interface Props {
  stagedFile: StagedOrganizeFile;
  pages: PageCardItem[];
  onRotatePage: (id: string) => void;
  onMovePage: (index: number, direction: "left" | "right") => void;
  onDuplicatePage: (id: string) => void;
  onDeletePage: (id: string) => void;
}

export const OrganizePdfStage: React.FC<Props> = ({
  stagedFile,
  pages,
  onRotatePage,
  onMovePage,
  onDuplicatePage,
  onDeletePage,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* File Overview Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="text-xl">📑</span>
          <div>
            <h4 className="font-bold text-on-surface">{stagedFile.name}</h4>
            <p className="text-[11px] text-outline">
              Original: {stagedFile.pageCount} pgs • Current: {pages.length} pgs ({formatBytes(stagedFile.size)})
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold text-xs">
          Interactive Page Organizer
        </span>
      </div>

      {/* Pages Grid */}
      <div className="w-full rounded-3xl bg-surface-container-low p-6 shadow-2xl border border-outline-variant/30">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-outline-variant/20 text-xs">
          <span className="font-bold text-on-surface">Drag, Rotate, or Reorder Pages</span>
          <span className="text-outline text-[11px]">Hover over card for actions</span>
        </div>

        {pages.length === 0 ? (
          <div className="p-8 text-center text-xs text-outline">
            All pages deleted. Use &quot;Reset to Original Order&quot; in the sidebar to restore.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {pages.map((p, index) => (
              <div
                key={p.id}
                className="group relative rounded-2xl bg-white text-gray-900 shadow-md p-3 flex flex-col justify-between aspect-[3/4] border border-outline-variant/30 transition-all hover:shadow-xl hover:border-purple-500"
              >
                {/* Header: Page Badge & Delete Button */}
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono font-bold">
                    #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => onDeletePage(p.id)}
                    className="w-5 h-5 rounded-full bg-red-100 hover:bg-red-500 text-red-600 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                    title="Delete page"
                  >
                    ✕
                  </button>
                </div>

                {/* Thumbnail Canvas Representation with Rotation */}
                <div
                  style={{ transform: `rotate(${p.rotation}deg)` }}
                  className="my-auto mx-auto w-4/5 aspect-[3/4] bg-gray-50 rounded-lg border border-gray-200 flex flex-col justify-between p-2 shadow-inner transition-transform duration-300"
                >
                  <div className="w-8 h-1 bg-gray-300 rounded"></div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-gray-200 rounded"></div>
                    <div className="w-4/5 h-1 bg-gray-200 rounded"></div>
                    <div className="w-3/5 h-1 bg-gray-200 rounded"></div>
                  </div>
                  <div className="text-[8px] text-gray-400 font-mono text-center">
                    Original P.{p.displayPageNumber}
                  </div>
                </div>

                {/* Action Bar at bottom of card */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  {/* Left / Right arrows */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => onMovePage(index, "left")}
                      className="w-5 h-5 rounded bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 disabled:opacity-30 flex items-center justify-center cursor-pointer text-[10px]"
                      title="Move earlier"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      disabled={index === pages.length - 1}
                      onClick={() => onMovePage(index, "right")}
                      className="w-5 h-5 rounded bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 disabled:opacity-30 flex items-center justify-center cursor-pointer text-[10px]"
                      title="Move later"
                    >
                      →
                    </button>
                  </div>

                  {/* Rotate / Duplicate */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onRotatePage(p.id)}
                      className="w-5 h-5 rounded bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 flex items-center justify-center cursor-pointer text-[11px]"
                      title="Rotate 90° clockwise"
                    >
                      ⟳
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicatePage(p.id)}
                      className="w-5 h-5 rounded bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 flex items-center justify-center cursor-pointer text-[11px]"
                      title="Duplicate page"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
