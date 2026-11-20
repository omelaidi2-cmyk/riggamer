'use strict';
/**
 * make-stfc-article-images.cjs
 * Génère 4 WebP 1200×630 pour le pilier STFC + injecte XMP keywords
 * Sources : créatifs officiels Scopely dans banners/
 */
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const SRC  = 'D:/ADARBITRAGE/gaming/contents/star-trek-fleet-command/banners/';
const OUT  = path.resolve(__dirname, '../public/media/');
const W = 1200, H = 630;

// ── XMP helpers (copié depuis inject-xmp-webp.cjs) ────────────────────────
const COPYRIGHT = '© 2026 RigGamer — All rights reserved';

function buildXMP(keywords, description) {
  const kw = keywords.map(k => `          <rdf:li>${k}</rdf:li>`).join('\n');
  return `<?xpacket begin="\xef\xbb\xbf" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${description}</rdf:li></rdf:Alt></dc:description>
      <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${COPYRIGHT}</rdf:li></rdf:Alt></dc:rights>
      <dc:creator><rdf:Seq><rdf:li>RigGamer</rdf:li></rdf:Seq></dc:creator>
      <dc:subject>
        <rdf:Bag>
${kw}
        </rdf:Bag>
      </dc:subject>
      <xmpRights:Marked>True</xmpRights:Marked>
      <xmpRights:WebStatement>https://riggamer.com</xmpRights:WebStatement>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

function injectXMP(filePath, xmpString) {
  const fileData = fs.readFileSync(filePath);
  if (fileData.toString('ascii', 0, 4) !== 'RIFF') throw new Error('Not RIFF');
  if (fileData.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Not WEBP');

  let chunks = [];
  let offset = 12;
  while (offset < fileData.length - 8) {
    const fourCC     = fileData.toString('ascii', offset, offset + 4);
    const size       = fileData.readUInt32LE(offset + 4);
    const paddedSize = size + (size % 2);
    if (fourCC !== 'XMP ') {
      chunks.push(fileData.slice(offset, offset + 8 + paddedSize));
    }
    offset += 8 + paddedSize;
  }

  const xmpBuf  = Buffer.from(xmpString, 'utf8');
  const xmpSize = xmpBuf.length;
  const xmpPad  = xmpSize % 2 === 1 ? 1 : 0;
  const header  = Buffer.alloc(8);
  header.write('XMP ', 0, 'ascii');
  header.writeUInt32LE(xmpSize, 4);
  const xmpChunk = Buffer.concat([header, xmpBuf, Buffer.alloc(xmpPad)]);

  const body     = Buffer.concat([...chunks, xmpChunk]);
  const riff     = Buffer.alloc(12);
  riff.write('RIFF', 0, 'ascii');
  riff.writeUInt32LE(body.length + 4, 4);
  riff.write('WEBP', 8, 'ascii');
  fs.writeFileSync(filePath, Buffer.concat([riff, body]));
}

// ── SVG overlays ───────────────────────────────────────────────────────────

function svgReviewCover(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#000" stop-opacity="0.80"/>
        <stop offset="55%"  stop-color="#000" stop-opacity="0.40"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.05"/>
      </linearGradient>
      <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#1a7fcf"/>
        <stop offset="100%" stop-color="#0d4a80"/>
      </linearGradient>
    </defs>
    <!-- gradient overlay gauche -->
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#gL)"/>
    <!-- gold top bar -->
    <rect x="0" y="0" width="${w}" height="4" fill="#c8a73a"/>
    <!-- GAME TITLE -->
    <text x="28" y="80"
      font-family="Arial Black,Impact,sans-serif" font-size="30" font-weight="900"
      fill="#ffffff" letter-spacing="2">STAR TREK</text>
    <text x="28" y="116"
      font-family="Arial Black,Impact,sans-serif" font-size="24" font-weight="900"
      fill="#c8a73a" letter-spacing="3">FLEET COMMAND</text>
    <!-- divider -->
    <line x1="28" y1="130" x2="420" y2="130" stroke="#2a8fd4" stroke-width="1.5" opacity="0.7"/>
    <!-- REVIEW label -->
    <text x="28" y="162"
      font-family="Arial,sans-serif" font-size="13" font-weight="700"
      fill="#aac8e0" letter-spacing="4">REVIEW 2026</text>
    <!-- tagline -->
    <text x="28" y="192"
      font-family="Arial,sans-serif" font-size="13" fill="#ccddee">
      Why This Beats Genshin — Free on PC &amp; Mobile
    </text>
    <!-- score badge top-right -->
    <rect x="${w-130}" y="20" width="110" height="68" rx="8" fill="url(#gScore)" stroke="#2a8fd4" stroke-width="1.5"/>
    <text x="${w-75}" y="56"
      font-family="Arial Black,Impact,sans-serif" font-size="28" font-weight="900"
      fill="#ffffff" text-anchor="middle">7.8</text>
    <text x="${w-75}" y="74"
      font-family="Arial,sans-serif" font-size="11" font-weight="700"
      fill="#aac8e0" text-anchor="middle">/ 10</text>
    <!-- gold bottom bar -->
    <rect x="0" y="${h-4}" width="${w}" height="4" fill="#c8a73a"/>
  </svg>`;
}

