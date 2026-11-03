import { Metadata } from 'next';
import { AudioJoinerTool } from '@/components/tools/audio-joiner/AudioJoinerTool';

export const metadata: Metadata = {
  title: 'Audio Joiner & Track Merger - Combine MP3, WAV Online',
  description:
    'Combine multiple audio files into a continuous track online. Add crossfades, reorder songs, and export lossless 16-bit WAV with 100% browser privacy.',
  keywords: [
    'audio joiner',
    'merge audio files online',
    'combine mp3 songs',
    'audio merger with crossfade',
    'join voice memos',
    'free audio combiner',
    'wav merger online',
  ],
  alternates: {
    canonical: "/all-tools/video-audio/audio-joiner",
  },
  openGraph: {
    url: "/all-tools/video-audio/audio-joiner",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Audio Joiner & Track Merger",
      },
    ],
    title: 'Audio Joiner & Track Merger - Combine MP3, WAV Online',
    description:
      'Seamlessly merge multiple audio tracks into a single master audio file with crossfade blending directly in your browser.',
    type: 'website',
  },
};

export default function AudioJoinerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Audio Joiner & Merger',
        url: 'https://freeconvertingtools.co.in/all-tools/video-audio/audio-joiner',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to combine, reorder, and merge multiple audio files into a single WAV audio track with customizable crossfading.',
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
            name: 'Audio Joiner',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/audio-joiner',
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
      <AudioJoinerTool />
    </div>
  );
}
