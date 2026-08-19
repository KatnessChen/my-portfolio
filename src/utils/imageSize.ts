import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Build 時讀出 public/images/work/ 底下圖片的實際尺寸。
 * 給 <img> 的 width/height 屬性用，讓瀏覽器能預留正確空間（避免 CLS）。
 * 只在 SSG build 期間執行，不會進到瀏覽器。
 */
const cache = new Map<string, { width: number; height: number } | null>();

export async function workImageSize(file: string) {
  if (cache.has(file)) return cache.get(file)!;

  const abs = path.join(process.cwd(), 'public', 'images', 'work', file);
  if (!existsSync(abs)) {
    console.warn(`[imageSize] 找不到圖片：public/images/work/${file}`);
    cache.set(file, null);
    return null;
  }

  const { width, height } = await sharp(abs).metadata();
  const size = width && height ? { width, height } : null;
  cache.set(file, size);
  return size;
}
