import { Metadata } from 'next';
import { BlurFaceTool } from '@/components/tools/blur-face/BlurFaceTool';

export const metadata: Metadata = {
  title: 'Blur Faces & Censor Photos Online - 100% Free Privacy Tool | Tools Arena',
  description:
    'Easily blur faces, license plates, credit card numbers, and private text in your photos. Features Gaussian blur, pixelate mosaic, and blackout censor bars with 100% private in-browser processing.',
  keywords: [
    'blur face online',
    'photo censor tool',
    'pixelate image',
    'censor photos free',
    'hide sensitive information in image',
    'license plate blur',
    'blur photo online free without upload',
  ],
  openGraph: {
    title: 'Blur Faces & Censor Photos Online - 100% Free Privacy Tool | Tools Arena',
    description:
      'Censor confidential details, mosaic faces, and redact sensitive documents directly in your browser. Zero cloud uploads.',
    type: 'website',
  },
};

export default function BlurFacePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Photo Censor & Face Blur Tool',
        url: 'https://toolsarena.io/all-tools/image/blur-face',
        applicationCategory: 'PhotoEditor',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to blur faces, mosaic license plates, and redact private information on images with full client-side privacy.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://toolsarena.io',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'All Tools',
            item: 'https://toolsarena.io/all-tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Image Tools',
            item: 'https://toolsarena.io/all-tools#image',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Blur Face & Photo Censor',
            item: 'https://toolsarena.io/all-tools/image/blur-face',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Blur Faces and Censor Photos',
        description: 'Easily censor confidential information in 3 quick steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Photo',
            text: 'Drop or select any PNG, JPG, or WebP photo.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Draw Censor Boxes',
            text: 'Click and drag over faces or sensitive text. Choose between smooth blur, pixelate mosaic, or solid blackout.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download Censored Photo',
            text: 'Click Download PNG or Download JPG to save your redacted photo instantly.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are my private photos uploaded to any server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No! Everything is rendered completely in your browser using HTML5 Canvas. Your sensitive photos never leave your device.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can someone undo or remove the blur after downloading?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The pixel data under the censor box is permanently transformed and flattened into the image pixels upon export.',
            },
          },
          {
            '@type': 'Question',
            name: 'What styles of censorship are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can choose between Gaussian Smooth Blur, Pixelate Mosaic (8-bit style), and Blackout redaction bars.',
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
      <BlurFaceTool />
    </div>
  );
}
