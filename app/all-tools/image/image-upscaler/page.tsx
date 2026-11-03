import { Metadata } from 'next';
import { ImageUpscalerTool } from '@/components/tools/image-upscaler/ImageUpscalerTool';

export const metadata: Metadata = {
  title: 'AI Image Upscaler - Enlarge Images 2x & 4x Free Online',
  description:
    'Upscale images 2x or 4x without pixel artifacts. Features bicubic smoothing, unsharp edge mask enhancement, and instant client-side export.',
  keywords: [
    'image upscaler',
    'enlarge image online',
    'super resolution photo',
    'upscale image 4x',
    'free image upscaler without watermark',
    'bicubic image enlarger',
    'pixel art upscaler',
  ],
  alternates: {
    canonical: "/all-tools/image/image-upscaler",
  },
  openGraph: {
    url: "/all-tools/image/image-upscaler",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "AI Image Upscaler",
      },
    ],
    title: 'AI Image Upscaler - Enlarge Images 2x & 4x Free Online',
    description:
      'Double or quadruple image resolution in seconds with clean edge enhancement and complete privacy. 100% in-browser processing.',
    type: 'website',
  },
};

export default function ImageUpscalerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'AI Image Upscaler',
        url: 'https://freeconvertingtools.co.in/all-tools/image/image-upscaler',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to upscale and enlarge images 2x and 4x using multi-pass bicubic interpolation and edge contrast sharpening.',
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
            name: 'Image Upscaler',
            item: 'https://freeconvertingtools.co.in/all-tools/image/image-upscaler',
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
      <ImageUpscalerTool />
    </div>
  );
}
