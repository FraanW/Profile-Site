"use client";

import { useEffect, useState } from "react";

/**
 * The night behind the middle of the page.
 *
 * It twinkles. Owner request, 2026-09-19: the earlier version dimmed a fifth of
 * the stars so slowly that nobody saw it move. Now most of them dip and flare
 * on short, uneven cycles, and the brightest few throw a four-point glint as
 * they flare. Each star still holds steady for most of its cycle, so the sky
 * reads as alive without becoming something to watch instead of the text.
 *
 * Three performance rules it follows:
 *   - Positions are generated once from a fixed seed, at module scope, so the
 *     server and the client render identical markup and hydration is clean.
 *   - A quarter of the stars stay still. A sky where every point moves at once
 *     reads as noise, not as twinkling.
 *   - Animation is CSS opacity and transform only, which the compositor handles
 *     without touching the main thread, and it stops under reduced motion.
 */

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  x: number;
  y: number;
  r: number;
  opacity: number;
  tint: string;
  twinkle: boolean;
  glint: boolean;
  duration: number;
  delay: number;
};

/**
 * A jittered grid rather than pure random placement: uniform random clumps in
 * some places and leaves holes in others, which reads as a texture bug rather
 * than as a sky.
 */
function makeStars(): Star[] {
  const random = seeded(0x5f3759df);
  const cols = 14;
  const rows = 10;
  const stars: Star[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      // Leave roughly a fifth of the cells empty so the grid never shows.
      if (random() < 0.2) continue;

      const cellW = 100 / cols;
      const cellH = 100 / rows;
      const x = col * cellW + random() * cellW;
      const y = row * cellH + random() * cellH;

      const roll = random();
      // Mostly faint pinpricks, a few brighter, two or three that carry.
      const r = roll > 0.965 ? 1.5 : roll > 0.84 ? 1.05 : 0.65;
      const opacity = roll > 0.965 ? 0.8 : roll > 0.84 ? 0.5 : 0.28;

      // Almost white, with a few warm and a few cold, the way a real sky is.
      const hue = random();
      const tint = hue > 0.9 ? "#ffe9c4" : hue > 0.78 ? "#bcd0ff" : "#f4efe2";

      stars.push({
        x,
        y,
        r,
        opacity,
        tint,
        twinkle: random() < 0.75,
        glint: roll > 0.965,
        duration: 2.6 + random() * 3.4,
        delay: random() * 6,
      });
    }
  }

  return stars;
}

const STARS = makeStars();

/**
 * Shooting stars.
 *
 * Each runs on a long loop and is only visible for a sliver of it, which is
 * what makes them intermittent without any JavaScript deciding when to fire.
 * The durations are deliberately awkward numbers rather than round ones, so
 * the five of them drift out of phase and the combined pattern takes minutes
 * to repeat. Round durations would sync up and start arriving in formation.
 */
const SHOOTERS = [
  { top: "14%", left: "8%", angle: 24, travel: 460, duration: 17, delay: 2 },
  { top: "62%", left: "-4%", angle: 13, travel: 520, duration: 23, delay: 9 },
  { top: "8%", left: "56%", angle: 34, travel: 380, duration: 29, delay: 15 },
  { top: "44%", left: "38%", angle: 18, travel: 430, duration: 31, delay: 5 },
  { top: "76%", left: "22%", angle: 28, travel: 400, duration: 37, delay: 22 },
];

/**
 * `watch` is the stretch of page the sky belongs to, normally the middle
 * sections between the two plasma bookends.
 *
 * This matters for more than tidiness. The plasma canvases request an alpha
 * context, so anything behind them gets composited on every single frame. With
 * a fixed starfield always present, the hero was compositing 112 elements and
 * two large gradients 30 times a second behind a full-screen shader, which cost
 * about 29fps. Taking the sky out of the tree while the plasma is on screen
 * gives all of that back.
 */
export function Starfield({ watch }: { watch: React.RefObject<HTMLElement | null> }) {
  const [inRange, setInRange] = useState(false);

  useEffect(() => {
    const target = watch.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInRange(Boolean(entry?.isIntersecting)),
      { rootMargin: "10% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watch]);

  if (!inRange) return null;

  return (
    <div className="starfield" aria-hidden="true">
      {/* A faint wash so the ground is deep space rather than flat black. */}
      <div className="starfield-wash" />

      {SHOOTERS.map((shot, index) => (
        <span
          key={index}
          className="shooting-star"
          style={
            {
              top: shot.top,
              left: shot.left,
              "--angle": `${shot.angle}deg`,
              "--travel": `${shot.travel}px`,
              "--dur": `${shot.duration}s`,
              "--delay": `${shot.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/*
        Positioned elements rather than SVG circles. An SVG stretched to the
        viewport with preserveAspectRatio="none" turns every circle into an
        ellipse, and a sky of ellipses looks like a rendering fault.
      */}
      {STARS.map((star, index) => (
        <span
          key={index}
          className={
            star.glint
              ? "star star-twinkle star-glint"
              : star.twinkle
                ? "star star-twinkle"
                : "star"
          }
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.r * 2}px`,
              height: `${star.r * 2}px`,
              background: star.tint,
              opacity: star.opacity,
              "--dur": `${star.duration}s`,
              "--delay": `${star.delay}s`,
              "--peak": star.opacity,
              "--tint": star.tint,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default Starfield;
