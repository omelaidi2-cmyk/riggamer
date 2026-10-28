# WORKFLOW RIGGAMER — 12 ÉTAPES COMPLÈTES

---

## AVANT DE COMMENCER — Checklist d'ouverture de session

- [ ] Lire ce workflow (ou les sections pertinentes)
- [ ] Copier le BLOC INJECTION AGENT → coller en tête de chaque prompt agent
- [ ] Identifier le cluster en cours (1 jeu à la fois)
- [ ] Confirmer que le pilier du jeu est publié avant tout satellite
- [ ] Lire la fiche auteur assigné dans FICHES-AGENTS-RIGGAMER.md
- [ ] Vérifier l'anti-cannibalisation avant tout nouveau brief

> **Règle fondamentale :** 1 cluster = 1 jeu. Publier le pilier du jeu EN PREMIER, puis les satellites dans l'ordre TOF → MOF → BOF → COM1 → COM2. Les news sont hors cluster — circuit court uniquement.

> **Structure cluster obligatoire :** 1 PILIER + 1 TOF + 1 MOF + 1 BOF + 1 COMMERCIAL 1 (download/install CPI) + 1 COMMERCIAL 2 (comparatif CPI) = **6 articles par cluster**

> **Seuils qualité obligatoires (bloquants) :**
> - Victor Kane : **minimum 10/12** — article renvoyé en correction si < 10
> - Score SEO global : **minimum 80/100** — vérifier lisibilité + E-E-A-T + technique
> - Les deux seuils doivent être atteints avant toute insertion en D1 ou push vers Cloudflare

---

## ÉTAPE 1 — VALIDATION JEU + PROTOCOLE 4 TESTS

⏱ 1 à 2 semaines · Une seule fois par jeu

**Critères rapides (5 min) — si 1 seul NON → abandonner :**

| Question | Seuil |
|----------|-------|
| RPM estimé > $8 ? | Gaming = $5-15 ✅ |
| Trafic Tier 1 > 70% ? | US/UK/CA/AU/DE ✅ |
| Offre CPI/CPP/CPA active pour ce jeu ? | Réseau affil actif ✅ |
| 8 sujets distincts possibles sur ce jeu ? | ✅ |

**Test 1 — Thématique (~2h)**
- [ ] Sites concurrents (IGN, PC Gamer, GamesRadar) ont-ils des articles sur ce jeu ?
- [ ] Trafic SimilarWeb des concurrents > 20k/mois sur le jeu ?
- [ ] Offre CPI confirmée sur réseau (Adgem, Adjoe, Ayetstudios...) ?

**Test 2 — SEO (~1 semaine)**
- [ ] KD < 40 sur 3 satellites minimum
- [ ] Volume > 300 sur mots-clés satellites (gaming = volumes plus modestes)
- [ ] CPC > $0,50 sur mots-clés principaux
- [ ] Top 10 non verrouillé par IGN / Wikipedia / Fandom

**Test 3 — Affiliation CPI/CPA (~1 semaine)**
- [ ] Taux CPI confirmé (objectif > $5/install)
- [ ] Jeu actif depuis < 2 ans (pas de jeu abandonné)
- [ ] Tracking disponible (pixel ou lien tracké réseau)
- [ ] Paiement par install, non par clic

**Test 4 — Économique (~$100-150 · le seul test réel)**
1. Publier 1 article guide ou review avec lien `/play/[slug]`
2. Router ~$100-150 de trafic (Facebook Ads ou Google Ads)
3. Mesurer le RPV réel :
   - RPV > CPC → SCALER ✅
   - $0,10 < RPV < CPC → viable SEO organique uniquement
   - RPV < $0,10 → ABANDONNER ❌

---

## ÉTAPE 2 — ANALYSE CONCURRENTIELLE

⏱ 45 min · Obligatoire avant TOUT article

- [ ] Ouvrir Google en navigation privée
- [ ] Analyser les 5 premiers résultats organiques :
  - H1 exact + angle pris
  - H2 principaux couverts
  - Données utilisées (tier list, stats jeu, comparaisons)
  - E-E-A-T : auteur gamer identifié ? screenshots gameplay ? heures de jeu mentionnées ?
  - Ce qu'ils ont RATÉ = notre avantage

