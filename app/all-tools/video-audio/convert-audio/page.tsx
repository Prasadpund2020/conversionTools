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
import ConvertAudioTool from "@/components/tools/convert-audio/ConvertAudioTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("video-audio", "convert-audio") ||
    getToolBySlug("convert-audio");

  if (!tool) {
    return {
      title: "Audio Converter Online Free — Transcode MP3, WAV, FLAC, AAC, OGG | Free Converting Tools",
      description:
        "Convert audio files between MP3, WAV, AAC, FLAC, and OGG online. High-fidelity transcoding with custom bitrates and sample rates directly in your browser.",
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
      url: `/all-tools/video-audio/convert-audio`,
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
      canonical: `/all-tools/video-audio/convert-audio`,
    },
  };
}

export default function ConvertAudioPage() {
  const category = "video-audio";
  const slug = "convert-audio";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "convert-audio",
    title: "Audio Converter",
    category: "video-audio",
    description: "Transcode between WAV, FLAC, AAC, OGG and MP3 formats.",
    clayColor: "clay-blue",
    iconType: "music",
    badgeText: "Lossless Audio",
    actionText: "Convert Audio",
    isPrimaryAction: true,
    acceptedFormats: ".wav,.flac,.aac,.ogg,.mp3",
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
    url: `${SITE_URL}/all-tools/video-audio/convert-audio`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with Web Audio API support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side audio transcoding",
      "Zero server uploads",
      "Bitrate options up to 320 kbps Studio",
      "Stereo and Mono downmixing",
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
        item: `${SITE_URL}/all-tools/video-audio/convert-audio`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which audio formats can I convert between?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can convert between MP3, WAV, AAC, FLAC, and OGG formats with customizable bitrates up to 320 kbps and custom sample rates.",
        },
      },
      {
        "@type": "Question",
        name: "Are my music recordings or voice memos uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All audio transcoding runs 100% client-side inside your browser's private Web Audio memory sandbox.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Audio Files Online for Free",
    description: "Transcode audio between formats in three simple steps.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Select your audio file",
        text: "Upload your WAV, MP3, AAC, FLAC, or OGG file.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose target format & bitrate",
        text: "Pick your target format, sample rate, and bitrate settings.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Audition and download",
        text: "Audition the transcoded audio and download your new file.",
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
        <ConvertAudioTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Professional In-Browser Audio Transcoder &amp; Format Converter
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Convert music tracks, field recordings, voice memos, and audiobooks between industry standard audio formats.
          Featuring customizable 320 kbps studio bitrates, high sample rate resampling, and stereo-to-mono downmixing,
          Free Converting Tools gives you total acoustic control without sending your media across the web.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-3">
              🎵
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Universal Format Support</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Transcode between MP3, WAV, AAC, FLAC, and OGG formats with lossless PCM precision.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-3">
              🎚️
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Up to 320 kbps Studio Quality</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Export ultra-clean audio with custom bitrates and optional peak dynamic gain normalization.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm mb-3">
              🔒
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Private &amp; Offline-Ready</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Audio decoding and encoding execute entirely inside your device RAM with zero cloud egress.
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
              className="text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors flex items-center gap-1"
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
