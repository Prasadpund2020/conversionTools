import type { Metadata } from "next";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
} from "@/lib/tools";
import { Base64ConverterTool } from "@/components/tools/base64-converter/Base64ConverterTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("more", "base64-converter") ||
    getToolBySlug("base64-converter");

  if (!tool) {
    return {
      title: "Base64 File & Image Encoder / Decoder — Free Online Tool | Free Converting Tools",
      description:
        "Encode images, PDFs, and documents into Base64 Data URIs, or decode Base64 strings back into files. 100% private in-browser utility.",
    };
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: "Base64 Encoder and Decoder Online",
    description:
      "Encode any file, including a PDF or image, to Base64 or a data URI, and decode Base64 back to a file. The work stays in your browser.",
    keywords: [
      "base64 encoder",
      "base64 decoder",
      "pdf to base64",
      "pdf to base64 converter",
      "file to base64",
    ],
    alternates: {
    canonical: "/all-tools/more/base64-converter",
  },
  openGraph: {
      title: "Base64 Encoder and Decoder Online",
      description:
        "Encode a PDF, image, or other file to Base64, or decode a Base64 string back to a file.",
      type: "website",
      url: `/all-tools/more/base64-converter`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: "Base64 File & Image Encoder / Decoder — Free Converting Tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Base64 Encoder and Decoder Online",
      description:
        "Encode a PDF, image, or other file to Base64, or decode a Base64 string back to a file.",
      images: ["/images/all-tools-hero-banner.png"],
    },
  };
}

export default async function Base64ConverterPage() {
  const tool =
    getToolBySlugs("more", "base64-converter") ||
    getToolBySlug("base64-converter") || {
      id: "base64-converter",
      title: "Base64 File & Image Encoder / Decoder",
      description:
        "Encode images, documents, and files into Base64 strings or decode Base64 back into downloadable files instantly in your browser.",
      category: "more",
      slug: "base64-converter",
      icon: "base64",
    };

  const category = getCategoryInfo(tool.category);
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t: ToolItem) => t.id !== tool.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    description: tool.description,
    url: `${SITE_URL}/all-tools/more/base64-converter`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="container mx-auto px-4 py-8 flex-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "All Tools", href: "/all-tools" },
            {
              label: category?.name || "More Tools",
              href: `/all-tools/${tool.category}`,
            },
            { label: tool.title },
          ]}
        />

        <div className="mt-6">
          <ToolPageIntro
            title="Base64 Encoder and Decoder"
            lede="Turn any file the browser can read, including a PDF, into Base64 text or a data URI. Paste Base64 to download the file again. This is a general encoder, not a PDF-only converter."
          />
          <Base64ConverterTool />
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <ToolPageGuide
            explanationTitle="PDF to Base64 is one use of this encoder"
            explanation={
              <p>
                A PDF to Base64 conversion is one job this page can do, because the encoder reads the bytes of whatever file you choose. The same control also encodes images and other documents, and it can decode a Base64 string or data URI back into a download.
              </p>
            }
            stepsTitle="How to encode or decode"
            steps={[
              "To encode, choose a file. A PDF, JPG, PNG, or any other file the browser can read is accepted.",
              "Choose whether you want the raw Base64 text or the data URI prefix, and whether long lines should wrap at 76 characters.",
              "Copy the result. Image files can show a preview because the browser knows the image type.",
              "To decode, paste Base64 or a data URI and download the reconstructed file.",
            ]}
            formats="Input for encoding is any file. Output is Base64 text or a data URI. Decoding accepts raw Base64 or a data:*;base64, URI and downloads a file using the MIME type in that URI when one is present."
            details={[
              {
                title: "Not a PDF editor",
                body: "Encoding a PDF does not merge, compress, or extract pages. You get the file bytes as text.",
              },
              {
                title: "Line wrap",
                body: "Wrapped output inserts line breaks every 76 characters. The data URI option keeps the prefix.",
              },
              {
                title: "Size",
                body: "Base64 is larger than the original file. Very large files depend on the memory available in the tab.",
              },
            ]}
            privacy="Encoding and decoding use the browser FileReader. The file is not uploaded."
            useCases={[
              "Put a small PDF or icon into a data URI for a document or stylesheet.",
              "Inspect the Base64 form of a file you already have.",
              "Turn a Base64 string someone sent you back into a downloadable file.",
            ]}
            faqs={[
              {
                question: "Can I convert a PDF to Base64 here?",
                answer:
                  "Yes. Choose the PDF and copy the Base64 or data URI. The tool does not change the PDF contents.",
              },
              {
                question: "Will decoding always restore the original file name?",
                answer:
                  "The download uses the name you provide or a name derived from the decoded data. Keep your own copy of the original if the name matters.",
              },
              {
                question: "Is this only for images?",
                answer:
                  "No. Images can show a preview, but any file, including a PDF, can be encoded.",
              },
            ]}
            links={[
              {
                href: "/all-tools/edit-convert/json-csv",
                title: "JSON and CSV converter",
                description: "Convert structured text when the job is a table, not Base64.",
              },
              {
                href: "/all-tools/more/qr-generator",
                title: "QR code generator",
                description: "Make a QR code from a short link or text value.",
              },
            ]}
          />

          {relatedTools.length > 0 && (
            <section className="space-y-4 mt-12">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Related Utility Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((related: ToolItem) => (
                  <ToolCard key={related.id} tool={related} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
