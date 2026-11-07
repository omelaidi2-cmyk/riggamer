"""Generate SQL INSERT for NTE article and write to insert_nte.sql"""
import re

# Read raw article body (lines 34-328 of the HTML file)
with open(r'D:\ADARBITRAGE\gaming\contents\NTE\articles\nte-pc-download-guide.html', 'r', encoding='utf-8') as f:
    raw = f.read()

# Strip the comment header (everything before the first <!-- ═══ section)
match = re.search(r'<!-- ═{3}', raw)
body = raw[match.start():].strip() if match else raw.strip()

# Escape single quotes for SQL
body_escaped = body.replace("'", "''")

slug        = 'nte-pc-download-guide'
title       = "NTE: Neverness to Everness Is Free on PC — Download It Before the Launch Bonuses Expire"
excerpt     = "No stamina system, no 50/50, no subscription. Everything you need to get Neverness to Everness running on PC right now."
cat         = 'guides'
date        = 'Sep 16, 2026'
readtime    = 7
img         = '/media/nte-review-keyart.webp'
game        = 'NTE'
published   = 1

title_esc   = title.replace("'", "''")
excerpt_esc = excerpt.replace("'", "''")

sql = f"""INSERT OR IGNORE INTO articles (slug, title, excerpt, cat, date, readtime, img, game, body, published)
VALUES (
  '{slug}',
  '{title_esc}',
  '{excerpt_esc}',
  '{cat}',
  '{date}',
  {readtime},
  '{img}',
  '{game}',
  '{body_escaped}',
  {published}
);"""

out_path = r'D:\ADARBITRAGE\riggamer\db\insert_nte.sql'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(sql)

print(f"SQL written to {out_path}")
print(f"Body length: {len(body)} chars")
