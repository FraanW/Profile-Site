"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * ParticleField — the React Bits Antigravity effect, dressed in emerald ink.
 *
 * Owner brief 2026-09-16, alongside [ShardField]. This one sits inside the
 * palette rules rather than bending them: `meshBasicMaterial` is unlit, so
 * every particle is one flat token color with no glow, bloom, gradient or
 * shadow anywhere in the pipeline (tokens.md §1). The canvas is transparent,
 * so the ground behind it is the real ground, not a painted copy of it.
 *
 * It is cursor-driven: particles gather into a ring around the pointer and
 * lerp back out. `autoAnimate` gives it a drift when nobody is pointing.
 */

// three + fiber are client-only and heavy; never let them reach the server.
const Antigravity = dynamic(() => import("./vendor/Antigravity"), { ssr: false });

export type ParticlePalette = "leaf" | "bone" | "emerald";

/** Token values only (tokens.md §1.1). One flat color, no material tricks. */
const COLORS: Record<ParticlePalette, string> = {
  /** On the emerald field: leaf, 3.67:1, non-text UI. The live mark, moving. */
  leaf: "#34CC73",
  /** On the emerald field, quieter: bone-muted, 4.65:1. */
  bone: "#B7CFC2",
  /** On bone ground: emerald. Leaf on bone is 1.92:1 and is never used. */
  emerald: "#065F46",
};

export interface ParticleFieldProps {
  palette?: ParticlePalette;
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: "capsule" | "sphere" | "box" | "tetrahedron";
  fieldStrength?: number;
  className?: string;
  /** Set false in stories to keep the field running while out of view. */
  pauseOffscreen?: boolean;
}

/**
 * House tuning. The owner's pasted config at house scale: the same shape
 * language, slowed down and thinned out so it reads as a field of filings
 * under a magnet rather than as confetti.
 */
export const PARTICLE_HOUSE = {
  count: 570,
  magnetRadius: 30,
  ringRadius: 5,
  waveSpeed: 0.4,
  waveAmplitude: 5,
  particleSize: 0.5,
  lerpSpeed: 0.35,
  autoAnimate: true,
  particleVariance: 1.2,
  rotationSpeed: 1.6,
  depthFactor: 2.7,
  pulseSpeed: 6,
  particleShape: "capsule" as const,
  fieldStrength: 20,
};

export function ParticleField({
  palette = "leaf",
  className = "",
  pauseOffscreen = true,
  ...props
}: ParticleFieldProps) {
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

  // Reduced motion and offscreen both unmount the canvas outright: the
  // vendored component owns its own <Canvas>, so there is no frameloop to
  // pause from out here. The ground behind shows through, which is the
  // resting state anyway.
  const live = !reduced && onscreen;

  return (
    <div ref={hostRef} aria-hidden="true" className={className}>
      {live ? <Antigravity {...PARTICLE_HOUSE} {...props} color={COLORS[palette]} /> : null}
    </div>
  );
}

export default ParticleField;
