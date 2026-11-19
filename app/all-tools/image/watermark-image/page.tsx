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
import WatermarkImageTool from "@/components/tools/watermark-image/WatermarkImageTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("image", "watermark-image") || getToolBySlug("watermark-image");

  if (!tool) {
    return {
      title: "Add Watermark to Image Online Free — Custom Text & Logo | Free Converting Tools",
      description:
        "Add custom text or brand logo watermarks to photos online for free. Adjust opacity, angle, size, position, and repeating tile pattern. 100% private in browser.",
    };
  }

  const seo = {
    title: "Add a Watermark to an Image Online",
    description:
      "Stamp text or a logo on a JPG, PNG, or WebP image. Set opacity, rotation, a corner, or a tile, then export JPG, PNG, or WebP in the browser.",
    keywords: [
      "watermark image",
      "add watermark to image",
      "image stamp",
      "logo watermark photo",
    ],
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: `${tool.title} — Free Converting Tools`,
      description: seo.description,
      type: "website",
      url: `/all-tools/image/watermark-image`,
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
      canonical: `/all-tools/image/watermark-image`,
    },
  };
}

export default function WatermarkImagePage() {
  const category = "image";
  const slug = "watermark-image";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "watermark-image",
    title: "Add Watermark to Image",
    category: "image",
    description: "Overlay custom text or brand logos with adjustable opacity, position, and tile patterns.",
    clayColor: "clay-teal",
    iconType: "watermark",
    badgeText: "Watermark HD",
    actionText: "Apply Watermark",
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
    url: `${SITE_URL}/all-tools/image/watermark-image`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires HTML5 Canvas support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumbs Navigation */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              {
                label: catInfo?.name || "Image Tools",
                href: `/all-tools/${category}`,
              },
              { label: tool.title, href: `/all-tools/${category}/${slug}` },
            ]}
          />
        </div>

          {/* Interactive Workspace */}
          <Suspense
            fallback={
              <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent" />
                <p className="mt-4 text-sm text-slate-400">
                  Loading Watermark Engine...
                </p>
              </div>
            }
          >
            <ToolPageIntro
              title="Add a Watermark to an Image"
              lede="Place text or a logo on a JPG, PNG, or WebP picture. Set opacity, rotation, one of the anchor positions, or a repeating tile, then export JPG, PNG, or WebP. The stamp is drawn in the browser."
            />
            <WatermarkImageTool />
          </Suspense>

          <ToolPageGuide
            explanationTitle="Image watermark versus a PDF stamp"
            explanation={
              <p>
                This page marks a picture. A text watermark uses the words you type. A logo watermark uses an image you upload. Tiling repeats the mark. It does not make the file impossible to crop, and it does not register a copyright. For a stamp on PDF pages, use the PDF watermark tool.
              </p>
            }
            stepsTitle="How to watermark an image"
            steps={[
              "Add a JPG, PNG, or WebP image.",
              "Choose text or logo, then set size, opacity, and rotation.",
              "Pick a corner or the tile pattern.",
              "Export JPG, PNG, or WebP.",
            ]}
            formats="Input is JPG, PNG, or WebP. The logo can be an image the browser can draw. Output is the format you select on the page."
            details={[
              {
                title: "Text or logo",
                body: "Text is drawn by the canvas. A logo is the image you upload, scaled with the logo control.",
              },
              {
                title: "Placement",
                body: "Anchors sit the mark in one place. Tile repeats it across the picture.",
              },
              {
                title: "Opacity",
                body: "Lower opacity leaves more of the photo visible. It does not lock the file against editing.",
              },
            ]}
            privacy="The photo and the logo are drawn in your browser. They are not uploaded."
            useCases={[
              "Mark a proof before you send a preview.",
              "Put a short credit on a photo you are posting.",
              "Tile a name across an image when a single corner is too easy to crop away.",
            ]}
            faqs={[
              {
                question: "Can I watermark a PDF here?",
                answer:
                  "No. This page is for images. The PDF stamp tool is on the watermark PDF page.",
              },
              {
                question: "Does tiling stop someone from cropping the mark?",
                answer:
                  "It makes a crop less convenient. It does not prevent editing.",
              },
              {
                question: "Which file do I download?",
                answer:
                  "The export control offers JPG, PNG, and WebP. Pick the one you need before downloading.",
              },
            ]}
            links={[
              {
                href: "/all-tools/pdf/watermark-pdf",
                title: "PDF stamp",
                description: "Add a text or image stamp to PDF pages instead of a photo.",
              },
              {
                href: "/all-tools/image/resize-image",
                title: "Resize image",
                description: "Change pixel size before you add the watermark.",
              },
              {
                href: "/all-tools/image/remove-bg",
                title: "Remove background",
                description: "Cut a solid background before you export a PNG.",
              },
            ]}
          />
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="mt-20">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Explore Other Image Tools
                  </h3>
                  <Link
                    href={`/all-tools/${category}`}
                    className="text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    View all {catInfo?.name || "Image Tools"} &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedTools.map((rt) => (
                    <ToolCard key={rt.id} tool={rt} />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </>
    );
  }
