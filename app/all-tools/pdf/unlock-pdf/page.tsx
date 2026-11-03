import { Metadata } from 'next';
import { UnlockPdfTool } from '@/components/tools/unlock-pdf/UnlockPdfTool';

export const metadata: Metadata = {
  title: 'Unlock PDF - Remove Password & Restrictions Online',
  description:
    'Remove passwords, encryption, and printing restrictions from PDF files. Fast, private client-side PDF decryption directly in your browser.',
  keywords: [
    'unlock pdf',
    'remove pdf password',
    'decrypt pdf online',
    'pdf password remover',
    'unlock pdf without upload',
    'remove pdf restrictions',
    'free pdf unlocker',
  ],
  alternates: {
    canonical: "/all-tools/pdf/unlock-pdf",
  },
  openGraph: {
    url: "/all-tools/pdf/unlock-pdf",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Unlock PDF",
      },
    ],
    title: 'Unlock PDF - Remove Password & Restrictions Online',
    description:
      'Unlock password-protected PDFs and permanently remove print, copy, and edit locks with 100% in-browser privacy.',
    type: 'website',
  },
};

export default function UnlockPdfPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Unlock PDF Tool',
        url: 'https://freeconvertingtools.co.in/all-tools/pdf/unlock-pdf',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to unlock encrypted PDFs and remove security restrictions with client-side document reconstruction.',
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
            name: 'Unlock PDF',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf/unlock-pdf',
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
      <UnlockPdfTool />
    </div>
  );
}