Concurrents cibles à surveiller : IGN, PC Gamer, GamesRadar, GameWith, Fandom wikis, Reddit

- [ ] Extraire :
  - Données que tous utilisent (à avoir aussi)
  - Données manquantes (Score RigGamer = notre arme)
  - Angle non couvert = notre différenciation
  - Questions PAA non traitées = notre FAQ

---

## ÉTAPE 3 — KEYWORD SCOUT + LISTE SUJETS

⏱ 30 min

**Génération liste (prompt Claude) :**
```
Génère une liste de sujets pour le jeu "[NOM JEU]" sur RigGamer.
Format : Sujet | Intention | Niveau (pilier/satellite/news) | Priorité
Règles : intentions distinctes · min 10 sujets · 1 seul pilier · news séparées
Articles déjà publiés sur ce jeu : [liste complète → anti-cannibalisation]
```

**Validation mot-clé :**

| Critère | Satellite | Pilier |
|---------|-----------|--------|
| Volume | 300-10 000 | 1 000-30 000 |
| KD | < 40 | < 60 |
| CPC | > $0,50 | > $1 |

**Anti-cannibalisation obligatoire :**
```sql
-- Vérifier dans la base D1 avant tout nouvel article
SELECT slug, title FROM articles WHERE game = '[nom_jeu]' AND published = 1;
```
→ Doublon d'intention détecté → enrichir l'existant, jamais créer un nouvel article

**5 intentions gaming à couvrir :**
- Informationnelle : "how to", "what is", "explained"
- Guide/optimisation : "tier list", "best build", "beginner guide"
- Comparative : "vs", "which is better"
- Commerciale : "review", "worth playing", "is it free to play"
- Transactionnelle gaming : "download", "play free", "install on pc"

---

## ÉTAPE 4 — SERP ANALYZER + CARTE CLUSTER PAR JEU

⏱ 30 min

**Cartographier le cluster (ratio : 1 pilier pour 4-8 satellites) :**

```
CLUSTER NTE (Neverness to Everness)
PILIER    : nte-review                              (commerciale · MOF)
  ├── SAT 1 : nte-tier-list-2026                   (guide · MOF)
  ├── SAT 2 : nte-beginner-guide                   (informationnelle · TOF)
  ├── SAT 3 : nte-best-characters                  (guide · MOF)
  ├── SAT 4 : nte-reroll-guide                     (guide · BOF)
  └── MONO  : nte-download-pc                      (transactionnelle · BOF → /play/)

CLUSTER STAR TREK FLEET COMMAND
PILIER    : star-trek-fleet-command-review         (commerciale · MOF)
  ├── SAT 1 : star-trek-fleet-command-guide        (informationnelle · TOF)
  ├── SAT 2 : star-trek-fleet-command-best-ships   (guide · MOF)
  └── MONO  : star-trek-fleet-command-download     (transactionnelle · BOF → /play/)

CLUSTER SETUP (hardware — cross-jeux)
PILIER    : best-gaming-pc-budget-2026             (commerciale · MOF)
  ├── SAT 1 : best-gaming-monitor-2026             (commerciale · MOF)
  ├── SAT 2 : best-gaming-headset-2026             (commerciale · MOF)
  └── SAT 3 : gpu-upgrade-guide-2026               (informationnelle · TOF)

NEWS → hors cluster, circuit court uniquement
```

**Vérifier l'ordre de publication :**
```
Pilier du jeu publié ?
→ OUI → créer les satellites
→ NON → rédiger le pilier D'ABORD

Pilier + 1 satellite publiés ?
→ OUI → créer les monétisables /play/

Article news ?
→ Circuit court direct (étapes 5 → 9 → 10, sans auditeur)
```

---

## ÉTAPE 5 — FICHES AGENTS + BRIEF + EXEMPLAR

⏱ 45 min

**5 agents — ordre d'intervention :**

