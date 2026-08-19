import sharp from 'sharp';
import { readdir, mkdir, rename, stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'public/images/work';
const KEEP = '_originals';
const MAX_WIDTH = 1920;

await mkdir(KEEP, { recursive: true });
const files = (await readdir(DIR)).filter((f) => /\.png$/i.test(f));

let before = 0, after = 0;
for (const f of files) {
  const src = path.join(DIR, f);
  const out = path.join(DIR, f.replace(/\.png$/i, '.webp'));

  before += (await stat(src)).size;
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out);
  after += (await stat(out)).size;

  await rename(src, path.join(KEEP, f));
  console.log(`${f} → ${path.basename(out)}`);
}

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
console.log(`\nTotal ${kb(before)} → ${kb(after)} (${((1 - after / before) * 100).toFixed(0)}% saved)`);
