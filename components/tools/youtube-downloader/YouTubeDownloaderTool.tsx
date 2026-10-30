"use client";

import React, { useState } from "react";
import YouTubeDownloaderHeaderBar from "./YouTubeDownloaderHeaderBar";
import YouTubeDownloaderUrlInput from "./YouTubeDownloaderUrlInput";
import YouTubeDownloaderPreviewCard from "./YouTubeDownloaderPreviewCard";
import YouTubeDownloaderFormatSelector from "./YouTubeDownloaderFormatSelector";
import YouTubeDownloaderTips from "./YouTubeDownloaderTips";
import { SampleVideoItem } from "./sampleVideos";
import { YouTubeVideoMetadata } from "./types";
import { resolveYouTubeVideo } from "./youtubeEngine";

export default function YouTubeDownloaderTool() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState<YouTubeVideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFetchVideo = async (inputUrl: string) => {
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const resolved = await resolveYouTubeVideo(inputUrl);
      setVideo(resolved);
      setUrl(resolved.url);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not fetch video. Please check the URL format and try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: SampleVideoItem) => {
    setUrl(sample.url);
    handleFetchVideo(sample.url);
  };

  const handlePasteFromClipboard = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text);
          handleFetchVideo(text);
        }
      }
    } catch {
      setErrorMessage("Could not access system clipboard. Please paste manually into the input box.");
    }
  };

  const handleReset = () => {
    setUrl("");
    setVideo(null);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Workspace Top Header Bar */}
      <YouTubeDownloaderHeaderBar
        hasVideo={Boolean(video)}
        onPasteFromClipboard={handlePasteFromClipboard}
        onReset={handleReset}
      />

      {/* URL Input Bar & Instant Verification Chips */}
      <YouTubeDownloaderUrlInput
        url={url}
        onChangeUrl={setUrl}
        onSubmit={handleFetchVideo}
        onSelectSample={handleSelectSample}
        isLoading={isLoading}
      />

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold flex items-center justify-between max-w-4xl mx-auto w-full shadow-2xs">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 shrink-0 text-rose-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-rose-500 hover:text-rose-800 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Preview Card & Format Selectors */}
      {video && (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <YouTubeDownloaderPreviewCard video={video} />
          <YouTubeDownloaderFormatSelector
            video={video}
            onSelectSample={(sampleUrl) => {
              setUrl(sampleUrl);
              handleFetchVideo(sampleUrl);
            }}
          />
        </div>
      )}

      {/* Feature & Security Tips */}
      <div className="max-w-4xl mx-auto w-full mt-2">
        <YouTubeDownloaderTips />
      </div>
    </div>
  );
}
