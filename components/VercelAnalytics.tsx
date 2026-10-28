"use client";

import React from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

/**
 * Custom Vercel Analytics wrapper with developer opt-out support.
 *
 * Excludes developer visits from Vercel Analytics tracking if the
 * local browser flag `va-disable` is set to "true" in localStorage.
 *
 * To opt-out in any browser:
 *   localStorage.setItem("va-disable", "true"); location.reload();
 *
 * To re-enable tracking in that browser:
 *   localStorage.removeItem("va-disable"); location.reload();
 */
export function VercelAnalytics() {
  return (
    <Analytics
      beforeSend={(event: BeforeSendEvent) => {
        try {
          if (
            typeof window !== "undefined" &&
            (window.localStorage?.getItem("va-disable") === "true" ||
              window.localStorage?.getItem("va-disable") === "1")
          ) {
            // Suppress the event for this opted-out developer browser session
            return null;
          }
        } catch {
          // If storage is blocked (e.g. strict sandboxed iframes or private mode policies), proceed normally
        }

        // Return original event for all normal visitors
        return event;
      }}
    />
  );
}