function svgGameplay(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gBot" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.82"/>
      </linearGradient>
    </defs>
    <rect x="0" y="${h-90}" width="${w}" height="90" fill="url(#gBot)"/>
    <rect x="0" y="${h-4}"  width="${w}" height="4"  fill="#c8a73a"/>
    <text x="${w/2}" y="${h-50}"
      font-family="Arial Black,Impact,sans-serif" font-size="20" font-weight="900"
      fill="#ffffff" text-anchor="middle" letter-spacing="3">GAMEPLAY · SHIPS &amp; FLEET COMBAT</text>
    <text x="${w/2}" y="${h-24}"
      font-family="Arial,sans-serif" font-size="12" fill="#aac8e0" text-anchor="middle">
      USS Enterprise · Jellyfish · Vahklas — Star Trek Fleet Command 2026
    </text>
  </svg>`;
}

function svgFactionShips(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gTop2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#000" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="gBot2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <!-- top band -->
    <rect x="0" y="0"       width="${w}" height="80" fill="url(#gTop2)"/>
    <!-- bottom band -->
    <rect x="0" y="${h-80}" width="${w}" height="80" fill="url(#gBot2)"/>
    <!-- gold accents -->
    <rect x="0" y="0"       width="${w}" height="4" fill="#c8a73a"/>
    <rect x="0" y="${h-4}"  width="${w}" height="4" fill="#c8a73a"/>
    <!-- title top -->
    <text x="${w/2}" y="34"
      font-family="Arial Black,Impact,sans-serif" font-size="18" font-weight="900"
      fill="#ffffff" text-anchor="middle" letter-spacing="2">STAR TREK FLEET COMMAND</text>
    <text x="${w/2}" y="58"
      font-family="Arial,sans-serif" font-size="12" font-weight="700"
      fill="#c8a73a" text-anchor="middle" letter-spacing="4">FACTIONS 2026</text>
    <!-- faction labels bottom -->
    <!-- Federation -->
    <rect x="20"       y="${h-62}" width="180" height="30" rx="4" fill="rgba(0,60,160,0.75)" stroke="#4477dd" stroke-width="1"/>
    <text x="110"      y="${h-42}"
      font-family="Arial Black,sans-serif" font-size="12" font-weight="900"
      fill="#ffffff" text-anchor="middle">⚡ FEDERATION</text>
    <!-- Klingon -->
    <rect x="${w/2-90}" y="${h-62}" width="180" height="30" rx="4" fill="rgba(140,10,10,0.75)" stroke="#cc3333" stroke-width="1"/>
    <text x="${w/2}"    y="${h-42}"
      font-family="Arial Black,sans-serif" font-size="12" font-weight="900"
      fill="#ffffff" text-anchor="middle">⚔ KLINGON</text>
    <!-- Romulan -->
    <rect x="${w-200}"  y="${h-62}" width="180" height="30" rx="4" fill="rgba(0,100,60,0.75)" stroke="#22aa66" stroke-width="1"/>
    <text x="${w-110}"  y="${h-42}"
      font-family="Arial Black,sans-serif" font-size="12" font-weight="900"
      fill="#ffffff" text-anchor="middle">▲ ROMULAN</text>
  </svg>`;
}

