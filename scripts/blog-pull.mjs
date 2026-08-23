import Database from 'better-sqlite3';
import { fileURLToPath } from 'node:url';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const dbPath = path.join(root, 'db', 'blog.sqlite3');
const draftsDir = path.join(root, '_drafts');

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/blog-pull.mjs <slug>');
  process.exit(1);
}

const FIELDS = ['title', 'date', 'updatedAt', 'excerpt', 'cover', 'coverAlt', 'draft'];

function serialize(row) {
  const lines = ['---'];
  for (const key of FIELDS) lines.push(`${key}: ${row[key] ?? ''}`);
  lines.push('---', '', row.body_md ?? '');
  return lines.join('\n');
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
const existing = db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug);
db.close();

const row = existing
  ? {
      title: existing.title,
      date: existing.date,
      updatedAt: existing.updated_at ?? '',
      excerpt: existing.excerpt,
      cover: existing.cover ?? '',
      coverAlt: existing.cover_alt ?? '',
      draft: existing.draft ? 'true' : 'false',
      body_md: existing.body_md,
    }
  : {
      title: '',
      date: new Date().toISOString().slice(0, 10),
      updatedAt: '',
      excerpt: '',
      cover: '',
      coverAlt: '',
      draft: 'true',
      body_md: '## Heading\n\nWrite the post here.\n',
    };

if (!existing) {
  console.log(`No post found for "${slug}" — created a new draft template.`);
}

mkdirSync(draftsDir, { recursive: true });
const draftPath = path.join(draftsDir, `${slug}.md`);
writeFileSync(draftPath, serialize(row), 'utf8');

console.log(`Pulled "${slug}" to ${path.relative(root, draftPath)}`);
console.log('Open that file in your editor, edit, save — then run:');
console.log(`  npm run blog:push -- ${slug}`);
