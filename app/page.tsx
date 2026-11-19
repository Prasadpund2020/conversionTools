import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Free Online File Conversion, Compression & Download Tools",
  description:
    "Free tools to compare PDFs, convert images to WebP or PNG, resize photos, read text from an image, and encode a file as Base64. Each tool page explains what it really does.",
  keywords: [
    "free online tools",
    "compare pdf files online",
    "convert to webp",
    "jpg to png",
    "resize image online",
    "ocr scanner online",
    "base64 encoder",
    "redact pdf free",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} — Free Online File Conversion, Compression & Download Tools`,
    description:
      "Free PDF, image, and file tools. Open a tool to see its formats, limits, and whether the work stays in your browser.",
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
      "Free PDF, image, and file tools. Each page explains the formats it accepts and the limits of the result.",
    images: ["/images/all-tools-hero-banner.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