```
① Expert Titres  → valide les données + produit H1 + tous les H2
② Rédacteur      → corps de l'article (reçoit ①)
③ Alex Mercer    → supprime les traces IA (passe technique) + injecte la voix jeu (passe créative)
④ Auditeur       → 12 checks qualité (valide ou renvoie)
⑤ Expert SEO     → Schema JSON-LD + llms.txt + optimisation technique

Agents ① et ② = dédiés par jeu
Agents ③, ④ et ⑤ = partagés entre tous les jeux
```

**Tableau agents par jeu :**

| Jeu | Expert Titres | Rédacteur |
|-----|---------------|-----------|
| NTE | Kai Voss | Ash Reeves |
| Star Trek FC | Commander Vega | Marcus Steel |
| RAID | Doc Champion | Cole Merritt |
| War Thunder | Panzer Ace | Viktor Lenz |
| Arknights EF | Rhodes Intel | Dr. Vance |
| Project Entropy | Entropy Scout | Jake Cipher |
| Enlisted | Sergeant Rex | Owen Nash |
| Once Human | Survivor Zero | Colt Rivers |
| Rise of Kingdoms | Kingdom Watcher | Ethan Vale |
| Where Winds Meet | Jade Wanderer | River Stone |
| Setup (Hardware) | Benchmarker | Nathan Pierce |
| **GLOBAL (tous jeux)** | **Alex Mercer** | **Victor Kane** | **Expert SEO** |

> Fiches complètes dans : `FICHES-AGENTS-RIGGAMER.md`
> News : circuit court → Expert Titres + Rédacteur + Expert SEO (minimal)

---

**① EXPERT TITRES — données + H1 + H2**

Intervient EN PREMIER. Valide les données du jeu ET structure l'article.

Passe 1 — Données :
- [ ] Tier list vérifiée sur la version actuelle du patch
- [ ] Stats jeu vérifiées (taux gacha, prix, durées, BRs...)
- [ ] Screenshots gameplay réels collectés (preuve E-E-A-T)
- [ ] Score RigGamer /10 calculé sur 5 critères (si review)
- [ ] 3 données chiffrées uniques minimum validées

Passe 2 — Structure :
- [ ] H1 final (≤ 65 chars · mot-clé dedans · bénéfice clair · année 2026)
- [ ] Tous les H2 de l'article (chaque H2 = vraie question du joueur)
- [ ] JAMAIS : "Introduction" · "Overview" · "Conclusion" · "Final Thoughts" comme H2
- [ ] Fiche données + H1 + H2 transmise au Rédacteur avant brief

---

**② RÉDACTEUR — corps de l'article**

Reçoit la fiche données + H1 + H2 de l'Expert Titres. Injecter l'exemplar :
```
"Voici un paragraphe de référence dans le style de [Rédacteur jeu].
Ton style doit s'aligner sur ce modèle :
[Coller l'exemplar de 200 mots]"
```

---

## ÉTAPE 6 — RÉDACTION PILIER

⏱ 2-3h · Publié EN PREMIER dans son cluster jeu

**Champs DB à renseigner (insertion D1) :**
```sql
INSERT INTO articles (slug, title, excerpt, cat, date, readtime, img, score, game, body, published)
VALUES (
  'nte-review',
  'NTE Review 2026: Is Neverness to Everness Worth Playing?',
  'We played 40+ hours. The best urban gacha open world — with the fairest banner system we have tested.',
  'reviews',
  'Oct 8, 2026',
  9,
  'https://riggamer.com/media/nte-review-keyart-v2.webp',
  '7.8',
  'NTE',
  '[BODY HTML]',
  1
);
```

**Règles pilier :**
- [ ] 2000-3000 mots (profondeur > volume)
- [ ] H1 unique · Intro SANS Hn · Conclusion SANS Hn
- [ ] Chaque H2 = 1 futur satellite (survol, pas tout détailler)
- [ ] ZÉRO lien vers ses satellites dans le corps
- [ ] 1-2 liens cross-cluster autorisés (pilier → pilier jeu connexe)
- [ ] Phrases ≤ 25 mots · Paragraphes ≤ 4 lignes
- [ ] Score RigGamer /10 en tableau
- [ ] 3-5 passages citables (phrases courtes, factuelles, chiffrées)
- [ ] CTAs via `/play/[slug]` UNIQUEMENT
- [ ] Score Flesch ≥ 50 (hemingwayapp.com)

