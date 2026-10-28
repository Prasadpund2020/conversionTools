import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { AddPageNumbersTool } from "@/components/tools/add-page-numbers/AddPageNumbersTool";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Online Free - Bates Stamping & Footers | FileLab",
  description:
    "Add page numbers and legal Bates stamping to PDF documents online for free. Customize headers, footers, typography, offsets, and start numbers with zero server uploads.",
  keywords: [
    "add page numbers to pdf",
    "bates numbering online",
    "number pdf pages",
    "pdf page numbering free",
    "add footer to pdf",
    "bates stamping online free",
  ],
  alternates: {
    canonical: "https://filelab.com/all-tools/pdf/add-page-numbers",
  },
  openGraph: {
    title: "Add Page Numbers to PDF Online Free | FileLab",
    description:
      "Stamp sequential page numbers, headers, footers, and legal Bates numbers directly in your browser.",
    url: "https://filelab.com/all-tools/pdf/add-page-numbers",
    siteName: "FileLab",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FileLab Add Page Numbers Tool",
  url: "https://filelab.com/all-tools/pdf/add-page-numbers",
  description:
    "In-browser PDF page numbering and Bates stamping utility. Stamp customizable headers and footers without server transmission.",
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
      name: "Can I choose where page numbers appear on the page?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can select from 6 standardized header and footer zones: Top-Left, Top-Center, Top-Right, Bottom-Left, Bottom-Center, and Bottom-Right.",
      },
    },
    {
      "@type": "Question",
      name: "Does FileLab support legal Bates numbering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FileLab offers specialized Bates stamping with custom case prefixes (e.g., CONF, PLAINTIFF) and configurable zero-padding digits.",
      },
    },
    {
      "@type": "Question",
      name: "Are my documents uploaded to an external server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All font calculations, vector placements, and PDF byte saves execute 100% locally inside your web browser.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Add Page Numbers to a PDF Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload PDF",
      text: "Select or drop your PDF document into the FileLab workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Select Position & Numbering Format",
      text: "Choose your preferred header or footer position and select between Page X, Page X of Y, or Bates format.",
    },
    {
      "@type": "HowToStep",
      name: "Apply & Download",
      text: "Click Stamp Numbers & Download to generate your numbered PDF immediately.",
    },
  ],
};

export default function AddPageNumbersPage() {
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
          <span className="text-on-surface">Add Page Numbers</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 text-xs font-bold w-fit">
            <span>🔢 Sequential Pagination Studio</span>
            <span>•</span>
            <span>100% In-Browser Vector Stamping</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Add Page Numbers to PDF Files
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Stamp clean sequential headers, footers, page counts, and legal Bates numbers across your document pages with zero file uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="Add Page Numbers Tool">
          <AddPageNumbersTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center text-xl shadow-md">
              📐
            </div>
            <h3 className="text-lg font-bold text-on-surface">6 Header &amp; Footer Zones</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Place numbers cleanly at top-left, top-center, top-right, or across lower footers with customizable margin point padding.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md">
              ⚖️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Legal Bates Stamping</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Generate standardized court discovery identifiers such as <code>CONF-000001</code> with customizable prefixes and padding widths.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Client-Side Privacy</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your confidential legal briefs, invoices, and manuscripts are stamped directly inside your web browser. No cloud upload required.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I skip numbering on the cover page?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Use the page range input to specify <code>2-10</code> (or any target range), leaving your cover page clean and unnumbered.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will the numbers overlap existing text?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Page numbers are placed in standard margins outside normal paragraph boundaries. You can also adjust font size and margin distance in settings.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/pdf/watermark-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🛡️</span>
              <span className="text-xs font-bold text-on-surface">Watermark PDF</span>
              <span className="text-[11px] text-on-surface-variant">Add confidential stamps</span>
            </Link>

            <Link
              href="/all-tools/pdf/organize-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">Organize PDF</span>
              <span className="text-[11px] text-on-surface-variant">Reorder & rotate pages</span>
            </Link>

            <Link
              href="/all-tools/pdf/split-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✂️</span>
              <span className="text-xs font-bold text-on-surface">Split PDF</span>
              <span className="text-[11px] text-on-surface-variant">Separate into pages</span>
            </Link>

            <Link
              href="/all-tools/pdf/sign-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✍️</span>
              <span className="text-xs font-bold text-on-surface">Sign PDF</span>
              <span className="text-[11px] text-on-surface-variant">Add digital signature</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
