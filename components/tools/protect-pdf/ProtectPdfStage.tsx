"use client";

import React from "react";
import { StagedProtectFile, ProtectOptions } from "./types";
import { formatBytes } from "./protectPdfEngine";

interface Props {
  stagedFile: StagedProtectFile;
  options: ProtectOptions;
}

export const ProtectPdfStage: React.FC<Props> = ({
  stagedFile,
  options,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* File Overview Bar */}
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl border border-outline-variant/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center text-xl font-bold">
            📄
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">{stagedFile.name}</h4>
            <p className="text-outline text-[11px]">
              {stagedFile.pageCount} Pages • {formatBytes(stagedFile.size)}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-700 dark:text-red-300 font-bold text-xs">
          Ready for Encryption
        </span>
      </div>

      {/* Security Vault Presentation Board */}
      <div className="w-full rounded-3xl bg-surface-container-low p-8 shadow-2xl border border-outline-variant/30 flex flex-col items-center justify-center gap-6 text-center relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute w-72 h-72 rounded-full bg-red-500/5 blur-3xl pointer-events-none"></div>

        {/* Lock Vault Icon */}
        <div className="w-24 h-24 rounded-3xl bg-[#b91c1c] text-white flex items-center justify-center shadow-[0_12px_28px_rgba(185,28,28,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]">
          <span className="text-5xl">🔒</span>
        </div>

        <div className="flex flex-col gap-1.5 max-w-md">
          <h3 className="text-xl font-extrabold text-on-surface">
            {options.userPassword ? "Document Protected with Password" : "Enter Password to Arm Encryption"}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            The document will be encrypted with standard{" "}
            {options.encryptionStrength === "standard-rc4" ? "128-bit RC4" : "256-bit AES"}{" "}
            security handlers. Without the correct password, Adobe Acrobat, Apple Preview, and modern web browsers will block opening.
          </p>
        </div>

        {/* Active Policy Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-on-surface shadow-inner">
            Cipher: {options.encryptionStrength === "standard-rc4" ? "RC4 128-Bit (ISO 32000-1)" : "AES-256 (ISO 32000-2)"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-inner ${
              options.allowPrinting
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            {options.allowPrinting ? "Printing: Allowed" : "Printing: Blocked"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-inner ${
              options.allowCopying
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            {options.allowCopying ? "Copying: Allowed" : "Copying: Blocked"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-inner ${
              options.allowModifying
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            {options.allowModifying ? "Modifying: Allowed" : "Modifying: Blocked"}
          </span>
        </div>
      </div>
    </div>
  );
};
