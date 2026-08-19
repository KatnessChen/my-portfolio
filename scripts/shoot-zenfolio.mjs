// 登入本機 Zenfolio 的 demo 帳號並截圖。需先 docker-compose up。
import { chromium } from '/Users/kc/Develop/100_Case/06_MaraMap/MaraMap-Frontend/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:3100';
const OUT = 'public/images/work';

// backend 的 CORS origin 寫死 localhost:3000，而前端被迫跑在 3100
// （3000 被使用者的 monny-frontend 佔用）。純本機截圖，關掉瀏覽器的同源檢查即可，
// 不必動到專案程式碼或使用者正在跑的服務。
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: [
    '--disable-web-security',
    '--disable-site-isolation-trials',
  ],
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
page.on('console', (m) => m.type() === 'error' && console.log('  [console]', m.text().slice(0, 140)));

await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);

// 本機 dev 資料庫的拋棄式 demo 帳號
await page.fill('input[type="email"], input[name="email"]', 'demo@example.com');
await page.fill('input[type="password"], input[name="password"]', 'demopassword123');
await page.click('button[type="submit"]');
await page.waitForTimeout(4000);
console.log('after login →', page.url());

// 註：Total Value 歷史圖表需要 Alpha Vantage 的 outputsize=full，那是付費功能，
// 免費金鑰一定失敗。Positions 走 Finnhub /quote（免費）可以正常顯示，
// 前提是先用 API 暖過 Redis 快取、且斷路器是關閉狀態。
// Transaction History 不依賴外部價格 API，完整可截。
await page.goto(`${BASE}/transactions`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6000);
await page.screenshot({ path: `${OUT}/zenfolio_01.png` });
console.log('✓ zenfolio_01.png ← transactions');

// Dashboard 的上半部指標（總值 / 報酬率 / XIRR）走 Finnhub 免費 quote，會動；
// 下方 Total Value 圖表需要 Alpha Vantage 的 outputsize=full（付費），永遠是 $0 平線，
// 所以只截上半部，不把壞掉的圖表放進作品集。
await page.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(12000);
await page.screenshot({
  path: `${OUT}/zenfolio_02.png`,
  clip: { x: 0, y: 0, width: 1440, height: 300 },
});
console.log('✓ zenfolio_02.png ← dashboard header');

await browser.close();
