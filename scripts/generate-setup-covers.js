// Generate missing setup cover images — 1200×630 WebP
import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../public/media');

const BG_BLUE   = '#1E3A5F'; // setup dark blue background
const ACCENT    = '#3B82F6'; // setup blue accent
const WHITE     = '#FFFFFF';
const GRAY      = '#94A3B8';

const covers = [
  { file: 'best-gaming-pc-budget-2026-cover.webp',  label: 'SETUP',    title: 'Best Budget Gaming PC',   sub: '$600 Build · 2026' },
  { file: 'best-gaming-monitor-2026-cover.webp',    label: 'SETUP',    title: 'Best Gaming Monitor',     sub: '1440p vs 4K vs 240Hz · 2026' },
  { file: 'gaming-headset-guide-cover.webp',        label: 'SETUP',    title: 'Best Gaming Headset',     sub: 'PC · PS5 · Cross-Platform · 2026' },
  { file: 'mechanical-keyboard-guide-cover.webp',   label: 'SETUP',    title: 'Best Mechanical Keyboard', sub: 'Switch Guide Included · 2026' },
  { file: 'gaming-mouse-guide-cover.webp',          label: 'SETUP',    title: 'Best Gaming Mouse',       sub: 'Lightweight vs Ergo vs Ambidextrous · 2026' },
  { file: 'gpu-upgrade-guide-2026-cover.webp',      label: 'SETUP',    title: 'GPU Upgrade Guide',       sub: 'When to Upgrade and What to Buy · 2026' },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

async function generateCover(cover) {
  const W = 1200, H = 630;
  const bg = hexToRgb(BG_BLUE);
  const accent = hexToRgb(ACCENT);

  // Build SVG overlay
  const titleLines = wrapText(cover.title, 22);
  const titleY = 240;
  const lineH = 90;

  const titleSvg = titleLines.map((line, i) =>
    `<text x="80" y="${titleY + i * lineH}" font-family="Arial, sans-serif" font-size="76" font-weight="bold" fill="${WHITE}">${line}</text>`
  ).join('\n');

  const subY = titleY + titleLines.length * lineH + 20;

  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${BG_BLUE};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0F2040;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)" />

  <!-- Accent bar top -->
  <rect x="0" y="0" width="${W}" height="8" fill="${ACCENT}" />

  <!-- Accent bar left -->
  <rect x="0" y="0" width="8" height="${H}" fill="${ACCENT}" />

  <!-- Decorative grid lines -->
  <line x1="0" y1="160" x2="${W}" y2="160" stroke="${ACCENT}" stroke-width="1" stroke-opacity="0.15"/>
  <line x1="0" y1="470" x2="${W}" y2="470" stroke="${ACCENT}" stroke-width="1" stroke-opacity="0.15"/>
  <line x1="900" y1="0" x2="900" y2="${H}" stroke="${ACCENT}" stroke-width="1" stroke-opacity="0.15"/>

  <!-- Label badge -->
  <rect x="80" y="60" width="140" height="50" rx="6" fill="${ACCENT}" />
  <text x="150" y="95" font-family="Arial, sans-serif" font-size="26" font-weight="bold" fill="${WHITE}" text-anchor="middle">${cover.label}</text>

  <!-- RigGamer wordmark -->
  <text x="${W - 80}" y="95" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${ACCENT}" text-anchor="end">RigGamer</text>

  <!-- Title -->
  ${titleSvg}

  <!-- Subtitle -->
  <text x="80" y="${subY}" font-family="Arial, sans-serif" font-size="34" fill="${GRAY}">${cover.sub}</text>

  <!-- Bottom bar -->
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${ACCENT}" opacity="0.5" />
</svg>`;

  const svgBuffer = Buffer.from(svg);

  await sharp({
    create: { width: W, height: H, channels: 3, background: bg }
  })
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .webp({ quality: 82 })
    .toFile(join(OUTPUT_DIR, cover.file));

  console.log(`✅ ${cover.file}`);
}

console.log('Generating setup covers...\n');
for (const cover of covers) {
  await generateCover(cover);
}
console.log('\nDone.');
