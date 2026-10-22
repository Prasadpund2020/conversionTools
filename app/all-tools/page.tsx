import type { Metadata } from "next";
import AllToolsContent from "./AllToolsContent";

export const metadata: Metadata = {
  title: "All Tools — FileLab | Free Online File Conversion & Editing Tools",
  description:
    "Browse 33+ free client-side file tools: PDF conversion, image compression, video extraction, media downloads, OCR scanning, QR generation and more. 100% private, zero server uploads.",
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
    title: "All Tools — FileLab",
    description:
      "33+ handcrafted in-browser file utilities. Zero server uploads, zero subscriptions, 100% private.",
    type: "website",
  },
  alternates: {
    canonical: "/all-tools",
  },
};

export default function AllToolsRoutePage() {
  return <AllToolsContent />;
}
