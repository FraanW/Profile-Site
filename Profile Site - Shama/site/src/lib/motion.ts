import { cubicBezier } from "animejs";
import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

/**
 * Motion constants, hand-copied from design/tokens.md §4 (the source of
 * truth; the same values live as CSS custom properties in globals.css).
 * If tokens.md changes, this file must change with it.
 *
 * Vocabulary law: three eases, no more. Velvet for every entry and reveal
 * (and the camera's finale glide, and the idle shimmer's swell), trace for
 * SVG line drawing, kindle for triggered emission and stars only. No spring
 * on this site (tokens.md §4.1 ruling): the finale glides in on velvet and
 * the drama is the capture flash, not the landing.
 */

/** The workhorse: entries, reveals, fade-rises, staggers, quote fades,
    the finale glide, the shimmer swell. Heavy curtains. */
export const easeVelvet = cubicBezier(0.45, 0.05, 0.15, 1);

/** SVG line drawing only: constellation edges, statement rules, the camera
    parts drawing themselves in. */
export const easeTrace = cubicBezier(0.6, 0.05, 0.25, 1);

/**
 * The glint: star glints, violet emission answering the visitor, the
 * aperture blink and capture flash at the finale. ~6% overshoot on
 * scale/opacity reads as light catching. The ONLY ease permitted on
 * triggered emission or stars, and it never touches layout-scale elements.
 */
export const easeKindle = cubicBezier(0.3, 1.35, 0.45, 1);

export const DURATION = {
  /** Hovers: link glints, star pops, underline shifts. */
  glint: 260,
  /** Section content reveals (fade + rise in velvet); quote fades. */
  enter: 700,
  /** An edge set or statement rule tracing in; the finale glide's length. */
  draw: 1400,
  /** Hard budget: camera glide + aperture blink + capture flash, complete. */
  finale: 2600,
} as const;

/**
 * The idle shimmer's cage (tokens.md §4.4): the one sanctioned exception to
 * nothing-loops. At most one star mid-swell at any moment site-wide;
 * opacity-only on the star's emission halo; velvet; constellation section
 * only, viewport-gated; zero under reduced motion.
 */
export const SHIMMER = {
  /** One swell, rise and fall complete. */
  swell: 2400,
  /** Mean quiet between swells. */
  lull: 9000,
  /** Per-swell jitter on the lull, so the sky never reads as a metronome. */
  jitter: 0.4,
} as const;

/** Emission halo cap (tokens.md §1.4): halo diameter <= 6x its star's. */
export const HALO_SCALE = 6;

/** SVG stroke widths (tokens.md §3.2), paired with non-scaling-stroke. */
export const STROKE = {
  /** Sky line-work + camera detail strokes. */
  sky: 1,
  /** Camera primary strokes only; the ceiling on the instrument's ink. */
  instrument: 1.25,
} as const;

/** stagger() interval; cap groups at ~6 items so late items aren't forgotten. */
export const STAGGER_STEP = 110;

/** translateY distance for content rising in. Weight needs travel. */
export const REVEAL_RISE = 20;

/**
 * Site-wide ScrollObserver smooth sync value for the camera's assembly
 * scrub (bidirectional). One value, one sky: never per-section overrides.
 */
export const SCROLL_SYNC = 0.15;

/**
 * Reduced-motion gate (tokens.md §4.5): matching users get final frames —
 * all stars lit star-white, constellation fully drawn, no shimmer, the
 * camera parked assembled beside the CTA (no rail, no scrub, no flash) —
 * and no ScrollObservers are ever created. Components must check this
 * BEFORE building scopes/timelines, and render their resting state
 * untouched. The check must be synchronous at effect time: hydration's
 * server snapshot assumes motion, so a render-gate alone lets a motion-first
 * pass dim elements that a later cleanup revert() then restores
 * (see shared/playbook.md).
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** Reactive form of the gate, for components that render a static frame. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false // server snapshot: assume motion; the client corrects at hydration
  );
}

/**
 * useLayoutEffect on the client, useEffect during SSR (avoids React's
 * server warning). Reveal components set their pre-animation state through
 * this hook so the hide runs BEFORE the browser's first paint: no flash of
 * visible content. The server HTML carries no inline hiding, so a no-JS
 * visitor (or anyone whose observers never attach) sees everything: content
 * is visible by default and motion is progressive enhancement.
 */
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * How a component should run its entry animation.
 * - "scroll": fires once when scrolled into view (the landing page)
 * - "mount":  fires immediately on mount (Storybook section stories)
 * - "none":   no animation; render the final frame
 */
export type RevealMode = "scroll" | "mount" | "none";
