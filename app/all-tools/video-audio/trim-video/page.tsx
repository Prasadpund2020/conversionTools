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
import TrimVideoTool from "@/components/tools/trim-video/TrimVideoTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("video-audio", "trim-video") ||
    getToolBySlug("trim-video");

  if (!tool) {
    return {
      title: "Trim Video Online Free — Cut MP4, MOV, WebM Video Clips | Free Converting Tools",
      description:
        "Trim and cut video clips with millisecond precision online. 100% private in-browser trimming with zero upload wait times or quality loss.",
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
      url: `/all-tools/video-audio/trim-video`,
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
      canonical: `/all-tools/video-audio/trim-video`,
    },
  };
}

export default function TrimVideoPage() {
  const category = "video-audio";
  const slug = "trim-video";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "trim-video",
    title: "Trim Video",
    category: "video-audio",
    description: "Cut out exact timestamps and trim video clips without re-encoding delays.",
    clayColor: "clay-purple",
    iconType: "cut",
    badgeText: "Lossless Cut",
    actionText: "Trim Video",
    isPrimaryAction: true,
    acceptedFormats: ".mp4,.mov,.webm",
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
    url: `${SITE_URL}/all-tools/video-audio/trim-video`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas and MediaRecorder support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side video trimming",
      "Zero server uploads",
      "Dual scrubber timeline preview",
      "Resolution & playback speed controls",
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
        name: catInfo ? catInfo.name : "Video & Audio",
        item: `${SITE_URL}/all-tools/video-audio`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: tool.title,
        item: `${SITE_URL}/all-tools/video-audio/trim-video`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I trim large 4K video clips without uploading?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Free Converting Tools processes video clips entirely in your browser's local memory using HTML5 Canvas and MediaStream APIs. Your gigabyte-sized video files never touch an external server.",
        },
      },
      {
        "@type": "Question",
        name: "What video formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can load and trim MP4, MOV, and WebM videos with support for exporting in standard MP4 or WebM formats.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Trim Video Clips Online for Free",
    description: "Cut and trim video timestamps safely in your web browser.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload or drag your video",
        text: "Select your MP4, MOV, or WebM video file.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust start and end timestamps",
        text: "Drag the timeline slider or type exact seconds to define your cut.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Render and download",
        text: "Click Cut & Render Clip to export your trimmed video.",
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
            label: catInfo ? catInfo.name : "Video & Audio",
            href: "/all-tools/video-audio",
          },
          { label: tool.title },
        ]}
      />

      {/* Main Interactive Tool */}
      <div className="mt-4">
        <TrimVideoTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          High-Speed In-Browser Video Trimmer &amp; Clip Cutter
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Trim highlights from gaming streams, podcasts, lectures, and social media reels without waiting for heavy cloud re-encoding.
          With instant timeline scrubbing, precise millisecond cutting, and customizable speed multipliers, Free Converting Tools delivers
          desktop-grade video editing straight in your browser.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              ✂️
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Lossless Timestamp Cuts</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Define start and stop markers visually or with numeric precision down to 0.1s increments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              🔇
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Audio Mute Option</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Easily strip background noise or unwanted sound with a single toggle before exporting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Zero Network Lag</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              No cloud rendering queues or file transfer delays. Trimming is executed locally on your GPU and CPU.
            </p>
          </div>
        </div>
      </div>

      {/* Related Tools Shelf */}
      {relatedTools.length > 0 && (
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-stone-900 tracking-tight">
              Related Video &amp; Audio Tools
            </h3>
            <Link
              href="/all-tools/video-audio"
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