**Score RigGamer /10 — 5 critères :**

| Critère | Poids | Description |
|---------|-------|-------------|
| Gameplay | /2 | Fun, profondeur, originalité des mécaniques |
| Free-to-play friendliness | /2 | Progression sans payer, généreux en ressources |
| Monétisation in-game | /2 | Gacha rate, prix cosmétiques, P2W ou non |
| Progression & grind | /2 | Rythme, variété du contenu endgame |
| Stabilité & updates | /1 | Serveurs, fréquence patches, roadmap |
| Communauté & longévité | /1 | Base joueurs active, support développeur |

---

## ÉTAPE 7 — RÉDACTION SATELLITES + MONÉTISABLES + NEWS

⏱ Variable selon le type · VÉRIFIER : pilier du jeu publié live ?

**4 types d'articles RIGGAMER :**

| Point | Pilier | Satellite | News | Setup |
|-------|--------|-----------|------|-------|
| Longueur | 2000-3000 | 1500-2500 | 400-700 | 1000-2000 |
| Profondeur | Survol | Totale | Factuelle | Comparative |
| Lien pilier jeu | N/A | OBLIGATOIRE | NON | N/A |
| Circuit | Complet | Complet | Court | Complet |
| Auditeur | ✅ | ✅ | ❌ | ✅ |
| Score RigGamer | ✅ | Non | Non | ✅ Amazon |

**Maillage interne — 3 liens max (hors news) :**
- Lien 1 (OBLIGATOIRE) → Pilier du jeu · ancre = mot-clé principal riche
- Lien 2 (OPTIONNEL) → Satellite connexe même cluster
- Lien 3 (OPTIONNEL) → Pilier jeu connexe (cross-cluster)
- AU-DELÀ DE 3 → REFUSÉ · jamais lien vers article non publié

**Monétisables BOF /play/ — spécifique :**
- [ ] CTA 3-4 fois dans l'article
- [ ] Bouton "Play Free" visible au-dessus de la fold
- [ ] Taux CPI affiché si autorisé par réseau
- [ ] Verdict box obligatoire avec lien `/play/[slug]`
- [ ] Schema : "VideoGame" + "Review"

**Circuit court NEWS — Expert Titres + Rédacteur + Expert SEO uniquement :**
- [ ] 400-700 mots · factuel · daté
- [ ] Source officielle citée (patch notes, annonce développeur)
- [ ] 1 lien interne vers pilier du jeu concerné (si publié)
- [ ] Pas d'Alex Mercer · pas de Victor Kane (Auditeur)
- [ ] Expert SEO : schema NewsArticle uniquement (rapide)
- [ ] Publié dans les 24h de l'annonce officielle

---

## ÉTAPE 7.5 — ALEX MERCER (passe anti-IA + voix jeu)

⏱ 30-40 min · Après rédaction · Avant Auditeur · Hors news

Rôle : 2 passes en séquence. Passe 1 technique (supprimer traces IA), passe 2 créative (injecter voix communauté).

**PASSE 1 — Technique : supprimer marqueurs IA (objectif : 0 occurrence)**
- [ ] "worth noting" · "furthermore" · "moreover" · "additionally"
- [ ] "in conclusion" · "in summary" · "certainly" · "absolutely"
- [ ] "in today's gaming landscape" · "as mentioned earlier"
- [ ] "it is important to note" · "that being said" · "look no further"
- [ ] "it's worth mentioning" · "needless to say" · "at the end of the day"

**Structures symétriques IA à casser :**
- [ ] Intro encyclopédique → couper, entrer direct dans le sujet
- [ ] 3 paragraphes longueur identique → briser la symétrie
- [ ] Plus de 2 listes à puces → réduire
- [ ] Conclusion récapitulative → remplacer par verdict direct 2-3 phrases

**PASSE 2 — Créative : injecter voix communauté du jeu**
- [ ] 1 expérience de jeu vécue à la 1ère personne
- [ ] 1 opinion tranchée assumée — pas de neutralité
- [ ] 1 critique directe d'une mécanique ou de la monétisation
- [ ] 1 imperfection naturelle (parenthèse, doute, humour propre au jeu)
- [ ] Vocabulaire communauté du jeu intégré (depuis FICHES-AGENTS-RIGGAMER.md)
- [ ] Rythme varié : phrases courtes + longues alternées
- [ ] Lu à voix haute : sonne comme un vrai joueur de ce jeu ?

