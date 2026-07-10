"use client";

import { animate, utils } from "animejs";
import { DURATION, easeKindle, prefersReducedMotion } from "@/lib/motion";
import { STAR, VIOLET } from "@/lib/palette";

/**
 * A point of light. The only circles on this site are stars and the capture
 * flash's sparkle marks (tokens.md §3.3: --radius-star is the single radius
 * token), and this component is the one place the star's circle is minted.
 * Star-white at rest, always — a glinted star returns to star-white; the
 * violet is what it emits, never what it is (tokens.md §1.3 rule 1).
 *
 * Rendered lit by default so server HTML and reduced-motion frames show the
 * finished sky; animating parents dim it pre-paint and kindle it back.
 */
export function StarMark({
  size = 8,
  className = "",
  ...rest
}: {
  size?: number;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-hidden="true"
      {...rest}
      className={`block shrink-0 rounded-star bg-star ${className}`}
      style={{ width: size, height: size, ...rest.style }}
    />
  );
}

/**
 * The star glint: loud violet PLUS a scale pop (two channels, tokens.md
 * §1.3 rule 3), kindle ease at glint duration — hover is the only
 * repeatable motion on the site. Works on StarMark spans (backgroundColor)
 * and SVG circles (fill). Reduced motion: the state applies instantly.
 */
export function starGlint(el: Element, on: boolean) {
  const colorProp = el instanceof SVGElement ? "fill" : "backgroundColor";
  const to: Record<string, string | number> = {
    [colorProp]: on ? VIOLET : STAR,
    scale: on ? 1.25 : 1,
  };
  if (prefersReducedMotion()) {
    utils.set(el, to);
    return;
  }
  animate(el, { ...to, duration: DURATION.glint, ease: easeKindle });
}
