export type Base64Mode = 'encode' | 'decode';

export interface Base64Options {
  mode: Base64Mode;
  includeDataUriPrefix: boolean;
  lineWrap: boolean;
  targetMimeType?: string;
}

export interface Base64Result {
  base64String: string;
  dataUri: string;
  mimeType: string;
  fileName: string;
  sizeBytes: number;
  downloadUrl?: string;
  isImage?: boolean;
}
