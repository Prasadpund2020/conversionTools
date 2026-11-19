import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
} from "@/lib/tools";
import BarcodeScannerTool from "@/components/tools/barcode-scanner/BarcodeScannerTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("more", "barcode-scanner") || getToolBySlug("barcode-scanner");

  if (!tool) {
    return {
      title: "Online Barcode Scanner Free",
      description:
        "Scan a barcode with your camera in Chrome or Edge, with no app. You can also create CODE128, EAN-13, UPC-A, ISBN, and CODE39 barcodes as SVG.",
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: "Online Barcode Scanner Free",
    description:
      "Free online barcode scanner. Use your camera in Chrome or Edge, with no app install. The same page can also draw a barcode and download an SVG.",
    keywords: [
      "online barcode scanner free",
      "free barcode scanner online",
      "barcode scanner online free",
      "scan barcode online without app",
      "barcode online scan",
      "online barcode recognition",
      "check barcode online",
    ],
    openGraph: {
      title: "Online Barcode Scanner Free",
      description:
        "Scan a barcode with your camera in Chrome or Edge. No app install. SVG barcode creation is on the same page.",
      type: "website",
      url: `/all-tools/more/barcode-scanner`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: `${tool.title} — Free Converting Tools`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Online Barcode Scanner Free",
      description:
        "Camera barcode scan in Chrome or Edge, plus SVG barcode creation.",
      images: ["/images/all-tools-hero-banner.png"],
    },
    alternates: {
      canonical: `/all-tools/more/barcode-scanner`,
    },
  };
}

export default function BarcodeScannerPage() {
  const category = "more";
  const slug = "barcode-scanner";

  const tool =
    getToolBySlugs(category, slug) || getToolBySlug(slug) || {
      id: "barcode-scanner",
      title: "Barcode Scanner & Maker",
      category: "more",
      description:
        "Scan camera barcodes or generate UPC/EAN retail barcodes instantly.",
      clayColor: "clay-orange",
      iconType: "barcode",
      quickBadge: { bg: "bg-orange-100", text: "text-orange-500" },
    };

  const catInfo = getCategoryInfo(category);
  const relatedTools = getToolsByCategory(category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 4);

  const softwareAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/all-tools/more/barcode-scanner`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All (Browser-based)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% Client-side barcode generation",
      "Zero server uploads — 100% private",
      "SVG vector export",
      "Camera-based barcode scanning",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />

      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Tools", href: "/all-tools" },
            {
              label: catInfo ? catInfo.name : "More Tools",
              href: `/all-tools/${category}`,
            },
            { label: tool.title },
          ]}
        />
      </div>

      <ToolPageIntro
        title="Online Barcode Scanner Free"
        lede="Point your camera at a barcode in Chrome or Edge. No separate app is installed. The same page can also create a CODE128, EAN-13, UPC-A, ISBN, or CODE39 barcode and download it as SVG."
      />
      <Suspense
        fallback={
          <div className="w-full min-h-[500px] flex items-center justify-center bg-[#faf8f5] rounded-3xl border border-stone-200">
            <div className="flex flex-col items-center gap-3">
              <span className="w-8 h-8 border-[3px] border-orange-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold text-stone-500">
                Loading Barcode Studio…
              </span>
            </div>
          </div>
        }
      >
        <div className="bg-white/90 rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8">
          <BarcodeScannerTool />
        </div>
      </Suspense>

      <ToolPageGuide
        explanationTitle="Scan a barcode online without an app"
        explanation={
          <p>
            The scanner uses the browser BarcodeDetector API and your camera. It works in Chrome and Edge. If the browser does not provide that API, the page tells you and scanning will not start. There is no photo-upload scan on this page. Camera frames stay on the device.
          </p>
        }
        stepsTitle="How to scan or create a barcode"
        steps={[
          "Allow the camera when the browser asks.",
          "Choose Start Camera Scanner and hold the code inside the frame until a value appears.",
          "To create a code instead, pick CODE128, EAN-13, UPC-A, ISBN, or CODE39, enter the value, and download the SVG.",
        ]}
        formats="Scanning reads barcodes the browser detector supports from the live camera. Creation writes an SVG for CODE128, EAN-13, UPC-A, ISBN, or CODE39. A value that does not fit the selected symbology will not produce a valid retail code."
        details={[
          {
            title: "No app install",
            body: "You stay on this page. The scan uses the device camera through the browser.",
          },
          {
            title: "Chrome or Edge",
            body: "Browsers without BarcodeDetector cannot scan. Generating an SVG does not depend on that API.",
          },
          {
            title: "SVG download",
            body: "Created barcodes download as SVG. The scanner result is the text value, not a product lookup.",
          },
        ]}
        privacy="Camera frames and the barcode value are handled in the browser. The page does not upload the camera video."
        useCases={[
          "Read a code on a package when you do not want to install a scanner app.",
          "Check that a CODE128 or EAN value renders as a barcode before you print it.",
          "Copy a scanned value into the generator if you need an SVG of that code.",
        ]}
        faqs={[
          {
            question: "Is this an online barcode scanner free to use?",
            answer:
              "Yes. There is no account and no fee. Scanning needs a camera and a browser with BarcodeDetector, which Chrome and Edge provide.",
          },
          {
            question: "Can I scan a barcode from a photo?",
            answer:
              "No. This page scans the live camera. It does not accept a barcode image upload.",
          },
          {
            question: "Does a scan look up the product?",
            answer:
              "No. You get the raw value printed in the barcode. The page does not query a product database.",
          },
        ]}
        links={[
          {
            href: "/all-tools/more/qr-generator",
            title: "QR code generator",
            description: "Make a QR code when you need a 2D code instead of a linear barcode.",
          },
          {
            href: "/all-tools/more/base64-converter",
            title: "Base64 encoder",
            description: "Encode a file, including a PDF, when the job is text encoding rather than scanning.",
          },
        ]}
      />

      {relatedTools.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Related {catInfo?.name || "More"} Tools
              </h3>
              <p className="text-xs text-slate-500">
                More client-side utilities from this suite
              </p>
            </div>
            <Link
              href={`/all-tools/${category}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 no-underline"
            >
              View all ({getToolsByCategory(category).length})
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((relTool: ToolItem) => (
              <ToolCard key={relTool.id} tool={relTool} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
