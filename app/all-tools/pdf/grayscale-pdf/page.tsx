import { Metadata } from 'next';
import { GrayscalePdfTool } from '@/components/tools/grayscale-pdf/GrayscalePdfTool';

export const metadata: Metadata = {
  title: 'Grayscale PDF Converter - Turn PDF into Black & White',
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
  alternates: {
    canonical: "/all-tools/pdf/grayscale-pdf",
  },
  openGraph: {
    url: "/all-tools/pdf/grayscale-pdf",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Grayscale PDF Converter",
      },
    ],
    title: 'Grayscale PDF Converter - Turn PDF into Black & White',
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
            item: 'https://freeconvertingtools.co.in/all-tools/pdf',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Grayscale PDF',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf/grayscale-pdf',
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
      <GrayscalePdfTool />
    </div>
  );
}
