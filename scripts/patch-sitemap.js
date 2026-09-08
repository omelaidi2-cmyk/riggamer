#!/usr/bin/env node
// Patch @astrojs/sitemap to fix crash in hybrid/SSR mode
// Error: "Cannot read properties of undefined (reading 'reduce')"
// Cause: pages parameter is undefined in hybrid builds

const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'node_modules', '@astrojs', 'sitemap', 'dist', 'index.js');

if (!fs.existsSync(sitemapPath)) {
  console.log('[patch-sitemap] @astrojs/sitemap not found — nothing to patch, build will proceed normally.');
  process.exit(0);
}

let code = fs.readFileSync(sitemapPath, 'utf8');

// Fix: replace pages.reduce( with (pages||[]).reduce(
// and pages.map( with (pages||[]).map(
const patched = code
  .replace(/\bpages\.reduce\(/g, '(pages||[]).reduce(')
  .replace(/\bpages\.map\(/g, '(pages||[]).map(')
  .replace(/\bpages\.filter\(/g, '(pages||[]).filter(')
  .replace(/\bpages\.forEach\(/g, '(pages||[]).forEach(');

if (patched === code) {
  console.log('[patch-sitemap] No changes needed — already patched or different version.');
} else {
  fs.writeFileSync(sitemapPath, patched, 'utf8');
  console.log('[patch-sitemap] Successfully patched @astrojs/sitemap for hybrid mode.');
}
