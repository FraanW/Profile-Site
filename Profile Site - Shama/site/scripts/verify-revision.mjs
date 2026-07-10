/**
 * Dev-time verification (Sindri) for the palette-v2 / camera / quotes
 * revision: drives the real production pages in Chromium and checks the
 * behaviors the tokens §7 checklist wants seen in a real browser —
 * the camera scrub both directions with the single-camera hand-off, the
 * finale flash, quote fade-ins, the shimmer cage (one star at a time),
 * reduced motion, and the focus ring. Screenshots land in scripts/shots/
 * (gitignored). Usage: node scripts/verify-revision.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const BASE = process.argv[2] ?? "http://localhost:3112";
const OUT = fileURLToPath(new URL("./shots/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

/* ---- helpers ---- */
async function railOverlayState(page) {
  return page.evaluate(() => {
    const rail = document.querySelector("[aria-hidden]:has([data-part])");
    const overlay = document.querySelector("[data-camera-glyph]")?.closest("[aria-hidden]");
    const op = (el) => (el ? parseFloat(getComputedStyle(el).opacity) : -1);
    return { rail: op(rail), overlay: op(overlay) };
  });
}

/* ================= desktop 1280: scrub + hand-off + finale ============= */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}v2-hero-1280.png` });

  // Scrub checkpoints down the page (smoothed sync needs settle time).
  const scrollTo = async (frac) => {
    await page.evaluate((f) => {
      window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f);
    }, frac);
    await page.waitForTimeout(1600);
  };

  await scrollTo(0.3);
  await page.screenshot({ path: `${OUT}v2-scrub-30.png` });
  await scrollTo(0.63);
  await page.screenshot({ path: `${OUT}v2-scrub-63.png` });
  let s = await railOverlayState(page);
  check("mid-page: rail visible, finale overlay hidden", s.rail > 0.9 && s.overlay <= 0.05, JSON.stringify(s));

  // Contact: rail out, glyph in, finale fires.
  await page.evaluate(() => {
    document.querySelector("#contact")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(3400); // finale budget 2600 + settle
  s = await railOverlayState(page);
  check("at contact: rail faded out, overlay in (one camera)", s.rail <= 0.05 && s.overlay >= 0.95, JSON.stringify(s));
  const lineOp = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("#contact p"));
    const line = els.find((p) => p.textContent?.includes("finale line"));
    return line ? parseFloat(getComputedStyle(line).opacity) : -1;
  });
  check("finale line arrived", lineOp > 0.9, `opacity ${lineOp}`);
  await page.screenshot({ path: `${OUT}v2-contact-after-finale.png` });

  // Hand back: scroll up, rail returns, overlay hides.
  await scrollTo(0.45);
  await page.waitForTimeout(1200);
  s = await railOverlayState(page);
  check("scrolled back: rail returns, overlay hides", s.rail > 0.9 && s.overlay <= 0.05, JSON.stringify(s));
  await page.screenshot({ path: `${OUT}v2-scrub-back-45.png` });

  // Quote fade-ins: bring each quote into view like a reader (the reveals
  // are one-shot on viewport entry; an instant anchor jump that never
  // intersects a quote correctly leaves it unfired until it is seen).
  const quoteCount = await page.evaluate(() => document.querySelectorAll("[data-quote]").length);
  for (let i = 0; i < quoteCount; i++) {
    await page.evaluate((idx) => {
      document
        .querySelectorAll("[data-quote]")
        [idx]?.scrollIntoView({ block: "center", behavior: "instant" });
    }, i);
    await page.waitForTimeout(1100);
  }
  const quoteOps = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-quote]")).map((q) =>
      parseFloat(getComputedStyle(q).opacity)
    )
  );
  check(
    "all quotes fade in once seen",
    quoteOps.length === 4 && quoteOps.every((o) => o > 0.9),
    JSON.stringify(quoteOps)
  );
  await page.screenshot({ path: `${OUT}v2-quote-1280.png` });

  check("no page errors (desktop pass)", errors.length === 0, errors.join(" | "));
  await ctx.close();
}

/* ================= shimmer cage: watch the sky ~32s ==================== */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.querySelector("#sky")?.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await page.waitForTimeout(3000); // entry completes first; shimmer may then begin
  const result = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const halos = Array.from(document.querySelectorAll("[data-halo]"));
        let maxConcurrent = 0;
        let swellsSeen = 0;
        let wasLit = false;
        const t = setInterval(() => {
          const lit = halos.filter((h) => parseFloat(getComputedStyle(h).opacity) > 0.05).length;
          maxConcurrent = Math.max(maxConcurrent, lit);
          if (lit > 0 && !wasLit) swellsSeen += 1;
          wasLit = lit > 0;
        }, 150);
        setTimeout(() => {
          clearInterval(t);
          resolve({ maxConcurrent, swellsSeen, halos: halos.length });
        }, 32000);
      })
  );
  check(
    "shimmer cage: never two stars at once over 32s",
    result.maxConcurrent <= 1,
    JSON.stringify(result)
  );
  check("shimmer breathes at least once in 32s", result.swellsSeen >= 1, JSON.stringify(result));
  await page.screenshot({ path: `${OUT}v2-sky-1280.png` });
  await ctx.close();
}

/* ================= reduced motion ====================================== */
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const railGone = await page.evaluate(() => !document.querySelector("[data-part]"));
  check("reduced: no rail camera exists (finale-only)", railGone);
  await page.screenshot({ path: `${OUT}v2-reduced-hero.png` });

  await page.evaluate(() => {
    document.querySelector("#sky")?.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await page.waitForTimeout(600);
  const sky = await page.evaluate(() => {
    const stars = Array.from(document.querySelectorAll("[data-sky-star]"));
    const halos = Array.from(document.querySelectorAll("[data-halo]"));
    return {
      starsLit: stars.every((s) => parseFloat(getComputedStyle(s).opacity) > 0.9),
      halosDark: halos.every((h) => parseFloat(getComputedStyle(h).opacity) <= 0.01),
    };
  });
  check("reduced: sky pre-lit, halos dark", sky.starsLit && sky.halosDark, JSON.stringify(sky));

  // No shimmer over 12s.
  const shimmer = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const halos = Array.from(document.querySelectorAll("[data-halo]"));
        let lit = 0;
        const t = setInterval(() => {
          lit += halos.filter((h) => parseFloat(getComputedStyle(h).opacity) > 0.05).length;
        }, 300);
        setTimeout(() => {
          clearInterval(t);
          resolve(lit);
        }, 12000);
      })
  );
  check("reduced: zero shimmer over 12s", shimmer === 0, `lit samples ${shimmer}`);

  await page.evaluate(() => {
    document.querySelector("#contact")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(700);
  const parked = await page.evaluate(() => {
    const glyph = document.querySelector("#contact [data-camera-glyph]");
    const flashes = Array.from(
      document.querySelectorAll("[data-flash-rays], [data-flash-core], [data-flash-bloom]")
    );
    return {
      parked: !!glyph,
      flashesDark: flashes.every((f) => parseFloat(getComputedStyle(f).opacity) <= 0.01),
    };
  });
  check("reduced: camera parked by CTA, flash dark", parked.parked && parked.flashesDark, JSON.stringify(parked));
  await page.screenshot({ path: `${OUT}v2-reduced-contact.png` });
  await ctx.close();
}

/* ================= focus ring + narrow viewports ======================= */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.querySelector("#sky")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(2600);
  for (let i = 0; i < 7; i++) await page.keyboard.press("Tab");
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}v2-sky-focus.png` });
  await ctx.close();
}

for (const [w, h, name] of [
  [360, 740, "360"],
  [768, 1024, "768"],
]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${OUT}v2-hero-${name}.png` });
  await page.evaluate(() => {
    document.querySelector("#sky")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}v2-sky-${name}.png` });
  await page.evaluate(() => {
    document.querySelector("#contact")?.scrollIntoView({ block: "start", behavior: "instant" });
  });
  await page.waitForTimeout(3400);
  await page.screenshot({ path: `${OUT}v2-contact-${name}.png` });
  await ctx.close();
}

// /projects
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/projects", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}v2-projects-1280.png` });
  await ctx.close();
}

await browser.close();
console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
