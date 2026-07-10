/** Dev-time tool: render the camera design-space geometry large for visual
 *  iteration against the animejs.com exploded-camera reference. */
import { chromium } from "playwright";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

// Pull every CAMERA_PARTS path out of Camera.tsx so the preview always
// matches the source.
const src = readFileSync("src/components/Camera.tsx", "utf8");
const block = src.match(/const CAMERA_PARTS[\s\S]*?\n\];/)?.[0];
if (!block) throw new Error("CAMERA_PARTS not found");
const ds = [...block.matchAll(/"(M[^"]+)"/g)].map((m) => m[1]);

const html = `<!doctype html><body style="margin:0;background:#F5F6EE">
<svg width="880" height="760" viewBox="4 12 232 200" style="display:block">
  ${ds
    .map(
      (d) =>
        `<path d="${d}" fill="none" stroke="#065F46" stroke-width="0.7" stroke-linejoin="round" stroke-linecap="round"/>`
    )
    .join("\n")}
</svg></body>`;
mkdirSync("scripts/shots", { recursive: true });
writeFileSync("scripts/shots/camera-preview.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 880, height: 760 } });
await page.goto(`file://${process.cwd().replace(/\\/g, "/")}/scripts/shots/camera-preview.html`);
await page.screenshot({ path: "scripts/shots/camera-design.png" });
await browser.close();
console.log("done");
