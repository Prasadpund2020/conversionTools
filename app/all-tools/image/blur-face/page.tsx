import { Metadata } from 'next';
import { BlurFaceTool } from '@/components/tools/blur-face/BlurFaceTool';

export const metadata: Metadata = {
  title: 'Blur Faces & Censor Photos Online - 100% Free Privacy Tool',
  description:
    'Blur faces, license plates, and private text in photos online. Features Gaussian blur, pixelate mosaic, and blackout bars with zero uploads.',
  keywords: [
    'blur face online',
    'photo censor tool',
    'pixelate image',
    'censor photos free',
    'hide sensitive information in image',
    'license plate blur',
    'blur photo online free without upload',
  ],
  alternates: {
    canonical: "/all-tools/image/blur-face",
  },
  openGraph: {
    url: "/all-tools/image/blur-face",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Blur Faces & Censor Photos Online",
      },
    ],
    title: 'Blur Faces & Censor Photos Online - 100% Free Privacy Tool',
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
        url: 'https://freeconvertingtools.co.in/all-tools/image/blur-face',
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
            name: 'Image Tools',
            item: 'https://freeconvertingtools.co.in/all-tools/image',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Blur Face & Photo Censor',
            item: 'https://freeconvertingtools.co.in/all-tools/image/blur-face',
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
      <BlurFaceTool />
    </div>
  );
}
