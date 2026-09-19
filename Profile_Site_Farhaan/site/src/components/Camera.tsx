"use client";

import { createTimeline, onScroll, stagger, svg, utils, type Timeline } from "animejs";
import { useEffect, useRef } from "react";
import {
  DURATION,
  SCROLL_SYNC,
  STAGGER_STEP,
  easeDraw,
  easeGlide,
  prefersReducedMotion,
  useReducedMotion,
} from "@/lib/motion";

export type CameraMode =
  /** Controlled by the `progress` prop (Storybook scrubber). */
  | "scrub"
  /** Pinned to the page scroll via onScroll sync (the landing rail). */
  | "scroll"
  /** Final frame, no animation (previews). */
  | "static";

type CameraPart = {
  id: string;
  /** Assembled geometry in the 240×200 design space; the rail frame below
      places it at the bottom of the 96×640 rail viewBox. */
  d: string;
  /** Exploded offset up the rail: translate + rotate start values, in
      design-space local units (the frame scales them into rail space). */
  scatter: { x: number; y: number; r: number };
};

/**
 * The DSLR (owner decision 2026-07-11, blueprint §8: the fighter jet is
 * retired). Authored as a front elevation, the way an engineer would draw
 * it: orthographic, thin strokes, no fills, no gradients, and no part
 * labels (owner revision 2026-07-11: the drawing carries itself). The iris
 * blades are the shutter; they are also what fires in the contact finale.
 */
const CAMERA_FRAME = "translate(5 566) scale(0.36)";

/** Array order is assembly order: the body chassis lands first, glass and
    mechanism follow, the shutter seats last. */
const CAMERA_PARTS: CameraPart[] = [
  {
    id: "body",
    d: [
      // chassis outline
      "M34 62 L206 62 C214 62 218 66 218 74 L218 176 C218 184 214 188 206 188 L34 188 C26 188 22 184 22 176 L22 74 C22 66 26 62 34 62",
      // grip seams, left hand
      "M50 64 C42 96 42 152 52 186",
      "M32 66 C27 98 27 150 34 186",
      // top-plate seam, split around the lens mount
      "M22 88 L72 88 M168 88 L218 88",
      // mode dial with knurling, top-left
      "M44 62 L44 57 L68 57 L68 62",
      "M48 57 L48 59 M53 57 L53 59 M58 57 L58 59 M63 57 L63 59",
      // shutter-release button, top-right
      "M179 62 L179 56 C179 53 182 52 186 52 C190 52 193 53 193 56 L193 62",
    ].join(" "),
    scatter: { x: 5, y: -456, r: 8 },
  },
  {
    id: "lens-barrel",
    d: [
      // mount ring
      "M64 122 A56 56 0 1 1 176 122 A56 56 0 1 1 64 122",
      // barrel ring
      "M72 122 A48 48 0 1 1 168 122 A48 48 0 1 1 72 122",
      // focus-ring knurl ticks
      "M168 122 L176 122 M154 156 L160 162 M120 170 L120 178 M86 156 L80 162",
      "M72 122 L64 122 M86 88 L80 82 M120 74 L120 66 M154 88 L160 82",
    ].join(" "),
    scatter: { x: -12, y: -1403, r: -20 },
  },
  {
    id: "aperture-ring",
    d: [
      // ring
      "M80 122 A40 40 0 1 1 160 122 A40 40 0 1 1 80 122",
      // opening rim
      "M92 122 A28 28 0 1 1 148 122 A28 28 0 1 1 92 122",
      // f-stop ticks
      "M155 142 L159 145 M120 162 L120 167 M85 142 L81 145",
      "M85 102 L81 99 M120 82 L120 77 M155 102 L159 99",
    ].join(" "),
    scatter: { x: 22, y: -1153, r: 30 },
  },
  {
    id: "pentaprism",
    d: [
      // prism housing
      "M91 62 L99 34 L141 34 L149 62",
      // hot shoe + rails
      "M104 34 L104 27 L136 27 L136 34",
      "M109 27 L109 31 L131 31 L131 27",
    ].join(" "),
    scatter: { x: -23, y: -845, r: -16 },
  },
  {
    id: "shutter",
    // six iris blades: rim chords swirling to an inner hexagon
    d: "M148 122 L125 131 M134 146 L115 131 M106 146 L110 122 M92 122 L115 113 M106 98 L125 113 M134 98 L130 122",
    scatter: { x: 27, y: -716, r: 45 },
  },
];

