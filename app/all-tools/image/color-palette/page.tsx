import { Metadata } from 'next';
import { ColorPaletteTool } from '@/components/tools/color-palette/ColorPaletteTool';

export const metadata: Metadata = {
  title: 'Color Palette & Hex Swatch Extractor from Image | Tools Arena',
  description:
    'Extract beautiful color palettes and hex swatch codes from any photo online. One-click copy for HEX, RGB, HSL values, and export CSS variables with zero server uploads.',
  keywords: [
    'color palette extractor',
    'extract colors from image',
    'image color picker',
    'hex color swatch generator',
    'photo palette generator',
    'css variables palette',
    'free color palette maker',
  ],
  openGraph: {
    title: 'Color Palette & Hex Swatch Extractor from Image | Tools Arena',
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
        url: 'https://toolsarena.io/all-tools/image/color-palette',
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
            name: 'Color Palette Extractor',
            item: 'https://toolsarena.io/all-tools/image/color-palette',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Extract a Color Palette from an Image',
        description: 'Easily get hex color codes from any photo in 3 steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Photo',
            text: 'Drop or select your photo, artwork, or graphic.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Customize Palette Size',
            text: 'Choose 5, 6, 8, or 10 swatches and pick sorting order (Dominance, Hue, or Luminance).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Copy Codes or Export',
            text: 'Click any swatch to copy its HEX code, or copy ready-to-use CSS Variables.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How are the dominant colors calculated?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool uses fast 3D RGB color quantization and Euclidean distance clustering to identify the most prominent distinct color families across the image.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my uploaded pictures stored anywhere?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The image is drawn to an in-memory HTML5 Canvas directly on your computer. Nothing is transmitted across the internet.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I export the palette directly to CSS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Click "Copy CSS Variables" to get a clean :root { --color-1: ... } code snippet ready to paste into your stylesheet.',
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
      <ColorPaletteTool />
    </div>
  );
}
