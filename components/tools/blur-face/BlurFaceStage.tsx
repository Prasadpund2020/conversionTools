'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CensorRegion, StagedImageFile, BlurFaceOptions } from './types';
import { renderCensoredCanvas } from './blurFaceEngine';

interface BlurFaceStageProps {
  stagedFile: StagedImageFile;
  options: BlurFaceOptions;
  regions: CensorRegion[];
  onAddRegion: (region: CensorRegion) => void;
  onRemoveRegion: (id: string) => void;
}

export const BlurFaceStage: React.FC<BlurFaceStageProps> = ({
  stagedFile,
  options,
  regions,
  onAddRegion,
  onRemoveRegion,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);

  const redraw = useCallback(() => {
    const canvas = displayCanvasRef.current;
    if (!canvas || !stagedFile.imageElement) return;

    const rendered = renderCensoredCanvas(stagedFile.imageElement, regions);

    canvas.width = rendered.width;
    canvas.height = rendered.height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(rendered, 0, 0);

      if (isDrawing && startPos && currentPos) {
        const x1 = Math.min(startPos.x, currentPos.x) * canvas.width;
        const y1 = Math.min(startPos.y, currentPos.y) * canvas.height;
        const w = Math.abs(currentPos.x - startPos.x) * canvas.width;
        const h = Math.abs(currentPos.y - startPos.y) * canvas.height;

        ctx.save();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = Math.max(2, canvas.width / 300);
        ctx.setLineDash([6, 6]);

        if (options.activeShape === 'ellipse') {
          ctx.beginPath();
          ctx.ellipse(x1 + w / 2, y1 + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.strokeRect(x1, y1, w, h);
        }
        ctx.restore();
      }
    }
  }, [stagedFile.imageElement, regions, isDrawing, startPos, currentPos, options.activeShape]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const getNormalizedCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = displayCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const coords = getNormalizedCoords(e);
    setIsDrawing(true);
    setStartPos(coords);
    setCurrentPos(coords);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const coords = getNormalizedCoords(e);
    setCurrentPos(coords);
  };

  const handleMouseUp = () => {
    if (!isDrawing || !startPos || !currentPos) {
      setIsDrawing(false);
      return;
    }

    const minX = Math.min(startPos.x, currentPos.x);
    const minY = Math.min(startPos.y, currentPos.y);
    const width = Math.abs(currentPos.x - startPos.x);
    const height = Math.abs(currentPos.y - startPos.y);

    if (width > 0.01 && height > 0.01) {
      const newRegion: CensorRegion = {
        id: Math.random().toString(36).substring(7),
        x: minX,
        y: minY,
        width,
        height,
        mode: options.activeMode,
        shape: options.activeShape,
        intensity: options.intensity,
      };
      onAddRegion(newRegion);
    }

    setIsDrawing(false);
    setStartPos(null);
    setCurrentPos(null);
  };

  return (
    <div className="clay-card p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🛡️</span>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate max-w-[280px]">
            {stagedFile.name}
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300">
          {stagedFile.width} × {stagedFile.height} px
        </span>
      </div>

      {/* Interactive Drag Canvas Box */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative w-full rounded-xl overflow-hidden bg-slate-950/90 flex items-center justify-center cursor-crosshair select-none shadow-inner min-h-[350px] p-2"
      >
        <canvas
          ref={displayCanvasRef}
          className="max-h-[600px] w-auto max-w-full object-contain rounded-lg shadow-lg pointer-events-none"
        />

        {/* Existing region delete tags */}
        <div className="absolute inset-0 pointer-events-none">
          {displayCanvasRef.current &&
            regions.map((region) => {
              const canvasRect = displayCanvasRef.current?.getBoundingClientRect();
              const containerRect = containerRef.current?.getBoundingClientRect();
              if (!canvasRect || !containerRect) return null;

              const canvasLeft = canvasRect.left - containerRect.left;
              const canvasTop = canvasRect.top - containerRect.top;

              const left = canvasLeft + region.x * canvasRect.width;
              const top = canvasTop + region.y * canvasRect.height;

              return (
                <div
                  key={region.id}
                  style={{
                    position: 'absolute',
                    left: `${left}px`,
                    top: `${top}px`,
                  }}
                  className="pointer-events-auto transform -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveRegion(region.id);
                    }}
                    title="Remove censor box"
                    className="w-5 h-5 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md hover:scale-110 active:scale-95 transition-all"
                  >
                    ×
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>Click and drag over faces or sensitive info</span>
        <span>Click the red <strong>×</strong> to remove any box</span>
      </div>
    </div>
  );
};
