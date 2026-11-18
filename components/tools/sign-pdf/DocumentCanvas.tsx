"use client";

import React, { useEffect, useRef, useState } from "react";
import { DocumentInfo, SignaturePlacement } from "./types";

interface DocumentCanvasProps {
  doc: DocumentInfo;
  currentPage: number;
  zoomLevel: number;
  signerName: string;
  signerTitle: string;
  signingDate: string;
  typedSignature: string;
  selectedInkColor: string;
  isSignaturePlaced: boolean;
  signaturePlacement: SignaturePlacement;
  onUpdatePlacement: (placement: SignaturePlacement) => void;
  onPlaceSignature: () => void;
  onRemoveSignature: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function DocumentCanvas({
  doc,
  currentPage,
  zoomLevel,
  signerName,
  signingDate,
  typedSignature,
  selectedInkColor,
  isSignaturePlaced,
  signaturePlacement,
  onUpdatePlacement,
  onPlaceSignature,
  onRemoveSignature,
}: DocumentCanvasProps) {
  const pdfRenderCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  const currentRenderTaskRef = useRef<{ cancel: () => void } | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!doc || (!doc.arrayBuffer && !doc.file)) return;

      try {
        if (currentRenderTaskRef.current) {
          try {
            currentRenderTaskRef.current.cancel();
          } catch {
            // ignore
          }
          currentRenderTaskRef.current = null;
        }

        setIsPdfRendering(true);
        setRenderError(null);

        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";

        const freshBuffer = doc.file
          ? await doc.file.arrayBuffer()
          : doc.arrayBuffer!.slice(0);

        if (isCancelled) return;

        const loadingTask = pdfjs.getDocument({
          data: new Uint8Array(freshBuffer),
          cMapUrl: "/pdfjs/cmaps/",
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = pdfRenderCanvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderTask = page.render({
          canvasContext: context,
          viewport,
          canvas,
        });

        currentRenderTaskRef.current = renderTask;
        await renderTask.promise;

        if (!isCancelled) {
          setIsPdfRendering(false);
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "RenderingCancelledException") return;
        console.error("PDF render error:", err);
        if (!isCancelled) {
          setRenderError("Could not render this page preview.");
          setIsPdfRendering(false);
        }
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (currentRenderTaskRef.current) {
        try {
          currentRenderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [doc, currentPage]);

  return (
    <div className="relative w-full max-w-[700px] bg-[#e6dfd5] rounded-3xl p-4 sm:p-6 shadow-xl flex flex-col items-center border border-[#d6cec2]">
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 rounded-full shadow-md flex items-center justify-center z-20 border-t border-white/40">
        <div className="w-20 h-1.5 rounded-full bg-stone-300 shadow-inner" />
      </div>

      <div
        className="w-full bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col text-stone-900 relative transition-transform duration-200 min-h-[640px]"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
      >
        <div className="relative w-full flex flex-col items-center">
          {isPdfRendering && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-10 rounded-xl">
              <span className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2" />
              <span className="text-xs font-semibold text-stone-600">
                Rendering Page {currentPage}...
              </span>
            </div>
          )}

          {renderError ? (
            <div className="w-full p-8 text-center text-stone-500 bg-stone-50 rounded-xl border border-stone-200">
              <p className="text-sm font-bold text-stone-700 mb-1">{doc.fileName}</p>
              <p className="text-xs text-stone-500">
                Page {currentPage} of {doc.pageCount} ready for signature placement.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-hidden rounded-xl border border-stone-200 shadow-xs relative">
              <canvas ref={pdfRenderCanvasRef} className="w-full h-auto block" />

              <div
                className="absolute inset-0 cursor-crosshair"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  const yPercent = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                  onUpdatePlacement({ x: xPercent, y: yPercent, page: currentPage });
                  if (!isSignaturePlaced) {
                    onPlaceSignature();
                  }
                }}
              >
                {isSignaturePlaced && signaturePlacement.page === currentPage && (
                  <div
                    style={{
                      left: `${Math.min(75, Math.max(5, signaturePlacement.x))}%`,
                      top: `${Math.min(85, Math.max(5, signaturePlacement.y))}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="absolute z-20 bg-white/95 rounded-xl p-2.5 shadow-lg border border-emerald-500/70 flex items-center justify-between gap-2 cursor-grab active:cursor-grabbing backdrop-blur-xs animate-in fade-in"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-8 flex items-center font-serif text-base font-black italic tracking-wide text-stone-900 px-1"
                        style={{ color: selectedInkColor }}
                      >
                        {typedSignature || signerName}
                      </div>
                      <div className="flex flex-col text-[9px] text-stone-400">
                        <span className="font-bold text-stone-800">{signerName}</span>
                        <span>{signingDate}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSignature();
                      }}
                      className="w-5 h-5 rounded-full hover:bg-rose-50 text-stone-400 hover:text-rose-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                      title="Remove signature"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="w-full mt-4 p-3 bg-stone-50 border border-stone-200/80 rounded-xl flex items-center justify-between text-xs text-stone-600">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 font-bold">ℹ Tip:</span> Click anywhere on the
              document to position your signature stamp.
            </span>
            <span className="font-semibold text-stone-800">
              Page {currentPage} of {doc.pageCount}
            </span>
          </div>
        </div>
      </div>

      <div className="w-[96%] h-2 bg-[#dcd4c8] rounded-b-xl shadow-xs -mt-0.5" />
      <div className="w-[92%] h-1.5 bg-[#d4cbbd] rounded-b-xl shadow-xs -mt-0.5" />
    </div>
  );
}
