"use client";

import { animate, onScroll, utils } from "animejs";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import {
  DURATION,
  easeDraw,
  prefersReducedMotion,
  type RevealMode,
} from "@/lib/motion";

/**
 * The section-opening statement rule (tokens.md §3.2: one per section,
 * maximum). Draws in left-to-right once via anime.js scaleX (transform only;
 * reads as drawing without SVG overhead). Reduced motion: rendered at rest.
 */
export function StatementRule({ mode = "scroll" }: { mode?: RevealMode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || mode === "none" || prefersReducedMotion()) return;

    utils.set(el, { scaleX: 0 });
    const anim = animate(el, {
      scaleX: 1,
      duration: DURATION.draw,
      ease: easeDraw,
      ...(mode === "scroll"
        ? { autoplay: onScroll({ target: el, enter: "bottom top" }) }
        : {}),
    });

    return () => {
      anim.revert();
    };
  }, [mode]);

  return (
    <div ref={ref} aria-hidden="true" className="h-0.5 w-full origin-left bg-emerald" />
  );
}

/**
 * Landing-section shell: statement rule, Josefin section head, revealed
 * content. Right padding leaves the airplane's rail clear (blueprint §8:
 * slim edge below md, full rail at md and up).
 */
export function Section({
  id,
  heading,
  mode = "scroll",
  children,
  rail = true,
  className = "",
}: {
  id?: string;
  heading?: string;
  mode?: RevealMode;
  children: React.ReactNode;
  /** Reserve the airplane right rail. Off for /projects (no plane there). */
  rail?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-section pl-6 ${rail ? "pr-rail-sm md:pr-rail" : "pr-6"} ${className}`}
    >
      <div className="mx-auto max-w-site">
        <StatementRule mode={mode} />
        {heading ? (
          <Reveal mode={mode}>
            <h2 className="mt-5 font-display text-display text-ink">{heading}</h2>
          </Reveal>
        ) : null}
        <div className={heading ? "mt-8" : "mt-10"}>{children}</div>
      </div>
    </section>
  );
}
