import { Base64Options, Base64Result } from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Encodes a File or Blob into a Base64 string and optional Data URI
 */
export async function encodeFileToBase64(
  file: File,
  options: Base64Options
): Promise<Base64Result> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const fullDataUrl = reader.result as string;
        // Format: data:[<mediatype>][;base64],<data>
        const match = fullDataUrl.match(/^data:(.*?);base64,(.*)$/);

        let mimeType = file.type || 'application/octet-stream';
        let rawBase64 = '';

        if (match) {
          mimeType = match[1] || mimeType;
          rawBase64 = match[2];
        } else {
          rawBase64 = fullDataUrl.split(',')[1] || fullDataUrl;
        }

        let formattedBase64 = rawBase64;
        if (options.lineWrap) {
          formattedBase64 = (rawBase64.match(/.{1,76}/g) || []).join('\n');
        }

        const dataUri = `data:${mimeType};base64,${rawBase64}`;
        const isImage = mimeType.startsWith('image/');

        resolve({
          base64String: options.includeDataUriPrefix ? dataUri : formattedBase64,
          dataUri,
          mimeType,
          fileName: file.name,
          sizeBytes: file.size,
          downloadUrl: dataUri,
          isImage,
        });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file for Base64 encoding.'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Decodes a Base64 string (raw or Data URI) back into a File / Blob
 */
export function decodeBase64ToFile(
  input: string,
  customFileName?: string
): Base64Result {
  const cleanInput = input.trim();
  let mimeType = 'application/octet-stream';
  let rawBase64 = cleanInput;

  // Check for data: URI prefix
  const dataUriMatch = cleanInput.match(/^data:([^;]+);base64,([\s\S]*)$/);
  if (dataUriMatch) {
    mimeType = dataUriMatch[1];
    rawBase64 = dataUriMatch[2].replace(/\s+/g, '');
  } else {
    // Strip whitespace/newlines
    rawBase64 = cleanInput.replace(/\s+/g, '');
  }

  // Detect MIME from common base64 signatures if unknown
  if (mimeType === 'application/octet-stream') {
    if (rawBase64.startsWith('/9j/')) mimeType = 'image/jpeg';
    else if (rawBase64.startsWith('iVBORw0KGgo')) mimeType = 'image/png';
    else if (rawBase64.startsWith('R0lGOD')) mimeType = 'image/gif';
    else if (rawBase64.startsWith('UklGR')) mimeType = 'image/webp';
    else if (rawBase64.startsWith('JVBERi0')) mimeType = 'application/pdf';
    else if (rawBase64.startsWith('UEsDB')) mimeType = 'application/zip';
  }

  // Decode base64 to binary
  let byteCharacters: string;
  try {
    byteCharacters = atob(rawBase64);
  } catch (e) {
    throw new Error('Invalid Base64 string. Please verify the characters.');
  }

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  // Map extension from MIME
  const extMap: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'application/pdf': '.pdf',
    'application/zip': '.zip',
    'text/plain': '.txt',
    'application/json': '.json',
  };

  const extension = extMap[mimeType] || '.bin';
  const fileName = customFileName
    ? customFileName.includes('.')
      ? customFileName
      : `${customFileName}${extension}`
    : `decoded-file${extension}`;

  const downloadUrl = URL.createObjectURL(blob);
  const isImage = mimeType.startsWith('image/');
  const dataUri = `data:${mimeType};base64,${rawBase64}`;

  return {
    base64String: rawBase64,
    dataUri,
    mimeType,
    fileName,
    sizeBytes: blob.size,
    downloadUrl,
    isImage,
  };
}
