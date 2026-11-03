import { Metadata } from 'next';
import { VideoToGifTool } from '@/components/tools/video-to-gif/VideoToGifTool';

export const metadata: Metadata = {
  title: 'Video to GIF Converter - Free Online Animated GIF Maker',
  description:
    'Convert MP4, WebM, and MOV videos into animated GIFs in your browser. Trim clips, adjust frame rate (FPS) and resolution, with zero watermarks.',
  keywords: [
    'video to gif',
    'gif maker',
    'mp4 to gif',
    'animated gif creator',
    'convert video to gif online',
    'free gif maker without watermark',
    'trim video to gif',
  ],
  alternates: {
    canonical: "/all-tools/video-audio/video-to-gif",
  },
  openGraph: {
    url: "/all-tools/video-audio/video-to-gif",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Video to GIF Converter",
      },
    ],
    title: 'Video to GIF Converter - Free Online Animated GIF Maker',
    description:
      'Turn video clips into silky smooth animated GIFs in seconds. 100% client-side privacy, customizable FPS and dimensions.',
    type: 'website',
  },
};

export default function VideoToGifPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Video to GIF Converter',
        url: 'https://freeconvertingtools.co.in/all-tools/video-audio/video-to-gif',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to convert video files (MP4, WebM, MOV) into animated GIFs with custom trim range, frame rate, and dimensions.',
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
            name: 'Video & Audio',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Video to GIF',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/video-to-gif',
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
      <VideoToGifTool />
    </div>
  );
}
