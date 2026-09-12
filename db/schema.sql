-- RigGamer D1 Schema

CREATE TABLE IF NOT EXISTS articles (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  slug      TEXT NOT NULL UNIQUE,
  title     TEXT NOT NULL,
  excerpt   TEXT NOT NULL,
  cat       TEXT NOT NULL CHECK(cat IN ('guides','news','reviews','setup')),
  date      TEXT NOT NULL,
  readtime  INTEGER NOT NULL,
  img       TEXT,
  score     TEXT,
  game      TEXT,
  body      TEXT,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_articles_cat ON articles(cat);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
