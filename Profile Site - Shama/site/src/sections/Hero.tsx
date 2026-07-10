"use client";

import { animate, stagger, utils } from "animejs";
import { useEffect, useRef } from "react";
import { GlintLink } from "@/components/GlintLink";
import { PullQuote } from "@/components/PullQuote";
import {
  DURATION,
  STAGGER_STEP,
  easeKindle,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
} from "@/lib/motion";
import { STAR } from "@/lib/palette";
import { hero, identity, quotes } from "@/content/copy";

export type HeroVariant = "horizon" | "centered";
export type HeroClaim = "short" | "long";

/* The first stars (blueprint §5). Six star-white points in the hero's upper
   dark — points only, no edges: the joined sky belongs to the constellation.
   Hand-composed, asymmetric. */
const FIRST_STARS = [
  { x: 60, y: 66, r: 4 },
  { x: 152, y: 26, r: 3 },
  { x: 254, y: 84, r: 5.5 },
  { x: 336, y: 38, r: 3 },
  { x: 306, y: 156, r: 4 },
  { x: 124, y: 142, r: 2.5 },
] as const;

function FirstStars({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  // Pre-paint dim (server HTML stays lit for no-JS and reduced motion).
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    utils.set(el.querySelectorAll("[data-first-star]"), { opacity: 0, scale: 0.4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return; // final frame, no animation

    const starEls = el.querySelectorAll("[data-first-star]");
    // Stars kindle once on arrival: the kindle ease (the only ease allowed
    // on stars), staggered, then complete stillness. Star-white, per the
    // violet dosage law: the accent is what a star emits, not what it is.
    const anim = animate(starEls, {
      opacity: 1,
      scale: 1,
      duration: DURATION.enter,
      ease: easeKindle,
      delay: stagger(STAGGER_STEP, { start: 400 }),
    });

    return () => {
      anim.revert();
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 200"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      {FIRST_STARS.map((s, i) => (
        <g
          key={i}
          data-first-star
          style={{ transformOrigin: `${s.x}px ${s.y}px` }}
        >
          <circle cx={s.x} cy={s.y} r={s.r} fill={STAR} />
        </g>
      ))}
    </svg>
  );
}

/**
 * Hero (blueprint §5, palette v2): the flat black night ground — no field,
 * no fade (the §1.4 hero gradient proposal ships only with Shama's explicit
 * yes) — with the name huge in Fraunces star-white, the first stars
 * kindling in the upper dark, one lede support line (the lede token's named
 * duty), one mono line beneath it, and the hero pull-quote (blueprint
 * §6.3). All copy is PLACEHOLDER, pending Shama's intake.
 */
export function Hero({
  variant = "horizon",
  claim = "short",
}: {
  variant?: HeroVariant;
  claim?: HeroClaim;
}) {
  return (
    <section
      id="hero"
      className={`relative flex min-h-svh flex-col overflow-hidden pb-24 pl-6 pt-16 pr-sky-sm md:pr-sky ${
        variant === "centered" ? "justify-center" : "justify-end"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-[10%] w-[min(46vw,520px)]"
      >
        <FirstStars className="h-auto w-full" />
      </div>

      <div className="relative mx-auto w-full max-w-site">
        <h1 className="font-display text-folio text-star">{identity.name}</h1>
        <p className="mt-8 max-w-narrow text-lede text-moon">{hero.claims[claim]}</p>
        <p className="mt-5 max-w-narrow font-mono text-mono text-moon">{hero.support}</p>

        <div className="mt-12 flex items-baseline gap-8 font-mono text-mono">
          <GlintLink href="#contact">contact</GlintLink>
          <GlintLink href="/projects">projects</GlintLink>
        </div>

        {/* The hero pull-quote (blueprint §6.3): TODO(Lefler) stand-in. */}
        <PullQuote mode="mount" className="mt-14">
          {quotes.hero}
        </PullQuote>
      </div>

      <p
        aria-hidden="true"
        className="absolute bottom-6 left-6 font-mono text-plaque text-violet-ink"
      >
        ↓ {hero.scrollCue}
      </p>
    </section>
  );
}
