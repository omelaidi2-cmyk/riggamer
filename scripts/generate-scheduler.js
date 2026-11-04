import { writeFileSync } from 'fs';
import { join } from 'path';

const content = `import { default as astroHandler, pageMap } from './index.js';

export default astroHandler;
export { pageMap };

export async function scheduled(event, env, ctx) {
  try {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const result = await env.DB
      .prepare(
        'UPDATE articles SET published = 1 WHERE published = 0 AND scheduled_at IS NOT NULL AND scheduled_at <= ?'
      )
      .bind(now)
      .run();
    console.log(\`[cron] \${new Date().toISOString()} — published \${result.meta?.changes ?? 0} article(s)\`);
  } catch (err) {
    console.error(\`[cron] \${new Date().toISOString()} — D1 error: \${err}\`);
  }
}
`;

const dest = join(process.cwd(), 'dist/_worker.js/scheduler.js');
writeFileSync(dest, content, 'utf8');
console.log('[generate-scheduler] scheduler.js written to dist/_worker.js/');
