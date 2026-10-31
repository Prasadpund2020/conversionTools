import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { OrganizePdfTool } from "@/components/tools/organize-pdf/OrganizePdfTool";

export const metadata: Metadata = {
  title: "Organize PDF Online Free - Rotate, Reorder & Delete Pages | Free Converting Tools",
  description:
    "Organize, reorder, rotate, duplicate, and delete PDF pages online. Drag and rearrange pages visually with instant private in-browser processing.",
  keywords: [
    "organize pdf",
    "reorder pdf pages",
    "rotate pdf pages",
    "delete pages from pdf",
    "duplicate pdf page",
    "free pdf page sorter",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
  },
  openGraph: {
    title: "Organize PDF Online Free | Free Converting Tools",
    description:
      "Visually rearrange, rotate, duplicate, and delete PDF pages directly inside your web browser.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Organize PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
  description:
    "Client-side PDF page organizer. Reorder, rotate, duplicate, and delete pages with an interactive visual grid.",
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
      name: "How does the PDF organizer work without server uploads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free Converting Tools reads your document into local memory using pdf-lib, lets you visually manipulate the page index sequence and rotation degrees, and synthesizes a new PDF on your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate individual pages or all pages at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both! You can click the rotate icon on individual page cards to turn them 90° clockwise, or click 'Rotate All Pages 90°' in the sidebar to orient the whole document.",
      },
    },
    {
      "@type": "Question",
      name: "Can I duplicate pages within the same document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Simply click the '+' duplicate button on any page card to clone that page directly into your document.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Reorder and Organize PDF Pages Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Drop PDF File",
      text: "Select or drop your PDF document into the organizer workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Rearrange, Rotate & Edit",
      text: "Use the arrow controls to move pages, rotate sideways sheets, duplicate sections, or delete unneeded pages.",
    },
    {
      "@type": "HowToStep",
      name: "Save & Download",
      text: "Click Save & Download PDF to compile your restructured document immediately.",
    },
  ],
};

export default function OrganizePdfPage() {
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
          <span className="text-on-surface">Organize PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-800 dark:text-purple-300 text-xs font-bold w-fit">
            <span>📑 Visual Page Layout Studio</span>
            <span>•</span>
            <span>100% In-Browser Manipulation</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Organize &amp; Reorder PDF Pages
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Visually arrange your document pages, rotate landscape scans, duplicate important sections, and remove excess pages with zero file uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Organizer Tool">
          <OrganizePdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#9333ea] text-white flex items-center justify-center text-xl shadow-md">
              🔄
            </div>
            <h3 className="text-lg font-bold text-on-surface">Instant Reordering &amp; Reversal</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Shift pages forward or backward with one click, or reverse the entire document sequence from last to first.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-violet-700 text-white flex items-center justify-center text-xl shadow-md">
              ⟳
            </div>
            <h3 className="text-lg font-bold text-on-surface">Granular Page Rotation</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Rotate individual upside-down or sideways pages by 90°, 180°, or 270° without affecting the rest of the document.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">100% Client-Side Privacy</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              No files are uploaded to remote servers. All page indexing, extraction, and compilation happen locally on your CPU.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will reordering pages degrade document quality?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. The underlying page streams and vector definitions are referenced directly without re-encoding or rasterizing images.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">What if I accidentally delete a page?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Simply click &quot;Reset to Original Order&quot; in the sidebar at any time to restore your document back to its initial state.
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
              href="/all-tools/pdf/pdf-merge"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">PDF Merge</span>
              <span className="text-[11px] text-on-surface-variant">Combine multiple documents</span>
            </Link>

            <Link
              href="/all-tools/pdf/compress-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress PDF</span>
              <span className="text-[11px] text-on-surface-variant">Optimize file size</span>
            </Link>

            <Link
              href="/all-tools/pdf/watermark-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🛡️</span>
              <span className="text-xs font-bold text-on-surface">Watermark PDF</span>
              <span className="text-[11px] text-on-surface-variant">Add custom stamps</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
