import { Metadata } from 'next';
import { AudioSpeedTool } from '@/components/tools/audio-speed/AudioSpeedTool';

export const metadata: Metadata = {
  title: 'Audio Speed & Tempo Changer - Free Online Audio Tool',
  description:
    'Change the speed and tempo of MP3, WAV, AAC, and FLAC audio files. Speed up podcasts or slow down music recordings directly in your browser safely.',
  keywords: [
    'audio speed changer',
    'change audio tempo online',
    'speed up mp3',
    'slow down music',
    'audio tempo controller',
    'change playback speed of audio file',
    'free audio speed modifier',
  ],
  alternates: {
    canonical: "/all-tools/video-audio/audio-speed",
  },
  openGraph: {
    url: "/all-tools/video-audio/audio-speed",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Audio Speed & Tempo Changer",
      },
    ],
    title: 'Audio Speed & Tempo Changer - Free Online Audio Tool',
    description:
      'Modify the playback speed of songs, podcasts, and voice notes from 0.25x to 3.0x. Export crystal-clear 16-bit WAV with zero cloud uploads.',
    type: 'website',
  },
};

export default function AudioSpeedPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Audio Speed & Tempo Changer',
        url: 'https://freeconvertingtools.co.in/all-tools/video-audio/audio-speed',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free online tool to speed up or slow down audio recordings and music files with client-side linear resampling.',
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
            name: 'Audio Speed Changer',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/audio-speed',
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
      <AudioSpeedTool />
    </div>
  );
}
