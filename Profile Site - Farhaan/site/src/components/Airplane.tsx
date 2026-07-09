"use client";

import { createTimeline, onScroll, stagger, svg, utils, type Timeline } from "animejs";
import { useEffect, useRef } from "react";
import {
  DURATION,
  SCROLL_SYNC,
  STAGGER_STEP,
  easeDraw,
  easeGlide,
  useReducedMotion,
} from "@/lib/motion";

export type AirplaneVariant = "top" | "side" | "paper";

export type AirplaneMode =
  /** Controlled by the `progress` prop (Storybook scrubber). */
  | "scrub"
  /** Pinned to the page scroll via onScroll sync (the landing rail). */
  | "scroll"
  /** Final frame, no animation (reduced motion / previews). */
  | "static";

type PlanePart = {
  id: string;
  label: string;
  /** Assembled geometry, viewBox 0 0 96 640, plane parked at the bottom. */
  d: string;
  /** Exploded offset up the rail: translate + rotate start values. */
  scatter: { x: number; y: number; r: number };
  labelPos: { x: number; y: number; anchor?: "start" | "end" };
};

/**
 * Blueprint line-art (blueprint §8): thin emerald strokes, mono part labels,
 * no fills, no gradients. Geometry is hand-authored prototype line-work;
 * Riker refines the drawing at polish phase.
 */
const PLANES: Record<AirplaneVariant, PlanePart[]> = {
  top: [
    {
      id: "fuselage",
      label: "fuselage",
      d: "M48 470 C 53 486 54 520 52 556 L 51 596 C 51 606 45 606 45 596 L 44 556 C 42 520 43 486 48 470 Z",
      scatter: { x: 4, y: -370, r: 10 },
      labelPos: { x: 6, y: 92 },
    },
    {
      id: "canopy",
      label: "canopy",
      d: "M48 488 C 50.5 492 50.5 500 48 504 C 45.5 500 45.5 492 48 488 Z",
      scatter: { x: -18, y: -450, r: -38 },
      labelPos: { x: 6, y: 30 },
    },
    {
      id: "wing-left",
      label: "left wing",
      d: "M44 512 L 8 536 L 8 543 L 44 526 Z",
      scatter: { x: -6, y: -300, r: -24 },
      labelPos: { x: 6, y: 204 },
    },
    {
      id: "wing-right",
      label: "right wing",
      d: "M52 512 L 88 536 L 88 543 L 52 526 Z",
      scatter: { x: 6, y: -240, r: 28 },
      labelPos: { x: 90, y: 264, anchor: "end" },
    },
    {
      id: "tail-left",
      label: "left tailplane",
      d: "M45 588 L 24 602 L 24 607 L 45 598 Z",
      scatter: { x: -8, y: -230, r: -15 },
      labelPos: { x: 6, y: 350 },
    },
    {
      id: "tail-right",
      label: "right tailplane",
      d: "M51 588 L 72 602 L 72 607 L 51 598 Z",
      scatter: { x: 6, y: -170, r: 18 },
      labelPos: { x: 90, y: 410, anchor: "end" },
    },
  ],
  side: [
    {
      id: "canopy",
      label: "canopy",
      d: "M50 575 C 56 569 64 569 69 573 L 60 578 Z",
      scatter: { x: -12, y: -430, r: -30 },
      labelPos: { x: 6, y: 138 },
    },
    {
      id: "fuselage",
      label: "fuselage",
      d: "M8 585 C 26 574 60 570 82 577 L 90 582 C 86 590 64 596 36 596 C 20 596 10 592 8 585 Z",
      scatter: { x: 0, y: -330, r: 6 },
      labelPos: { x: 6, y: 244 },
    },
    {
      id: "wing",
      label: "wing",
      d: "M38 587 L 18 606 L 28 608 L 50 592 Z",
      scatter: { x: -4, y: -250, r: -22 },
      labelPos: { x: 6, y: 348 },
    },
    {
      id: "fin",
      label: "fin",
      d: "M78 579 L 87 560 L 91 562 L 84 581 Z",
      scatter: { x: 2, y: -160, r: 25 },
      labelPos: { x: 90, y: 412, anchor: "end" },
    },
    {
      id: "tailplane",
      label: "tailplane",
      d: "M80 585 L 94 589 L 92 594 L 78 590 Z",
      scatter: { x: -6, y: -95, r: -12 },
      labelPos: { x: 6, y: 484 },
    },
  ],
  paper: [
    {
      id: "silhouette",
      label: "silhouette",
      d: "M10 618 L 86 544 L 54 622 Z",
      scatter: { x: 0, y: -330, r: 8 },
      labelPos: { x: 6, y: 220 },
    },
    {
      id: "fold",
      label: "fold",
      d: "M86 544 L 34 610",
      scatter: { x: -8, y: -210, r: -20 },
      labelPos: { x: 6, y: 340 },
    },
    {
      id: "keel",
      label: "keel",
      d: "M86 544 L 58 610",
      scatter: { x: 8, y: -120, r: 16 },
      labelPos: { x: 90, y: 430, anchor: "end" },
    },
  ],
};