/** Assembly choreography (all values ms of timeline time, not scroll). */
const ASSEMBLE_START = 300;
const ASSEMBLE_STEP = 320;
/** Materialize + draw lead the drift, so each part fades into existence
    where it hangs before it moves home. */
const DRIFT_LEAD = 250;
const DRIFT = 850;
const ASSEMBLED_AT =
  ASSEMBLE_START + (CAMERA_PARTS.length - 1) * ASSEMBLE_STEP + DRIFT_LEAD + DRIFT;
/** Tail hold after the last part seats: the assembly completes at ~63% of
    the scroll span (the signals section, blueprint §8), then the finished
    silhouette rides the rail at rest until the contact hand-off fades it. */
const REST_HOLD = 1550;

/**
 * The scroll-assembled exploded camera (blueprint §8, camera-demo scrub).
 * Parts fade into existence as their assembly begins (owner revision
 * 2026-07-11): each materializes where it hangs, its strokes drawing in,
 * then drifts into place. In "scroll" mode the timeline is pinned to the
 * page scroll through onScroll with the site-wide smooth sync value, so
 * the scrub is bidirectional by construction: scrolling up pulls the
 * camera apart and fades the parts back out. Never a one-shot play.
 * anime.js only: createTimeline + svg.createDrawable.
 */
export function Camera({
  mode = "scrub",
  progress = 0,
  scrollTarget,
  className = "",
}: {
  mode?: CameraMode;
  /** Assembly progress 0→1; only read in "scrub" mode. */
  progress?: number;
  /** Element whose scroll span drives assembly in "scroll" mode. */
  scrollTarget?: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<Timeline | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const groups = Array.from(el.querySelectorAll<SVGGElement>("[data-part]"));
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("[data-part] path"));

    // Static / reduced motion: set the final frame EXPLICITLY and create no
    // observers. The gate must be synchronous (prefersReducedMotion() at
    // effect time), not the render-gate alone: during hydration the server
    // snapshot assumes motion, so a motion-first pass here would dim the
    // parts and a later cleanup revert() would restore that dimmed state
    // (bug found on Shama's site, reproduced here 2026-07-11; see
    // shared/playbook.md). `reduced` keeps the effect re-running on live
    // preference toggles, where the explicit set below also repairs any
    // dimmed styles a reverted motion pass left behind.
    if (mode === "static" || reduced || prefersReducedMotion()) {
      utils.set(groups, { translateX: 0, translateY: 0, rotate: 0, opacity: 1 });
      utils.set(svg.createDrawable(paths), { draw: "0 1" });
      return;
    }

    // Initial exploded state, applied before the timeline exists so a paused
    // or not-yet-entered timeline shows nothing: parts materialize on scrub.
    groups.forEach((g, i) => {
      const s = CAMERA_PARTS[i].scatter;
      utils.set(g, { translateX: s.x, translateY: s.y, rotate: s.r, opacity: 0 });
    });
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

    // Each part: fade into existence + strokes draw in, then drift home.
    // Reversed scroll runs the same tweens backwards: parts disperse and
    // fade back out.
    groups.forEach((g, i) => {
      const at = ASSEMBLE_START + i * ASSEMBLE_STEP;
      tl.add(g, { opacity: 1, duration: DURATION.enter }, at);
      tl.add(drawables[i], { draw: "0 1", duration: DURATION.draw, ease: easeDraw }, at);
      tl.add(g, { translateX: 0, translateY: 0, rotate: 0, duration: DRIFT }, at + DRIFT_LEAD);
    });

    // Rest: a no-op tween stretches the scroll mapping so the assembled
    // silhouette holds through the tail of the page (see REST_HOLD).
    tl.add(el, { opacity: 1, duration: REST_HOLD }, ASSEMBLED_AT);

    tlRef.current = tl;
    return () => {
      tlRef.current = null;
      tl.revert();
    };
  }, [mode, reduced, scrollTarget]);

  useEffect(() => {
    const tl = tlRef.current;
    if (mode !== "scrub" || !tl) return;
    tl.seek(Math.min(Math.max(progress, 0), 1) * tl.duration);
  }, [progress, mode]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 96 640"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      className={`h-full w-full ${className}`}
    >
      <g transform={CAMERA_FRAME}>
        {CAMERA_PARTS.map((p) => (
          <g
            key={p.id}
            data-part={p.id}
            // Scattered parts rotate around their own centers; the view-box
            // origin lands elsewhere once the frame scales the design space.
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
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
        ))}
      </g>
    </svg>
  );
}

