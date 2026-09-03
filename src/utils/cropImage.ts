export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', reject);
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function getCroppedImageBlob(imageSrc: string, pixelCrop: PixelCrop): Promise<Blob> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas is empty'));
    }, 'image/jpeg');
  });
}

export function aspectToString(aspect: number): string {
  if (aspect === 1) return '1:1';
  if (Math.abs(aspect - 4 / 3) < 0.01) return '4:3';
  if (Math.abs(aspect - 3 / 4) < 0.01) return '3:4';
  return '1:1';
}