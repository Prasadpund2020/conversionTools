import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
} from "@/lib/tools";
import InstaReelsTool from "@/components/tools/insta-reels/InstaReelsTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("downloaders", "insta-reels") ||
    getToolBySlug("insta-reels");

  if (!tool) {
    return {
      title: "Instagram Reel Link Preview",
      description:
        "Preview an Instagram Reel link. The download does not save the real reel.",
    };
  }

  const seo = {
    title: "Instagram Reel Link Preview",
    description:
      "Enter an Instagram Reel link to see a preview card. The download button does not save the real reel.",
    keywords: ["instagram reel preview", "reel link preview"],
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: `${tool.title} — Free Converting Tools`,
      description: seo.description,
      type: "website",
      url: `/all-tools/downloaders/insta-reels`,
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
      canonical: `/all-tools/downloaders/insta-reels`,
    },
  };
}

export default function InstaReelsPage() {
  const category = "downloaders";
  const slug = "insta-reels";

  const tool =
    getToolBySlugs(category, slug) ||
    getToolBySlug(slug) || {
      id: "insta-reels",
      title: "Instagram Reels Downloader",
      category: "downloaders",
      description:
        "Download full HD Instagram Reels and public video clips easily.",
      clayColor: "clay-pink",
      iconType: "camera",
      badgeText: "Reels HD",
      actionText: "Download Reel",
      isPrimaryAction: true,
      acceptedFormats: "URL Link",
    };

  const catInfo = getCategoryInfo(category);
  const relatedTools = getToolsByCategory(category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 4);

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Instagram Reels Downloader — Free Converting Tools",
    description: tool.description,
    url: `${SITE_URL}/all-tools/downloaders/insta-reels`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "1080×1920 Full HD Instagram Reels MP4 downloads",
      "Original audio track MP3 extraction",
      "High resolution cover art saving",
      "Zero platform watermarks",
    ],
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />

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

      <Suspense
        fallback={
          <div className="w-full min-h-[500px] flex items-center justify-center bg-[#faf8f5] rounded-3xl border border-stone-200">
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-[3px] border-pink-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading Instagram Reels Downloader…
              </span>
            </div>
          </div>
        }
      >
        <ToolPageIntro
          title="Instagram Reel link preview"
          lede="A Reel link can show a preview card. For a link that is not one of the built-in samples, the card is placeholder text and a stock image. The download writes a tiny stand-in file, not the reel."
        />
        <InstaReelsTool />
      </Suspense>

      <div className="mt-12 bg-white/80 rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          This page does not save the Reel
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          The download action creates a small placeholder file. It is not the Instagram video or its audio. Do not use this page when you need the real Reel. If you already have the video file, <Link href="/all-tools/video-audio/video-to-mp3" className="font-semibold text-slate-800 hover:underline">extract audio as WAV</Link> from a file the browser can decode.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Preview only
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Unknown Reel links do not load the real video. Sample links can show the built-in sample card.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Placeholder download
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              The saved file is a small stand-in, not the Reel or an MP3 of its audio.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              No Watermarks
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Files contain zero added logos, borders, or branding for clean, original playback.
            </p>
          </div>
        </div>
      </div>

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
