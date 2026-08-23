import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import type { Loader } from 'astro/loaders';

interface PostRow {
  slug: string;
  title: string;
  date: string;
  updated_at: string | null;
  excerpt: string;
  cover: string | null;
  cover_alt: string | null;
  draft: number;
  body_md: string;
}

/**
 * `new Date('2026-08-22')` parses as UTC midnight, which then renders as the
 * previous day in any timezone behind UTC. Parsing the parts and building a
 * local-midnight Date keeps the calendar date stable regardless of the
 * machine's timezone (dev laptop vs. build server).
 */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function sqliteBlogLoader({ dbPath }: { dbPath: string }): Loader {
  return {
    name: 'sqlite-blog-loader',
    load: async ({ store, config, parseData, renderMarkdown, generateDigest, logger, watcher }) => {
      const absPath = fileURLToPath(new URL(dbPath, config.root));

      async function sync() {
        const db = new Database(absPath, { readonly: true });
        const rows = db.prepare('SELECT * FROM posts').all() as PostRow[];
        db.close();

        store.clear();

        for (const row of rows) {
          const data = await parseData({
            id: row.slug,
            data: {
              title: row.title,
              date: parseLocalDate(row.date),
              updatedAt: row.updated_at ? parseLocalDate(row.updated_at) : undefined,
              excerpt: row.excerpt,
              cover: row.cover ?? undefined,
              coverAlt: row.cover_alt ?? undefined,
              draft: Boolean(row.draft),
            },
          });

          const rendered = await renderMarkdown(row.body_md);

          store.set({
            id: row.slug,
            data,
            body: row.body_md,
            rendered,
            digest: generateDigest(row),
          });
        }

        logger.info(`Loaded ${rows.length} post(s) from SQLite`);
      }

      await sync();

      // In dev, watch the .sqlite3 file itself so edits show up without restarting the server.
      if (watcher) {
        watcher.add(absPath);
        watcher.on('change', async (changedPath) => {
          if (changedPath !== absPath) return;
          await sync();
          logger.info('Reloaded posts after blog.sqlite3 change');
        });
      }
    },
  };
}
