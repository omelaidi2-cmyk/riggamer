// planning-riggamer-v2.xlsx — 66 articles from scratch
// Structure : 1 Pilier + TOF + MOF + BOF + COM1 + COM2 × 11 clusters
import XLSX from 'xlsx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '../planning-riggamer-v2.xlsx');

const clusters = [
  {
    id: 1, jeu: 'NTE — Neverness to Everness', score: 8.0,
    redacteur: 'Ash Reeves', expert: 'Kai Voss', color: 'NTE',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Neverness to Everness Review 2026 — Is NTE Worth Playing?',                        slug: 'neverness-to-everness-review',        cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/nte',    intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Neverness to Everness? — Free Open-World Gacha Explained',                  slug: 'nte-what-is',                        cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'NTE Tier List 2026 — Best Characters Ranked for Every Role',                        slug: 'nte-tier-list-2026',                 cat: 'guides',  longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON',              intention: 'Optimisation personnages' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is NTE Worth Playing in 2026? — Honest F2P Analysis',                               slug: 'nte-worth-playing-2026',             cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/nte',    intention: 'Décision worth it' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Neverness to Everness on PC — Free Install Guide',                  slug: 'nte-download-pc',                    cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/nte',    intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'NTE vs Genshin Impact 2026 — Which Free PC Gacha Should You Play?',                 slug: 'nte-vs-genshin-2026',                cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/nte',    intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 2, jeu: 'Arknights: Endfield', score: 8.6,
    redacteur: 'Dr. Vance', expert: 'Rhodes Intel', color: 'AE',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Arknights: Endfield Review 2026 — Worth the Four-Year Wait?',                      slug: 'arknights-endfield-review',          cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/arknights', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Arknights: Endfield? — New 3D Gacha PC Game Explained',                     slug: 'arknights-endfield-what-is',         cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'Arknights: Endfield Best Operators 2026 — Tier List for New Players',               slug: 'arknights-endfield-tier-list',       cat: 'guides',  longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON',              intention: 'Optimisation operators' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Arknights: Endfield F2P Friendly? — Honest Gacha Analysis 2026',                 slug: 'arknights-endfield-f2p-analysis',    cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/arknights', intention: 'Décision F2P viability' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Arknights: Endfield on PC — Free Install Guide 2026',               slug: 'arknights-endfield-download-pc',     cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/arknights', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Arknights: Endfield vs Wuthering Waves — Best New PC Gacha 2026',                   slug: 'arknights-endfield-vs-wuthering',    cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/arknights', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 3, jeu: 'RAID Shadow Legends', score: 8.0,
    redacteur: 'Cole Merritt', expert: 'Doc Champion', color: 'RAID',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'RAID Shadow Legends Review 2026 — Polished Gacha, Familiar Traps',                  slug: 'raid-shadow-legends-review',         cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/raid',   intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is RAID Shadow Legends? — Free Mobile RPG Explained for Beginners',            slug: 'raid-shadow-legends-what-is',        cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'RAID Shadow Legends Champion Tier List 2026 — Best Champions Ranked',               slug: 'raid-shadow-legends-tier-list',      cat: 'guides',  longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON',              intention: 'Optimisation champions' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is RAID Shadow Legends Pay to Win? — Honest F2P Analysis 2026',                     slug: 'raid-shadow-legends-p2w',            cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/raid',   intention: 'Décision P2W analysis' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download RAID Shadow Legends on PC — Free Install Guide 2026',               slug: 'raid-shadow-legends-download-pc',    cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/raid',   intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'RAID Shadow Legends vs AFK Journey — Best Idle RPG 2026',                           slug: 'raid-vs-afk-journey',                cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/raid',   intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 4, jeu: 'Rise of Kingdoms', score: 7.8,
    redacteur: 'Ethan Vale', expert: 'Kingdom Watcher', color: 'RoK',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Rise of Kingdoms Review 2026 — Best Free 4X Strategy Game?',                       slug: 'rise-of-kingdoms-review',            cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/rok',    intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Rise of Kingdoms? — Free 4X Strategy Mobile Game Explained',                slug: 'rise-of-kingdoms-what-is',           cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'Rise of Kingdoms Beginner Guide 2026 — Best Civilization Tier List',                slug: 'rise-of-kingdoms-beginner-guide',    cat: 'guides',  longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON',              intention: 'Guide civilisations' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Rise of Kingdoms Pay to Win? — Honest F2P Strategy Analysis 2026',               slug: 'rise-of-kingdoms-p2w-analysis',      cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/rok',    intention: 'Décision P2W analysis' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Rise of Kingdoms on PC — BlueStacks Free Guide 2026',               slug: 'rise-of-kingdoms-download-pc',       cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/rok',    intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Rise of Kingdoms vs Clash of Clans — Best Free Strategy Game 2026',                 slug: 'rise-of-kingdoms-vs-clash',          cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/rok',    intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 5, jeu: 'War Thunder', score: 7.6,
    redacteur: 'Viktor Lenz', expert: 'Panzer Ace', color: 'WT',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'War Thunder Review 2026 — The Grind vs The Glory',                                  slug: 'war-thunder-review',                 cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/war-thunder', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is War Thunder? — Free Military PC Game Explained',                            slug: 'war-thunder-what-is',                cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'War Thunder Best Nation to Grind 2026 — Complete Tier List Guide',                  slug: 'war-thunder-best-nation-2026',       cat: 'guides',  longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON',              intention: 'Guide nations' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is War Thunder Pay to Win in 2026? — Honest F2P Analysis',                          slug: 'war-thunder-p2w-2026',               cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/war-thunder', intention: 'Décision P2W analysis' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download War Thunder on PC — Free Install Guide 2026',                       slug: 'war-thunder-download-pc',            cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/war-thunder', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'War Thunder vs World of Tanks 2026 — Best Free Military Game',                      slug: 'war-thunder-vs-world-of-tanks',      cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/war-thunder', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 6, jeu: 'Project Entropy', score: 7.2,
    redacteur: 'Jake Cipher', expert: 'Entropy Scout', color: 'PE',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Project Entropy Review 2026 — The Dark Horse PC Gacha of the Year',                slug: 'project-entropy-review',             cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/project-entropy', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Project Entropy? — New Free PC Gacha Explained',                            slug: 'project-entropy-what-is',            cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: "Project Entropy Beginner's Guide 2026 — First Week Roadmap & Best Units",           slug: 'project-entropy-beginner-guide',     cat: 'guides',  longueur: '1500-2500w', schema: 'Article + HowTo',      play: 'NON',              intention: 'Guide débutants' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Project Entropy Worth Playing? — Honest F2P Gacha Review 2026',                  slug: 'project-entropy-worth-playing',      cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/project-entropy', intention: 'Décision worth it' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Project Entropy on PC — Free Install Guide 2026',                   slug: 'project-entropy-download-pc',        cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/project-entropy', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Project Entropy vs AFK Journey — Best New Gacha RPG 2026',                          slug: 'project-entropy-vs-afk-journey',     cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/project-entropy', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 7, jeu: 'Enlisted', score: 6.8,
    redacteur: 'Owen Nash', expert: 'Sergeant Rex', color: 'ENL',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Enlisted Review 2026 — Still the Best Free WWII Shooter?',                         slug: 'enlisted-review',                    cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/enlisted', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Enlisted? — Free WWII Squad Shooter Explained',                             slug: 'enlisted-what-is',                   cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'Enlisted Squad Building Guide 2026 — Best Soldiers for Every Battle Mode',          slug: 'enlisted-squad-guide-2026',          cat: 'guides',  longueur: '1500-2500w', schema: 'Article + HowTo',      play: 'NON',              intention: 'Guide squad building' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Enlisted Worth Playing in 2026? — Honest WWII Shooter Analysis',                 slug: 'enlisted-worth-playing-2026',        cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/enlisted', intention: 'Décision worth it' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Enlisted on PC — Free WWII Shooter Install Guide 2026',             slug: 'enlisted-download-pc',               cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/enlisted', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Enlisted vs Hell Let Loose 2026 — Best Free WWII Shooter to Play',                  slug: 'enlisted-vs-hell-let-loose',         cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/enlisted', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 8, jeu: 'Star Trek Fleet Command', score: 6.4,
    redacteur: 'Marcus Steel', expert: 'Commander Vega', color: 'STFC',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Star Trek Fleet Command Review 2026 — Strategy or Pay-to-Win?',                    slug: 'star-trek-fleet-command-review',     cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/star-trek', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Star Trek Fleet Command? — Free Sci-Fi Strategy Explained',                 slug: 'star-trek-fleet-command-what-is',    cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'Star Trek Fleet Command Beginner Guide 2026 — Complete Roadmap',                    slug: 'star-trek-fleet-command-guide-2026', cat: 'guides',  longueur: '1500-2500w', schema: 'Article + HowTo',      play: 'NON',              intention: 'Guide débutants' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Star Trek Fleet Command Pay to Win? — Honest F2P Analysis 2026',                 slug: 'star-trek-fleet-command-p2w',        cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/star-trek', intention: 'Décision P2W analysis' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Star Trek Fleet Command — Free PC & Mobile Install Guide',          slug: 'star-trek-fleet-command-download',   cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/star-trek', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Star Trek Fleet Command vs Galaxy of Heroes — Best Free Sci-Fi Strategy 2026',      slug: 'star-trek-fc-vs-galaxy-heroes',      cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/star-trek', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 9, jeu: 'Where Winds Meet', score: 6.4,
    redacteur: 'River Stone', expert: 'Jade Wanderer', color: 'WWM',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Where Winds Meet Review 2026 — A Wuxia World Worth Getting Lost In',               slug: 'where-winds-meet-review',            cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/where-winds-meet', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Where Winds Meet? — Free Wuxia Open-World PC Game Explained',               slug: 'where-winds-meet-what-is',           cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'Where Winds Meet Beginner Guide 2026 — Weapons, Inner Power & Jianghu Explained',   slug: 'where-winds-meet-beginner-guide',    cat: 'guides',  longueur: '1500-2500w', schema: 'Article + HowTo',      play: 'NON',              intention: 'Guide mécaniques' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Where Winds Meet Worth Playing? — Wuxia Game F2P Analysis 2026',                 slug: 'where-winds-meet-worth-playing',     cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/where-winds-meet', intention: 'Décision worth it' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Where Winds Meet on PC — Free Install Guide 2026',                  slug: 'where-winds-meet-download-pc',       cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/where-winds-meet', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Where Winds Meet vs Black Desert Online — Best Free Wuxia/MMORPG 2026',             slug: 'where-winds-meet-vs-black-desert',   cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/where-winds-meet', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 10, jeu: 'Once Human', score: '—',
    redacteur: 'Colt Rivers', expert: 'Survivor Zero', color: 'OH',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF/BOF', titre: 'Once Human Review 2026 — Best Free Survival Shooter?',                             slug: 'once-human-review',                  cat: 'reviews', longueur: '2000-3000w', schema: 'VideoGame + Review',    play: 'OUI /play/once-human', intention: 'Review hub' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'What is Once Human? — Free PC Survival Shooter Explained',                          slug: 'once-human-what-is',                 cat: 'guides',  longueur: '1200-1800w', schema: 'Article',              play: 'NON',              intention: 'Découverte / awareness' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: "Once Human Beginner's Guide 2026 — Base Building, Deviants & Survival Tips",        slug: 'once-human-beginner-guide',          cat: 'guides',  longueur: '1500-2500w', schema: 'Article + HowTo',      play: 'NON',              intention: 'Guide survival mechanics' },
      { pos: 4, type: 'BOF',      funnel: 'BOF',     titre: 'Is Once Human Worth Playing in 2026? — Honest Survival Game Review',                slug: 'once-human-worth-playing',           cat: 'guides',  longueur: '1500-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/once-human', intention: 'Décision worth it' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'How to Download Once Human on PC — Free Steam Install Guide 2026',                  slug: 'once-human-download-pc',             cat: 'guides',  longueur: '800-1200w',  schema: 'HowTo',                play: 'OUI /play/once-human', intention: 'Transactionnel CPI' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'Once Human vs The Day Before — Best Free Survival Game PC 2026',                    slug: 'once-human-vs-the-day-before',       cat: 'guides',  longueur: '1200-2000w', schema: 'Article + FAQPage',    play: 'OUI /play/once-human', intention: 'Comparatif CPI' },
    ],
  },
  {
    id: 11, jeu: 'Setup Hardware', score: '—',
    redacteur: 'Nathan Pierce', expert: 'Benchmarker', color: 'SETUP',
    articles: [
      { pos: 1, type: 'PILIER',   funnel: 'MOF',     titre: 'Best Budget Gaming PC Build 2026 — $600 That Runs Everything',                      slug: 'best-gaming-pc-budget-2026',         cat: 'setup',   longueur: '2000-3000w', schema: 'Article + ItemList',   play: 'NON (Amazon affiliate)', intention: 'Hub setup hardware' },
      { pos: 2, type: 'TOF',      funnel: 'TOF',     titre: 'PC Gaming Setup for Beginners 2026 — Everything You Need to Start',                 slug: 'pc-gaming-setup-beginners-2026',     cat: 'setup',   longueur: '1200-1800w', schema: 'Article',              play: 'NON (Amazon affiliate)', intention: 'Découverte setup' },
      { pos: 3, type: 'MOF',      funnel: 'MOF',     titre: 'Best Gaming Monitor 2026 — 1440p vs 4K vs 240Hz Compared',                          slug: 'best-gaming-monitor-2026',           cat: 'setup',   longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON (Amazon affiliate)', intention: 'Guide monitors' },
      { pos: 4, type: 'MOF',      funnel: 'MOF',     titre: 'Best Mechanical Keyboard for Gaming 2026 — Switch Guide Included',                  slug: 'best-mechanical-keyboard-2026',      cat: 'setup',   longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON (Amazon affiliate)', intention: 'Guide keyboards' },
      { pos: 5, type: 'COM 1',    funnel: 'BOF',     titre: 'Best Gaming Mouse 2026 — Lightweight vs Ergo vs Ambidextrous Picks',                slug: 'best-gaming-mouse-2026',             cat: 'setup',   longueur: '1500-2500w', schema: 'Article + ItemList',   play: 'NON (Amazon affiliate)', intention: 'Guide mice — achat' },
      { pos: 6, type: 'COM 2',    funnel: 'BOF',     titre: 'GPU Upgrade Guide 2026 — When to Upgrade and What GPU to Buy',                      slug: 'gpu-upgrade-guide-2026',             cat: 'setup',   longueur: '1500-2500w', schema: 'Article + HowTo',      play: 'NON (Amazon affiliate)', intention: 'Guide GPU — achat' },
    ],
  },
];

// ── Flatten all rows ──────────────────────────────────────────────────────────
const planHeaders = [
  '#', 'Cluster', 'Jeu', 'Score /10', 'Rédacteur', 'Expert Titres',
  'Position', 'Type', 'Funnel',
  'Titre H1 proposé', 'Slug', 'Catégorie',
  'Intention SEO', 'Longueur cible', 'Schema JSON-LD', '/play/ link',
  'Victor Kane cible', 'Score SEO cible',
  'Workflow A→Z', 'Statut',
];

const planRows = [];
let n = 1;
for (const c of clusters) {
  for (const a of c.articles) {
    planRows.push([
      n++,
      c.id,
      c.jeu,
      c.score,
      c.redacteur,
      c.expert,
      a.pos,
      a.type,
      a.funnel,
      a.titre,
      a.slug,
      a.cat,
      a.intention,
      a.longueur,
      a.schema,
      a.play,
      '≥ 10 / 12',
      '≥ 80 / 100',
      'Expert Titres → Rédacteur → Alex Mercer → Victor Kane → Expert SEO',
      'À PRODUIRE',
    ]);
  }
}

// ── Workbook ──────────────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new();

// ── Sheet 1 : Planning complet ────────────────────────────────────────────────
const ws1 = XLSX.utils.aoa_to_sheet([planHeaders, ...planRows]);
ws1['!cols'] = [
  { wch: 4  }, // #
  { wch: 8  }, // Cluster
  { wch: 26 }, // Jeu
  { wch: 10 }, // Score
  { wch: 16 }, // Rédacteur
  { wch: 16 }, // Expert Titres
  { wch: 8  }, // Position
  { wch: 10 }, // Type
  { wch: 10 }, // Funnel
  { wch: 72 }, // Titre H1
  { wch: 44 }, // Slug
  { wch: 10 }, // Catégorie
  { wch: 28 }, // Intention
  { wch: 14 }, // Longueur
  { wch: 22 }, // Schema
  { wch: 26 }, // /play/
  { wch: 14 }, // VK
  { wch: 14 }, // SEO
  { wch: 52 }, // Workflow
  { wch: 14 }, // Statut
];
ws1['!freeze'] = { xSplit: 0, ySplit: 1 };
XLSX.utils.book_append_sheet(wb, ws1, 'Planning 66 articles');

// ── Sheet 2 : Récap clusters ──────────────────────────────────────────────────
const recapH = ['#', 'Jeu', 'Score /10', 'Rédacteur', 'Expert Titres', 'PILIER', 'TOF', 'MOF', 'BOF', 'COM 1', 'COM 2', 'Total', 'Victor Kane min', 'SEO min'];
const recapR = clusters.map(c => [
  c.id, c.jeu, c.score, c.redacteur, c.expert,
  c.articles.find(a => a.type === 'PILIER')?.slug || '',
  c.articles.find(a => a.type === 'TOF')?.slug || '',
  c.articles.find(a => a.type === 'MOF')?.slug || '',
  c.articles.find(a => a.type === 'BOF')?.slug || '',
  c.articles.find(a => a.type === 'COM 1')?.slug || '',
  c.articles.find(a => a.type === 'COM 2')?.slug || '',
  c.articles.length,
  '10 / 12',
  '80 / 100',
]);
const ws2 = XLSX.utils.aoa_to_sheet([recapH, ...recapR]);
ws2['!cols'] = [
  { wch: 4 }, { wch: 26 }, { wch: 10 }, { wch: 16 }, { wch: 16 },
  { wch: 36 }, { wch: 36 }, { wch: 36 }, { wch: 36 }, { wch: 36 }, { wch: 36 },
  { wch: 8 }, { wch: 14 }, { wch: 12 },
];
ws2['!freeze'] = { xSplit: 0, ySplit: 1 };
XLSX.utils.book_append_sheet(wb, ws2, 'Récap Clusters');

// ── Sheet 3 : Ordre production ────────────────────────────────────────────────
const ordreH = ['Ordre global', 'Cluster #', 'Jeu', 'Type', 'Titre H1', 'Slug', 'Longueur', 'Workflow'];
const ordreR = [];
let o = 1;
const typeOrder = ['PILIER', 'TOF', 'MOF', 'BOF', 'COM 1', 'COM 2'];
for (const type of typeOrder) {
  for (const c of clusters) {
    const art = c.articles.find(a => a.type === type);
    if (art) {
      ordreR.push([o++, c.id, c.jeu, type, art.titre, art.slug, art.longueur,
        'Expert Titres → Rédacteur → Alex Mercer → Victor Kane (≥10/12) → Expert SEO (≥80/100)']);
    }
  }
}
const ws3 = XLSX.utils.aoa_to_sheet([ordreH, ...ordreR]);
ws3['!cols'] = [
  { wch: 12 }, { wch: 10 }, { wch: 26 }, { wch: 10 }, { wch: 68 }, { wch: 44 }, { wch: 14 }, { wch: 60 },
];
ws3['!freeze'] = { xSplit: 0, ySplit: 1 };
XLSX.utils.book_append_sheet(wb, ws3, 'Ordre Production');

// ── Sheet 4 : Règles qualité ──────────────────────────────────────────────────
const reglesData = [
  ['GRILLES DE QUALITÉ OBLIGATOIRES — RIGGAMER 2026', ''],
  ['', ''],
  ['VICTOR KANE — AUDIT 12 POINTS (minimum 10/12)', ''],
  ['Point', 'Ce qu\'on vérifie'],
  ['1', 'H1 unique · ≤ 65 chars'],
  ['2', 'Meta title ≤ 60 chars · excerpt ≤ 155 chars · mot-clé dans les deux'],
  ['3', 'Lien pilier jeu présent · max 3 liens · aucun lien vers article non publié'],
  ['4', 'Ancres descriptives (jamais "click here")'],
  ['5', '≥ 8 termes empreinte auteur · 0 mots interdits'],
  ['6', 'Longueur conforme au type (pilier/satellite/setup)'],
  ['7', 'Alt text sur toutes images · format WebP · screenshots gameplay réels'],
  ['8', 'Schema JSON-LD présent + 0 erreur syntaxe'],
  ['9', 'Lien /play/ dans corps + verdict box + rel="nofollow sponsored"'],
  ['10', 'date = aujourd\'hui · img définie · score renseigné si review'],
  ['11', 'Flesch ≥ 50 · Grade level ≤ 10'],
  ['12', 'Données chiffrées vérifiées · aucune hallucination sur stats jeu'],
  ['DÉCISION', '< 10/12 → RENVOYÉ en correction · ≥ 10/12 → VALIDÉ → Expert SEO'],
  ['', ''],
  ['EXPERT SEO — SCORE GLOBAL 100 POINTS (minimum 80/100)', ''],
  ['Critère', 'Points'],
  ['E-E-A-T (auteur identifié, heures jeu, données réelles, screenshots)', '25 pts'],
  ['Lisibilité (Flesch ≥50, phrases ≤25 mots, paragraphes ≤4 lignes)', '20 pts'],
  ['Technique (slug, date, img, alt text, meta, excerpt)', '20 pts'],
  ['Maillage interne (lien pilier + 1-2 satellites, ancres descriptives)', '15 pts'],
  ['Schema JSON-LD (type correct, 0 erreur syntaxe, rich result test OK)', '10 pts'],
  ['llms.txt (article ajouté sous sa catégorie jeu)', '10 pts'],
  ['DÉCISION', '< 80/100 → IDENTIFIER points faibles → CORRIGER → RE-SCORER · ≥ 80/100 → INSERT DB'],
  ['', ''],
  ['RÈGLE ABSOLUE', 'Aucun article inséré en DB et aucun push vers Cloudflare sans les 2 seuils atteints'],
];
const ws4 = XLSX.utils.aoa_to_sheet(reglesData);
ws4['!cols'] = [{ wch: 64 }, { wch: 20 }];
XLSX.utils.book_append_sheet(wb, ws4, 'Grilles Qualité');

// ── Write ─────────────────────────────────────────────────────────────────────
XLSX.writeFile(wb, OUTPUT);
const total = planRows.length;
console.log(`✅ ${OUTPUT}`);
console.log(`   ${total} articles · ${clusters.length} clusters · 4 onglets`);
