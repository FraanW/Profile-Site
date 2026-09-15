"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/motion";
import type { AeroShardsProps } from "./vendor/AeroShards";

/**
 * ShardField — the React Bits AeroShards background, dressed in emerald ink.
 *
 * Owner decision 2026-09-16: a shard field runs behind the hero. This is the
 * one place on the site where light is a material, so the palette rules that
 * ban glow and bloom elsewhere (tokens.md §1) are relaxed here and nowhere
 * else. Everything below keeps it inside the rest of the system:
 *
 *   - Palettes are token values only. No new colors enter the site.
 *   - Leaf is the accent on emerald grounds (3.67:1, non-text UI) and never
 *     on bone, where it measures 1.92:1 (tokens.md §1.3 rule 1). The bone
 *     palette accents in emerald instead.
 *   - Reduced motion renders nothing: the parent's flat field stands in.
 *   - No WebGPU renders nothing: same flat field, no error surfaced.
 *   - Offscreen pauses the render loop. The landing page already runs a
 *     scroll-linked anime.js timeline; the two never burn frames together.
 */

// vgpu touches navigator.gpu at module scope, so it must never reach the server.
const AeroShards = dynamic(() => import("./vendor/AeroShards"), { ssr: false });

export type ShardPalette = "statement" | "deep" | "bone";

/** Token values only (tokens.md §1.1). Nothing here is a new color. */
const PALETTES: Record<
  ShardPalette,
  Pick<AeroShardsProps, "backgroundColor" | "shardColor" | "accentColor">
> = {
  /** The hero field: shards in bone-muted over emerald, live marks in leaf. */
  statement: { backgroundColor: "#065F46", shardColor: "#B7CFC2", accentColor: "#34CC73" },
  /** A darker cut of the same, for when type needs more room to carry. */
  deep: { backgroundColor: "#044A37", shardColor: "#C0D5C9", accentColor: "#34CC73" },
  /** Bone ground. Accent is emerald, not leaf: leaf on bone is 1.92:1. */
  bone: { backgroundColor: "#F5F6EE", shardColor: "#C0D5C9", accentColor: "#065F46" },
};

/**
 * House tuning — owner-supplied configuration, 2026-09-16 (second pass).
 * Ribbon flow, fine detail, scale pulled to 0.65 and spin up to 1.65, with
 * the lens stack opened back up (glow 1.05, bloom 1.45, grain 0.095).
 *
 * `placement: "full"` is the owner's choice and puts shards across the whole
 * field, headline column included. That is the one value here with a
 * readability cost; ShardsRight in the stories is the same tuning placed to
 * the right for comparison.
 */
export const SHARD_HOUSE: Partial<AeroShardsProps> = {
  placement: "full",
  material: "pearl",
  detail: "fine",
  effect: "none",
  flow: "ribbon",
  rippleIntensity: 1.55,
  holdToGather: true,
  scale: 0.65,
  spread: 1.05,
  depth: 1,
  speed: 1,
  spin: 1.65,
  interaction: "repel",
  density: 1.5,
  shardSize: 1.05,
  stretch: 0.9,
  turbulence: 1.4,
  glow: 1.05,
  edgeSoftness: 0.45,
  bloom: 1.45,
  grain: 0.095,
  chromaticAberration: 0.0075,
  transitionDuration: 1,
  interactionRadius: 1.5,
  interactionStrength: 0.5,
};
export interface ShardFieldProps extends Omit<AeroShardsProps, "backgroundColor" | "shardColor" | "accentColor"> {
  palette?: ShardPalette;
  /** Storybook escape hatch: skip the house tuning and run stock defaults. */
  stock?: boolean;
  /** Set false in stories to keep the field running while out of view. */
  pauseOffscreen?: boolean;
}

/**
 * WebGPU support, read through useSyncExternalStore so the server snapshot is
 * an honest `false` and the client corrects at hydration. Capability never
 * changes within a session, so there is nothing to subscribe to.
 */
const noopSubscribe = () => () => {};
function useWebGPUSupported(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator !== "undefined" && "gpu" in navigator,
    () => false
  );
}

export function ShardField({
  palette = "statement",
  stock = false,
  pauseOffscreen = true,
  className = "",
  paused,
  ...props
}: ShardFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const supported = useWebGPUSupported();
  const reduced = useReducedMotion();
  // Set from AeroShards' onError, which is a callback, not an effect.
  const [failed, setFailed] = useState(false);
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

  // Unsupported, reduced-motion, or a GPU that gave up: the parent's flat
  // field is the resting state, and it is a perfectly good hero on its own.
  if (!supported || reduced || failed) {
    return <div ref={hostRef} aria-hidden="true" className={className} />;
  }

  return (
    <div ref={hostRef} aria-hidden="true" className={className}>
      <AeroShards
        {...(stock ? {} : SHARD_HOUSE)}
        {...PALETTES[palette]}
        {...props}
        paused={paused ?? !onscreen}
        onError={() => setFailed(true)}
        className="h-full w-full"
      />
    </div>
  );
}

export default ShardField;
