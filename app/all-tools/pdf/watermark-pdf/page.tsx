import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { WatermarkPdfTool } from "@/components/tools/watermark-pdf/WatermarkPdfTool";

export const metadata: Metadata = {
  title: "Watermark PDF Online Free - Add Text & Image Stamps | Free Converting Tools",
  description:
    "Add custom text or image watermarks to PDF pages in seconds. Customize font, opacity, rotation, 3x3 placement grid, and tiled stamps with zero uploads.",
  keywords: [
    "watermark pdf",
    "add watermark to pdf",
    "stamp pdf online",
    "confidential stamp pdf",
    "logo watermark pdf",
    "free pdf watermarker",
    "client-side pdf watermark",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/watermark-pdf",
  },
  openGraph: {
    title: "Watermark PDF Online Free | Free Converting Tools",
    description:
      "Stamp PDFs with custom confidential watermarks, corporate logos, and diagonal copyright notices 100% in your browser.",
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
    "In-browser PDF watermarking suite. Stamp documents with custom typography, opacity, orientation, and logos without server uploads.",
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
      name: "Are my confidential PDF documents uploaded to a remote server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Free Converting Tools processes all PDF stamping directly inside your web browser via WebAssembly and pdf-lib. Your confidential records never leave your local machine.",
      },
    },
    {
      "@type": "Question",
      name: "Can I add both text and graphic logos as watermarks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can switch seamlessly between custom text inscriptions (such as CONFIDENTIAL or DRAFT) and graphic company logos (PNG or JPEG).",
      },
    },
    {
      "@type": "Question",
      name: "Can I watermark only specific pages in a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the target page range input to specify exact page numbers (e.g. 1-3, 5) or apply your stamp to all pages simultaneously.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Watermark a PDF Document Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload or Drop PDF",
      text: "Select or drop your PDF document into the Free Converting Tools Watermark workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Configure Watermark Properties",
      text: "Choose between Text or Image watermark, adjust font size, stamp opacity, rotation angle, and 3x3 grid position.",
    },
    {
      "@type": "HowToStep",
      name: "Apply and Download",
      text: "Click Apply Watermark to generate your stamped PDF instantly in your browser and save the result.",
    },
  ],
};

export default function WatermarkPdfPage() {
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
            Stamp confidential notices, copyright protection, and corporate logos across your PDF pages.
            Fully customizable rotation, opacity, typography, and page targeting with zero file uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Watermark Tool">
          <WatermarkPdfTool />
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
              Rendering and byte injection happen entirely inside your browser's V8 runtime.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will watermarking reduce the text sharpness of my original PDF?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. Free Converting Tools injects native PDF text and vector objects directly into the existing PDF structure without rasterizing the underlying pages, maintaining crisp 300+ DPI print quality.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I place the watermark underneath existing text?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Select &quot;Underneath&quot; in the Layer Depth settings to stamp your watermark behind existing page elements or &quot;Over Content&quot; for prominent stamps.
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
