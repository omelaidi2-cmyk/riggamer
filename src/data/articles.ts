export type Cat = 'guides' | 'news' | 'reviews' | 'setup';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  cat: Cat;
  date: string;
  readtime: number;
  img?: string;
  score?: string;
  game?: string;
}

const B = 'https://rigpeak.com/wp-content/uploads/2026/08/24/';

export const ARTICLES: Article[] = [
  // ── GUIDES ──────────────────────────────────────────────────────
  { slug: 'nte-tier-list',                  cat: 'guides',  title: 'NTE Tier List: Best Characters Ranked (September 2026)',               excerpt: 'Every character ranked for endgame content, reroll value, and banner priority.',                                         date: 'Sep 3, 2026',  readtime: 8,  game: 'NTE',           img: B+'nte-guides.jpg' },
  { slug: 'arknights-endfield-best-operators', cat: 'guides', title: 'Arknights: Endfield — Best Operators for New Players',              excerpt: 'Which operators to build first and which banners to skip completely.',                                                    date: 'Sep 1, 2026',  readtime: 10, game: 'Arknights',     img: B+'arknights-endfield-guides.jpg' },
  { slug: 'project-entropy-beginner-guide', cat: 'guides',  title: "Project Entropy: Beginner's Guide — First Week Roadmap",              excerpt: 'Everything you need to know in your first seven days to avoid the biggest mistakes.',                                   date: 'Aug 29, 2026', readtime: 12, game: 'Project Entropy', img: B+'project-entropy-guides.jpg' },
  { slug: 'raid-shadow-legends-champion-guide', cat: 'guides', title: 'RAID: Shadow Legends Champion Building Guide 2026',                excerpt: 'Stats, masteries, and gear sets explained — build your first 60-star champion correctly.',                               date: 'Aug 27, 2026', readtime: 9,  game: 'RAID',           img: B+'raid-shadow-legends-guides.png' },
  { slug: 'enlisted-beginner-squad-guide',  cat: 'guides',  title: 'Enlisted Squad Building Guide: Best Soldiers for Each Mode',          excerpt: 'How to structure your squad for Berlin, Normandy, and the Pacific.',                                                     date: 'Aug 25, 2026', readtime: 7,  game: 'Enlisted',       img: B+'enlisted-guides.jpg' },
  { slug: 'once-human-base-building',       cat: 'guides',  title: 'Once Human Base Building Guide: Defense & Resource Layout',           excerpt: 'Optimal base layouts that survive weekly resets and maximize resource output.',                                          date: 'Aug 22, 2026', readtime: 11, game: 'Once Human',     img: B+'once-human-guides.jpg' },
  { slug: 'rise-of-kingdoms-beginner',      cat: 'guides',  title: 'Rise of Kingdoms Beginner Guide: Best Civilization Tier List',        excerpt: 'Which civilization to pick, how to speed up your first City Hall levels, and rally etiquette.',                           date: 'Aug 20, 2026', readtime: 8,  game: 'RoK',            img: B+'rise-of-kingdoms-guides.png' },
  { slug: 'war-thunder-best-nation',        cat: 'guides',  title: 'War Thunder: Best Nation to Grind in 2026',                          excerpt: 'A tier list of all nations with BR spreads, top-tier vehicles, and grind cost compared.',                                 date: 'Aug 18, 2026', readtime: 9,  game: 'War Thunder',    img: B+'war-thunder-guides.jpg' },
  { slug: 'where-winds-meet-weapons',       cat: 'guides',  title: "Where Winds Meet Beginner's Guide: Weapons, Inner Power & Jianghu",   excerpt: 'No class lock, eight weapon types — pick your build without wasting early resources.',                                   date: 'Aug 15, 2026', readtime: 10, game: 'Where Winds Meet', img: B+'where-winds-meet-guides.jpg' },
  { slug: 'star-trek-fleet-command-guide',  cat: 'guides',  title: 'Star Trek Fleet Command: Complete Beginner Roadmap',                  excerpt: 'From your first ship to Faction missions — how to progress without spending real money.',                                  date: 'Aug 12, 2026', readtime: 13, game: 'Star Trek',      img: B+'star-trek-fleet-command-guides.webp' },

  // ── NEWS ────────────────────────────────────────────────────────
  { slug: 'nte-patch-notes-1-1',            cat: 'news',    title: 'NTE Patch 1.1 Notes: New Character, Map Expansion, Balance Changes',  excerpt: 'Everything in the September update including the Luofu urban area and two new banner characters.',                         date: 'Sep 4, 2026',  readtime: 5,  img: B+'nte-guides.jpg' },
  { slug: 'arknights-endfield-season-2',    cat: 'news',    title: 'Arknights Endfield Season 2 Release Date and Roadmap Confirmed',     excerpt: 'Hypergryph confirms late October content drop with three new operators and a world expansion.',                            date: 'Sep 2, 2026',  readtime: 4,  img: B+'arknights-endfield-guides.jpg' },
  { slug: 'war-thunder-new-vehicles',       cat: 'news',    title: 'War Thunder Dev Server: New Vehicles and Top-Tier Changes Datamined', excerpt: "Gaijin's September dev server reveals major top-tier rebalance and 12 new vehicles.",                                     date: 'Aug 31, 2026', readtime: 4,  img: B+'war-thunder-news.jpg' },
  { slug: 'once-human-season-3',            cat: 'news',    title: 'Once Human Season 3: New Scenario, Cross-Server Events Announced',   excerpt: 'Starry Studio confirms Season 3 launch date and introduces permanent server carry-over system.',                           date: 'Aug 28, 2026', readtime: 3,  img: B+'once-human-guides.jpg' },
  { slug: 'project-entropy-global-launch',  cat: 'news',    title: 'Project Entropy Global Launch: Day One Server Performance & Issues', excerpt: 'Server queue times, login errors, and first impressions from the global PC launch day.',                                   date: 'Aug 26, 2026', readtime: 5,  img: B+'project-entropy-guides.jpg' },
  { slug: 'raid-new-champion',              cat: 'news',    title: 'RAID Shadow Legends: New Void Legendary Revealed for Fusion Event',  excerpt: "Plarium unveils the next fusion Void Legendary — kit details and whether it's worth the grind.",                           date: 'Aug 24, 2026', readtime: 4,  img: B+'raid-shadow-legends-guides.png' },
  { slug: 'star-trek-event-recap',          cat: 'news',    title: 'Star Trek Fleet Command: Borg Arc Event Guide and Milestones',       excerpt: 'All milestone rewards, optimal grind paths, and whether the Borg cube refit is worth the tokens.',                          date: 'Aug 21, 2026', readtime: 6,  img: B+'star-trek-fleet-command-news.jpg' },
  { slug: 'enlisted-update-air',            cat: 'news',    title: 'Enlisted Air Superiority Update: Full Changelog and New Maps',      excerpt: "Gaijin expands Enlisted's air combat with three new maps and revised plane unlock trees.",                                   date: 'Aug 19, 2026', readtime: 4,  img: B+'enlisted-guides.jpg' },
  { slug: 'rise-of-kingdoms-kvk',          cat: 'news',    title: 'Rise of Kingdoms KvK Season 5 Meta Analysis: Best Commanders',      excerpt: 'Which commanders are dominating open-field and who got nerfed into irrelevance this KvK.',                                  date: 'Aug 16, 2026', readtime: 7,  img: B+'rise-of-kingdoms-news.jpg' },
  { slug: 'where-winds-meet-ps5-launch',    cat: 'news',    title: 'Where Winds Meet PS5 Launch: Cross-Save, Frame Rate Modes Detailed', excerpt: 'NetEase confirms PS5 cross-save with PC, 60fps performance mode, and 4K quality mode specs.',                              date: 'Aug 13, 2026', readtime: 3,  img: B+'where-winds-meet-news.jpg' },

  // ── REVIEWS ─────────────────────────────────────────────────────
  { slug: 'nte-review',                     cat: 'reviews', title: 'NTE: Neverness to Everness Review — Our Verdict',                    excerpt: 'The best urban open world in gacha gaming, paired with the most player-friendly banner system.',                             date: 'Aug 24, 2026', readtime: 9,  score: '7.8', img: 'https://rigpeak.com/wp-content/uploads/2026/08/31/nte-review-keyart.webp' },
  { slug: 'arknights-endfield-review',      cat: 'reviews', title: 'Arknights: Endfield Review — Worth the Four-Year Wait?',            excerpt: 'Stunning strategy combat and a deep world — undermined by a mid-game content wall.',                                          date: 'Aug 20, 2026', readtime: 11, score: '8.6', img: B+'arknights-endfield-guides.jpg' },
  { slug: 'project-entropy-review',         cat: 'reviews', title: 'Project Entropy Review — The Dark Horse PC Gacha of 2026',          excerpt: 'Punishing, stylish, and surprisingly fair on the wallet. A genuine competitor to the titans.',                               date: 'Aug 17, 2026', readtime: 10, score: '7.2', img: B+'project-entropy-guides.jpg' },
  { slug: 'once-human-review',              cat: 'reviews', title: 'Once Human Review — Survival Gaming Meets Live Service',            excerpt: 'Addictive survival loop and a great seasonal model, but the monetization needs work.',                                        date: 'Aug 14, 2026', readtime: 8,  score: '6.5', img: B+'once-human-guides.jpg' },
  { slug: 'enlisted-review',                cat: 'reviews', title: 'Enlisted Review 2026 — Still the Best Free WWII Shooter?',          excerpt: 'Three years in, Enlisted remains the most immersive free-to-play WWII game on PC.',                                           date: 'Aug 10, 2026', readtime: 9,  score: '6.8', img: B+'enlisted-guides.jpg' },
  { slug: 'where-winds-meet-review',        cat: 'reviews', title: 'Where Winds Meet Review — A Wuxia World Worth Getting Lost In',     excerpt: 'Breathtaking world-building and fluid combat, but the story pacing needs patience.',                                          date: 'Aug 6, 2026',  readtime: 12, score: '6.4', img: B+'where-winds-meet-reviews.jpg' },
  { slug: 'star-trek-fleet-command-review', cat: 'reviews', title: 'Star Trek Fleet Command Review — Strategy or Pay-to-Win?',          excerpt: 'The license is great, the mid-game is solid, but the late-game monetization is aggressive.',                                 date: 'Aug 2, 2026',  readtime: 8,  score: '6.4', img: B+'star-trek-fleet-command-reviews.jpg' },
  { slug: 'rise-of-kingdoms-review',        cat: 'reviews', title: 'Rise of Kingdoms Review — Best 4X Mobile Strategy of 2026?',       excerpt: 'Deep alliance politics and genuine strategic depth, but progress slows after City Hall 25.',                                  date: 'Jul 28, 2026', readtime: 10, score: '7.8', img: B+'rise-of-kingdoms-guides.png' },
  { slug: 'war-thunder-review',             cat: 'reviews', title: 'War Thunder Review 2026 — The Grind vs The Glory',                 excerpt: 'Unmatched vehicular combat depth, but the grind economy and monetization remain controversial.',                              date: 'Jul 24, 2026', readtime: 11, score: '7.6', img: B+'war-thunder-reviews.png' },
  { slug: 'raid-shadow-legends-review',     cat: 'reviews', title: 'RAID: Shadow Legends Review — Polished Gacha, Familiar Traps',     excerpt: 'Best-in-class production values and deep champion systems — the monetization is the ceiling.',                               date: 'Jul 20, 2026', readtime: 9,  score: '8.0', img: B+'raid-shadow-legends-guides.png' },

  // ── SETUP ────────────────────────────────────────────────────────
  { slug: 'best-gaming-pc-budget-2026',     cat: 'setup',   title: 'Best Budget Gaming PC Build 2026 — $600 That Runs Everything',      excerpt: 'A tested $600 build that hits 60fps on every game in our catalogue including NTE and Project Entropy.', date: 'Sep 2, 2026',  readtime: 14, img: B+'war-thunder-guides.jpg' },
  { slug: 'best-gaming-monitor-2026',       cat: 'setup',   title: 'Best Gaming Monitor 2026: 1440p vs 4K vs 240Hz',                   excerpt: 'We tested 12 monitors across three categories. Here are the three worth buying at each budget.',          date: 'Aug 28, 2026', readtime: 12, img: B+'nte-guides.jpg' },
  { slug: 'gaming-headset-guide',           cat: 'setup',   title: 'Best Gaming Headset 2026 — PC, PS5, and Cross-Platform Picks',     excerpt: 'Tested for gaming, Discord calls, and music. Sorted by budget from $40 to $300.',                         date: 'Aug 22, 2026', readtime: 10, img: B+'arknights-endfield-guides.jpg' },
  { slug: 'mechanical-keyboard-guide',      cat: 'setup',   title: 'Best Mechanical Keyboard for Gaming 2026 — Switch Guide Included', excerpt: 'Linear, tactile, or clicky — which switch for which game type, and the three keyboards we recommend.',     date: 'Aug 16, 2026', readtime: 9,  img: B+'enlisted-guides.jpg' },
  { slug: 'gaming-mouse-guide',             cat: 'setup',   title: 'Best Gaming Mouse 2026 — Lightweight vs Ergo vs Ambidextrous',     excerpt: 'Seven mice tested across 200 hours. Sorted by grip style, budget, and polling rate.',                      date: 'Aug 10, 2026', readtime: 8,  img: B+'project-entropy-guides.jpg' },
  { slug: 'gpu-upgrade-guide-2026',         cat: 'setup',   title: 'GPU Upgrade Guide 2026: When to Upgrade and What to Buy',          excerpt: 'Should you upgrade now or wait? A data-driven breakdown of the current GPU market by game and resolution.',  date: 'Aug 4, 2026',  readtime: 11, img: B+'raid-shadow-legends-guides.png' },
];

export function getByCategory(cat: Cat) {
  return ARTICLES.filter(a => a.cat === cat);
}

export function getLatest(n = 4) {
  return ARTICLES.slice(0, n);
}
