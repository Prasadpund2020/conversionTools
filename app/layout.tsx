import type { Metadata, Viewport } from "next";
import { Inter, Caveat, Playfair_Display } from "next/font/google";
import AnalyticsGuard from "@/components/AnalyticsGuard";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      `${SITE_NAME} — Free Online File Conversion, Compression & Download Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online tools for PDF, image, audio, video, and file conversion. Tool pages explain supported formats and processing methods.",
  keywords: [
    "pdf to word",
    "compress image",
    "pdf merge",
    "pdf to jpg",
    "remove background",
    "video to mp3",
    "youtube downloader",
    "image to pdf",
    "free converting tools",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} — Free Online File Conversion & Editing Tools`,
    description:
      "Free PDF, image, audio, video, and file utilities with tool-specific processing and format details.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Online File Conversion & Editing Tools`,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Online File Tools`,
    description:
      "Free PDF, image, audio, video, and file conversion utilities with tool-specific processing details.",
    images: ["/images/all-tools-hero-banner.png"],
  },
  verification: {
    google: "google12e62b428644e34e",
    other: {
      "msvalidate.01": "723CAAC4B5340BA05AC43B1EC46DF2E1",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Free online conversion tools: convert PDF to Word, compress images, merge PDFs, extract audio from videos, and download media safely in your browser.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/all-tools?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const devAnalyticsInitScript = `
(function() {
  var STORAGE_KEY = 'dev_analytics_disabled';

  function getQueryParam(param) {
    try {
      var match = window.location.search.match(new RegExp('[?&]' + param + '=([^&]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    } catch (e) {
      return null;
    }
  }

  try {
    var devParam = getQueryParam('dev_mode') || getQueryParam('dev_analytics');
    if (devParam === '1' || devParam === 'true' || devParam === 'enable') {
      localStorage.setItem(STORAGE_KEY, 'true');
      var cleanUrl = window.location.pathname + window.location.search.replace(/[?&]dev_(mode|analytics)=[^&]*/g, '').replace(/^[?&]/, '');
      if (cleanUrl.endsWith('?')) cleanUrl = cleanUrl.slice(0, -1);
      window.history.replaceState({}, '', cleanUrl || '/');
    } else if (devParam === '0' || devParam === 'false' || devParam === 'disable') {
      localStorage.removeItem(STORAGE_KEY);
      var cleanUrl = window.location.pathname + window.location.search.replace(/[?&]dev_(mode|analytics)=[^&]*/g, '').replace(/^[?&]/, '');
      if (cleanUrl.endsWith('?')) cleanUrl = cleanUrl.slice(0, -1);
      window.history.replaceState({}, '', cleanUrl || '/');
    }
  } catch (e) {}

  function isDevExcluded() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true' || localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  var disabled = isDevExcluded();
  window.__DEV_ANALYTICS_DISABLED__ = disabled;

  window.devAnalytics = {
    enable: function() {
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
        console.log('%c[DevAnalytics] Developer mode ENABLED. Analytics disabled for this browser.', 'color: #10b981; font-weight: bold;');
        console.log('Reloading to apply changes...');
        window.location.reload();
      } catch (e) {
        console.error('[DevAnalytics] Failed to save localStorage:', e);
      }
    },
    disable: function() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('%c[DevAnalytics] Developer mode DISABLED. Normal analytics resumed.', 'color: #f59e0b; font-weight: bold;');
        console.log('Reloading to apply changes...');
        window.location.reload();
      } catch (e) {
        console.error('[DevAnalytics] Failed to clear localStorage:', e);
      }
    },
    toggle: function() {
      if (isDevExcluded()) {
        this.disable();
      } else {
        this.enable();
      }
    },
    status: function() {
      var active = isDevExcluded();
      if (active) {
        console.log('%c[DevAnalytics] STATUS: DEVELOPER EXCLUSION ACTIVE (Analytics blocked)', 'color: #10b981; font-weight: bold;');
      } else {
        console.log('%c[DevAnalytics] STATUS: NORMAL VISITOR MODE (Analytics active)', 'color: #3b82f6; font-weight: bold;');
      }
      return { developerMode: active, analyticsBlocked: active };
    }
  };

  window.toggleDevAnalytics = function() { window.devAnalytics.toggle(); };
  window.enableDevAnalytics = function() { window.devAnalytics.enable(); };
  window.disableDevAnalytics = function() { window.devAnalytics.disable(); };

  if (disabled) {
    console.info('%c[DevAnalytics] Developer mode ACTIVE: Vercel Analytics, Microsoft Clarity, and tracking scripts are blocked.', 'color: #10b981; font-weight: bold;');
    window.clarity = function() {};
    window.clarity.q = [];
    window.va = function() {};
    window.vaq = [];
    window['ga-disable-default'] = true;
  }
})();
`;

export const viewport: Viewport = {
  themeColor: "#edebe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          id="dev-analytics-guard"
          dangerouslySetInnerHTML={{ __html: devAnalyticsInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden font-sans antialiased">
        {children}
        <AnalyticsGuard />
      </body>
    </html>
  );
}
