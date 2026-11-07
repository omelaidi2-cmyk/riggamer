# DAVID — FICHIER D'ÉTAT PERMANENT
# SOURCE DE VÉRITÉ : lu depuis D1 réel le 04/11/2026
# RÈGLE ABSOLUE : DAVID lit ce fichier EN PREMIER à chaque nouvelle session

---

## RÈGLES PUBLICATION
- 5h minimum entre chaque publication
- Pilier TOUJOURS avant satellites
- 1 satellite complet (Ph.04 → D1) avant le suivant
- D1 published=1 seulement quand 5h écoulées depuis dernier article live
- Mettre à jour ce fichier après CHAQUE action

---

## CLUSTER NTE — État vérifié D1 · 04/11/2026
Lien affilié : voir /gaming/contents/arknights-endfield/NTE/LIEN-AFFILIATION.txt

| ID | Slug | Published | Date |
|----|------|-----------|------|
| 39 | neverness-to-everness-steam | ✅ LIVE | 2026-11-01 |
| 40 | neverness-to-everness-tier-list | ✅ LIVE | 2026-11-03 |
| 41 | neverness-to-everness-f2p-guide | ✅ LIVE | 2026-11-04 · 00:21 |
| 42 | neverness-to-everness-review-2026 | ⏳ DRAFT | Publier à 05:21 (5h après id=41) |
| 43 | neverness-to-everness-worth-playing-2026 | ⏳ DRAFT | Publier 5h après id=42 |

**Commande publication id=42 :**
`npx wrangler d1 execute riggamer-db --remote --command "UPDATE articles SET published=1 WHERE id=42"`

**Commande publication id=43 :**
`npx wrangler d1 execute riggamer-db --remote --command "UPDATE articles SET published=1 WHERE id=43"`

---

## CLUSTER ARKNIGHTS ENDFIELD — En cours · Ph.04
Offer AFBOOSTER : ID 20116 | CPP $35 | Windows ONLY
Lien affilié : https://to.dordir.com/5C3A/2J3C3/
Redirect : /play/arknights-endfield
Expert Titres : Rhodes Intel | Rédacteur : Dr. Vance

### Phases complétées
- ✅ Ph.00 ROI Gate — CPI $35 ≥ $22 plancher
- ✅ Ph.01 Brief
- ✅ Ph.01b KW Research — 5 KW validés SERP
- ✅ Ph.02 Rhodes Intel — Cluster Card complète
- ✅ C1 Checkpoint — CONFORME
- ✅ Ph.03 Research — 6 faits chiffrés

### Cluster Card
| Article | Slug | H1 |
|---------|------|----|
| PILIER | arknights-endfield-complete-guide-2026 | Arknights Endfield Complete Guide 2026 — Operators, Reroll & F2P Tips |
| SAT 1 TOFU | arknights-endfield-tier-list-2026 | Arknights Endfield Tier List 2026 — Best Operators Ranked (Version 1.6) |
| SAT 2 MOFU | arknights-endfield-f2p-guide-2026 | Arknights Endfield F2P Guide 2026 — How to Play Without Spending a Dollar |
| SAT 3 BOFU | arknights-endfield-review-2026 | Arknights Endfield Review 2026 — Honest Verdict After 10 Months |
| SAT 4 BOFU | arknights-endfield-worth-playing-2026 | Is Arknights Endfield Worth Playing in 2026? |

### Visuels (D:\ADARBITRAGE\riggamer\public\media\)
| Fichier | Usage |
|---------|-------|
| ark-endfield-si-character-cover.webp | Cover PILIER |
| ark-endfield-tier-list-2026.webp | Cover SAT 1 |
| ark-endfield-beginner-guide.webp | Cover SAT 2 |
| ark-endfield-review-2026.webp | Cover SAT 3 |
| ark-endfield-worth-playing-2026.webp | Cover SAT 4 |
| ark-endfield-gameplay-closeup-1920x1080.jpg | Screenshot gameplay |
| ark-endfield-characters-walk-1920x1080.jpg | Screenshot personnages |
| ark-endfield-banner-728x90.webp | Bannière CTA |

### Prochaine action
⏭️ **Ph.07 Alex Mercer → Anti-IA PILIER `arknights-endfield-complete-guide-2026`**

---

## CLUSTERS EN ATTENTE (après Arknights)
| Cluster | Rédacteur | CPI | Priorité |
|---------|-----------|-----|----------|
| RAID Shadow Legends | Cole Merritt | $30 | 1 |
| Star Trek Fleet Command | Marcus Steel | $35 | 2 |
| Once Human | Colt Rivers | $26 | 3 |
| Rise of Kingdoms | Ethan Vale | $30 | 4 |
| War Thunder | Viktor Lenz | $22 | 5 |
| Project Entropy | Jake Cipher | $25 | 6 |
| Enlisted | Owen Nash | $22 | 7 |
| Where Winds Meet | River Stone | $28 | 8 |

---

## AFBOOSTER API
TOKEN : afb_b421cb2ac3dd69379ae463f3761cd9590f772455
BASE  : https://api.afbooster.com/v1

## ARKNIGHTS ENDFIELD — Offer corrigé
OFFER ID : 20333 (pas 20116)
LIEN     : https://to.dordir.com/5C3A/2J3C3/
_redirects : /play/arknights-endfield → 2J3C3 ✅

## CLUSTER ARKNIGHTS — État complet 05/11/2026

| ID | Slug | Phases | D1 | Published |
|----|------|--------|----|-----------|
| 44 | arknights-endfield-complete-guide-2026 | Ph.04→Ph.08 ✅ | ✅ | 0 DRAFT |
| 45 | arknights-endfield-tier-list-2026 | Ph.04→Ph.08 ✅ | ✅ | 0 DRAFT |
| 46 | arknights-endfield-f2p-guide-2026 | Ph.04→Ph.08 ✅ | ✅ | 0 DRAFT |
| 47 | arknights-endfield-review-2026 | Ph.04→Ph.08 ✅ | ✅ | 0 DRAFT |
| 48 | arknights-endfield-worth-playing-2026 | Ph.04→Ph.08 ✅ | ✅ | 0 DRAFT |

⏭️ Prochaine étape : Publication M. Abdelrahim donne le "GO" → published=1 article par article (5h entre chaque)

## LOG ACTIONS
| Date | Heure | Action |
|------|-------|--------|
| 04/11/2026 | 00:21 | NTE SAT 2 (id=41) publié |
| 04/11/2026 | 00:45 | Création DAVID-STATE.md |
| 04/11/2026 | 01:15 | Pilier Arknights Ph.04→Ph.08 complété |
| 04/11/2026 | 01:20 | Offer ID corrigé 20116→20333 · lien 2J3C3 confirmé dashboard |
| 05/11/2026 | session | 5 articles Arknights insérés en D1 DRAFT (id 44-48) |
