-- AJOUT BANNIÈRES AFBOOSTER — Article Pilier NTE (ID 39)
-- Bannière 728×146 leaderboard animée avant la section gameplay
-- Bannière 300×250 box banner avant la section monetization

UPDATE articles
SET body = REPLACE(
  body,
  '<h2 id="gameplay">NTE PC Gameplay: Open World, Combat & Graphics Quality</h2>',
  '<div class="banner-affilie banner-leaderboard">
  <a href="https://to.dordir.com/5C3A/2J2D6/" target="_blank" rel="noopener nofollow sponsored" aria-label="Télécharger Neverness to Everness sur Steam gratuitement">
    <img src="/media/nte-w.gif"
         alt="Neverness to Everness Steam télécharger gratuit 2026 RPG PC"
         width="728" height="146" loading="lazy"/>
  </a>
</div>

<h2 id="gameplay">NTE PC Gameplay: Open World, Combat & Graphics Quality</h2>'
)
WHERE id = 39;

UPDATE articles
SET body = REPLACE(
  body,
  '<h2 id="monetization">Monetization & Gacha System — What PC Players Actually Pay</h2>',
  '<div class="banner-affilie banner-box">
  <a href="https://to.dordir.com/5C3A/2J2D6/" target="_blank" rel="noopener nofollow sponsored" aria-label="Jouer à NTE gratuitement sur Steam">
    <img src="/media/nte-b.webp"
         alt="NTE Neverness to Everness jouer gratuitement Steam PC 2026"
         width="300" height="250" loading="lazy"/>
  </a>
</div>

<h2 id="monetization">Monetization & Gacha System — What PC Players Actually Pay</h2>'
)
WHERE id = 39;
