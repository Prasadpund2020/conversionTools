import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { RedactPdfTool } from "@/components/tools/redact-pdf/RedactPdfTool";

export const metadata: Metadata = {
  title: "Redact PDF Online Free - Permanent Blackout & PII Removal | FileLab",
  description:
    "Permanently redact sensitive PII, social security numbers, and financial data from PDF files online. Burn irreversible blackout or whiteout blocks with zero server uploads.",
  keywords: [
    "redact pdf",
    "blackout pdf text",
    "pdf redaction tool online",
    "remove pii from pdf",
    "free pdf redactor",
    "permanent pdf blackout",
  ],
  alternates: {
    canonical: "https://filelab.com/all-tools/pdf/redact-pdf",
  },
  openGraph: {
    title: "Redact PDF Online Free | FileLab",
    description:
      "Permanently obscure sensitive legal, medical, and financial information from your PDF pages directly in your browser.",
    url: "https://filelab.com/all-tools/pdf/redact-pdf",
    siteName: "FileLab",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FileLab Redact PDF Tool",
  url: "https://filelab.com/all-tools/pdf/redact-pdf",
  description:
    "In-browser PDF redaction application. Burn permanent opaque blackout barriers and whiteout masks into PDF documents without server transmission.",
  applicationCategory: "SecurityApplication",
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
      name: "Are redactions truly irreversible?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlike superficial desktop highlighter overlays, FileLab burns opaque vector geometry directly into the rendered stream and deletes underlying view references.",
      },
    },
    {
      "@type": "Question",
      name: "Do my sensitive documents get uploaded to a cloud server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All drawing, coordinate math, and PDF byte synthesis run strictly within your local browser memory via WebAssembly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I choose between solid blackouts and REDACTED label stamps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can switch between Solid Blackout, Clean Whiteout, and official [REDACTED] stamped boxes.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Redact Sensitive Content from a PDF Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Select PDF Document",
      text: "Drop or choose your PDF into the FileLab Redaction workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Mark Redaction Areas",
      text: "Drag directly on the interactive document preview to draw blackout or whiteout boxes over sensitive text.",
    },
    {
      "@type": "HowToStep",
      name: "Burn Redactions & Save",
      text: "Click Burn Redactions & Download to permanently bake the opaque boxes into a sanitized PDF file.",
    },
  ],
};

export default function RedactPdfPage() {
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
          <span className="text-on-surface">Redact PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-white text-xs font-bold w-fit">
            <span>⬛ Permanent Privacy Sanitizer</span>
            <span>•</span>
            <span>Zero Server Transmission</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Permanently Redact PDF Files
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Blackout confidential figures, patient records, and classified lines directly on the interactive preview.
            Permanent and irreversible concealment with zero cloud uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Redaction Tool">
          <RedactPdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-xl shadow-md">
              ⬛
            </div>
            <h3 className="text-lg font-bold text-on-surface">Permanent Opaque Baking</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Redactions are drawn into the underlying PDF vector layer so that text cannot be highlighted, selected, or inspected through developer tools.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-700 text-white flex items-center justify-center text-xl shadow-md">
              🎯
            </div>
            <h3 className="text-lg font-bold text-on-surface">Interactive Canvas Drawing</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Simply click and drag directly across the document surface to frame exact coordinates with pixel-perfect alignment.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">100% In-Browser Sanitization</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your unredacted source documents never travel across the internet. Protect patient PII and secret corporate numbers with complete peace of mind.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can someone undo the blackout in another PDF reader?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. The redaction writes solid vector geometry directly into the PDF content stream, ensuring that text underneath cannot be recovered or revealed by removing style sheets.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I redact multiple pages in the same PDF?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Use the page switcher arrows to navigate between pages and place as many redactions as needed across your entire file.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/pdf/protect-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🔒</span>
              <span className="text-xs font-bold text-on-surface">Protect PDF</span>
              <span className="text-[11px] text-on-surface-variant">Lock with password</span>
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
              href="/all-tools/pdf/compress-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress PDF</span>
              <span className="text-[11px] text-on-surface-variant">Shrink large files</span>
            </Link>

            <Link
              href="/all-tools/pdf/split-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✂️</span>
              <span className="text-xs font-bold text-on-surface">Split PDF</span>
              <span className="text-[11px] text-on-surface-variant">Extract pages or ranges</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
