import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// Safe sitemap wrapper — guards against _routes=undefined in hybrid mode on Cloudflare Pages
// @astrojs/sitemap 3.7.x uses astro:routes:resolved to store _routes, but that hook
// may not fire in all build environments, leaving _routes undefined at astro:build:done.
const safeSitemap = () => {
  const integration = sitemap();
  const originalHook = integration.hooks?.['astro:build:done'];
  if (originalHook) {
    integration.hooks['astro:build:done'] = async (args) => {
      try {
        await originalHook(args);
      } catch (e) {
        args.logger?.warn(`[sitemap] skipped (hybrid mode): ${e.message}`);
      }
    };
  }
  return integration;
};

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  integrations: [safeSitemap()],
  site: 'https://riggamer.com',
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});
