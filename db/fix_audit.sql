-- ═══════════════════════════════════════════════════════════════
-- FIX AUDIT RIGGAMER — Corrections des écarts workflow
-- Date : 2026-10-08
-- Exécuter : npx wrangler d1 execute riggamer-db --remote --file=db/fix_audit.sql
-- ═══════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────
-- FIX 1 — CANNIBALISATION NTE
-- Dépublier nte-review (pas de body, doublon de neverness-to-everness-worth-playing)
-- Pilier NTE officiel → neverness-to-everness-worth-playing
-- ───────────────────────────────────────────────────────────────

UPDATE articles SET published = 0 WHERE slug = 'nte-review';


-- ───────────────────────────────────────────────────────────────
-- FIX 2 — CHAMP `game` NULL SUR LES REVIEWS
-- ───────────────────────────────────────────────────────────────

UPDATE articles SET game = 'NTE'           WHERE slug = 'nte-review';
UPDATE articles SET game = 'NTE'           WHERE slug = 'neverness-to-everness-worth-playing';
UPDATE articles SET game = 'Arknights'     WHERE slug = 'arknights-endfield-review';
UPDATE articles SET game = 'Project Entropy' WHERE slug = 'project-entropy-review';
UPDATE articles SET game = 'Once Human'    WHERE slug = 'once-human-review';
UPDATE articles SET game = 'Enlisted'      WHERE slug = 'enlisted-review';
UPDATE articles SET game = 'Where Winds Meet' WHERE slug = 'where-winds-meet-review';
UPDATE articles SET game = 'Star Trek'     WHERE slug = 'star-trek-fleet-command-review';
UPDATE articles SET game = 'RoK'           WHERE slug = 'rise-of-kingdoms-review';
UPDATE articles SET game = 'War Thunder'   WHERE slug = 'war-thunder-review';
UPDATE articles SET game = 'RAID'          WHERE slug = 'raid-shadow-legends-review';


-- ───────────────────────────────────────────────────────────────
-- FIX 3 — CHAMP `game` NULL SUR LES NEWS
-- ───────────────────────────────────────────────────────────────

UPDATE articles SET game = 'NTE'           WHERE slug = 'nte-patch-notes-1-1';
UPDATE articles SET game = 'Arknights'     WHERE slug = 'arknights-endfield-season-2';
UPDATE articles SET game = 'War Thunder'   WHERE slug = 'war-thunder-new-vehicles';
UPDATE articles SET game = 'Once Human'    WHERE slug = 'once-human-season-3';
UPDATE articles SET game = 'Project Entropy' WHERE slug = 'project-entropy-global-launch';
UPDATE articles SET game = 'RAID'          WHERE slug = 'raid-new-champion';
UPDATE articles SET game = 'Star Trek'     WHERE slug = 'star-trek-event-recap';
UPDATE articles SET game = 'Enlisted'      WHERE slug = 'enlisted-update-air';
UPDATE articles SET game = 'RoK'           WHERE slug = 'rise-of-kingdoms-kvk';
UPDATE articles SET game = 'Where Winds Meet' WHERE slug = 'where-winds-meet-ps5-launch';


-- ───────────────────────────────────────────────────────────────
-- FIX 4 — URLs IMAGES : rigpeak.com → /media/ (fichiers disponibles localement)
-- ───────────────────────────────────────────────────────────────

-- GUIDES
UPDATE articles SET img = '/media/nte-guides.jpg'
  WHERE slug = 'nte-tier-list';

UPDATE articles SET img = '/media/arknights-endfield-guides.jpg'
  WHERE slug = 'arknights-endfield-best-operators';

UPDATE articles SET img = '/media/project-entropy-guides.jpg'
  WHERE slug = 'project-entropy-beginner-guide';

UPDATE articles SET img = '/media/raid-shadow-legends-guides.png'
  WHERE slug = 'raid-shadow-legends-champion-guide';

UPDATE articles SET img = '/media/enlisted-guides.jpg'
  WHERE slug = 'enlisted-beginner-squad-guide';

UPDATE articles SET img = '/media/rise-of-kingdoms-guides.png'
  WHERE slug = 'rise-of-kingdoms-beginner';

UPDATE articles SET img = '/media/war-thunder-guides.jpg'
  WHERE slug = 'war-thunder-best-nation';

UPDATE articles SET img = '/media/star-trek-fleet-command-guides.webp'
  WHERE slug = 'star-trek-fleet-command-guide';

