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
import ResizeImageTool from "@/components/tools/resize-image/ResizeImageTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("image", "resize-image") || getToolBySlug("resize-image");

  if (!tool) {
    return {
      title: "Resize Image Online",
      description:
        "Change the width and height of a JPG, PNG, or WebP image in your browser, with an aspect-ratio lock and size presets.",
    };
  }

  return {
    title: "Resize Image Online",
    description:
      "Resize an image by pixels. Keep the aspect ratio, pick a preset, and download JPG, PNG, or WebP. Scaling runs in your browser.",
    keywords: [
      "resize image online",
      "change image size",
      "resize jpg",
      "resize png",
      "image dimensions",
    ],
    openGraph: {
      title: "Resize Image Online",
      description:
        "Set a new pixel width and height for a JPG, PNG, or WebP image, with an aspect-ratio lock and size presets.",
      type: "website",
      url: `/all-tools/image/resize-image`,
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
      title: "Resize Image Online",
      description:
        "Change image pixel dimensions in the browser and export JPG, PNG, or WebP.",
      images: ["/images/all-tools-hero-banner.png"],
    },
    alternates: {
      canonical: `/all-tools/image/resize-image`,
    },
  };
}

export default function ResizeImagePage() {
  const category = "image";
  const slug = "resize-image";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "resize-image",
    title: "Resize Image",
    category: "image",
    description: "Scale image pixel dimensions and aspect ratios for web, print or socials.",
    clayColor: "clay-blue",
    iconType: "aspect-ratio",
    badgeText: "Scale HD",
    actionText: "Resize Image",
    isPrimaryAction: true,
    acceptedFormats: ".png,.jpg,.jpeg,.webp",
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
    url: `${SITE_URL}/all-tools/image/resize-image`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Pixel-perfect bilinear downscaling and bicubic upscaling",
      "Social media preset dimensions (Instagram, YouTube, Twitter/X, Full HD, 4K)",
      "Lock aspect ratio toggle with automatic proportional dimension calculation",
      "Format conversion to modern WebP, JPG, or PNG with zero compression artifacts",
      "100% Client-side RAM sandbox execution with zero file uploads",
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
              <span className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading Image Resizer Studio…
              </span>
            </div>
          </div>
        }
      >
        <ToolPageIntro
          title="Resize Image Online"
          lede="Set a new width and height for a JPG, PNG, or WebP. Lock the aspect ratio, or pick a preset such as 1080 by 1080 or 1920 by 1080. Export JPG, PNG, or WebP."
        />
        <ResizeImageTool />
      </Suspense>

      <ToolPageGuide
        explanationTitle="How image resizing works here"
        explanation={
          <p>
            The image is drawn at the size you choose. Making it larger does not recover detail. Enlarging a small photo will look softer. Fit modes can contain the image with a fill color, cover the frame, or stretch it. The aspect-ratio lock changes height when you edit width, and the other way around.
          </p>
        }
        stepsTitle="How to resize an image"
        steps={[
          "Add a JPG, PNG, or WebP file.",
          "Type a width and height, or choose a preset.",
          "Keep the aspect lock on unless you want the picture stretched.",
          "Choose JPG, PNG, or WebP and download.",
        ]}
        formats="Input is JPG, PNG, or WebP. Output is the format you select. JPEG and WebP use the quality control. PNG does not."
        details={[
          {
            title: "Presets",
            body: "Presets include common sizes such as 1080×1080, 1080×1920, 1280×720, and 1920×1080. They set the canvas; they do not crop a face into place.",
          },
          {
            title: "Aspect lock",
            body: "With the lock on, one side follows the original ratio. Turn it off to set both sides yourself.",
          },
          {
            title: "Quality",
            body: "A lower JPEG or WebP quality makes a smaller file and a softer picture. PNG stays lossless for the pixels on the canvas.",
          },
        ]}
        privacy="Resizing runs in your browser. The image is not uploaded."
        useCases={[
          "Make a photo smaller before you email it.",
          "Match a requested pixel size for a form or a website slot.",
          "Export the same picture as JPG, PNG, or WebP after the resize.",
        ]}
        faqs={[
          {
            question: "Can I resize without stretching the photo?",
            answer:
              "Yes. Leave the aspect-ratio lock on, or use contain instead of stretch.",
          },
          {
            question: "Will a larger size look sharper?",
            answer:
              "No. Extra pixels are interpolated from the original. The result can look soft.",
          },
          {
            question: "Does this crop the image?",
            answer:
              "Cover mode fills the frame and can cut off edges. Contain keeps the whole image and may add a fill color. Stretch changes the shape.",
          },
        ]}
        links={[
          {
            href: "/all-tools/image/jpg-to-png",
            title: "JPG to PNG",
            description: "Change a JPG into a PNG when size is already correct.",
          },
          {
            href: "/all-tools/image/convert-webp",
            title: "Convert to WebP",
            description: "Write WebP without using the resize canvas.",
          },
          {
            href: "/all-tools/image/crop-image",
            title: "Crop image",
            description: "Trim the frame when you need a crop rather than a scale.",
          },
        ]}
      />

      {/* Related Image Tools Carousel/Grid */}
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
