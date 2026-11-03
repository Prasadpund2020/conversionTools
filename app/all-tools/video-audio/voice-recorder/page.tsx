import { Metadata } from 'next';
import { VoiceRecorderTool } from '@/components/tools/voice-recorder/VoiceRecorderTool';

export const metadata: Metadata = {
  title: 'Voice & Microphone Recorder - Free Online Audio Tool',
  description:
    'Record high-quality voice memos and podcasts in your browser. Live waveform visualizer, pause/resume controls, and audio export with zero cloud uploads.',
  keywords: [
    'voice recorder',
    'microphone recorder online',
    'record audio free',
    'voice memo recorder browser',
    'online dictaphone',
    'mic audio capture without installation',
  ],
  alternates: {
    canonical: "/all-tools/video-audio/voice-recorder",
  },
  openGraph: {
    url: "/all-tools/video-audio/voice-recorder",
    images: [
      {
        url: "/images/all-tools-hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Voice & Microphone Recorder",
      },
    ],
    title: 'Voice & Microphone Recorder - Free Online Audio Tool',
    description:
      'Record crystal-clear voice memos and mic audio with real-time waveform visualization in your browser. 100% private.',
    type: 'website',
  },
};

export default function VoiceRecorderPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Voice & Microphone Recorder',
        url: 'https://freeconvertingtools.co.in/all-tools/video-audio/voice-recorder',
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free in-browser microphone recorder with live waveform visualization and instant high-fidelity audio export.',
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
            name: 'Voice Recorder',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/voice-recorder',
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
      <VoiceRecorderTool />
    </div>
  );
}
