export type Cat = 'guides' | 'news' | 'reviews' | 'setup';

export interface Article {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  cat: Cat;
  date: string;
  readtime: number;
  img?: string;
  score?: string;
  game?: string;
  body?: string;
}

export async function getArticlesByCategory(db: D1Database, cat: Cat): Promise<Article[]> {
  const r = await db
    .prepare('SELECT * FROM articles WHERE cat = ? AND published = 1 ORDER BY id DESC')
    .bind(cat)
    .all<Article>();
  return r.results;
}

export async function getArticleBySlug(db: D1Database, slug: string): Promise<Article | null> {
  return db
    .prepare('SELECT * FROM articles WHERE slug = ? AND published = 1')
    .bind(slug)
    .first<Article>();
}

export async function getLatestArticles(db: D1Database, limit = 10): Promise<Article[]> {
  const r = await db
    .prepare('SELECT * FROM articles WHERE published = 1 ORDER BY id DESC LIMIT ?')
    .bind(limit)
    .all<Article>();
  return r.results;
}
