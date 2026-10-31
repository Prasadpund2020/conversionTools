import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ComparePdfTool } from "@/components/tools/compare-pdf/ComparePdfTool";

export const metadata: Metadata = {
  title: "Compare PDF Online Free - Side-by-Side Visual Diff & Revisions | Free Converting Tools",
  description:
    "Compare two PDF documents side by side to detect revisions, text differences, and layout changes. 100% private in-browser document audit.",
  keywords: [
    "compare pdf",
    "pdf diff online",
    "compare pdf files",
    "visual diff pdf",
    "side by side pdf compare",
    "free pdf comparison tool",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/compare-pdf",
  },
  openGraph: {
    title: "Compare PDF Online Free | Free Converting Tools",
    description:
      "Detect modifications and layout discrepancies between two PDF versions directly inside your web browser.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/compare-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Compare PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/compare-pdf",
  description:
    "Client-side PDF comparison utility. Inspect differences between two document revisions side-by-side or with interactive swipe curtains.",
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
      name: "How does the PDF comparison work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free Converting Tools parses both PDF files locally in your browser to inspect page dimensions, structure, content streams, and visual alignments to report page-by-page variances.",
      },
    },
    {
      "@type": "Question",
      name: "Are my confidential contracts or briefs uploaded to any server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Both PDF files are analyzed 100% locally on your machine. Your files never touch a remote server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export an audit report of the differences?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can export a comprehensive JSON audit file summarizing page counts, similarity percentages, and identified differences.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Compare Two PDF Files Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload Baseline Document A",
      text: "Select or drag your original PDF file into the Document A dropzone.",
    },
    {
      "@type": "HowToStep",
      name: "Upload New Revision Document B",
      text: "Select or drag the updated revision PDF into the Document B dropzone.",
    },
    {
      "@type": "HowToStep",
      name: "Inspect Differences",
      text: "Switch between Side-by-Side and Curtain Slider views to inspect variances page by page.",
    },
  ],
};

export default function ComparePdfPage() {
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
          <span className="text-on-surface">Compare PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-xs font-bold w-fit">
            <span>⚖️ Revision Comparison Studio</span>
            <span>•</span>
            <span>100% In-Browser Diff Engine</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Compare PDF Files Side-by-Side
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Spot contract modifications, text additions, and formatting revisions between two PDF files instantly without sending sensitive files to external servers.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Comparison Tool">
          <ComparePdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0891b2] text-white flex items-center justify-center text-xl shadow-md">
              ⚖️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Side-by-Side Alignment</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Synchronize viewing across corresponding page numbers to spot visual layout anomalies and paragraph alterations.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md">
              ↔️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Curtain Slider Diff</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Swipe across pages with an interactive curtain slider that reveals fine changes between old and new document drafts.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Strict Client Privacy</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              No files are uploaded or transmitted across the web. Byte inspection and structure analysis happen entirely on your machine.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I compare PDFs with different page counts?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Free Converting Tools handles unequal page counts cleanly, highlighting missing or added pages in the comparative report.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I export the audit log?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Click the Export Comparison Audit button to download a complete structured JSON breakdown of similarity scores.
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
              href="/all-tools/pdf/redact-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">⬛</span>
              <span className="text-xs font-bold text-on-surface">Redact PDF</span>
              <span className="text-[11px] text-on-surface-variant">Conceal private data</span>
            </Link>

            <Link
              href="/all-tools/pdf/watermark-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🛡️</span>
              <span className="text-xs font-bold text-on-surface">Watermark PDF</span>
              <span className="text-[11px] text-on-surface-variant">Stamp custom notices</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
