import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { SplitPdfTool } from "@/components/tools/split-pdf/SplitPdfTool";

export const metadata: Metadata = {
  title: "Split PDF Online Free - Extract Pages & Ranges to Separate Files | Free Converting Tools",
  description:
    "Split a PDF into separate files instantly in your browser. Extract individual pages, split by custom page ranges, or combine selected pages with zero uploads.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "separate pdf pages",
    "split pdf by page range",
    "free split pdf online",
    "client-side pdf splitter",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/split-pdf",
  },
  openGraph: {
    title: "Split PDF Online Free | Free Converting Tools",
    description:
      "Separate PDF pages or extract custom ranges directly in your web browser with zero file uploads.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/split-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Split PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/split-pdf",
  description:
    "Client-side PDF page splitter. Extract all pages into single files or divide documents by custom ranges with ZIP bundle download.",
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
      name: "How does Free Converting Tools split PDF files without uploading them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free Converting Tools executes page division directly in your browser using the pdf-lib WebAssembly library. The PDF bytes are read into local memory and new PDFs are synthesized on your device.",
      },
    },
    {
      "@type": "Question",
      name: "Can I split a PDF into both individual files and a ZIP archive?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. When extracting multiple pages or ranges, Free Converting Tools generates both individual download links and a combined ZIP archive for one-click downloading.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a page count limit when splitting PDFs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There are no arbitrary page limits. Because processing runs locally on your machine, large multi-hundred-page documents can be split smoothly.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Split a PDF Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Select PDF Document",
      text: "Drag and drop or choose your PDF file to load it into the split workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Choose Splitting Mode",
      text: "Select 'Extract All Pages', 'Split by Custom Ranges' (e.g. 1-2, 3-5), or 'Extract Selected Pages'.",
    },
    {
      "@type": "HowToStep",
      name: "Split & Save",
      text: "Click Split & Download to produce your new PDF files or download the consolidated ZIP archive.",
    },
  ],
};

export default function SplitPdfPage() {
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
          <span className="text-on-surface">Split PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-800 dark:text-blue-300 text-xs font-bold w-fit">
            <span>✂️ Document Division Studio</span>
            <span>•</span>
            <span>100% Client-Side In-Memory Engine</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Split PDF Pages Online
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Separate large PDF documents into individual page files, extract custom chapter ranges, or pull selected pages into a new compact PDF.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Splitter Tool">
          <SplitPdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#006591] text-white flex items-center justify-center text-xl shadow-md">
              📐
            </div>
            <h3 className="text-lg font-bold text-on-surface">Flexible Range Splitting</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Define arbitrary page ranges like <code>1-3, 4-6, 10</code>. Free Converting Tools extracts every range into its own dedicated PDF document cleanly.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-700 text-white flex items-center justify-center text-xl shadow-md">
              📦
            </div>
            <h3 className="text-lg font-bold text-on-surface">Automatic ZIP Bundling</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              When splitting documents into dozens of individual pages, avoid downloading files one by one. Free Converting Tools generates a single ZIP bundle in memory.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Complete Privacy</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your sensitive financial records, medical documents, and legal files are split locally on your CPU with zero remote network storage.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will splitting affect annotations or links?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. Page graphics, vector fonts, embedded images, and standard annotations within the extracted pages are preserved verbatim.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I recombine split pages later?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes! You can use our companion <Link href="/all-tools/pdf/pdf-merge" className="text-primary font-bold hover:underline">PDF Merge</Link> tool anytime to merge your split files back into any sequence.
              </p>
            </div>
          </div>
        </section>

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
              href="/all-tools/pdf/watermark-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🛡️</span>
              <span className="text-xs font-bold text-on-surface">Watermark PDF</span>
              <span className="text-[11px] text-on-surface-variant">Add confidential stamps</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-to-jpg"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🖼️</span>
              <span className="text-xs font-bold text-on-surface">PDF to JPG</span>
              <span className="text-[11px] text-on-surface-variant">Render pages as images</span>
            </Link>

            <Link
              href="/all-tools/pdf/sign-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✍️</span>
              <span className="text-xs font-bold text-on-surface">Sign PDF</span>
              <span className="text-[11px] text-on-surface-variant">Stamp signature & date</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
