import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { HtmlToPdfTool } from "@/components/tools/html-to-pdf/HtmlToPdfTool";

export const metadata: Metadata = {
  title: "HTML to PDF Converter Free Online - Convert Web Pages & Code | FileLab",
  description:
    "Convert HTML files, raw code, and web layouts into high-resolution printable PDF documents online. Custom paper sizes, margins, and CSS rendering with zero server uploads.",
  keywords: [
    "html to pdf",
    "convert html to pdf online",
    "webpage to pdf",
    "html code to pdf",
    "free html to pdf converter",
    "client-side html to pdf",
  ],
  alternates: {
    canonical: "https://filelab.com/all-tools/pdf/html-to-pdf",
  },
  openGraph: {
    title: "HTML to PDF Converter Free Online | FileLab",
    description:
      "Transform HTML code, web pages, and documents into print-ready PDF files directly in your web browser.",
    url: "https://filelab.com/all-tools/pdf/html-to-pdf",
    siteName: "FileLab",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FileLab HTML to PDF Tool",
  url: "https://filelab.com/all-tools/pdf/html-to-pdf",
  description:
    "In-browser HTML to PDF rendering engine. Converts HTML files and raw markup into paginated vector PDF documents without server transmission.",
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
      name: "How does the HTML to PDF conversion work in the browser?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FileLab renders your HTML markup through an in-memory high-DPI canvas using SVG foreignObject technologies, and encodes the resulting visual vectors into standard PDF pages via pdf-lib.",
      },
    },
    {
      "@type": "Question",
      name: "Are CSS styles and web fonts preserved?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Standard inline CSS, layout flexboxes, grid systems, and typography rules are rendered faithfully.",
      },
    },
    {
      "@type": "Question",
      name: "Are my HTML files uploaded to a remote server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Conversion executes 100% inside your local browser memory. No HTML code, proprietary templates, or personal data leave your device.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert HTML to PDF Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload HTML File or Paste Code",
      text: "Drag and drop your .html file or paste raw HTML code into the input field.",
    },
    {
      "@type": "HowToStep",
      name: "Customize Paper Layout",
      text: "Choose paper size (A4, Letter, Legal), orientation (Portrait, Landscape), and margins.",
    },
    {
      "@type": "HowToStep",
      name: "Convert & Download",
      text: "Click Convert to PDF to render and download your new document instantly.",
    },
  ],
};

export default function HtmlToPdfPage() {
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
          <span className="text-on-surface">HTML to PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-800 dark:text-orange-300 text-xs font-bold w-fit">
            <span>🌐 Web Markup Rendering Studio</span>
            <span>•</span>
            <span>100% In-Browser PDF Generation</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Convert HTML to PDF Documents
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Turn web pages, raw HTML markup, invoices, and templates into clean, printable vector PDF files with custom paper sizes and orientation.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="HTML to PDF Tool">
          <HtmlToPdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#ea580c] text-white flex items-center justify-center text-xl shadow-md">
              📐
            </div>
            <h3 className="text-lg font-bold text-on-surface">Precision Paper Geometries</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Export to standardized ISO A4, US Letter, or US Legal paper formats with configurable margins and landscape or portrait orientation.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md">
              🎨
            </div>
            <h3 className="text-lg font-bold text-on-surface">CSS &amp; Background Fidelity</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Preserves modern CSS declarations, flex containers, text formatting, and background colors without clipping or font substitutions.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">100% Private Execution</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              No server-side headless browsers or remote renderers. All page synthesis occurs inside your device&apos;s sandboxed browser memory.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I paste raw HTML directly without saving a file?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes! Click the &quot;Paste HTML Code&quot; tab to type or paste HTML snippets, email templates, or receipt tables directly.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Are external images supported?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Inline SVG graphics and base64 data URIs are rendered with 100% accuracy. For external URLs, ensure cross-origin (CORS) permissions allow image loading.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/edit-convert/word-to-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📄</span>
              <span className="text-xs font-bold text-on-surface">Word to PDF</span>
              <span className="text-[11px] text-on-surface-variant">Convert DOCX to PDF</span>
            </Link>

            <Link
              href="/all-tools/pdf/image-to-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🖼️</span>
              <span className="text-xs font-bold text-on-surface">Image to PDF</span>
              <span className="text-[11px] text-on-surface-variant">Convert PNG & JPG</span>
            </Link>

            <Link
              href="/all-tools/pdf/compress-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress PDF</span>
              <span className="text-[11px] text-on-surface-variant">Reduce file size</span>
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
