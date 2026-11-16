-- Normalize game field for cross-linking
UPDATE articles SET game='Arknights: Endfield' WHERE slug LIKE 'arknights-endfield%';
UPDATE articles SET game='Neverness to Everness' WHERE slug LIKE 'neverness-to-everness%' OR slug LIKE 'nte-%';
UPDATE articles SET game='Rise of Kingdoms' WHERE slug LIKE 'rise-of-kingdoms%';
