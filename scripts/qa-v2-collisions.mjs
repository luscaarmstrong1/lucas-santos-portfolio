import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "1920x1080", width: 1920, height: 1080 },
  { name: "1600x900", width: 1600, height: 900 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "820x1180", width: 820, height: 1180 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "430x932", width: 430, height: 932 },
  { name: "390x844", width: 390, height: 844 },
  { name: "375x667", width: 375, height: 667 },
  { name: "320x568", width: 320, height: 568 },
];

async function runAudit(phase = "before") {
  const outDir = path.join(process.cwd(), "audit-v2", phase);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const report = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto("http://localhost:3005", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    // Check collisions and DOM metrics
    const evalData = await page.evaluate(() => {
      const results = [];
      
      // 1. Check title collision in Attendance
      const titles = Array.from(document.querySelectorAll(".sequence-title"));
      const decos = Array.from(document.querySelectorAll(".sequence-final-cookie, .sequence-final-strawberry"));
      
      titles.forEach((t) => {
        const tRect = t.getBoundingClientRect();
        if (tRect.width === 0 || tRect.height === 0) return;
        decos.forEach((d) => {
          const dRect = d.getBoundingClientRect();
          if (dRect.width === 0 || dRect.height === 0) return;
          const overlap = !(
            dRect.right < tRect.left ||
            dRect.left > tRect.right ||
            dRect.bottom < tRect.top ||
            dRect.top > tRect.bottom
          );
          if (overlap) {
            results.push({
              type: "title-overlap",
              element: d.className,
              target: "sequence-title",
              details: `Decorative element ${d.className} overlaps sequence-title`,
            });
          }
        });
      });

      // 2. Check Sol Place / Experience card role vs period overlap
      const expCards = Array.from(document.querySelectorAll(".exp-card-top"));
      expCards.forEach((c) => {
        const role = c.querySelector(".exp-role");
        const period = c.querySelector(".exp-period");
        if (role && period) {
          const rRect = role.getBoundingClientRect();
          const pRect = period.getBoundingClientRect();
          const overlap = !(
            pRect.right < rRect.left ||
            pRect.left > rRect.right ||
            pRect.bottom < rRect.top ||
            pRect.top > rRect.bottom
          );
          if (overlap) {
            results.push({
              type: "exp-role-period-collision",
              role: role.textContent?.trim(),
              period: period.textContent?.trim(),
            });
          }
        }
      });

      // 3. Check horizontal overflow
      const docWidth = document.documentElement.scrollWidth;
      const viewWidth = window.innerWidth;
      const hasHorizontalOverflow = docWidth > viewWidth + 1;
      if (hasHorizontalOverflow) {
        results.push({
          type: "horizontal-overflow",
          docWidth,
          viewWidth,
          overflow: docWidth - viewWidth,
        });
      }

      // 4. Check duplicate text items for Dados & IA Aplicada
      const allText = document.body.innerText;
      const countDadosIA = (allText.match(/Dados & IA Aplicada/gi) || []).length;

      // 5. Check About portrait coverage
      const polaroids = Array.from(document.querySelectorAll(".testimonial-inner-wrap"));
      if (polaroids.length >= 3) {
        const r2 = polaroids[1].getBoundingClientRect(); // Lucas portrait
        const r3 = polaroids[2].getBoundingClientRect(); // 3rd polaroid
        const overlap3on2 = !(r3.right < r2.left || r3.left > r2.right || r3.bottom < r2.top || r3.top > r2.bottom);
        if (overlap3on2) {
          results.push({
            type: "about-polaroid-overlap",
            details: "Polaroid 3 overlaps Lucas portrait polaroid 2",
          });
        }
      }

      // 6. Check footer monumental logo overlap with links
      const footerLogo = document.querySelector(".footer-logo.desktop");
      const footerLinks = Array.from(document.querySelectorAll(".footer-shipping-wrapper a, .footer-social-media-wrap a, .footer-bottom-text"));
      if (footerLogo) {
        const logoRect = footerLogo.getBoundingClientRect();
        footerLinks.forEach((lnk) => {
          const lRect = lnk.getBoundingClientRect();
          const overlap = !(
            lRect.right < logoRect.left ||
            lRect.left > logoRect.right ||
            lRect.bottom < logoRect.top ||
            lRect.top > logoRect.bottom
          );
          const pointerEvents = window.getComputedStyle(footerLogo).pointerEvents;
          if (overlap && pointerEvents !== "none") {
            results.push({
              type: "footer-link-collision",
              target: lnk.textContent?.trim() || "link",
              pointerEvents,
              details: "Monumental footer logo intercepts clicks over link",
            });
          }
        });
      }

      return {
        collisions: results,
        dadosIACount: countDadosIA,
        hasHorizontalOverflow,
      };
    });

    // Viewport screenshot of Hero
    const heroShot = path.join(outDir, `${vp.name}-hero.png`);
    await page.screenshot({ path: heroShot, timeout: 5000 });

    // Scroll to About section and screenshot
    const aboutEl = await page.$("#sobre");
    if (aboutEl) {
      await aboutEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const aboutShot = path.join(outDir, `${vp.name}-about.png`);
      await page.screenshot({ path: aboutShot, timeout: 5000 });
    }

    // Scroll to Experience section and screenshot
    const expEl = await page.$("#experiencia");
    if (expEl) {
      await expEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const expShot = path.join(outDir, `${vp.name}-experience.png`);
      await page.screenshot({ path: expShot, timeout: 5000 });
    }

    // Scroll to Footer and screenshot
    const footerEl = await page.$("footer");
    if (footerEl) {
      await footerEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const footerShot = path.join(outDir, `${vp.name}-footer.png`);
      await page.screenshot({ path: footerShot, timeout: 5000 });
    }

    report.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      ...evalData,
    });

    console.log(`Viewport ${vp.name}: ${evalData.collisions.length} collision issues found`);

    await page.close();
  }

  await browser.close();

  const reportPath = path.join(process.cwd(), "audit-v2", `collision-report-${phase}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nAudit ${phase} finished. Report written to ${reportPath}`);
}

const phase = process.argv[2] || "before";
runAudit(phase);
