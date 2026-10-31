import { Metadata } from 'next';
import { VideoToGifTool } from '@/components/tools/video-to-gif/VideoToGifTool';

export const metadata: Metadata = {
  title: 'Video to GIF Converter - Free Online Animated GIF Maker | Free Converting Tools',
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
  openGraph: {
    title: 'Video to GIF Converter - Free Online Animated GIF Maker | Free Converting Tools',
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
            item: 'https://freeconvertingtools.co.in/all-tools#video-audio',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Video to GIF',
            item: 'https://freeconvertingtools.co.in/all-tools/video-audio/video-to-gif',
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to Convert Video to Animated GIF',
        description: 'Easily turn video clips into animated GIFs in 4 simple steps.',
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Upload Video',
            text: 'Drag and drop or browse your MP4, WebM, or MOV video file.',
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Set Trim Range',
            text: 'Adjust the start and end sliders to choose the exact snippet you want in your GIF.',
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Configure Settings',
            text: 'Select your preferred frame rate (10, 15, or 24 FPS) and width resolution.',
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Generate & Download',
            text: 'Click "Generate Animated GIF" and download your loop-ready animated GIF file.',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this Video to GIF converter free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! It is 100% free with no watermarks, no account registration, and no limits.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are my videos uploaded to a server?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. All frame extraction and GIF assembly happens locally in your browser memory using HTML5 Canvas and client-side binary quantization.',
            },
          },
          {
            '@type': 'Question',
            name: 'What video formats are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Any browser-supported video format including MP4 (H.264), WebM (VP8/VP9), MOV, and AVI.',
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
      <VideoToGifTool />
    </div>
  );
}
