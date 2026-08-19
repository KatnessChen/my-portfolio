# 個人作品集 — 架構規劃

## 定案

| 項目 | 決定 |
|---|---|
| 框架 | Astro（static output，零 JS） |
| 樣式 | 手寫 CSS + design tokens（不用 Tailwind） |
| 語言 | 純英文 |
| 結構 | 首頁 + 每專案獨立個案研究頁 |
| 部署 | Vercel |
| 內容層 | Astro Content Collections（Markdown + Zod schema） |

## 檔案結構

```
個人作品集/
├─ astro.config.mjs
├─ package.json
├─ vercel.json
├─ public/
│  ├─ fonts/                     # self-host Inter / Inter Tight
│  ├─ images/work/               # 專案截圖
│  ├─ resume.pdf
│  └─ favicon.svg
└─ src/
   ├─ styles/
   │  ├─ tokens.css              # 顏色 / 字級 / 間距 / 動態 變數
   │  └─ global.css              # reset + base typography
   ├─ data/
   │  └─ profile.ts              # 個人資料、技能矩陣、社群連結
   ├─ content/
   │  ├─ config.ts               # Zod schema（型別保證）
   │  └─ work/
   │     ├─ maramap.md
   │     ├─ vizino-ai.md
   │     ├─ monny-ai.md
   │     └─ well-maintained.md
   ├─ components/
   │  ├─ Nav.astro               # 極簡：名字 + Work / About / LinkedIn
   │  ├─ Footer.astro
   │  ├─ Hero.astro
   │  ├─ WorkCard.astro          # 首頁作品卡
   │  ├─ WorkGrid.astro
   │  ├─ MetaBar.astro           # 年份 / 角色 / 連結
   │  ├─ StatRow.astro           # highlights 數據列
   │  ├─ SectionHeading.astro
   │  ├─ FadeUp.astro            # IntersectionObserver，唯一的 JS
   │  └─ ProjectNav.astro        # 上/下一個專案
   ├─ layouts/
   │  ├─ BaseLayout.astro        # SEO / OG / JSON-LD Person
   │  └─ CaseStudyLayout.astro
   └─ pages/
      ├─ index.astro
      ├─ about.astro
      ├─ 404.astro
      └─ work/[slug].astro       # getStaticPaths 自動產生
```

## 首頁區塊順序

1. **Hero** — 姓名 + 一句話定位 + 2–3 行自介 + LinkedIn / GitHub / Email
2. **Selected Work** — 4 張大卡片，交錯排版（左圖右文 / 右圖左文）
3. **Capabilities** — 技能矩陣三欄：Frontend / Backend & Infra / AI Integration
4. **Contact** — 大字 CTA + LinkedIn

## 個案研究頁結構

```
① 標題 + tagline
② MetaBar：年份 / 角色 / 期間 / Live ↗ / GitHub ↗
③ 主視覺截圖（全寬）
④ StatRow：highlights 數據
⑤ Overview          — 背景與問題
⑥ My Role           — 負責範圍與技術決策
⑦ Architecture      — 系統架構圖 + 說明
⑧ Technical Deep Dive — 2–3 個挑戰，各自「問題 → 方案 → 取捨 → 結果」
⑨ Outcome           — 成果與數據
⑩ Reflection        — 回顧與下一步
⑪ ProjectNav        — 上/下一個專案
```

Well-Maintained（靜態網頁）⑦⑧ 合併為一段，改突出視覺設計與 Lighthouse 效能。

## Design Tokens

```css
--c-bg:        #FFFFFF;
--c-ink:       #1A1A1A;
--c-ink-muted: #6B6B6B;
--c-ink-faint: #9B9B9B;
--c-line:      #E8E8E8;
--c-accent:    (待定，只用於 hover 與 link underline)

--f-display: 'Inter Tight', system-ui;   /* letter-spacing: -0.03em */
--f-body:    'Inter', system-ui;

--t-hero:  clamp(3rem, 7vw, 6rem);
--t-h2:    clamp(2rem, 4vw, 3rem);
--t-h3:    1.5rem;
--t-body:  1.0625rem;   /* 17px */
--t-small: 0.875rem;

--s-section: clamp(6rem, 12vw, 10rem);   /* 區塊上下 padding */
--radius:    8px;
--ease:      cubic-bezier(0.16, 1, 0.3, 1);
```

**刻意不做**：漸層、陰影、玻璃擬態、深色模式、多重強調色。

## 效能與 SEO 基線

- Astro `<Image />` 自動 WebP + 尺寸標註（避免 CLS）
- 字體 self-host + `font-display: swap` + preload
- 每頁 OG image、`sitemap.xml`、`robots.txt`
- JSON-LD `Person` schema
- 目標：Lighthouse 四項 100

## 開工順序

1. 收到 profile.ts 資料 → 建 Astro 專案 + tokens + BaseLayout
2. 收到 4 支專案 Markdown → 建 Content Collections schema
3. 首頁 → 個案研究頁 → about → 404
4. 圖片最佳化 → SEO → Lighthouse 調校
5. Vercel 部署
