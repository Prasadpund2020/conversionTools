import type { Metadata } from "next";
import AllToolsContent from "./AllToolsContent";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Free File Tools",
  description:
    "Browse PDF, image, audio, and file tools. Compare PDFs, convert to WebP, resize images, scan a barcode, or encode Base64. Tool pages describe the real limits.",
  keywords: [
    "free file tools",
    "pdf tools",
    "image tools",
    "webp converter",
    "compare pdf online",
    "barcode scanner",
  ],
  openGraph: {
    title: `All Tools — ${SITE_NAME}`,
    description:
      "A directory of free PDF, image, audio, and file tools, with each page describing what that tool can and cannot do.",
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
      "A directory of free PDF, image, audio, and file tools, with each page describing what that tool can and cannot do.",
    images: ["/images/all-tools-hero-banner.png"],
  },
  alternates: {
    canonical: "/all-tools",
  },
};

export default function AllToolsRoutePage() {
  return <AllToolsContent />;
}
