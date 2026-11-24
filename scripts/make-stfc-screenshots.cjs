'use strict';
const sharp = require('sharp');
const fs    = require('fs');
const path  = require('path');

const SRC_DIR = 'D:/ADARBITRAGE/gaming/contents/star-trek-fleet-command/banners';
const OUT_DIR = 'D:/ADARBITRAGE/riggamer/public/media';

const SRC1 = path.join(SRC_DIR, 'PRIME-60321_IDIQ_Static1 - Design_1920x1080_10mjoc5t6o.png');
const SRC2 = path.join(SRC_DIR, 'PRIME-60322_IDIQ_Static2 - Design_1920x1080_jb90r2bxc7.png');

// 12 gameplay screenshots: 3 per satellite
// Each: different crop from source PNG + subtle SVG label
// Final output: 1200x630 WebP

const SHOTS = [
  // S1 — Tier List
  { file:'star-trek-fleet-command-tier-list-ships-ranked.webp',
    src:SRC1, left:0, top:0,     w:1920, h:1008, label:'Ship Rankings — November 2026 Meta' },
  { file:'star-trek-fleet-command-tier-list-battleships.webp',
    src:SRC2, left:360, top:0,   w:1200, h:630,  label:'Battleship Class — PvP Performance' },
  { file:'star-trek-fleet-command-tier-list-officers.webp',
    src:SRC1, left:720, top:225, w:1200, h:630,  label:'Officer Crew — Kirk/Spock Meta' },

  // S2 — Worth Playing
  { file:'star-trek-fleet-command-worth-playing-pvp.webp',
    src:SRC2, left:0,   top:225, w:1200, h:630,  label:'Territory PvP — Alliance Warfare' },
  { file:'star-trek-fleet-command-worth-playing-alliance.webp',
    src:SRC1, left:360, top:225, w:1200, h:630,  label:'Alliance Operations — Coordinated Fleets' },
  { file:'star-trek-fleet-command-worth-playing-progression.webp',
    src:SRC2, left:720, top:225, w:1200, h:630,  label:'Progression System — Tier 4-8 Ladder' },

  // S3 — F2P Guide
  { file:'star-trek-fleet-command-f2p-daily-missions.webp',
    src:SRC1, left:0,   top:450, w:1200, h:630,  label:'Daily Missions — F2P Core Loop' },
  { file:'star-trek-fleet-command-f2p-faction-grind.webp',
    src:SRC2, left:360, top:450, w:1200, h:630,  label:'Romulan Faction — Rep Grind Strategy' },
  { file:'star-trek-fleet-command-f2p-ship-roadmap.webp',
    src:SRC1, left:720, top:450, w:1200, h:630,  label:'F2P Ship Roadmap — Jellyfish First' },

  // S4 — Beginners Guide
  { file:'star-trek-fleet-command-beginners-day1.webp',
    src:SRC2, left:0,   top:0,   w:1200, h:630,  label:'Day 1 — Station Build Priority' },
  { file:'star-trek-fleet-command-beginners-faction-choice.webp',
    src:SRC1, left:0,   top:225, w:1200, h:630,  label:'Faction Choice — Federation vs Romulan' },
  { file:'star-trek-fleet-command-beginners-alliance.webp',
    src:SRC2, left:720, top:0,   w:1200, h:630,  label:'Alliance Strategy — Join by Day 3' },
];

function makeSvgLabel(label) {
  const w = 1200, h = 630;
  const bgH = 36;
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="${h - bgH}" width="${w}" height="${bgH}" fill="rgba(0,0,0,0.65)"/>
    <text x="16" y="${h - 10}" font-family="Arial,sans-serif" font-size="16" fill="#E8C84A" font-weight="bold">${label}</text>
    <text x="${w - 120}" y="${h - 10}" font-family="Arial,sans-serif" font-size="13" fill="#aaa">riggamer.com</text>
  </svg>`);
}

(async () => {
  for (const s of SHOTS) {
    const outPath = path.join(OUT_DIR, s.file);
    if (fs.existsSync(outPath)) {
      console.log(`SKIP (exists): ${s.file}`);
      continue;
    }

    // Pass 1: crop to 1200×630
    const cropped = await sharp(s.src)
      .extract({ left: s.left, top: s.top, width: s.w, height: s.h })
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .toBuffer();

    // Pass 2: flatten alpha + composite SVG label
    const withLabel = await sharp(cropped)
      .flatten({ background: '#0a0a1a' })
      .composite([{ input: makeSvgLabel(s.label), blend: 'over' }])
      .toBuffer();

    // Pass 3: strip alpha + output WebP
    await sharp(withLabel)
      .flatten({ background: '#0a0a1a' })
      .webp({ quality: 82 })
      .toFile(outPath);

    console.log(`✅ ${s.file}`);
  }
  console.log('\n✅ Tous les screenshots générés');
})();
