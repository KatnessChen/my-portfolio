# Yu-Wen Chen — Portfolio

Astro static site. Pure-white, typography-led design (WealthSimple-inspired).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## Where things live

| 要改什麼 | 改哪裡 |
|---|---|
| 自介、經歷、技能、社群連結 | `src/data/profile.ts` |
| 專案內容 | `src/content/work/*.md` |
| 專案欄位規則（型別） | `src/content/config.ts` |
| 顏色、字級、間距 | `src/styles/tokens.css` |
| 全站強調色 | `tokens.css` → `--c-accent` |
| 截圖 | `public/images/work/` |
| OG 分享圖 | `node scripts/make-og.mjs` 重新產生 |
| 履歷 | 放 `public/resume.pdf`，再把 `profile.ts` 的 `resume` 改成 `'/resume.pdf'` |

## 上線前必改

1. `astro.config.mjs` 的 `site` → 正式網域
2. `public/robots.txt` 的 sitemap URL → 同上

## Deploy (Vercel)

```bash
npx vercel --prod
```

或把 repo 推到 GitHub，在 Vercel 匯入即可（`vercel.json` 已設好）。
