import { StagedImageUpscalerFile, UpscaleOptions, UpscaleResult } from './types';

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

/**
 * Applies a 3x3 convolution unsharp mask kernel to sharpen upscaled pixels
 */
function applySharpenFilter(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number
) {
  if (amount <= 0) return;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const copy = new Uint8ClampedArray(data);

  // Kernel weight
  const k = (amount / 100) * 0.45;
  const center = 1 + 4 * k;

  for (let y = 1; y < height - 1; y++) {
    const rowOffset = y * width * 4;
    const upOffset = (y - 1) * width * 4;
    const downOffset = (y + 1) * width * 4;

    for (let x = 1; x < width - 1; x++) {
      const idx = rowOffset + x * 4;
      const leftIdx = rowOffset + (x - 1) * 4;
      const rightIdx = rowOffset + (x + 1) * 4;
      const upIdx = upOffset + x * 4;
      const downIdx = downOffset + x * 4;

      for (let c = 0; c < 3; c++) {
        const val =
          center * copy[idx + c] -
          k * (copy[leftIdx + c] + copy[rightIdx + c] + copy[upIdx + c] + copy[downIdx + c]);
        data[idx + c] = Math.max(0, Math.min(255, val));
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

/**
 * Performs high quality multi-pass image upscaling with optional edge contrast sharpening
 */
export async function upscaleImage(
  stagedFile: StagedImageUpscalerFile,
  options: UpscaleOptions,
  onProgress?: (progress: number, status: string) => void
): Promise<UpscaleResult> {
  const targetWidth = stagedFile.width * options.factor;
  const targetHeight = stagedFile.height * options.factor;

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) {
    throw new Error('Unable to initialize canvas context.');
  }

  if (onProgress) onProgress(20, 'Applying multi-pass interpolation...');

  if (options.algorithm === 'pixel-art') {
    // Nearest neighbor
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(stagedFile.imageElement, 0, 0, targetWidth, targetHeight);
  } else {
    // Multi-pass stepwise bicubic scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (options.factor === 4) {
      // Step 1: upscale 2x to temp canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = stagedFile.width * 2;
      tempCanvas.height = stagedFile.height * 2;
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.imageSmoothingEnabled = true;
      tempCtx.imageSmoothingQuality = 'high';
      tempCtx.drawImage(stagedFile.imageElement, 0, 0, tempCanvas.width, tempCanvas.height);

      if (onProgress) onProgress(50, 'Enhancing secondary resolution pass...');

      // Step 2: upscale from 2x to 4x
      ctx.drawImage(tempCanvas, 0, 0, targetWidth, targetHeight);
    } else {
      ctx.drawImage(stagedFile.imageElement, 0, 0, targetWidth, targetHeight);
    }

    if (options.algorithm === 'sharp' || options.sharpenAmount > 0) {
      if (onProgress) onProgress(75, 'Sharpening high-frequency edge details...');
      const sharpenLevel = options.algorithm === 'sharp' ? Math.max(35, options.sharpenAmount) : options.sharpenAmount;
      applySharpenFilter(ctx, targetWidth, targetHeight, sharpenLevel);
    }
  }

  if (onProgress) onProgress(90, 'Encoding super-resolution image...');

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate upscaled image blob.'));
          return;
        }
        const downloadUrl = URL.createObjectURL(blob);
        const baseName = stagedFile.name.replace(/\.[^/.]+$/, '');
        const fileName = `${baseName}_upscaled_${options.factor}x.png`;

        resolve({
          blob,
          downloadUrl,
          fileName,
          width: targetWidth,
          height: targetHeight,
          sizeBytes: blob.size,
        });
      },
      'image/png',
      0.95
    );
  });
}
