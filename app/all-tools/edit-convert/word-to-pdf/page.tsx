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
import WordToPdfTool from "@/components/tools/word-to-pdf/WordToPdfTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "word-to-pdf") ||
    getToolBySlug("word-to-pdf");

  if (!tool) {
    return {
      title: "Word to PDF Converter Online Free — Fast & Private | Free Converting Tools",
      description:
        "Convert Microsoft Word DOCX and DOC files to high-quality PDF documents online. 100% private in-browser conversion with zero server uploads.",
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
      url: `/all-tools/edit-convert/word-to-pdf`,
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
      canonical: `/all-tools/edit-convert/word-to-pdf`,
    },
  };
}

export default function WordToPdfPage() {
  const category = "edit-convert";
  const slug = "word-to-pdf";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "word-to-pdf",
    title: "Word to PDF",
    category: "edit-convert",
    description: "Lossless layout lock for Word documents and templates.",
    clayColor: "clay-blue",
    iconType: "document-text",
    badgeText: "DOCX → PDF",
    actionText: "Build PDF",
    isPrimaryAction: true,
    acceptedFormats: ".doc,.docx",
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
    url: `${SITE_URL}/all-tools/edit-convert/word-to-pdf`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with WebAssembly support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side conversion",
      "Zero server uploads",
      "Preserves tables, headings, and formatting",
      "Custom page sizes and typography options",
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
        item: `${SITE_URL}/all-tools/edit-convert/word-to-pdf`,
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
        <WordToPdfTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Client-Side Word to PDF Conversion with Absolute Privacy
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Unlike ordinary cloud conversion websites that upload your sensitive business reports, contracts, and resumes to external servers,
          Free Converting Tools processes Word documents (.docx, .doc) 100% locally inside your web browser. Utilizing fast XML DOM parsing and
          in-browser PDF vector generation, your documents are rendered with high fidelity while ensuring complete confidentiality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
              🔒
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Zero Cloud Egress</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Files are converted purely in your browser's private memory sandbox and never sent over the Internet.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
              📐
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Format &amp; Table Preservation</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Maintains paragraph hierarchies, tables, bullet points, and typography for clean, professional PDF distribution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Instant Generation</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              No queues, no bandwidth limits, no waiting for email delivery. Download your PDF instantly.
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
              className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1"
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
