import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { ALL_TOOLS } from "@/data/tools";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getCategoryInfo,
  getCategorySlug,
  getToolsByCategory,
  getToolSeo,
  isToolPublished,
} from "@/lib/tools";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ToolComingSoon from "@/components/tools/ToolComingSoon";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";

interface ToolPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Allow blocking route for Next.js 16 Partial Prefetching / Instant Shell
export const instant = false;

function hasDedicatedToolPage(categorySlug: string, toolId: string): boolean {
  return fs.existsSync(
    path.join(
      process.cwd(),
      "app",
      "all-tools",
      categorySlug,
      toolId,
      "page.tsx"
    )
  );
}

export async function generateStaticParams() {
  return ALL_TOOLS.map((tool: ToolItem) => ({
    category: getCategorySlug(tool.category),
    slug: tool.id,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const tool = getToolBySlugs(category, slug);

  if (!tool || !isToolPublished(tool)) {
    return {
      title: "Tool Not Found",
      robots: { index: false, follow: false },
    };
  }

  const seo = getToolSeo(tool);
  const isIndexable = hasDedicatedToolPage(category, tool.id);

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: `${tool.title} — ${SITE_NAME}`,
      description: seo.description,
      type: "website",
      url: `/all-tools/${category}/${slug}`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: `${tool.title} — ${SITE_NAME}`,
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
      canonical: `/all-tools/${category}/${slug}`,
    },
    robots: isIndexable
      ? undefined
      : { index: false, follow: true },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category, slug } = await params;
  const tool = getToolBySlugs(category, slug);

  if (!tool || !isToolPublished(tool)) {
    notFound();
  }

  const catInfo = getCategoryInfo(category);
  const isDedicated = hasDedicatedToolPage(category, tool.id);
  const relatedTools = getToolsByCategory(category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 4);

  // Schema.org WebApplication structured data for SEO rich snippets
  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/all-tools/${category}/${slug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with WebAssembly and Web Worker support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      tool.acceptedFormats
        ? `Accepts ${tool.acceptedFormats}`
        : "See the tool page for supported inputs",
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Tools",
        item: `${SITE_URL}/all-tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: catInfo ? catInfo.name : "Category",
        item: `${SITE_URL}/all-tools/${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.title,
        item: `${SITE_URL}/all-tools/${category}/${slug}`,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Schema.org WebApplication and BreadcrumbList JSON-LD */}
      {isDedicated && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "All Tools", href: "/all-tools" },
          {
            label: catInfo ? catInfo.name : "Category",
            href: `/all-tools/${category}`,
          },
          { label: tool.title },
        ]}
      />

      {/* Main Tool Workspace / Coming Soon UI */}
      <ToolComingSoon tool={tool} />

      {/* Tool Information & FAQ Section for SEO */}
      <div className="mt-12 bg-white/80 rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          About {tool.title}
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {tool.description} This page documents the tool and its current
          availability. Review the supported inputs below before selecting a
          file or link.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Processing
            </div>
            <p className="text-xs text-slate-500">
              The processing method is shown by the live tool interface when
              the tool is available. Do not upload sensitive files unless the
              tool explicitly states that processing is local.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Supported Inputs
            </div>
            <p className="text-xs text-slate-500">
              {tool.acceptedFormats || "Various industry standard file formats"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/60">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Current availability
            </div>
            <p className="text-xs text-slate-500">
              This route currently provides the tool information and navigation
              while the interactive workspace is being prepared.
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
                Related {catInfo?.name || "Tools"}
              </h3>
              <p className="text-xs text-slate-500">
                More in-browser utilities from this department
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
