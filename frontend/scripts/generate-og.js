import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto(`file://${__dirname}/og-image.html`);
await page.screenshot({
  path: 'public/og-image.jpg',
  type: 'jpeg',
  quality: 90,
});
await browser.close();
console.log('✓ Generated public/og-image.jpg');