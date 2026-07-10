import { cubicBezier, spring } from "animejs";
import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";

/**
 * Motion constants, hand-copied from design/tokens.md §4 (the source of
 * truth; the same values live as CSS custom properties in globals.css).
 * If tokens.md changes, this file must change with it.
 *
 * Vocabulary law: three eases, no more. Glide for every entry and reveal,
 * draw for SVG line drawing, lift (spring) for the camera's finale only.
 */

/** The workhorse: entries, reveals, fade-rises, staggers, hovers. */
export const easeGlide = cubicBezier(0.22, 1, 0.36, 1);

/** SVG line drawing only: rules, edges, rings, camera parts. */
export const easeDraw = cubicBezier(0.65, 0, 0.35, 1);

/** The camera's finale glide and settle; nothing else. */
export const springLift = () =>
  spring({ mass: 1, stiffness: 80, damping: 14, velocity: 0 });

export const DURATION = {
  /** Hovers: link underlines, ring fills, arrow nudges. */
  micro: 150,
  /** Section content reveals (fade + rise). */
  enter: 450,
  /** A rule, edge set, or ring drawing in. */
  draw: 900,
  /** Hard budget: hero graph self-draw AND the contact finale. */
  flight: 1800,
} as const;

/** stagger() interval; cap groups at ~6 items so late items aren't forgotten. */
export const STAGGER_STEP = 60;

/** translateY distance for content rising in. Sections settle, never leap. */
export const REVEAL_RISE = 14;

/** Site-wide ScrollObserver smooth sync value. One value, one system. */
export const SCROLL_SYNC = 0.2;

/**
 * Reduced-motion gate (tokens.md §4.4): matching users get final frames and
 * no ScrollObservers are ever created. Components must check this BEFORE
 * building scopes/timelines, and render their resting state untouched.
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
