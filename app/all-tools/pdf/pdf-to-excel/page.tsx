import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PdfToExcelTool } from "@/components/tools/pdf-to-excel/PdfToExcelTool";

export const metadata: Metadata = {
  title: "PDF to Excel Converter Free Online - Extract Tables to XLSX | Free Converting Tools",
  description:
    "Convert PDF tables to editable Excel (.xlsx) and CSV spreadsheets online for free. Auto column alignment and OpenXML synthesis with zero uploads.",
  keywords: [
    "pdf to excel",
    "convert pdf to xlsx",
    "extract tables from pdf",
    "pdf to csv online",
    "free pdf to excel converter",
    "client-side pdf to excel",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/pdf-to-excel",
  },
  openGraph: {
    title: "PDF to Excel Converter Free Online | Free Converting Tools",
    description:
      "Extract financial tables, numbers, and structured columns from PDF documents directly into clean Excel spreadsheets.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/pdf-to-excel",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools PDF to Excel Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/pdf-to-excel",
  description:
    "Client-side PDF table extraction utility. Converts PDF tables and numbers into Microsoft Excel XLSX and CSV formats.",
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
      name: "How does Free Converting Tools extract tables from PDF files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free Converting Tools analyzes the coordinate transforms of text objects on each PDF page to cluster them into rows and aligned columns, synthesizing native OpenXML .xlsx spreadsheets entirely in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Are financial statements or bank records sent to external servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Never. All parsing and spreadsheet synthesis run 100% locally on your computer inside your web browser. No data is transmitted across the internet.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export to both Excel and CSV formats?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can export your data as native Microsoft Excel (.xlsx) workbooks, comma-separated (.csv) spreadsheets, or structured JSON data.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert PDF Tables to Excel Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Upload PDF",
      text: "Select or drop your PDF containing tabular data into the Free Converting Tools workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Preview Table Grid",
      text: "Inspect the live matrix grid to verify extracted rows and columns.",
    },
    {
      "@type": "HowToStep",
      name: "Export Spreadsheet",
      text: "Choose .xlsx or .csv and click Export to download your spreadsheet immediately.",
    },
  ],
};

export default function PdfToExcelPage() {
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
          <span className="text-on-surface">PDF to Excel</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold w-fit">
            <span>📊 Tabular Extraction Studio</span>
            <span>•</span>
            <span>100% In-Browser OpenXML Synthesis</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Convert PDF to Excel Spreadsheets
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Extract tabular statements, invoice figures, and balance sheets from PDF into clean, structured Microsoft Excel (.xlsx) and CSV files with zero cloud uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF to Excel Converter Tool">
          <PdfToExcelTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#16a34a] text-white flex items-center justify-center text-xl shadow-md">
              📊
            </div>
            <h3 className="text-lg font-bold text-on-surface">Auto Coordinate Grouping</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Clusters text items based on physical X and Y coordinate transforms to reconstruct true multi-column tabular grids accurately.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-700 text-white flex items-center justify-center text-xl shadow-md">
              📑
            </div>
            <h3 className="text-lg font-bold text-on-surface">Multi-Format Output</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Export directly into OpenXML <code>.xlsx</code> spreadsheets compatible with Microsoft Office 365, LibreOffice, Apple Numbers, and Google Sheets.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Zero Data Leakage</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Financial numbers and confidential payroll data never leave your computer. Parsing and packaging occur inside your local browser runtime.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Will formulas be preserved?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                PDF documents store computed values rather than raw formulas. Free Converting Tools extracts the exact values and tabular relationships into structured spreadsheet cells.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can I convert scanned PDFs?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                For scanned physical documents with pure images, use our companion <Link href="/all-tools/edit-convert/ocr-scanner" className="text-primary font-bold hover:underline">OCR Text Extractor</Link> tool first to extract optical text characters.
              </p>
            </div>
          </div>
        </section>

        {/* Related Tools Shelf */}
        <section className="flex flex-col gap-4 pt-4">
          <h2 className="text-xl font-bold text-on-surface">Related PDF Utilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/all-tools/edit-convert/excel-to-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📊</span>
              <span className="text-xs font-bold text-on-surface">Excel to PDF</span>
              <span className="text-[11px] text-on-surface-variant">Convert spreadsheets to PDF</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-to-word"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📄</span>
              <span className="text-xs font-bold text-on-surface">PDF to Word</span>
              <span className="text-[11px] text-on-surface-variant">Convert PDF to DOCX</span>
            </Link>

            <Link
              href="/all-tools/edit-convert/ocr-scanner"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🔍</span>
              <span className="text-xs font-bold text-on-surface">OCR Scanner</span>
              <span className="text-[11px] text-on-surface-variant">Extract text from scans</span>
            </Link>

            <Link
              href="/all-tools/pdf/compress-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress PDF</span>
              <span className="text-[11px] text-on-surface-variant">Optimize file size</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
