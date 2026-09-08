# RigGamer — Procédure de déploiement rapide

## Projet Astro
```
D:/ADARBITRAGE/riggamer/
```

## Commandes (toujours avec TMP sur D: car C: est plein à 100%)

```bash
cd /d/ADARBITRAGE/riggamer

git add <fichiers>

TMP=/d/tmp TEMP=/d/tmp GIT_TMPDIR=/d/tmp git commit -m "description"

TMP=/d/tmp TEMP=/d/tmp GIT_TMPDIR=/d/tmp git push origin main
```

→ Cloudflare Pages redéploie automatiquement en 1-2 min après le push.

## Repo GitHub
https://github.com/omelaidi2-cmyk/riggamer.git  (branche : main)

## Pages à modifier
- src/pages/index.astro        — Homepage
- src/pages/guides/index.astro — Hub Guides
- src/pages/news/index.astro   — Hub News
- src/pages/reviews/index.astro— Hub Reviews
- src/pages/setup/index.astro  — Hub Setup
- src/components/Banner.astro  — Composant bannière
- src/styles/global.css        — CSS global

## Tailles bannières
| size | dimensions   | mobile |
|------|-------------|--------|
| wide | 728×146px   | → 100% |
| box  | 300×250px   | OK     |
| sky  | 160×600px   | caché  |
| flow | 100% width  | OK     |

## Règle mobile (< 900px)
- .banner-desktop → caché
- .banner-mobile  → visible (doit toujours avoir du contenu !)
