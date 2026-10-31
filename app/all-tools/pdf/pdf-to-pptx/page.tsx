import { Metadata } from 'next';
import { PdfToPptxTool } from '@/components/tools/pdf-to-pptx/PdfToPptxTool';

export const metadata: Metadata = {
  title: 'PDF to PowerPoint Converter - Convert PDF to PPTX Online | Free Converting Tools',
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
  openGraph: {
    title: 'PDF to PowerPoint Converter - Convert PDF to PPTX Online | Free Converting Tools',
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
            item: 'https://freeconvertingtools.co.in/all-tools#pdf',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'PDF to PowerPoint',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf/pdf-to-pptx',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert PDF to PowerPoint PPTX',
        description: 'Easily turn PDF documents into PowerPoint presentation decks in 3 steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload PDF',
            text: 'Drop or select your presentation PDF document.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Aspect Ratio',
            text: 'Choose 16:9 Modern Widescreen or 4:3 Standard format.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download .PPTX',
            text: 'Click "Convert Pages to .PPTX" and download your PowerPoint slide deck.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does this create genuine .pptx presentation files?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! It generates standard OpenXML PowerPoint presentation archives that open seamlessly in Microsoft PowerPoint, Google Slides, Keynote, and LibreOffice Impress.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my slides uploaded to a remote server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Rendering and OpenXML packaging execute entirely in your local browser memory using JavaScript and WebAssembly.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will my formatting and fonts remain intact?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! High-density canvas rasterization guarantees that graphics, formulas, typography, and charts match the original PDF slides perfectly.',
            },
          },
        ],
      },
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
