import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.PORTFOLIO_URL || "http://localhost:3005";
const OUT_DIR = path.resolve("audit/portfolio");
fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { width: 1920, height: 1080, label: "1920x1080" },
  { width: 1440, height: 900, label: "1440x900" },
  { width: 1280, height: 800, label: "1280x800" },
  { width: 1024, height: 768, label: "1024x768" },
  { width: 768, height: 1024, label: "768x1024" },
  { width: 390, height: 844, label: "390x844" },
  { width: 375, height: 667, label: "375x667" },
];

const FORBIDDEN = [
  "nathalie",
  "nutricionista",
  "maringá",
  "crn",
  "instagram",
  "moura build",
  "unicesumar",
  "kioshima",
  "mounjaro",
  "ozempic",
  "lipedema",
];

async function run() {
  const browser = await chromium.launch();
  const report = {
    baseUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    consoleErrors: [],
    failedAssets: [],
    forbiddenMatches: [],
    projectsCount: 0,
    routesVerified: {},
    briefingFlowPassed: false,
    viewportsCaptured: [],
  };

  // 1. Capture 7 viewports on "/"
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    if (vp.width === 1440) {
      page.on("console", (msg) => {
        if (msg.type() === "error") report.consoleErrors.push(msg.text());
      });
      page.on("response", (res) => {
        if (res.status() >= 400) {
          report.failedAssets.push(`${res.status()} ${res.url()}`);
        }
      });
    }

    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    if (vp.width === 1440) {
      const bodyText = (await page.locator("body").innerText()).toLowerCase();
      for (const word of FORBIDDEN) {
        if (bodyText.includes(word)) {
          report.forbiddenMatches.push({ route: "/", word });
        }
      }
      report.projectsCount = await page.locator("#projetos .testimonial-slider-item").count();
      report.routesVerified["/"] = true;
    }

    const vpShot = path.join(OUT_DIR, `home-${vp.label}-hero.png`);
    await page.screenshot({ path: vpShot, fullPage: false, animations: "disabled" });

    if (vp.width === 1440) {
      const sections = [
        { id: "#sobre", name: "02-sobre" },
        { id: "#atuacao", name: "03-atuacao" },
        { id: "#diferenca", name: "04-diferenca" },
        { id: "#projetos", name: "05-projetos" },
        { id: "#arquitetura", name: "06-arquitetura" },
        { id: "#experiencia", name: "07-experiencia" },
        { id: "#contato", name: "08-contato" },
        { id: "footer", name: "09-footer" },
      ];
      for (const sec of sections) {
        await page.locator(sec.id).scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await page.screenshot({
          path: path.join(OUT_DIR, `section-${sec.name}-1440x900.png`),
          fullPage: false,
          animations: "disabled",
        });
      }
    }

    report.viewportsCaptured.push(vp.label);
    await context.close();
  }

  // 2. Test /contato/ interactive 7-step briefing flow
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/contato/`, { waitUntil: "networkidle" });
    await page.waitForSelector("button.opcao");

    const bodyText = (await page.locator("body").innerText()).toLowerCase();
    for (const word of FORBIDDEN) {
      if (bodyText.includes(word)) {
        report.forbiddenMatches.push({ route: "/contato/", word });
      }
    }

    await page.screenshot({
      path: path.join(OUT_DIR, "contato-1440x900-initial.png"),
      animations: "disabled",
    });

    // Step 1: Vamos começar
    await page.click("button.opcao");
    await page.waitForSelector("#conversa-campo");

    // Step 2: Nome
    await page.fill("#conversa-campo", "Carlos Eduardo");
    await page.click('.conversa__campo button[type="submit"]');
    await page.waitForSelector("button.opcao");

    // Step 3: Demanda
    await page.click('button.opcao:has-text("Engenharia Elétrica / Energia Solar")');
    await page.waitForSelector('button.opcao:has-text("Empresa")');

    // Step 4: Contexto
    await page.click('button.opcao:has-text("Empresa")');
    await page.waitForSelector('button.opcao:has-text("Preciso iniciar o quanto antes")');

    // Step 5: Prazo
    await page.click('button.opcao:has-text("Preciso iniciar o quanto antes")');
    await page.waitForSelector("#conversa-campo");

    // Step 6: Canal de retorno
    await page.fill("#conversa-campo", "carlos@empresa.com.br");
    await page.click('.conversa__campo button[type="submit"]');
    await page.waitForSelector('button.opcao:has-text("Autorizo e concluir")');

    // Step 7: Consentimento
    await page.click('button.opcao:has-text("Autorizo e concluir")');
    await page.waitForSelector('a.conversa__zap:has-text("Conectar no LinkedIn")');

    await page.screenshot({
      path: path.join(OUT_DIR, "contato-1440x900-completed.png"),
      animations: "disabled",
    });
    report.briefingFlowPassed = true;
    report.routesVerified["/contato/"] = true;
    await context.close();
  }

  // 3. Test /privacidade/
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/privacidade/`, { waitUntil: "networkidle" });
    const bodyText = (await page.locator("body").innerText()).toLowerCase();
    for (const word of FORBIDDEN) {
      if (bodyText.includes(word)) {
        report.forbiddenMatches.push({ route: "/privacidade/", word });
      }
    }
    await page.screenshot({
      path: path.join(OUT_DIR, "privacidade-1440x900.png"),
      animations: "disabled",
    });
    report.routesVerified["/privacidade/"] = true;
    await context.close();
  }

  await browser.close();
  fs.writeFileSync(path.join(OUT_DIR, "qa-report.json"), JSON.stringify(report, null, 2));
  console.log("QA REPORT:", JSON.stringify(report, null, 2));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
