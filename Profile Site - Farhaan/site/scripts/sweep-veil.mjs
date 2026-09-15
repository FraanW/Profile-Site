/**
 * Fit DarkVeil's `hueShift` to the token emerald.
 *
 * DarkVeil has no color props: its aurora is baked into a CPPN and the only
 * handle is a YIQ-space hue rotation. So rather than eyeball it, sweep the
 * rotation, sample each rendered frame, and score the result against
 * --color-emerald (#065F46) in a perceptual space.
 *
 * Scoring uses CIEDE2000-ish weighting on the mean of the frame's *lit*
 * pixels: the veil is mostly near-black ground, and averaging that in would
 * drag every candidate toward the same dark mush and flatten the signal.
 *
 * Usage: node scripts/sweep-veil.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { PNG } from "pngjs";

const base = process.argv[2] ?? "http://localhost:6006";
// Optional coarse-then-fine range: node scripts/sweep-veil.mjs <base> <from> <to> <step>
const FROM = Number(process.argv[3] ?? -180);
const TO = Number(process.argv[4] ?? 180);
const STEP = Number(process.argv[5] ?? 10);
const TARGET = { r: 0x06, g: 0x5f, b: 0x46 }; // --color-emerald

const srgbToLinear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

/** sRGB -> CIELAB (D65). */
function toLab({ r, g, b }) {
  const [R, G, B] = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
  let x = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047;
  let y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  let z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  [x, y, z] = [f(x), f(y), f(z)];
  return { L: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

/** Hue angle + chroma distance in Lab. Hue is what we are actually fitting. */
function score(sample) {
  const s = toLab(sample);
  const t = toLab(TARGET);
  const hs = (Math.atan2(s.b, s.a) * 180) / Math.PI;
  const ht = (Math.atan2(t.b, t.a) * 180) / Math.PI;
  let dh = Math.abs(hs - ht) % 360;
  if (dh > 180) dh = 360 - dh;
  const cs = Math.hypot(s.a, s.b);
  const ct = Math.hypot(t.a, t.b);
  // Hue dominates; chroma is a tiebreak so we do not pick a grey that happens
  // to sit at the right angle by accident.
  return { dh, dc: Math.abs(cs - ct), total: dh + Math.abs(cs - ct) * 0.35 };
}

const browser = await chromium.launch();

const results = [];
for (let shift = FROM; shift <= TO; shift += STEP) {
  // A fresh page per sample: Chrome caps live WebGL contexts, and reusing one
  // page across the sweep silently starves the later samples of a context.
  const page = await browser.newPage({ viewport: { width: 900, height: 600 } });
  await page.goto(
    `${base}/iframe.html?id=components-veilfield--sweep&viewMode=story&args=hueShift:${shift}`,
    { waitUntil: "domcontentloaded", timeout: 60000 }
  );
  await page.waitForTimeout(1200);

  // Sample from a real screenshot, not from drawImage on the canvas: WebGL
  // clears its drawing buffer once the frame is composited, so reading the
  // canvas back gives a blank image unless preserveDrawingBuffer is set, and
  // we are not editing the vendored component to set it.
  const png = PNG.sync.read(await page.screenshot({ type: "png" }));
  const d = png.data;
  let r = 0, g = 0, b = 0, n = 0;
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    if (lum < 28) continue;
    r += d[i]; g += d[i + 1]; b += d[i + 2]; n++;
  }
  const sample = n
    ? { r: r / n, g: g / n, b: b / n, lit: n / (d.length / 4) }
    : null;

  if (!sample) {
    console.log(`${String(shift).padStart(5)}  no lit pixels`);
    await page.close();
    continue;
  }
  const s = score(sample);
  results.push({ shift, ...s, sample });
  console.log(
    `${String(shift).padStart(5)}  rgb(${sample.r.toFixed(0)},${sample.g.toFixed(0)},${sample.b.toFixed(0)})` +
      `  lit=${(sample.lit * 100).toFixed(0)}%  dHue=${s.dh.toFixed(1)}  score=${s.total.toFixed(1)}`
  );
  await page.close();
}

results.sort((a, b) => a.total - b.total);
console.log("\nbest hueShift values:");
for (const r of results.slice(0, 5)) {
  console.log(
    `  ${String(r.shift).padStart(5)}  dHue=${r.dh.toFixed(1)}  ` +
      `rgb(${r.sample.r.toFixed(0)},${r.sample.g.toFixed(0)},${r.sample.b.toFixed(0)})`
  );
}

await browser.close();
