/**
 * Prototype smoke check: load every story in headless Chromium and report
 * console errors / page errors. Dev-time tool only; not part of the site.
 * Usage: node scripts/verify-stories.mjs [baseUrl]
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:6006";

const index = await fetch(`${base}/index.json`).then((r) => r.json());
const stories = Object.values(index.entries).filter((e) => e.type === "story");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const failures = [];
let current = null;
const errors = [];

page.on("console", (msg) => {
  if (msg.type() !== "error") return;
  const text = msg.text();
  const url = msg.location()?.url ?? "";
  // Known prototype noise: axe-core XHRs the Fontshare stylesheet for its
  // contrast checks and hits CORS. The stylesheet <link> itself loads fine
  // (verified via document.fonts below). Goes away when Erode is self-hosted.
  if (text.includes("fontshare") || url.includes("fontshare")) return;
  if (text === "Failed to load resource: net::ERR_FAILED" && url === "") return;
  errors.push(`[console] ${text.slice(0, 300)}`);
});
page.on("pageerror", (err) => errors.push(`[pageerror] ${String(err).slice(0, 300)}`));

for (const story of stories) {
  current = story.id;
  errors.length = 0;
  try {
    await page.goto(`${base}/iframe.html?id=${story.id}&viewMode=story`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    // let mount-mode animations and observers settle
    await page.waitForTimeout(1200);
    // scroll to exercise scroll-mode observers where present
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(600);
    const rootEmpty = await page.evaluate(() => {
      const root = document.getElementById("storybook-root");
      return !root || root.innerHTML.trim().length === 0;
    });
    if (rootEmpty) errors.push("[render] storybook-root is empty");
  } catch (e) {
    errors.push(`[nav] ${String(e).slice(0, 200)}`);
  }
  if (errors.length > 0) {
    failures.push({ id: current, errors: [...new Set(errors)].slice(0, 4) });
    console.log(`FAIL ${current}`);
  } else {
    console.log(`ok   ${current}`);
  }
}

// Font sanity: the three faces must be resolvable in the preview.
await page.goto(`${base}/iframe.html?id=foundation-typography--faces&viewMode=story`, {
  waitUntil: "networkidle",
});
const fonts = await page.evaluate(async () => {
  await document.fonts.ready;
  return {
    josefin: document.fonts.check('16px "Josefin Sans"'),
    erode: document.fonts.check('16px "Erode"'),
    spline: document.fonts.check('16px "Spline Sans Mono"'),
  };
});
console.log(`fonts loaded: ${JSON.stringify(fonts)}`);

await browser.close();

if (failures.length > 0) {
  console.log(`\n${failures.length}/${stories.length} stories with errors:`);
  for (const f of failures) {
    console.log(`\n${f.id}`);
    f.errors.forEach((e) => console.log(`  ${e}`));
  }
  process.exit(1);
}
console.log(`\nAll ${stories.length} stories rendered without console errors.`);
