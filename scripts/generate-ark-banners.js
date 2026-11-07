const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = 'D:/ADARBITRAGE/gaming/contents/arknights-endfield/角色实机截图祗111-P-1200x628-EN-v1d6-祗-OS-截图-实机画面-角色-yt.jpg';
const OUT = 'D:/ADARBITRAGE/riggamer/public/media';

// Background color: dark sci-fi matching Arknights Endfield palette
const BG = { r: 18, g: 22, b: 32, alpha: 1 };

const formats = [
  // Covers articles (1200x628)
  { name: 'ark-endfield-review-2026.webp',        w: 1200, h: 628,  label: 'cover-pilier'     },
  { name: 'ark-endfield-tier-list-2026.webp',     w: 1200, h: 628,  label: 'cover-sat1'       },
  { name: 'ark-endfield-download-pc-2026.webp',   w: 1200, h: 628,  label: 'cover-sat2'       },
  { name: 'ark-endfield-beginner-guide.webp',     w: 1200, h: 628,  label: 'cover-sat3'       },
  { name: 'ark-endfield-worth-playing-2026.webp', w: 1200, h: 628,  label: 'cover-sat4'       },

  // Bannière leaderboard 728x90
  { name: 'ark-endfield-banner-728x90.webp',      w: 728,  h: 90,   label: 'leaderboard'      },

  // Bannière rectangle / box 300x250
  { name: 'ark-endfield-banner-300x250.webp',     w: 300,  h: 250,  label: 'box'              },

  // Bannière skyscraper 160x600
  { name: 'ark-endfield-banner-160x600.webp',     w: 160,  h: 600,  label: 'skyscraper'       },

  // Bannière mobile 320x50
  { name: 'ark-endfield-banner-320x50.webp',      w: 320,  h: 50,   label: 'mobile'           },

  // Thumbnail 640x336
  { name: 'ark-endfield-thumb-640.webp',          w: 640,  h: 336,  label: 'thumbnail'        },
];

async function generate() {
  const srcMeta = await sharp(SRC).metadata();
  console.log(`Source: ${srcMeta.width}x${srcMeta.height} ${srcMeta.format}`);

  for (const f of formats) {
    const out = path.join(OUT, f.name);

    await sharp({
      create: {
        width: f.w,
        height: f.h,
        channels: 3,
        background: BG,
      }
    })
    .composite([{
      input: await sharp(SRC)
        .resize(f.w, f.h, {
          fit: 'cover',
          position: 'centre',
        })
        .png()
        .toBuffer(),
      gravity: 'centre',
    }])
    .webp({ quality: 88 })
    .toFile(out);

    const stat = fs.statSync(out);
    console.log(`✅ ${f.label.padEnd(14)} ${String(f.w).padStart(4)}x${f.h} → ${f.name} (${Math.round(stat.size/1024)}KB)`);
  }

  console.log('\nTous les assets générés dans /public/media/');
}

generate().catch(err => {
  console.error('ERREUR:', err.message);
  process.exit(1);
});
