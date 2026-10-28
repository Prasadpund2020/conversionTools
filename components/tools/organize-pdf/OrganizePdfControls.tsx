"use client";

import React from "react";

interface Props {
  pageCount: number;
  isProcessing: boolean;
  onRotateAll: () => void;
  onReverseOrder: () => void;
  onResetOrder: () => void;
  onSave: () => void;
}

export const OrganizePdfControls: React.FC<Props> = ({
  pageCount,
  isProcessing,
  onRotateAll,
  onReverseOrder,
  onResetOrder,
  onSave,
}) => {
  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#9333ea] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Page Actions
        </h3>

        {/* Mass Actions */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onRotateAll}
            className="w-full py-2.5 px-3 rounded-xl bg-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold text-on-surface flex items-center justify-between cursor-pointer transition-all shadow-sm"
          >
            <span className="flex items-center gap-2">
              <span>⟳</span>
              <span>Rotate All Pages 90°</span>
            </span>
            <span className="text-[10px] text-outline font-mono">+90°</span>
          </button>

          <button
            type="button"
            onClick={onReverseOrder}
            className="w-full py-2.5 px-3 rounded-xl bg-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold text-on-surface flex items-center justify-between cursor-pointer transition-all shadow-sm"
          >
            <span className="flex items-center gap-2">
              <span>🔄</span>
              <span>Reverse Page Sequence</span>
            </span>
            <span className="text-[10px] text-outline font-mono">Last to First</span>
          </button>

          <button
            type="button"
            onClick={onResetOrder}
            className="w-full py-2.5 px-3 rounded-xl bg-surface hover:bg-surface-container-high border border-outline-variant/30 text-xs font-semibold text-on-surface-variant hover:text-on-surface flex items-center justify-between cursor-pointer transition-all shadow-sm"
          >
            <span className="flex items-center gap-2">
              <span>↺</span>
              <span>Reset to Original Order</span>
            </span>
            <span className="text-[10px] text-outline font-mono">Restore</span>
          </button>
        </div>

        {/* Document Stats */}
        <div className="p-3 rounded-xl bg-surface-container shadow-inner flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-semibold">Total Pages to Save:</span>
          <span className="font-mono font-bold text-[#9333ea]">{pageCount}</span>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onSave}
          disabled={pageCount === 0 || isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(147,51,234,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#9333ea] hover:bg-[#7e22ce] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>💾</span>
            <span>{isProcessing ? "Synthesizing PDF..." : "Save & Download PDF"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
