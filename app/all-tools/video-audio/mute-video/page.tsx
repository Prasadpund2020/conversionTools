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
import MuteVideoTool from "@/components/tools/mute-video/MuteVideoTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("video-audio", "mute-video") ||
    getToolBySlug("mute-video");

  if (!tool) {
    return {
      title: "Mute Video Online Free — Strip Audio from MP4, MOV, WebM | FileLab",
      description:
        "Remove audio tracks and mute video files online for free. Strip unwanted sound and background noise from MP4, MOV, and WebM videos without uploading files.",
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
      url: `/all-tools/video-audio/mute-video`,
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
      canonical: `/all-tools/video-audio/mute-video`,
    },
  };
}

export default function MuteVideoPage() {
  const category = "video-audio";
  const slug = "mute-video";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "mute-video",
    title: "Mute Video",
    category: "video-audio",
    description: "Strip audio tracks from video files cleanly in pure browser memory.",
    clayColor: "clay-red",
    iconType: "volume-x",
    badgeText: "Audio Stripper",
    actionText: "Mute Video",
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
    url: `${SITE_URL}/all-tools/video-audio/mute-video`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with HTML5 Canvas and MediaRecorder support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side video muting",
      "Zero server uploads",
      "Audition before/after comparison",
      "Instant MP4 and WebM export",
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
        item: `${SITE_URL}/all-tools/video-audio/mute-video`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does muting a video reduce file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Stripping uncompressed or high-bitrate audio streams reduces the overall file payload, allowing for faster web sharing and lighter file storage.",
        },
      },
      {
        "@type": "Question",
        name: "Will the video quality be degraded when muted?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. FileLab processes video frames with high fidelity, preserving original resolution and frame rates without external compression artifacts.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Mute Video Online for Free",
    description: "Remove audio streams from video files safely in your browser.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload video file",
        text: "Select your MP4, MOV, or WebM video file.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Audition mute state",
        text: "Toggle between original sound and silent preview.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download muted video",
        text: "Click Strip Audio & Mute Video to export your silent clip.",
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
            label: catInfo ? catInfo.name : "Video & Audio",
            href: "/all-tools/video-audio",
          },
          { label: tool.title },
        ]}
      />

      {/* Main Interactive Tool */}
      <div className="mt-4">
        <MuteVideoTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Client-Side Video Audio Stripper &amp; Sound Remover
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Strip noisy ambient chatter, copyrighted songs, or wind distortion from personal videos, b-roll footage, and presentations.
          Operating entirely inside browser memory, FileLab gives you instant sound removal without upload limits, watermarks, or accounts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
              🔇
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Total Audio Isolation</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Completely disconnects and purges soundtrack streams for guaranteed silence.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
              ⚡
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Instant Browser Rendering</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Fast client-side video frame capture using hardware-accelerated MediaStream pipelines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
              🔒
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">100% Private</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Your confidential video footage remains safely isolated on your local computer or smartphone.
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
              className="text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors flex items-center gap-1"
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