/** Glyph viewBox: the design-space bounds plus breathing room. */
const GLYPH_BOX = { x: 14, y: 20, w: 212, h: 176 } as const;

/** Lens-centered transform recipe for the iris and flash moves. */
const LENS_CENTERED: React.CSSProperties = {
  transformBox: "fill-box",
  transformOrigin: "center",
};

/** Capture-flash sparkle glints: plus-marks past the body's corners. */
const FLASH_SPARKS: ReadonlyArray<readonly [number, number]> = [
  [208, 34],
  [32, 34],
  [208, 210],
  [32, 210],
];

/**
 * The assembled camera at glyph size for the contact finale. Same geometry
 * as the rail's CAMERA_PARTS; non-scaling strokes keep the line weight at
 * drawing thinness. Carries the shutter-fire apparatus, hidden until
 * addShutterFire runs it: the iris (`data-iris`) and the capture flash
 * (rays, ring, leaf core, sparkle glints), all radiating from the lens.
 */
export function CameraGlyph({ width = 64 }: { width?: number }) {
  const height = Math.round((width * GLYPH_BOX.h) / GLYPH_BOX.w);
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${GLYPH_BOX.x} ${GLYPH_BOX.y} ${GLYPH_BOX.w} ${GLYPH_BOX.h}`}
      aria-hidden="true"
      className="overflow-visible"
    >
      {CAMERA_PARTS.map((p) => {
        const path = (
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
        );
        return p.id === "shutter" ? (
          <g key={p.id} data-iris style={LENS_CENTERED}>
            {path}
          </g>
        ) : (
          path
        );
      })}

      {/* Capture flash (blueprint §8, owner revision 2026-07-11): a burst of
          emerald rays radiating clear of the silhouette, an expanding ring
          through the lens, one leaf glint bounded by the emerald lens rings,
          and sparkle glints past the corners. Popped once by addShutterFire;
          hidden at rest and in every static frame; transform/opacity only. */}
      <circle
        data-flash-ring
        cx="120"
        cy="122"
        r="30"
        fill="none"
        stroke="#065F46"
        strokeWidth="1.5"
        style={{ ...LENS_CENTERED, opacity: 0, vectorEffect: "non-scaling-stroke" }}
      />
      <circle
        data-flash-core
        cx="120"
        cy="122"
        r="8"
        fill="#34CC73"
        style={{ ...LENS_CENTERED, opacity: 0 }}
      />
      <g data-flash-rays style={{ ...LENS_CENTERED, opacity: 0 }}>
        <path
          d={[
            "M224 165 L266 183 M163 226 L181 268 M77 226 L60 268 M17 165 L-26 183",
            "M17 79 L-26 62 M77 19 L60 -24 M163 19 L181 -24 M224 79 L266 62",
          ].join(" ")}
          fill="none"
          stroke="#065F46"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      </g>
      {FLASH_SPARKS.map(([x, y]) => (
        <g key={`${x}-${y}`} data-flash-spark style={{ ...LENS_CENTERED, opacity: 0 }}>
          <path
            d={`M${x - 8} ${y} L${x + 8} ${y} M${x} ${y - 8} L${x} ${y + 8}`}
            fill="none"
            stroke="#065F46"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ vectorEffect: "non-scaling-stroke" }}
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * The one shutter fire (blueprint §6.7 + §8 owner revision 2026-07-11):
 * the blades snap closed, a capture flash-sparkle bursts from the lens (the
 * eye-pull to the CTA), and the blades reopen soft. Palette only, fires
 * once, transform/opacity only, no blur, no loop. Appends to the caller's
 * timeline at its current end so the finale sequences glide → fire → line
 * without a second engine. Static/reduced frames never see it: every flash
 * element rests at inline opacity 0.
 */
export function addShutterFire(tl: Timeline, glyph: Element): Timeline {
  const iris = glyph.querySelector("[data-iris]");
  if (!iris) return tl;
  const ring = glyph.querySelector("[data-flash-ring]");
  const core = glyph.querySelector("[data-flash-core]");
  const rays = glyph.querySelector("[data-flash-rays]");
  const sparks = Array.from(glyph.querySelectorAll("[data-flash-spark]"));

  // Pre-fire states. Captured as tween from-values, so restart() replays.
  if (ring) utils.set(ring, { scale: 0.6 });
  if (core) utils.set(core, { scale: 0 });
  if (rays) utils.set(rays, { scale: 0.45 });
  if (sparks.length) utils.set(sparks, { scale: 0, rotate: -45 });

  // The spring glide converges well before its computed end; firing at the
  // timeline's current end reads as "settle, then shoot".
  const t0 = tl.duration;
  const tFlash = t0 + 120; // the exposure: blades nearly shut
  const tReopen = tFlash + 240;

  // 1) Blades snap closed.
  tl.add(iris, { rotate: 60, scale: 0.55, duration: DURATION.micro, ease: easeGlide }, t0);

  // 2) The capture flash pops from the lens.
  if (core) {
    tl.add(
      core,
      {
        scale: { to: 1.3, duration: DURATION.micro, ease: easeGlide },
        opacity: [
          { to: 1, duration: DURATION.micro, ease: easeGlide },
          { to: 0, duration: DURATION.enter, ease: easeGlide },
        ],
      },
      tFlash
    );
  }
  if (ring) {
    tl.add(
      ring,
      {
        scale: { to: 3, duration: DURATION.enter, ease: easeGlide },
        opacity: [
          { to: 0.9, duration: DURATION.micro, ease: easeGlide },
          { to: 0, duration: DURATION.enter - DURATION.micro, ease: easeGlide },
        ],
      },
      tFlash
    );
  }
  if (rays) {
    tl.add(
      rays,
      {
        scale: { to: 1, duration: DURATION.enter, ease: easeGlide },
        opacity: [
          { to: 1, duration: DURATION.micro, ease: easeGlide },
          { to: 0, duration: DURATION.enter, ease: easeGlide },
        ],
      },
      tFlash
    );
  }
  if (sparks.length) {
    tl.add(
      sparks,
      {
        scale: { to: 1, duration: DURATION.micro, ease: easeGlide },
        rotate: { to: 0, duration: DURATION.enter, ease: easeGlide },
        opacity: [
          { to: 1, duration: DURATION.micro, ease: easeGlide },
          { to: 0, duration: DURATION.enter - DURATION.micro, ease: easeGlide },
        ],
        delay: stagger(STAGGER_STEP),
      },
      tFlash
    );
  }

  // 3) Blades reopen soft while the flash decays.
  tl.add(iris, { rotate: 0, scale: 1, duration: DURATION.enter, ease: easeGlide }, tReopen);
  return tl;
}
