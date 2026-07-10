"use client";

import Link from "next/link";
import { animate, createTimeline, onScroll, stagger, svg, utils } from "animejs";
import { useRef, useState } from "react";
import { figCaption } from "@/components/Plaque";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { StarMark, starGlint } from "@/components/Star";
import {
  DURATION,
  SHIMMER,
  STAGGER_STEP,
  STROKE,
  easeKindle,
  easeTrace,
  easeVelvet,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  type RevealMode,
} from "@/lib/motion";
import { VIOLET_DEEP, VIOLET_INK } from "@/lib/palette";
import { constellationSection, projects } from "@/content/copy";

export type ConstellationVariant = "sky" | "column";

/* ----------------------------------------------------------------------
   The hand-composed sky (blueprint §6.1). Coordinates are authored, not
   generated: an open, asymmetric figure — a chain that branches once at
   star 06 — with no center node and no hub-and-spoke. Distinct from
   Farhaan's radial graph by construction. viewBox 960×560. It sits
   DIRECTLY on the black page ground (palette v2: there are no colored
   fields left; the sky is the page).
   Label placement is authored per star so plaques never sit on an edge.
   ---------------------------------------------------------------------- */

type LabelSide = "below" | "above" | "right" | "left";

const SKY: Array<{ x: number; y: number; r: number; label: LabelSide }> = [
  { x: 150, y: 210, r: 5, label: "below" }, // fig. 01
  { x: 300, y: 120, r: 3.5, label: "above" }, // fig. 02
  { x: 445, y: 200, r: 4.5, label: "below" }, // fig. 03
  { x: 585, y: 95, r: 3.5, label: "above" }, // fig. 04
  { x: 750, y: 170, r: 5, label: "right" }, // fig. 05
  { x: 640, y: 330, r: 4.5, label: "left" }, // fig. 06
  { x: 400, y: 385, r: 4, label: "below" }, // fig. 07
  { x: 830, y: 420, r: 3, label: "below" }, // fig. 08
];

/** Open chain 01→06, branching at 06 to 07 and 08. Max degree three.
    The chain carries violet-ink; the branch edges recede to violet-deep
    (tokens.md §3.2: the two-ink line-work convention). */
const EDGES: Array<{ from: number; to: number; receded?: boolean }> = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6, receded: true },
  { from: 5, to: 7, receded: true },
];

const VIEW = { w: 960, h: 560 };

/** Emission halo diameter per star: 5x the point's diameter, inside the
    HALO_SCALE=6 cap (tokens.md §1.4). */
const HALO_FACTOR = 5;

/** Anchor transforms per label side: the star point lands on its coordinate. */
const ANCHOR: Record<LabelSide, { className: string; transform: string }> = {
  below: { className: "flex-col items-center", transform: "translate(-50%, -7px)" },
  above: { className: "flex-col-reverse items-center", transform: "translate(-50%, calc(-100% + 7px))" },
  right: { className: "flex-col items-start", transform: "translate(-7px, -7px)" },
  left: { className: "flex-col-reverse items-end", transform: "translate(calc(-100% + 7px), calc(-100% + 7px))" },
};

