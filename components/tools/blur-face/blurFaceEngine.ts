import { CensorRegion, StagedImageFile } from './types';

/**
 * Renders all censor regions on an image and returns the final canvas or data URL
 */
export function renderCensoredCanvas(
  imageElement: HTMLImageElement,
  regions: CensorRegion[]
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = imageElement.naturalWidth || imageElement.width;
  canvas.height = imageElement.naturalHeight || imageElement.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Draw base image
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  // 2. Apply each censor region
  for (const region of regions) {
    const rx = Math.round(region.x * canvas.width);
    const ry = Math.round(region.y * canvas.height);
    const rw = Math.round(region.width * canvas.width);
    const rh = Math.round(region.height * canvas.height);

    if (rw <= 0 || rh <= 0) continue;

    ctx.save();

    // Clip to shape
    ctx.beginPath();
    if (region.shape === 'ellipse') {
      const cx = rx + rw / 2;
      const cy = ry + rh / 2;
      ctx.ellipse(cx, cy, rw / 2, rh / 2, 0, 0, Math.PI * 2);
    } else {
      ctx.rect(rx, ry, rw, rh);
    }
    ctx.clip();

    if (region.mode === 'blackout') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(rx, ry, rw, rh);
    } else if (region.mode === 'pixelate') {
      const blockSize = Math.max(6, Math.round(region.intensity || 16));
      const sampleW = Math.max(1, Math.floor(rw / blockSize));
      const sampleH = Math.max(1, Math.floor(rh / blockSize));

      // Create small buffer
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = sampleW;
      tempCanvas.height = sampleH;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(canvas, rx, ry, rw, rh, 0, 0, sampleW, sampleH);

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tempCanvas, 0, 0, sampleW, sampleH, rx, ry, rw, rh);
        ctx.imageSmoothingEnabled = true;
      }
    } else if (region.mode === 'blur') {
      const blurRadius = Math.max(4, Math.round(region.intensity || 14));
      const ctxAny = ctx as any;
      if (typeof ctxAny.filter === 'string') {
        ctxAny.filter = `blur(${blurRadius}px)`;
        ctx.drawImage(canvas, rx, ry, rw, rh, rx, ry, rw, rh);
        ctxAny.filter = 'none';
      } else {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = Math.max(2, Math.floor(rw / (blurRadius * 1.5)));
        tempCanvas.height = Math.max(2, Math.floor(rh / (blurRadius * 1.5)));
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(canvas, rx, ry, rw, rh, 0, 0, tempCanvas.width, tempCanvas.height);
          ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, rx, ry, rw, rh);
        }
      }
    }

    ctx.restore();
  }

  return canvas;
}

/**
 * Exports the censored canvas as a downloadable file
 */
export function exportCensoredImage(
  canvas: HTMLCanvasElement,
  originalFileName: string,
  format: 'png' | 'jpeg' = 'png'
): Promise<{ blob: Blob; downloadUrl: string; fileName: string; sizeBytes: number }> {
  return new Promise((resolve, reject) => {
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const ext = format === 'jpeg' ? 'jpg' : 'png';
    const baseName = originalFileName.replace(/\.[^/.]+$/, '');
    const outName = `${baseName}_censored.${ext}`;

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to generate image blob'));
          return;
        }
        const downloadUrl = URL.createObjectURL(blob);
        resolve({
          blob,
          downloadUrl,
          fileName: outName,
          sizeBytes: blob.size,
        });
      },
      mimeType,
      0.92
    );
  });
}
