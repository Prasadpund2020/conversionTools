import { Metadata } from 'next';
import { ColorPaletteTool } from '@/components/tools/color-palette/ColorPaletteTool';

export const metadata: Metadata = {
  title: 'Color Palette & Hex Swatch Extractor from Image',
  description:
    'Extract color palettes and hex swatches from photos online. Copy HEX, RGB, and HSL values or export CSS variables with zero server uploads.',
  keywords: [
    'color palette extractor',
    'extract colors from image',
    'image color picker',
    'hex color swatch generator',
    'photo palette generator',
    'css variables palette',
    'free color palette maker',
  ],
  alternates: {
    canonical: "/all-tools/image/color-palette",
  },
  openGraph: {
    url: "/all-tools/image/color-palette",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Color Palette & Hex Swatch Extractor",
      },
    ],
    title: 'Color Palette & Hex Swatch Extractor from Image',
    description:
      'Extract dominant colors from images into ready-to-use HEX swatches and CSS design tokens in seconds.',
    type: 'website',
  },
};

export default function ColorPalettePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Color Palette Extractor',
        url: 'https://freeconvertingtools.co.in/all-tools/image/color-palette',
        applicationCategory: 'DesignApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to extract dominant color palettes, HEX codes, and CSS design tokens from any image.',
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
            name: 'Color Palette Extractor',
            item: 'https://freeconvertingtools.co.in/all-tools/image/color-palette',
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
      <ColorPaletteTool />
    </div>
  );
}
