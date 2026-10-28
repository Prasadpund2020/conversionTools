'use client';

import React from 'react';
import Link from 'next/link';

export const Base64ConverterHeaderBar: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/all-tools?category=more"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            More Utility Tools
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Binary ⟷ ASCII Data URIs
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Base64 File & Image Encoder / Decoder
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Encode any file, image, or PDF into Base64 strings & Data URIs for HTML/CSS embedding, or decode Base64 strings back into downloadable files.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>100% Client-Side Encoding</span>
      </div>
    </div>
  );
};
