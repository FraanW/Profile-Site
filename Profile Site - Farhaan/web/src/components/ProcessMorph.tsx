"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cycles the build sequence, one step at a time.
 *
 * Deliberately NOT the gooey blur-threshold morph. That effect works on solid
 * shapes; Playfair is a Didone whose hairlines fall below the alpha threshold
 * and get erased, which left the words as unreadable fragments. Here each step
 * crosses over with a short blur and lift, which survives the typeface.
 *
 * Every step is a stacked absolute layer and only the active index is state, so
 * this re-renders once per step rather than once per frame. It also stops
 * entirely when scrolled out of view.
 */

export function ProcessMorph({
  steps,
  holdMs = 900,
  morphMs = 420,
  className,
}: {
  steps: string[];
  holdMs?: number;
  morphMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [running, setRunning] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Only animate while on screen. A sequence nobody is looking at is just a
  // timer burning renders.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !running || steps.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % steps.length),
      holdMs + morphMs,
    );
    return () => window.clearInterval(id);
  }, [reduced, running, steps.length, holdMs, morphMs]);

  if (reduced) {
    return (
      <p className={cn(className)}>
        {steps.map((step, i) => (
          <span key={step}>
            {step}
            {i < steps.length - 1 ? <span className="text-faint">{", "}</span> : null}
          </span>
        ))}
      </p>
    );
  }

  return (
    <div ref={hostRef} className={cn("relative", className)}>
      {/* The real content: the whole sequence, not the fragment on screen. */}
      <span className="sr-only">{steps.join(", then ")}</span>

      <div aria-hidden="true" className="relative flex items-center justify-center">
        {steps.map((step, i) => {
          const active = i === index;
          return (
            <span
              key={step}
              className="absolute inset-x-0 whitespace-nowrap text-center will-change-[opacity,transform,filter]"
              style={{
                opacity: active ? 1 : 0,
                filter: active ? "blur(0px)" : "blur(9px)",
                transform: active ? "translateY(0) scale(1)" : "translateY(-0.14em) scale(0.97)",
                transition: `opacity ${morphMs}ms cubic-bezier(0.16,1,0.3,1), filter ${morphMs}ms cubic-bezier(0.16,1,0.3,1), transform ${morphMs}ms cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {step}
            </span>
          );
        })}

        {/* Holds the line height so nothing below it shifts as words change. */}
        <span className="invisible whitespace-nowrap">
          {steps.reduce((a, b) => (a.length >= b.length ? a : b))}
        </span>
      </div>
    </div>
  );
}

export default ProcessMorph;
