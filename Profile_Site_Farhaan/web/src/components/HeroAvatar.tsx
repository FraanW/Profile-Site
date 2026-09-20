"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ICON_PALETTE, PixelArt } from "@/components/PixelArt";
import { drawPose, HEAD_CENTRE, HERO_PALETTE, type PoseId } from "@/components/heroPoses";
import { cn } from "@/lib/utils";

/**
 * The hero avatar, in whichever pose matches the title being typed, with a
 * ring round his head and that title's labelled planets on it.
 *
 * Owner brief, 2026-09-19: the ring persists; the planets change with each
 * title and show what that title is made of; the character cuts between poses.
 *
 * The ring is split into a back half, drawn behind him, and a front half,
 * drawn over him, so the planets really do pass behind his head. The planets
 * are placed every frame by one requestAnimationFrame loop (three transforms
 * and a z-index each), which stops while the hero is off screen and never runs
 * under reduced motion; there the planets simply hold still, spaced round the
 * ring.
 */

export type PlanetIconId =
  | "browser"
  | "server"
  | "database"
  | "deploy"
  | "pipeline"
  | "cube"
  | "people"
  | "checklist"
  | "roadmap"
  | "bulb"
  | "bot"
  | "neural"
  | "globe"
  | "shield"
  | "code";

export type HeroTitle = {
  title: string;
  /*
    The article that goes above this title. It is data rather than a rule
    because "a" and "an" follow the sound, not the spelling, and the label is
    one word on its own up there: get it wrong and it is the first thing read.
  */
  article: "A" | "An";
  pose: PoseId;
  planets: { label: string; icon: PlanetIconId }[];
};