**Test final (gptzero.me ou originality.ai) :**
- Score < 30% → ✅ VALIDÉ → transmettre à Victor Kane (Auditeur)
- Score 30-60% → Relancer passe 1 sur passages marqués
- Score > 60% → ❌ RENVOYÉ au Rédacteur — réécriture complète

---

## ÉTAPE 8 — VICTOR KANE — AUDITEUR (12 POINTS)

⏱ 45 min · Auditer uniquement — jamais réécrire · Hors news

| Check | Ce qu'on vérifie |
|-------|-----------------|
| 1 | H1 unique · ≤ 65 chars |
| 2 | Meta title ≤ 60 chars · excerpt ≤ 155 chars · mot-clé dans les deux |
| 3 | Lien pilier jeu présent · max 3 liens · aucun lien vers article non publié |
| 4 | Ancres descriptives (jamais "click here" ou "here") |
| 5 | ≥ 8 termes empreinte auteur · 0 mots interdits |
| 6 | Longueur conforme au type (pilier/satellite/setup) |
| 7 | Alt text sur toutes images · format WebP · screenshots gameplay réels |
| 8 | Schema JSON-LD présent + 0 erreur syntaxe |
| 9 | Lien /play/ dans corps + verdict box + rel="nofollow sponsored" |
| 10 | date = aujourd'hui · img définie · score renseigné si review |
| 11 | Flesch ≥ 50 · Grade level ≤ 10 |
| 12 | Données chiffrées vérifiées · aucune hallucination sur stats jeu |

**Décision — seuil obligatoire 10/12 :**
- ✅ VALIDÉ (10/12 ou 11/12 ou 12/12) → transmettre à l'étape 9
- ❌ RENVOYÉ (< 10/12) → liste des checks échoués → retour au Rédacteur — recommencer depuis l'étape 7.5

> **Règle absolue : un article à 9/12 ou moins ne passe PAS à l'Expert SEO et n'est PAS inséré en DB.**

**+ Produire la Fiche Contexte SEO (maillage) :**
```
Lien 1 (OBLIGATOIRE) : cible · ancre · emplacement
Lien 2 (OPTIONNEL)   : cible · ancre · emplacement ou N/A
Lien 3 (OPTIONNEL)   : cible · ancre · emplacement ou N/A
```

---

## ÉTAPE 9 — EXPERT SEO (Schema + llms.txt + technique)

⏱ 30 min · Agent partagé tous jeux · Après Auditeur validé

- [ ] H1 contient le mot-clé · mot-clé dans les 100 premiers mots du body
- [ ] Slug : minuscules · tirets · sans accents · nom jeu abrégé si besoin
- [ ] date = aujourd'hui · img définie dans la DB
- [ ] Liens internes insérés (fiche étape 8) · ≤ 3 · ancres descriptives
- [ ] Schema JSON-LD choisi selon le type d'article + injecté dans le body
- [ ] Schema testé → search.google.com/test/rich-results (0 erreur)
- [ ] llms.txt mis à jour : ajouter l'article sous sa catégorie jeu
- [ ] Core Web Vitals cibles : LCP < 2,5s · CLS < 0,1 · INP < 200ms
- [ ] **Score SEO global ≥ 80/100** — grille : E-E-A-T (25pts) + Lisibilité (20pts) + Technique (20pts) + Maillage (15pts) + Schema (10pts) + llms.txt (10pts)
- [ ] Si score < 80 → identifier les points faibles → corriger → re-scorer avant insertion DB

**Schemas selon le type :**

| Type article | Schema |
|-------------|--------|
| Review jeu | `VideoGame` + `Review` |
| Guide | `Article` + `HowTo` si applicable |
| Best-of setup | `ItemList` |
| FAQ présente | `FAQPage` |
| News | `NewsArticle` |

