'use strict';
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const SRC = 'D:/ADARBITRAGE/gaming/contents/star-trek-fleet-command/banners/';
const OUT = path.resolve(__dirname, '../public/media/');
const W = 1200, H = 630;
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
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

function injectXMP(filePath, xmpStr) {
  const d = fs.readFileSync(filePath);
  if (d.toString('ascii', 0, 4) !== 'RIFF' || d.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Not WebP RIFF');
  let chunks = [], offset = 12;
  while (offset < d.length - 8) {
    const fcc = d.toString('ascii', offset, offset + 4);
    const sz  = d.readUInt32LE(offset + 4);
    const pad = sz + (sz % 2);
    if (fcc !== 'XMP ') chunks.push(d.slice(offset, offset + 8 + pad));
    offset += 8 + pad;
  }
  const xb = Buffer.from(xmpStr, 'utf8');
  const xh = Buffer.alloc(8); xh.write('XMP ', 0, 'ascii'); xh.writeUInt32LE(xb.length, 4);
  const body = Buffer.concat([...chunks, xh, xb, ...(xb.length % 2 ? [Buffer.alloc(1)] : [])]);
  const riff = Buffer.alloc(12); riff.write('RIFF', 0, 'ascii'); riff.writeUInt32LE(body.length + 4, 4); riff.write('WEBP', 8, 'ascii');
  fs.writeFileSync(filePath, Buffer.concat([riff, body]));
}

// SVG overlays
function svgTierList(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000" stop-opacity="0.80"/>
        <stop offset="40%" stop-color="#000" stop-opacity="0.20"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.80"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#g1)"/>
    <rect x="0" y="0" width="${w}" height="4" fill="#c8a73a"/>
    <rect x="0" y="${h-4}" width="${w}" height="4" fill="#c8a73a"/>
    <text x="${w/2}" y="44" font-family="Arial Black,Impact,sans-serif" font-size="22" font-weight="900" fill="#c8a73a" text-anchor="middle" letter-spacing="3">STAR TREK FLEET COMMAND</text>
    <text x="${w/2}" y="72" font-family="Arial Black,Impact,sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">TIER LIST 2026</text>
    <text x="${w/2}" y="92" font-family="Arial,sans-serif" font-size="12" fill="#aac8e0" text-anchor="middle">Every Ship Ranked S → C · Updated November 2026</text>
    <!-- Tier badges bottom -->
    <rect x="20"           y="${h-58}" width="80" height="38" rx="5" fill="#ffd700" opacity="0.9"/>
    <text x="60"           y="${h-33}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#000" text-anchor="middle">S</text>
    <rect x="110"          y="${h-58}" width="80" height="38" rx="5" fill="#c0c0c0" opacity="0.9"/>
    <text x="150"          y="${h-33}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#000" text-anchor="middle">A</text>
    <rect x="200"          y="${h-58}" width="80" height="38" rx="5" fill="#cd7f32" opacity="0.9"/>
    <text x="240"          y="${h-33}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#000" text-anchor="middle">B</text>
    <rect x="290"          y="${h-58}" width="80" height="38" rx="5" fill="#444" opacity="0.9"/>
    <text x="330"          y="${h-33}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#aaa" text-anchor="middle">C</text>
    <text x="${w-20}" y="${h-20}" font-family="Arial,sans-serif" font-size="11" fill="#aac8e0" text-anchor="end">riggamer.com</text>
  </svg>`;
}

function svgWorthPlaying(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#000" stop-opacity="0.85"/>
        <stop offset="60%" stop-color="#000" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.05"/>
      </linearGradient>
      <linearGradient id="gVerdict" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a7fcf"/>
        <stop offset="100%" stop-color="#0d4a80"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#g2)"/>
    <rect x="0" y="0" width="${w}" height="4" fill="#c8a73a"/>
    <rect x="0" y="${h-4}" width="${w}" height="4" fill="#c8a73a"/>
    <text x="28" y="60" font-family="Arial Black,Impact,sans-serif" font-size="16" font-weight="900" fill="#aac8e0" letter-spacing="3">IS IT WORTH PLAYING?</text>
    <text x="28" y="92" font-family="Arial Black,Impact,sans-serif" font-size="26" font-weight="900" fill="#ffffff">STAR TREK</text>
    <text x="28" y="122" font-family="Arial Black,Impact,sans-serif" font-size="20" font-weight="900" fill="#c8a73a">FLEET COMMAND 2026</text>
    <rect x="28" y="${h-80}" width="260" height="58" rx="8" fill="url(#gVerdict)" stroke="#2a8fd4" stroke-width="1.5"/>
    <text x="158" y="${h-54}" font-family="Arial Black,Impact,sans-serif" font-size="14" font-weight="900" fill="#c8a73a" text-anchor="middle">VERDICT</text>
    <text x="158" y="${h-28}" font-family="Arial Black,Impact,sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">YES — 7.8/10</text>
  </svg>`;
}

function svgF2p(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000" stop-opacity="0.75"/>
        <stop offset="50%" stop-color="#000" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.80"/>
      </linearGradient>
      <linearGradient id="gBtn3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a7fcf"/>
        <stop offset="100%" stop-color="#0d4a80"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#g3)"/>
    <rect x="0" y="0" width="${w}" height="4" fill="#c8a73a"/>
    <rect x="0" y="${h-4}" width="${w}" height="4" fill="#c8a73a"/>
    <text x="${w/2}" y="44" font-family="Arial Black,Impact,sans-serif" font-size="20" font-weight="900" fill="#c8a73a" text-anchor="middle" letter-spacing="2">F2P GUIDE 2026</text>
    <text x="${w/2}" y="70" font-family="Arial Black,Impact,sans-serif" font-size="16" font-weight="900" fill="#ffffff" text-anchor="middle">STAR TREK FLEET COMMAND</text>
    <text x="${w/2}" y="92" font-family="Arial,sans-serif" font-size="12" fill="#aac8e0" text-anchor="middle">Beat Genshin Free · Tier 8 Fleet Without Spending</text>
    <text x="${w/2}" y="${h-50}" font-family="Arial Black,Impact,sans-serif" font-size="18" font-weight="900" fill="#ffffff" text-anchor="middle">$0 SPENT · FULLY COMPETITIVE</text>
    <rect x="${w/2-120}" y="${h-38}" width="240" height="28" rx="5" fill="url(#gBtn3)" stroke="#42a5f5" stroke-width="1.5"/>
    <text x="${w/2}" y="${h-18}" font-family="Arial Black,Impact,sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">▶ START FREE NOW</text>
  </svg>`;
}

function svgBeginnersGuide(w, h) {
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g4" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#000" stop-opacity="0.80"/>
        <stop offset="55%" stop-color="#000" stop-opacity="0.40"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.05"/>
      </linearGradient>
      <linearGradient id="gBtn4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c8a73a"/>
        <stop offset="100%" stop-color="#8a6f20"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#g4)"/>
    <rect x="0" y="0" width="${w}" height="4" fill="#c8a73a"/>
    <rect x="0" y="${h-4}" width="${w}" height="4" fill="#c8a73a"/>
    <text x="28" y="52" font-family="Arial Black,Impact,sans-serif" font-size="14" font-weight="900" fill="#c8a73a" letter-spacing="3">BEGINNERS GUIDE 2026</text>
    <text x="28" y="84" font-family="Arial Black,Impact,sans-serif" font-size="26" font-weight="900" fill="#ffffff">STAR TREK</text>
    <text x="28" y="114" font-family="Arial Black,Impact,sans-serif" font-size="20" font-weight="900" fill="#c8a73a">FLEET COMMAND</text>
    <text x="28" y="142" font-family="Arial,sans-serif" font-size="13" fill="#aac8e0">Day 1 Essentials · 7-Day Roadmap · Free on PC</text>
    <!-- Day badges -->
    <rect x="28"  y="${h-72}" width="58" height="52" rx="5" fill="rgba(26,127,207,0.85)" stroke="#42a5f5" stroke-width="1"/>
    <text x="57"  y="${h-48}" font-family="Arial,sans-serif" font-size="9" fill="#aac8e0" text-anchor="middle">DAY</text>
    <text x="57"  y="${h-28}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">1</text>
    <rect x="96"  y="${h-72}" width="58" height="52" rx="5" fill="rgba(26,127,207,0.70)" stroke="#42a5f5" stroke-width="1"/>
    <text x="125" y="${h-48}" font-family="Arial,sans-serif" font-size="9" fill="#aac8e0" text-anchor="middle">DAY</text>
    <text x="125" y="${h-28}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">3</text>
    <rect x="164" y="${h-72}" width="58" height="52" rx="5" fill="rgba(26,127,207,0.55)" stroke="#42a5f5" stroke-width="1"/>
    <text x="193" y="${h-48}" font-family="Arial,sans-serif" font-size="9" fill="#aac8e0" text-anchor="middle">DAY</text>
    <text x="193" y="${h-28}" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#fff" text-anchor="middle">7</text>
    <rect x="232" y="${h-72}" width="100" height="52" rx="5" fill="url(#gBtn4)"/>
    <text x="282" y="${h-48}" font-family="Arial Black,sans-serif" font-size="10" font-weight="900" fill="#000" text-anchor="middle">FLEET</text>
    <text x="282" y="${h-28}" font-family="Arial Black,sans-serif" font-size="10" font-weight="900" fill="#000" text-anchor="middle">READY ✓</text>
  </svg>`;
}

const IMAGES = [
  {
    out: 'star-trek-fleet-command-tier-list.webp',
    src: 'PRIME-60322_IDIQ_Static2 - Design_1920x1080_jb90r2bxc7.png',
    pos: 'centre',
    svg: svgTierList,
    alt: 'Star Trek Fleet Command tier list 2026 — best ships ranked S to C tier for PC',
    keywords: ['star trek fleet command tier list 2026','star trek fleet command best ships','star trek fleet command ship ranking 2026','star trek fleet command uss enterprise tier','star trek fleet command jellyfish s tier','star trek fleet command riggamer tier list'],
  },
  {
    out: 'star-trek-fleet-command-worth-playing.webp',
    src: 'PRIME-60321_IDIQ_Static1 - Design_1080x1920_i4pez5r4ti.png',
    pos: 'north',
    svg: svgWorthPlaying,
    alt: 'Is Star Trek Fleet Command worth playing in 2026 — honest verdict for PC players',
    keywords: ['is star trek fleet command worth playing 2026','star trek fleet command worth it 2026','star trek fleet command honest review','star trek fleet command verdict 2026','star trek fleet command pc worth playing','star trek fleet command riggamer verdict'],
  },
  {
    out: 'star-trek-fleet-command-f2p-guide.webp',
    src: 'PRIME-60322_IDIQ_Static2 - Design_1080x1080_5dxaoinp2k.png',
    pos: 'centre',
    svg: svgF2p,
    alt: 'Star Trek Fleet Command F2P guide 2026 — beat Genshin free on PC',
    keywords: ['star trek fleet command f2p guide 2026','star trek fleet command free to play guide','star trek fleet command without spending','star trek fleet command f2p tips 2026','star trek fleet command vs genshin f2p','star trek fleet command riggamer f2p'],
  },
  {
    out: 'star-trek-fleet-command-beginners-guide.webp',
    src: 'PRIME-60321_IDIQ_Static1 - Design_1080x1080_wzv91in6lv.png',
    pos: 'attention',
    svg: svgBeginnersGuide,
    alt: 'Star Trek Fleet Command beginners guide 2026 — Day 1 essentials for PC players',
    keywords: ['star trek fleet command beginners guide 2026','star trek fleet command tips for beginners','star trek fleet command day 1 guide','star trek fleet command starter guide 2026','star trek fleet command how to start','star trek fleet command riggamer beginners'],
  },
];

(async () => {
  for (const img of IMAGES) {
    const dest = path.join(OUT, img.out);
    console.log(`\n→ ${img.out}`);
    const base = await sharp(SRC + img.src).flatten({ background: { r:0,g:0,b:0 } }).resize(W, H, { fit:'cover', position: img.pos }).toBuffer();
    const comp = await sharp(base).composite([{ input: Buffer.from(img.svg(W, H)), gravity:'northwest' }]).toBuffer();
    await sharp(comp).flatten({ background: { r:0,g:0,b:0 } }).webp({ quality: 88 }).toFile(dest);
    injectXMP(dest, buildXMP(img.keywords, img.alt));
    const buf = fs.readFileSync(dest);
    console.log(`  ✅ ${Math.round(fs.statSync(dest).size/1024)}Ko | XMP: ${buf.toString('ascii').includes('<?xpacket') ? 'OUI' : 'NON'} | kw[0]: ${buf.toString('utf8').includes(img.keywords[0]) ? 'OUI' : 'NON'}`);
  }
  console.log('\n🎯 4 images satellites générées + XMP injectés');
})().catch(e => { console.error(e); process.exit(1); });
