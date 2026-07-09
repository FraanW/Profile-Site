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

export type AirplaneVariant = "fighter" | "top" | "side" | "paper";

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
  /** Assembled geometry. Rail viewBox 0 0 96 640 unless the variant has a
      frame transform, in which case coordinates are the variant's own
      design space and scatter offsets are local units. */
  d: string;
  /** Exploded offset up the rail: translate + rotate start values. */
  scatter: { x: number; y: number; r: number };
  /** Always rail-space (labels render outside the frame). */
  labelPos: { x: number; y: number; anchor?: "start" | "end" };
};

/**
 * The fighter sketch (owner reference image, 2026-07-10): a MiG-21-family
 * jet in 3/4 view. Authored nose-right in a 480×220 design space so the
 * finale's mirrored flight shows it nose-left like the ink sketch; the rail
 * frame below rotates it nose-down. Loose double strokes carry the
 * hand-drawn character; no filters, no fills.
 */
const FIGHTER_FRAME = "translate(97 418) rotate(90) scale(0.42)";

const FIGHTER_PARTS: PlanePart[] = [
  {
    id: "wing-far",
    label: "far wing",
    d: [
      "M322 104 L244 56 L230 63 L270 98", // far delta, beyond the fuselage
      "M268 86 L230 77 M266 91 L232 82 M230 77 C 226 77, 225 81, 232 82", // far store sliver
    ].join(" "),
    scatter: { x: -879, y: -19, r: 20 },
    labelPos: { x: 6, y: 142 },
  },
  {
    id: "fuselage",
    label: "fuselage",
    d: [
      "M446 136 C 402 122, 335 106, 272 99 C 215 93, 145 88, 88 88", // top contour
      "M448 163 C 412 164, 362 158, 318 151 C 255 141, 165 122, 96 110", // belly
      "M88 88 L74 90 C 69 93, 69 102, 75 106 L96 110", // tailpipe
      "M88 88 C 82 93, 82 103, 96 110", // aft bulkhead
      "M382 130 L378 158 M312 108 L307 147 M235 97 L231 131", // panel lines
      "M430 132 C 390 119, 340 107, 290 101", // sketch double-stroke on the spine
    ].join(" "),
    scatter: { x: -793, y: 0, r: 5 },
    labelPos: { x: 90, y: 188, anchor: "end" },
  },
  {
    id: "fin",
    label: "tail fin",
    d: [
      "M185 92 L112 30 L90 36 L98 86", // swept stabilizer
      "M110 40 L100 80", // rudder line
    ].join(" "),
    scatter: { x: -538, y: 14, r: -12 },
    labelPos: { x: 6, y: 232 },
  },
  {
    id: "tailplane",
    label: "tailplane",
    d: [
      "M140 105 L92 132 L84 124 L120 100", // near tailplane, swept
    ].join(" "),
    scatter: { x: -424, y: -19, r: 14 },
    labelPos: { x: 90, y: 276, anchor: "end" },
  },
  {
    id: "wing-near",
    label: "delta wing",
    d: [
      "M366 157 L256 214 L234 201 L248 141", // near delta, straight swept leading edge
      "M344 154 L262 205", // surface line
    ].join(" "),
    scatter: { x: -519, y: -19, r: -18 },
    labelPos: { x: 6, y: 320 },
  },
  {
    id: "stores",
    label: "pylons · stores",
    d: [
      "M336 199 L258 209 M335 205 L259 214 M336 199 C 342 200, 341 204, 335 205", // outer missile
      "M266 208 L258 201 M267 213 L259 220 M300 190 L298 200", // outer fins + pylon
      "M362 174 L292 183 M361 179 L293 188 M362 174 C 368 175, 367 178, 361 179", // inner missile
      "M300 182 L293 175 M336 166 L334 174", // inner fin + pylon
    ].join(" "),
    scatter: { x: -424, y: -24, r: -8 },
    labelPos: { x: 90, y: 364, anchor: "end" },
  },
  {
    id: "canopy",
    label: "canopy",
    d: [
      "M418 133 C 413 114, 398 100, 384 99 C 368 97, 352 104, 344 113", // bubble
      "M402 102 L410 130", // windshield frame
      "M344 113 C 328 109, 312 106, 296 103", // fairing into the spine
    ].join(" "),
    scatter: { x: -395, y: 24, r: 22 },
    labelPos: { x: 6, y: 408 },
  },
  {
    id: "shock-cone",
    label: "shock cone",
    d: [
      "M449 134 C 456 136, 457 161, 451 164 C 444 162, 443 137, 449 134", // intake lip
      "M450 140 L470 151 L451 160", // cone
      "M455 144 L465 151 L456 157", // cone shading
    ].join(" "),
    scatter: { x: -360, y: -24, r: -28 },
    labelPos: { x: 90, y: 452, anchor: "end" },
  },
];

/**
 * Blueprint line-art (blueprint §8): thin emerald strokes, mono part labels,
 * no fills, no gradients. The fighter implements the owner's reference
 * sketch; the other three geometries stay as alternates.
 */
const PLANES: Record<AirplaneVariant, PlanePart[]> = {
  fighter: FIGHTER_PARTS,
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
/** Per-variant wrapper transform: parts authored in a design space get
    placed into the rail here; labels stay in rail space. */
const FRAMES: Partial<Record<AirplaneVariant, string>> = {
  fighter: FIGHTER_FRAME,
};

export function Airplane({
  variant = "fighter",
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

  const frame = FRAMES[variant];
  const partGroups = parts.map((p) => (
    <g
      key={p.id}
      data-part={p.id}
      // Framed variants rotate scattered parts around their own centers;
      // the default view-box origin lands elsewhere once a frame scales it.
      style={frame ? { transformBox: "fill-box", transformOrigin: "center" } : undefined}
    >
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
  ));

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 96 640"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      {frame ? <g transform={frame}>{partGroups}</g> : partGroups}
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

/**
 * The assembled fighter at glyph size, nose-right, for the contact finale.
 * Same geometry as the rail's FIGHTER_PARTS; non-scaling strokes keep the
 * line weight at sketch thinness.
 */
export function FighterGlyph({ width = 72 }: { width?: number }) {
  const height = Math.round((width * 200) / 420);
  return (
    <svg
      width={width}
      height={height}
      viewBox="60 20 420 200"
      aria-hidden="true"
    >
      {FIGHTER_PARTS.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill="none"
          stroke="#065F46"
          strokeWidth="1.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      ))}
    </svg>
  );
}
