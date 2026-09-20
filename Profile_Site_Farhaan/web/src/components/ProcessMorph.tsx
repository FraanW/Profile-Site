"use client";

import { useEffect, useRef, useState } from "react";
import {
  ICON_PALETTE,
  PixelArt,
  SPARKLE,
  STEP_ICONS,
  TEAM_FRAMES,
  type StepIconId,
} from "@/components/PixelArt";
import { cn } from "@/lib/utils";

/**
 * Cycles the build sequence, one step at a time, as a product loading up.
 *
 * Deliberately NOT the gooey blur-threshold morph. That effect works on solid
 * shapes; Playfair is a Didone whose hairlines fall below the alpha threshold
 * and get erased, which left the words as unreadable fragments. Here each step
 * crosses over with a short blur and lift, which survives the typeface.
 *
 * Owner brief, 2026-09-19: an icon for each step, and an 8-bit loading bar with
 * a percentage under the words, so the reader can see how far along a product
 * is at each stage. At 100% it celebrates (his pick over a silent loop): the
 * last step holds longer, the team cheers, sparkles go off round it, and the
 * label flips to SHIPPED before the bar resets.
 *
 * Every step is a stacked absolute layer and only the active index is state, so
 * this re-renders once per step rather than once per frame, plus a short
 * count-up of the percentage. It also stops entirely when scrolled out of view.
 */

export type ProcessStep = { label: string; icon: StepIconId };

const SEGMENTS = 20;
/* How long each bar segment waits after the one before it lights. */
const SEGMENT_MS = 45;

const percentAt = (index: number, total: number) => Math.round(((index + 1) / total) * 100);
const segmentsAt = (index: number, total: number) =>
  index < 0 ? 0 : Math.round((percentAt(index, total) / 100) * SEGMENTS);

/* Placed round the team, which is what is on screen at 100%. */
const SPARKS = [
  { left: "-4%", top: "-10%", delay: 0 },
  { left: "96%", top: "0%", delay: 90 },
  { left: "2%", top: "74%", delay: 180 },
  { left: "92%", top: "78%", delay: 60 },
  { left: "46%", top: "-44%", delay: 150 },
];

