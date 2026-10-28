import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { RepairPdfTool } from "@/components/tools/repair-pdf/RepairPdfTool";

export const metadata: Metadata = {
  title: "Repair PDF Online Free - Fix Corrupted & Damaged PDF Files | FileLab",
  description:
    "Repair damaged and corrupted PDF files online. Reconstruct broken cross-reference (xref) tables, fix missing EOF trailers, and salvage unreadable pages with zero server uploads.",
  keywords: [
    "repair pdf",
    "fix corrupted pdf",
    "restore damaged pdf",
    "recover pdf online",
    "pdf xref repair",
    "free pdf healer",
  ],
  alternates: {
    canonical: "https://filelab.com/all-tools/pdf/repair-pdf",
  },
  openGraph: {
    title: "Repair PDF Online Free | FileLab",
    description:
      "Reconstruct corrupted PDF documents and recover unreadable pages directly in your browser with zero data leakage.",
    url: "https://filelab.com/all-tools/pdf/repair-pdf",
    siteName: "FileLab",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FileLab Repair PDF Tool",
  url: "https://filelab.com/all-tools/pdf/repair-pdf",
  description:
    "In-browser PDF repair and recovery application. Rebuilds cross-reference tables and recovers corrupted page dictionaries without server transmission.",
  applicationCategory: "UtilitiesApplication",
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
      name: "How does FileLab repair corrupted PDF files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FileLab analyzes the raw binary bytes of the document to detect damaged headers, missing %%EOF trailer markers, and broken cross-reference (xref) offsets, reconstructing them into a clean, compliant PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Are my broken files uploaded to a remote server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The entire byte scanning and reconstruction pipeline executes 100% locally in your web browser. Your confidential files are never uploaded.",
      },
    },
    {
      "@type": "Question",
      name: "Can every corrupted PDF be fixed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most files corrupted by incomplete downloads, truncated transfer streams, or broken xref tables can be fully repaired. If the underlying content streams were entirely overwritten, some pages may be lost.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Repair a Damaged PDF Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Drop Damaged PDF",
      text: "Select or drop your unreadable PDF file into the repair dropzone.",
    },
    {
      "@type": "HowToStep",
      name: "Select Repair Options",
      text: "Enable Xref rebuilding, trailer regeneration, and stream sanitization.",
    },
    {
      "@type": "HowToStep",
      name: "Reconstruct & Download",
      text: "Click Reconstruct & Repair PDF to salvage pages and download your fixed document.",
    },
  ],
};

export default function RepairPdfPage() {
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
          <span className="text-on-surface">Repair PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold w-fit">
            <span>🛠️ Document Restoration Studio</span>
            <span>•</span>
            <span>100% In-Browser Binary Reconstruction</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Repair Damaged &amp; Corrupted PDFs
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Reconstruct broken cross-reference tables, fix truncated EOF trailers, and salvage unreadable PDF pages directly in your browser with zero server uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Repair Tool">
          <RepairPdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ca8a04] text-white flex items-center justify-center text-xl shadow-md">
              🛠️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Xref Table Regeneration</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Recalculates exact byte offsets for every object reference in the PDF, restoring compatibility with strict enterprise PDF readers.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center text-xl shadow-md">
              🔬
            </div>
            <h3 className="text-lg font-bold text-on-surface">Deep Header &amp; Trailer Fixes</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Detects and strips corrupted preamble bytes, validates <code>%PDF-1.x</code> markers, and injects compliant <code>%%EOF</code> block trailers.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Client-Side Guarantee</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Never risk uploading damaged proprietary reports to untrusted servers. Processing runs exclusively in your private browser sandbox.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Why do PDF files become corrupted?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                PDF corruption frequently occurs when downloads are interrupted, email attachments are prematurely detached, or disk sectors experience partial read errors.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will the repaired document lose formatting?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. Recoverable pages retain their full vector typography, embedded images, and layout geometries without rasterization.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/pdf/compress-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress PDF</span>
              <span className="text-[11px] text-on-surface-variant">Optimize file size</span>
            </Link>

            <Link
              href="/all-tools/pdf/split-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✂️</span>
              <span className="text-xs font-bold text-on-surface">Split PDF</span>
              <span className="text-[11px] text-on-surface-variant">Extract pages or ranges</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-merge"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">PDF Merge</span>
              <span className="text-[11px] text-on-surface-variant">Combine documents</span>
            </Link>

            <Link
              href="/all-tools/pdf/protect-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🔒</span>
              <span className="text-xs font-bold text-on-surface">Protect PDF</span>
              <span className="text-[11px] text-on-surface-variant">Password encryption</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
