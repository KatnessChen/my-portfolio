import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect x="0" y="0" width="1200" height="6" fill="#1A1A1A"/>
  <text x="80" y="150" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="22" font-weight="500" letter-spacing="2.2" fill="#9B9B9B">
    YU-WEN CHEN (KATNESS) — OTTAWA, CANADA
  </text>
  <text x="80" y="280" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="64" font-weight="600" letter-spacing="-2" fill="#1A1A1A">
    Helping non-technical founders
  </text>
  <text x="80" y="358" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="64" font-weight="600" letter-spacing="-2" fill="#1A1A1A">
    turn ideas into launch-ready MVPs.
  </text>
  <line x1="80" y1="470" x2="1120" y2="470" stroke="#E8E8E8" stroke-width="1"/>
  <text x="80" y="530" font-family="Helvetica Neue, Helvetica, Arial, sans-serif"
        font-size="26" fill="#6B6B6B">
    MaraMap · Vizino AI · Monny AI · Well Maintained · Zenfolio
  </text>
</svg>`;

const out = 'public/og-default.png';
await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote', out);