/* 12 by 12 marks for the planets, in the step icons' palette. */
const PLANET_ICONS: Record<PlanetIconId, string[]> = {
  browser: [
    "............",
    "IIIIIIIIIIII",
    "I.A.A.A....I",
    "IIIIIIIIIIII",
    "I..........I",
    "I.AAAA.....I",
    "I..........I",
    "I.AAAAAAA..I",
    "I.AAAAA....I",
    "I..........I",
    "IIIIIIIIIIII",
    "............",
  ],
  server: [
    "............",
    "IIIIIIIIIIII",
    "I.AA.....I.I",
    "IIIIIIIIIIII",
    "............",
    "IIIIIIIIIIII",
    "I.AA.....I.I",
    "IIIIIIIIIIII",
    "............",
    "IIIIIIIIIIII",
    "I.AA.....I.I",
    "IIIIIIIIIIII",
  ],
  database: [
    "............",
    "..IIIIIIII..",
    ".IAAAAAAAAI.",
    "I.IIIIIIII.I",
    "I..........I",
    "I..........I",
    "I.IIIIIIII.I",
    "I..........I",
    "I..........I",
    ".II......II.",
    "..IIIIIIII..",
    "............",
  ],
  cube: [
    ".....II.....",
    "...IIAAII...",
    ".IIAAAAAAII.",
    "I.IIAAAAII.I",
    "I...IIII...I",
    "I....II....I",
    "I....II....I",
    "I....II....I",
    "I....II....I",
    ".II..II..II.",
    "...II..II...",
    ".....II.....",
  ],
  bulb: [
    "...IIIIII...",
    "..I......I..",
    ".I...AA...I.",
    ".I..A..A..I.",
    ".I...AA...I.",
    "..I..AA..I..",
    "...I.AA.I...",
    "...IIIIII...",
    "....MMMM....",
    "....MMMM....",
    ".....MM.....",
    "............",
  ],
  bot: [
    ".....AA.....",
    "......I.....",
    ".IIIIIIIIII.",
    ".I........I.",
    "II.AA..AA.II",
    "II.AA..AA.II",
    ".I........I.",
    ".I..AAAA..I.",
    ".I........I.",
    ".IIIIIIIIII.",
    "............",
    "............",
  ],
  shield: [
    "IIIIIIIIIIII",
    "I..........I",
    "I....AA....I",
    "I...A..A...I",
    "I...AAAA...I",
    "I...AAAA...I",
    ".I..AAAA..I.",
    ".I........I.",
    "..I......I..",
    "...II..II...",
    ".....II.....",
    "............",
  ],
  code: [
    "............",
    "............",
    "............",
    "..A...A.A...",
    ".A....A..A..",
    "A....A....A.",
    ".A...A...A..",
    "..A.A...A...",
    "............",
    "............",
    "............",
    "............",
  ],
  /* Deployment: a rocket, teal body in a cream shell, grey exhaust below. */
  deploy: [
    ".....II.....",
    "....IAAI....",
    "....IAAI....",
    "....IAAI....",
    "...IIAAII...",
    "..II.AA.II..",
    "..I..AA..I..",
    "..IIIIIIII..",
    "....I..I....",
    ".....MM.....",
    "....M..M....",
    ".....MM.....",
  ],
  /* CI/CD: a broken ring with an arrowhead at each end, so it reads as a cycle. */
  pipeline: [
    "...IIIIIII..",
    "..II.....II.",
    ".II.......AA",
    "II.......AAA",
    "II........AA",
    "II..........",
    "..........II",
    "AA........II",
    "AAA.......II",
    "AA.......II.",
    ".II.....II..",
    "..IIIIIII...",
  ],
  /* Personas: three figures, the one in front picked out in teal. */
  people: [
    "............",
    "............",
    ".II..AA..II.",
    ".II..AA..II.",
    "............",
    "III.AAAA.III",
    "III.AAAA.III",
    "III.AAAA.III",
    "............",
    "............",
    "............",
    "............",
  ],
  /* Features: ticked lines. The tick rises left to right across three rows. */
  checklist: [
    "............",
    "...A..IIIIII",
    "A.A...IIIIII",
    ".A..........",
    "...A..IIIIII",
    "A.A...IIIIII",
    ".A..........",
    "...A..IIIIII",
    "A.A...IIIIII",
    ".A..........",
    "............",
    "............",
  ],
  /* ML: four nodes and the links crossing between them, one layer to the next. */
  neural: [
    "............",
    "............",
    ".II......II.",
    ".II......II.",
    "...AA..AA...",
    ".....AA.....",
    ".....AA.....",
    "...AA..AA...",
    ".II......II.",
    ".II......II.",
    "............",
    "............",
  ],
  /* Networks: a globe, its equator and meridian crossing at the front. */
  globe: [
    "...IIIIII...",
    ".II......II.",
    ".I...AA...I.",
    "I....AA....I",
    "I....AA....I",
    "IAAAAAAAAAAI",
    "I....AA....I",
    "I....AA....I",
    ".I...AA...I.",
    ".II......II.",
    "...IIIIII...",
    "............",
  ],
  /* Roadmap: a marker and a planted flag, both standing on the road. */
  roadmap: [
    "............",
    ".......IIIII",
    ".......II..I",
    ".......IIIII",
    ".......II...",
    ".......II...",
    "..AA...II...",
    "..AA...II...",
    "AAAAAAAAAAAA",
    "............",
    "............",
    "............",
  ],
};

/*
  Ring width as a fraction of the sprite's, and its height as a fraction of its
  width. Wide and flat, centred on the crown: at the front of the orbit the
  planets pass over his hair and forehead, never across his eyes.
*/
const RING = 1.05;
const TILT = 0.2;
/*
  The whole ring is then rolled anticlockwise, so it runs down to the left and
  up to the right rather than sitting flat. Owner brief, 2026-09-20. The planets
  are rotated by the same angle, so they stay on the ring they are drawn on.
*/
const ROLL_DEG = -12;
const ROLL = (ROLL_DEG * Math.PI) / 180;
/* Radians per second. Slow enough to read the labels as they pass. */
const SPEED = 0.42;

