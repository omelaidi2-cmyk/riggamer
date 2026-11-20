'use strict';
const sharp = require('sharp');
const { execSync } = require('child_process');
const fs   = require('fs');
const path = require('path');

const SRC  = 'D:/ADARBITRAGE/gaming/contents/star-trek-fleet-command/banners/';
const TMP  = path.resolve(__dirname, '../tmp-stfc/');
const OUT  = path.resolve(__dirname, '../public/media/');
const BOUT = 'D:/ADARBITRAGE/gaming/contents/star-trek-fleet-command/banners/';

if (!fs.existsSync(TMP)) fs.mkdirSync(TMP, { recursive: true });

// ── Frame definitions ──────────────────────────────────────────────────────
const SKY_FRAMES = [
  { src: 'PRIME-60321_IDIQ_Static1 - Design_1080x1920_i4pez5r4ti.png', pos: 'centre', cta: false },   // PLAY NOW natif
  { src: 'PRIME-60322_IDIQ_Static2 - Design_1080x1920_vm70h64005.png', pos: 'centre', cta: 'sky' },   // chat + overlay CTA
  { src: 'PRIME-60321_IDIQ_Static1 - Design_1200x1500_sgvpi79wp1.png', pos: 'centre', cta: 'sky' },   // autre créatif + overlay
];

const WIDE_FRAMES = [
  { src: 'PRIME-60321_IDIQ_Static1 - Design_1920x1080_10mjoc5t6o.png', pos: 'centre', cta: false },  // ✅ PLAY NOW natif
  { src: 'PRIME-60322_IDIQ_Static2 - Design_1920x1080_jb90r2bxc7.png', pos: 'north',  cta: 'wide' }, // logo+chat haut → overlay CTA droite
  { src: 'PRIME-60322_IDIQ_Static2 - Design_1080x1080_5dxaoinp2k.png', pos: 'north',  cta: 'wide' }, // chat face → overlay CTA droite
];
const BOX_FRAMES = [
  { src: 'PRIME-60322_IDIQ_Static2 - Design_1080x1080_5dxaoinp2k.png', pos: 'south',     cta: false },  // ✅ PLAY NOW natif
  { src: 'PRIME-60321_IDIQ_Static1 - Design_1080x1080_wzv91in6lv.png', pos: 'attention', cta: false },  // ✅ PLAY NOW natif
  { src: 'PRIME-60321_IDIQ_Static1 - Design_1080x1920_i4pez5r4ti.png', pos: 'attention', cta: 'box' },  // tête chat → overlay CTA bas
];

// ── Helpers ────────────────────────────────────────────────────────────────
function ctaOverlayWide(W, H) {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.78"/>
      </linearGradient>
      <linearGradient id="btn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a7fcf"/>
        <stop offset="100%" stop-color="#0d4a80"/>
      </linearGradient>
    </defs>
    <rect x="${W-200}" y="0" width="200" height="${H}" fill="url(#g)"/>
    <rect x="${W-185}" y="${H/2-20}" width="170" height="40" rx="5"
      fill="url(#btn)" stroke="#42a5f5" stroke-width="1.5"/>
    <text x="${W-100}" y="${H/2+6}"
      font-family="Arial Black,Impact,sans-serif" font-size="17" font-weight="900"
      fill="#ffffff" text-anchor="middle">▶  PLAY NOW</text>
  </svg>`;
}

function ctaOverlaySky(W, H) {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.88"/>
      </linearGradient>
      <linearGradient id="btnsky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a7fcf"/>
        <stop offset="100%" stop-color="#0d4a80"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${H-80}" width="${W}" height="80" fill="url(#gsky)"/>
    <rect x="8" y="${H-62}" width="${W-16}" height="42" rx="5"
      fill="url(#btnsky)" stroke="#42a5f5" stroke-width="1.5"/>
    <text x="${W/2}" y="${H-35}"
      font-family="Arial Black,Impact,sans-serif" font-size="13" font-weight="900"
      fill="#ffffff" text-anchor="middle">▶ PLAY</text>
    <text x="${W/2}" y="${H-18}"
      font-family="Arial Black,Impact,sans-serif" font-size="13" font-weight="900"
      fill="#ffffff" text-anchor="middle">NOW FREE</text>
  </svg>`;
}

