import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });


await page.goto(`file://${path.join(__dirname, 'og-image.html')}`, {
  waitUntil: 'networkidle0',
});


await page.evaluateHandle('document.fonts.ready');

await page.evaluate(async () => {
  const imgs = Array.from(document.images);
  await Promise.all(
    imgs.map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
          })
    )
  );
});

await page.screenshot({
  path: path.join(__dirname, '..', 'public', 'og-image.jpg'),
  type: 'jpeg',
  quality: 90,
});

await browser.close();
console.log('✓ Generated public/og-image.jpg');