import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
  getToolSeo,
} from "@/lib/tools";
import YouTubeDownloaderTool from "@/components/tools/youtube-downloader/YouTubeDownloaderTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("downloaders", "youtube-downloader") ||
    getToolBySlug("youtube-downloader");

  if (!tool) {
    return {
      title: "YouTube Downloader — Download Verified MP4 Video Online | Free Converting Tools",
      description:
        "Retrieve official YouTube metadata, high-resolution thumbnails, and download verified MP4 streams. Clean, fast, zero corrupt files, and compliant.",
    };
  }

  const seo = getToolSeo(tool);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: `${tool.title} — Free Converting Tools`,
      description: seo.description,
      type: "website",
      url: `/all-tools/downloaders/youtube-downloader`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: `${tool.title} — Free Converting Tools`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: seo.description,
      images: ["/images/all-tools-hero-banner.png"],
    },
    alternates: {
      canonical: `/all-tools/downloaders/youtube-downloader`,
    },
  };
}

export default function YouTubeDownloaderPage() {
  const category = "downloaders";
  const slug = "youtube-downloader";

  const tool =
    getToolBySlugs(category, slug) ||
    getToolBySlug(slug) || {
      id: "youtube-downloader",
      title: "YouTube Downloader",
      category: "downloaders",
      description:
        "Retrieve authentic YouTube metadata, download HD cover art, and save verified MP4 video streams.",
      clayColor: "clay-yellow",
      iconType: "play-down",
      badgeText: "Verified MP4",
      actionText: "Fetch Video",
      isPrimaryAction: true,
      acceptedFormats: "URL Link",
    };

  const catInfo = getCategoryInfo(category);
  const relatedTools = getToolsByCategory(category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 4);

  // Schema.org WebApplication structured data
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YouTube Downloader Studio — Free Converting Tools",
    description: tool.description,
    url: `${SITE_URL}/all-tools/downloaders/youtube-downloader`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements:
      "Requires modern web browser with HTML5 Video and streaming download support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Official YouTube oEmbed metadata extraction",
      "High-resolution cover art thumbnail downloads",
      "Strict MP4 container validation (ISO Base Media ftyp signature)",
      "Authorized media stream dispatch with zero corrupted files",
      "Clean downloads with zero watermarks or sponsor banners",
    ],
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Schema.org WebApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />

      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Tools", href: "/all-tools" },
            {
              label: catInfo ? catInfo.name : "Downloaders",
              href: `/all-tools/${category}`,
            },
            { label: tool.title },
          ]}
        />
      </div>

      {/* Main Tool Workspace */}
      <Suspense
        fallback={
          <div className="w-full min-h-[500px] flex items-center justify-center bg-[#faf8f5] rounded-3xl border border-stone-200">
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-[3px] border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading YouTube Downloader Studio…
              </span>
            </div>
          </div>
        }
      >
        <YouTubeDownloaderTool />
      </Suspense>

      {/* Tool Information & Security Guide */}
      <div className="mt-12 bg-white/80 rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          About {tool.title} &amp; Official Stream Dispatch
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Free Converting Tools YouTube Downloader provides verified metadata retrieval via official YouTube APIs and validated MP4 stream downloads. Enjoy genuine downloads with strict container verification, zero dummy placeholders, and full platform compliance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Official YouTube oEmbed
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Fetches authentic video titles, channel credentials, and high-definition cover art directly from official YouTube endpoints.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Verified MP4 Validation
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every media byte is checked for ISO Base Media signature (ftyp box) and Content-Length to prevent corrupted or placeholder files.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              No Watermarks Added
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Files are saved strictly in their original presentation with zero branding, sponsor banners, or visual watermarks.
            </p>
          </div>
        </div>
      </div>

      {/* Related Tools Shelf */}
      {relatedTools.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Related {catInfo?.name || "Downloader"} Tools
              </h3>
              <p className="text-xs text-slate-500">
                More client-side utilities from this suite
              </p>
            </div>
            <Link
              href={`/all-tools/${category}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 no-underline"
            >
              View all ({getToolsByCategory(category).length})
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((relTool: ToolItem) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
