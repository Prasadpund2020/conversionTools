import { Metadata } from 'next';
import { ImageUpscalerTool } from '@/components/tools/image-upscaler/ImageUpscalerTool';

export const metadata: Metadata = {
  title: 'AI Image Upscaler - Enlarge Images 2x & 4x Free Online | Free Converting Tools',
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
  openGraph: {
    title: 'AI Image Upscaler - Enlarge Images 2x & 4x Free Online | Free Converting Tools',
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
            item: 'https://freeconvertingtools.co.in/all-tools#image',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Image Upscaler',
            item: 'https://freeconvertingtools.co.in/all-tools/image/image-upscaler',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Upscale and Enlarge an Image',
        description: 'Easily double or quadruple image dimensions in 3 steps.',
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
            name: 'Select Upscale Factor',
            text: 'Choose 2x (Double) or 4x (Super Resolution) and pick your scaling engine.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Download High-Res PNG',
            text: 'Click "Upscale Image" and download your enlarged image in crisp lossless PNG.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does in-browser image upscaling work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool uses multi-pass stepwise bicubic interpolation combined with convolution unsharp masking to reconstruct high-frequency edge details in browser memory.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my private photos uploaded anywhere?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All pixel interpolation and canvas rendering run strictly inside your browser. No files are transmitted to external servers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can this upscale pixel art and retro graphics without blurring?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Select the "Crisp Pixel Art" scaling engine to preserve needle-sharp square pixels without any smoothing or distortion.',
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
      <ImageUpscalerTool />
    </div>
  );
}
