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
import { MarkdownToPdfTool } from "@/components/tools/markdown-to-pdf/MarkdownToPdfTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "markdown-to-pdf") ||
    getToolBySlug("markdown-to-pdf");

  if (!tool) {
    return {
      title: "Markdown to PDF Converter — Free Client-Side MD to PDF | FileLab",
      description:
        "Convert Markdown (.md) documents and notes into clean, professionally formatted PDF files directly in your browser. 100% private with no server uploads.",
    };
  }

  const seo = getToolSeo(tool);

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: `${tool.title} — FileLab`,
      description: seo.description,
      type: "website",
      url: `/all-tools/edit-convert/markdown-to-pdf`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: "Markdown to PDF Converter — FileLab",
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

export default async function MarkdownToPdfPage() {
  const tool =
    getToolBySlugs("edit-convert", "markdown-to-pdf") ||
    getToolBySlug("markdown-to-pdf") || {
      id: "markdown-to-pdf",
      title: "Markdown to PDF Converter",
      description:
        "Transform Markdown text or .md files into beautifully styled, paginated PDF documents with instant live preview.",
      category: "edit-convert",
      slug: "markdown-to-pdf",
      icon: "markdown",
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
    url: `${SITE_URL}/all-tools/edit-convert/markdown-to-pdf`,
    applicationCategory: "BusinessApplication",
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
              label: category?.name || "Edit & Convert",
              href: `/all-tools?category=${tool.category}`,
            },
            { label: tool.title },
          ]}
        />

        <div className="mt-6">
          <MarkdownToPdfTool />
        </div>

        {/* Informational Section */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Why Convert Markdown to PDF in FileLab?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Markdown is the standard format for developer documentation, READMEs, technical specifications, and personal note-taking in apps like Obsidian and Notion. FileLab allows you to transform raw markdown files or text snippets into formatted, paginated PDF documents with headers, footers, code blocks, and customizable font scaling — all directly in your browser without uploading your notes to any remote servers.
            </p>
          </section>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Related Conversion Tools
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
