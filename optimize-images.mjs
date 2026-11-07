import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const dir = 'public/media';
const files = await fs.readdir(dir);
let converted = 0;

for (const f of files) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  const src = path.join(dir, f);
  const base = src.replace(/\.(png|jpe?g)$/i, '');
  const webp1200 = base + '.webp';
  const webp640  = base + '-640.webp';

  try {
    await sharp(src).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 78 }).toFile(webp1200);
    await sharp(src).resize({ width: 640,  withoutEnlargement: true }).webp({ quality: 75 }).toFile(webp640);
    const orig = (await fs.stat(src)).size;
    const out  = (await fs.stat(webp1200)).size;
    const saved = Math.round((orig - out) / 1024);
    console.log(`✅ ${f} — ${Math.round(orig/1024)}KB → ${Math.round(out/1024)}KB (−${saved}KB)`);
    converted++;
  } catch (e) {
    console.error(`❌ ${f}:`, e.message);
  }
}
console.log(`\nDone: ${converted} images converted.`);
