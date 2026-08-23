import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const dbPath = path.join(root, 'db', 'blog.sqlite3');
const draftsDir = path.join(root, '_drafts');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/blog-push.mjs <slug>');
  process.exit(1);
}

const draftPath = path.join(draftsDir, `${slug}.md`);
if (!existsSync(draftPath)) {
  console.error(`No draft found at _drafts/${slug}.md — run "npm run blog:pull -- ${slug}" first.`);
  process.exit(1);
}

function parse(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error('Could not find frontmatter between --- markers.');
  }
  const [, frontmatter, body] = match;
  const row = {};
  for (const line of frontmatter.split('\n')) {
    if (!line.trim()) continue;
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    row[key] = value;
  }
  row.body_md = body.replace(/^\n/, '').replace(/\n+$/, '\n');
  return row;
}

const edited = parse(readFileSync(draftPath, 'utf8'));

for (const field of ['title', 'date', 'excerpt', 'body_md']) {
  if (!edited[field] || !String(edited[field]).trim()) {
    console.error(`Missing required field "${field}" — aborting, nothing was saved.`);
    process.exit(1);
  }
}

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    updated_at TEXT,
    excerpt TEXT NOT NULL,
    cover TEXT,
    cover_alt TEXT,
    draft INTEGER NOT NULL DEFAULT 0,
    body_md TEXT NOT NULL
  );
`);

db.prepare(
  `
  INSERT INTO posts (slug, title, date, updated_at, excerpt, cover, cover_alt, draft, body_md)
  VALUES (@slug, @title, @date, @updatedAt, @excerpt, @cover, @coverAlt, @draft, @body_md)
  ON CONFLICT(slug) DO UPDATE SET
    title = excluded.title,
    date = excluded.date,
    updated_at = excluded.updated_at,
    excerpt = excluded.excerpt,
    cover = excluded.cover,
    cover_alt = excluded.cover_alt,
    draft = excluded.draft,
    body_md = excluded.body_md;
`
).run({
  slug,
  title: edited.title,
  date: edited.date,
  updatedAt: edited.updatedAt || null,
  excerpt: edited.excerpt,
  cover: edited.cover || null,
  coverAlt: edited.coverAlt || null,
  draft: edited.draft === 'true' ? 1 : 0,
  body_md: edited.body_md,
});

db.close();

console.log(`Pushed "${slug}" to db/blog.sqlite3.`);
console.log('Dev server picks this up automatically — just refresh the page.');
