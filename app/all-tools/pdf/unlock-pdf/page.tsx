import { Metadata } from 'next';
import { UnlockPdfTool } from '@/components/tools/unlock-pdf/UnlockPdfTool';

export const metadata: Metadata = {
  title: 'Unlock PDF - Remove Password & Restrictions Online | Free Converting Tools',
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
  openGraph: {
    title: 'Unlock PDF - Remove Password & Restrictions Online | Free Converting Tools',
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
            item: 'https://freeconvertingtools.co.in/all-tools#pdf',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Unlock PDF',
            item: 'https://freeconvertingtools.co.in/all-tools/pdf/unlock-pdf',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Unlock a Password-Protected PDF',
        description: 'Easily remove PDF password protection in 3 quick steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload PDF',
            text: 'Drag and drop or select your protected PDF document.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Enter Password',
            text: 'Type the document open password to authorize decryption.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download Decrypted PDF',
            text: 'Click "Unlock & Remove Password" and download your completely unrestricted PDF.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is my password or PDF sent to any server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Decryption and security removal happen 100% locally in your browser memory. No data is transmitted across the internet.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can this remove owner restrictions on printing and copying?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! The tool creates a completely clean copy of the document without any permission locks or restriction flags.',
            },
          },
          {
            '@type': 'Question',
            name: 'Will I need to enter a password every time I open the unlocked file?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The output PDF has all password prompts permanently eliminated.',
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
      <UnlockPdfTool />
    </div>
  );
}