function ComposedSky({ mode }: { mode: RevealMode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [entryDone, setEntryDone] = useState(false);

  // Pre-paint hide; server HTML carries the finished sky for no-JS visitors.
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || mode === "none" || prefersReducedMotion()) return;
    utils.set(root.querySelectorAll("[data-sky-star]"), { opacity: 0, scale: 0.4 });
    utils.set(root.querySelectorAll("[data-sky-plaque]"), { opacity: 0 });
    utils.set(
      svg.createDrawable(root.querySelectorAll("[data-sky-edge]")),
      { draw: "0 0" }
    );
  }, [mode]);

  // Section entry (blueprint §6.1): edges draw in (trace) and stars kindle
  // (kindle, the only ease allowed on stars) once on scroll-into-view, then
  // stillness. Stagger groups stay at four items — under the ~6 cap.
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || mode === "none" || prefersReducedMotion()) return;

    const stars = Array.from(root.querySelectorAll("[data-sky-star]"));
    const plaques = Array.from(root.querySelectorAll("[data-sky-plaque]"));
    const edges = svg.createDrawable(root.querySelectorAll("[data-sky-edge]"));

    const kindle = {
      opacity: 1,
      scale: 1,
      duration: DURATION.enter,
      ease: easeKindle,
      delay: stagger(STAGGER_STEP),
    };
    const tl = createTimeline({
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: root, enter: "bottom top" }) }
        : {}),
      // The idle shimmer may never run during the entry (tokens.md §4.4).
      onComplete: () => setEntryDone(true),
    })
      .add(stars.slice(0, 4), kindle, 0)
      .add(stars.slice(4), kindle, 330)
      .add(
        edges.slice(0, 4),
        { draw: "0 1", duration: DURATION.draw, ease: easeTrace, delay: stagger(STAGGER_STEP) },
        200
      )
      .add(
        edges.slice(4),
        { draw: "0 1", duration: DURATION.draw, ease: easeTrace, delay: stagger(STAGGER_STEP) },
        640
      )
      .add(
        plaques,
        { opacity: 1, duration: DURATION.enter, ease: easeVelvet, delay: stagger(STAGGER_STEP) },
        400
      );

    return () => {
      tl.revert();
    };
  }, [mode]);

  // The idle shimmer, inside its cage (tokens.md §4.4): "emit purple hue
  // sometimes" is temporal, so the sky breathes unprompted — but at most
  // ONE star mid-swell at any moment (a single scheduler owns the sky),
  // opacity-only on the emission halo, velvet, 2400ms swell, 9000ms ±40%
  // lull, only while the constellation is in the viewport, never during
  // entry, and zero under reduced motion (the scope is never created).
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || mode === "none" || !entryDone || prefersReducedMotion()) return;
    const halos = Array.from(root.querySelectorAll<HTMLElement>("[data-halo]"));
    if (halos.length === 0) return;

    let disposed = false;
    let visible = false;
    let timer: number | null = null;
    let swell: ReturnType<typeof animate> | null = null;

    const scheduleNext = () => {
      if (disposed || !visible || timer !== null || swell) return;
      const jitter = 1 + (Math.random() * 2 - 1) * SHIMMER.jitter;
      timer = window.setTimeout(() => {
        timer = null;
        if (disposed || !visible) return;
        const halo = halos[Math.floor(Math.random() * halos.length)];
        swell = animate(halo, {
          opacity: [
            { to: 1, duration: SHIMMER.swell / 2, ease: easeVelvet },
            { to: 0, duration: SHIMMER.swell / 2, ease: easeVelvet },
          ],
          onComplete: () => {
            swell = null;
            scheduleNext();
          },
        });
      }, SHIMMER.lull * jitter);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        scheduleNext();
      } else {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        // A swell caught off-screen reverts to its resting opacity 0.
        swell?.revert();
        swell = null;
      }
    });
    io.observe(root);

    return () => {
      disposed = true;
      io.disconnect();
      if (timer !== null) clearTimeout(timer);
      swell?.revert();
    };
  }, [mode, entryDone]);

  const hover = (slug: string, on: boolean) => {
    const root = ref.current;
    if (!root) return;
    const star = root.querySelector(`[data-sky-star="${slug}"]`);
    const support = root.querySelector<HTMLElement>(`[data-sky-support="${slug}"]`);
    if (star) starGlint(star, on);
    if (support) {
      if (prefersReducedMotion()) {
        utils.set(support, { opacity: on ? 1 : 0 });
      } else {
        animate(support, {
          opacity: on ? 1 : 0,
          duration: DURATION.glint,
          ease: easeVelvet,
        });
      }
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
    >
      {/* The joining lines: thin, non-scaling, drawn by hand (trace). */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        preserveAspectRatio="none"
      >
        {EDGES.map((e, i) => (
          <line
            key={i}
            data-sky-edge
            x1={SKY[e.from].x}
            y1={SKY[e.from].y}
            x2={SKY[e.to].x}
            y2={SKY[e.to].y}
            stroke={e.receded ? VIOLET_DEEP : VIOLET_INK}
            strokeWidth={STROKE.sky}
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        ))}
      </svg>

      {/* Stars and plaques: real HTML links over the sky, so the focus ring
          recipe and the reading order work exactly like any other link. */}
      {projects.map((p, i) => {
        const s = SKY[i];
        const anchor = ANCHOR[s.label];
        const halo = s.r * 2 * HALO_FACTOR;
        return (
          <Link
            key={p.slug}
            href={`/projects#${p.slug}`}
            data-sky-link=""
            onMouseEnter={() => hover(p.slug, true)}
            onMouseLeave={() => hover(p.slug, false)}
            onFocus={() => hover(p.slug, true)}
            onBlur={() => hover(p.slug, false)}
            className={`absolute flex gap-1.5 p-1 ${anchor.className}`}
            style={{
              left: `${(s.x / VIEW.w) * 100}%`,
              top: `${(s.y / VIEW.h) * 100}%`,
              transform: anchor.transform,
            }}
          >
            <span className="relative flex items-center justify-center">
              {/* The emission halo (tokens.md §1.4): the one glow, behind
                  the star, raised only by the idle shimmer's swell. */}
              <span
                data-halo=""
                aria-hidden="true"
                className="bg-emission rounded-star pointer-events-none absolute"
                style={{ width: halo, height: halo, opacity: 0 }}
              />
              <StarMark data-sky-star={p.slug} size={s.r * 2} />
            </span>
            <span data-sky-plaque="" className="block max-w-44">
              <span className="block font-mono text-plaque text-violet-ink">
                {figCaption(p.fig, p.name)}
              </span>
              {/* The one Sentient line under the caption. Revealed on hover
                  AND focus; the same line is static in the sky column and
                  on the star card. */}
              <span
                data-sky-support={p.slug}
                className="block text-body-sm text-moon opacity-0"
              >
                {p.starLine}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------------
   The sky column (blueprint §6.1 mobile rule): below lg the constellation
   re-composes vertically — a column of stars joined by one drawn thread,
   each with its plaque and its line static beside it. A re-composition,
   never a crushed scale-down. No shimmer here: the composed sky is the
   idle-shimmer scope (small screens keep their battery).
   ---------------------------------------------------------------------- */

function SkyColumn({ mode }: { mode: RevealMode }) {
  const threadRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = threadRef.current;
    if (!el || mode === "none" || prefersReducedMotion()) return;
    utils.set(el, { scaleY: 0 });
    const anim = animate(el, {
      scaleY: 1,
      duration: DURATION.draw,
      ease: easeTrace,
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: el, enter: "bottom top" }) }
        : {}),
    });
    return () => {
      anim.revert();
    };
  }, [mode]);

  return (
    <div className="relative py-2">
      {/* The thread: one line, drawn top to bottom with trace. */}
      <div
        ref={threadRef}
        aria-hidden="true"
        className="absolute bottom-2 left-4 top-2 w-px origin-top bg-violet-ink"
      />
      <ul className="relative space-y-8">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal mode={mode} delay={Math.min(i, 5) * STAGGER_STEP}>
              <Link
                href={`/projects#${p.slug}`}
                className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-3 p-1"
              >
                <span className="flex h-[1.3rem] items-center justify-center">
                  <StarMark size={i % 3 === 0 ? 9 : 7} />
                </span>
                <span className="block">
                  <span className="block font-mono text-plaque text-violet-ink">
                    {figCaption(p.fig, p.name)}
                  </span>
                  <span className="mt-1 block max-w-narrow text-body-sm text-moon">
                    {p.starLine}
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The constellation (blueprint §6.1): projects as white stars directly on
 * the night ground — the v1 statement panel is retired — joined by thin
 * violet lines, a composed open sky at lg and up, the sky column below.
 * Every star is a real link into /projects; the same targets exist as the
 * star cards themselves, so no content lives only in the sky.
 * `variant` forces one composition (Storybook); by default the breakpoint
 * decides. Titles are real (intake-notes.md); every line under them is
 * PLACEHOLDER, pending Shama's intake.
 */
export function Constellation({
  variant,
  mode = "scroll",
}: {
  variant?: ConstellationVariant;
  mode?: RevealMode;
}) {
  return (
    <Section id="sky" heading={constellationSection.heading} mode={mode}>
      <Reveal mode={mode}>
        <p className="max-w-narrow text-body text-moon">{constellationSection.intro}</p>
      </Reveal>
      <div className="mt-10">
        {variant === "sky" ? (
          <ComposedSky mode={mode} />
        ) : variant === "column" ? (
          <div className="max-w-xl">
            <SkyColumn mode={mode} />
          </div>
        ) : (
          <>
            <div className="hidden lg:block">
              <ComposedSky mode={mode} />
            </div>
            <div className="lg:hidden">
              <SkyColumn mode={mode} />
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
