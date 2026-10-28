"use client";

import React, { useRef } from "react";
import { WatermarkOptions, WatermarkPosition, WatermarkFont } from "./types";

interface Props {
  options: WatermarkOptions;
  totalPages: number;
  isProcessing: boolean;
  onOptionsChange: (newOptions: WatermarkOptions) => void;
  onApply: () => void;
}

const COLOR_PRESETS = [
  { name: "Alert Red", hex: "#dc2626" },
  { name: "Carbon Black", hex: "#1e1b1a" },
  { name: "Navy Blue", hex: "#006591" },
  { name: "Emerald Green", hex: "#023b2c" },
  { name: "Olive Ochre", hex: "#b45309" },
];

const POSITIONS: { id: WatermarkPosition; label: string }[] = [
  { id: "top-left", label: "Top Left" },
  { id: "top-center", label: "Top Center" },
  { id: "top-right", label: "Top Right" },
  { id: "middle-left", label: "Middle Left" },
  { id: "center", label: "Center" },
  { id: "middle-right", label: "Middle Right" },
  { id: "bottom-left", label: "Bottom Left" },
  { id: "bottom-center", label: "Bottom Center" },
  { id: "bottom-right", label: "Bottom Right" },
];

export const WatermarkPdfControls: React.FC<Props> = ({
  options,
  totalPages,
  isProcessing,
  onOptionsChange,
  onApply,
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onOptionsChange({
          ...options,
          type: "image",
          imageFile: file,
          imageDataUrl: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 relative border border-outline-variant/30">
        {/* Metal Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#023b2c] to-transparent mx-auto rounded-full"></div>

        {/* Mode Switcher Tabs */}
        <div className="w-full grid grid-cols-2 p-1 bg-surface-container rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => onOptionsChange({ ...options, type: "text" })}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              options.type === "text"
                ? "bg-[#023b2c] text-white shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>📝</span>
            <span>Text Watermark</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (!options.imageDataUrl) {
                logoInputRef.current?.click();
              } else {
                onOptionsChange({ ...options, type: "image" });
              }
            }}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              options.type === "image"
                ? "bg-[#023b2c] text-white shadow-md"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>🖼️</span>
            <span>Logo / Image</span>
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>

        {options.type === "text" ? (
          <>
            {/* Watermark Inscription */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Watermark Inscription
              </label>
              <input
                type="text"
                value={options.text}
                onChange={(e) => onOptionsChange({ ...options, text: e.target.value })}
                placeholder="e.g. CONFIDENTIAL"
                className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-sm font-semibold tracking-wide border border-outline-variant/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#023b2c]"
              />
            </div>

            {/* Typography & Color */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Typeface
                </label>
                <select
                  value={options.font}
                  onChange={(e) =>
                    onOptionsChange({ ...options, font: e.target.value as WatermarkFont })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
                >
                  <option value="Helvetica">Bold Sans</option>
                  <option value="TimesRoman">Editorial Serif</option>
                  <option value="Courier">Tech Monospace</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Stamp Color
                </label>
                <div className="flex items-center gap-1.5 bg-surface p-1.5 rounded-xl border border-outline-variant/40 shadow-inner justify-between">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.hex}
                      type="button"
                      title={p.name}
                      onClick={() => onOptionsChange({ ...options, color: p.hex })}
                      style={{ backgroundColor: p.hex }}
                      className={`w-5 h-5 rounded-full cursor-pointer transition-transform ${
                        options.color === p.hex ? "ring-2 ring-primary scale-110 shadow-sm" : ""
                      }`}
                    />
                  ))}
                  <input
                    type="color"
                    value={options.color}
                    onChange={(e) => onOptionsChange({ ...options, color: e.target.value })}
                    className="w-5 h-5 rounded cursor-pointer border-0 bg-transparent p-0"
                    title="Custom color"
                  />
                </div>
              </div>
            </div>

            {/* Font Size Slider */}
            <div className="flex flex-col gap-1.5 bg-surface-container p-3 rounded-xl shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                  Font Size
                </span>
                <span className="text-xs font-bold text-primary font-mono">{options.fontSize} pt</span>
              </div>
              <input
                type="range"
                min="18"
                max="96"
                value={options.fontSize}
                onChange={(e) =>
                  onOptionsChange({ ...options, fontSize: parseInt(e.target.value, 10) })
                }
                className="w-full accent-[#023b2c] cursor-pointer"
              />
            </div>
          </>
        ) : (
          /* Logo controls */
          <div className="flex flex-col gap-2 bg-surface-container p-3 rounded-xl shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface">Selected Graphic</span>
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Change Image
              </button>
            </div>
            {options.imageDataUrl ? (
              <div className="w-full h-24 rounded-lg bg-surface flex items-center justify-center p-2 overflow-hidden border border-outline-variant/30">
                <img
                  src={options.imageDataUrl}
                  alt="Watermark preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="w-full py-4 rounded-lg border-2 border-dashed border-outline-variant text-xs text-on-surface-variant hover:border-primary"
              >
                Upload PNG or JPEG Graphic
              </button>
            )}
          </div>
        )}

        {/* Stamp Opacity */}
        <div className="flex flex-col gap-1.5 bg-surface-container p-3 rounded-xl shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Stamp Opacity
            </span>
            <span className="text-xs font-bold text-secondary font-mono">
              {Math.round(options.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={Math.round(options.opacity * 100)}
            onChange={(e) =>
              onOptionsChange({ ...options, opacity: parseInt(e.target.value, 10) / 100 })
            }
            className="w-full accent-amber-600 cursor-pointer"
          />
        </div>

        {/* Rotation Presets */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Angle & Orientation
            </label>
            <span className="text-xs font-mono text-on-surface">{options.rotation}°</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "-45° Diagonal", value: -45, icon: "↗" },
              { label: "0° Flat", value: 0, icon: "→" },
              { label: "90° Vertical", value: 90, icon: "↑" },
            ].map((ang) => (
              <button
                key={ang.value}
                type="button"
                onClick={() => onOptionsChange({ ...options, rotation: ang.value })}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-0.5 cursor-pointer transition-all ${
                  options.rotation === ang.value
                    ? "bg-[#023b2c] text-white shadow-sm font-bold"
                    : "bg-surface text-on-surface-variant hover:text-on-surface shadow-inner"
                }`}
              >
                <span className="text-sm">{ang.icon}</span>
                <span className="text-[10px]">{ang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layer Depth & 3x3 Placement Grid */}
        <div className="grid grid-cols-12 gap-3 items-center">
          <div className="col-span-6 flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Layer Depth
            </span>
            <div className="flex flex-col gap-1 bg-surface p-1 rounded-xl border border-outline-variant/40 shadow-inner">
              <label className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-surface-container text-xs">
                <input
                  type="radio"
                  name="layer"
                  checked={options.layer === "front"}
                  onChange={() => onOptionsChange({ ...options, layer: "front" })}
                  className="accent-[#023b2c]"
                />
                <span className="font-semibold text-on-surface">Over Content</span>
              </label>
              <label className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-surface-container text-xs">
                <input
                  type="radio"
                  name="layer"
                  checked={options.layer === "behind"}
                  onChange={() => onOptionsChange({ ...options, layer: "behind" })}
                  className="accent-[#023b2c]"
                />
                <span className="text-on-surface-variant">Underneath</span>
              </label>
            </div>
          </div>

          {/* 3x3 Grid */}
          <div className="col-span-6 flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant text-center">
              Grid Placement
            </span>
            <div className="grid grid-cols-3 gap-1 bg-surface-container p-2 rounded-xl shadow-inner w-24 mx-auto aspect-square items-center justify-items-center">
              {POSITIONS.map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  title={pos.label}
                  onClick={() => onOptionsChange({ ...options, position: pos.id })}
                  className={`w-5 h-5 rounded transition-all cursor-pointer ${
                    options.position === pos.id
                      ? "bg-[#023b2c] ring-2 ring-[#023b2c]/30 shadow-sm"
                      : "bg-surface hover:bg-surface-container-high"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tiling Checkbox */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-outline-variant/40 shadow-inner">
          <label className="flex items-center gap-2 text-xs font-semibold text-on-surface cursor-pointer">
            <input
              type="checkbox"
              checked={options.tiled}
              onChange={(e) => onOptionsChange({ ...options, tiled: e.target.checked })}
              className="w-4 h-4 rounded accent-[#023b2c]"
            />
            <span>Repeat pattern across entire page</span>
          </label>
          <span className="text-xs">⊞</span>
        </div>

        {/* Page Range */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface-variant uppercase tracking-wider text-[11px]">
              Apply to Pages
            </span>
            <span className="text-outline">Total: {totalPages}</span>
          </div>
          <input
            type="text"
            value={options.pagesRange}
            onChange={(e) => onOptionsChange({ ...options, pagesRange: e.target.value })}
            placeholder="all or e.g. 1-3, 5"
            className="w-full px-3 py-1.5 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none"
          />
        </div>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={onApply}
          disabled={isProcessing}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(2,59,44,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#023b2c] hover:bg-[#034d3a] active:translate-y-0.5 cursor-pointer disabled:opacity-50"
        >
          <span className="flex items-center gap-2">
            <span>🛡️</span>
            <span>{isProcessing ? "Stamping Document..." : "Apply Watermark & Download"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
