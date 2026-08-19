import { chromium } from '/Users/kc/Develop/100_Case/06_MaraMap/MaraMap-Frontend/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:3100';
const OUT = 'public/images/work';

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

await page.fill('input[type="email"], input[name="email"]', 'demo@example.com');
await page.fill('input[type="password"], input[name="password"]', 'demopassword123');
await page.click('button[type="submit"]');
await page.waitForTimeout(4000);
console.log('after login →', page.url());

await page.goto(`${BASE}/transactions`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(6000);
await page.screenshot({ path: `${OUT}/zenfolio_01.png` });
console.log('✓ zenfolio_01.png ← transactions');

await page.goto(`${BASE}/dashboard`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(12000);
await page.screenshot({
  path: `${OUT}/zenfolio_02.png`,
  clip: { x: 0, y: 0, width: 1440, height: 300 },
});
console.log('✓ zenfolio_02.png ← dashboard header');

await browser.close();