/**
 * The scroll-assembled exploded aircraft (blueprint §8). Parts start
 * scattered up the right rail; as progress runs 0→1 the strokes draw in,
 * parts drift together, labels fade as pieces join. anime.js only:
 * createTimeline + svg.createDrawable + stagger; scroll mode pins the
 * timeline to scroll with the site-wide smooth sync value.
 */
export function Airplane({
  variant = "top",
  mode = "scrub",
  progress = 0,
  scrollTarget,
  className = "",
}: {
  variant?: AirplaneVariant;
  mode?: AirplaneMode;
  /** Assembly progress 0→1; only read in "scrub" mode. */
  progress?: number;
  /** Element whose scroll span drives assembly in "scroll" mode. */
  scrollTarget?: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<Timeline | null>(null);
  const reduced = useReducedMotion();
  // Final frame: assembled plane, labels gone, no observers created.
  const staticFrame = mode === "static" || reduced;
  const parts = PLANES[variant];

  useEffect(() => {
    const el = svgRef.current;
    if (!el || staticFrame) return;

    const groups = Array.from(el.querySelectorAll<SVGGElement>("[data-part]"));
    const labels = Array.from(el.querySelectorAll<SVGTextElement>("[data-part-label]"));
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("[data-part] path"));

    // Initial exploded state, applied before the timeline exists so a paused
    // or not-yet-entered timeline shows the scattered frame.
    groups.forEach((g, i) => {
      const s = parts[i].scatter;
      utils.set(g, { translateX: s.x, translateY: s.y, rotate: s.r });
    });
    utils.set(labels, { opacity: 1 });
    const drawables = svg.createDrawable(paths);
    utils.set(drawables, { draw: "0 0" });

    const tl = createTimeline({
      autoplay:
        mode === "scroll"
          ? onScroll({
              target: scrollTarget?.current ?? el,
              sync: SCROLL_SYNC,
              enter: "top top",
              leave: "bottom bottom",
            })
          : false,
      defaults: { ease: easeGlide },
    });

    // 1) The line-work draws itself in.
    tl.add(
      drawables,
      { draw: "0 1", duration: DURATION.draw, ease: easeDraw, delay: stagger(STAGGER_STEP) },
      0
    );

    // 2) Parts drift together; each label fades as its piece joins.
    groups.forEach((g, i) => {
      const at = 500 + i * 300;
      tl.add(g, { translateX: 0, translateY: 0, rotate: 0, duration: 850 }, at);
      if (labels[i]) {
        tl.add(labels[i], { opacity: 0, duration: 300 }, at + 320);
      }
    });

    tlRef.current = tl;
    return () => {
      tlRef.current = null;
      tl.revert();
    };
    // parts derives from variant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, mode, staticFrame, scrollTarget]);

  useEffect(() => {
    const tl = tlRef.current;
    if (mode !== "scrub" || !tl) return;
    tl.seek(Math.min(Math.max(progress, 0), 1) * tl.duration);
  }, [progress, mode, variant]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 96 640"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      {parts.map((p) => (
        <g key={p.id} data-part={p.id}>
          <path
            d={p.d}
            fill="none"
            stroke="#065F46"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </g>
      ))}
      {parts.map((p) => (
        <text
          key={`${p.id}-label`}
          data-part-label={p.id}
          x={p.labelPos.x}
          y={p.labelPos.y}
          textAnchor={p.labelPos.anchor ?? "start"}
          fill="#4C5952"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            letterSpacing: "0.03em",
            opacity: staticFrame ? 0 : 1,
          }}
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
}
