/** Dev-time tool: screenshot key stories for visual review. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = "http://localhost:6006";
const out = "scripts/shots";
mkdirSync(out, { recursive: true });

const shots = [
  { id: "sections-hero--graph-beside", wait: 2500, name: "hero-beside" },
  { id: "sections-hero--graph-behind", wait: 2500, name: "hero-behind" },
  { id: "components-camera--exploded-scrub", args: "progress:0.2", wait: 800, name: "camera-20" },
  { id: "components-camera--exploded-scrub", args: "progress:0.55", wait: 800, name: "camera-55" },
  { id: "components-camera--exploded-scrub", args: "progress:1", wait: 800, name: "camera-100" },
  { id: "components-camera--assembled", wait: 800, name: "camera-assembled" },
  { id: "components-camera--finale-glyph", wait: 800, name: "camera-glyph" },
  { id: "sections-radialgraph--radial", wait: 2500, name: "graph-radial" },
  {
    id: "sections-radialgraph--constellation",
    wait: 2500,
    name: "graph-constellation",
    viewport: { width: 414, height: 1400 },
  },
  { id: "sections-contact--solid-cta", wait: 3200, name: "contact-landed" },
  { id: "components-nodecard--ledger-line", wait: 800, name: "nodecard" },
  { id: "sections-casetiles--open-whitespace", wait: 1500, name: "tiles" },
  { id: "components-dottedbackground--drafting-paper", wait: 800, name: "dots-paper" },
  { id: "components-dottedbackground--emerald-field", wait: 800, name: "dots-emerald" },
  { id: "pages-projects--default", wait: 1500, name: "projects-page" },
  { id: "pages-landing--default", wait: 2500, name: "landing-top" },
];

const browser = await chromium.launch();

for (const s of shots) {
  const page = await browser.newPage({
    viewport: s.viewport ?? { width: 1280, height: 900 },
  });
  const args = s.args ? `&args=${encodeURIComponent(s.args)}` : "";
  await page.goto(`${base}/iframe.html?id=${s.id}&viewMode=story${args}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(s.wait);
  await page.screenshot({ path: `${out}/${s.name}.png` });
  console.log(`shot ${s.name}`);
  await page.close();
}

// landing mid-scroll + bottom (camera assembly progress)
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`${base}/iframe.html?id=pages-landing--default&viewMode=story`, {
  waitUntil: "networkidle",
});
await page.waitForTimeout(2000);
const height = await page.evaluate(() => document.body.scrollHeight);
for (const [name, frac] of [
  ["landing-mid", 0.45],
  ["landing-graph", 0.62],
  ["landing-bottom", 0.98],
]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), height * frac);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/${name}.png` });
  console.log(`shot ${name}`);
}
await browser.close();
console.log("done");
