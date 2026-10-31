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
import { JsonCsvTool } from "@/components/tools/json-csv/JsonCsvTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "json-csv") ||
    getToolBySlug("json-csv");

  if (!tool) {
    return {
      title: "JSON to CSV & CSV to JSON Converter — Free Online Data Sync | Free Converting Tools",
      description:
        "Easily convert JSON data to CSV or Excel spreadsheet tables, or parse CSV files into formatted JSON. 100% private in-browser conversion.",
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
      url: `/all-tools/edit-convert/json-csv`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: "JSON to CSV & CSV to JSON Converter — Free Converting Tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} — Free Converting Tools`,
      description: seo.description,
      images: ["/images/all-tools-hero-banner.png"],
    },
  };
}

export default async function JsonCsvPage() {
  const tool =
    getToolBySlugs("edit-convert", "json-csv") ||
    getToolBySlug("json-csv") || {
      id: "json-csv",
      title: "JSON ⟷ CSV / Excel Data Converter",
      description:
        "Fast bidirectional converter between JSON datasets and CSV / TSV spreadsheet tables with real-time preview and instant download.",
      category: "edit-convert",
      slug: "json-csv",
      icon: "json-csv",
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
    url: `${SITE_URL}/all-tools/edit-convert/json-csv`,
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
              label: category?.name || "Edit & Convert",
              href: `/all-tools?category=${tool.category}`,
            },
            { label: tool.title },
          ]}
        />

        <div className="mt-6">
          <JsonCsvTool />
        </div>

        {/* Informational Section */}
        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Instant Data Transformation for Developers & Analysts
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Exporting data from REST APIs, database queries, and log analyzers frequently produces nested JSON arrays that are hard to analyze in Microsoft Excel or Google Sheets. Conversely, spreadsheet exports need to be converted to JSON structures for web apps. Free Converting Tools gives you a lightning-fast, 100% private in-browser converter with delimiter options (comma, tab, semicolon), pretty-printing, and instant copy/download functionality.
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
