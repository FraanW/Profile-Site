/**
 * Dev-time tool: screenshot the ShardField / ParticleField stories.
 *
 * Kept separate from shoot-stories.mjs because these two need a GPU. Chromium
 * is launched with WebGPU forced on (headless Chromium ships it off by
 * default); where it still cannot initialize, ShardField renders its fallback
 * and the shot comes back as a flat field, which is the answer we want anyway.
 *
 * Usage: node scripts/shoot-fields.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:6006";
const out = "scripts/shots";
mkdirSync(out, { recursive: true });

const shots = [
  { id: "components-particlefield--leaf", wait: 4000, name: "particles-leaf" },
  { id: "components-particlefield--bone-muted", wait: 4000, name: "particles-bone" },
  { id: "components-particlefield--on-bone", wait: 4000, name: "particles-on-bone" },
  { id: "components-particlefield--shapes", wait: 4000, name: "particles-tetra" },
  { id: "components-particlefield--behind-the-hero", wait: 4500, name: "particles-hero" },
  { id: "components-veilfield--emerald", wait: 3500, name: "veil-emerald" },
  { id: "components-veilfield--as-pasted", wait: 3500, name: "veil-as-pasted" },
  { id: "components-veilfield--light-mode", wait: 3500, name: "veil-light" },
  { id: "components-veilfield--behind-the-hero", wait: 4000, name: "veil-hero" },
  { id: "components-shardfield--statement", wait: 5000, name: "shards-statement" },
  { id: "components-shardfield--deep", wait: 5000, name: "shards-deep" },
  { id: "components-shardfield--bone", wait: 5000, name: "shards-bone" },
  { id: "components-shardfield--stock-tuning", wait: 5000, name: "shards-stock" },
  { id: "components-shardfield--behind-the-hero", wait: 5500, name: "shards-hero" },
];

const browser = await chromium.launch({
  args: [
    "--enable-unsafe-webgpu",
    "--enable-features=Vulkan,UseSkiaRenderer",
    "--use-angle=swiftshader",
    "--use-gl=angle",
    "--ignore-gpu-blocklist",
  ],
});

for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text().slice(0, 200));
  });

  await page.goto(`${base}/iframe.html?id=${s.id}&viewMode=story`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForTimeout(s.wait);

  // Did a canvas actually mount, and is it painting anything?
  const probe = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    return {
      canvas: !!c,
      w: c?.width ?? 0,
      h: c?.height ?? 0,
      webgpu: "gpu" in navigator,
    };
  });

  await page.screenshot({ path: `${out}/${s.name}.png` });
  console.log(
    `${s.name.padEnd(20)} canvas=${probe.canvas} ${probe.w}x${probe.h} webgpu=${probe.webgpu}` +
      (errors.length ? ` ERRORS: ${errors.slice(0, 2).join(" | ")}` : "")
  );
  await page.close();
}

await browser.close();
