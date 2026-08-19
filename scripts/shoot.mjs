import { chromium } from '/Users/kc/Develop/100_Case/06_MaraMap/MaraMap-Frontend/node_modules/playwright/index.mjs';

const OUT = 'public/images/work';

const shots = [
  { url: 'https://maramap.vizino.ai/',            file: 'maramap_01.png',        wait: 4500 },
  { url: 'https://wellmaintained.vizino.ai/en/',  file: 'well-maintained_01.png', wait: 2500 },
  { url: 'https://wellmaintained.vizino.ai/en/smart-schedule', file: 'well-maintained_02.png', wait: 2500 },
];

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

for (const s of shots) {
  const page = await ctx.newPage();
  try {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch {
    await page.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  }
  await page.waitForTimeout(s.wait);
  await page.screenshot({ path: `${OUT}/${s.file}` });
  console.log('✓', s.file, '←', s.url, '|', await page.title());
  await page.close();
}

await browser.close();
