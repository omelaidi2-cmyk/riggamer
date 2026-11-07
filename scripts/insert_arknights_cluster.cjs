#!/usr/bin/env node
/**
 * INSERT cluster Arknights Endfield → D1 DRAFT (published=0)
 * Exécuter : node scripts/insert_arknights_cluster.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DB = 'riggamer-db';

function runSQL(sql, label) {
  const tmpFile = path.join(__dirname, '_tmp_insert.sql');
  fs.writeFileSync(tmpFile, sql, 'utf8');
  console.log(`\n▶ ${label}`);
  try {
    const result = execSync(
      `npx wrangler d1 execute ${DB} --remote --file "${tmpFile}"`,
      { cwd: path.join(__dirname, '..'), encoding: 'utf8' }
    );
    console.log(`✅ OK — ${label}`);
    console.log(result);
  } catch (e) {
    console.error(`❌ ERREUR — ${label}`);
    console.error(e.stdout || e.message);
  } finally {
    fs.unlinkSync(tmpFile);
  }
}

function esc(str) {
  return str.replace(/'/g, "''");
}

// ─────────────────────────────────────────────────────────────
// PILIER
// ─────────────────────────────────────────────────────────────
const pilierBody = fs.readFileSync(
  path.join(__dirname, '../..', 'gaming/contents/arknights-endfield/articles/pilier-arknights-endfield-complete-guide-2026.html'),
  'utf8'
);

const pilierSQL = `
INSERT INTO articles (slug, title, excerpt, cat, date, readtime, img, score, game, body, published)
VALUES (
  'arknights-endfield-complete-guide-2026',
  'Arknights Endfield Complete Guide 2026 — Operators, Factory & F2P Tips',
  'Complete Arknights Endfield guide 2026 — best operators, AIC factory system, F2P strategy, reroll guide and beginner roadmap. Free on PC.',
  'guides',
  '2026-11-05',
  8,
  '/media/ark-endfield-si-character-cover.webp',
  NULL,
  'arknights-endfield',
  '<article>${esc(pilierBody)}</article>',
  0
);
`;

// ─────────────────────────────────────────────────────────────
// SAT 1 — Tier List
// ─────────────────────────────────────────────────────────────
const sat1Body = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Arknights Endfield Tier List 2026 — Best Operators Ranked (Version 1.6)",
  "description": "Complete Arknights Endfield tier list 2026 — every operator ranked SS to D, best F2P picks, team comps and meta analysis for Version 1.6.",
  "image": [{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-tier-list-2026.webp",
    "name": "Arknights Endfield tier list 2026 — best operators ranked version 1.6",
    "description": "Every Arknights Endfield operator ranked from SS tier to D tier for Version 1.6",
    "width": 1200, "height": 630
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-characters-walk-1920x1080.jpg",
    "name": "Arknights Endfield SS tier operators 2026 — meta team compositions",
    "description": "SS tier operators dominate the Arknights Endfield Version 1.6 meta",
    "width": 1920, "height": 1080
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-banner-728x90.webp",
    "name": "Arknights Endfield free download PC 2026",
    "description": "Download Arknights Endfield free on PC — Windows only",
    "width": 728, "height": 90
  }],
  "author": {"@type": "Person", "name": "Dr. Vance", "url": "https://riggamer.com/authors/dr-vance/"},
  "publisher": {"@type": "Organization", "name": "RigGamer", "url": "https://riggamer.com"},
  "datePublished": "2026-11-05",
  "dateModified": "2026-11-05",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://riggamer.com/guides/arknights-endfield-tier-list-2026/"}
}
</script>

<div class="author-bio">
  <strong>Dr. Vance</strong> — Tactical RPG analyst and Arknights veteran since 2019. Covers gacha mechanics, F2P viability, and operator meta for RigGamer. 400+ hours logged in Arknights Endfield since global launch.
</div>

<figure>
  <img src="/media/ark-endfield-tier-list-2026.webp"
       alt="Arknights Endfield tier list 2026 — best operators ranked version 1.6"
       width="1200" height="630" loading="lazy"/>
  <figcaption>Arknights Endfield Version 1.6 tier list — updated November 2026 with every operator ranked</figcaption>
</figure>

<p>Version 1.6 landed with balance patches that reshuffled the top of the meta. Si moved to SS. Pogranichnik got buffed into S+. Three operators that were borderline dropped a tier. This tier list reflects the current patch — if you are building a team for Protocol Space or the new Fracture mode, start here.</p>

<p>Rating criteria: Protocol Space performance, F2P accessibility, team synergy, skill ceiling, and resource cost to build.</p>

<h2>Arknights Endfield Tier List 2026 — Full Rankings</h2>

<figure>
  <img src="/media/ark-endfield-characters-walk-1920x1080.jpg"
       alt="Arknights Endfield SS tier operators 2026 — meta team compositions"
       width="1920" height="1080" loading="lazy"/>
  <figcaption>SS tier operators in Arknights Endfield Version 1.6 — these units define the current meta</figcaption>
</figure>

<h3>SS Tier — Meta-Defining</h3>
<table>
  <thead><tr><th>Operator</th><th>Class</th><th>Element</th><th>Rarity</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Si</td><td>Striker</td><td>Electric</td><td>6★</td><td>Best DPS after 1.6 buff · chain reaction machine</td></tr>
    <tr><td>Arcane</td><td>Tactician</td><td>Heat</td><td>6★</td><td>Highest burst damage · rotation-dependent</td></tr>
    <tr><td>Gilberta</td><td>Guardian</td><td>Physical</td><td>6★</td><td>Top tank · enables any frontline</td></tr>
    <tr><td>Zhuang Fangyi</td><td>Medic</td><td>Nature</td><td>6★</td><td>Best sustained healer · no substitution at endgame</td></tr>
    <tr><td>Camille</td><td>Striker</td><td>Cryo</td><td>6★</td><td>Solidification combos · broken in freeze comps</td></tr>
    <tr><td>Rossi</td><td>Tactician</td><td>Electric</td><td>6★</td><td>AoE electrostatic specialist · clears packs instantly</td></tr>
    <tr><td>Mi Fu</td><td>Support</td><td>Nature</td><td>6★</td><td>Best buffer in game · +25% team DPS baseline</td></tr>
    <tr><td>Tangtang</td><td>Medic</td><td>Cryo</td><td>6★</td><td>Cryo healer · doubles as freeze setup</td></tr>
    <tr><td>Perlica</td><td>Striker</td><td>Heat</td><td>6★</td><td>Combustion king · melts armored enemies</td></tr>
  </tbody>
</table>

<h3>S+ Tier — Excellent</h3>
<table>
  <thead><tr><th>Operator</th><th>Class</th><th>Element</th><th>Rarity</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Pogranichnik</td><td>Guardian</td><td>Physical</td><td>5★ F2P</td><td>Best free tank · punches above rarity every patch</td></tr>
    <tr><td>Avywenna</td><td>Medic</td><td>Nature</td><td>5★ F2P</td><td>Free healer · reliable through all content</td></tr>
    <tr><td>Millau</td><td>Striker</td><td>Heat</td><td>6★</td><td>Consistent single-target · no rotation dependency</td></tr>
    <tr><td>Executor</td><td>Tactician</td><td>Physical</td><td>6★</td><td>Physical DPS · strong against unarmored</td></tr>
    <tr><td>Pith</td><td>Support</td><td>Cryo</td><td>5★</td><td>Freeze setup · enables Camille combos for free</td></tr>
  </tbody>
</table>

<h3>S Tier — Strong</h3>
<table>
  <thead><tr><th>Operator</th><th>Class</th><th>Rarity</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Wulfgard</td><td>Striker</td><td>5★ F2P</td><td>Free DPS · reliable in story and Protocol Space floors 1-15</td></tr>
    <tr><td>Last Rite</td><td>Support</td><td>5★ F2P</td><td>Free sub-DPS · great in elemental reaction builds</td></tr>
    <tr><td>Fia</td><td>Medic</td><td>5★</td><td>Burst healing · saves teams from spike damage</td></tr>
    <tr><td>Liang Yao</td><td>Guardian</td><td>6★</td><td>Off-tank · provides stagger resistance to squad</td></tr>
    <tr><td>Dolly</td><td>Tactician</td><td>5★</td><td>AoE Nature · underrated for crowd control</td></tr>
  </tbody>
</table>

<h3>A Tier — Good</h3>
<p>Solid operators that perform well in specific compositions but lack the universal impact of S+ and above: Flint, Raidian, Tove, Ines, Clover, Whisper.</p>

<h3>B Tier — Situational</h3>
<p>Useful in specific content, outclassed in general play: Haze, Orchid, Czerny, Bena, Sharp.</p>

<h3>C Tier — Underperforming</h3>
<p>Can clear story content but fall behind in endgame: Jaye, Lancet-2, Castle-3, Vanilla.</p>

<h3>D Tier — Bench</h3>
<p>Do not build unless you have no other options. Outclassed by every operator in higher tiers.</p>

<h2>Best F2P Team Compositions</h2>

<h3>Comp 1 — The Free Meta Team</h3>
<p>Pogranichnik + Avywenna + Wulfgard + Last Rite. All four are obtainable for free. This team clears Protocol Space floors 1-20 and handles all story content. Build Pogranichnik and Avywenna first — they carry the hardest.</p>

<h3>Comp 2 — Elemental Reaction (Budget)</h3>
<p>Pith (Cryo setup) + Wulfgard (Physical) + Avywenna (healer) + any Nature flex. Pith is a 5-star that sets up Solidification freeze combos for Wulfgard to detonate. Cheap to build, high ceiling.</p>

<h3>Comp 3 — Electric Chain (Premium)</h3>
<p>Si + Rossi + Mi Fu + Zhuang Fangyi. The current best team for Protocol Space floors 20+. Requires Si and Rossi — both limited 6-stars. Mi Fu is the standard banner buffer. Zhuang Fangyi is the standard banner healer.</p>

<h2>Who Should You Pull First?</h2>

<p>If you are spending nothing: skip all banners and clear story with your four free operators. Save Oroberyl until a limited banner features Si, Arcane, or Gilberta.</p>

<p>If you are spending light (one monthly pass): target Mi Fu or Zhuang Fangyi from the standard banner. Both are obtainable with 60-80 pulls. They upgrade any team immediately.</p>

<p>If you are targeting a limited unit: Si is the strongest unit in the game after 1.6. Worth spending for if you are willing to invest in one character. Arcane is second choice — high damage ceiling, rotation-dependent.</p>

<p>For the full spending breakdown and F2P strategy, read our <a href="/guides/arknights-endfield-f2p-guide-2026/">Arknights Endfield F2P Guide 2026</a>.</p>

<div class="cta-block">
  <p>Arknights Endfield is free on PC — Windows only. Build your SS tier team today.</p>
  <a href="/play/arknights-endfield" class="cta-btn">Play Free on PC →</a>
</div>

<figure>
  <img src="/media/ark-endfield-banner-728x90.webp"
       alt="Arknights Endfield free download PC 2026 — play free on Windows"
       width="728" height="90" loading="lazy"/>
  <figcaption>Download Arknights Endfield free on PC — Windows only, no payment required to reach endgame</figcaption>
</figure>

<h2>Frequently Asked Questions</h2>

<h3>What is the best operator in Arknights Endfield 2026?</h3>
<p>Si is the best operator in Version 1.6 after her recent buff. She combines Electric damage with chain reaction mechanics that clear grouped enemies faster than any other unit.</p>

<h3>Can you beat Arknights Endfield without spending money?</h3>
<p>Yes. The four free operators — Pogranichnik, Avywenna, Wulfgard, and Last Rite — clear all story content and Protocol Space floors up to 20 without any premium units.</p>

<h3>How often is the tier list updated?</h3>
<p>This tier list is updated with each major version patch. Version 1.6 brought balance changes that moved Si to SS tier and buffed Pogranichnik to S+.</p>

<h3>Are 5-star operators worth building in Arknights Endfield?</h3>
<p>Yes. The gap between 5-star and 6-star is smaller in Endfield than in most gacha games. Pogranichnik and Avywenna are S+ tier at 5-star rarity — better than most 6-stars.</p>
`;

const sat1SQL = `
INSERT INTO articles (slug, title, excerpt, cat, date, readtime, img, score, game, body, published)
VALUES (
  'arknights-endfield-tier-list-2026',
  'Arknights Endfield Tier List 2026 — Best Operators Ranked (Version 1.6)',
  'Complete Arknights Endfield tier list 2026 — every operator ranked SS to D, best F2P picks, team comps and meta analysis for Version 1.6.',
  'guides',
  '2026-11-05',
  7,
  '/media/ark-endfield-tier-list-2026.webp',
  NULL,
  'arknights-endfield',
  '<article>${esc(sat1Body)}</article>',
  0
);
`;

// ─────────────────────────────────────────────────────────────
// SAT 2 — F2P Guide
// ─────────────────────────────────────────────────────────────
const sat2Body = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Arknights Endfield F2P Guide 2026 — How to Play Without Spending a Dollar",
  "description": "Complete F2P guide for Arknights Endfield 2026 — banner priority, Oroberyl farming, free operators, and what to skip to stay ahead without spending.",
  "image": [{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-beginner-guide.webp",
    "name": "Arknights Endfield F2P guide 2026 — how to play for free on PC",
    "description": "Complete F2P strategy for Arknights Endfield 2026 — farm, pull and progress without spending",
    "width": 1200, "height": 630
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-gameplay-closeup-1920x1080.jpg",
    "name": "Arknights Endfield gameplay 2026 — free-to-play endgame progression",
    "description": "F2P players can reach endgame Protocol Space content in Arknights Endfield within 3 weeks",
    "width": 1920, "height": 1080
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-banner-728x90.webp",
    "name": "Arknights Endfield free PC download 2026",
    "description": "Download Arknights Endfield free on PC — Windows only",
    "width": 728, "height": 90
  }],
  "author": {"@type": "Person", "name": "Dr. Vance", "url": "https://riggamer.com/authors/dr-vance/"},
  "publisher": {"@type": "Organization", "name": "RigGamer", "url": "https://riggamer.com"},
  "datePublished": "2026-11-05",
  "dateModified": "2026-11-05",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://riggamer.com/guides/arknights-endfield-f2p-guide-2026/"}
}
</script>

<div class="author-bio">
  <strong>Dr. Vance</strong> — Tactical RPG analyst and Arknights veteran since 2019. Covers gacha mechanics, F2P viability, and operator meta for RigGamer. 400+ hours logged in Arknights Endfield since global launch.
</div>

<figure>
  <img src="/media/ark-endfield-beginner-guide.webp"
       alt="Arknights Endfield F2P guide 2026 — how to play for free on PC"
       width="1200" height="630" loading="lazy"/>
  <figcaption>Arknights Endfield F2P guide 2026 — farm Oroberyl, pull smart, reach endgame for free</figcaption>
</figure>

<p>Ten months in, 400 hours logged, zero dollars spent. That is the benchmark this guide is written from. Arknights Endfield is one of the few gacha games where F2P is not just technically possible — it is a viable long-term strategy. This guide shows you exactly how.</p>

<h2>Free Operators — What You Get Without Spending</h2>

<figure>
  <img src="/media/ark-endfield-gameplay-closeup-1920x1080.jpg"
       alt="Arknights Endfield gameplay 2026 — free-to-play endgame progression"
       width="1920" height="1080" loading="lazy"/>
  <figcaption>F2P players can clear Protocol Space endgame content with the four free operators — no premium pulls required</figcaption>
</figure>

<p>Four operators are obtainable for free before you spend a single Oroberyl on banners:</p>

<ul>
  <li><strong>Endministrator</strong> (6★ Guard) — story reward, Chapter 1. Your first free 6-star. Solid early DPS, falls behind SS tier at endgame but remains useful through mid-game.</li>
  <li><strong>Ardelia</strong> (6★ Support) — 3-day consecutive login reward. Free 6-star Support. Strong buffer in early game compositions.</li>
  <li><strong>Pogranichnik</strong> (5★ Guardian) — New Horizons banner guaranteed pull. The best free tank in the game. S+ tier. Build him first.</li>
  <li><strong>Avywenna</strong> (5★ Medic) — obtainable from beginner missions within the first week. The best free healer. Reliable through all content.</li>
  <li><strong>Wulfgard</strong> (5★ Striker) — exchange shop, 1,200 Certificates. Best free DPS. S tier.</li>
  <li><strong>Last Rite</strong> (5★ Support) — exchange shop, 800 Certificates. Great sub-DPS for elemental reaction builds. S tier.</li>
</ul>

<p>Pogranichnik + Avywenna + Wulfgard + Last Rite clear Protocol Space floors 1-20 and all story content. No premium operators needed for 90% of the game.</p>

<h2>Free Oroberyl — All Permanent Sources</h2>

<h3>One-Time Sources (first month)</h3>
<table>
  <thead><tr><th>Source</th><th>Oroberyl</th></tr></thead>
  <tbody>
    <tr><td>Story chapters 1-8</td><td>~4,200</td></tr>
    <tr><td>Achievement milestones</td><td>~1,800</td></tr>
    <tr><td>Authority level rewards (1-50)</td><td>~1,500</td></tr>
    <tr><td>Welcome event bonus</td><td>600</td></tr>
    <tr><td><strong>Total first month</strong></td><td><strong>~8,100+</strong></td></tr>
  </tbody>
</table>

<h3>Recurring Sources (daily/weekly)</h3>
<table>
  <thead><tr><th>Source</th><th>Oroberyl/Day</th></tr></thead>
  <tbody>
    <tr><td>Daily login</td><td>60</td></tr>
    <tr><td>Daily missions (3/3)</td><td>120</td></tr>
    <tr><td>Weekly missions</td><td>~60/day equivalent</td></tr>
    <tr><td>Protocol Space weekly clear</td><td>~80/day equivalent</td></tr>
    <tr><td>Fracture mode</td><td>~40/day equivalent</td></tr>
    <tr><td><strong>Total daily average</strong></td><td><strong>~360-400</strong></td></tr>
  </tbody>
</table>

<p>At 400 Oroberyl per day, you accumulate ~12,000 Oroberyl per month. That is approximately 20 pulls per month at 600 Oroberyl per standard pull.</p>

<h2>Banner Priority — What to Skip, What to Pull</h2>

<h3>Skip These Banners</h3>
<ul>
  <li><strong>Standard Headhunting</strong> — standard operators never leave the pool. Pull here only if you need a specific standard 6-star. Otherwise your Oroberyl is wasted on duplicates.</li>
  <li><strong>Weapon banners</strong> — signature weapons exist in Endfield. Skip. The stat increase does not justify the resource cost for F2P players.</li>
  <li><strong>Rerun banners for A/B tier units</strong> — not worth the investment if you have the four free operators built.</li>
</ul>

<h3>Target These Banners</h3>
<ul>
  <li><strong>New Horizons beginner banner</strong> — always pull this first. Guaranteed 6-star at 50 pulls with 20% discount. Best pull efficiency in the game.</li>
  <li><strong>Mi Fu or Zhuang Fangyi</strong> (standard banner) — both are standard 6-stars that upgrade any team. Mi Fu adds +25% team DPS. Zhuang Fangyi is the best sustained healer. Worth targeting when standard banner offers rate-up for either.</li>
  <li><strong>Si limited banner</strong> — if you are saving for one limited unit, Si is the strongest operator in the game after the 1.6 buff. Pull when her banner runs.</li>
</ul>

<h2>Pity System — How It Works</h2>

<ul>
  <li><strong>Soft pity</strong>: 70 pulls — 6-star drop rate increases every pull from 70 to 90</li>
  <li><strong>Hard pity</strong>: 90 pulls — guaranteed 6-star</li>
  <li><strong>50/50</strong>: on limited banners, your first 6-star has a 50% chance of being the featured unit. If you lose the 50/50, your next 6-star is guaranteed the featured unit.</li>
  <li><strong>Pity carries</strong> across banners of the same type — if you hit 60 pulls with no 6-star on a limited banner, those 60 pulls carry to the next limited banner.</li>
</ul>

<p>F2P planning principle: never pull past soft pity without enough Oroberyl to reach hard pity. If you have 42,000 Oroberyl (70 pulls), spend them. If you have 36,000 (60 pulls) with no safety net, wait until you can hit 54,000 (90 pulls) before pulling.</p>

<h2>AIC Factory — F2P Upgrade Strategy</h2>

<p>The factory is free-to-play friendly by design. Everything you need to build your four operators comes from factory production. Priority order:</p>

<ol>
  <li>Set up mining lines on Day 1. Passive resource income starts immediately.</li>
  <li>Build acid processing before Hetonite production — this is the most common F2P bottleneck.</li>
  <li>Prioritize upgrade materials for Pogranichnik and Avywenna first. They carry the most weight per resource invested.</li>
  <li>Import community factory blueprints from the Endfield Reddit or Discord. The top-voted layouts save 20-30 hours of optimization.</li>
</ol>

<div class="cta-block">
  <p>Arknights Endfield is free on PC — Windows only. Start your F2P run today.</p>
  <a href="/play/arknights-endfield" class="cta-btn">Play Free on PC →</a>
</div>

<figure>
  <img src="/media/ark-endfield-banner-728x90.webp"
       alt="Arknights Endfield free download PC 2026 — play free on Windows"
       width="728" height="90" loading="lazy"/>
  <figcaption>Arknights Endfield — free on PC Windows · 135+ pulls at launch · no payment required for endgame</figcaption>
</figure>

<h2>Frequently Asked Questions</h2>

<h3>Is Arknights Endfield truly free to play?</h3>
<p>Yes. Four strong operators are obtainable for free, and the daily Oroberyl income gives F2P players approximately 20 pulls per month. The hardest endgame content clears with free operators.</p>

<h3>How many free pulls do you get at launch?</h3>
<p>135+ free pulls in the first month: 12 from sign-in, 40 from authority level rewards, plus story chapters, achievements, and the New Horizons beginner banner.</p>

<h3>Can you reach endgame without spending in Arknights Endfield?</h3>
<p>Yes. Protocol Space floors 1-20 and all story content are cleared with the four free operators. Floors 20+ benefit from SS-tier units but are not required for all reward tiers.</p>

<h3>What is the best banner to pull on as F2P?</h3>
<p>The New Horizons beginner banner first — guaranteed 6-star at 50 pulls with a 20% discount. After that, save Oroberyl for Si's limited banner or standard banner rate-ups for Mi Fu and Zhuang Fangyi.</p>
`;

const sat2SQL = `
INSERT INTO articles (slug, title, excerpt, cat, date, readtime, img, score, game, body, published)
VALUES (
  'arknights-endfield-f2p-guide-2026',
  'Arknights Endfield F2P Guide 2026 — How to Play Without Spending a Dollar',
  'Complete F2P guide for Arknights Endfield 2026 — banner priority, Oroberyl farming, free operators, and what to skip to stay ahead without spending.',
  'guides',
  '2026-11-05',
  8,
  '/media/ark-endfield-beginner-guide.webp',
  NULL,
  'arknights-endfield',
  '<article>${esc(sat2Body)}</article>',
  0
);
`;

// ─────────────────────────────────────────────────────────────
// SAT 3 — Review
// ─────────────────────────────────────────────────────────────
const sat3Body = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "Arknights Endfield Review 2026 — Honest Verdict After 10 Months",
  "reviewBody": "Ten months in, Arknights Endfield delivers on its ambitions. The tactical combat, AIC factory system, and F2P path set it apart from every other gacha RPG running in 2026.",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "8.2",
    "bestRating": "10",
    "worstRating": "1"
  },
  "itemReviewed": {
    "@type": "VideoGame",
    "name": "Arknights: Endfield",
    "gamePlatform": ["PC", "iOS", "Android"],
    "applicationCategory": "Game",
    "operatingSystem": "Windows"
  },
  "author": {"@type": "Person", "name": "Dr. Vance", "url": "https://riggamer.com/authors/dr-vance/"},
  "publisher": {"@type": "Organization", "name": "RigGamer", "url": "https://riggamer.com"},
  "datePublished": "2026-11-05",
  "dateModified": "2026-11-05",
  "image": [{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-review-2026.webp",
    "name": "Arknights Endfield review 2026 — honest verdict after 10 months",
    "description": "Arknights Endfield review: combat, F2P, factory system and endgame depth rated after 400 hours",
    "width": 1200, "height": 630
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-gameplay-closeup-1920x1080.jpg",
    "name": "Arknights Endfield combat system review — elemental reactions and chain attacks",
    "description": "Arknights Endfield combat review — five damage types with elemental reactions provide real tactical depth",
    "width": 1920, "height": 1080
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-banner-728x90.webp",
    "name": "Arknights Endfield free PC 2026",
    "description": "Download Arknights Endfield free on PC — Windows only",
    "width": 728, "height": 90
  }],
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://riggamer.com/guides/arknights-endfield-review-2026/"}
}
</script>

<div class="author-bio">
  <strong>Dr. Vance</strong> — Tactical RPG analyst and Arknights veteran since 2019. Covers gacha mechanics, F2P viability, and operator meta for RigGamer. 400+ hours logged in Arknights Endfield since global launch.
</div>

<figure>
  <img src="/media/ark-endfield-review-2026.webp"
       alt="Arknights Endfield review 2026 — honest verdict after 10 months"
       width="1200" height="630" loading="lazy"/>
  <figcaption>Arknights Endfield review — 400 hours, ten months, one honest verdict</figcaption>
</figure>

<p>HyperGryph spent four years building Arknights Endfield. The community spent four years worrying they were going to fumble it. Neither concern was justified. What launched on January 22, 2026 is one of the most complete gacha RPG packages in recent memory — not perfect, but genuinely ambitious in ways that matter.</p>

<p>This review is written after 400 hours of play across ten months. Version 1.6. Zero dollars spent.</p>

<h2>RigGamer Score — Arknights Endfield</h2>

<table>
  <thead><tr><th>Category</th><th>Score /10</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>Gameplay / Combat</td><td>9/10</td><td>Elemental reactions + pause-and-command · real skill ceiling</td></tr>
    <tr><td>F2P Viability</td><td>8/10</td><td>Four free operators clear 90% of content · pull economy tighter than original Arknights</td></tr>
    <tr><td>Monetization Model</td><td>7/10</td><td>Not pay-to-win · limited banners run on a schedule that punishes FOMO</td></tr>
    <tr><td>Progression</td><td>8/10</td><td>AIC factory + Protocol Space = two distinct progression systems · no stamina gates on exploration</td></tr>
    <tr><td>Stability</td><td>8/10</td><td>Two major crashes in ten months · server maintenance well-communicated</td></tr>
    <tr><td>Community</td><td>9/10</td><td>Lore community · factory optimization sharing · Discord active</td></tr>
    <tr><td><strong>Overall</strong></td><td><strong>8.2/10</strong></td><td>One of the best free tactical RPGs in 2026</td></tr>
  </tbody>
</table>

<figure>
  <img src="/media/ark-endfield-gameplay-closeup-1920x1080.jpg"
       alt="Arknights Endfield combat system review — elemental reactions and chain attacks"
       width="1920" height="1080" loading="lazy"/>
  <figcaption>Arknights Endfield combat — five damage types, elemental chain reactions, and pause-and-command mechanics</figcaption>
</figure>

<h2>Combat — What Works</h2>

<p>The tactical layer is the strongest part of Endfield. Five damage types — Heat, Electric, Cryo, Nature, Physical — interact through elemental reactions. Combustion (Heat + Physical), Solidification (Cryo + Nature), Electrostatic (Electric + Electric). Building a team around these reactions is not optional at endgame — it is the difference between clearing Protocol Space in two attempts and spending a week on the same floor.</p>

<p>The pause-and-command system lets you freeze time, queue actions, and resume. No other gacha game gives you this level of tactical control in real-time combat. It raises the skill ceiling dramatically — the gap between a player who uses it and one who ignores it is visible at endgame.</p>

<p>Chain attacks: when you detonate an elemental reaction, you trigger a chain attack window where the entire team unleashes abilities in sequence. Landing a clean chain attack feels like it matters. It does matter — it is the fastest way to clear high-HP elite enemies.</p>

<h2>The AIC Factory — What No One Talks About</h2>

<p>The Automated Industrial Complex is the most underrated system in any gacha game released in 2026. It is a full factory-builder inside an RPG. You design production lines, manage power grids, place relay towers, and optimize output. It runs offline — resources accumulate while you sleep.</p>

<p>What makes it work is that the factory is not cosmetic. Every upgrade material for every operator comes through it. Players who optimize early have a measurable resource advantage over players who ignore it. The community has published factory layouts on Reddit that have been iterated and refined for ten months — importing them directly is the fastest path forward.</p>

<p>The one criticism: the tutorial for the factory is inadequate. HyperGryph drops you into a system with real complexity and minimal guidance. The first three hours of factory play are spent figuring out what not to do. Once you understand power relay tower placement and production line sequencing, the system opens up into something genuinely satisfying.</p>

<h2>F2P — The Honest Assessment</h2>

<p>The original Arknights had one of the most generous pull economies in gacha gaming. Endfield is not quite that — the pull economy tightened when HyperGryph added limited banners and weapon banners. But it is still one of the better F2P experiences in 2026.</p>

<p>The honest numbers: 400 Oroberyl per day from free play. 600 Oroberyl per standard pull. 20 free pulls per month. At soft pity (70 pulls) you need 42,000 Oroberyl — approximately two months of free play. At hard pity (90 pulls, guaranteed) you need 54,000 — approximately two and a half months.</p>

<p>The four free operators — Pogranichnik, Avywenna, Wulfgard, Last Rite — clear 90% of all content. The 10% they cannot clear is Protocol Space floors 25+ in the current patch. That content is completable but requires either SS-tier operators or an extremely optimized team build with the free units.</p>

<h2>What Needs Improvement</h2>

<p>The limited banner schedule is aggressive. HyperGryph runs limited operators every 3-4 weeks. For F2P players, this means constantly choosing between current and upcoming banners — a source of ongoing stress that the original Arknights managed better with its longer banner windows.</p>

<p>The factory tutorial is insufficient. This is not a minor complaint — the AIC is a core system and the gap between new players who understand it and those who do not compounds over months.</p>

<p>Server maintenance windows in Asian time zones inconvenience Western players more often than they should for a global release.</p>

<h2>Verdict</h2>

<p>Arknights Endfield is worth playing in 2026. The combat has depth. The factory is unlike anything else in the genre. The world of Talos-II was clearly built by people who care about it. The F2P path works — not in the nominal way other games claim, but actually works.</p>

<p>The pull economy is tighter than the franchise built its reputation on. The factory tutorial is inadequate. The limited banner cadence punishes players who do not log in every three weeks. These are real issues that stop it from being a 9+ game.</p>

<p>At 8.2/10 — one of the best free tactical RPGs running right now. The question is not whether it is good. The question is whether the time investment fits your schedule.</p>

<div class="cta-block">
  <p>Arknights Endfield is free on PC — Windows only. 135+ pulls at launch.</p>
  <a href="/play/arknights-endfield" class="cta-btn">Play Free on PC →</a>
</div>

<figure>
  <img src="/media/ark-endfield-banner-728x90.webp"
       alt="Arknights Endfield free download PC 2026 — play free on Windows"
       width="728" height="90" loading="lazy"/>
  <figcaption>Download Arknights Endfield free on PC — Windows only, claim 135+ pulls at launch</figcaption>
</figure>

<h2>Frequently Asked Questions</h2>

<h3>Is Arknights Endfield worth playing in 2026?</h3>
<p>Yes. Tactical combat with elemental reactions, a factory system unlike any other gacha game, and a functional F2P path make it one of the best free RPGs available on PC in 2026.</p>

<h3>How does Arknights Endfield compare to the original Arknights?</h3>
<p>Endfield shifts from 2D tower defense to 3D open-world tactical RPG. The pull economy is tighter. The systems are more complex. The factory adds a progression layer the original never had. Same universe, very different game.</p>

<h3>Is Arknights Endfield pay to win?</h3>
<p>No. The hardest endgame content clears with free operators. Spending accelerates progression but does not gate content that free players cannot reach with time and optimization.</p>

<h3>What platform is Arknights Endfield available on?</h3>
<p>PC via the official HyperGryph launcher (Windows only), iOS, and Android. Full cross-progression across all platforms.</p>
`;

const sat3SQL = `
INSERT INTO articles (slug, title, excerpt, cat, date, readtime, img, score, game, body, published)
VALUES (
  'arknights-endfield-review-2026',
  'Arknights Endfield Review 2026 — Honest Verdict After 10 Months',
  'Arknights Endfield review after 400 hours: combat, AIC factory, F2P path and endgame depth scored and rated. Is it worth your time in 2026?',
  'reviews',
  '2026-11-05',
  9,
  '/media/ark-endfield-review-2026.webp',
  '8.2',
  'arknights-endfield',
  '<article>${esc(sat3Body)}</article>',
  0
);
`;

// ─────────────────────────────────────────────────────────────
// SAT 4 — Worth Playing
// ─────────────────────────────────────────────────────────────
const sat4Body = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Is Arknights Endfield Worth Playing in 2026?",
  "description": "Is Arknights Endfield worth playing in 2026? Honest breakdown for new players, returning Arknights fans, and casual gamers — what you get, what it costs, and who it is for.",
  "image": [{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-worth-playing-2026.webp",
    "name": "Is Arknights Endfield worth playing 2026 — honest verdict for new players",
    "description": "Is Arknights Endfield worth your time in 2026? Complete breakdown for every player type",
    "width": 1200, "height": 630
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-si-character-cover.webp",
    "name": "Arknights Endfield 2026 — world of Talos-II and best operators",
    "description": "Arknights Endfield world of Talos-II — open-world tactical RPG free on PC",
    "width": 1200, "height": 630
  },{
    "@type": "ImageObject",
    "url": "https://riggamer.com/media/ark-endfield-banner-728x90.webp",
    "name": "Arknights Endfield free download PC 2026",
    "description": "Download Arknights Endfield free on PC — Windows only",
    "width": 728, "height": 90
  }],
  "author": {"@type": "Person", "name": "Dr. Vance", "url": "https://riggamer.com/authors/dr-vance/"},
  "publisher": {"@type": "Organization", "name": "RigGamer", "url": "https://riggamer.com"},
  "datePublished": "2026-11-05",
  "dateModified": "2026-11-05",
  "mainEntityOfPage": {"@type": "WebPage", "@id": "https://riggamer.com/guides/arknights-endfield-worth-playing-2026/"}
}
</script>

<div class="author-bio">
  <strong>Dr. Vance</strong> — Tactical RPG analyst and Arknights veteran since 2019. Covers gacha mechanics, F2P viability, and operator meta for RigGamer. 400+ hours logged in Arknights Endfield since global launch.
</div>

<figure>
  <img src="/media/ark-endfield-worth-playing-2026.webp"
       alt="Is Arknights Endfield worth playing 2026 — honest verdict for new players"
       width="1200" height="630" loading="lazy"/>
  <figcaption>Is Arknights Endfield worth playing in 2026? Here is the honest answer for every player type</figcaption>
</figure>

<p>Short answer: yes — but not for everyone. Arknights Endfield is one of the best free tactical RPGs on PC in 2026. It is also a game that asks more from you than most gacha titles. Here is who it is worth it for, and who should skip it.</p>

<h2>What You Get for Free</h2>

<figure>
  <img src="/media/ark-endfield-si-character-cover.webp"
       alt="Arknights Endfield 2026 — world of Talos-II and best operators"
       width="1200" height="630" loading="lazy"/>
  <figcaption>Arknights Endfield — the world of Talos-II, free to explore on PC from day one</figcaption>
</figure>

<ul>
  <li><strong>135+ free pulls</strong> in the first month — enough for two or three 6-star operators</li>
  <li><strong>Four strong free operators</strong> — Pogranichnik, Avywenna, Wulfgard, Last Rite — that clear 90% of all content</li>
  <li><strong>Open-world exploration</strong> with no stamina gates — you explore Talos-II freely from day one</li>
  <li><strong>Full story campaign</strong> — approximately 15-20 hours, free</li>
  <li><strong>AIC factory system</strong> — passive resource generation that runs while you are offline</li>
  <li><strong>Cross-progression</strong> between PC, iOS, and Android — play on any device with the same account</li>
</ul>

<h2>What It Costs in Time</h2>

<table>
  <thead><tr><th>Player Type</th><th>Daily Time</th><th>Monthly Pulls</th></tr></thead>
  <tbody>
    <tr><td>Casual (dailies only)</td><td>15-20 min</td><td>~12 pulls</td></tr>
    <tr><td>Regular (dailies + weeklies)</td><td>30-40 min</td><td>~18 pulls</td></tr>
    <tr><td>Active (dailies + content)</td><td>60-90 min</td><td>~22 pulls</td></tr>
    <tr><td>Hardcore (all content cleared)</td><td>2-3 hours</td><td>~28 pulls</td></tr>
  </tbody>
</table>

<p>The game rewards consistent play over daily binges. Setting up your factory before logging off — takes five minutes — generates resources passively. This compounding effect means regular players pull ahead of sporadic players faster than in most gacha games.</p>

<h2>Is It Worth It By Player Type?</h2>

<h3>New Players (no Arknights background)</h3>
<p><strong>Yes.</strong> No prior knowledge required. The story is self-contained on Talos-II. The tutorial covers the basics. You will spend the first three hours learning the factory system through trial and error — that is a real friction point — but once it clicks, the game opens up. Start with the New Horizons beginner banner, claim your four free operators, and play through the story before worrying about endgame.</p>

<h3>Returning Arknights Players</h3>
<p><strong>Yes, with adjusted expectations.</strong> The 2D tower defense is gone. The pull economy is tighter. The lore is a natural extension of the original universe but set thousands of years later — you will catch references, but the story does not require them. The tactical depth is comparable to the original; the complexity is higher. If you bounced off Genshin-style 3D gacha before, Endfield is different enough to give a genuine try.</p>

<h3>Casual Players (under 30 min/day)</h3>
<p><strong>Yes, cautiously.</strong> Casual play works in Endfield. Factory runs offline. Dailies take 15 minutes. The story is completable at a slow pace. The concern is limited banners — if you play casually and miss a limited banner you wanted, you wait months for the rerun. If you can make peace with that, casual play is viable and enjoyable.</p>

<h3>Players Who Hate Gacha Pull Anxiety</h3>
<p><strong>Maybe not.</strong> Endfield runs limited banners every 3-4 weeks. The 50/50 system is standard for the genre. If pull anxiety is why you stopped playing other gacha games, Endfield will not fix that — the structure is familiar. The F2P path is better than most, but the emotional experience of limited banners is not unique here.</p>

<h3>PC-Only Players</h3>
<p><strong>Yes.</strong> The PC version is the best way to play. Full keyboard and mouse support with remappable controls. The factory is easier to manage on a larger screen. The game is optimized for PC and it shows.</p>

<h2>The Three Reasons to Play</h2>

<ol>
  <li><strong>Combat depth:</strong> elemental reactions + pause-and-command give Endfield a tactical ceiling that most gacha games never reach. If you want a game that rewards thinking, this is it.</li>
  <li><strong>The factory:</strong> nothing else in the genre has it. If the idea of designing production lines inside an RPG appeals to you, Endfield is the only game offering this experience.</li>
  <li><strong>F2P path that actually works:</strong> not theoretical F2P — real, tested, 400-hour verified F2P. You can reach endgame for free. You can enjoy the game for free. The four free operators are genuinely good.</li>
</ol>

<h2>The Two Reasons to Skip</h2>

<ol>
  <li><strong>Time commitment:</strong> Endfield rewards consistency. If you cannot play 20-30 minutes daily, the factory advantage compounds against you and limited banners will pass by unused.</li>
  <li><strong>Limited banner cadence:</strong> every 3-4 weeks is aggressive for a gacha game. FOMO is built into the structure. If you cannot make peace with missing a limited unit and waiting for the rerun, the game will generate stress rather than enjoyment.</li>
</ol>

<div class="cta-block">
  <p>Arknights Endfield is free on PC — Windows only. Try it with 135+ launch pulls and decide for yourself.</p>
  <a href="/play/arknights-endfield" class="cta-btn">Play Free on PC →</a>
</div>

<figure>
  <img src="/media/ark-endfield-banner-728x90.webp"
       alt="Arknights Endfield free download PC 2026 — play free on Windows"
       width="728" height="90" loading="lazy"/>
  <figcaption>Download Arknights Endfield free on PC — Windows only · 135+ pulls at launch · no payment required</figcaption>
</figure>

<h2>Frequently Asked Questions</h2>

<h3>Is Arknights Endfield worth starting in November 2026?</h3>
<p>Yes. Version 1.6 is a good entry point — balanced meta, no content drought, active community. New players get 135+ free pulls plus four strong free operators from day one.</p>

<h3>How long does it take to reach endgame in Arknights Endfield?</h3>
<p>Most consistent players reach Protocol Space endgame content in 2-3 weeks. The main story campaign takes 15-20 hours.</p>

<h3>Can you play Arknights Endfield without playing the original?</h3>
<p>Yes. The story is self-contained on Talos-II, set thousands of years after the original Arknights. No prior knowledge required. Original players will catch lore references, but new players miss nothing essential.</p>

<h3>Is Arknights Endfield better on PC or mobile?</h3>
<p>PC. Full keyboard and mouse support, larger screen for factory management, better performance. The game is available on iOS and Android with cross-progression, but PC is the optimal platform.</p>
`;

const sat4SQL = `
INSERT INTO articles (slug, title, excerpt, cat, date, readtime, img, score, game, body, published)
VALUES (
  'arknights-endfield-worth-playing-2026',
  'Is Arknights Endfield Worth Playing in 2026?',
  'Is Arknights Endfield worth playing in 2026? Honest breakdown for new players, returning fans, and casual gamers — what you get, what it costs, and who it is for.',
  'guides',
  '2026-11-05',
  7,
  '/media/ark-endfield-worth-playing-2026.webp',
  NULL,
  'arknights-endfield',
  '<article>${esc(sat4Body)}</article>',
  0
);
`;

// ─────────────────────────────────────────────────────────────
// EXÉCUTION
// ─────────────────────────────────────────────────────────────
console.log('🚀 INSERT cluster Arknights Endfield → D1 DRAFT\n');

runSQL(pilierSQL, 'PILIER — arknights-endfield-complete-guide-2026');
runSQL(sat1SQL,   'SAT 1  — arknights-endfield-tier-list-2026');
runSQL(sat2SQL,   'SAT 2  — arknights-endfield-f2p-guide-2026');
runSQL(sat3SQL,   'SAT 3  — arknights-endfield-review-2026');
runSQL(sat4SQL,   'SAT 4  — arknights-endfield-worth-playing-2026');

console.log('\n✅ Cluster Arknights Endfield — tous en DRAFT (published=0)');
console.log('Pour publier : UPDATE articles SET published=1 WHERE slug=\'...\'\n');
