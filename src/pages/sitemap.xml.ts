import type { APIRoute } from 'astro';
import { getArticlesByCategory } from '../lib/db';

function toISODate(dateStr: string | undefined): string | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
}

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = (locals as any).runtime.env.DB;

  const [guides, news, reviews, setup] = await Promise.all([
    getArticlesByCategory(db, 'guides'),
    getArticlesByCategory(db, 'news'),
    getArticlesByCategory(db, 'reviews'),
    getArticlesByCategory(db, 'setup'),
  ]);

  const base = 'https://riggamer.com';

  const staticUrls = [
    { loc: `${base}/`,         priority: '1.0', changefreq: 'daily' },
    { loc: `${base}/guides/`,  priority: '0.8', changefreq: 'daily' },
    { loc: `${base}/news/`,    priority: '0.8', changefreq: 'daily' },
    { loc: `${base}/reviews/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${base}/setup/`,   priority: '0.8', changefreq: 'weekly' },
  ];

  const articleUrls = [...guides, ...news, ...reviews, ...setup].map(a => ({
    loc: `${base}/${a.cat}/${a.slug}/`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: toISODate(a.date),
  }));

  const allUrls = [...staticUrls, ...articleUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
};
