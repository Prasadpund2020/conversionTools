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
import ConvertWebpTool from "@/components/tools/convert-webp/ConvertWebpTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("image", "convert-webp") || getToolBySlug("convert-webp");

  if (!tool) {
    return {
      title: "Convert to WebP Online — Free JPG & PNG to WebP Converter | Free Converting Tools",
      description:
        "Convert JPG, PNG, and GIF images to modern WebP format online for free. Reduce file size up to 85% with batch conversion and ZIP export. Zero server uploads.",
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
      url: `/all-tools/image/convert-webp`,
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
      canonical: `/all-tools/image/convert-webp`,
    },
  };
}

export default function ConvertWebpPage() {
  const category = "image";
  const slug = "convert-webp";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "convert-webp",
    title: "Convert to WebP",
    category: "image",
    description: "Next-gen lightweight web image conversion with superior compression.",
    clayColor: "clay-cyan",
    iconType: "sparkles",
    badgeText: "WebP Turbo",
    actionText: "Convert to WebP",
    isPrimaryAction: true,
    acceptedFormats: ".png,.jpg,.jpeg,.gif,.bmp",
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
    url: `${SITE_URL}/all-tools/image/convert-webp`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Batch parallel conversion of JPG, PNG, and GIF to modern Google WebP format",
      "Lossless and lossy encoding profiles with dynamic quality adjustment slider",
      "One-click combined ZIP archive bundling for mass website asset conversion",
      "Bandwidth and mobile data savings telemetry before and after conversion",
      "Zero server uploads - 100% private in-browser RAM execution",
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
      <Suspense
        fallback={
          <div className="w-full min-h-[500px] flex items-center justify-center bg-[#faf8f5] rounded-3xl border border-stone-200">
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading Convert to WebP Studio…
              </span>
            </div>
          </div>
        }
      >
        <ConvertWebpTool />
      </Suspense>

      {/* Educational & Architectural Feature Guide */}
      <div className="mt-12 bg-white/80 rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          About {tool.title} &amp; Next-Gen Web Optimization
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Google WebP is the modern web standard for high-speed image compression. Free Converting Tools Convert to WebP allows web designers, developers, and content creators to transcode legacy JPG, PNG, and GIF assets into lightweight WebP graphics in seconds. With zero server queues and 100% private in-browser encoding, your assets remain strictly confidential.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              80% File Weight Reduction
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dramatically shrink storage footprint and bandwidth expenditure while retaining crisp photography details.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Batch ZIP Download
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Convert dozens of photos simultaneously and download a consolidated, organized ZIP archive with one click.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Alpha Transparency
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Preserves PNG cutouts and transparent logos with smooth anti-aliased edge blending.
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
