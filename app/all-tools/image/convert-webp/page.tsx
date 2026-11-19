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
import ConvertWebpTool from "@/components/tools/convert-webp/ConvertWebpTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("image", "convert-webp") || getToolBySlug("convert-webp");

  if (!tool) {
    return {
      title: "Convert to WebP Online — Free JPG & PNG to WebP Converter | Free Converting Tools",
      description:
        "Convert JPG, PNG, GIF, or BMP images to WebP in your browser, then download one file or a ZIP.",
    };
  }

  return {
    title: "Convert to WebP Online Free",
    description:
      "Convert JPG, PNG, GIF, or BMP images to WebP in your browser. Set a quality level or lossless mode, then download one image or a ZIP.",
    keywords: [
      "convert to webp",
      "webp converter",
      "to webp",
      "converter to webp",
      "webpconvert",
    ],
    openGraph: {
      title: "Convert to WebP Online Free",
      description:
        "A free WebP converter for JPG, PNG, GIF, and BMP images, with quality, lossless mode, and ZIP download.",
      type: "website",
      url: `/all-tools/image/convert-webp`,
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
      title: "Convert to WebP Online Free",
      description:
        "Convert images to WebP in the browser and download a single file or a ZIP.",
      images: ["/images/all-tools-hero-banner.png"],
    },
    alternates: {
      canonical: `/all-tools/image/convert-webp`,
    },
  };
}

export default function ConvertWebpPage() {
  const category = "image";
  const slug = "convert-webp";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "convert-webp",
    title: "Convert to WebP",
    category: "image",
    description: "Next-gen lightweight web image conversion with superior compression.",
    clayColor: "clay-cyan",
    iconType: "sparkles",
    badgeText: "WebP Turbo",
    actionText: "Convert to WebP",
    isPrimaryAction: true,
    acceptedFormats: ".png,.jpg,.jpeg,.gif,.bmp",
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
    description:
      "Convert JPG, PNG, GIF, and BMP images to WebP in the browser. Animated GIFs become a single still frame.",
    url: `${SITE_URL}/all-tools/image/convert-webp`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "JPG, PNG, GIF, and BMP to WebP",
      "Quality slider and lossless mode",
      "ZIP download for multiple images",
      "Browser-side canvas encoding",
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
      <ToolPageIntro
        title="Convert to WebP"
        lede="Turn JPG, PNG, GIF, or BMP images into WebP without leaving the browser. Use the quality slider, or switch on lossless mode when you want the canvas encoder to avoid the quality setting."
      />
      <Suspense
        fallback={
          <div className="w-full min-h-[500px] flex items-center justify-center bg-[#faf8f5] rounded-3xl border border-stone-200">
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading Convert to WebP Studio…
              </span>
            </div>
          </div>
        }
      >
        <ConvertWebpTool />
      </Suspense>

      <ToolPageGuide
        explanationTitle="What this WebP converter does"
        explanation={
          <p>
            This page converts images to WebP with the browser canvas. File size depends on the picture and the quality setting. There is no fixed percentage of savings. An animated GIF is flattened to the first frame the browser draws.
          </p>
        }
        stepsTitle="How to convert to WebP"
        steps={[
          "Add one or more images. The picker accepts common image types, including JPG, PNG, GIF, and BMP.",
          "Leave lossy mode on and move the quality slider, or turn on lossless mode.",
          "Download a single WebP, or download every finished image as a ZIP.",
          "If the browser cannot encode WebP, the conversion cannot produce a WebP file. Chrome, Edge, and Firefox are the browsers to use.",
        ]}
        formats="Input is an image file the browser can decode. Output is WebP, or a ZIP of WebP files. Transparency in a PNG can be kept when the browser's WebP encoder supports the alpha channel in that image."
        details={[
          {
            title: "Quality or lossless",
            body: "The default quality is 82. Lossless mode ignores the quality slider and asks the canvas encoder for a lossless WebP.",
          },
          {
            title: "Several images",
            body: "You can convert more than one image in the same session and save them together in a ZIP.",
          },
          {
            title: "Still frames only",
            body: "A GIF is not kept as an animation. You get one still WebP from the decoded frame.",
          },
        ]}
        privacy="Images are encoded in your browser. They are not uploaded to a conversion server."
        useCases={[
          "Prepare website images when you specifically need a WebP file.",
          "Make a lighter copy of a JPG or PNG before you upload it to a site that accepts WebP.",
          "Convert a set of screenshots and download them as one ZIP.",
        ]}
        faqs={[
          {
            question: "How do I convert to WebP online?",
            answer:
              "Add the image, choose quality or lossless, and download the WebP. Repeat for more files, or download the ZIP.",
          },
          {
            question: "Will every image get much smaller?",
            answer:
              "No. Size depends on the source and the quality you pick. Compare the before and after sizes shown for each file.",
          },
          {
            question: "Can I turn a PNG into a JPG here?",
            answer:
              "No. This page writes WebP. Use JPG to PNG if you need a PNG file instead.",
          },
        ]}
        links={[
          {
            href: "/all-tools/image/jpg-to-png",
            title: "JPG to PNG",
            description: "Make a PNG copy of a JPG when WebP is not the format you need.",
          },
          {
            href: "/all-tools/image/resize-image",
            title: "Resize image",
            description: "Change pixel size before or after you convert the format.",
          },
          {
            href: "/all-tools/image/compress-image",
            title: "Compress image",
            description: "Reduce an image when you want to stay in JPG, PNG, or WebP from that tool.",
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
