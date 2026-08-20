# Vizino AI — Site

![Homepage screenshot](public/images/screenshot.png)

Marketing and portfolio site for Vizino AI, a small studio helping non-technical
founders turn vibe-coded prototypes into launch-ready MVPs. Covers the portfolio,
how we work, engagement model, and about pages.

## Tech stack

- [Astro](https://astro.build) (static output) + TypeScript
- Hand-written CSS, no framework — design tokens in `src/styles/tokens.css`
- Content Collections (`src/content/work/`) for case studies, validated with Zod
- [Vercel Analytics](https://vercel.com/docs/analytics)
- Deployed on Vercel

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npx astro check  # type-check
```
