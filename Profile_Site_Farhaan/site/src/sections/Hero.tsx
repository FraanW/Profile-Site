"use client";

import { createTimeline, stagger, svg, utils } from "animejs";
import { useEffect, useRef } from "react";
import {
  DURATION,
  STAGGER_STEP,
  easeDraw,
  easeGlide,
  prefersReducedMotion,
} from "@/lib/motion";
import { hero } from "@/content/copy";
import { identity } from "@/content/profile";

export type HeroVariant = "beside" | "behind" | "strip";
export type HeroClaim = "short" | "long";

/* The living graph (blueprint §6.2): abstract node graph on the emerald
   field. Bone strokes; one leaf live mark, bounded by a bone ring (leaf rule).
   Draws itself once on load in under --duration-flight, then stillness. */
const NODES = [
  { x: 160, y: 60, r: 5 },
  { x: 60, y: 120, r: 4 },
  { x: 250, y: 110, r: 4 },
  { x: 120, y: 200, r: 6 }, // hub
  { x: 230, y: 230, r: 4 },
  { x: 60, y: 260, r: 4 },
  { x: 170, y: 300, r: 4, live: true },
] as const;

const EDGES: Array<[number, number]> = [
  [0, 3],
  [1, 3],
  [2, 0],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 6],
  [5, 6],
];

function LivingGraph({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return; // final frame, no animation

    const nodeEls = el.querySelectorAll("[data-hero-node]");
    const edgeEls = el.querySelectorAll<SVGLineElement>("[data-hero-edge]");
    const drawables = svg.createDrawable(edgeEls);

    utils.set(nodeEls, { opacity: 0, scale: 0.5 });
    utils.set(drawables, { draw: "0 0" });

    // Budget (tokens.md §4.2): everything lands inside --duration-flight.
    const tl = createTimeline()
      .add(
        nodeEls,
        {
          opacity: 1,
          scale: 1,
          duration: DURATION.enter,
          ease: easeGlide,
          delay: stagger(STAGGER_STEP),
        },
        0
      )
      .add(
        drawables,
        {
          draw: "0 1",
          duration: DURATION.draw,
          ease: easeDraw,
          delay: stagger(STAGGER_STEP / 2),
        },
        200
      );

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 360"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          data-hero-edge
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="#B7CFC2"
          strokeWidth="1.5"
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      ))}
      {NODES.map((n, i) => (
        <g key={i} data-hero-node style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={"live" in n && n.live ? "#34CC73" : "none"}
            stroke="#F5F6EE"
            strokeWidth="1.5"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Hero (blueprint §6.2): full-viewport emerald field, huge Playfair name,
 * capability claim, the living graph. One primary action + GitHub link.
 * Copy is DRAFT, pending Lefler.
 */
export function Hero({
  variant = "beside",
  claim = "short",
}: {
  variant?: HeroVariant;
  claim?: HeroClaim;
}) {
  const graphBehind = variant === "behind";

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-emerald px-6 py-16">
      {graphBehind ? (
        <div className="absolute inset-0 flex items-center justify-end pr-[8%] opacity-45">
          <LivingGraph className="h-[85%] w-auto" />
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-site">
        <div
          className={
            variant === "beside"
              ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
              : ""
          }
        >
          <div>
            <h1 className="font-display text-hero text-bone">{identity.name}</h1>
            <p className="mt-6 max-w-narrow text-lede text-bone">{hero.claims[claim]}</p>
            <p className="mt-4 max-w-narrow text-body text-bone-muted">{hero.support}</p>

            {variant === "strip" ? (
              <div className="mt-10 max-w-narrow">
                <LivingGraph className="h-28 w-full" />
              </div>
            ) : null}

            <div className="mt-10 flex items-baseline gap-8">
              <a
                href="#contact"
                className="font-mono text-mono text-bone underline underline-offset-4"
              >
                ▸ contact
              </a>
              <a
                href={identity.github.href}
                className="font-mono text-mono text-bone-muted underline underline-offset-4"
              >
                github
              </a>
            </div>
          </div>

          {variant === "beside" ? (
            <div className="hidden lg:block">
              <LivingGraph className="w-full" />
            </div>
          ) : null}
        </div>
      </div>

      <p
        aria-hidden="true"
        className="absolute bottom-6 left-6 font-mono text-label text-bone-muted"
      >
        ↓ {hero.scrollCue}
      </p>
    </section>
  );
}
