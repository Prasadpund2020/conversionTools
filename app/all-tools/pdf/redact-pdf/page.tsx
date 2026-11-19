import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { RedactPdfTool } from "@/components/tools/redact-pdf/RedactPdfTool";

export const metadata: Metadata = {
  title: "Redact PDF Free Online",
  description:
    "Cover text on a PDF with a black or white box, or a REDACTED label. The box is drawn on top of the page in your browser. It does not delete the underlying text.",
  keywords: [
    "redact pdf free",
    "redact pdf online",
    "redact pdf online free",
    "blackout pdf text",
    "pdf redaction tool",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/redact-pdf",
  },
  openGraph: {
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Redact PDF",
      },
    ],
    title: "Redact PDF Free Online",
    description:
      "Draw a blackout, whiteout, or REDACTED label on a PDF in your browser. The original text is covered, not removed from the file.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/redact-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Redact PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/redact-pdf",
  description:
    "Draw black, white, or labeled rectangles over PDF pages in the browser. The rectangles cover the view of the text. They do not remove the original text from the PDF.",
  applicationCategory: "SecurityApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RedactPdfPage() {
  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebapp) }}
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
            Redact a PDF Online for Free
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Draw a black box, a white box, or a REDACTED label over the parts of a page you do not want people to see. The mark is painted on top of the page. The original text can still be inside the PDF, so this is a visual cover, not certified redaction.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Redaction Tool">
          <RedactPdfTool />
        </section>

        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-on-surface">How to cover text in a PDF</h2>
          <ol className="list-decimal list-inside flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">
            <li>
              <span className="font-semibold text-on-surface">Open a PDF</span>
              {" — "}drop the file into the page. Encrypted files are opened with encryption ignored, so a password prompt is not part of this tool.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Choose a style</span>
              {" — "}blackout, whiteout, or a REDACTED label.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Draw boxes</span>
              {" — "}drag on the preview or use a quick zone. Switch pages to mark more than one page.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Download the PDF</span>
              {" — "}the new file includes the rectangles. Check it in another reader before you share it.
            </li>
          </ol>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            A stamp such as DRAFT or CONFIDENTIAL is a different job. Use{" "}
            <Link href="/all-tools/pdf/watermark-pdf" className="text-primary font-semibold hover:underline">
              watermark PDF
            </Link>{" "}
            for a text or image stamp, and{" "}
            <Link href="/all-tools/pdf/protect-pdf" className="text-primary font-semibold hover:underline">
              password-protect the PDF
            </Link>{" "}
            if you need to restrict opening the file.
          </p>
        </section>

        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-on-surface">What this redaction does and does not do</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            The tool draws an opaque rectangle, and for the label style it also draws the word REDACTED or your custom overlay text. It does not delete the original text operators from the page. Someone with a PDF editor may still be able to recover covered text. Do not use this for legal, medical, or disclosure redaction that requires the text to be removed.
          </p>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            The file is processed in your browser and is not uploaded to apply the boxes.
          </p>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center text-xl shadow-md">
              ⬛
            </div>
            <h3 className="text-lg font-bold text-on-surface">Opaque cover boxes</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Black and white rectangles are drawn on top of the page. They hide the area in normal viewing. They do not strip the text out of the file.
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
            <h3 className="text-lg font-bold text-on-surface">Processed in the browser</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              The PDF is read and saved locally. That privacy does not make the cover a certified redaction.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Does the blackout delete the text?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No. A rectangle is drawn over the area. The original text can remain in the PDF. Treat the result as a visual cover and review it before you share it.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I mark more than one page?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. Use the page switcher, then draw more boxes. Each box keeps the page number it was drawn on.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Is this the free redact PDF tool?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Yes. There is no account and no fee. The limit is the kind of redaction: visual cover only.
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
