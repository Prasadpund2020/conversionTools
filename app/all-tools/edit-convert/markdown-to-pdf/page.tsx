import type { Metadata } from "next";
import { ToolItem } from "@/types/tools";
import {
  getToolBySlugs,
  getToolBySlug,
  getCategoryInfo,
  getToolsByCategory,
} from "@/lib/tools";
import { MarkdownToPdfTool } from "@/components/tools/markdown-to-pdf/MarkdownToPdfTool";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import ToolCard from "@/components/tools/ToolCard";
import ToolPageGuide, { ToolPageIntro } from "@/components/tools/seo/ToolPageGuide";
import { SITE_URL } from "@/lib/constants";

export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
  const tool =
    getToolBySlugs("edit-convert", "markdown-to-pdf") ||
    getToolBySlug("markdown-to-pdf");

  if (!tool) {
    return {
      title: "Markdown to PDF Converter — Free Client-Side MD to PDF | Free Converting Tools",
      description:
        "Convert Markdown (.md) documents and notes into clean, professionally formatted PDF files directly in your browser. 100% private with no server uploads.",
    };
  }

  const seo = {
    title: "Markdown to PDF Online",
    description:
      "Turn Markdown into a PDF in your browser. The PDF includes headings, lists, quotes, fenced code, and rules on A4 or Letter, using standard PDF fonts.",
    keywords: [
      "markdown to pdf",
      "md to pdf",
      "convert markdown to pdf",
      "markdown pdf converter",
    ],
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
    canonical: "/all-tools/edit-convert/markdown-to-pdf",
  },
  openGraph: {
      title: `${tool.title} — Free Converting Tools`,
      description: seo.description,
      type: "website",
      url: `/all-tools/edit-convert/markdown-to-pdf`,
      images: [
        {
          url: "/images/all-tools-hero-banner.png",
          width: 1200,
          height: 630,
          alt: "Markdown to PDF Converter — Free Converting Tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.title} — Free Converting Tools`,
      description: seo.description,
      images: ["/images/all-tools-hero-banner.png"],
    },
  };
}

export default async function MarkdownToPdfPage() {
  const tool =
    getToolBySlugs("edit-convert", "markdown-to-pdf") ||
    getToolBySlug("markdown-to-pdf") || {
      id: "markdown-to-pdf",
      title: "Markdown to PDF Converter",
      description:
        "Transform Markdown text or .md files into beautifully styled, paginated PDF documents with instant live preview.",
      category: "edit-convert",
      slug: "markdown-to-pdf",
      icon: "markdown",
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
    url: `${SITE_URL}/all-tools/edit-convert/markdown-to-pdf`,
    applicationCategory: "BusinessApplication",
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
              label: category?.name || "Edit & Convert",
              href: `/all-tools/${tool.category}`,
            },
            { label: tool.title },
          ]}
        />

        <div className="mt-6">
          <ToolPageIntro
            title="Markdown to PDF"
            lede="Paste Markdown or edit it in the box, check the preview, and download a PDF. The PDF uses Helvetica and Courier. It includes headings, lists, quotes, fenced code, and horizontal rules. Inline bold in the preview is not the same as a custom font in the PDF."
          />
          <MarkdownToPdfTool />
        </div>

        <div className="mt-16 max-w-4xl mx-auto space-y-12">
          <ToolPageGuide
            explanationTitle="What the PDF includes"
            explanation={
              <p>
                Page size is A4 or Letter. Font size is small, medium, or large. An optional header prints the document title. Characters outside the standard PDF fonts can be missing or replaced. Images in the Markdown are not embedded. The preview is a quick on-screen rendering so you can read the structure before you download.
              </p>
            }
            stepsTitle="How to convert Markdown to PDF"
            steps={[
              "Type, paste, or drop a .md, .markdown, or .txt file.",
              "Set the title, page size, and font size.",
              "Read the preview, then download the PDF.",
            ]}
            formats="Input is Markdown text. Output is a PDF. Supported structures in the PDF are headings through level three, bullet and numbered lists, blockquotes, fenced code, horizontal rules, and paragraphs."
            details={[
              {
                title: "Standard fonts",
                body: "Body text is Helvetica, headings are Helvetica Bold, and code is Courier. There is no font upload.",
              },
              {
                title: "Preview",
                body: "The side preview helps you read the note. The downloaded PDF is produced by the PDF writer, not by printing that preview.",
              },
              {
                title: "Limits",
                body: "Tables, images, and most inline HTML are not laid out as they would be in a full Markdown engine.",
              },
            ]}
            privacy="The note is converted in your browser. It is not uploaded."
            useCases={[
              "Turn a README excerpt into a PDF you can send.",
              "Print meeting notes that are already in Markdown.",
              "Check heading structure in the preview before you keep the file.",
            ]}
            faqs={[
              {
                question: "Will the PDF match the preview exactly?",
                answer:
                  "No. The preview is HTML in the page. The PDF uses the PDF writer and standard fonts, so spacing and emphasis can differ.",
              },
              {
                question: "Can I include a screenshot?",
                answer:
                  "Not as an embedded image in the PDF. Add the image with the image tools, or refer to it in the text.",
              },
              {
                question: "Which page sizes are available?",
                answer: "A4 and US Letter.",
              },
            ]}
            links={[
              {
                href: "/all-tools/edit-convert/word-to-pdf",
                title: "Word to PDF",
                description: "Convert a Word document when the source is not Markdown.",
              },
              {
                href: "/all-tools/edit-convert/ocr-scanner",
                title: "OCR scanner",
                description: "Read text from a PNG, JPG, or WebP in Chrome or Edge.",
              },
            ]}
          />

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Related Conversion Tools
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
