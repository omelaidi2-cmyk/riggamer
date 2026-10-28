-- Fix game field for all news articles
UPDATE articles SET game = 'NTE'              WHERE slug = 'nte-patch-notes-1-1';
UPDATE articles SET game = 'Arknights'        WHERE slug = 'arknights-endfield-season-2';
UPDATE articles SET game = 'War Thunder'      WHERE slug = 'war-thunder-new-vehicles';
UPDATE articles SET game = 'Once Human'       WHERE slug = 'once-human-season-3';
UPDATE articles SET game = 'Project Entropy'  WHERE slug = 'project-entropy-global-launch';
UPDATE articles SET game = 'RAID'             WHERE slug = 'raid-new-champion';
UPDATE articles SET game = 'Star Trek'        WHERE slug = 'star-trek-event-recap';
UPDATE articles SET game = 'Enlisted'         WHERE slug = 'enlisted-update-air';
UPDATE articles SET game = 'Rise of Kingdoms' WHERE slug = 'rise-of-kingdoms-kvk';
UPDATE articles SET game = 'Where Winds Meet' WHERE slug = 'where-winds-meet-ps5-launch';

-- Fix game field for all review articles
UPDATE articles SET game = 'NTE'              WHERE slug = 'nte-review';
UPDATE articles SET game = 'Arknights'        WHERE slug = 'arknights-endfield-review';
UPDATE articles SET game = 'Project Entropy'  WHERE slug = 'project-entropy-review';
UPDATE articles SET game = 'Once Human'       WHERE slug = 'once-human-review';
UPDATE articles SET game = 'Enlisted'         WHERE slug = 'enlisted-review';
UPDATE articles SET game = 'Where Winds Meet' WHERE slug = 'where-winds-meet-review';
UPDATE articles SET game = 'Star Trek'        WHERE slug = 'star-trek-fleet-command-review';
UPDATE articles SET game = 'Rise of Kingdoms' WHERE slug = 'rise-of-kingdoms-review';
UPDATE articles SET game = 'War Thunder'      WHERE slug = 'war-thunder-review';
UPDATE articles SET game = 'RAID'             WHERE slug = 'raid-shadow-legends-review';

-- Fix Rise of Kingdoms beginner (game was 'RoK' instead of 'Rise of Kingdoms')
UPDATE articles SET game = 'Rise of Kingdoms' WHERE slug = 'rise-of-kingdoms-beginner';
