/**
 * inject-xmp-webp.cjs
 * Injecte un bloc XMP (keywords, copyright, creator) directement dans les fichiers WebP
 * Format WebP : RIFF header + chunks (FourCC 4b + size 4b + data)
 * Chunk XMP  : FourCC = "XMP " (avec espace)
 */
const fs = require('fs');
const path = require('path');

const mediaDir = path.join(__dirname, '../public/media');

function buildXMP(keywords, description, copyright) {
  const kw = keywords.map(k => `      <rdf:li>${k}</rdf:li>`).join('\n');
  return `<?xpacket begin="\xef\xbb\xbf" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${description}</rdf:li></rdf:Alt></dc:description>
      <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${copyright}</rdf:li></rdf:Alt></dc:rights>
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

function injectXMPintoWebP(filePath, xmpString) {
  const fileData = fs.readFileSync(filePath);

  // Vérifier que c'est bien un fichier RIFF/WEBP
  if (fileData.toString('ascii', 0, 4) !== 'RIFF') throw new Error('Pas un fichier RIFF');
  if (fileData.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Pas un fichier WEBP');

  // Supprimer l'ancien chunk XMP s'il existe
  let chunks = [];
  let offset = 12;
  while (offset < fileData.length) {
    const fourCC = fileData.toString('ascii', offset, offset + 4);
    const size   = fileData.readUInt32LE(offset + 4);
    const paddedSize = size + (size % 2); // padding pair
    if (fourCC !== 'XMP ') {
      chunks.push(fileData.slice(offset, offset + 8 + paddedSize));
    }
    offset += 8 + paddedSize;
  }

  // Construire le nouveau chunk XMP
  const xmpBuf  = Buffer.from(xmpString, 'utf8');
  const xmpSize = xmpBuf.length;
  const xmpPad  = xmpSize % 2 === 1 ? 1 : 0;
  const xmpChunkHeader = Buffer.alloc(8);
  xmpChunkHeader.write('XMP ', 0, 'ascii');
  xmpChunkHeader.writeUInt32LE(xmpSize, 4);
  const xmpChunk = Buffer.concat([xmpChunkHeader, xmpBuf, Buffer.alloc(xmpPad)]);

  // Reconstruire le fichier : RIFF header + tous les chunks + XMP à la fin
  const allChunks = Buffer.concat([...chunks, xmpChunk]);
  const riffHeader = Buffer.alloc(12);
  riffHeader.write('RIFF', 0, 'ascii');
  riffHeader.writeUInt32LE(4 + allChunks.length, 4); // 4 = "WEBP"
  riffHeader.write('WEBP', 8, 'ascii');

  const output = Buffer.concat([riffHeader, allChunks]);
  fs.writeFileSync(filePath, output);
}

const COPYRIGHT = 'RigGamer.com 2026 — All Rights Reserved';

const images = [
  { file: 'arknights-endfield-review-2026.webp',
    alt: 'Arknights Endfield review 2026 — Endministrator on Talos-II with Originium crystals',
    keywords: ['arknights endfield review 2026','arknights endfield pc review','arknights endfield gameplay','strategy rpg 2026 pc','arknights endfield score 7.7','arknights endfield hypergryph','riggamer review'] },

  { file: 'arknights-endfield-tier-list-2026.webp',
    alt: 'Arknights Endfield tier list 2026 — best operators ranked SS to B',
    keywords: ['arknights endfield tier list 2026','best arknights endfield operators','arknights endfield ss tier','arcane operator arknights endfield','argent flow arknights endfield','arknights endfield ranking 2026'] },

  { file: 'arknights-endfield-worth-playing-2026.webp',
    alt: 'Is Arknights Endfield worth playing in 2026 — PC gameplay comparison',
    keywords: ['arknights endfield worth playing 2026','arknights endfield is it good','arknights endfield honest review','arknights endfield f2p worth it','arknights endfield 2026 verdict'] },

  { file: 'arknights-endfield-f2p-guide-2026.webp',
    alt: 'Arknights Endfield F2P guide 2026 — Ardelia free 6-star operator',
    keywords: ['arknights endfield f2p guide 2026','arknights endfield free pulls','arknights endfield ardelia free','arknights endfield gacha f2p','free to play arknights endfield','arknights endfield orundum farming'] },

  { file: 'arknights-endfield-beginners-guide-2026.webp',
    alt: 'Arknights Endfield beginner guide 2026 — first day on Talos-II',
    keywords: ['arknights endfield beginner guide 2026','arknights endfield how to start','arknights endfield new player guide','arknights endfield talos-ii tutorial','arknights endfield tips 2026'] },

  { file: 'arknights-endfield-base-building-gameplay.webp',
    alt: 'Arknights Endfield base building gameplay — Talos-II production facilities',
    keywords: ['arknights endfield base building','arknights endfield talos-ii base','arknights endfield production facilities','arknights endfield base management','arknights endfield isometric base'] },

  { file: 'arknights-endfield-graphics-pc-performance-2026.webp',
    alt: 'Arknights Endfield PC graphics settings performance 2026 — RTX 3060 1440p benchmark',
    keywords: ['arknights endfield pc performance 2026','arknights endfield graphics settings','arknights endfield fps benchmark','arknights endfield rtx 3060','arknights endfield 1440p pc','arknights endfield optimization'] },

  { file: 'arknights-endfield-combat-realtime.webp',
    alt: 'Arknights Endfield real-time combat — pause-combat HUD with operators',
    keywords: ['arknights endfield combat system','arknights endfield real-time combat','arknights endfield pause combat','arknights endfield combat gameplay pc','arknights endfield operators fighting'] },

  { file: 'arknights-endfield-combat-gameplay.webp',
    alt: 'Arknights Endfield combat gameplay — ultimate skill AOE explosion',
    keywords: ['arknights endfield ultimate skill','arknights endfield aoe combat','arknights endfield combat abilities','arknights endfield skill system','arknights endfield boss fight'] },

  { file: 'arknights-endfield-arcane-operator.webp',
    alt: 'Arknights Endfield Arcane — SS tier best DPS operator 2026',
    keywords: ['arknights endfield arcane operator','arknights endfield best dps 2026','arknights endfield ss tier operator','arcane arknights endfield build','arknights endfield arcane skills'] },

  { file: 'arknights-endfield-argent-flow-operator.webp',
    alt: 'Arknights Endfield Argent Flow — SS tier support operator 2026',
    keywords: ['arknights endfield argent flow','arknights endfield support operator','argent flow build arknights endfield','arknights endfield ss support 2026','arknights endfield best support'] },

  { file: 'arknights-endfield-team-comp.webp',
    alt: 'Arknights Endfield best team composition — 3-operator synergy formation',
    keywords: ['arknights endfield team comp','arknights endfield best team 2026','arknights endfield synergy operators','arknights endfield team building guide','arknights endfield meta team'] },

  { file: 'arknights-endfield-open-world-talos2.webp',
    alt: 'Arknights Endfield open world Talos-II — alien moon landscape exploration',
    keywords: ['arknights endfield open world','arknights endfield talos-ii exploration','arknights endfield world map','arknights endfield originium moon','arknights endfield environment 2026'] },

  { file: 'arknights-endfield-starter-operators.webp',
    alt: 'Arknights Endfield starter operators — 4 best beginner picks 2026',
    keywords: ['arknights endfield starter operators','arknights endfield best starter','arknights endfield beginner operators','arknights endfield who to pick first','arknights endfield starting characters'] },

  { file: 'arknights-endfield-ardelia-free-operator.webp',
    alt: 'Arknights Endfield Ardelia — free 6-star F2P operator',
    keywords: ['arknights endfield ardelia','arknights endfield free 6 star','ardelia arknights endfield skills','arknights endfield free operator 2026','arknights endfield f2p 6 star'] },

  { file: 'arknights-endfield-b.webp',
    alt: 'Arknights Endfield — Play Free on PC, Strategy RPG 7.7/10',
    keywords: ['arknights endfield play free pc','arknights endfield download free','arknights endfield strategy rpg','arknights endfield 2026','arknights endfield riggamer'] },

  // --- Guides category hero ---
  { file: 'arknights-endfield-guides.webp',
    alt: 'Arknights Endfield guides & tier lists 2026 — PC Gaming Guides RigGamer',
    keywords: ['arknights endfield guides 2026','arknights endfield tier list guide','pc gaming guides 2026','arknights endfield strategy guide','arknights endfield walkthrough','riggamer guides'] },

  // --- NTE ---
  { file: 'nte-review-keyart.webp',
    alt: 'Neverness to Everness review 2026 — open world urban fantasy PC game',
    keywords: ['neverness to everness review 2026','neverness to everness pc review','nte review 2026','neverness to everness gameplay','neverness to everness riggamer','urban open world pc 2026'] },

  { file: 'nte-review-keyart-v2.webp',
    alt: 'Neverness to Everness benchmarks & reviews — RigGamer scored verdict',
    keywords: ['neverness to everness review','nte pc review 2026','neverness to everness score','nte open world review','neverness to everness riggamer','nte worth playing 2026'] },

  // --- War Thunder ---
  { file: 'war-thunder-reviews.webp',
    alt: 'War Thunder review 2026 — military sim tanks and aircraft combat PC',
    keywords: ['war thunder review 2026','war thunder pc review','war thunder military sim','war thunder gameplay 2026','war thunder riggamer','war thunder worth playing 2026'] },

  // --- Enlisted ---
  { file: 'enlisted-guides.webp',
    alt: 'Enlisted beginner guide 2026 — WWII tactical FPS squad gameplay PC',
    keywords: ['enlisted beginner guide 2026','enlisted squad guide','enlisted wwii fps guide','enlisted best squad 2026','enlisted pc gameplay','enlisted riggamer guide'] },

  // --- Raid Shadow Legends ---
  { file: 'raid-shadow-legends-guides.webp',
    alt: 'Raid Shadow Legends champion guide 2026 — best tier list and builds PC',
    keywords: ['raid shadow legends guide 2026','raid shadow legends champion guide','raid shadow legends tier list 2026','raid shadow legends best champions','raid shadow legends pc 2026','raid shadow legends riggamer'] },

  // --- Rise of Kingdoms ---
  { file: 'rise-of-kingdoms-guides.webp',
    alt: 'Rise of Kingdoms beginner guide 2026 — best civilization and commanders',
    keywords: ['rise of kingdoms beginner guide 2026','rise of kingdoms best civilization','rise of kingdoms commanders guide','rise of kingdoms strategy 2026','rise of kingdoms pc guide','rise of kingdoms riggamer'] },

  // --- Project Entropy ---
  { file: 'project-entropy-guides.webp',
    alt: 'Project Entropy beginner guide 2026 — post-apocalyptic strategy RPG PC',
    keywords: ['project entropy guide 2026','project entropy beginner guide','project entropy pc gameplay','project entropy strategy rpg','project entropy global launch 2026','project entropy riggamer'] },

  // --- Star Trek Fleet Command ---
  { file: 'star-trek-fleet-command-reviews.webp',
    alt: 'Star Trek Fleet Command review 2026 — sci-fi 4X strategy PC',
    keywords: ['star trek fleet command review 2026','star trek fleet command pc review','star trek fleet command sci-fi 4x','star trek fleet command gameplay 2026','star trek fleet command riggamer','star trek fleet command worth playing'] },

  { file: 'star-trek-fleet-command-news.webp',
    alt: 'Star Trek Fleet Command news & patch notes 2026 — PC gaming news RigGamer',
    keywords: ['star trek fleet command news 2026','star trek fleet command patch notes','star trek fleet command update 2026','pc gaming news 2026','star trek fleet command riggamer','star trek fleet command event'] },

  // STFC — Cluster screenshots
  { file: 'star-trek-fleet-command-tier-list-ships-ranked.webp',
    alt: 'Star Trek Fleet Command tier list 2026 — best ships ranked S to C tier PC',
    keywords: ['star trek fleet command tier list 2026','star trek fleet command best ships ranked','star trek fleet command s tier ships','star trek fleet command ship ranking','star trek fleet command meta ships 2026'] },
  { file: 'star-trek-fleet-command-tier-list-battleships.webp',
    alt: 'Star Trek Fleet Command best battleship 2026 — D3 Mayflower PvP performance PC',
    keywords: ['star trek fleet command best battleship 2026','star trek fleet command battleship pvp','star trek fleet command d3 mayflower','star trek fleet command battleship class','star trek fleet command pvp ships'] },
  { file: 'star-trek-fleet-command-tier-list-officers.webp',
    alt: 'Star Trek Fleet Command best officers 2026 — Kirk Spock meta crew PC',
    keywords: ['star trek fleet command best officers 2026','star trek fleet command kirk spock crew','star trek fleet command officer meta','star trek fleet command morale crew','star trek fleet command officer tier list'] },

  { file: 'star-trek-fleet-command-worth-playing-pvp.webp',
    alt: 'Star Trek Fleet Command PvP territory warfare 2026 — alliance combat PC',
    keywords: ['star trek fleet command pvp 2026','star trek fleet command territory pvp','star trek fleet command alliance warfare','star trek fleet command is it worth playing','star trek fleet command pvp gameplay pc'] },
  { file: 'star-trek-fleet-command-worth-playing-alliance.webp',
    alt: 'Star Trek Fleet Command alliance operations 2026 — coordinated fleet warfare PC',
    keywords: ['star trek fleet command alliance 2026','star trek fleet command coordinated fleets','star trek fleet command alliance strategy','star trek fleet command worth playing 2026','star trek fleet command multiplayer pc'] },
  { file: 'star-trek-fleet-command-worth-playing-progression.webp',
    alt: 'Star Trek Fleet Command progression system 2026 — tier 4-8 ladder PC',
    keywords: ['star trek fleet command progression 2026','star trek fleet command tier system','star trek fleet command tier 8 progression','star trek fleet command tier ladder','star trek fleet command rank up guide'] },

  { file: 'star-trek-fleet-command-f2p-daily-missions.webp',
    alt: 'Star Trek Fleet Command F2P daily missions 2026 — free core loop PC',
    keywords: ['star trek fleet command f2p 2026','star trek fleet command daily missions','star trek fleet command free to play guide','star trek fleet command f2p daily','star trek fleet command free core loop'] },
  { file: 'star-trek-fleet-command-f2p-faction-grind.webp',
    alt: 'Star Trek Fleet Command Romulan faction rep grind 2026 — F2P strategy PC',
    keywords: ['star trek fleet command romulan reputation','star trek fleet command faction grind 2026','star trek fleet command romulan rep f2p','star trek fleet command faction store free','star trek fleet command romulan daily'] },
  { file: 'star-trek-fleet-command-f2p-ship-roadmap.webp',
    alt: 'Star Trek Fleet Command F2P ship roadmap 2026 — Jellyfish free build PC',
    keywords: ['star trek fleet command f2p ship roadmap','star trek fleet command jellyfish f2p','star trek fleet command free ships 2026','star trek fleet command build order free','star trek fleet command jellyfish guide'] },

  { file: 'star-trek-fleet-command-beginners-day1.webp',
    alt: 'Star Trek Fleet Command beginners guide 2026 — Day 1 station priority PC',
    keywords: ['star trek fleet command beginners guide 2026','star trek fleet command day 1 guide','star trek fleet command new player tips','star trek fleet command starting guide','star trek fleet command how to start 2026'] },
  { file: 'star-trek-fleet-command-beginners-faction-choice.webp',
    alt: 'Star Trek Fleet Command faction choice 2026 — Federation vs Romulan beginners PC',
    keywords: ['star trek fleet command faction choice','star trek fleet command federation vs romulan','star trek fleet command which faction to choose','star trek fleet command beginner faction 2026','star trek fleet command romulan or federation'] },
  { file: 'star-trek-fleet-command-beginners-alliance.webp',
    alt: 'Star Trek Fleet Command alliance strategy 2026 — join by Day 3 beginners PC',
    keywords: ['star trek fleet command alliance beginners','star trek fleet command join alliance day 3','star trek fleet command alliance guide 2026','star trek fleet command new player alliance','star trek fleet command alliance strategy beginners'] },

  // --- Where Winds Meet ---
  { file: 'where-winds-meet-reviews.webp',
    alt: 'Where Winds Meet review 2026 — open world RPG PC wuxia action combat',
    keywords: ['where winds meet review 2026','where winds meet pc review','where winds meet open world rpg','where winds meet wuxia combat','where winds meet 2026 riggamer','where winds meet worth playing'] },
];

console.log('\n=== Injection XMP Keywords dans WebP ===');
let ok = 0, err = 0;
for (const img of images) {
  const filePath = path.join(mediaDir, img.file);
  if (!fs.existsSync(filePath)) { console.log('ABSENT —', img.file); continue; }
  try {
    const xmpStr = buildXMP(img.keywords, img.alt, COPYRIGHT);
    injectXMPintoWebP(filePath, xmpStr);
    console.log('OK', img.file, '—', img.keywords.length, 'keywords');
    ok++;
  } catch(e) { console.log('ERR', img.file, '—', e.message); err++; }
}

// Vérification sur 1 fichier
const testFile = path.join(mediaDir, 'arknights-endfield-review-2026.webp');
const testBuf  = fs.readFileSync(testFile);
const hasXMP   = testBuf.toString('ascii').includes('<?xpacket');
const hasKw    = testBuf.toString('utf8').includes('arknights endfield review 2026');
console.log('\n=== Vérification ===');
console.log('XMP packet present :', hasXMP  ? 'OUI' : 'NON');
console.log('Keywords présents  :', hasKw   ? 'OUI' : 'NON');
console.log(`\nTotal : ${ok} OK / ${err} erreurs`);
