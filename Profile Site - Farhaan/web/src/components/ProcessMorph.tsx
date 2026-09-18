"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Morphs one word into the next through a gooey blur, fast.
 *
 * The effect is a blur-and-threshold trick: two overlapping spans cross-fade
 * while being blurred, and a parent contrast filter re-sharpens the result, so
 * the letterforms appear to melt into one another rather than cross-fade.
 *
 * Swap this out for the Componentry / React Bits morph component when Farhaan
 * supplies it: the props are deliberately simple so the call site does not
 * change.
 */

type ProcessMorphProps = {
  steps: string[];
  /** Time a word sits fully legible, in ms. */
  holdMs?: number;
  /** Time spent morphing between two words, in ms. */
  morphMs?: number;
  className?: string;
};

export function ProcessMorph({
  steps,
  holdMs = 900,
  morphMs = 420,
  className,
}: ProcessMorphProps) {
  const filterId = useId().replace(/:/g, "");
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 = current word, 1 = next word
  const [reduced, setReduced] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || steps.length < 2) {
      return;
    }

    let start = performance.now();
    let morphing = false;

    const tick = (now: number) => {
      const elapsed = now - start;

      if (!morphing) {
        if (elapsed >= holdMs) {
          morphing = true;
          start = now;
        }
        setProgress(0);
      } else {
        const t = Math.min(1, elapsed / morphMs);
        setProgress(t);
        if (t >= 1) {
          morphing = false;
          start = now;
          setIndex((i) => (i + 1) % steps.length);
          setProgress(0);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduced, steps.length, holdMs, morphMs]);

  const current = steps[index];
  const next = steps[(index + 1) % steps.length];

  // Blur peaks mid-morph and returns to zero at either end.
  const arc = Math.sin(progress * Math.PI);
  const blurOut = 1 - progress;

  if (reduced) {
    // No motion: the whole sequence as plain text, which is the real content.
    return (
      <p className={cn("text-ivory", className)}>
        {steps.map((step, i) => (
          <span key={step}>
            {step}
            {i < steps.length - 1 ? <span className="text-faint">{" / "}</span> : null}
          </span>
        ))}
      </p>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* The accessible text: the full sequence, never the animated fragment. */}
      <span className="sr-only">{steps.join(", then ")}</span>

      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
            />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="relative flex items-center justify-center"
        style={{ filter: `url(#${filterId})` }}
      >
        <span
          className="absolute whitespace-nowrap"
          style={{
            opacity: blurOut,
            filter: `blur(${arc * 5}px)`,
          }}
        >
          {current}
        </span>
        <span
          className="absolute whitespace-nowrap"
          style={{
            opacity: progress,
            filter: `blur(${arc * 5}px)`,
          }}
        >
          {next}
        </span>
        {/* Reserves the box so the line never reflows as words change width. */}
        <span className="invisible whitespace-nowrap">
          {steps.reduce((a, b) => (a.length >= b.length ? a : b))}
        </span>
      </div>
    </div>
  );
}

export default ProcessMorph;
