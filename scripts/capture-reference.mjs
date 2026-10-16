import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

const BASE_URL = 'https://nathaliesales.mourabuild.dev';
const OUT_DIR = path.resolve('audit/reference');

const VIEWPORTS = [
  { width: 1920, height: 1080, label: '1920-desktop-amplo' },
  { width: 1440, height: 900, label: '1440-desktop-principal' },
  { width: 1280, height: 800, label: '1280-notebook' },
  { width: 1024, height: 768, label: '1024-tablet-horizontal' },
  { width: 768, height: 1024, label: '768-tablet-vertical' },
  { width: 390, height: 844, label: '390-smartphone' },
  { width: 375, height: 812, label: '375-smartphone-compacto' },
];

const SECTIONS = [
  { name: '01-hero-stage', selector: 'section.stage' },
  { name: '02-sobre', selector: '#sobre' },
  { name: '03-areas', selector: '#areas' },
  { name: '04-diferenca', selector: '#diferenca' },
  { name: '05-conteudo', selector: '#conteudo' },
  { name: '06-prato', selector: '#prato' },
  { name: '07-contato', selector: '#contato' },
  { name: '08-footer', selector: 'footer.footer' },
];

async function prepareDeterministicPage(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollbarWidth = 'none';
    const st = document.createElement('style');
    st.textContent = '::-webkit-scrollbar { display: none !important; }';
    document.head.appendChild(st);
    await document.fonts.ready;
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return img.decode().catch(() => {});
        return new Promise((res) => {
          img.addEventListener('load', () => img.decode().then(res).catch(res), { once: true });
          img.addEventListener('error', res, { once: true });
        });
      })
    );
    const videos = Array.from(document.querySelectorAll('video'));
    for (const v of videos) {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
    }
  });
  await page.waitForTimeout(800);
}

async function captureFullPageStitched(page) {
  const { totalHeight, vpWidth, vpHeight } = await page.evaluate(() => ({
    totalHeight: document.documentElement.scrollHeight,
    vpWidth: window.innerWidth,
    vpHeight: window.innerHeight,
  }));
  const fullPng = new PNG({ width: vpWidth, height: totalHeight });
  for (let y = 0; y < totalHeight; y += vpHeight) {
    const targetY = Math.min(y, Math.max(0, totalHeight - vpHeight));
    await page.evaluate((sy) => window.scrollTo(0, sy), targetY);
    await page.waitForTimeout(60);
    const buf = await page.screenshot({ animations: 'disabled' });
    const slice = PNG.sync.read(buf);
    const copyStartY = y - targetY;
    const copyHeight = Math.min(vpHeight - copyStartY, totalHeight - y);
    if (copyHeight > 0) {
      PNG.bitblt(slice, fullPng, 0, copyStartY, vpWidth, copyHeight, 0, y);
    }
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return fullPng;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const metadata = [];

  for (const vp of VIEWPORTS) {
    console.log(`Capturing reference at ${vp.width}x${vp.height}...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 60000 });
    await prepareDeterministicPage(page);

    const sectionBounds = await page.evaluate((secs) => {
      window.scrollTo(0, 0);
      return secs.map((s) => {
        const el = document.querySelector(s.selector);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          name: s.name,
          top: Math.max(0, Math.round(r.top + window.scrollY)),
          height: Math.round(r.height),
        };
      });
    }, SECTIONS);

    const fullPng = await captureFullPageStitched(page);
    const fullPath = path.join(OUT_DIR, `home-${vp.width}.png`);
    fs.writeFileSync(fullPath, PNG.sync.write(fullPng));

    const sectionDir = path.join(OUT_DIR, `sections-${vp.width}`);
    fs.mkdirSync(sectionDir, { recursive: true });

    for (const b of sectionBounds) {
      if (!b || b.height <= 0) continue;
      const cropY = Math.min(b.top, fullPng.height - 1);
      const cropH = Math.min(b.height, fullPng.height - cropY);
      if (cropH <= 0) continue;
      const secPng = new PNG({ width: fullPng.width, height: cropH });
      PNG.bitblt(fullPng, secPng, 0, cropY, fullPng.width, cropH, 0, 0);
      fs.writeFileSync(path.join(sectionDir, `${b.name}.png`), PNG.sync.write(secPng));
    }

    metadata.push({
      viewport: vp,
      scrollWidth: fullPng.width,
      scrollHeight: fullPng.height,
      devicePixelRatio: 1,
      fullScreenshot: `home-${vp.width}.png`,
      sections: sectionBounds.filter(Boolean),
    });

    await context.close();
  }

  for (const vp of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    console.log(`Capturing internal pages at ${vp.width}x${vp.height}...`);
    const context = await browser.newContext({
      viewport: vp,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/avaliacao/`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2500);
    await prepareDeterministicPage(page);
    const avalPng = await captureFullPageStitched(page);
    fs.writeFileSync(path.join(OUT_DIR, `avaliacao-${vp.width}.png`), PNG.sync.write(avalPng));

    await page.goto(`${BASE_URL}/privacidade/`, { waitUntil: 'networkidle', timeout: 60000 });
    await prepareDeterministicPage(page);
    const privPng = await captureFullPageStitched(page);
    fs.writeFileSync(path.join(OUT_DIR, `privacidade-${vp.width}.png`), PNG.sync.write(privPng));

    await context.close();
  }

  if (fs.existsSync(path.join(OUT_DIR, 'test-stitched.png'))) {
    fs.unlinkSync(path.join(OUT_DIR, 'test-stitched.png'));
  }
  if (fs.existsSync(path.join(OUT_DIR, 'test-vp.png'))) {
    fs.unlinkSync(path.join(OUT_DIR, 'test-vp.png'));
  }

  fs.writeFileSync(path.join(OUT_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));
  await browser.close();
  console.log('Reference captures completed!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
