import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
} from "@/lib/tools";
import JpgToPngTool from "@/components/tools/jpg-to-png/JpgToPngTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("image", "jpg-to-png") || getToolBySlug("jpg-to-png");

  if (!tool) {
    return {
      title: "JPG to PNG Converter Online",
      description:
        "Convert JPG and JPEG images to PNG in your browser. The PNG keeps the visible pixels and does not add transparency. Download one file or a ZIP.",
    };
  }

  return {
    title: "JPG to PNG Converter Online",
    description:
      "Convert JPG photos to PNG in the browser, one file or a ZIP. Existing JPEG compression stays in the picture. Transparency is not created.",
    keywords: [
      "jpg to png",
      "jpeg to png",
      "convert jpg to png online",
      "jpg to png converter",
    ],
    openGraph: {
      title: "JPG to PNG Converter Online",
      description:
        "Make a PNG copy of a JPG in the browser. The result is not a transparent cutout.",
      type: "website",
      url: `/all-tools/image/jpg-to-png`,
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
      title: "JPG to PNG Converter Online",
      description:
        "Convert JPG and JPEG files to PNG without uploading them.",
      images: ["/images/all-tools-hero-banner.png"],
    },
    alternates: {
      canonical: `/all-tools/image/jpg-to-png`,
    },
  };
}

export default function JpgToPngPage() {
  const category = "image";
  const slug = "jpg-to-png";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "jpg-to-png",
    title: "JPG to PNG",
    category: "image",
    description: "Convert JPG photos to lossless transparent PNG format.",
    clayColor: "clay-green",
    iconType: "image",
    badgeText: ".PNG HD",
    actionText: "Convert to PNG",
    isPrimaryAction: true,
    acceptedFormats: ".jpg,.jpeg",
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
    url: `${SITE_URL}/all-tools/image/jpg-to-png`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Lossless in-memory conversion from JPEG discrete cosine matrices into truecolor PNG maps",
      "Batch parallel processing with multiple file selection",
      "One-click consolidated ZIP archive export",
      "100% Client-side sandbox execution with zero file uploads and complete privacy",
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

      {/* Main Tool Workspace */}
      <Suspense
        fallback={
          <div className="w-full min-h-[500px] flex items-center justify-center bg-[#faf8f5] rounded-3xl border border-stone-200">
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading JPG to PNG Studio…
              </span>
            </div>
          </div>
        }
      >
        <ToolPageIntro
          title="JPG to PNG Converter"
          lede="Turn JPG and JPEG files into PNG files in the browser. The PNG stores the pixels the browser drew. It does not remove the background or undo JPEG compression."
        />
        <JpgToPngTool />
      </Suspense>

      <ToolPageGuide
        explanationTitle="What JPG to PNG changes"
        explanation={
          <p>
            Each JPG is drawn onto a canvas and saved as PNG. PNG compression does not add another JPEG generation, but it also does not repair detail the JPG already lost. A normal photo stays opaque. Use background removal if you need a cutout.
          </p>
        }
        stepsTitle="How to convert JPG to PNG"
        steps={[
          "Add one or more JPG or JPEG files.",
          "Wait until each row shows a PNG size.",
          "Download a single PNG, or download the set as a ZIP.",
        ]}
        formats="Input is JPG or JPEG. Output is PNG, or a ZIP of PNG files. There is no color-profile editor and no background removal."
        details={[
          {
            title: "No new transparency",
            body: "The converter does not detect a subject. White or colored backgrounds stay in the PNG.",
          },
          {
            title: "Several files",
            body: "Multiple JPGs can be converted in one visit and saved together.",
          },
          {
            title: "File size",
            body: "A PNG of a photo is often larger than the JPG. That is expected for this conversion.",
          },
        ]}
        privacy="The canvas conversion runs in your browser. The images are not uploaded."
        useCases={[
          "Produce a PNG when a form or editor rejects JPG.",
          "Keep a PNG working copy before you edit further.",
          "Convert a folder of photos and take them away as one ZIP.",
        ]}
        faqs={[
          {
            question: "Will the PNG have a transparent background?",
            answer:
              "No. Transparency has to already exist, and JPEG does not store it. This page only changes the container.",
          },
          {
            question: "Does this restore JPEG quality?",
            answer:
              "No. Softness or blockiness from the JPG remains visible in the PNG.",
          },
          {
            question: "Can I convert a PNG back to JPG here?",
            answer:
              "No. This page writes PNG. The WebP converter writes WebP from several image types.",
          },
        ]}
        links={[
          {
            href: "/all-tools/image/convert-webp",
            title: "Convert to WebP",
            description: "Write a WebP file when PNG is not the format you need.",
          },
          {
            href: "/all-tools/image/resize-image",
            title: "Resize image",
            description: "Change the pixel size of a JPG, PNG, or WebP.",
          },
          {
            href: "/all-tools/image/remove-bg",
            title: "Remove background",
            description: "Cut a solid-color background when you actually need transparency.",
          },
        ]}
      />

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
