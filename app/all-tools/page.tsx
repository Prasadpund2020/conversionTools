import type { Metadata } from "next";
import AllToolsContent from "./AllToolsContent";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Tools — Free Online File Conversion & Editing Suite",
  description:
    "Browse free PDF, image, video, audio, downloader, OCR, QR, and file conversion tools. Each tool page lists supported formats and processing details.",
  keywords: [
    "free online tools",
    "all tools",
    "pdf converter",
    "image compressor",
    "video to mp3",
    "youtube downloader",
    "file tools",
    "client-side tools",
    "browser tools",
    "no upload tools",
  ],
  openGraph: {
    title: `All Tools — ${SITE_NAME}`,
    description:
      "Free file utilities with tool-specific processing details and no account required.",
    type: "website",
    url: "/all-tools",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: `All Tools — ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `All Tools — ${SITE_NAME}`,
    description:
      "Free file utilities with tool-specific processing details and no account required.",
    images: ["/images/all-tools-hero-banner.png"],
  },
  alternates: {
    canonical: "/all-tools",
  },
};

export default function AllToolsRoutePage() {
  return <AllToolsContent />;
}
