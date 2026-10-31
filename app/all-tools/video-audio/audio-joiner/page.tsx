import { Metadata } from 'next';
import { AudioJoinerTool } from '@/components/tools/audio-joiner/AudioJoinerTool';

export const metadata: Metadata = {
  title: 'Audio Joiner & Track Merger - Combine MP3, WAV Online | Free Converting Tools',
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
  openGraph: {
    title: 'Audio Joiner & Track Merger - Combine MP3, WAV Online | Free Converting Tools',
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
            item: 'https://freeconvertingtools.co.in/all-tools#video-audio',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Audio Joiner',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/audio-joiner',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Merge Multiple Audio Files Online',
        description: 'Easily combine audio tracks in 3 simple steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Audio Tracks',
            text: 'Drop or select two or more MP3, WAV, AAC, or FLAC audio files.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Arrange & Set Crossfade',
            text: 'Reorder tracks using the up/down arrows and select your crossfade duration (0s to 3s).',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Merge & Download',
            text: 'Click "Merge Tracks to Master WAV" to export your seamless audio mix.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What audio formats can I combine?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can upload MP3, WAV, AAC, M4A, OGG, and FLAC tracks. Different formats and sample rates are automatically unified.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my audio files sent to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Decoding and crossfade concatenation run 100% locally on your computer via the HTML5 Web Audio API.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does crossfade blending work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Crossfading fades out the end of the previous track while simultaneously fading in the beginning of the next track for a smooth, gapless transition.',
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
      <AudioJoinerTool />
    </div>
  );
}