**Exemple schema VideoGame + Review :**
```json
{
  "@context": "https://schema.org",
  "@type": ["Review", "VideoGame"],
  "name": "NTE: Neverness to Everness",
  "reviewBody": "The best urban open world in gacha gaming...",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "7.8",
    "bestRating": "10"
  },
  "author": {
    "@type": "Person",
    "name": "Ash Reeves"
  },
  "gamePlatform": "PC",
  "genre": "Gacha RPG",
  "applicationCategory": "Game"
}
```

---

## ÉTAPE 9B — AGENT IMAGES & BANNIÈRES

⏱ 45 min · Zéro article sans image

**Bannière cover :**
- Dimensions : 1200 × 630 px · Format WebP · < 150 ko
- Couleur accent par catégorie :
  - Guides = `#10B981` (emerald)
  - Reviews = `#6366F1` (indigo)
  - News = `#F59E0B` (amber)
  - Setup = `#3B82F6` (blue)

| Type article | Visuel bannière |
|-------------|----------------|
| Review | Key art officiel + Score /10 + fond dégradé couleur catégorie |
| Guide | Screenshot gameplay + titre guide |
| News | Key art jeu + badge "NEWS" + date |
| Setup | Photo produit hardware + prix |

**Nommage :** `[slug]-cover.webp` → `/public/media/`
**URL img dans DB :** `https://riggamer.com/media/[slug]-cover.webp`

**Alt text :**
- Cover review : `"[Jeu] review 2026 — [bénéfice court] · RigGamer"`
- Screenshot gameplay : `"[Feature] gameplay in [Jeu] — tested by RigGamer"`
- Tableau comparatif : `"[Jeu A] vs [Jeu B] comparison 2026"`
- ✅ Descriptif + mot-clé · < 125 chars
- ❌ Jamais vide · jamais "image1.jpg" · jamais "screenshot"

---

## ÉTAPE 10 — PUBLICATION (INSERTION D1)

⏱ 20 min

**Ordre cluster par jeu :**
1. Pilier du jeu EN PREMIER (review ou guide complet)
2. Satellites : MOF → TOF → BOF
3. Monétisables /play/ EN DERNIER
4. News : publiées dans les 24h, indépendantes de l'ordre

**Commande d'insertion D1 :**
```bash
npx wrangler d1 execute riggamer-db --remote \
  --command "INSERT INTO articles (slug,title,excerpt,cat,date,readtime,img,score,game,body,published) VALUES ('[slug]','[title]','[excerpt]','[cat]','[date]',[readtime],'[img]','[score]','[game]','[body]',1);"
```

**Horaires :**
- 10h-16h EST (16h-22h Paris)
- Max 5-6 articles/jour
- ≥ 30 min entre deux publications
- Dates : mois en cours uniquement

**Checklist 30 points avant publication :**

STRUCTURE
- [ ] H1 unique · Intro sans Hn · Conclusion sans Hn
- [ ] Longueur conforme au type

CONTENU
- [ ] Empreinte auteur (8+ termes favoris · 0 mots interdits)
- [ ] Score RigGamer /10 présent (reviews uniquement)
- [ ] 3-5 passages citables
- [ ] Screenshots gameplay réels
- [ ] Flesch ≥ 50 · GPTZero < 30%

TECHNIQUE
- [ ] Slug correct · date = aujourd'hui · img définie
- [ ] Schema JSON-LD + 0 erreur · llms.txt à jour
- [ ] Lien /play/ · rel="nofollow sponsored"

MAILLAGE
- [ ] Lien pilier jeu présent · Max 3 liens · Zéro lien non publié

DÉCOUVRABILITÉ
- [ ] Visible sur page catégorie · 1 lien entrant prévu

IMAGES
- [ ] Bannière cover WebP · alt text · < 150 ko · Min 1 screenshot gameplay

MOBILE
- [ ] Affichage mobile vérifié (DevTools → Ctrl+Shift+M)

TRACKING
- [ ] Lien /play/ fonctionne (302 active) · pixel install réseau CPI actif

---

## ÉTAPE 11 — MAILLAGE POST-PUBLICATION

⏱ 30-45 min · Après tout le cluster d'un jeu publié

**Phase 1 — Inventaire (5 min)**
- [ ] Pilier + tous satellites + monétisables du jeu listés avec slug

