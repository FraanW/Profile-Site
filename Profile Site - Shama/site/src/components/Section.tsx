"use client";

import { animate, onScroll, utils } from "animejs";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";
import {
  DURATION,
  easeTrace,
  prefersReducedMotion,
  useIsomorphicLayoutEffect,
  type RevealMode,
} from "@/lib/motion";

/**
 * The section-opening statement rule (tokens.md §3.2: violet-ink, 1px, one
 * per section maximum — the one structural line that carries the working
 * violet; where Farhaan's site asserts with a 2px stroke, this site
 * traces). Draws in left-to-right once via anime.js scaleX with the trace
 * ease (a hand laying a line). Reduced motion: rendered at rest.
 * The pre-draw collapse runs in a layout effect, before first paint (no
 * flash); server HTML keeps the rule visible for no-JS visitors.
 */
export function StatementRule({ mode = "scroll" }: { mode?: RevealMode }) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || mode === "none" || prefersReducedMotion()) return;

    utils.set(el, { scaleX: 0 });
    const anim = animate(el, {
      scaleX: 1,
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
    <div ref={ref} aria-hidden="true" className="h-px w-full origin-left bg-violet-ink" />
  );
}

/**
 * Landing-section shell: statement rule, Fraunces section head in
 * star-white, revealed content. Right padding keeps clear of the camera
 * rail (blueprint §6.2, tokens.md §3.1: the sky margin is 48px below md,
 * 80px at md and up, on the right edge; sections never enter it).
 */
export function Section({
  id,
  heading,
  mode = "scroll",
  children,
  sky = true,
  className = "",
}: {
  id?: string;
  heading?: string;
  mode?: RevealMode;
  children: React.ReactNode;
  /** Reserve the camera rail margin. Off for /projects (no camera there). */
  sky?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-section pl-6 ${sky ? "pr-sky-sm md:pr-sky" : "pr-6"} ${className}`}
    >
      <div className="mx-auto max-w-site">
        <StatementRule mode={mode} />
        {heading ? (
          <Reveal mode={mode}>
            <h2 className="mt-6 font-display text-display text-star">{heading}</h2>
          </Reveal>
        ) : null}
        <div className={heading ? "mt-10" : "mt-12"}>{children}</div>
      </div>
    </section>
  );
}