function svgVsGenshin(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gDark" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#000" stop-opacity="0.72"/>
        <stop offset="50%"  stop-color="#000" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.72"/>
      </linearGradient>
      <linearGradient id="gStfc" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0d3f63"/>
        <stop offset="100%" stop-color="#1a7fcf"/>
      </linearGradient>
      <linearGradient id="gGenshin" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#5a2d82"/>
        <stop offset="100%" stop-color="#8e44ad"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#gDark)"/>
    <!-- gold accents -->
    <rect x="0" y="0"      width="${w}" height="4" fill="#c8a73a"/>
    <rect x="0" y="${h-4}" width="${w}" height="4" fill="#c8a73a"/>
    <!-- VS divider central -->
    <line x1="${w/2}" y1="20" x2="${w/2}" y2="${h-20}" stroke="#c8a73a" stroke-width="2" opacity="0.6"/>
    <circle cx="${w/2}" cy="${h/2}" r="30" fill="#c8a73a"/>
    <text x="${w/2}" y="${h/2+9}"
      font-family="Arial Black,Impact,sans-serif" font-size="20" font-weight="900"
      fill="#000" text-anchor="middle">VS</text>
    <!-- STFC side left -->
    <rect x="20" y="20" width="${w/2-60}" height="50" rx="6" fill="url(#gStfc)" opacity="0.9"/>
    <text x="${w/4}" y="38"
      font-family="Arial Black,Impact,sans-serif" font-size="11" font-weight="900"
      fill="#c8a73a" text-anchor="middle" letter-spacing="1">STAR TREK</text>
    <text x="${w/4}" y="56"
      font-family="Arial Black,Impact,sans-serif" font-size="11" font-weight="900"
      fill="#ffffff" text-anchor="middle" letter-spacing="1">FLEET COMMAND</text>
    <!-- STFC bullets -->
    <text x="30" y="${h/2-40}" font-family="Arial,sans-serif" font-size="12" fill="#aac8e0">✅ Full PvP territorial wars</text>
    <text x="30" y="${h/2-20}" font-family="Arial,sans-serif" font-size="12" fill="#aac8e0">✅ Alliance coordination</text>
    <text x="30" y="${h/2}"    font-family="Arial,sans-serif" font-size="12" fill="#aac8e0">✅ Persistent galaxy</text>
    <text x="30" y="${h/2+20}" font-family="Arial,sans-serif" font-size="12" fill="#aac8e0">✅ Official Star Trek IP</text>
    <text x="30" y="${h/2+40}" font-family="Arial,sans-serif" font-size="12" fill="#c8a73a">★★★★★ Strategy depth</text>
    <!-- STFC score -->
    <text x="${w/4}" y="${h-30}"
      font-family="Arial Black,Impact,sans-serif" font-size="22" font-weight="900"
      fill="#ffffff" text-anchor="middle">7.8 / 10</text>
    <!-- Genshin side right -->
    <rect x="${w/2+40}" y="20" width="${w/2-60}" height="50" rx="6" fill="url(#gGenshin)" opacity="0.9"/>
    <text x="${w*3/4}" y="38"
      font-family="Arial Black,Impact,sans-serif" font-size="11" font-weight="900"
      fill="#f0d060" text-anchor="middle" letter-spacing="1">GENSHIN</text>
    <text x="${w*3/4}" y="56"
      font-family="Arial Black,Impact,sans-serif" font-size="11" font-weight="900"
      fill="#ffffff" text-anchor="middle" letter-spacing="1">IMPACT</text>
    <!-- Genshin bullets -->
    <text x="${w/2+50}" y="${h/2-40}" font-family="Arial,sans-serif" font-size="12" fill="#ccbbee">❌ No real PvP</text>
    <text x="${w/2+50}" y="${h/2-20}" font-family="Arial,sans-serif" font-size="12" fill="#ccbbee">❌ Instanced per player</text>
    <text x="${w/2+50}" y="${h/2}"    font-family="Arial,sans-serif" font-size="12" fill="#ccbbee">⚠️ C6 = $160+</text>
    <text x="${w/2+50}" y="${h/2+20}" font-family="Arial,sans-serif" font-size="12" fill="#ccbbee">⚠️ Solo story RPG only</text>
    <text x="${w/2+50}" y="${h/2+40}" font-family="Arial,sans-serif" font-size="12" fill="#f0d060">★★★☆☆ Strategy depth</text>
    <!-- winner badge -->
    <rect x="20" y="${h-70}" width="${w/2-60}" height="30" rx="5" fill="#c8a73a"/>
    <text x="${w/4}" y="${h-49}"
      font-family="Arial Black,Impact,sans-serif" font-size="13" font-weight="900"
      fill="#000" text-anchor="middle">🏆 WINNER FOR STRATEGY</text>
  </svg>`;
}

// ── Image definitions ──────────────────────────────────────────────────────
const IMAGES = [
  {
    out:  'star-trek-fleet-command-review-cover.webp',
    src:  'PRIME-60321_IDIQ_Static1 - Design_1920x1080_10mjoc5t6o.png',
    pos:  'centre',
    svg:  svgReviewCover,
    alt:  'Star Trek Fleet Command review 2026 — 7.8/10, why this beats Genshin, free on PC',
    keywords: [
      'star trek fleet command review 2026',
      'star trek fleet command pc review',
      'star trek fleet command 7.8 out of 10',
      'star trek fleet command worth playing 2026',
      'star trek fleet command vs genshin',
      'star trek fleet command riggamer review',
    ],
  },
  {
    out:  'star-trek-fleet-command-gameplay-ships.webp',
    src:  'PRIME-60321_IDIQ_Static1 - Design_1080x1920_i4pez5r4ti.png',
    pos:  'north',
    svg:  svgGameplay,
    alt:  'Star Trek Fleet Command gameplay 2026 — USS Enterprise and Klingon fleet combat',
    keywords: [
      'star trek fleet command gameplay 2026',
      'star trek fleet command ships',
      'star trek fleet command uss enterprise',
      'star trek fleet command fleet combat 2026',
      'star trek fleet command pc gameplay',
      'star trek fleet command fleet building guide',
    ],
  },
  {
    out:  'star-trek-fleet-command-faction-ships.webp',
    src:  'PRIME-60322_IDIQ_Static2 - Design_1920x1080_jb90r2bxc7.png',
    pos:  'centre',
    svg:  svgFactionShips,
    alt:  'Star Trek Fleet Command factions 2026 — Federation, Klingon and Romulan fleet lineup',
    keywords: [
      'star trek fleet command factions 2026',
      'star trek fleet command federation klingon romulan',
      'star trek fleet command tier list ships',
      'star trek fleet command best ships 2026',
      'star trek fleet command faction guide',
      'star trek fleet command riggamer factions',
    ],
  },
  {
    out:  'star-trek-fleet-command-vs-genshin.webp',
    src:  'PRIME-60322_IDIQ_Static2 - Design_1080x1080_5dxaoinp2k.png',
    pos:  'attention',
    svg:  svgVsGenshin,
    alt:  'Star Trek Fleet Command vs Genshin Impact 2026 — STFC wins for strategy and PvP',
    keywords: [
      'star trek fleet command vs genshin impact 2026',
      'star trek fleet command better than genshin',
      'star trek fleet command comparison 2026',
      'star trek fleet command strategy vs rpg',
      'star trek fleet command pvp vs genshin',
      'star trek fleet command install free 2026',
    ],
  },
];

// ── Main ───────────────────────────────────────────────────────────────────
(async () => {
  for (const img of IMAGES) {
    const dest = path.join(OUT, img.out);
    console.log(`\nProcessing → ${img.out}`);

    // Passe 1 : crop base
    const base = await sharp(SRC + img.src)
      .flatten({ background: { r: 0, g: 0, b: 0 } })
      .resize(W, H, { fit: 'cover', position: img.pos })
      .toBuffer();

    // Passe 2 : composite SVG overlay
    const composited = await sharp(base)
      .composite([{ input: Buffer.from(img.svg(W, H)), gravity: 'northwest' }])
      .toBuffer();

    // Passe 3 : flatten RGBA → RGB, encode WebP qualité 88
    await sharp(composited)
      .flatten({ background: { r: 0, g: 0, b: 0 } })
      .webp({ quality: 88 })
      .toFile(dest);

    console.log(`  ✅ Image écrite : ${dest}`);

    // Passe 4 : injection XMP
    const xmpStr = buildXMP(img.keywords, img.alt);
    injectXMP(dest, xmpStr);
    console.log(`  ✅ XMP injecté  : ${img.keywords.length} keywords`);

    // Vérification
    const buf = fs.readFileSync(dest);
    const hasXMP = buf.toString('ascii').includes('<?xpacket');
    const hasKw  = buf.toString('utf8').includes(img.keywords[0]);
    console.log(`  Vérif XMP: ${hasXMP ? 'OUI' : 'NON'} | keyword[0]: ${hasKw ? 'OUI' : 'NON'}`);
  }

  console.log('\n🎯 4 images article STFC générées + XMP injectés dans public/media/');
})().catch(e => { console.error(e); process.exit(1); });
