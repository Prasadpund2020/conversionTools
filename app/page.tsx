import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Online File Conversion, Compression & Download Tools",
  description:
    "Free online file tools for PDF, image, audio, video, and format conversion. Many tools process files in your browser; review each tool page for its processing method and supported formats.",
  keywords: [
    "free online tools",
    "pdf to word converter",
    "compress image online",
    "merge pdf files",
    "pdf to jpg converter",
    "remove background free",
    "video to mp3 converter",
    "youtube downloader hd",
    "image to pdf",
    "client-side file tools",
    "no upload file converter",
    "private file tools",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Free Online File Conversion, Compression & Download Tools`,
    description:
      "Free PDF, image, audio, video, and file conversion utilities. Tool pages explain supported formats and whether processing runs in your browser.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Free Online File Tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Online File Tools`,
    description:
      "Free PDF, image, audio, video, and file conversion utilities with tool-specific format and processing details.",
    images: ["/images/all-tools-hero-banner.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
