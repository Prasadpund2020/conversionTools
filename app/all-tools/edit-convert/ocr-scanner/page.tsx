import type { Metadata } from "next";
import Link from "next/link";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
} from "@/lib/tools";
import OcrScannerTool from "@/components/tools/ocr-scanner/OcrScannerTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "ocr-scanner") ||
    getToolBySlug("ocr-scanner");

  if (!tool) {
    return {
      title: "OCR Scanner Online",
      description:
        "Read text from a PNG, JPG, or WebP image when Chrome or Edge provides text detection. Other browsers do not decode the photo.",
    };
  }

  return {
    title: "OCR Scanner Online",
    description:
      "OCR reader for a PNG, JPG, or WebP image in Chrome or Edge. Copy the text or export TXT, JSON, or a PDF of that text. PDF files are not an input.",
    keywords: [
      "ocr scanner online",
      "ocr reader online",
      "text scanner online",
      "extract text from image",
    ],
    openGraph: {
      title: "OCR Scanner Online",
      description:
        "Read text from a PNG, JPG, or WebP photo in Chrome or Edge, then copy it or export TXT, JSON, or PDF.",
      type: "website",
      url: `/all-tools/edit-convert/ocr-scanner`,
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
      title: "OCR Scanner Online",
      description:
        "Image text reading in Chrome or Edge. PDF upload is not supported.",
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
      "PNG, JPG, and WebP input",
      "Browser TextDetector in Chrome and Edge",
      "Export TXT, JSON, or a PDF of the extracted text",
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

      <div className="mt-4">
        <ToolPageIntro
          title="OCR Scanner Online"
          lede="Upload a PNG, JPG, or WebP image. In Chrome or Edge, the page uses the browser text detector and can export the words as text, JSON, or a simple PDF. It does not read PDF files, and other browsers do not decode the real text in the photo."
        />
        <OcrScannerTool />
      </div>

      <ToolPageGuide
        explanationTitle="What this OCR reader can read"
        explanation={
          <p>
            Text comes from the browser TextDetector API. That API is available in Chromium browsers such as Chrome and Edge. When it is missing, the page does not read the words in your image. Handwriting, small type, and photos of glossy paper are often missed even when the detector runs. The image itself is not turned into a searchable PDF; the export PDF contains the extracted text in a standard font.
          </p>
        }
        stepsTitle="How to use the text scanner"
        steps={[
          "Open the page in Chrome or Edge.",
          "Upload a PNG, JPG, or WebP image. PDF files are not accepted.",
          "Review the text beside the image. If the words do not match the photo, the detector missed them.",
          "Copy the text, or export TXT, JSON, or a PDF of the text you see.",
        ]}
        formats="Input: PNG, JPG, JPEG, or WebP. Output: on-screen text, a TXT file, JSON of the detected blocks, or a PDF that reprints that text. There is no language pack selector."
        details={[
          {
            title: "Chrome and Edge",
            body: "Scanning depends on TextDetector. Firefox and Safari will not return the text that is actually in the picture.",
          },
          {
            title: "Images only",
            body: "A scanned PDF has to be exported as an image first. This page does not open PDF pages.",
          },
          {
            title: "Exports",
            body: "TXT, JSON, and PDF exports use the text the detector returned. They do not improve a bad read.",
          },
        ]}
        privacy="The image is read in the browser. It is not uploaded to an OCR server."
        useCases={[
          "Copy a short line from a screenshot while you are already in Chrome.",
          "Pull printed text from a photo when the type is large and clear.",
          "Save the extracted words as a text file after you have checked them against the image.",
        ]}
        faqs={[
          {
            question: "Is this an OCR scanner online?",
            answer:
              "Yes, for PNG, JPG, and WebP images in Chrome or Edge. It is not a multi-language OCR engine and it does not accept PDF uploads.",
          },
          {
            question: "Why did the text not match my photo?",
            answer:
              "The browser detector missed the glyphs, or you are in a browser without TextDetector. Compare the result with the image before you rely on it.",
          },
          {
            question: "Can I read a scanned PDF?",
            answer:
              "Not on this page. Export a page as PNG or JPG first, then upload that image.",
          },
        ]}
        linksTitle="Related image and document tools"
        links={[
          {
            href: "/all-tools/image",
            title: "Image tools",
            description: "Resize, convert, or crop a photo before you try to read the text.",
          },
          {
            href: "/all-tools/image/jpg-to-png",
            title: "JPG to PNG",
            description: "Make a PNG copy if you want that format before uploading it here.",
          },
          {
            href: "/all-tools/edit-convert/markdown-to-pdf",
            title: "Markdown to PDF",
            description: "Turn notes you already have as text into a PDF, which is a different job from OCR.",
          },
        ]}
      />

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
