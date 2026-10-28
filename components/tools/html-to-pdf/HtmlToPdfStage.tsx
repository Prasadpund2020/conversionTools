"use client";

import React from "react";
import { StagedHtmlInput, HtmlToPdfOptions } from "./types";

interface Props {
  stagedInput: StagedHtmlInput;
  options: HtmlToPdfOptions;
}

export const HtmlToPdfStage: React.FC<Props> = ({
  stagedInput,
  options,
}) => {
  const isLandscape = options.orientation === "landscape";

  return (
    <div className="w-full flex flex-col gap-4">
      {/* File Overview Card */}
      <div className="w-full rounded-2xl bg-surface-container-low p-4 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌐</span>
          <div>
            <h4 className="font-bold text-on-surface">{stagedInput.name}</h4>
            <p className="text-[11px] text-outline">
              Target Paper: {options.paperSize.toUpperCase()} • {options.orientation}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-700 dark:text-orange-300 font-bold text-xs">
          Live HTML Stage
        </span>
      </div>

      {/* Sandboxed HTML Paper Preview Canvas */}
      <div className="w-full rounded-3xl bg-surface-container-low p-6 shadow-2xl border border-outline-variant/30 flex flex-col items-center justify-center overflow-hidden">
        <div
          className={`w-full max-w-[650px] bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 transition-all ${
            isLandscape ? "aspect-[16/10]" : "aspect-[1/1.414]"
          }`}
        >
          <iframe
            title="HTML Preview Stage"
            sandbox="allow-same-origin"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8" />
                  <style>
                    body {
                      margin: 0;
                      padding: ${options.margins === "narrow" ? "16px" : options.margins === "none" ? "0" : "32px"};
                      font-family: system-ui, -apple-system, sans-serif;
                      background: ${options.includeBackground ? "#ffffff" : "#fafafa"};
                      color: #111827;
                      line-height: 1.5;
                    }
                  </style>
                </head>
                <body>
                  ${stagedInput.rawHtml}
                </body>
              </html>
            `}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
