import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import { existsSync, readFileSync, writeFileSync } from 'fs';

// Fix @astrojs/sitemap crash in hybrid mode (pages=undefined bug)
// Runs before any integration hook, cannot be blocked by Cloudflare cache
try {
  const f = new URL('./node_modules/@astrojs/sitemap/dist/index.js', import.meta.url);
  if (existsSync(f)) {
    const src = readFileSync(f, 'utf8');
    const fix = src
      .replace(/\bpages\.reduce\(/g,  '(pages||[]).reduce(')
      .replace(/\bpages\.map\(/g,     '(pages||[]).map(')
      .replace(/\bpages\.filter\(/g,  '(pages||[]).filter(')
      .replace(/\bpages\.forEach\(/g, '(pages||[]).forEach(');
    if (fix !== src) writeFileSync(f, fix, 'utf8');
  }
} catch (_) {}

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  site: 'https://riggamer.com',
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});
