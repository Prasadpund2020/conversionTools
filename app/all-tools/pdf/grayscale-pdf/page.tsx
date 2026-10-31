import { Metadata } from 'next';
import { GrayscalePdfTool } from '@/components/tools/grayscale-pdf/GrayscalePdfTool';

export const metadata: Metadata = {
  title: 'Grayscale PDF Converter - Turn PDF into Black & White | Free Converting Tools',
  description:
    'Convert colorful PDF documents into clean monochrome grayscale or black & white. Save printer toner and meet filing guidelines privately.',
  keywords: [
    'grayscale pdf',
    'black and white pdf converter',
    'convert pdf to monochrome',
    'save toner pdf',
    'desaturate pdf online',
    'b&w pdf maker',
    'court filing pdf black white',
  ],
  openGraph: {
    title: 'Grayscale PDF Converter - Turn PDF into Black & White | Free Converting Tools',
    description:
      'Convert colorful PDF pages to clean black & white grayscale directly in your browser. 100% private, customizable contrast and print DPI.',
    type: 'website',
  },
};

export default function GrayscalePdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Grayscale PDF Converter',
        url: 'https://freeconvertingtools.co.in/all-tools/pdf/grayscale-pdf',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to convert PDF documents into monochrome grayscale and high-contrast black & white.',
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
            name: 'Grayscale PDF',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf/grayscale-pdf',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert a PDF to Grayscale Black & White',
        description: 'Easily convert colored PDF documents to monochrome in 3 steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload PDF',
            text: 'Drop or select your colorful PDF document.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose Profile & DPI',
            text: 'Select Smooth Grayscale, High Contrast, or Pure B&W, and choose print resolution.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Convert & Download',
            text: 'Click "Convert Pages to Grayscale" and save your toner-optimized monochrome PDF.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why should I convert a PDF to grayscale?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Grayscale PDFs save expensive color printer toner and ink, significantly reduce file size for email, and meet strict legal and academic filing submission rules.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my document contents uploaded to external servers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The pixel-level desaturation and PDF reassembly happen 100% locally in your browser memory using HTML5 Canvas and WebAssembly.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Grayscale and Pure B&W?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Grayscale uses 256 shades of gray preserving photo subtleties, while Pure B&W thresholds every pixel to pure black or pure white for maximum text readability.',
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
      <GrayscalePdfTool />
    </div>
  );
}