-- GUIDES — images non disponibles localement (conserver rigpeak temporairement)
-- once-human-base-building     → once-human-guides.jpg    ← À CRÉER dans /media/
-- where-winds-meet-weapons     → where-winds-meet-guides.jpg ← À CRÉER dans /media/

-- NEWS
UPDATE articles SET img = '/media/nte-guides.jpg'
  WHERE slug = 'nte-patch-notes-1-1';

UPDATE articles SET img = '/media/arknights-endfield-guides.jpg'
  WHERE slug = 'arknights-endfield-season-2';

UPDATE articles SET img = '/media/war-thunder-news.jpg'
  WHERE slug = 'war-thunder-new-vehicles';

UPDATE articles SET img = '/media/project-entropy-guides.jpg'
  WHERE slug = 'project-entropy-global-launch';

UPDATE articles SET img = '/media/raid-shadow-legends-guides.png'
  WHERE slug = 'raid-new-champion';

UPDATE articles SET img = '/media/star-trek-fleet-command-news.jpg'
  WHERE slug = 'star-trek-event-recap';

UPDATE articles SET img = '/media/enlisted-guides.jpg'
  WHERE slug = 'enlisted-update-air';

UPDATE articles SET img = '/media/rise-of-kingdoms-news.jpg'
  WHERE slug = 'rise-of-kingdoms-kvk';

-- NEWS — images non disponibles localement (conserver rigpeak temporairement)
-- once-human-season-3          → once-human-guides.jpg    ← À CRÉER dans /media/
-- where-winds-meet-ps5-launch  → where-winds-meet-news.jpg ← À CRÉER dans /media/

-- REVIEWS
UPDATE articles SET img = '/media/nte-review-keyart-v2.webp'
  WHERE slug = 'nte-review';

UPDATE articles SET img = '/media/arknights-endfield-guides.jpg'
  WHERE slug = 'arknights-endfield-review';

UPDATE articles SET img = '/media/project-entropy-guides.jpg'
  WHERE slug = 'project-entropy-review';

UPDATE articles SET img = '/media/enlisted-guides.jpg'
  WHERE slug = 'enlisted-review';

UPDATE articles SET img = '/media/star-trek-fleet-command-reviews.jpg'
  WHERE slug = 'star-trek-fleet-command-review';

UPDATE articles SET img = '/media/rise-of-kingdoms-guides.png'
  WHERE slug = 'rise-of-kingdoms-review';

UPDATE articles SET img = '/media/raid-shadow-legends-guides.png'
  WHERE slug = 'raid-shadow-legends-review';

-- REVIEWS — images non disponibles localement (conserver rigpeak temporairement)
-- once-human-review            → once-human-guides.jpg    ← À CRÉER dans /media/
-- where-winds-meet-review      → where-winds-meet-reviews.jpg ← À CRÉER dans /media/
-- war-thunder-review           → war-thunder-reviews.png  ← À CRÉER dans /media/


-- ───────────────────────────────────────────────────────────────
-- FIX 5 — IMAGES SETUP INCOHÉRENTES
-- Remplacer les images de jeux par des noms dédiés hardware
-- ⚠️  Ces fichiers n'existent pas encore — les créer dans /media/
-- ───────────────────────────────────────────────────────────────

UPDATE articles SET img = '/media/best-gaming-pc-budget-2026-cover.webp'
  WHERE slug = 'best-gaming-pc-budget-2026';

UPDATE articles SET img = '/media/best-gaming-monitor-2026-cover.webp'
  WHERE slug = 'best-gaming-monitor-2026';

UPDATE articles SET img = '/media/gaming-headset-guide-cover.webp'
  WHERE slug = 'gaming-headset-guide';

UPDATE articles SET img = '/media/mechanical-keyboard-guide-cover.webp'
  WHERE slug = 'mechanical-keyboard-guide';

UPDATE articles SET img = '/media/gaming-mouse-guide-cover.webp'
  WHERE slug = 'gaming-mouse-guide';

UPDATE articles SET img = '/media/gpu-upgrade-guide-2026-cover.webp'
  WHERE slug = 'gpu-upgrade-guide-2026';


-- ───────────────────────────────────────────────────────────────
-- FIX 6 — LIEN INTERNE BRISÉ dans neverness-to-everness-worth-playing
-- Supprimer le lien vers /reviews/neverness-to-everness-vs-genshin (article inexistant)
-- ───────────────────────────────────────────────────────────────

