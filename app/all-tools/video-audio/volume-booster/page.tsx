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
import VolumeBoosterTool from "@/components/tools/volume-booster/VolumeBoosterTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("video-audio", "volume-booster") ||
    getToolBySlug("volume-booster");

  if (!tool) {
    return {
      title: "Audio & Volume Booster Online Free — Amplify Audio to 300% | Free Converting Tools",
      description:
        "Boost quiet MP3, WAV, and video audio tracks up to 300% without distortion. Real-time equalizer smoothing and anti-clipping limiter directly in your browser.",
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
      url: `/all-tools/video-audio/volume-booster`,
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
      canonical: `/all-tools/video-audio/volume-booster`,
    },
  };
}

export default function VolumeBoosterPage() {
  const category = "video-audio";
  const slug = "volume-booster";

  const tool = getToolBySlugs(category, slug) || getToolBySlug(slug) || {
    id: "volume-booster",
    title: "Audio Booster",
    category: "video-audio",
    description: "Amplify quiet audio and video tracks up to 300% with equalizer smoothing.",
    clayColor: "clay-yellow",
    iconType: "volume",
    badgeText: "300% Boost",
    actionText: "Amplify Audio",
    isPrimaryAction: true,
    acceptedFormats: ".mp3,.wav,.mp4",
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
    url: `${SITE_URL}/all-tools/video-audio/volume-booster`,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Browser-based)",
    browserRequirements: "Requires modern web browser with Web Audio API support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side Web Audio amplification",
      "Zero server uploads",
      "Anti-clipping dynamic soft limiter",
      "Equalizer bass and treble enhancement",
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
        item: `${SITE_URL}/all-tools/video-audio/volume-booster`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the volume booster prevent harsh digital distortion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Free Converting Tools integrates an anti-clipping dynamics compressor (soft limiter) directly into the Web Audio graph to round out sharp waveform peaks when boosting volume up to 300%.",
        },
      },
      {
        "@type": "Question",
        name: "Can I boost volume on video files directly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload MP4, WebM, and MOV videos, and Free Converting Tools will decode and amplify the audio track for instant export.",
        },
      },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Boost Audio Volume Online up to 300%",
    description: "Amplify quiet audio and video recordings safely in your browser.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Upload your media",
        text: "Select your MP3, WAV, or MP4 video file.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Adjust boost multiplier & EQ",
        text: "Choose 150%, 200%, or 300% boost and toggle the anti-clipping limiter.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Audition and download",
        text: "Preview the boosted audio live and download the amplified track.",
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
        <VolumeBoosterTool />
      </div>

      {/* SEO & Feature Info Section */}
      <div className="mt-16 bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/80 p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-stone-900 mb-4 tracking-tight">
          Professional Studio Audio Gain &amp; Loudness Maximizer
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed mb-8 max-w-4xl">
          Fix barely audible phone recordings, quiet Zoom meetings, conference keynotes, and podcast episodes.
          Powered by browser-native Web Audio API gain stages and studio-grade dynamic limiters, Free Converting Tools enhances audio presence,
          bass punch, and speech intelligibility without digital crackle or cloud latency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              🔊
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Up to 300% Linear Gain</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Scale volume smoothly from 1.0x to 3.0x (+12 dB) to rescue quiet, distant microphones.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              🛡️
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Anti-Clipping Soft Limiter</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Dynamic peak compression prevents harsh squaring and speaker-damaging distortion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              🎛️
            </div>
            <h3 className="text-sm font-bold text-stone-800 mb-1">Bass &amp; Treble EQ</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Fine-tune vocal clarity and low-end warmth with real-time frequency shelf filters.
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
