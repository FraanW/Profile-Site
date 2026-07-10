/**
 * Dev-time verification (Sindri): load the real production pages in
 * Chromium and photograph the moments that matter — hero, sections, the
 * constellation, the kindling rail mid-scroll, the contact finale, the
 * projects page, and the mobile column. Output: scripts/shots/*.png
 * (gitignored). Usage: node scripts/shoot-pages.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const BASE = process.argv[2] ?? "http://localhost:3111";
const OUT = fileURLToPath(new URL("./shots/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shoot(name, { width, height, path: urlPath = "/", scrollTo, settle = 900, reducedMotion = "no-preference" }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    reducedMotion,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + urlPath, { waitUntil: "networkidle" });
  if (scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "start", behavior: "instant" });
    }, scrollTo);
  }
  await page.waitForTimeout(settle);
  await page.screenshot({ path: `${OUT}${name}.png` });
  await ctx.close();
  console.log(`shot: ${name}`);
}

// Desktop 1280
await shoot("hero-1280", { width: 1280, height: 800 });
await shoot("about-1280", { width: 1280, height: 800, scrollTo: "#about" });
await shoot("tiles-1280", { width: 1280, height: 800, scrollTo: "#work" });
await shoot("sky-1280", { width: 1280, height: 900, scrollTo: "#sky", settle: 2600 });
await shoot("signals-1280", { width: 1280, height: 800, scrollTo: "#signals" });
await shoot("contact-finale-1280", { width: 1280, height: 900, scrollTo: "#contact", settle: 3200 });
await shoot("projects-1280", { width: 1280, height: 900, path: "/projects" });

// Wide 1920
await shoot("hero-1920", { width: 1920, height: 1000 });
await shoot("sky-1920", { width: 1920, height: 1000, scrollTo: "#sky", settle: 2600 });

// Tablet 768
await shoot("hero-768", { width: 768, height: 1024 });
await shoot("sky-768", { width: 768, height: 1024, scrollTo: "#sky", settle: 2600 });

// Mobile 360
await shoot("hero-360", { width: 360, height: 740 });
await shoot("sky-360", { width: 360, height: 740, scrollTo: "#sky", settle: 2600 });
await shoot("contact-360", { width: 360, height: 740, scrollTo: "#contact", settle: 3200 });
await shoot("projects-360", { width: 360, height: 740, path: "/projects" });

// Reduced motion: the final-frame contract.
await shoot("reduced-hero-1280", { width: 1280, height: 800, reducedMotion: "reduce" });
await shoot("reduced-contact-1280", { width: 1280, height: 900, scrollTo: "#contact", settle: 600, reducedMotion: "reduce" });

await browser.close();
console.log("done");
