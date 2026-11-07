-- MISE À JOUR SAT 3 (ID 42) — Ajout 3 points manquants détectés par SERP
-- 1. No 50/50 mechanic — injecté dans section gacha
-- 2. Life-sim elements — injecté dans section open world
-- 3. Story dip ch.2-3 — injecté dans section combat/story

-- 1. No 50/50 — ajout dans section gacha (après la figcaption)
UPDATE articles
SET body = REPLACE(
  body,
  '<p>The gacha structure is standard: limited banner characters, weapon banners, soft pity before hard pity at 90.',
  '<p><strong>The biggest F2P advantage NTE has over competitors: no 50/50.</strong> Every S-rank pulled on a limited banner is the featured character — guaranteed. Compare that to Genshin Impact or Zenless Zone Zero where your first S-rank has a 50% chance of being the wrong character, requiring up to 180 pulls to guarantee the one you want. NTE cuts that cost in half. For F2P players, this is a significant structural advantage that most reviews understate.</p>

<p>The gacha structure beyond that is standard: limited banner characters, weapon banners, soft pity before hard pity at 90.'
)
WHERE id = 42;

-- 2. Life-sim elements — ajout dans section open world (après le paragraphe Hethereau)
UPDATE articles
SET body = REPLACE(
  body,
  '<p>The density is the strength. New areas unlock through story progression and feel meaningfully distinct.',
  '<p>Beyond combat, NTE includes a life-sim layer that separates it from every other gacha RPG in 2026 — dating mechanics, fishing, street racing, and managing a small shop in Hethereau. These are not tacked-on mini-games. They are woven into the daily loop and give the city a texture that pure combat games cannot replicate. If you have ever wanted a gacha game where fighting is one thing you do rather than the only thing, NTE is currently the only option in the genre.</p>

<p>The density is the strength. New areas unlock through story progression and feel meaningfully distinct.'
)
WHERE id = 42;

-- 3. Story dip ch.2-3 — ajout dans section F2P (après le paragraphe story)
UPDATE articles
SET body = REPLACE(
  body,
  '<p><strong>What does not work:</strong></p>',
  '<p><strong>Story note:</strong> Chapter 1 builds genuine momentum — the premise and the city setup land well. Chapters 2 and 3 stall. The narrative shifts toward anime-quirky dialogue when the world-building should be carrying the weight. The dip is real and reviewers across the board flag it. It recovers by Chapter 4, but set expectations accordingly for the mid-game.</p>

<p><strong>What does not work:</strong></p>'
)
WHERE id = 42;
