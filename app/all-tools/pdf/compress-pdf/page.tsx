import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CompressPdfTool } from "@/components/tools/compress-pdf/CompressPdfTool";

export const metadata: Metadata = {
  title: "Compress PDF Online Free - Reduce PDF File Size in Browser | FileLab",
  description:
    "Compress PDF files online for free. Reduce PDF file sizes up to 80% while maintaining crisp vector text and print quality with zero server uploads.",
  keywords: [
    "compress pdf",
    "reduce pdf file size",
    "shrink pdf online",
    "free pdf compressor",
    "compress pdf client side",
    "pdf size reducer",
  ],
  alternates: {
    canonical: "https://filelab.com/all-tools/pdf/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online Free | FileLab",
    description:
      "Shrink bloated PDF documents up to 80% directly in your browser without uploading to any remote server.",
    url: "https://filelab.com/all-tools/pdf/compress-pdf",
    siteName: "FileLab",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FileLab Compress PDF Tool",
  url: "https://filelab.com/all-tools/pdf/compress-pdf",
  description:
    "Client-side PDF compression utility. Compacts indirect stream objects and strips unnecessary metadata without server transmission.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does client-side PDF compression work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FileLab reconstructs the PDF object tree using object streams and flate encoding, purging orphaned revisions, uncompressed streams, and redundant metadata directly in your browser's memory.",
      },
    },
    {
      "@type": "Question",
      name: "Will text become blurry after compression?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Vector fonts, glyph paths, and mathematical text representations are never downsampled or rasterized, guaranteeing crisp typography at all zoom levels.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files uploaded to your cloud servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. All compression operations run locally inside your web browser. Your confidential PDFs never touch external servers or third-party storage.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compress a PDF Document Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload or Drop PDF",
      text: "Select or drop your large PDF document into the FileLab compression workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Select Compression Level",
      text: "Choose between Extreme, Recommended (Best Balance), or Low compression.",
    },
    {
      "@type": "HowToStep",
      name: "Compress and Save",
      text: "Click Compress & Download to generate your optimized PDF document instantly.",
    },
  ],
};

export default function CompressPdfPage() {
  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebapp) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
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
          <span className="text-on-surface">Compress PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold w-fit">
            <span>🗜️ Stream Optimization Studio</span>
            <span>•</span>
            <span>100% In-Browser Compression</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Compress PDF Files Online
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Shrink heavy PDF documents up to 80% with object stream bundling and metadata cleanup without sacrificing text sharpness or print clarity.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Compression Tool">
          <CompressPdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center text-xl shadow-md">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-on-surface">Flate Stream Packing</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Consolidates thousands of individual PDF dictionary objects into high-density compressed streams, dramatically reducing file size.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md">
              🧹
            </div>
            <h3 className="text-lg font-bold text-on-surface">Orphan Object Purging</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Removes obsolete cross-reference tables, hidden edit revisions, and duplicate metadata headers left behind by older desktop editors.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Guaranteed Privacy</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              No files are sent across the Internet. Compression runs exclusively on your device&apos;s CPU inside your private browser sandbox.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Why was my PDF file size already small?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Some PDFs created by modern export tools are already pre-optimized with compressed streams. In such cases, FileLab preserves your best file size without bloating it.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I compress scanned documents?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Scanned documents benefit significantly from object stream packing and structure cleanup, making them faster to email and attach.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/pdf/split-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✂️</span>
              <span className="text-xs font-bold text-on-surface">Split PDF</span>
              <span className="text-[11px] text-on-surface-variant">Separate into pages or ranges</span>
            </Link>

            <Link
              href="/all-tools/pdf/watermark-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🛡️</span>
              <span className="text-xs font-bold text-on-surface">Watermark PDF</span>
              <span className="text-[11px] text-on-surface-variant">Add confidential stamps</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-merge"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">PDF Merge</span>
              <span className="text-[11px] text-on-surface-variant">Combine multiple documents</span>
            </Link>

            <Link
              href="/all-tools/image/compress-image"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress Image</span>
              <span className="text-[11px] text-on-surface-variant">Shrink JPG & PNG photos</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
