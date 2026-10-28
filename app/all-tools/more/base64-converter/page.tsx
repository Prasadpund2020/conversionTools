import type { Metadata } from "next";
import Link from "next/link";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
  getToolSeo,
} from "@/lib/tools";
import { Base64ConverterTool } from "@/components/tools/base64-converter/Base64ConverterTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("more", "base64-converter") ||
    getToolBySlug("base64-converter");

  if (!tool) {
    return {
      title: "Base64 File & Image Encoder / Decoder — Free Online Tool | FileLab",
      description:
        "Encode images, PDFs, documents and binary files into Base64 strings and Data URIs, or decode Base64 strings back into original files. 100% private in-browser tool.",
    };
  }

  const seo = getToolSeo(tool);

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: `${tool.title} — FileLab`,
      description: seo.description,
      type: "website",
      url: `/all-tools/more/base64-converter`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: "Base64 File & Image Encoder / Decoder — FileLab",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} — FileLab`,
      description: seo.description,
      images: ["/images/all-tools-hero-banner.png"],
    },
  };
}

export default async function Base64ConverterPage() {
  const tool =
    getToolBySlugs("more", "base64-converter") ||
    getToolBySlug("base64-converter") || {
      id: "base64-converter",
      title: "Base64 File & Image Encoder / Decoder",
      description:
        "Encode images, documents, and files into Base64 strings or decode Base64 back into downloadable files instantly in your browser.",
      category: "more",
      slug: "base64-converter",
      icon: "base64",
    };

  const category = getCategoryInfo(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/all-tools/more/base64-converter`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto px-4 py-8 flex-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Tools", href: "/all-tools" },
            {
              label: category?.name || "More Tools",
              href: `/all-tools?category=${tool.category}`,
            },
            { label: tool.title },
          ]}
        />

        <div className="mt-6">
          <Base64ConverterTool />
        </div>

        {/* Informational Section */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Use Base64 Encoding & Decoding in FileLab?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Base64 encoding is an essential utility for web developers, designers, and software engineers. It represents binary data (such as JPEG/PNG icons, fonts, and PDFs) as plain ASCII text. This enables inline embedding in HTML, CSS stylesheets, and JSON API payloads without triggering extra network requests. FileLab executes 100% in client-side memory, ensuring your confidential files and keys are never uploaded or logged anywhere.
            </p>
          </section>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Related Utility Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((related: ToolItem) => (
                  <ToolCard key={related.id} tool={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
