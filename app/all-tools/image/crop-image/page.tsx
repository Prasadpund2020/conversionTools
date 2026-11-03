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
import CropImageTool from "@/components/tools/crop-image/CropImageTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("image", "crop-image") || getToolBySlug("crop-image");

  if (!tool) {
    return {
      title: "Crop Image Online — Free Aspect Ratio Photo Trimmer | Free Converting Tools",
      description:
        "Crop photos to standard aspect ratios (1:1, 16:9, 4:5, 9:16) or custom bounds online for free. Drag handles with live preview. Zero server uploads.",
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
      url: `/all-tools/image/crop-image`,
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
      canonical: `/all-tools/image/crop-image`,
    },
  };
}

export default function CropImagePage() {
  const category = "image";
  const slug = "crop-image";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "crop-image",
    title: "Crop Image",
    category: "image",
    description: "Trim unwanted borders or crop to exact rectangular ratios.",
    clayColor: "clay-pink",
    iconType: "crop",
    badgeText: "Ratio Cut",
    actionText: "Crop Image",
    isPrimaryAction: true,
    acceptedFormats: ".png,.jpg,.jpeg,.webp",
  };

  const catInfo = getCategoryInfo(category);
  const relatedTools = getToolsByCategory(category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 4);

  // Schema.org WebApplication structured data
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/all-tools/image/crop-image`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Interactive draggable bounding box with 8 precision edge handles",
      "Preset aspect ratios: 1:1 Square, 16:9 Landscape, 9:16 Story, 4:5 Portrait, 4:3 Photo",
      "Rule-of-thirds composition overlay grid for cinematic framing",
      "90-degree lossless clockwise rotation and horizontal mirroring",
      "Zero server uploads - 100% private in-browser canvas execution",
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
              label: catInfo ? catInfo.name : "Image Tools",
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
              <span className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading Image Crop Studio…
              </span>
            </div>
          </div>
        }
      >
        <CropImageTool />
      </Suspense>

      {/* Educational & Architectural Feature Guide */}
      <div className="mt-12 bg-white/80 rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          About {tool.title} &amp; Rule-of-Thirds Composition
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Free Converting Tools Crop Studio empowers creators, photographers, and developers to trim unwanted peripheries and reframe photos for social feeds or hero banners. With dynamic aspect ratio locks and interactive rule-of-thirds grid guides, you can position your subject with aesthetic precision. Every operation runs in client-side memory with zero server uploads.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              8-Point Precision Handles
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Drag corner anchors or cardinal edge handles to shave off borders with single-pixel accuracy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Social Ratio Standards
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standardized presets for Instagram Squares (1:1), Portrait Feeds (4:5), YouTube Thumbnails (16:9), and TikTok Reels (9:16).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Zero Compression Loss
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Extract slices directly from source resolution without downsampling or lossy re-encoding artifacts.
            </p>
          </div>
        </div>
      </div>

      {/* Related Image Tools */}
      {relatedTools.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Explore More Image Utilities
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Complementary client-side tools processed directly in your browser
              </p>
            </div>
            <Link
              href="/all-tools/image"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              View all image tools
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
