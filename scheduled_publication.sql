-- Ajout colonne scheduled_at (texte ISO, ex: '2026-11-03 16:00:00')
ALTER TABLE articles ADD COLUMN scheduled_at TEXT;

-- SAT 2 — NTE F2P Guide (ID 41, Ash Reeves) : 03/11/2026 16:00 UTC
UPDATE articles SET scheduled_at = '2026-11-03 16:00:00' WHERE id = 41;

-- SAT 3 — NTE Review 2026 (ID 42, Marcus Webb) : 03/11/2026 21:00 UTC (+5h)
UPDATE articles SET scheduled_at = '2026-11-03 21:00:00' WHERE id = 42;

-- SAT 4 — Is NTE Worth Playing (ID 43, Jordan Lee) : 04/11/2026 02:00 UTC (+5h)
UPDATE articles SET scheduled_at = '2026-11-04 02:00:00' WHERE id = 43;
