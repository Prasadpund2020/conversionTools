import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { WatermarkPdfTool } from "@/components/tools/watermark-pdf/WatermarkPdfTool";

export const metadata: Metadata = {
  title: "Watermark PDF Online Free - Add Text & Image Stamps",
  description:
    "Add a text or image PDF stamp to selected pages. Choose font, color, opacity, rotation, and a single position or a tiled pattern. The file stays in your browser.",
  keywords: [
    "watermark pdf",
    "pdf stamp",
    "add watermark to pdf",
    "stamp pdf online",
    "text watermark pdf",
    "image watermark pdf",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/watermark-pdf",
  },
  openGraph: {
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Watermark PDF",
      },
    ],
    title: "Watermark PDF Online Free | Free Converting Tools",
    description:
      "Place a text or image PDF stamp on selected pages, with opacity, rotation, and tiled placement, in your browser.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/watermark-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Watermark PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/watermark-pdf",
  description:
    "Add a text or image stamp to PDF pages in the browser. Supports Helvetica, Times, or Courier bold text, a JPG or PNG image, opacity, rotation, page ranges, and tiled placement.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function WatermarkPdfPage() {
  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebapp) }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/all-tools" className="hover:text-primary transition-colors">All Tools</Link>
          <span>/</span>
          <Link href="/all-tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
          <span>/</span>
          <span className="text-on-surface">Watermark PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold w-fit">
            <span>🛡️ Enterprise Security Studio</span>
            <span>•</span>
            <span>100% Client-Side Processing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Watermark PDF Documents
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Place a PDF stamp on the pages you choose. Use short text in Helvetica, Times, or Courier bold, or a JPG or PNG image. Set opacity, rotation, one position, or a tiled pattern. The stamp is drawn on top of the page.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Watermark Tool">
          <WatermarkPdfTool />
        </section>

        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-on-surface">How to add a PDF stamp</h2>
          <ol className="list-decimal list-inside flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">
            <li>
              <span className="font-semibold text-on-surface">Open the PDF</span>
              {" — "}the page count is read in the browser.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Choose text or image</span>
              {" — "}type the stamp, or supply a JPG or PNG. Other image types are not embedded.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Set placement</span>
              {" — "}pick a position or tiling, then opacity, color, font, size, and rotation. Limit the page range if you do not want every page.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Download</span>
              {" — "}the stamp is drawn onto the existing pages without turning the whole PDF into an image.
            </li>
          </ol>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Need to hide a sentence instead of labeling the page?{" "}
            <Link href="/all-tools/pdf/redact-pdf" className="text-primary font-semibold hover:underline">
              Cover it with a redaction box
            </Link>
            . To change page order before stamping,{" "}
            <Link href="/all-tools/pdf/organize-pdf" className="text-primary font-semibold hover:underline">
              organize the PDF
            </Link>{" "}
            first.
          </p>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#023b2c] text-white flex items-center justify-center text-xl shadow-md">
              📐
            </div>
            <h3 className="text-lg font-bold text-on-surface">Precision Alignment & 3x3 Grid</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Snap watermarks to top, middle, center, or bottom corners, or enable repeating tiled patterns
              across the whole page canvas for maximum protection against document scraping.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md">
              👁️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Opacity & Angle Tuning</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Fine-tune transparency from faint 5% watermarks that preserve legibility up to 100% opaque stamps.
              Rotate diagonally at -45°, horizontally at 0°, or vertically at 90°.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Zero Cloud Ingress</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your confidential legal briefs, pitch decks, and financial statements never travel across the network.
              Rendering and byte injection happen entirely inside your browser&apos;s V8 runtime.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will the stamp flatten my PDF into an image?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. Text stamps are PDF text in Helvetica Bold, Times Bold, or Courier Bold. Image stamps are an embedded JPG or PNG. Existing page content is not re-rendered as a bitmap.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Where does the PDF stamp sit?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                It is drawn on top of the page. Lower the opacity if you still need the page text to be readable. A page range such as 1-3 limits which pages receive the stamp.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Is the file uploaded?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. The PDF and the optional stamp image are handled in your browser.
              </p>
            </div>
          </div>
        </section>

        <p className="text-sm text-on-surface-variant">
          Prefer to set page order first?{" "}
          <Link
            href="/all-tools/pdf/organize-pdf"
            className="text-primary font-semibold hover:underline"
          >
            rearrange PDF pages
          </Link>
          , then add your watermark.
        </p>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/pdf/pdf-merge"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">PDF Merge</span>
              <span className="text-[11px] text-on-surface-variant">Combine multiple documents</span>
            </Link>

            <Link
              href="/all-tools/pdf/sign-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✍️</span>
              <span className="text-xs font-bold text-on-surface">Sign PDF</span>
              <span className="text-[11px] text-on-surface-variant">Draw & stamp signatures</span>
            </Link>

            <Link
              href="/all-tools/pdf/image-to-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🖼️</span>
              <span className="text-xs font-bold text-on-surface">Image to PDF</span>
              <span className="text-[11px] text-on-surface-variant">Convert JPG & PNG to PDF</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-to-word"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📄</span>
              <span className="text-xs font-bold text-on-surface">PDF to Word</span>
              <span className="text-[11px] text-on-surface-variant">Extract text to DOCX</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
