# 上線前待辦

## 🔴 阻擋上線

- [ ] **`astro.config.mjs` 的 `site`** 換成正式網址（`public/robots.txt` 裡的 sitemap URL 也要同步）

以上這一項改完就可以上線。

## 🟡 上線後盡快補

### 定位改了，其他文案還沒跟上

Hero 大字現在是「Helping non-technical founders turn ideas into workable MVPs.」，
但下面兩處還是舊的敘事角度：

- `profile.ts` 的 `bioShort` / `bioLong` 寫的是「我是工程師、正在做自己的 SaaS」
- 首頁 Contact 區的標題是「Currently building my own SaaS — and open to talking
  about interesting work.」

兩者都沒有錯，但對「找我把想法做成 MVP」的訪客來說，CTA 太模糊。
建議改成明確的邀請（例如講清楚合作形式、時程、你適合接什麼樣的案子）。
要我改跟我說。

### 被隱藏的區塊

Technical Deep Dive / Outcome / Reflection 三段已從 5 個 case study 移出，
完整內容（含原本寫好的段落與 TODO 提示）保存在專案根目錄的 `_drafts/`：

```
_drafts/maramap.md   monny-ai.md   vizino-ai.md   well-maintained.md   zenfolio.md
```

要恢復顯示，把 `_drafts/<slug>.md` 分隔線以下的內容貼回
`src/content/work/<slug>.md` 最後面即可。`_drafts/` 不會被 build 讀到。

> ⚠️ **Monny AI 的 Technical Deep Dive 原本是寫完的**，不是 TODO。
> 那段（規則 vs LLM 的取捨、本地模型準確率不足而退回規則表、Decimal 鐵則）
> 是整份作品集最有說服力的內容。建議優先把它貼回去。

### 其他

- [ ] **Vizino AI 的 `links.live`** — 還沒有線上網址
- [x] ~~Zenfolio 截圖~~ — 已本機跑起來截好（Transaction History + Portfolio 指標）
- [ ] **`highlights` 真實數據** — Vizino 目前空的、Zenfolio 只有兩項技術事實。
      Zenfolio 現在有可用的真實數字了（總值 $113,907、+52.74%、XIRR +19.59%），
      但那是我灌的 12 筆假交易算出來的，不建議當成作品集數據。
      MaraMap 與 Well Maintained 已經用線上站的真實數字填好。
- [ ] **長版自介** — `src/data/profile.ts` 的 `bioLong` 是我從短版擴寫的，請潤過
- [ ] **經歷有斷層** — 你說六年，時間軸只有 2020–2024。2020 以前補上
- [ ] **履歷 PDF** — 放 `public/resume.pdf`，再把 `profile.ts` 的 `resume: null`
      改成 `'/resume.pdf'`，頁尾與 About 頁按鈕會自動出現

## ⚠️ 隱私：Monny 封面圖

`monny-ai_01.webp` 的金額被 app 的隱私開關遮掉了，但**商家名稱與日期是明碼**
（STARBUCKS COFFEE #5390、SANSOTEI RAMEN KANATA、TD Credit Card、TD Joint Chequing、
2026-03-31…）。作品集是公開網頁。

想換的話最省事：封面改成 `monny-ai_02.webp`（Import CSV，畫面無個人資料，
而且 UI 文案剛好佐證「rules-based parsing, no AI involved」）。

## 🟢 建議但不急

- [ ] **MaraMap 的品牌名不一致** — 線上站叫「Davis & Rose / 環球跑旅」且介面是中文，
      作品集標題寫 MaraMap。招募方點進去會愣一下，建議在 Overview 開頭補一句
      說明 MaraMap 是專案代號、上線品牌是環球跑旅。
- [ ] **`AI Integration` 技能欄** — 目前列 Claude Code / Copilot / Gemini，那是
      「用 AI 寫程式」。你五個作品實際用到的是 Gemini 2.5 / 2.0 Flash、Vertex AI、
      Ollama 地端模型、可抽換的 model provider 介面、批次分類 pipeline、
      規則 vs 模型的取捨 —— 那才是這欄該寫的。
- [ ] **GitHub repo 改名** — Well Maintained 的 repo 還叫
      `Vizino-Studio-Official-Website`；Zenfolio 的 remote 還叫 `transaction_tracker`
      （`github.com/KatnessChen/zenfolio` 可以開，是同一個）。GitHub 改名會自動轉址。
- [ ] **強調色** — 深墨綠 `#0B5D51`，只用在 hover 與連結。
      改 `src/styles/tokens.css` 的 `--c-accent` 一行
      （備選：墨藍 `#1B3A6B`／暖赭 `#9A4B2E`／純黑 `#1A1A1A`）

## Zenfolio 本機環境（我起的，記得關）

```bash
cd ~/Develop/100_Case/04_Zenfolio && docker-compose down
```

跑起來時發現三件事，都是 Zenfolio 自己的問題，不影響作品集：

1. **前端 port 3000 與 monny-frontend 衝突** — 我沒動你的 Monny，改用
   `-f docker-compose.yml -f <override>` 把 Zenfolio 前端映到 3100。
2. **Total Value 歷史圖表在免費 API 方案下必定失敗** — price service 抓歷史價格用
   Alpha Vantage 的 `outputsize=full`，那是付費功能，免費金鑰只會收到一段
   "premium feature" 提示。所以我沒把那張圖放進作品集。
3. **歷史資料失敗會連帶讓 Positions 也掛掉** — 現價走 Finnhub 免費 quote 是正常的
   （我用 API 直接打有拿到完整持倉與 XIRR），但只要頁面上的歷史圖表先失敗，
   Positions 就跟著顯示 "Failed to load positions"。看起來斷路器的失敗會跨到
   另一個資料來源，這點值得查。另外歷史資料全為 0 時，UI 會顯示 `Change % ∞`，
   應該要有空狀態。

我在 Zenfolio 的資料庫建了一個 demo 帳號（`demo@example.com`）和 12 筆假交易來截圖。
不需要的話 `docker-compose down -v` 會連資料一起清掉。

## 部署（Vercel）

```bash
npx vercel --prod
```

## 常用指令

```bash
npm run dev
```

| 做什麼 | 指令 |
|---|---|
| 開發 | `npm run dev` |
| 建置 | `npm run build` |
| 重新產生 OG 圖 | `node scripts/make-og.mjs` |
| 截線上網站的圖 | `node scripts/shoot.mjs`（編輯檔案裡的 `shots` 陣列） |
| PNG 轉 WebP | `node scripts/optimize-images.mjs`（原圖移到 `_originals/`） |
