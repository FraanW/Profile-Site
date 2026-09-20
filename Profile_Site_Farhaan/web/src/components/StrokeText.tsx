"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * StrokeText, from React Bits (reactbits.dev), ported to TypeScript and
 * adapted for the hero headline. Owner's pick, 2026-09-19, for its entry: the
 * letters draw on as outlines, then fill.
 *
 * Changes from the original, all because the headline is several lines of
 * body-sized display type rather than one wordmark:
 *   - `lines` instead of `text`: each line is its own <text> row. Line breaks
 *     are chosen by the caller (the hero passes one set for phones and one
 *     for wider screens), since SVG text does not wrap.
 *   - The SVG is sized in em from its own measured box, so it renders at the
 *     font size of whatever it sits in, exactly like the heading it replaces.
 *   - The outline fades away once the fill has landed, so the resting state
 *     is the plain ivory headline and not ivory with a teal rim.
 *   - It re-measures when it resizes (for instance when a breakpoint reveals
 *     it) and animates once; later measurements just settle it.
 *   - Mount trigger only; the hover, scroll and loop triggers are not needed.
 *   - Decorative: aria-hidden. The heading carries the real text.
 */

type Box = { x: number; y: number; width: number; height: number };

export function StrokeText({
  lines,
  strokeColor = "#7fd4d0",
  fillColor = "#f4efe2",
  strokeWidth = 1.2,
  drawDuration = 1.4,
  fillDelay = 0.1,
  stagger = 0.028,
  ease = "power2.out",
  fontSize = 100,
  lineHeight = 0.92,
  fontWeight = 500,
  letterSpacing = -4,
  startDelay = 0,
  className = "",
}: {
  lines: string[];
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  /** In SVG user units. Only the ratio to everything else matters. */
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
  /** In user units, like fontSize. -4 at 100 is -0.04em. */
  letterSpacing?: number;
  /** Seconds before the draw starts. */
  startDelay?: number;
  className?: string;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<SVGGElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);
  const played = useRef(false);
  const [box, setBox] = useState<Box | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = useMemo<React.CSSProperties>(
    () => ({
      fontFamily: "var(--font-display)",
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;

    const measure = () => {
      if (cancelled || !measureRef.current) return;
      let bbox: DOMRect;
      try {
        bbox = measureRef.current.getBBox();
      } catch {
        return;
      }
      if (!bbox.width) return;
      const pad = Math.max(strokeWidth, fontSize * 0.06);
      const next = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
      };
      setBox((prev) =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5 &&
        Math.abs(prev.height - next.height) < 0.5
          ? prev
          : next,
      );
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [lines, fontSize, fontWeight, letterSpacing, strokeWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !box) return;

    const strokes = gsap.utils.toArray<SVGTSpanElement>(root.querySelectorAll("[data-stroke-char]"));
    const strokeLayer = root.querySelector<SVGGElement>("[data-stroke-layer]");
    const wipe = wipeRectRef.current;
    if (!strokes.length || !wipe || !strokeLayer) return;
    const targets = [...strokes, wipe, strokeLayer];

    const settle = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(strokeLayer, { opacity: 0 });
      gsap.set(wipe, { attr: { width: box.width } });
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || played.current) {
      settle();
      return () => gsap.killTweensOf(targets);
    }
    played.current = true;

    gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
    gsap.set(strokeLayer, { opacity: 1 });
    gsap.set(wipe, { attr: { width: 0 } });

    const fillDuration = Math.max(0.5, drawDuration * 0.55);
    const timeline = gsap.timeline({ delay: startDelay, defaults: { overwrite: "auto" } });
    timeline.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger }, 0);
    const fillAt = drawDuration + stagger * strokes.length * 0.5 + fillDelay;
    timeline.to(wipe, { attr: { width: box.width }, duration: fillDuration, ease: "power2.inOut" }, fillAt);
    timeline.to(strokeLayer, { opacity: 0, duration: 0.6, ease: "power1.out" }, fillAt + fillDuration * 0.6);

    return () => {
      timeline.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, startDelay]);

  const rows = (keyPrefix: string, data: string | undefined) =>
    lines.map((line, row) => (
      <text key={`${keyPrefix}-${row}`} x="0" y={row * fontSize * lineHeight} style={fontStyle}>
        {Array.from(line).map((char, i) => (
          <tspan key={i} {...(data ? { [data]: "" } : {})}>
            {char}
          </tspan>
        ))}
      </text>
    ));

  const viewBox = box
    ? `${box.x} ${box.y} ${box.width} ${box.height}`
    : `0 ${-fontSize} ${fontSize * 8} ${fontSize * lineHeight * lines.length + fontSize * 0.3}`;

  return (
    <span ref={rootRef} className={`block leading-none ${className}`} aria-hidden="true">
      <svg
        viewBox={viewBox}
        className="block overflow-visible"
        style={
          box
            ? {
                width: `${box.width / fontSize}em`,
                height: `${box.height / fontSize}em`,
                // Pull the padding back out, so the first letter lines up with
                // the text below it exactly as the plain heading did.
                marginLeft: `${box.x / fontSize}em`,
              }
            : { width: "100%", height: `${lines.length * lineHeight}em`, visibility: "hidden" }
        }
      >
        {box && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x={box.x} y={box.y} width="0" height={box.height} />
            </clipPath>
          </defs>
        )}

        {/* Measured, never painted: the box every layer is sized to. */}
        <g ref={measureRef} fill="none" stroke="none">
          {rows("m", undefined)}
        </g>

        <g
          data-stroke-layer=""
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {rows("s", "data-stroke-char")}
        </g>

        <g fill={fillColor} clipPath={box ? `url(#${wipeId})` : undefined}>
          {rows("f", undefined)}
        </g>
      </svg>
    </span>
  );
}

export default StrokeText;
