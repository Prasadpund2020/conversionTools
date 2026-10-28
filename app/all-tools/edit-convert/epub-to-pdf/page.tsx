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
import EpubToPdfTool from "@/components/tools/epub-to-pdf/EpubToPdfTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "epub-to-pdf") ||
    getToolBySlug("epub-to-pdf");

  if (!tool) {
    return {
      title: "ePub to PDF Converter Online Free — eBook to Book PDF Typesetter | FileLab",
      description:
        "Transform eBook EPUB files into printable, formatted PDF books with covers, typography styling, and chapters. 100% private, client-side conversion.",
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
      url: `/all-tools/edit-convert/epub-to-pdf`,
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
      canonical: `/all-tools/edit-convert/epub-to-pdf`,
    },
  };
}

export default function EpubToPdfPage() {
  const category = "edit-convert";
  const slug = "epub-to-pdf";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "epub-to-pdf",
    title: "ePub to PDF",
    category: "edit-convert",
    description: "Transform eBook ePub files into readable and printable PDF books.",
    clayColor: "clay-purple",
    iconType: "book",
    badgeText: "EPUB → PDF",
    actionText: "Convert Book",
    isPrimaryAction: true,
    acceptedFormats: ".epub",
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
    url: `${SITE_URL}/all-tools/edit-convert/epub-to-pdf`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with WebAssembly support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side eBook parsing",
      "Zero server uploads",
      "Standard book trim sizes (6x9, 5x8, A4)",
      "Book cover generation & table of contents",
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
        item: `${SITE_URL}/all-tools/edit-convert/epub-to-pdf`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does FileLab preserve eBook chapters and metadata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. FileLab parses the EPUB container XML and spine to extract chapter titles, paragraphs, and book author details, generating an authentic book PDF with page numbers and headers.",
        },
      },
      {
        "@type": "Question",
        name: "What book sizes can I export?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can choose between 6×9″ Trade Paperback (standard for published novels), 5×8″ Pocket Paperback, A4, or US Letter.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert ePub to PDF Online for Free",
    description: "Convert eBook EPUB files into printable PDF books with customized trim sizes.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your EPUB eBook",
        text: "Drag and drop your .epub file into the book converter dropzone.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Select trim size & typography",
        text: "Choose 6x9 trade or pocket size, serif or sans font, and cover page options.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download book PDF",
        text: "Click Download Book PDF to save your publication-ready document.",
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
        <EpubToPdfTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Typeset Digital eBooks into Beautiful Print-Ready PDFs
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Convert reflowable EPUB manuscripts into standardized, paginated PDF books ready for physical printing, Kindle, or reading on tablets.
          Featuring classic trade paperback trim sizes, running book headers, automated table of contents, and decorative chapter headings,
          FileLab provides full publishing layout power entirely in your browser with complete privacy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              📖
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Standard Book Trims</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Export to authentic 6×9″ Trade Paperback or 5×8″ Pocket Paperback dimensions for physical print distribution.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              ✨
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Editorial Typography</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Automatic drop caps, justified book margins, and classic serif typefaces ensure high readability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              🔒
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Manuscript Security</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Your unpublished novels, proprietary textbooks, and notes remain 100% confidential in local browser RAM.
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
              className="text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors flex items-center gap-1"
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
