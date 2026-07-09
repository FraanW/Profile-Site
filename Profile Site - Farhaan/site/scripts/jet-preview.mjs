/** Dev-time tool: render the fighter design-space geometry large for visual
 *  iteration against the owner's reference sketch. */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

// Pull every FIGHTER_PARTS path out of Airplane.tsx so the preview always
// matches the source.
const src = readFileSync("src/components/Airplane.tsx", "utf8");
const block = src.match(/const FIGHTER_PARTS[\s\S]*?\n\];/)?.[0];
if (!block) throw new Error("FIGHTER_PARTS not found");
const ds = [...block.matchAll(/"(M[^"]+)"/g)].map((m) => m[1]);

const html = `<!doctype html><body style="margin:0;background:#F5F6EE">
<svg width="960" height="480" viewBox="40 0 460 230" style="display:block">
  ${ds
    .map(
      (d) =>
        `<path d="${d}" fill="none" stroke="#065F46" stroke-width="0.9" stroke-linejoin="round" stroke-linecap="round"/>`
    )
    .join("\n")}
</svg></body>`;
writeFileSync("scripts/shots/jet-preview.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 480 } });
await page.goto(`file://${process.cwd().replace(/\\/g, "/")}/scripts/shots/jet-preview.html`);
await page.screenshot({ path: "scripts/shots/jet-design.png" });
await browser.close();
console.log("done");
