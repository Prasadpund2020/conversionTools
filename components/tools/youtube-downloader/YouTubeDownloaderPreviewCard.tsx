"use client";

import React, { useState } from "react";
import { YouTubeVideoMetadata } from "./types";

interface YouTubeDownloaderPreviewCardProps {
  video: YouTubeVideoMetadata;
}

export default function YouTubeDownloaderPreviewCard({
  video,
}: YouTubeDownloaderPreviewCardProps) {
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-3xl bg-white/95 border border-stone-200/80 shadow-xs">
      {/* Thumbnail or Interactive Player */}
      <div className="relative w-full sm:w-72 sm:min-w-[280px] h-44 rounded-2xl overflow-hidden bg-stone-900 shrink-0 group">
        {showEmbed && video.embedHtml ? (
          <div
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
            dangerouslySetInnerHTML={{ __html: video.embedHtml }}
          />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt={video.title}
              onError={(e) => {
                if (video.thumbnailFallback && e.currentTarget.src !== video.thumbnailFallback) {
                  e.currentTarget.src = video.thumbnailFallback;
                }
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Play button overlay to trigger player */}
            {video.embedHtml ? (
              <button
                type="button"
                onClick={() => setShowEmbed(true)}
                title="Play Video Preview"
                className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                  <svg
                    className="w-6 h-6 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            ) : (
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </a>
            )}
          </>
        )}
      </div>

      {/* Video Details */}
      <div className="flex flex-col justify-between py-0.5 min-w-0 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            {video.hasAuthorizedDownload ? (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Authorized Media Stream
              </span>
            ) : (
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                Official YouTube Metadata (oEmbed)
              </span>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-snug line-clamp-2">
            {video.title}
          </h2>

          <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600">
            {video.channelUrl ? (
              <a
                href={video.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1 transition-colors"
              >
                <span>{video.channelTitle}</span>
                <svg
                  className="w-3.5 h-3.5 text-blue-500 inline"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </a>
            ) : (
              <span className="font-semibold text-slate-900">
                {video.channelTitle}
              </span>
            )}
            <span className="text-stone-300">•</span>
            <span className="text-stone-500 font-mono text-[11px]">ID: {video.id}</span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            {video.authorizationMessage}
          </p>
        </div>

        {/* Action / Source Link */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-2">
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open on YouTube</span>
          </a>

          {video.embedHtml && !showEmbed && (
            <button
              type="button"
              onClick={() => setShowEmbed(true)}
              className="text-xs font-semibold text-stone-600 hover:text-slate-900 underline cursor-pointer"
            >
              Embed Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