**Phase 2 — Audit liens existants (10 min)**
```sql
-- Vérifier les articles publiés du cluster
SELECT slug, title FROM articles WHERE game = '[nom_jeu]' AND published = 1;
```
- [ ] Chaque satellite → lien vers pilier jeu ?
- [ ] Toutes les ancres riches ?
- [ ] Chaque satellite ≤ 3 liens sortants ?
- [ ] Zéro lien vers article non publié ?

**Phase 3 — Tableau de maillage (10 min)**

| Article source | Lien 1 obligatoire | Ancre | Lien 2 opt | Lien 3 opt |
|---------------|-------------------|-------|-----------|-----------|
| nte-tier-list | nte-review | "NTE review 2026" | nte-beginner-guide | N/A |

**Phase 4 — Exécution dans le body (15 min)**
- [ ] Liens ajoutés dans le CORPS uniquement (pas intro, pas conclusion)
- [ ] URLs relatives · jamais deux liens vers même URL dans un article
- [ ] Body mis à jour via `UPDATE articles SET body = '...' WHERE slug = '...'`

**Phase 5 — Vérification finale (5 min)**
- [ ] Zéro page orpheline (≥ 1 lien entrant par article)
- [ ] Pilier = article le plus lié du cluster jeu
- [ ] GSC → "Demander l'indexation" pour chaque URL modifiée

---

## ÉTAPE 12 — TRACKING + P&L + SUIVI

⏱ Continu

**Vérification /play/ (immédiatement après publication) :**
1. Ouvrir l'article live
2. Cliquer le bouton `/play/[slug]`
3. Vérifier redirection 302 active
4. Vérifier pixel install réseau CPI reçu
5. Vérifier événement reçu dans Meta Events Manager (si actif)
6. Vérifier conversion dans Google Ads (si actif)

**Suivi SEO :**
- J+7 → Indexé ? (GSC → Inspecter URL)
- J+30 → Position · CTR · Impressions ?
- J+90 → Installs trackés · Revenus CPI ?

| Position | Action |
|----------|--------|
| 1-3 | Maintenir + enrichir + re-test annuel |
| 4-10 | Optimiser : titre · méta · maillage |
| 11-30 | Réécrire + enrichir screenshots + données propriétaires |
| 30+ | Repositionner l'angle + analyser concurrents |

**P&L hebdomadaire :**
```
DÉPENSES : Google Ads + Meta Ads = TOTAL
REVENUS  : CPI installs + Display ads = TOTAL
MARGE    : RPV − CPV (revenu par visiteur − coût par visiteur)

EPI (Earnings Per Install) = Revenus totaux / Nombre installs
```

**Règle d'arrêt :** CPV > RPV de 20% pendant 3 jours consécutifs → COUPER

---

## RÉCAPITULATIF TEMPS PAR ARTICLE

| Étape | Agent | Temps |
|-------|-------|-------|
| 1 — Validation jeu | — | 1-2 semaines (1 fois par jeu) |
| 2 — Analyse concurrentielle | — | 45 min |
| 3 — Keyword Scout + liste | — | 30 min |
| 4 — SERP + carte cluster | — | 30 min |
| 5① — Données + H1 + H2 | Expert Titres (par jeu) | 45 min |
| 6 — Rédaction Pilier | Rédacteur (par jeu) | 2-3h |
| 7 — Rédaction Satellite/News | Rédacteur (par jeu) | 2-3h / 30 min (news) |
| 7.5 — Anti-IA + voix jeu | Alex Mercer (global) | 30-40 min (hors news) |
| 8 — Audit 12 points | Victor Kane (global) | 45 min (hors news) |
| 9 — Schema + llms.txt + SEO | Expert SEO (global) | 30 min |
| 9B — Images & Bannières | — | 45 min |
| 10 — Publication D1 | — | 20 min |
| 11 — Maillage post-pub | — | 30-45 min |
| 12 — Tracking + P&L | — | Continu |
| **TOTAL pilier/satellite** | | **~9-10h** |
| **TOTAL news** | | **~1h** |

---

> "Des étapes à faire, et avant de passer à une étape, tu valides l'étape précédente — l'audit — et tu continues."
> — M. Abdelrahim
