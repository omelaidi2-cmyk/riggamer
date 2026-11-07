-- CORRECTION URGENTE : Liens affiliés NTE
-- Remplace tous les liens directs perfectworld.com et /play/nte-steam
-- par le lien tracking AFBOOSTER : https://to.dordir.com/5C3A/2J2D6/
-- Appliqué sur tous les articles game = 'neverness-to-everness'

-- Remplacement lien long perfectworld.com
UPDATE articles
SET body = REPLACE(
  body,
  'https://nte.perfectworld.com/hot/260422down3/en/index.html?media_source=macannative&campaign_name=N2E_PRE_WW&campaign_id=211363108525053&ad_name=test&source_id=211_1997_G-783108&bg=30',
  'https://to.dordir.com/5C3A/2J2D6/'
)
WHERE game = 'neverness-to-everness';

-- Remplacement lien /play/nte-steam (redirect interne sans tracking)
UPDATE articles
SET body = REPLACE(
  body,
  '/play/nte-steam',
  'https://to.dordir.com/5C3A/2J2D6/'
)
WHERE game = 'neverness-to-everness';

-- Remplacement lien /play/neverness-to-everness (variante possible)
UPDATE articles
SET body = REPLACE(
  body,
  '/play/neverness-to-everness',
  'https://to.dordir.com/5C3A/2J2D6/'
)
WHERE game = 'neverness-to-everness';
