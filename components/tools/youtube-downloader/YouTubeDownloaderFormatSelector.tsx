"use client";

import React, { useState } from "react";
import { DownloadTab, YouTubeVideoMetadata } from "./types";
import { downloadAuthorizedMp4 } from "./youtubeEngine";

interface YouTubeDownloaderFormatSelectorProps {
  video: YouTubeVideoMetadata;
  onSelectSample?: (url: string) => void;
}

export default function YouTubeDownloaderFormatSelector({
  video,
  onSelectSample,
}: YouTubeDownloaderFormatSelectorProps) {
  const [activeTab, setActiveTab] = useState<DownloadTab>("video");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadMp4 = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(null);

    try {
      const result = await downloadAuthorizedMp4(video);
      setDownloadSuccess(
        `Successfully retrieved and saved ${result.fileName} (${result.fileSizeFormatted}). Validated MP4 container.`
      );
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Download failed. Please check the media source and try again.";
      setDownloadError(msg);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadThumbnail = async (url: string, quality: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch thumbnail image");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      const sanitized = video.title
        .replace(/[^a-zA-Z0-9_\-\s]/g, "")
        .trim()
        .replace(/\s+/g, "_")
        .slice(0, 60);
      link.download = `${sanitized}_${quality.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    } catch {
      // Fallback: direct window open if CORS restricts direct client fetch
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-3xl bg-white/95 border border-stone-200/80 shadow-xs">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "video"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-stone-600 hover:text-slate-900"
            }`}
          >
            <svg
              className="w-4 h-4 text-amber-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Video (MP4)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("thumbnail")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "thumbnail"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-stone-600 hover:text-slate-900"
            }`}
          >
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Cover Art (JPG)</span>
          </button>
        </div>

        <span className="text-xs font-semibold text-stone-500 hidden sm:inline">
          Official API &amp; Container Validation
        </span>
      </div>

      {/* Tab Content: Video */}
      {activeTab === "video" && (
        <div className="flex flex-col gap-4">
          {downloadSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-emerald-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{downloadSuccess}</span>
              </div>
              <button
                type="button"
                onClick={() => setDownloadSuccess(null)}
                className="text-emerald-600 hover:text-emerald-900 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {downloadError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-rose-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>{downloadError}</span>
              </div>
              <button
                type="button"
                onClick={() => setDownloadError(null)}
                className="text-rose-500 hover:text-rose-800 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {video.hasAuthorizedDownload ? (
            /* Authorized Download Card */
            <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 transition-all">
              <div className="flex items-center gap-3.5">
                <span className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                  MP4
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">
                      Standard MP4 Video Stream
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      Authorized &amp; Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span>Container: ISO Base Media (ftyp)</span>
                    <span className="text-stone-300">•</span>
                    <span>{video.fileSizeFormatted || "Verified Media Stream"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {video.fileSizeFormatted && (
                  <span className="text-xs font-mono font-bold text-slate-700 hidden sm:inline">
                    {video.fileSizeFormatted}
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleDownloadMp4}
                  disabled={isDownloading}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  {isDownloading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Downloading MP4…</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span>Download MP4</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Arbitrary YouTube Video - Informational Notice */
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-900">
                    MP4 Download Notice: Official YouTube API Restriction
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Official YouTube APIs (oEmbed and YouTube Data API) provide video metadata and authorized player embed playback, but do not provide raw downloadable MP4 bytes for arbitrary YouTube videos under YouTube Terms of Service. Direct MP4 downloads are supported only when an authorized downloadable media stream is provided.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-amber-900 font-medium">
                  To test the genuine MP4 download pipeline:
                </span>
                {onSelectSample && (
                  <button
                    type="button"
                    onClick={() =>
                      onSelectSample("https://www.youtube.com/watch?v=test-authorized")
                    }
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all shadow-2xs flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Load Authorized Test Video (CC0 MP4)</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Thumbnails */}
      {activeTab === "thumbnail" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {video.thumbnailFormats.map((thumb) => (
            <div
              key={thumb.quality}
              className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col gap-3"
            >
              <div className="w-full h-36 rounded-xl overflow-hidden bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb.url}
                  alt={thumb.quality}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-800">
                    {thumb.quality}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {thumb.dimensions} • JPEG from YouTube CDN
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadThumbnail(thumb.url, thumb.quality)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs transition-all active:scale-95"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Save JPG</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
