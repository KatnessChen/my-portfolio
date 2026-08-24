# Portfolio site

![Homepage screenshot](public/images/screenshot.png)

Portfolio and services site for Yu-Wen Chen (Katness), published under the brand
name **Vizino AI** at <https://portfolio.vizino.ai>. Static site, no backend, no
runtime database, no user accounts.

This README is the single source of truth for how the project is put together.
If you are an AI agent working here, read it fully before editing — several
conventions below are not enforced by tooling and are easy to break by accident.

---

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` → http://localhost:4321 |
| Production build | `npm run build` → `dist/` |
| Preview the build | `npm run preview` |
| Type-check | `npm run check` |
| Pull a blog post out of SQLite for editing | `npm run blog:pull -- <slug>` |
| Push an edited post back into SQLite | `npm run blog:push -- <slug>` |
| Regenerate the default OG image | `node scripts/make-og.mjs` |
| Convert PNG screenshots to WebP | `node scripts/optimize-images.mjs` |
| Screenshot live sites | `node scripts/shoot.mjs` (see Known gaps) |

## Definition of done

A change is not finished until all three hold:

1. `npm run check` reports 0 errors
2. `npm run build` completes with the expected page count
3. **This README reflects the change**

There is no test suite and no CI. The two commands are the only automated signal
this project has, so do not skip them — and do not leave `npm run check` failing
for a later cleanup, because nothing else will catch it.

Step 3 is not optional and has no automated check at all, which is exactly why it
has to be a habit. If a change alters a command, a directory, a schema, a
workflow, a convention, or a deliberate non-goal described below, update that
section in the same commit. A README that has drifted out of date is worse than
a short one: the next person, or the next agent, will follow it confidently in
the wrong direction.

---

## Tech stack, and why

| Choice | Reason |
|---|---|
| **Astro**, static output | The site is content that needs to be discoverable and load fast. Static HTML with near-zero JS is the correct shape for that; a client-rendered SPA would be the wrong trade. |
| **Hand-written CSS**, no framework | Roughly a dozen components. Design tokens in `src/styles/tokens.css` cover it. Tailwind would add a build dependency and a class vocabulary for no gain at this size. |
| **Content Collections + Zod** | Case-study frontmatter is validated at build time, so a malformed entry fails the build rather than rendering broken. |
| **Vercel** | Static hosting plus analytics; matches the static output. |
| **TypeScript** | `npm run check` is the only correctness gate here, so types are carrying real weight. |

## Directory map

```
astro.config.mjs      Site URL, sitemap integration
db/blog.sqlite3       Blog content (read-only at build time; committed to the repo)
public/               Served verbatim — images, favicon, robots.txt, OG image
scripts/              One-off maintenance scripts, not part of the build
src/
  components/         Presentational .astro components
  content/
    config.ts         Zod schemas for both collections
    loaders/          Custom Astro content loader for the SQLite blog
    work/             Case studies, one Markdown file per project
  data/               Static site data (profile, category labels)
  layouts/            BaseLayout — SEO, OG tags, Person JSON-LD
  pages/              Routes; [slug].astro files use getStaticPaths
  styles/             tokens.css (variables) then global.css (reset + base)
  utils/              Build-time helpers
_originals/           Pre-optimisation source images (gitignored)
_drafts/              Working area — see Blog workflow and Hidden sections
```

## Content model

Two collections, defined in `src/content/config.ts`.

**`work`** — case studies as Markdown in `src/content/work/`, one file per
project, validated by Zod.

**`blog`** — posts stored in `db/blog.sqlite3`, loaded by a custom loader at
`src/content/loaders/sqlite-blog.ts`. The database is opened read-only during
the build; nothing queries it at runtime. In dev the loader watches the file, so
edits appear without a restart.

### Draft handling — read this before adding content

Both collections have a `draft` boolean, and **both honour it**:

```ts
getCollection('work', ({ data }) => !data.draft)
getCollection('blog', ({ data }) => !data.draft)
```

An entry with `draft: true` is excluded from listings, from its own page, and
from the sitemap. Use the same filter form in any new query — if one call site
omits it, a draft leaks into production silently.

`src/content/work/zenfolio.md` is currently `draft: true` on purpose: its
`highlights` are derived from seeded test transactions, not real usage, and its
frontmatter carries a TODO for the real figures. Set it to `false` once those
numbers are in.

## Blog workflow

SQLite is not editable by hand, so posts round-trip through Markdown:

```bash
npm run blog:pull -- my-post-slug   # db/blog.sqlite3 → _drafts/my-post-slug.md
# edit _drafts/my-post-slug.md
npm run blog:push -- my-post-slug   # _drafts/my-post-slug.md → db/blog.sqlite3
```

`_drafts/` is a scratch area, gitignored going forward. Only the database is the
real store — do not treat a file in `_drafts/` as the source of truth.

## Images

Screenshots land in `public/images/work/` as PNG, then
`node scripts/optimize-images.mjs` converts them to WebP (max width 1920) and
moves the originals to `_originals/`. Reference the `.webp` filename from
frontmatter. `src/utils/imageSize.ts` reads dimensions at build time so images
carry width/height and do not cause layout shift.

## Design system

All values live in `src/styles/tokens.css` — colour, type scale, spacing,
easing. `global.css` imports it and sets the reset and base typography.
Component styles stay in the component's own `<style>` block.

**Deliberately not done.** These are choices, not omissions — do not add them
without asking:

- No gradients, drop shadows, or glassmorphism
- No dark mode
- No accent colour beyond `--c-accent` (`#0B5D51`), used only for links and hover
- No CSS framework
- No client-side JS beyond what a component genuinely needs
- English only, no i18n

## Case study page structure

`src/pages/work/[slug].astro` renders, in order: title and tagline → MetaBar
(year / role / duration / live and GitHub links) → full-width cover → StatRow
(`highlights`) → the Markdown body → ProjectNav (previous / next project).

The Markdown body is expected to open with `## Overview`, then `## My Role`,
then `## Architecture`. Three further sections — Technical Deep Dive, Outcome,
Reflection — were written and then removed from all five case studies; the text
is preserved in `_drafts/<slug>.md` below the separator and can be pasted back
onto the end of the corresponding file in `src/content/work/`.

---

## Known gaps

Real problems, recorded so they are not rediscovered:

- **No tests, no CI.** `npm run check` and `npm run build` are the whole safety
  net, and both are manual.
- **`scripts/shoot.mjs` only runs on the original author's machine.** Line 1
  imports Playwright through an absolute path into an unrelated local project.
  It needs Playwright as a real devDependency before anyone else can run it.
- **Voice is inconsistent across pages.** `index.astro` and `about.astro` speak
  as one person; `how-we-work.astro` and `engagement-model.astro` still use
  "we" and "our". Pick one before the next content pass.
- **`featured` is set to `true` on every case study**, so the filter in
  `index.astro` currently selects everything. Harmless, but the field is not
  doing any work.
- **`db/blog.sqlite3` is a binary committed to Git**, so post edits produce
  opaque diffs and can conflict badly. Acceptable for one author; revisit if
  that changes.
