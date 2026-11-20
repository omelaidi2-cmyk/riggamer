/**
 * STFC Banner Generator — 728×146 wide + 300×250 box
 * Sharp + SVG compositing (rsvg)
 */
'use strict';
const sharp = require('sharp');
const path  = require('path');
const OUT   = path.resolve(__dirname, '../public/media');
const SRC_W = path.resolve(__dirname, '../public/media/star-trek-fleet-command-guides.webp');   // 1680×702
const SRC_B = path.resolve(__dirname, '../public/media/star-trek-fleet-command-reviews.webp');  // 1200×675

/* ── Wide 728×146 ───────────────────────────────────────────────────────────── */
async function makeWide() {
  const W = 728, H = 146;

  // 1. Base image — crop to full width, top-align to show starfield/ships
  const base = await sharp(SRC_W)
    .resize(W, H, { fit: 'cover', position: 'top' })
    .toBuffer();

  // 2. SVG overlay — dark gradient left, title, tagline, CTA button right
  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- dark gradient left side for text readability -->
    <linearGradient id="gL" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.82"/>
      <stop offset="58%"  stop-color="#000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.08"/>
    </linearGradient>
    <!-- right panel bg for CTA -->
    <linearGradient id="gBtn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#1a6fa8"/>
      <stop offset="100%" stop-color="#0d3f63"/>
    </linearGradient>
  </defs>

  <!-- full overlay gradient -->
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#gL)"/>

  <!-- gold top bar accent -->
  <rect x="0" y="0" width="${W}" height="3" fill="#c8a73a"/>

  <!-- GAME TITLE -->
  <text x="18" y="44"
    font-family="Arial Black, Impact, sans-serif"
    font-size="22" font-weight="900"
    fill="#ffffff"
    letter-spacing="1">STAR TREK</text>

  <text x="18" y="68"
    font-family="Arial Black, Impact, sans-serif"
    font-size="18" font-weight="900"
    fill="#c8a73a"
    letter-spacing="2">FLEET COMMAND</text>

  <!-- tagline -->
  <text x="18" y="96"
    font-family="Arial, sans-serif"
    font-size="12" font-weight="400"
    fill="#aac8e0">Build your fleet · Conquer the galaxy</text>

  <!-- PLATFORM badge -->
  <rect x="18" y="108" width="68" height="20" rx="3"
    fill="none" stroke="#4a7fa0" stroke-width="1"/>
  <text x="52" y="122"
    font-family="Arial, sans-serif"
    font-size="10" font-weight="700"
    fill="#aac8e0" text-anchor="middle">PC · MOBILE</text>

  <!-- FREE badge -->
  <rect x="92" y="108" width="42" height="20" rx="3" fill="#1a6fa8"/>
  <text x="113" y="122"
    font-family="Arial, sans-serif"
    font-size="10" font-weight="900"
    fill="#ffffff" text-anchor="middle">FREE</text>

  <!-- CTA BUTTON — right side -->
  <rect x="510" y="22" width="200" height="102" rx="6" fill="url(#gBtn)"
    stroke="#2a8fd4" stroke-width="1.5"/>

  <!-- CTA arrow icon area -->
  <circle cx="568" cy="56" r="18" fill="rgba(255,255,255,0.12)"/>
  <text x="568" y="62"
    font-family="Arial, sans-serif"
    font-size="20" text-anchor="middle" fill="#ffffff">▶</text>

  <text x="610" y="52"
    font-family="Arial Black, Impact, sans-serif"
    font-size="14" font-weight="900"
    fill="#ffffff" text-anchor="middle">PLAY</text>
  <text x="610" y="68"
    font-family="Arial Black, Impact, sans-serif"
    font-size="14" font-weight="900"
    fill="#ffffff" text-anchor="middle">FREE</text>
  <text x="610" y="84"
    font-family="Arial Black, Impact, sans-serif"
    font-size="14" font-weight="900"
    fill="#c8a73a" text-anchor="middle">NOW</text>

  <text x="610" y="104"
    font-family="Arial, sans-serif"
    font-size="9" fill="#aac8e0" text-anchor="middle">No download required</text>

  <!-- gold bottom bar accent -->
  <rect x="0" y="${H - 3}" width="${W}" height="3" fill="#c8a73a"/>
</svg>`;

  await sharp(base)
    .composite([{ input: Buffer.from(svg), gravity: 'northwest' }])
    .webp({ quality: 90 })
    .toFile(`${OUT}/star-trek-fleet-command-w.webp`);

  console.log(`✅ Wide done: star-trek-fleet-command-w.webp  ${W}×${H}`);
}

/* ── Box 300×250 ────────────────────────────────────────────────────────────── */
async function makeBox() {
  const W = 300, H = 250;

  // Blur forte pour effacer le texte baked dans l'image source
  const base = await sharp(SRC_B)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .blur(14)
    .modulate({ brightness: 0.6 })
    .toBuffer();

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- top header gradient -->
    <linearGradient id="gTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.30"/>
    </linearGradient>
    <!-- bottom CTA gradient -->
    <linearGradient id="gBot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#000" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.88"/>
    </linearGradient>
    <!-- CTA button gradient -->
    <linearGradient id="gCTA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#2196d0"/>
      <stop offset="100%" stop-color="#0d5a8a"/>
    </linearGradient>
  </defs>

  <!-- top dark band -->
  <rect x="0" y="0" width="${W}" height="80" fill="url(#gTop)"/>

  <!-- bottom dark band -->
  <rect x="0" y="155" width="${W}" height="95" fill="url(#gBot)"/>

  <!-- gold top accent bar -->
  <rect x="0" y="0" width="${W}" height="4" fill="#c8a73a"/>

  <!-- GAME TITLE -->
  <text x="${W/2}" y="30"
    font-family="Arial Black, Impact, sans-serif"
    font-size="16" font-weight="900"
    fill="#ffffff" text-anchor="middle"
    letter-spacing="1">STAR TREK</text>

  <text x="${W/2}" y="52"
    font-family="Arial Black, Impact, sans-serif"
    font-size="13" font-weight="900"
    fill="#c8a73a" text-anchor="middle"
    letter-spacing="2">FLEET COMMAND</text>

  <!-- divider line under title -->
  <line x1="30" y1="62" x2="${W-30}" y2="62" stroke="#2a8fd4" stroke-width="1" opacity="0.6"/>

  <!-- tagline in lower section -->
  <text x="${W/2}" y="176"
    font-family="Arial, sans-serif"
    font-size="11" font-weight="700"
    fill="#aac8e0" text-anchor="middle">Build Your Fleet</text>

  <text x="${W/2}" y="193"
    font-family="Arial, sans-serif"
    font-size="11" font-weight="700"
    fill="#aac8e0" text-anchor="middle">Conquer the Galaxy</text>

  <!-- FREE badge -->
  <rect x="${W/2 - 68}" y="202" width="52" height="18" rx="3" fill="#c8a73a"/>
  <text x="${W/2 - 42}" y="215"
    font-family="Arial, sans-serif"
    font-size="10" font-weight="900"
    fill="#000" text-anchor="middle">FREE</text>

  <!-- PC·MOBILE badge -->
  <rect x="${W/2 + 16}" y="202" width="52" height="18" rx="3"
    fill="none" stroke="#4a7fa0" stroke-width="1"/>
  <text x="${W/2 + 42}" y="215"
    font-family="Arial, sans-serif"
    font-size="9" font-weight="700"
    fill="#aac8e0" text-anchor="middle">PC · MOBILE</text>

  <!-- CTA BUTTON -->
  <rect x="20" y="224" width="${W-40}" height="22" rx="5" fill="url(#gCTA)"
    stroke="#2a8fd4" stroke-width="1.5"/>
  <text x="${W/2}" y="239"
    font-family="Arial Black, Impact, sans-serif"
    font-size="13" font-weight="900"
    fill="#ffffff" text-anchor="middle"
    letter-spacing="1">▶  DOWNLOAD FREE NOW</text>

  <!-- gold bottom accent bar -->
  <rect x="0" y="${H-4}" width="${W}" height="4" fill="#c8a73a"/>
</svg>`;

  await sharp(base)
    .composite([{ input: Buffer.from(svg), gravity: 'northwest' }])
    .webp({ quality: 90 })
    .toFile(`${OUT}/star-trek-fleet-command-b.webp`);

  console.log(`✅ Box  done: star-trek-fleet-command-b.webp  ${W}×${H}`);
}

(async () => {
  await makeWide();
  await makeBox();
  console.log('\n🎯 Both banners ready in public/media/');
})().catch(e => { console.error(e); process.exit(1); });
