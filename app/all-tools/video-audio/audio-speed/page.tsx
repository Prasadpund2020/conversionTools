import { Metadata } from 'next';
import { AudioSpeedTool } from '@/components/tools/audio-speed/AudioSpeedTool';

export const metadata: Metadata = {
  title: 'Audio Speed & Tempo Changer - Free Online Audio Tool | Tools Arena',
  description:
    'Change the speed and tempo of MP3, WAV, AAC, and FLAC audio files without loss of quality. Speed up podcasts or slow down music recordings directly in your browser.',
  keywords: [
    'audio speed changer',
    'change audio tempo online',
    'speed up mp3',
    'slow down music',
    'audio tempo controller',
    'change playback speed of audio file',
    'free audio speed modifier',
  ],
  openGraph: {
    title: 'Audio Speed & Tempo Changer - Free Online Audio Tool | Tools Arena',
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
        url: 'https://toolsarena.io/all-tools/video-audio/audio-speed',
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
            name: 'Video & Audio',
            item: 'https://toolsarena.io/all-tools#video-audio',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Audio Speed Changer',
            item: 'https://toolsarena.io/all-tools/video-audio/audio-speed',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Change Audio Speed Online',
        description: 'Easily adjust the playback speed of any audio file in 3 steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Audio',
            text: 'Drop or select your MP3, WAV, AAC, M4A, or FLAC file.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Select Speed Multiplier',
            text: 'Choose a preset like 0.75x, 1.25x, 1.5x, or drag the smooth slider between 0.25x and 3.0x.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Export 16-Bit WAV',
            text: 'Click "Export & Download 16-Bit WAV" to get your speed-modified audio file.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Does changing the speed degrade audio quality?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The audio buffer is linearly interpolated and exported as uncompressed 16-bit PCM WAV to preserve studio-grade fidelity.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my audio files uploaded anywhere?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Never. Decoding and resampling run exclusively in your browser using the HTML5 Web Audio API.',
            },
          },
          {
            '@type': 'Question',
            name: 'What formats can I upload?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can upload MP3, WAV, AAC, M4A, OGG, and FLAC audio files.',
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
      <AudioSpeedTool />
    </div>
  );
}
