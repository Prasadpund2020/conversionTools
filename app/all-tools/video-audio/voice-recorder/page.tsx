import { Metadata } from 'next';
import { VoiceRecorderTool } from '@/components/tools/voice-recorder/VoiceRecorderTool';

export const metadata: Metadata = {
  title: 'Voice & Microphone Recorder - Free Online Audio Tool | Free Converting Tools',
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
  openGraph: {
    title: 'Voice & Microphone Recorder - Free Online Audio Tool | Free Converting Tools',
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
            item: 'https://freeconvertingtools.co.in/all-tools#video-audio',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Voice Recorder',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/voice-recorder',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Record Voice and Microphone Audio Online',
        description: 'Easily record voice memos directly in your browser.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Allow Microphone Access',
            text: 'Click "Start Recording" and allow your browser to access your microphone.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Record Your Audio',
            text: 'Speak into your microphone while monitoring the real-time waveform visualizer.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Finish & Download',
            text: 'Click "Stop & Finish" to preview and download your audio recording instantly.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are my audio recordings saved on a remote server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The audio stream is captured and encoded directly in your browser using the MediaStream Recording API. Your voice never leaves your device.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I pause and resume during recording?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can pause at any point during recording and resume when ready without splitting the audio into multiple files.',
            },
          },
          {
            '@type': 'Question',
            name: 'What devices are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Any modern browser on desktop, laptop, tablet, or smartphone (Chrome, Safari, Firefox, Edge).',
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
      <VoiceRecorderTool />
    </div>
  );
}
