"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * VeilField — the React Bits DarkVeil background, rotated onto emerald ink.
 *
 * Owner brief 2026-09-16, third of three. This one cannot be recolored the
 * way [ShardField] and [ParticleField] can: DarkVeil has no color props at
 * all. Its aurora is baked into a CPPN's weights and the only handle is
 * `hueShift`, a YIQ-space rotation applied to whatever the network produced.
 *
 * So the palette work here is a measurement, not a setting. HUE_EMERALD was
 * found by sweeping the rotation in a headless browser and sampling the mean
 * frame hue against the token emerald (scripts/sweep-veil.mjs). Treat it as
 * a fitted constant: if the vendored shader is ever updated, re-run the sweep
 * rather than nudging the number by eye.
 *
 * Unlike the other two this renders fully opaque, so it replaces the ground
 * it sits on instead of compositing over it.
 */

// ogl grabs a WebGL2 context on mount; keep it off the server.
const DarkVeil = dynamic(() => import("./vendor/DarkVeil"), { ssr: false });

/**
 * Degrees of YIQ rotation that carry the stock violet aurora onto emerald.
 * Fitted, not chosen: swept -180..180 coarse then 50..70 fine, scoring each
 * frame's mean lit color against #065F46 by Lab hue angle. 56 lands the mean
 * at rgb(0,84,60), 0.8 degrees off the token. See scripts/sweep-veil.mjs.
 */
export const HUE_EMERALD = 56;

export interface VeilFieldProps {
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  speed?: number;
  scanlineFrequency?: number;
  warpAmount?: number;
  resolutionScale?: number;
  /** DarkVeil's own bone-ground treatment: ink on white instead of light on black. */
  lightMode?: boolean;
  className?: string;
  pauseOffscreen?: boolean;
}

/** Owner-supplied configuration 2026-09-16, with the hue rotated onto emerald. */
export const VEIL_HOUSE = {
  hueShift: HUE_EMERALD,
  noiseIntensity: 0,
  scanlineIntensity: 0,
  speed: 1.5,
  scanlineFrequency: 0,
  warpAmount: 1,
  resolutionScale: 1,
};

export function VeilField({
  className = "",
  pauseOffscreen = true,
  ...props
}: VeilFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [onscreen, setOnscreen] = useState(!pauseOffscreen);

  useEffect(() => {
    const el = hostRef.current;
    if (!pauseOffscreen || !el) return;
    const io = new IntersectionObserver(([entry]) => setOnscreen(entry.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [pauseOffscreen]);

  // The vendored component runs its own rAF with no pause handle, so the only
  // honest way to stop it is to unmount it.
  const live = !reduced && onscreen;

  return (
    <div ref={hostRef} aria-hidden="true" className={className}>
      {live ? <DarkVeil {...VEIL_HOUSE} {...props} /> : null}
    </div>
  );
}

export default VeilField;
