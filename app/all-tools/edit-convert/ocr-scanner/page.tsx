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
import OcrScannerTool from "@/components/tools/ocr-scanner/OcrScannerTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "ocr-scanner") ||
    getToolBySlug("ocr-scanner");

  if (!tool) {
    return {
      title: "OCR Text Extractor Online Free — Extract Text from Images & Scans | FileLab",
      description:
        "Optical Character Recognition: extract editable text, receipt totals, and code from photos and scanned documents directly in your browser. 100% private, zero uploads.",
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
      url: `/all-tools/edit-convert/ocr-scanner`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: `${tool.title} — FileLab`,
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
      canonical: `/all-tools/edit-convert/ocr-scanner`,
    },
  };
}

export default function OcrScannerPage() {
  const category = "edit-convert";
  const slug = "ocr-scanner";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "ocr-scanner",
    title: "OCR Text Extractor",
    category: "edit-convert",
    description: "Optical Character Recognition: extract searchable text from scans & images.",
    clayColor: "clay-yellow",
    iconType: "scan",
    badgeText: "OCR Scan",
    actionText: "Extract Text",
    isPrimaryAction: true,
    acceptedFormats: ".png,.jpg,.jpeg,.pdf",
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
    url: `${SITE_URL}/all-tools/edit-convert/ocr-scanner`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas and Shape Detection support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side optical character recognition",
      "Zero server uploads",
      "Visual bounding box inspection",
      "Export as TXT, JSON, or PDF",
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
        item: `${SITE_URL}/all-tools/edit-convert/ocr-scanner`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does FileLab perform OCR without uploading my files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FileLab runs optical segmentation and neural character detection directly inside your browser memory using HTML5 Canvas pixel analysis and hardware-accelerated Shape Detection. Your scans and sensitive receipts never leave your computer.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export extracted text to searchable PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can copy text directly to your clipboard, or download it as a .TXT file, structured .JSON bounding coordinates, or clean .PDF.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Extract Text from Images with Free OCR",
    description: "Scan images, receipts, and documents to extract editable text client-side.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your image or document scan",
        text: "Select a PNG, JPG, or WebP scan of your invoice, receipt, or document.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Inspect detected bounding regions",
        text: "Review highlighted text segments and adjust contrast filters or replace terms as needed.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copy or download",
        text: "Copy the extracted text with 1 click or download as TXT, JSON, or PDF.",
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
          { label: "FileLab Studio", href: "/" },
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
        <OcrScannerTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Privacy-First Optical Character Recognition (OCR) Scanner
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Instantly convert physical invoices, handwritten memos, contracts, and screenshots into editable, searchable digital text.
          Because FileLab processes pixels directly inside your web browser’s RAM sandbox, you can extract confidential financial, legal,
          and proprietary documents without risk of third-party telemetry or cloud leaks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              👁️
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Visual Bounding Boxes</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Hover over highlighted regions on your original scan to see live character mappings and accuracy confidence levels.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Sub-100ms Latency</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Accelerated with modern web browser canvas APIs for rapid text extraction without network latency.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              📑
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Versatile Export Formats</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Export your scanned characters as plain text (.txt), bounding coordinate JSON, or searchable PDF document.
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
              className="text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1"
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
