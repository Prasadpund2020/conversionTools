"use client";

import React, { useRef, useState } from "react";
import { StagedRedactFile, RedactionBox, RedactOptions } from "./types";

interface Props {
  stagedFile: StagedRedactFile;
  boxes: RedactionBox[];
  activePage: number;
  options: RedactOptions;
  onPageChange: (page: number) => void;
  onAddBox: (box: RedactionBox) => void;
  onRemoveBox: (id: string) => void;
}

export const RedactPdfStage: React.FC<Props> = ({
  stagedFile,
  boxes,
  activePage,
  options,
  onPageChange,
  onAddBox,
  onRemoveBox,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStartPos({ x, y });
    setCurrentPos({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setCurrentPos({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !startPos || !currentPos) {
      setIsDrawing(false);
      return;
    }
    const x = Math.min(startPos.x, currentPos.x);
    const y = Math.min(startPos.y, currentPos.y);
    const width = Math.abs(currentPos.x - startPos.x);
    const height = Math.abs(currentPos.y - startPos.y);

    // Minimum size threshold to prevent accidental clicks
    if (width > 3 && height > 2) {
      onAddBox({
        id: `box-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        page: activePage,
        x,
        y,
        width,
        height,
        style: options.activeStyle,
      });
    }

    setIsDrawing(false);
    setStartPos(null);
    setCurrentPos(null);
  };

  const activePageBoxes = boxes.filter((b) => b.page === activePage);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Stage Toolbar */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-on-surface">{stagedFile.name}</span>
          <span className="text-outline">
            (Page {activePage} of {stagedFile.pageCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-outline text-[11px] hidden sm:inline">
            Drag on document to redact
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              disabled={activePage <= 1}
              onClick={() => onPageChange(activePage - 1)}
              className="w-7 h-7 rounded bg-surface-container hover:bg-surface flex items-center justify-center disabled:opacity-30 cursor-pointer"
            >
              ←
            </button>
            <button
              type="button"
              disabled={activePage >= stagedFile.pageCount}
              onClick={() => onPageChange(activePage + 1)}
              className="w-7 h-7 rounded bg-surface-container hover:bg-surface flex items-center justify-center disabled:opacity-30 cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Paper Canvas with Redaction Overlay */}
      <div className="w-full rounded-3xl bg-surface-container-low p-6 shadow-2xl border border-outline-variant/30 flex flex-col items-center justify-center overflow-hidden">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative w-full max-w-[650px] aspect-[4/3] bg-white rounded-xl shadow-2xl p-6 select-none cursor-crosshair overflow-hidden border border-gray-200"
        >
          {/* Mock Document Content Representation */}
          <div className="flex flex-col gap-4 pointer-events-none">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-800 tracking-wider">
                CONFIDENTIAL RECORD • AUDIT TRANSCRIPT
              </span>
              <span className="text-[10px] font-mono text-gray-400">P. {activePage}</span>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-gray-700 leading-relaxed">
              <p>
                <strong>Patient Subject:</strong> Jonathan Doe (DOB: 11/14/1982)
              </p>
              <p>
                <strong>Social Security Number:</strong> 982-11-4091 (State of Origin: CA)
              </p>
              <p>
                <strong>Email Address:</strong> j.doe.confidential@enterprise.org
              </p>
              <p>
                <strong>Compensation & Banking:</strong> Routing: 021000021 • Account: 4920019284
              </p>
              <p className="text-gray-500 pt-2 text-[11px]">
                Authorized Disclosure Notice: In accordance with standard privacy laws, personal
                identifying numbers, private contact channels, and transaction hashes must remain
                permanently obliterated.
              </p>
            </div>
          </div>

          {/* Render existing redaction boxes */}
          {activePageBoxes.map((box) => (
            <div
              key={box.id}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
              }}
              className={`absolute flex items-center justify-center group ${
                box.style === "whiteout"
                  ? "bg-white border border-gray-300"
                  : "bg-black text-white"
              }`}
            >
              {box.style === "redacted-label" && (
                <span className="text-[9px] font-bold font-mono tracking-widest uppercase select-none">
                  REDACTED
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveBox(box.id);
                }}
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] items-center justify-center hidden group-hover:flex shadow-sm cursor-pointer"
                title="Delete redaction"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Drawing In-Progress Preview Box */}
          {isDrawing && startPos && currentPos && (
            <div
              style={{
                left: `${Math.min(startPos.x, currentPos.x)}%`,
                top: `${Math.min(startPos.y, currentPos.y)}%`,
                width: `${Math.abs(currentPos.x - startPos.x)}%`,
                height: `${Math.abs(currentPos.y - startPos.y)}%`,
              }}
              className="absolute bg-black/80 border border-slate-400 pointer-events-none"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};
