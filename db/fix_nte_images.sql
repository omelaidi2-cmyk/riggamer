-- Fix NTE Review — img field + injection screenshots dans le body
-- 2026-10-08

UPDATE articles SET
  img  = '/media/nte-review-keyart-v2.webp',
  body = REPLACE(REPLACE(REPLACE(
    body,

    -- Screenshot 1 : combat — après H2-2 intro paragraph
    '<p>Combat is Resonator-based.',
    '<img src="/media/nte-review-combat.webp" alt="NTE Resonator combat abilities in action — patch v1.1" width="1200" height="630" loading="lazy"/>
<p>Combat is Resonator-based.',

    -- Screenshot 2 : open world — après exploration paragraph
    '<p>Exploration feels genuinely rewarding.',
    '<img src="/media/nte-review-city.webp" alt="NTE open world urban map aerial view 2026" width="1200" height="630" loading="lazy"/>
<p>Exploration feels genuinely rewarding.'
  ),

    -- Screenshot 3 : gacha/banner — avant le tableau gacha
    '<table>
  <thead>
    <tr>
      <th>Pull Type</th>',
    '<img src="/media/nte-review-gacha.webp" alt="NTE banner pity counter interface showing pull progress" width="1200" height="630" loading="lazy"/>
<table>
  <thead>
    <tr>
      <th>Pull Type</th>'
  )
WHERE slug = 'neverness-to-everness-review';
