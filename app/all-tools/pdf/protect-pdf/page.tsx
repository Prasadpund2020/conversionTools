import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ProtectPdfTool } from "@/components/tools/protect-pdf/ProtectPdfTool";

export const metadata: Metadata = {
  title: "Protect PDF Online Free - Password Encrypt & Restrict Permissions | Free Converting Tools",
  description:
    "Protect PDF files with strong password encryption online. Restrict printing, text copying, and modifications directly in your browser with zero server uploads.",
  keywords: [
    "protect pdf",
    "password protect pdf",
    "encrypt pdf online",
    "lock pdf with password",
    "free pdf protection",
    "client-side pdf encryptor",
  ],
  alternates: {
    canonical: "https://freeconvertingtools.co.in/all-tools/pdf/protect-pdf",
  },
  openGraph: {
    title: "Protect PDF Online Free | Free Converting Tools",
    description:
      "Lock sensitive PDF records with 128-bit encryption and permission controls entirely inside your web browser.",
    url: "https://freeconvertingtools.co.in/all-tools/pdf/protect-pdf",
    siteName: "Free Converting Tools",
    type: "website",
  },
};

const jsonLdWebapp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Converting Tools Protect PDF Tool",
  url: "https://freeconvertingtools.co.in/all-tools/pdf/protect-pdf",
  description:
    "Client-side PDF encryption utility. Lock documents with open passwords and restrict reader permissions without server transmission.",
  applicationCategory: "SecurityApplication",
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
      name: "Are my passwords or files sent to your server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Free Converting Tools handles all cryptographic key derivation and PDF dictionary updates 100% locally on your machine. Your password and document never leave your device.",
      },
    },
    {
      "@type": "Question",
      name: "Will protected PDFs work in standard PDF viewers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The generated encryption headers follow standard Adobe Acrobat and ISO PDF-1.7 specifications, meaning any standard viewer will prompt for the password.",
      },
    },
    {
      "@type": "Question",
      name: "Can I restrict copying and printing while allowing viewing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can configure granular reader permissions to allow or forbid high-resolution printing, clipboard text copying, and form annotations.",
      },
    },
  ],
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Password Protect a PDF Document Online",
  step: [
    {
      "@type": "HowToStep",
      name: "Drop or Choose PDF",
      text: "Select or drop your PDF file into the Free Converting Tools protection workspace.",
    },
    {
      "@type": "HowToStep",
      name: "Configure Password & Permissions",
      text: "Enter a strong document open password and select printing/copying permission rules.",
    },
    {
      "@type": "HowToStep",
      name: "Encrypt & Download",
      text: "Click Encrypt & Protect PDF to synthesize your locked document instantly.",
    },
  ],
};

export default function ProtectPdfPage() {
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
          <span className="text-on-surface">Protect PDF</span>
        </nav>

        {/* Hero Info */}
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-800 dark:text-red-300 text-xs font-bold w-fit">
            <span>🔒 Enterprise Cryptographic Vault</span>
            <span>•</span>
            <span>Zero-Knowledge Client-Side Protection</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Protect & Encrypt PDF Documents
          </h1>
          <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
            Lock confidential PDF records with password protection and configure granular permissions against printing, copying, and modifications without remote server uploads.
          </p>
        </div>

        {/* Interactive Tool Orchestrator */}
        <section aria-label="PDF Protection Tool">
          <ProtectPdfTool />
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#b91c1c] text-white flex items-center justify-center text-xl shadow-md">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-on-surface">Standard 128-Bit Encryption</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Synthesizes compliant PDF security handlers and encryption dictionaries compatible with Adobe Acrobat Reader, macOS Preview, and web browsers.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-xl shadow-md">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-on-surface">Permission Bitmasks</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Toggle specific document actions: allow or block printing, text extraction, content copying, and form annotations according to your security posture.
            </p>
          </div>

          <div className="rounded-3xl bg-surface-container-low p-6 border border-outline-variant/30 shadow-md flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center text-xl shadow-md">
              🔒
            </div>
            <h3 className="text-lg font-bold text-on-surface">Zero Knowledge Privacy</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your passwords and documents never touch a third-party server. All key hashing, padding, and dictionary registration occur inside your browser.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="rounded-3xl bg-surface-container-low p-6 md:p-8 border border-outline-variant/30 shadow-md flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-on-surface">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">What happens if I forget my password?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Because Free Converting Tools operates under a zero-knowledge architecture and does not store user data or passwords, we cannot recover forgotten passwords. Please save your password securely.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-on-surface">Can someone remove the password without authorization?</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Standard compliant PDF readers will refuse to decrypt or render the document contents without the correct user or owner password.
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
              href="/all-tools/pdf/sign-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">✍️</span>
              <span className="text-xs font-bold text-on-surface">Sign PDF</span>
              <span className="text-[11px] text-on-surface-variant">Stamp digital signature</span>
            </Link>

            <Link
              href="/all-tools/pdf/compress-pdf"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">🗜️</span>
              <span className="text-xs font-bold text-on-surface">Compress PDF</span>
              <span className="text-[11px] text-on-surface-variant">Reduce bloated files</span>
            </Link>

            <Link
              href="/all-tools/pdf/pdf-merge"
              className="p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all shadow-sm flex flex-col gap-1.5"
            >
              <span className="text-xl">📑</span>
              <span className="text-xs font-bold text-on-surface">PDF Merge</span>
              <span className="text-[11px] text-on-surface-variant">Combine multiple documents</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