UPDATE articles
SET body = REPLACE(
  body,
  '<a href="/reviews/neverness-to-everness-vs-genshin" class="rg-volt-link">See our full NTE vs Genshin comparison →</a>',
  'NTE vs Genshin is a comparison worth making — the gacha gap alone justifies the download.'
)
WHERE slug = 'neverness-to-everness-worth-playing';


-- ───────────────────────────────────────────────────────────────
-- FIX 7 — MAILLAGE : ajouter lien pilier dans nte-pc-download-guide
-- Lien obligatoire → neverness-to-everness-worth-playing (pilier NTE)
-- ───────────────────────────────────────────────────────────────

UPDATE articles
SET body = REPLACE(
  body,
  '<p>Over 15 million players joined NTE in its first month. The r/gachagaming community has been
  calling it the most polished free-to-play PC launch of 2026. This guide tells you exactly how to
  get it running — what your PC needs, how to install it in five steps, and why the launch window
  you''re in right now is the best possible time to start.</p>',
  '<p>Over 15 million players joined NTE in its first month. The r/gachagaming community has been
  calling it the most polished free-to-play PC launch of 2026. This guide tells you exactly how to
  get it running — what your PC needs, how to install it in five steps, and why the launch window
  you''re in right now is the best possible time to start. Already running NTE and want to know if
  it''s worth the long haul? Read our <a href="/reviews/neverness-to-everness-worth-playing" class="rg-volt-link">full NTE review 2026 →</a></p>'
)
WHERE slug = 'nte-pc-download-guide';


-- ───────────────────────────────────────────────────────────────
-- FIX 8 — SCHEMA JSON-LD : injecter dans les 2 articles avec body
-- ───────────────────────────────────────────────────────────────

-- Schema pour neverness-to-everness-worth-playing (Review + VideoGame)
UPDATE articles
SET body = '<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Review", "VideoGame"],
  "name": "NTE: Neverness to Everness",
  "reviewBody": "No 50/50, 418 free pulls, full story free. The strongest free-to-play gacha launch of 2026.",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "8.0",
    "bestRating": "10",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": "Ash Reeves"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RigGamer"
  },
  "gamePlatform": ["PC", "PS5", "iOS", "Android"],
  "genre": "Gacha RPG",
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "datePublished": "2026-09-20"
}
</script>
' || body
WHERE slug = 'neverness-to-everness-worth-playing';

-- Schema pour nte-pc-download-guide (Article + HowTo)
UPDATE articles
SET body = '<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Article", "HowTo"],
  "name": "NTE: Neverness to Everness Is Free on PC — How to Download",
  "description": "Step-by-step guide to download and install NTE on PC in under 10 minutes.",
  "author": {
    "@type": "Person",
    "name": "Ash Reeves"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RigGamer"
  },
  "about": {
    "@type": "VideoGame",
    "name": "NTE: Neverness to Everness",
    "gamePlatform": ["PC", "PS5", "iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  },
  "step": [
    {"@type": "HowToStep", "text": "Click the official download link and land on the NTE download page."},
    {"@type": "HowToStep", "text": "Click Download Free and run the installer (~25 GB)."},
    {"@type": "HowToStep", "text": "Launch the NTE client and create your account in 60 seconds."},
    {"@type": "HowToStep", "text": "Complete the opening sequence and tutorial."},
    {"@type": "HowToStep", "text": "Claim your launch rewards from the in-game mailbox."}
  ],
  "datePublished": "2026-09-16"
}
</script>
' || body
WHERE slug = 'nte-pc-download-guide';


-- ───────────────────────────────────────────────────────────────
-- VÉRIFICATION FINALE
-- ───────────────────────────────────────────────────────────────

-- Vérifier la cannibalisation corrigée
SELECT slug, title, published FROM articles WHERE game = 'NTE' AND cat = 'reviews';

-- Vérifier les champs game renseignés
SELECT slug, cat, game FROM articles WHERE game IS NULL AND cat IN ('reviews','news');

-- Vérifier les images setup corrigées
SELECT slug, img FROM articles WHERE cat = 'setup';

-- Vérifier les articles avec body
SELECT slug, cat, game, length(body) as body_length FROM articles WHERE body IS NOT NULL ORDER BY body_length DESC;
