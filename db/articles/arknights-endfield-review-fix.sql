-- Fix 3 points audit : H1 (title), excerpt, date + H1 dans body + JSON-LD headline

UPDATE articles
SET
  title   = 'Arknights: Endfield Review 2026 — Best Strategy RPG on PC?',
  excerpt = 'Full PC review of Arknights: Endfield (2026). Gameplay, story on Talos-II, gacha system, F2P viability and Score RIGGAMER 7.7/10. Worth downloading?',
  date    = '2026-11-09',
  body    = REPLACE(REPLACE(REPLACE(body,
    'Arknights: Endfield Review 2026 — Is This the Best Strategy RPG on PC?',
    'Arknights: Endfield Review 2026 — Best Strategy RPG on PC?'),
    '"headline": "Arknights: Endfield Review 2026 — Is This the Best Strategy RPG on PC?"',
    '"headline": "Arknights: Endfield Review 2026 — Best Strategy RPG on PC?"'),
    '"dateModified": "2026-11-09"',
    '"dateModified": "2026-11-09"')
WHERE slug = 'arknights-endfield-review';
