-- Migration: add editor column and assign per-game editors
ALTER TABLE articles ADD COLUMN editor TEXT;

-- Arknights / Arknights: Endfield
UPDATE articles SET editor = 'Dr. Vance'    WHERE game IN ('Arknights', 'Arknights: Endfield');

-- War Thunder & Enlisted (Gaijin titles)
UPDATE articles SET editor = 'Marcus Steele' WHERE game IN ('War Thunder', 'Enlisted');

-- Neverness to Everness, Wuthering Waves, Where Winds Meet (Asian gacha / open world)
UPDATE articles SET editor = 'Yuki Chen'    WHERE game IN ('NTE', 'Neverness to Everness', 'Wuthering Waves', 'Where Winds Meet');

-- RAID Shadow Legends & Project Entropy (western/dark gacha)
UPDATE articles SET editor = 'Elena Cross'  WHERE game IN ('RAID', 'Project Entropy');

-- Rise of Kingdoms & Star Trek Fleet Command (strategy / 4X)
UPDATE articles SET editor = 'Kai Brooks'   WHERE game IN ('Rise of Kingdoms', 'RoK', 'Star Trek');

-- Setup / hardware articles (no specific game)
UPDATE articles SET editor = 'Jason Bench'  WHERE game IS NULL AND cat = 'setup';

-- Fallback for any remaining articles without editor
UPDATE articles SET editor = 'RigGamer Desk' WHERE editor IS NULL;
