#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitemapPath = join(__dirname, '..', 'node_modules', '@astrojs', 'sitemap', 'dist', 'index.js');

if (!existsSync(sitemapPath)) {
  console.log('[patch-sitemap] not found — ok, build will proceed normally.');
  process.exit(0);
}

const src = readFileSync(sitemapPath, 'utf8');
const fix = src
  .replace(/\bpages\.reduce\(/g,   '(pages||[]).reduce(')
  .replace(/\bpages\.map\(/g,      '(pages||[]).map(')
  .replace(/\bpages\.filter\(/g,   '(pages||[]).filter(')
  .replace(/\bpages\.forEach\(/g,  '(pages||[]).forEach(')
  .replace(/\b_routes\.reduce\(/g, '(_routes||[]).reduce(')
  .replace(/\b_routes\.map\(/g,    '(_routes||[]).map(')
  .replace(/\b_routes\.filter\(/g, '(_routes||[]).filter(');

if (fix !== src) {
  writeFileSync(sitemapPath, fix, 'utf8');
  console.log('[patch-sitemap] patched @astrojs/sitemap for hybrid mode (_routes + pages).');
} else {
  console.log('[patch-sitemap] already patched or not needed.');
}
