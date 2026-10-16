import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function verifyUpdates() {
  const outDir = path.join(process.cwd(), "audit-v2", "user-feedback-check");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto("http://localhost:3005", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // 1. Check Hero Fact Badges count and text
  const facts = await page.$$eval(".stage-fact", els => els.map(el => el.innerText.replace(/\n/g, ' ')));
  console.log("Found Hero badges:", facts);

  // 2. Screenshot Hero with 4 badges
  const heroShot = path.join(outDir, "hero-4-badges.png");
  await page.screenshot({ path: heroShot });
  console.log("Saved hero screenshot:", heroShot);

  // 3. Test Marquee hover circulation
  const marquee = await page.$("[data-marquee]");
  if (marquee) {
    const beforeOffset = await page.$eval("[data-marquee-svg] textPath", el => el.getAttribute("startOffset"));
    console.log("Marquee offset before hover:", beforeOffset);
    await marquee.hover();
    await page.waitForTimeout(1000);
    const afterOffset = await page.$eval("[data-marquee-svg] textPath", el => el.getAttribute("startOffset"));
    console.log("Marquee offset during hover:", afterOffset);
    
    const marqueeShot = path.join(outDir, "marquee-hover.png");
    await page.screenshot({ path: marqueeShot });
    console.log("Saved marquee screenshot:", marqueeShot);
  }

  // 4. Check About section deck cards
  const aboutEl = await page.$("#sobre");
  if (aboutEl) {
    await aboutEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const cardsDeck = await page.$(".testimonial-wrapper.cards-deck");
    const deckCards = await page.$$(".deck-card");
    console.log("Found deck cards count:", deckCards.length);

    // Screenshot resting deck
    const deckRestShot = path.join(outDir, "about-deck-rest.png");
    await page.screenshot({ path: deckRestShot });
    console.log("Saved deck rest screenshot:", deckRestShot);

    // Hover Card 1
    if (deckCards[0]) {
      await deckCards[0].hover();
      await page.waitForTimeout(400);
      const card1HoverShot = path.join(outDir, "about-deck-hover-card1.png");
      await page.screenshot({ path: card1HoverShot });
      console.log("Saved card 1 hover screenshot:", card1HoverShot);
    }

    // Hover Card 3 (Data & AI)
    if (deckCards[2]) {
      await deckCards[2].hover();
      await page.waitForTimeout(400);
      const card3HoverShot = path.join(outDir, "about-deck-hover-card3.png");
      await page.screenshot({ path: card3HoverShot });
      console.log("Saved card 3 hover screenshot:", card3HoverShot);
    }
  }

  // 5. Check remaining em dashes in body
  const bodyText = await page.evaluate(() => document.body.innerText);
  const emDashMatches = bodyText.match(/[—–]/g) || [];
  console.log("Remaining em/en dashes in visible text:", emDashMatches.length);

  await browser.close();
}

verifyUpdates().catch(err => {
  console.error("Verification error:", err);
  process.exit(1);
});
