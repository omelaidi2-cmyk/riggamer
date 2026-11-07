// Generate audit-clusters.xlsx from DB audit data
import XLSX from 'xlsx';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '../audit-clusters.xlsx');

// ── Data ──────────────────────────────────────────────────────────────────────
const rows = [
  // Jeu | Score | Pilier | Guides | News | Total | Body OK | Body Total | Schema | /play/ | Intentions | Satellites à créer | Conformité % | Priorité | Rédacteur | Note DB
  ['NTE — Neverness to Everness', 8.0, 'BODY OK', 2, 1, 4, 2, 4, 'OUI', 'OUI', 'Rev · Guide · News', '2 – 6', 55, 'P2', 'Ash Reeves', ''],
  ['Arknights: Endfield',         8.6, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Dr. Vance',   ''],
  ['RAID Shadow Legends',         8.0, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Cole Merritt', ''],
  ['Rise of Kingdoms',            7.8, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Ethan Vale',   '⚠ DB : "Rise of Kingdoms" vs "RoK"'],
  ['War Thunder',                 7.6, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Viktor Lenz',  ''],
  ['Project Entropy',             7.2, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Jake Cipher',  ''],
  ['Enlisted',                    6.8, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Owen Nash',    ''],
  ['Star Trek Fleet Command',     6.4, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'Marcus Steel', ''],
  ['Where Winds Meet',            6.4, 'VIDE',    1, 1, 3, 0, 3, 'NON', 'OUI', 'Rev · Guide · News', '3 – 7', 10, 'P1', 'River Stone',  ''],
  ['Setup Hardware (cross-game)', '—', 'VIDE',    5, 0, 6, 0, 6, 'NON', 'NON', 'Setup uniquement',   'Cluster complet', 5, 'P1', 'Nathan Pierce', ''],
  ['Once Human',                  '—', 'ABSENT',  0, 0, 0, 0, 0, 'NON', 'NON', 'Aucune',             'Cluster complet from scratch', 0, 'P1', '—', 'Absent de la DB — 0 article inséré'],
];

const headers = [
  'Jeu', 'Score /10', 'Pilier (body)', 'Guides', 'News', 'Total articles',
  'Body OK', 'Body Total', 'Schema JSON-LD', '/play/ affiliate',
  'Intentions couvertes', 'Satellites à créer', 'Conformité %',
  'Priorité', 'Rédacteur', 'Note DB',
];

// ── Workbook ──────────────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new();

// Sheet 1 — Audit Clusters
const wsData = [headers, ...rows];
const ws = XLSX.utils.aoa_to_sheet(wsData);

// Column widths
ws['!cols'] = [
  { wch: 32 }, // Jeu
  { wch: 10 }, // Score
  { wch: 14 }, // Pilier
  { wch: 8  }, // Guides
  { wch: 8  }, // News
  { wch: 14 }, // Total
  { wch: 10 }, // Body OK
  { wch: 11 }, // Body Total
  { wch: 14 }, // Schema
  { wch: 16 }, // /play/
  { wch: 22 }, // Intentions
  { wch: 22 }, // Satellites
  { wch: 13 }, // Conformité %
  { wch: 10 }, // Priorité
  { wch: 16 }, // Rédacteur
  { wch: 40 }, // Note DB
];

// Freeze first row
ws['!freeze'] = { xSplit: 0, ySplit: 1 };

XLSX.utils.book_append_sheet(wb, ws, 'Audit Clusters');

// Sheet 2 — Totaux
const totData = [
  ['Métrique', 'Valeur'],
  ['Total articles publiés', 34],
  ['Articles avec body rédigé', 2],
  ['Articles sans body (vides)', 32],
  ['Piliers avec body OK', 1],
  ['Piliers vides', 9],
  ['Schema JSON-LD injecté', '1 / 10 clusters'],
  ['/play/ affiliate actif', '9 / 10 clusters'],
  ['Conformité moyenne', '9.5%'],
  ['Clusters P1 (urgent)', 9],
  ['Clusters P2 (en cours)', 1],
  ['Satellites à créer (fourchette basse)', 28],
  ['Satellites à créer (fourchette haute)', 60],
  ['Once Human (absent DB)', 'Cluster entier à créer'],
  ['Score /10 moyen', 7.4],
  ['llms.txt', 'Créé ✅ — 34 articles indexés'],
  ['Images setup', '6/6 générées ✅'],
];
const wsTot = XLSX.utils.aoa_to_sheet(totData);
wsTot['!cols'] = [{ wch: 36 }, { wch: 30 }];
XLSX.utils.book_append_sheet(wb, wsTot, 'Totaux');

// Sheet 3 — Pipeline agents
const agentData = [
  ['Agent', 'Type', 'Jeu / Scope', 'Rôle'],
  ['Expert Titres — Kai Voss',   'Per-game', 'NTE',                   'PASSE 1 données + PASSE 2 H1/H2'],
  ['Expert Titres — Panzer Ace', 'Per-game', 'War Thunder',           'PASSE 1 données + PASSE 2 H1/H2'],
  ['Expert Titres — générique',  'Per-game', 'RAID / Star Trek / etc.','PASSE 1 données + PASSE 2 H1/H2'],
  ['Rédacteur — Ash Reeves',     'Per-game', 'NTE',                   'Rédaction corps article'],
  ['Rédacteur — Viktor Lenz',    'Per-game', 'War Thunder',           'Rédaction corps article'],
  ['Rédacteur — Cole Merritt',   'Per-game', 'RAID Shadow Legends',   'Rédaction corps article'],
  ['Rédacteur — générique',      'Per-game', 'Autres clusters',       'Rédaction corps article'],
  ['Alex Mercer',                'Global',   'Tous clusters',         'PASSE 1 anti-IA + PASSE 2 voix communauté'],
  ['Victor Kane',                'Global',   'Tous clusters',         'Audit 12 points qualité'],
  ['Expert SEO',                 'Global',   'Tous clusters',         'Schema JSON-LD + llms.txt + maillage + technique'],
];
const wsAgents = XLSX.utils.aoa_to_sheet(agentData);
wsAgents['!cols'] = [{ wch: 28 }, { wch: 10 }, { wch: 24 }, { wch: 42 }];
XLSX.utils.book_append_sheet(wb, wsAgents, 'Pipeline Agents');

// ── Write ─────────────────────────────────────────────────────────────────────
XLSX.writeFile(wb, OUTPUT);
console.log(`✅ ${OUTPUT}`);
