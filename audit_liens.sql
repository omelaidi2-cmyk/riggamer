SELECT
  id, slug, game,
  CASE WHEN body LIKE '%to.dordir.com%' THEN 'TRACKING-OK' ELSE 'SANS-TRACKING' END as affilie,
  CASE WHEN body LIKE '%perfectworld.com%' THEN 'DANGER' ELSE 'PROPRE' END as perfectworld,
  CASE WHEN body LIKE '%/play/%' THEN 'REDIRECT-INTERNE' ELSE 'PROPRE' END as play_redirect
FROM articles
ORDER BY id;
