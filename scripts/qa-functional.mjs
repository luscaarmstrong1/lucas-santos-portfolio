import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const LOCAL_URL = process.env.LOCAL_URL || 'http://localhost:3000';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const consoleErrors = [];

  const record = (test, passed, details = '') => {
    results.push({ test, passed, details });
    console.log(`${passed ? 'PASS' : 'FAIL'} | ${test}${details ? ` (${details})` : ''}`);
  };

  // 1. Desktop Functional Tests (1440x900)
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[Desktop] ${msg.text()}`);
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(`[Desktop PageError] ${err.message}`);
    });

    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Font loading & ready state
    const htmlClasses = await page.evaluate(() => document.documentElement.className);
    record(
      'Fonts & Ready Classes Loaded',
      htmlClasses.includes('fonts-loaded') && htmlClasses.includes('is-ready'),
      htmlClasses
    );

    // Skip link & semantics
    const skipHref = await page.locator('a.salto').getAttribute('href');
    record('Skip Link Present (#principal)', skipHref === '#principal', `href=${skipHref}`);

    // Header navigation links
    const navHrefs = await page
      .locator('.navbar nav a')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    record(
      'Header Anchor Links (#areas, #diferenca, #conteudo)',
      JSON.stringify(navHrefs) === JSON.stringify(['#areas', '#diferenca', '#conteudo']),
      navHrefs.join(', ')
    );

    // Sound toggle button on video
    const soundBtn = page.locator('[data-video-button]').first();
    await soundBtn.click();
    const soundClicked = await soundBtn.evaluate((el) => el.classList.contains('is-clicked'));
    const videoUnmuted = await page.locator('video[data-video]').first().evaluate((v) => !v.muted);
    record('Video Audio Toggle Button', soundClicked && videoUnmuted, `is-clicked=${soundClicked}, unmuted=${videoUnmuted}`);
    await soundBtn.click(); // mute back

    // Instagram carousel navigation (scroll into view first so [data-testimonial-inview] ScrollTrigger onEnter fires before manual button test)
    await page.locator('#conteudo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const initialActiveTitle = await page
      .locator('.testimonial-slider-item-wrap.is-active .testimonial-item-heading')
      .textContent();
    await page.locator('[data-slider-right-button]').click();
    await page.waitForTimeout(200);
    const nextActiveTitle = await page
      .locator('.testimonial-slider-item-wrap.is-active .testimonial-item-heading')
      .textContent();
    record(
      'Instagram Carousel Next Button',
      initialActiveTitle !== nextActiveTitle && !!nextActiveTitle,
      `${initialActiveTitle} -> ${nextActiveTitle}`
    );

    await page.locator('[data-slider-left-button]').click();
    await page.waitForTimeout(200);
    const prevActiveTitle = await page
      .locator('.testimonial-slider-item-wrap.is-active .testimonial-item-heading')
      .textContent();
    record(
      'Instagram Carousel Prev Button',
      prevActiveTitle === initialActiveTitle,
      `${nextActiveTitle} -> ${prevActiveTitle}`
    );

    // Daily meals carousel navigation
    const beforeMeal = await page
      .locator('.flavour-content-swiper .swiper-slide-active .flavour-content-slider-title')
      .textContent();
    await page.locator('[data-flavour-slider-right-button]').click();
    await page.waitForTimeout(700);
    const afterMeal = await page
      .locator('.flavour-content-swiper .swiper-slide-active .flavour-content-slider-title')
      .textContent();
    record(
      'Daily Meals Swiper Next Button (Synced Controller)',
      beforeMeal !== afterMeal && !!afterMeal,
      `${beforeMeal} -> ${afterMeal}`
    );

    await page.locator('[data-flavour-slider-left-button]').click();
    await page.waitForTimeout(700);
    const backMeal = await page
      .locator('.flavour-content-swiper .swiper-slide-active .flavour-content-slider-title')
      .textContent();
    record(
      'Daily Meals Swiper Prev Button',
      backMeal === beforeMeal,
      `${afterMeal} -> ${backMeal}`
    );

    // Footer Credits Toggle
    const creditsBtn = page.locator('.footer-credits-toggle');
    const expandedBefore = await creditsBtn.getAttribute('aria-expanded');
    await creditsBtn.click();
    const expandedAfter = await creditsBtn.getAttribute('aria-expanded');
    record(
      'Footer Expandable Credits Toggle',
      expandedBefore === 'false' && expandedAfter === 'true',
      `aria-expanded: ${expandedBefore} -> ${expandedAfter}`
    );

    // External Links Verification
    const externalHrefs = await page
      .locator('a[target="_blank"]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    const hasInsta = externalHrefs.some((h) => h?.includes('instagram.com/nutri.nathaliesales'));
    const hasWa = externalHrefs.some((h) => h?.includes('wa.me/5544991691998'));
    const hasMaps = externalHrefs.some((h) => h?.includes('Instituto+de+Cardiologia+Kioshima'));
    record(
      'External Links (Instagram, WhatsApp, Google Maps)',
      hasInsta && hasWa && hasMaps,
      `total external links=${externalHrefs.length}`
    );

    // All images loaded with naturalWidth > 0
    const brokenImages = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img'))
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.src)
    );
    record('All Homepage Images Loaded (0 broken)', brokenImages.length === 0, `broken=${brokenImages.length}`);

    await context.close();
  }

  // 2. Mobile Responsiveness & Overflow Check (390x844)
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[Mobile] ${msg.text()}`);
    });
    await page.goto(`${LOCAL_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    record(
      'Mobile Viewport No Horizontal Overflow (390px)',
      overflow.scrollWidth <= overflow.innerWidth,
      `scrollWidth=${overflow.scrollWidth}, innerWidth=${overflow.innerWidth}`
    );

    const mobileCardsVisible = await page
      .locator('.sequence-cards-mobile')
      .evaluate((el) => getComputedStyle(el).display !== 'none');
    record('Mobile Sequence Layout Active at 390px', mobileCardsVisible);

    await context.close();
  }

  // 3. Evaluation Flow (/avaliacao/) Complete End-to-End & Validations
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(`[Avaliacao] ${msg.text()}`);
    });

    await page.goto(`${LOCAL_URL}/avaliacao/`, { waitUntil: 'networkidle' });

    // Step 1: Abertura -> click "Vamos lá!"
    const startBtn = page.locator('button.opcao', { hasText: 'Vamos lá!' });
    await startBtn.waitFor({ state: 'visible', timeout: 10000 });
    await startBtn.click();

    // Step 2: Nome -> test validation with 1 char first
    const nameInput = page.locator('#conversa-campo');
    await nameInput.waitFor({ state: 'visible', timeout: 10000 });
    await nameInput.fill('A');
    await page.locator('.conversa__campo button[type="submit"]').click();
    const nameErr = await page.locator('.conversa__erro').textContent();
    record(
      'Evaluation Name Validation Error State',
      nameErr?.includes('Escreve como você prefere'),
      nameErr || ''
    );

    await nameInput.fill('Maria Silva');
    await page.locator('.conversa__campo button[type="submit"]').click();

    // Step 3: Objetivo
    const objBtn = page.locator('button.opcao', { hasText: 'Emagrecer' });
    await objBtn.waitFor({ state: 'visible', timeout: 10000 });
    await objBtn.click();

    // Step 4: Atividade
    const ativBtn = page.locator('button.opcao', { hasText: 'Musculação' });
    await ativBtn.waitFor({ state: 'visible', timeout: 10000 });
    await ativBtn.click();

    // Step 5: Já fez
    const jaFezBtn = page.locator('button.opcao', { hasText: 'Sim, já fiz' });
    await jaFezBtn.waitFor({ state: 'visible', timeout: 10000 });
    await jaFezBtn.click();

    // Step 6: Modalidade
    const modBtn = page.locator('button.opcao', { hasText: 'Presencial em Maringá' });
    await modBtn.waitFor({ state: 'visible', timeout: 10000 });
    await modBtn.click();

    // Step 7: Origem
    const origBtn = page.locator('button.opcao', { hasText: 'Instagram' });
    await origBtn.waitFor({ state: 'visible', timeout: 10000 });
    await origBtn.click();

    // Step 8: Como trabalho -> "Entendi"
    const entendiBtn = page.locator('button.opcao', { hasText: 'Entendi' });
    await entendiBtn.waitFor({ state: 'visible', timeout: 10000 });
    await entendiBtn.click();

    // Step 9: WhatsApp -> test validation with short phone first
    const phoneInput = page.locator('#conversa-campo');
    await phoneInput.waitFor({ state: 'visible', timeout: 10000 });
    await phoneInput.fill('44999');
    await page.locator('.conversa__campo button[type="submit"]').click();
    const phoneErr = await page.locator('.conversa__erro').textContent();
    record(
      'Evaluation WhatsApp Validation Error State',
      phoneErr?.includes('Confere o número com o DDD'),
      phoneErr || ''
    );

    await phoneInput.fill('44991691998');
    const formattedPhone = await phoneInput.inputValue();
    record(
      'Evaluation WhatsApp Mask Formatting',
      formattedPhone === '(44) 99169-1998',
      formattedPhone
    );
    await page.locator('.conversa__campo button[type="submit"]').click();

    // Step 10: Horário
    const horBtn = page.locator('button.opcao', { hasText: 'De manhã' });
    await horBtn.waitFor({ state: 'visible', timeout: 10000 });
    await horBtn.click();

    // Step 11: Consentimento
    const consentBtn = page.locator('button.opcao', { hasText: 'Autorizo e envio' });
    await consentBtn.waitFor({ state: 'visible', timeout: 10000 });
    await consentBtn.click();

    // Step 12: Fim -> verify WhatsApp summary link
    const finalZap = page.locator('a.conversa__zap');
    await finalZap.waitFor({ state: 'visible', timeout: 10000 });
    const zapHref = await finalZap.getAttribute('href');
    const decodedZap = decodeURIComponent(zapHref || '');
    record(
      'Evaluation Flow Complete & Summary WhatsApp Link',
      decodedZap.includes('Oi, Nathalie! Sou Maria Silva.') &&
        decodedZap.includes('objetivo emagrecer') &&
        decodedZap.includes('treino musculação'),
      decodedZap
    );

    await context.close();
  }

  // 4. Privacy Policy Page (/privacidade/)
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(`${LOCAL_URL}/privacidade/`, { waitUntil: 'networkidle' });
    const h1Text = await page.locator('main.privacidade h1').textContent();
    const h2Count = await page.locator('main.privacidade h2').count();
    const backHref = await page.locator('main.privacidade p a').first().getAttribute('href');
    record(
      'Privacy Policy Page Content & Structure',
      h1Text === 'Política de privacidade' && h2Count === 5 && backHref === '/',
      `h1="${h1Text}", h2Count=${h2Count}, backHref=${backHref}`
    );
    await context.close();
  }

  // 5. Zero Console Errors
  record('Zero JavaScript Console/Page Errors', consoleErrors.length === 0, consoleErrors.join('; '));

  fs.writeFileSync(
    path.resolve('audit/qa-results.json'),
    JSON.stringify({ results, consoleErrors }, null, 2)
  );

  await browser.close();
  const failed = results.filter((r) => !r.passed);
  if (failed.length > 0) {
    console.error(`${failed.length} QA test(s) failed!`);
    process.exit(1);
  }
  console.log('All QA functional tests passed!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
