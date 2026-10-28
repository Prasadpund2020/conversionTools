'use client';

import React from 'react';
import Link from 'next/link';

export const JsonCsvHeaderBar: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/all-tools?category=edit-convert"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Edit & Convert Tools
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Bidirectional Data Sync
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          JSON ⟷ CSV / Excel Data Converter
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Convert arrays of JSON objects into tabular CSV or spreadsheet data, or transform CSV files into formatted JSON. 100% private in-browser parsing.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Zero Server Uploads</span>
      </div>
    </div>
  );
};
