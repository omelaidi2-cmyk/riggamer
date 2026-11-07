-- CORRECTION MAILLAGE NTE — 07/11/2026
-- Règle M. Abdelrahim : Satellite → Pilier OBLIGATOIRE · max 3 liens · Pilier → Satellite INTERDIT

-- ============================================================
-- 1. TIER LIST — Remplacer 1er CTA (doublon review) par lien pilier
-- Avant : 2 liens vers review-2026
-- Après : 1 lien pilier (OBLIGATOIRE) + 1 lien review (satellite connexe) = 2 liens
-- ============================================================
UPDATE articles
SET body = REPLACE(
  body,
  '<div class="cta-bloc">
  <p>👉 <a href="/neverness-to-everness-review-2026"><strong>Lire notre review complète NTE 2026</strong> — vaut-il vraiment le coup ?</a></p>
</div>

<h2>Guide Reroll NTE — Quel Personnage Viser</h2>',
  '<div class="cta-bloc">
  <p>👉 <a href="/neverness-to-everness-steam"><strong>Neverness to Everness sur Steam</strong> — tout sur la version PC</a></p>
</div>

<h2>Guide Reroll NTE — Quel Personnage Viser</h2>'
)
WHERE slug = 'neverness-to-everness-tier-list';

-- ============================================================
-- 2. WORTH PLAYING — Supprimer le lien review-2026 (4 liens → 3)
-- Garder : pilier (steam) + tier-list + f2p-guide
-- Supprimer : review-2026 (redondant avec worth-playing)
-- ============================================================
UPDATE articles
SET body = REPLACE(
  body,
  '  <p>→ <a href="/neverness-to-everness-steam"><strong>NTE on Steam — Full PC Download Guide</strong></a></p>
  <p>→ <a href="/neverness-to-everness-tier-list"><strong>NTE Tier List 2026 — Best Characters to Pull</strong></a></p>
  <p>→ <a href="/neverness-to-everness-f2p-guide"><strong>NTE F2P Guide — Manage Your Resources</strong></a></p>
  <p>→ <a href="/neverness-to-everness-review-2026"><strong>NTE Full Review 2026 — Honest Verdict After 3 Months</strong></a></p>',
  '  <p>→ <a href="/neverness-to-everness-steam"><strong>NTE on Steam — Full PC Download Guide</strong></a></p>
  <p>→ <a href="/neverness-to-everness-tier-list"><strong>NTE Tier List 2026 — Best Characters to Pull</strong></a></p>
  <p>→ <a href="/neverness-to-everness-f2p-guide"><strong>NTE F2P Guide — Manage Your Resources</strong></a></p>'
)
WHERE slug = 'neverness-to-everness-worth-playing-2026';
