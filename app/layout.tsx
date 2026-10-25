import type { Metadata, Viewport } from "next";
import { Inter, Caveat, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FileLab — Free Online File Conversion, Compression & Download Tools",
    template: "%s | FileLab",
  },
  description:
    "Private & safe client-side file tools: PDF conversion, image compression, audio extraction, video downloads, and more. 100% in-browser processing with zero server uploads.",
  keywords: [
    "pdf to word",
    "compress image",
    "pdf merge",
    "pdf to jpg",
    "remove background",
    "video to mp3",
    "youtube downloader",
    "image to pdf",
    "free converting tools",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FileLab — Free Online File Conversion & Editing Tools",
    description:
      "Private, client-side file tools running directly in your browser. Convert, compress, and download with zero server uploads.",
    url: SITE_URL,
    siteName: "FileLab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FileLab — Free Online File Tools",
    description:
      "Private & fast client-side file tools: PDF conversion, image compression, audio extraction, video downloads, and more.",
  },
  verification: {
    google: "google12e62b428644e34e",
    other: {
      "msvalidate.01": "723CAAC4B5340BA05AC43B1EC46DF2E1",
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FileLab",
  url: SITE_URL,
  description:
    "Free online conversion tools: convert PDF to Word, compress images, merge PDFs, extract audio from videos, and download media safely in your browser.",
};

export const viewport: Viewport = {
  themeColor: "#edebe6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
