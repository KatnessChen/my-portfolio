import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

const cache = new Map<string, { width: number; height: number } | null>();

export async function workImageSize(file: string) {
  if (cache.has(file)) return cache.get(file)!;

  const abs = path.join(process.cwd(), 'public', 'images', 'work', file);
  if (!existsSync(abs)) {
    console.warn(`[imageSize] Image not found: public/images/work/${file}`);
    cache.set(file, null);
    return null;
  }

  const { width, height } = await sharp(abs).metadata();
  const size = width && height ? { width, height } : null;
  cache.set(file, size);
  return size;
}