function ctaOverlayBox(W, H) {
  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.85"/>
      </linearGradient>
      <linearGradient id="btn2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a7fcf"/>
        <stop offset="100%" stop-color="#0d4a80"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${H-60}" width="${W}" height="60" fill="url(#g2)"/>
    <rect x="12" y="${H-44}" width="${W-24}" height="34" rx="5"
      fill="url(#btn2)" stroke="#42a5f5" stroke-width="1.5"/>
    <text x="${W/2}" y="${H-21}"
      font-family="Arial Black,Impact,sans-serif" font-size="15" font-weight="900"
      fill="#ffffff" text-anchor="middle">▶  PLAY NOW FREE</text>
  </svg>`;
}

async function prepareFrames(frames, w, h, prefix) {
  const outPaths = [];
  for (let i = 0; i < frames.length; i++) {
    const dest = path.join(TMP, `${prefix}_frame${i + 1}.png`);
    const f = frames[i];

    let img = sharp(SRC + f.src)
      .flatten({ background: { r: 0, g: 0, b: 0 } })
      .resize(w, h, { fit: 'cover', position: f.pos });

    if (f.cta) {
      const svgStr = f.cta === 'wide' ? ctaOverlayWide(w, h)
                 : f.cta === 'sky'  ? ctaOverlaySky(w, h)
                 : ctaOverlayBox(w, h);
      const base = await img.toBuffer();
      // Passe 1 : composite SVG (RGBA) → buffer
      const composited = await sharp(base)
        .composite([{ input: Buffer.from(svgStr), gravity: 'northwest' }])
        .toBuffer();
      // Passe 2 : flatten RGBA → RGB pur, save PNG
      await sharp(composited)
        .flatten({ background: { r: 0, g: 0, b: 0 } })
        .png()
        .toFile(dest);
    } else {
      await img.png().toFile(dest);
    }
    outPaths.push(dest);
  }
  return outPaths;
}

function writeConcatFile(framePaths, delay, concatPath) {
  let txt = '';
  framePaths.forEach(fp => {
    txt += `file '${fp.replace(/\\/g, '/')}'\nduration ${delay}\n`;
  });
  // Duplicate last frame with minimal duration (FFmpeg concat quirk)
  txt += `file '${framePaths[framePaths.length - 1].replace(/\\/g, '/')}'\nduration 0.04\n`;
  fs.writeFileSync(concatPath, txt);
}

function buildGif(concatPath, palettePath, outGif, w, h) {
  const scale = `scale=${w}:${h}:flags=lanczos`;

  // Pass 1 — palette (force rgb24 pour normaliser toutes les frames)
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${concatPath}" ` +
    `-vf "format=rgb24,${scale},palettegen=max_colors=256:stats_mode=diff" "${palettePath}"`,
    { stdio: 'pipe' }
  );

  // Pass 2 — GIF encode
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${concatPath}" ` +
    `-i "${palettePath}" ` +
    `-lavfi "format=rgb24,${scale} [v]; [v][1:v] paletteuse=dither=sierra2_4a" ` +
    `-loop 0 "${outGif}"`,
    { stdio: 'pipe' }
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
(async () => {
  // --- SKY 160×608 ---
  console.log('Preparing sky frames…');
  const sFrames = await prepareFrames(SKY_FRAMES, 160, 608, 's');
  const sConcat  = path.join(TMP, 'sky_concat.txt');
  const sPalette = path.join(TMP, 'sky_palette.png');
  const sOut     = path.join(OUT, 'star-trek-fleet-command-sky.gif');
  writeConcatFile(sFrames, 1.5, sConcat);
  console.log('Building sky GIF…');
  buildGif(sConcat, sPalette, sOut, 160, 608);
  console.log(`✅ Sky  GIF: ${sOut}`);
  fs.copyFileSync(sOut, path.join(BOUT, 'star-trek-fleet-command-sky.gif'));

  // --- WIDE 728×146 ---
  console.log('Preparing wide frames…');
  const wFrames = await prepareFrames(WIDE_FRAMES, 728, 146, 'w');
  const wConcat  = path.join(TMP, 'wide_concat.txt');
  const wPalette = path.join(TMP, 'wide_palette.png');
  const wOut     = path.join(OUT, 'star-trek-fleet-command-w.gif');
  writeConcatFile(wFrames, 1.5, wConcat);
  console.log('Building wide GIF…');
  buildGif(wConcat, wPalette, wOut, 728, 146);
  console.log(`✅ Wide GIF: ${wOut}`);

  // --- BOX 300×250 ---
  console.log('Preparing box frames…');
  const bFrames = await prepareFrames(BOX_FRAMES, 300, 250, 'b');
  const bConcat  = path.join(TMP, 'box_concat.txt');
  const bPalette = path.join(TMP, 'box_palette.png');
  const bOut     = path.join(OUT, 'star-trek-fleet-command-b.gif');
  writeConcatFile(bFrames, 1.5, bConcat);
  console.log('Building box GIF…');
  buildGif(bConcat, bPalette, bOut, 300, 250);
  console.log(`✅ Box  GIF: ${bOut}`);

  // Copy to gaming contents folder
  fs.copyFileSync(wOut, path.join(BOUT, 'star-trek-fleet-command-w.gif'));
  fs.copyFileSync(bOut, path.join(BOUT, 'star-trek-fleet-command-b.gif'));
  console.log('✅ Copies vers banners/');

  // Update BANNER_IMGS reference (now .gif)
  console.log('\n🎯 Done — mettre à jour ArticlePage.astro si extension .webp → .gif');

  // Keep tmp for debug — décommenter pour nettoyer :
  // fs.rmSync(TMP, { recursive: true, force: true });
})().catch(e => { console.error(e.message); process.exit(1); });
