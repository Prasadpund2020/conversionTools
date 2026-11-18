"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

// The exclusion flag is read once on the client; nothing pushes updates to us.
const subscribeNever = () => () => {};

function getIsExcludedSnapshot(): boolean {
  try {
    return (
      localStorage.getItem("dev_analytics_disabled") === "true" ||
      localStorage.getItem("dev_analytics_disabled") === "1" ||
      Boolean(window.__DEV_ANALYTICS_DISABLED__)
    );
  } catch {
    return false;
  }
}

// null on the server (and during hydration) means "not checked yet"
const getIsExcludedServerSnapshot = (): boolean | null => null;

export default function AnalyticsGuard() {
  const isExcluded = useSyncExternalStore<boolean | null>(
    subscribeNever,
    getIsExcludedSnapshot,
    getIsExcludedServerSnapshot
  );

  // During SSR or while checking, or if developer mode is enabled, do not mount any analytics
  if (isExcluded === null || isExcluded === true) {
    return null;
  }

  // Developer mode is disabled: mount analytics for normal visitors
  return (
    <>
      <Analytics
        beforeSend={(event) => {
          try {
            if (
              localStorage.getItem("dev_analytics_disabled") === "true" ||
              localStorage.getItem("dev_analytics_disabled") === "1" ||
              window.__DEV_ANALYTICS_DISABLED__
            ) {
              return null;
            }
          } catch {}
          return event;
        }}
      />
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                try {
                  if (localStorage.getItem('dev_analytics_disabled') === 'true' || localStorage.getItem('dev_analytics_disabled') === '1' || window.__DEV_ANALYTICS_DISABLED__) {
                    return;
                  }
                } catch(e) {}
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "z3drva11mt");
          `,
        }}
      />
      <Script
        id="ahrefs-analytics"
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="IrIK5YdO1d+KrFXk4w+tcQ"
        strategy="afterInteractive"
      />
    </>
  );
}
