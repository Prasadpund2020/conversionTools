export type DownloadTab = "video" | "thumbnail";

export type AuthorizationStatus =
  | "authorized"
  | "unauthorized_arbitrary_youtube"
  | "source_unavailable";

export interface ThumbnailOption {
  quality: "Maximum Resolution" | "High Quality";
  dimensions: string;
  url: string;
}

export interface YouTubeVideoMetadata {
  id: string;
  url: string;
  title: string;
  channelTitle: string;
  channelUrl?: string;
  thumbnail: string;
  thumbnailFallback?: string;
  embedHtml?: string;
  hasAuthorizedDownload: boolean;
  authorizedDownloadUrl?: string;
  fileSizeBytes?: number;
  fileSizeFormatted?: string;
  authorizationStatus: AuthorizationStatus;
  authorizationMessage: string;
  thumbnailFormats: ThumbnailOption[];
}

export interface DownloadResult {
  blob: Blob;
  fileName: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
}
