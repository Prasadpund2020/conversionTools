"use client";

import React, { useState } from "react";
import { ProtectOptions } from "./types";
import { evaluatePasswordStrength } from "./protectPdfEngine";

interface Props {
  options: ProtectOptions;
  isProcessing: boolean;
  onOptionsChange: (newOptions: ProtectOptions) => void;
  onProtect: () => void;
}

export const ProtectPdfControls: React.FC<Props> = ({
  options,
  isProcessing,
  onOptionsChange,
  onProtect,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const strength = evaluatePasswordStrength(options.userPassword);
  const passwordsMatch = options.userPassword === options.confirmPassword;
  const canSubmit = options.userPassword.length > 0 && passwordsMatch && !isProcessing;

  return (
    <aside className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl bg-surface-container-low p-5 shadow-xl flex flex-col gap-4 border border-outline-variant/30">
        {/* Accent Bar */}
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent mx-auto rounded-full"></div>

        <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Security Configuration
        </h3>

        {/* Password Inputs */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Document Open Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-primary hover:underline cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={options.userPassword}
              onChange={(e) => onOptionsChange({ ...options, userPassword: e.target.value })}
              placeholder="Enter strong password"
              className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border border-outline-variant/40 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
            />

            {/* Password Strength Meter */}
            {options.userPassword && (
              <div className="flex flex-col gap-1 pt-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-on-surface-variant">Strength:</span>
                  <span style={{ color: strength.color }} className="font-bold">
                    {strength.label}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${strength.score}%`,
                      backgroundColor: strength.color,
                    }}
                    className="h-full rounded-full transition-all duration-300"
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={options.confirmPassword}
              onChange={(e) => onOptionsChange({ ...options, confirmPassword: e.target.value })}
              placeholder="Repeat password"
              className={`w-full px-3 py-2 rounded-xl bg-surface text-on-surface text-xs font-semibold border shadow-inner focus:outline-none ${
                options.confirmPassword && !passwordsMatch
                  ? "border-red-500 focus:ring-2 focus:ring-red-500"
                  : "border-outline-variant/40 focus:ring-2 focus:ring-[#b91c1c]"
              }`}
            />
            {options.confirmPassword && !passwordsMatch && (
              <span className="text-[11px] text-red-500 font-semibold">Passwords do not match.</span>
            )}
          </div>
        </div>

        {/* Permissions Bitmask Section */}
        <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
            Reader Permissions
          </span>

          <label className="flex items-center justify-between p-2 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <span className="flex items-center gap-2">
              <span>🖨️</span>
              <span>Allow Printing</span>
            </span>
            <input
              type="checkbox"
              checked={options.allowPrinting}
              onChange={(e) => onOptionsChange({ ...options, allowPrinting: e.target.checked })}
              className="accent-[#b91c1c]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <span className="flex items-center gap-2">
              <span>📋</span>
              <span>Allow Text & Graphic Copying</span>
            </span>
            <input
              type="checkbox"
              checked={options.allowCopying}
              onChange={(e) => onOptionsChange({ ...options, allowCopying: e.target.checked })}
              className="accent-[#b91c1c]"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-xl bg-surface border border-outline-variant/30 text-xs font-semibold text-on-surface cursor-pointer">
            <span className="flex items-center gap-2">
              <span>✏️</span>
              <span>Allow Annotations & Modifying</span>
            </span>
            <input
              type="checkbox"
              checked={options.allowModifying}
              onChange={(e) => onOptionsChange({ ...options, allowModifying: e.target.checked })}
              className="accent-[#b91c1c]"
            />
          </label>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onProtect}
          disabled={!canSubmit}
          className="w-full min-h-[50px] px-6 rounded-full text-white font-bold text-sm transition-all flex items-center justify-between shadow-[0_10px_24px_rgba(185,28,28,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] bg-[#b91c1c] hover:bg-[#991b1b] active:translate-y-0.5 cursor-pointer disabled:opacity-50 mt-1"
        >
          <span className="flex items-center gap-2">
            <span>🔒</span>
            <span>{isProcessing ? "Encrypting Document..." : "Encrypt & Protect PDF"}</span>
          </span>
          <span>→</span>
        </button>
      </div>
    </aside>
  );
};
