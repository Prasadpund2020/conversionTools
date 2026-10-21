import type { Metadata, Viewport } from "next";
import { Inter, Caveat, Playfair_Display } from "next/font/google";
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
  title: "FileLab - Convert, Compress, Download",
  description: "Private & safe client-side file tools: PDF conversion, image compression, audio extraction, video downloads, and more.",
  keywords: ["pdf to word", "compress image", "pdf merge", "pdf to jpg", "remove background", "video to mp3", "youtube downloader", "image to pdf"],
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
      <body className="relative min-h-screen overflow-x-hidden font-sans select-none antialiased">
        {children}
      </body>
    </html>
  );
}
