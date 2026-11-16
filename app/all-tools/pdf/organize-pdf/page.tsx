import type { Metadata } from "next";
import Link from "next/link";
import { OrganizePdfTool } from "@/components/tools/organize-pdf/OrganizePdfTool";

export const metadata: Metadata = {
  title: "Rearrange & Reorder PDF Pages Online Free",
  description:
    "Rearrange, reorder, rotate and delete PDF pages online for free. Organize your PDF visually and download it. Files stay in your browser, nothing is uploaded.",
  keywords: [
    "organize pdf",
    "reorder pdf pages",
    "rotate pdf pages",
    "delete pages from pdf",
    "duplicate pdf page",
    "free pdf page sorter",
    "rearrange pdf pages",
    "rearrange pdf pages online",
    "pdf page arranger",
    "reorder pdf online",
    "organize pdf free",
    "free pdf page organizer",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
  },
  openGraph: {
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Organize PDF",
      },
    ],
    title: "Rearrange & Reorder PDF Pages Online Free",
    description:
      "Rearrange, reorder, rotate and delete PDF pages online for free. Organize your PDF visually in your browser — nothing is uploaded.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const faqs = [
  {
    question: "Will reordering pages degrade document quality?",
    answer:
      "No. The underlying page streams and vector definitions are referenced directly without re-encoding or rasterizing images.",
  },
  {
    question: "What if I accidentally delete a page?",
    answer:
      'Simply click "Reset to Original Order" in the sidebar at any time to restore your document back to its initial state.',
  },
  {
    question: "How do I rearrange pages in a PDF for free?",
    answer:
      "Upload your PDF, then use the left and right controls on each page card to change the page order. Rotate, duplicate, or delete pages as needed, then click Save & Download PDF. The tool is free and runs in your browser.",
  },
  {
    question: "Can I move multiple pages in a PDF?",
    answer:
      "You rearrange pages one at a time with the left/right controls. To flip the whole document at once, use Reverse Page Sequence. There is no multi-select bulk move.",
  },
  {
    question: "Are my PDF files uploaded to a server?",
    answer:
      "No. Your file is read and rebuilt entirely in your browser with client-side PDF processing. Nothing is uploaded to our servers.",
  },
  {
    question: "Can I rotate or delete pages while rearranging?",
    answer:
      "Yes. You can rotate a single page or all pages by 90°, duplicate a page, or delete pages you do not need — then save the new page order.",
  },
  {
    question: "Is there a page limit or file size limit?",
    answer:
      "There is no hard page or file-size limit in the tool. It works with most PDFs; very large files depend on your device's memory.",
  },
];

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Organize PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
  description:
    "Client-side PDF page organizer. Rearrange, reorder, rotate, duplicate, and delete pages with an interactive visual grid.",
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
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://freeconvertingtools.co.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "All Tools",
      item: "https://freeconvertingtools.co.in/all-tools",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "PDF Tools",
      item: "https://freeconvertingtools.co.in/all-tools/pdf",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Organize PDF",
      item: "https://freeconvertingtools.co.in/all-tools/pdf/organize-pdf",
    },
  ],
};

export default function OrganizePdfPage() {
  return (
    <div className="w-full min-h-screen bg-background text-on-surface">
      {/* Native script tags so JSON-LD is present in SSR HTML for crawlers */}
      <script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebapp) }}
      />
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
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
            Rearrange &amp; Organize PDF Pages Online
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Visually arrange your document pages, rotate landscape scans, duplicate important sections, and remove excess pages with zero file uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Organizer Tool">
          <OrganizePdfTool />
        </section>

        {/* How to */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-on-surface">How to Rearrange PDF Pages Online</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-3xl">
            Follow these steps to reorder and organize your PDF in the browser. Need to{" "}
            <Link href="/all-tools/pdf/split-pdf" className="text-primary font-semibold hover:underline">
              split a PDF
            </Link>{" "}
            into separate files first? Do that, then come back to arrange the page order.
          </p>
          <ol className="list-decimal list-inside flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed">
            <li>
              <span className="font-semibold text-on-surface">Upload your PDF</span>
              {" — "}click or drop the file into the organizer.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Rearrange pages</span>
              {" — "}move each page left or right with the arrow controls until the page order looks right.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Optional edits</span>
              {" — "}rotate, duplicate, or delete pages as needed. You can also reverse the full sequence or reset to the original order.
            </li>
            <li>
              <span className="font-semibold text-on-surface">Save and download</span>
              {" — "}click Save &amp; Download PDF to get your organized file.
            </li>
          </ol>
        </section>

        {/* When to use */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-on-surface">When to Use the PDF Organizer</h2>
          <ul className="flex flex-col gap-3 text-sm text-on-surface-variant leading-relaxed list-disc list-inside">
            <li>
              Fix the order of scanned pages that came out shuffled or back-to-front.
            </li>
            <li>
              After you{" "}
              <Link href="/all-tools/pdf/pdf-merge" className="text-primary font-semibold hover:underline">
                merge PDF files
              </Link>
              , rearrange the combined document so chapters and sections sit in the right place.
            </li>
            <li>
              Remove blank or unwanted pages before you share or print.
            </li>
            <li>
              Rotate sideways or upside-down scans without rebuilding the whole file.
            </li>
          </ul>
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
            {faqs.map((faq) => (
              <div key={faq.question} className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-on-surface">{faq.question}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{faq.answer}</p>
              </div>
            ))}
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
              <span className="text-xs font-bold text-on-surface">Split a PDF</span>
              <span className="text-[11px] text-on-surface-variant">Separate into pages or ranges</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-merge"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">Merge PDF files</span>
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
