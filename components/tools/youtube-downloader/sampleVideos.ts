export interface SampleVideoItem {
  id: string;
  title: string;
  url: string;
  badge: string;
  description: string;
  isAuthorized: boolean;
}

export const SAMPLE_VIDEOS: SampleVideoItem[] = [
  {
    id: "test-authorized",
    title: "Authorized Test Video (Flower - CC0 MP4)",
    url: "https://www.youtube.com/watch?v=test-authorized",
    badge: "Authorized MP4",
    description: "Verified CC0 open media test stream with genuine MP4 container validation.",
    isAuthorized: true,
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    badge: "Official YouTube oEmbed",
    description: "Standard YouTube video to test real-time metadata retrieval via official oEmbed API.",
    isAuthorized: false,
  },
];
