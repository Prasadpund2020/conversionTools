import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ComparePdfTool } from "@/components/tools/compare-pdf/ComparePdfTool";

export const metadata: Metadata = {
  title: "Compare PDF Files Online Free",
  description:
    "Compare two PDF files online. View them side by side or with a swipe slider, then export a page similarity report. Both files stay in your browser.",
  keywords: [
    "compare pdf files online",
    "compare pdf online",
    "pdf compare online",
    "online pdf compare",
    "compare pdf",
    "compare pdf files",
    "compare 2 pdf files",
    "pdf comparison online free",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/compare-pdf",
  },
  openGraph: {
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Compare PDF",
      },
    ],
    title: "Compare PDF Files Online Free",
    description:
      "Compare two PDF files side by side in your browser and export a page similarity report.",
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
    "Compare two PDF files in the browser with a side-by-side view, a swipe slider, and a page similarity score based on page size, rotation, and sampled file bytes.",
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
      name: "How do I compare two PDF files online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add the first PDF, add the second PDF, then switch between the side-by-side view and the swipe slider. Export Comparison Audit downloads a JSON report of the page scores.",
      },
    },
    {
      "@type": "Question",
      name: "Does the report list every text change?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Each page score uses page size, rotation, and a sample of bytes from the two files. Use the side-by-side view to look at the pages yourself. It is not a line-by-line text redline.",
      },
    },
    {
      "@type": "Question",
      name: "Can the two PDFs have different page counts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. When one file has a page the other does not, that page is marked different with a similarity score of 0.",
      },
    },
    {
      "@type": "Question",
      name: "Are the PDF files uploaded?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Both PDFs are read in your browser. Nothing is sent to a server for the comparison.",
      },
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
            Compare PDF Files Online
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Open two PDFs, view the same page side by side or with a swipe slider, and export a similarity report. The score uses page size, rotation, and a sample of file bytes. It is not a line-by-line text comparison.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Comparison Tool">
          <ComparePdfTool />
        </section>

        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-on-surface">How to compare two PDF files</h2>
          <ol className="list-decimal list-inside flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">
            <li>
              <span className="font-semibold text-on-surface">Add the first PDF</span>
              {" — "}this is the baseline file.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Add the second PDF</span>
              {" — "}this is the file you want to check against it.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Choose a view</span>
              {" — "}use side-by-side pages or the swipe slider, and move through page numbers.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Export the audit</span>
              {" — "}download the JSON similarity report if you need a record of the scores.
            </li>
          </ol>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            If the page order itself is wrong,{" "}
            <Link href="/all-tools/pdf/organize-pdf" className="text-primary font-semibold hover:underline">
              rearrange the PDF pages
            </Link>{" "}
            first, then come back and compare. To cover a passage instead of comparing it, use{" "}
            <Link href="/all-tools/pdf/redact-pdf" className="text-primary font-semibold hover:underline">
              visual PDF redaction
            </Link>
            .
          </p>
        </section>

        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-on-surface">What the PDF comparison includes</h2>
          <ul className="list-disc list-inside flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed">
            <li>Input is two PDF files. There is no Word, image, or scanned-photo mode on this page.</li>
            <li>Side-by-side and slider views let you look at the rendered pages.</li>
            <li>A page is scored from its size, rotation, and a sample of bytes. Unequal page counts are marked as different.</li>
            <li>The JSON export lists those scores. It does not produce a merged PDF or a text redline.</li>
            <li>Both files are processed in the browser and are not uploaded for comparison.</li>
          </ul>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0891b2] text-white flex items-center justify-center text-xl shadow-md">
              ⚖️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Side-by-Side Alignment</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Look at the same page number in both PDFs. This is a visual check, not a list of edited sentences.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md">
              ↔️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Curtain Slider Diff</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Drag the slider to reveal one PDF over the other on the same page. Use it to look for visible differences.
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
              <h3 className="text-sm font-bold text-on-surface">How do I compare two PDF files online?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Add the first PDF, add the second PDF, then switch between the side-by-side view and the swipe slider. Export Comparison Audit downloads a JSON report of the page scores.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Does the report list every text change?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. Each page score uses page size, rotation, and a sample of bytes from the two files. Use the side-by-side view to look at the pages yourself. It is not a line-by-line text redline.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can the two PDFs have different page counts?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. When one file has a page the other does not, that page is marked different with a similarity score of 0.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Are the PDF files uploaded?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. Both PDFs are read in your browser. Nothing is sent to a server for the comparison.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/pdf/organize-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">Organize PDF pages</span>
              <span className="text-[11px] text-on-surface-variant">Fix page order before you compare</span>
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