export function ProcessMorph({
  steps,
  holdMs = 1400,
  morphMs = 420,
  celebrateMs = 2200,
  className,
}: {
  steps: readonly ProcessStep[];
  holdMs?: number;
  morphMs?: number;
  celebrateMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [running, setRunning] = useState(false);
  const [shownPercent, setShownPercent] = useState(0);
  const hostRef = useRef<HTMLDivElement>(null);

  const total = steps.length;
  const last = index === total - 1;
  const percent = percentAt(index, total);
  const lit = segmentsAt(index, total);
  // Segments that were already on before this step. Deterministic, so there
  // is no need to remember the previous render.
  const litBefore = index === 0 ? 0 : segmentsAt(index - 1, total);

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

  // A timeout per step rather than an interval, so the last one can hold
  // long enough to celebrate.
  useEffect(() => {
    if (reduced || !running || total < 2) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % total),
      holdMs + morphMs + (last ? celebrateMs : 0),
    );
    return () => window.clearTimeout(id);
  }, [index, last, reduced, running, total, holdMs, morphMs, celebrateMs]);

  // Count the percentage up in step with the segments lighting.
  useEffect(() => {
    const from = index === 0 ? 0 : percentAt(index - 1, total);
    const duration = Math.max(1, (lit - litBefore) * SEGMENT_MS);
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      setShownPercent(Math.round(from + (percent - from) * t));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [index, lit, litBefore, percent, total]);

  if (reduced) {
    return (
      <ol className={cn("flex flex-wrap items-center justify-center gap-x-8 gap-y-6", className)}>
        {steps.map((step) => (
          <li key={step.label} className="flex items-center gap-3">
            <PixelArt rows={STEP_ICONS[step.icon]} palette={ICON_PALETTE} scale={2} />
            <span>{step.label}</span>
          </li>
        ))}
      </ol>
    );
  }

  const fade = (active: boolean): React.CSSProperties => ({
    opacity: active ? 1 : 0,
    filter: active ? "blur(0px)" : "blur(9px)",
    transform: active ? "translateY(0) scale(1)" : "translateY(-0.14em) scale(0.97)",
    transition: `opacity ${morphMs}ms cubic-bezier(0.16,1,0.3,1), filter ${morphMs}ms cubic-bezier(0.16,1,0.3,1), transform ${morphMs}ms cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <div ref={hostRef} className={cn("relative", className)}>
      {/* The real content: the whole sequence, not the fragment on screen. */}
      <span className="sr-only">{steps.map((step) => step.label).join(", then ")}</span>

      <div aria-hidden="true" className="relative flex flex-col items-center">
        {/*
          The icon, crossing over with its word. Wide enough for the team at
          Scale; the square icons centre in it.
        */}
        <div className="relative h-16 w-40 sm:h-20 sm:w-52">
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="absolute inset-0 flex justify-center will-change-[opacity,transform,filter]"
              style={fade(i === index)}
            >
              {step.icon === "team" ? (
                // Two frames on a hard step: the crowd cheers in turns.
                <span className="relative h-full">
                  <PixelArt
                    rows={TEAM_FRAMES[0]}
                    palette={ICON_PALETTE}
                    scale={5}
                    className="cheer-a h-full w-auto"
                  />
                  <PixelArt
                    rows={TEAM_FRAMES[1]}
                    palette={ICON_PALETTE}
                    scale={5}
                    className="cheer-b absolute inset-0 h-full w-auto"
                  />
                </span>
              ) : (
                <PixelArt
                  rows={STEP_ICONS[step.icon]}
                  palette={ICON_PALETTE}
                  scale={5}
                  className="h-full w-auto"
                />
              )}
            </div>
          ))}

          {/* Mounted only at 100%, so the burst replays on every lap. */}
          {last &&
            SPARKS.map((spark, i) => (
              <PixelArt
                key={i}
                rows={SPARKLE}
                palette={ICON_PALETTE}
                scale={3}
                className="sparkle-pop absolute"
                style={
                  {
                    left: spark.left,
                    top: spark.top,
                    "--delay": `${spark.delay + morphMs}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
        </div>

        <div className="relative mt-6 flex w-full items-center justify-center">
          {steps.map((step, i) => (
            <span
              key={step.label}
              className="absolute inset-x-0 whitespace-nowrap text-center will-change-[opacity,transform,filter]"
              style={fade(i === index)}
            >
              {step.label}
            </span>
          ))}

          {/* Holds the line height so nothing below it shifts as words change. */}
          <span className="invisible whitespace-nowrap">
            {steps.map((step) => step.label).reduce((a, b) => (a.length >= b.length ? a : b))}
          </span>
        </div>

        {/* The loading bar. Segments light one after another, like a cartridge booting. */}
        <div className="mt-10 w-full max-w-[34rem] px-2">
          <div className="pixel-frame bg-plasma-a p-[5px]">
            <div className="flex gap-[3px]">
              {Array.from({ length: SEGMENTS }, (_, k) => {
                const on = k < lit;
                const delay = on && k >= litBefore ? (k - litBefore) * SEGMENT_MS : 0;
                return (
                  <span
                    key={k}
                    className="h-3 flex-1 sm:h-[14px]"
                    style={{
                      backgroundColor: on
                        ? last
                          ? "var(--color-ivory)"
                          : "var(--color-signal)"
                        : "color-mix(in srgb, var(--color-rule-lit) 70%, transparent)",
                      transition: `background-color 0ms linear ${delay}ms`,
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between font-pixel text-[9px] leading-none tracking-[0.06em] text-ivory/80 sm:text-[10px]">
            <span className={cn("flex items-center gap-2", last && "text-signal pixel-blink")}>
              {last ? (
                <>
                  <PixelArt rows={SPARKLE} palette={ICON_PALETTE} scale={2} />
                  SHIPPED
                </>
              ) : (
                `STEP ${index + 1} OF ${total}`
              )}
            </span>
            <span className="tabular-nums">{shownPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessMorph;
