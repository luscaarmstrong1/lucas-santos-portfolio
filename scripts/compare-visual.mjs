import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const LOCAL_URL = process.env.LOCAL_URL || 'http://localhost:3000';
const REF_DIR = path.resolve('audit/reference');
const COMP_DIR = path.resolve('audit/comparison');

const VIEWPORTS = [
  { width: 1920, height: 1080, label: '1920-desktop-amplo' },
  { width: 1440, height: 900, label: '1440-desktop-principal' },
  { width: 1280, height: 800, label: '1280-notebook' },
  { width: 1024, height: 768, label: '1024-tablet-horizontal' },
  { width: 768, height: 1024, label: '768-tablet-vertical' },
  { width: 390, height: 844, label: '390-smartphone' },
  { width: 375, height: 812, label: '375-smartphone-compacto' },
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

function padOrCropImage(img, targetWidth, targetHeight) {
  if (img.width === targetWidth && img.height === targetHeight) return img;
  const out = new PNG({ width: targetWidth, height: targetHeight });
  const copyW = Math.min(img.width, targetWidth);
  const copyH = Math.min(img.height, targetHeight);
  for (let y = 0; y < copyH; y++) {
    for (let x = 0; x < copyW; x++) {
      const srcIdx = (img.width * y + x) << 2;
      const dstIdx = (targetWidth * y + x) << 2;
      out.data[dstIdx] = img.data[srcIdx];
      out.data[dstIdx + 1] = img.data[srcIdx + 1];
      out.data[dstIdx + 2] = img.data[srcIdx + 2];
      out.data[dstIdx + 3] = img.data[srcIdx + 3];
    }
  }
  return out;
}

function computeMAEAndOverlay(imgA, imgB, width, height) {
  const overlay = new PNG({ width, height });
  let sumAbsDiff = 0;
  const totalChannels = width * height * 3;

  for (let i = 0; i < width * height * 4; i += 4) {
    const rA = imgA.data[i];
    const gA = imgA.data[i + 1];
    const bA = imgA.data[i + 2];
    const rB = imgB.data[i];
    const gB = imgB.data[i + 1];
    const bB = imgB.data[i + 2];

    sumAbsDiff += Math.abs(rA - rB) + Math.abs(gA - gB) + Math.abs(bA - bB);

    overlay.data[i] = Math.round((rA + rB) / 2);
    overlay.data[i + 1] = Math.round((gA + gB) / 2);
    overlay.data[i + 2] = Math.round((bA + bB) / 2);
    overlay.data[i + 3] = 255;
  }

  const mae = sumAbsDiff / totalChannels;
  const normalizedMAE = (mae / 255) * 100;
  return { mae, normalizedMAE, overlay };
}

async function compareFilePair(name, refPath, localPath) {
  const refImgRaw = PNG.sync.read(fs.readFileSync(refPath));
  const locImgRaw = PNG.sync.read(fs.readFileSync(localPath));

  const width = Math.max(refImgRaw.width, locImgRaw.width);
  const height = Math.max(refImgRaw.height, locImgRaw.height);

  const refImg = padOrCropImage(refImgRaw, width, height);
  const locImg = padOrCropImage(locImgRaw, width, height);
  const diffImg = new PNG({ width, height });

  const diffPixels = pixelmatch(refImg.data, locImg.data, diffImg.data, width, height, {
    threshold: 0.1,
  });

  const totalPixels = width * height;
  const matchPercentage = ((totalPixels - diffPixels) / totalPixels) * 100;
  const { mae, normalizedMAE, overlay } = computeMAEAndOverlay(refImg, locImg, width, height);

  fs.writeFileSync(path.join(COMP_DIR, `${name}-diff.png`), PNG.sync.write(diffImg));
  fs.writeFileSync(path.join(COMP_DIR, `${name}-overlay.png`), PNG.sync.write(overlay));

  return {
    name,
    refDimensions: { width: refImgRaw.width, height: refImgRaw.height },
    localDimensions: { width: locImgRaw.width, height: locImgRaw.height },
    heightDiffPx: locImgRaw.height - refImgRaw.height,
    diffPixels,
    totalPixels,
    pixelmatchSimilarityPct: Number(matchPercentage.toFixed(2)),
    maeChannel0to255: Number(mae.toFixed(3)),
    maeSimilarityPct: Number((100 - normalizedMAE).toFixed(2)),
  };
}

async function main() {
  fs.mkdirSync(COMP_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`Capturing & comparing local build at ${vp.width}x${vp.height}...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle', timeout: 60000 });
    await prepareDeterministicPage(page);

    const localPng = await captureFullPageStitched(page);
    const localPath = path.join(COMP_DIR, `home-${vp.width}-local.png`);
    fs.writeFileSync(localPath, PNG.sync.write(localPng));
    await context.close();

    const refPath = path.join(REF_DIR, `home-${vp.width}.png`);
    if (fs.existsSync(refPath)) {
      const res = await compareFilePair(`home-${vp.width}`, refPath, localPath);
      results.push(res);
      console.log(
        `  -> [${vp.width}px] Height: ref=${res.refDimensions.height} vs local=${res.localDimensions.height} (diff=${res.heightDiffPx}px) | Pixelmatch Similarity: ${res.pixelmatchSimilarityPct}% | MAE Similarity: ${res.maeSimilarityPct}%`
      );
    }
  }

  for (const vp of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({
      viewport: vp,
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    await page.goto(`${LOCAL_URL}/avaliacao/`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2500);
    await prepareDeterministicPage(page);
    const localAvalPng = await captureFullPageStitched(page);
    const localAvalPath = path.join(COMP_DIR, `avaliacao-${vp.width}-local.png`);
    fs.writeFileSync(localAvalPath, PNG.sync.write(localAvalPng));
    const refAvalPath = path.join(REF_DIR, `avaliacao-${vp.width}.png`);
    if (fs.existsSync(refAvalPath)) {
      const res = await compareFilePair(`avaliacao-${vp.width}`, refAvalPath, localAvalPath);
      results.push(res);
      console.log(
        `  -> [avaliacao-${vp.width}] Pixelmatch Similarity: ${res.pixelmatchSimilarityPct}% | MAE Similarity: ${res.maeSimilarityPct}%`
      );
    }

    await page.goto(`${LOCAL_URL}/privacidade/`, { waitUntil: 'networkidle', timeout: 60000 });
    await prepareDeterministicPage(page);
    const localPrivPng = await captureFullPageStitched(page);
    const localPrivPath = path.join(COMP_DIR, `privacidade-${vp.width}-local.png`);
    fs.writeFileSync(localPrivPath, PNG.sync.write(localPrivPng));
    const refPrivPath = path.join(REF_DIR, `privacidade-${vp.width}.png`);
    if (fs.existsSync(refPrivPath)) {
      const res = await compareFilePair(`privacidade-${vp.width}`, refPrivPath, localPrivPath);
      results.push(res);
      console.log(
        `  -> [privacidade-${vp.width}] Pixelmatch Similarity: ${res.pixelmatchSimilarityPct}% | MAE Similarity: ${res.maeSimilarityPct}%`
      );
    }

    await context.close();
  }

  fs.writeFileSync(path.join(COMP_DIR, 'report.json'), JSON.stringify(results, null, 2));
  await browser.close();
  console.log('Visual comparison completed!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