export function HeroAvatar({
  titles,
  index,
  className,
}: {
  titles: readonly HeroTitle[];
  index: number;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const planetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [onScreen, setOnScreen] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [blink, setBlink] = useState(false);

  const current = titles[index % titles.length];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const sprite = spriteRef.current;
    if (!host || !sprite) return;
    const visibility = new IntersectionObserver(([entry]) =>
      setOnScreen(Boolean(entry?.isIntersecting)),
    );
    visibility.observe(host);
    const resize = new ResizeObserver(([entry]) => {
      const box = entry?.contentRect;
      if (box) setSize({ w: box.width, h: box.height });
    });
    resize.observe(sprite);
    return () => {
      visibility.disconnect();
      resize.disconnect();
    };
  }, []);

  const rx = (size.w * RING) / 2;
  const ry = rx * TILT;
  const cy = size.h * HEAD_CENTRE.y;

  // Place the planets. One loop for all of them, and the angle keeps running
  // across title changes so the new planets pick up where the old ones were.
  useEffect(() => {
    if (!rx) return;
    const count = current.planets.length;
    const place = (seconds: number) => {
      planetRefs.current.slice(0, count).forEach((el, i) => {
        if (!el) return;
        const angle = seconds * SPEED + (i * Math.PI * 2) / count - Math.PI / 2;
        const depth = (Math.sin(angle) + 1) / 2; // 0 at the back, 1 at the front
        // On the flat ring first, then rolled with it.
        const flatX = Math.cos(angle) * rx;
        const flatY = Math.sin(angle) * ry;
        const x = flatX * Math.cos(ROLL) - flatY * Math.sin(ROLL);
        const y = flatX * Math.sin(ROLL) + flatY * Math.cos(ROLL);
        el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.78 + depth * 0.22).toFixed(3)})`;
        el.style.zIndex = depth > 0.5 ? "30" : "5";
        el.style.opacity = (0.6 + depth * 0.4).toFixed(2);
      });
    };
    if (reduced || !onScreen) {
      place(reduced ? 0 : performance.now() / 1000);
      return;
    }
    let frame = requestAnimationFrame(function tick(now) {
      place(now / 1000);
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [rx, ry, reduced, onScreen, index, current.planets.length]);

  // He blinks, except in the zen pose, where his eyes are already shut.
  useEffect(() => {
    if (!onScreen || current.pose === "zen") return;
    let open = 0;
    let shut = 0;
    const next = () => {
      shut = window.setTimeout(() => {
        setBlink(true);
        open = window.setTimeout(() => {
          setBlink(false);
          next();
        }, 130);
      }, 2200 + Math.random() * 3400);
    };
    next();
    return () => {
      window.clearTimeout(shut);
      window.clearTimeout(open);
    };
  }, [onScreen, current.pose]);

  const rows = useMemo(() => drawPose(current.pose, blink), [current.pose, blink]);

  const ringStyle: React.CSSProperties = {
    left: "50%",
    top: cy,
    width: rx * 2,
    height: ry * 2,
    transform: `translate(-50%, -50%) rotate(${ROLL_DEG}deg)`,
  };

  return (
    <div ref={hostRef} aria-hidden="true" className={cn("relative", className)}>
      {/* The back half of the ring, behind him. */}
      {rx > 0 && <div className="hero-ring hero-ring--back absolute z-[4]" style={ringStyle} />}

      {/*
        The sprite. Keyed on the pose, so every change remounts it and the
        entry cut plays again. Zen floats; the others stand.
      */}
      <div ref={spriteRef} className="hero-sprite relative z-10">
        <div
          key={current.pose}
          className={cn("hero-pose-in", current.pose === "zen" && !reduced && "hero-zen-float")}
        >
          <PixelArt
            rows={rows}
            palette={HERO_PALETTE}
            scale={5}
            className="block h-[174px] w-auto sm:h-[232px] lg:h-[348px]"
          />
        </div>
      </div>

      {/* The front half of the ring, over him. */}
      {rx > 0 && <div className="hero-ring hero-ring--front absolute z-20" style={ringStyle} />}

      {/* The planets, placed on the ring by the loop above. */}
      {rx > 0 &&
        current.planets.map((planet, i) => (
          <div
            key={`${current.title}-${planet.label}`}
            ref={(el) => {
              planetRefs.current[i] = el;
            }}
            className="absolute"
            style={{ left: "50%", top: cy }}
          >
            <div
              // Label above the planet: at the front of the orbit a label below
              // would land on his face.
              className="hero-planet-in flex flex-col-reverse items-center gap-1.5"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="hero-planet flex h-7 w-7 items-center justify-center rounded-full sm:h-10 sm:w-10 lg:h-11 lg:w-11">
                <PixelArt
                  rows={PLANET_ICONS[planet.icon]}
                  palette={ICON_PALETTE}
                  scale={2}
                  className="h-3.5 w-3.5 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                />
              </span>
              <span className="whitespace-nowrap font-pixel text-[6px] tracking-[0.06em] text-ivory/85 sm:text-[8px]">
                {planet.label}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default HeroAvatar;
