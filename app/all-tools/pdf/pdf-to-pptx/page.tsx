import { Metadata } from 'next';
import { PdfToPptxTool } from '@/components/tools/pdf-to-pptx/PdfToPptxTool';

export const metadata: Metadata = {
  title: 'PDF to PowerPoint Converter - Convert PDF to PPTX Online',
  description:
    'Convert PDF slides into Microsoft PowerPoint (.pptx) decks. 100% private in-browser conversion compatible with Google Slides and Keynote.',
  keywords: [
    'pdf to pptx',
    'pdf to powerpoint converter',
    'convert pdf to slides',
    'pdf to ppt online',
    'free pdf to powerpoint',
    'google slides pdf converter',
    'presentation slide generator',
  ],
  alternates: {
    canonical: "/all-tools/pdf/pdf-to-pptx",
  },
  openGraph: {
    url: "/all-tools/pdf/pdf-to-pptx",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "PDF to PowerPoint Converter",
      },
    ],
    title: 'PDF to PowerPoint Converter - Convert PDF to PPTX Online',
    description:
      'Turn PDF slides into editable Microsoft PowerPoint .pptx decks in seconds. Zero uploads, 16:9 widescreen layout.',
    type: 'website',
  },
};

export default function PdfToPptxPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'PDF to PowerPoint Converter',
        url: 'https://freeconvertingtools.co.in/all-tools/pdf/pdf-to-pptx',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to convert PDF documents into Microsoft PowerPoint presentation files (.pptx) with client-side OpenXML packaging.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://freeconvertingtools.co.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'All Tools',
            item: 'https://freeconvertingtools.co.in/all-tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'PDF Tools',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'PDF to PowerPoint',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf/pdf-to-pptx',
          },
        ],
      }
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PdfToPptxTool />
    </div>
  );
}
