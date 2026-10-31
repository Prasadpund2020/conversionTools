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
import ExcelToPdfTool from "@/components/tools/excel-to-pdf/ExcelToPdfTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "excel-to-pdf") ||
    getToolBySlug("excel-to-pdf");

  if (!tool) {
    return {
      title: "Excel to PDF Converter Online Free — XLSX, XLS, CSV to PDF | Free Converting Tools",
      description:
        "Convert Excel spreadsheets (.xlsx, .xls) and CSV tables to high-resolution, printable PDF documents directly in your browser with zero server uploads.",
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
      url: `/all-tools/edit-convert/excel-to-pdf`,
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
      canonical: `/all-tools/edit-convert/excel-to-pdf`,
    },
  };
}

export default function ExcelToPdfPage() {
  const category = "edit-convert";
  const slug = "excel-to-pdf";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    category: "edit-convert",
    description: "Export spreadsheets, tables, and Excel sheets (.xlsx) directly to PDF format.",
    clayColor: "clay-green",
    iconType: "table",
    badgeText: "XLSX → PDF",
    actionText: "Convert to PDF",
    isPrimaryAction: true,
    acceptedFormats: ".xls,.xlsx,.csv",
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
    url: `${SITE_URL}/all-tools/edit-convert/excel-to-pdf`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with WebAssembly support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side spreadsheet parsing",
      "Zero server uploads",
      "Auto-fitted table column layout",
      "Custom styling themes and landscape orientation",
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
        name: catInfo ? catInfo.name : "Edit & Convert",
        item: `${SITE_URL}/all-tools/edit-convert`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.title,
        item: `${SITE_URL}/all-tools/edit-convert/excel-to-pdf`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Free Converting Tools support multi-sheet Excel files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Free Converting Tools parses all worksheets inside your workbook and allows you to select which specific sheet to export as a formatted PDF.",
        },
      },
      {
        "@type": "Question",
        name: "Are financial spreadsheets safe from leaks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. All XML cell parsing and PDF drawing happen entirely inside your web browser's RAM sandbox. No file is ever transmitted to a server.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Excel to PDF Online for Free",
    description: "Convert spreadsheets (XLSX, XLS, CSV) into printable PDF documents in three easy steps.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Select or drop your spreadsheet",
        text: "Upload your XLSX or CSV file directly into the conversion workspace.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Customize layout & theme",
        text: "Select landscape or portrait, table color theme, and toggle gridlines.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download PDF",
        text: "Click Download PDF Spreadsheet to save your print-ready document.",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "All Tools", href: "/all-tools" },
          {
            label: catInfo ? catInfo.name : "Edit & Convert",
            href: "/all-tools/edit-convert",
          },
          { label: tool.title },
        ]}
      />

      {/* Main Interactive Tool */}
      <div className="mt-4">
        <ExcelToPdfTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Enterprise-Grade Spreadsheet to PDF Conversion in Your Browser
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Convert complex financial models, sales pipelines, inventory rosters, and CSV exports into publication-ready PDF tables.
          With automatic column width balancing, repeating headers across multi-page tables, and customizable color themes,
          your data looks polished and professional on any device or printer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
              🛡️
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Financial Data Isolation</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Your confidential figures, employee data, and revenue stats remain strictly inside your browser memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
              📊
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Repeating Header Rows</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Long tables spanning multiple PDF pages maintain column headers on every page for effortless auditing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
              🎨
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Professional Themes</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Choose from Emerald Executive, Classic Navy, Minimal Monochrome, or Slate styling to match brand guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Related Tools Shelf */}
      {relatedTools.length > 0 && (
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-stone-900 tracking-tight">
              Related Conversion &amp; Document Tools
            </h3>
            <Link
              href="/all-tools/edit-convert"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
