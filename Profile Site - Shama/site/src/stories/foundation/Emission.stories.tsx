import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { animate, utils } from "animejs";
import { useRef } from "react";
import { StarMark } from "@/components/Star";
import {
  DURATION,
  HALO_SCALE,
  SHIMMER,
  easeKindle,
  easeVelvet,
  prefersReducedMotion,
} from "@/lib/motion";

/**
 * The emission (tokens.md §1.4): Shama's stars "emit purple hue sometimes."
 * One sanctioned soft halo — a tokenized radial gradient, not a blur, not a
 * shadow — applied only via bg-emission, only on star-emission elements.
 */
const meta = {
  title: "Foundation/Emission",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The one glow in the system. Execution is a radial gradient (GPU-cheap, deterministic edge, greppable); filter: blur, text-shadow, and drop-shadow remain banned site-wide. Animated by transform/opacity only; triggered emission runs on kindle, the idle shimmer's swell on velvet.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TheHalo: Story = {
  name: "The halo (click to emit)",
  render: function HaloStory() {
    const haloRef = useRef<HTMLSpanElement>(null);
    const fire = () => {
      const halo = haloRef.current;
      if (!halo || prefersReducedMotion()) return;
      utils.set(halo, { opacity: 0, scale: 0.6 });
      animate(halo, {
        scale: { to: 1, duration: DURATION.glint, ease: easeKindle },
        opacity: [
          { to: 0.9, duration: DURATION.glint, ease: easeKindle },
          { to: 0, duration: DURATION.enter, ease: easeVelvet },
        ],
      });
    };
    return (
      <button
        type="button"
        onClick={fire}
        className="border border-rule-faint bg-card p-10 text-left"
      >
        <p className="font-mono text-plaque text-violet-ink">
          bg-emission · triggered pop on kindle, decay on velvet · click to emit
        </p>
        <div className="mt-8 flex items-center justify-center py-6">
          <span className="relative flex items-center justify-center">
            <span
              ref={haloRef}
              aria-hidden="true"
              className="bg-emission rounded-star pointer-events-none absolute"
              style={{ width: 60, height: 60, opacity: 0 }}
            />
            <StarMark size={10} />
          </span>
        </div>
      </button>
    );
  },
};

export const HaloCap: Story = {
  name: "The halo-scale cap",
  parameters: {
    docs: {
      description: {
        story:
          "A halo's diameter never exceeds --halo-scale (6x) its star's diameter: emission is local light, not a spotlight; past ~6x it becomes a field and violates the dosage law. Shown at rest opacity for inspection.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-12 bg-night p-10">
      {[
        { star: 8, factor: 4 },
        { star: 8, factor: HALO_SCALE },
        { star: 10, factor: HALO_SCALE },
      ].map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-4">
          <span className="relative flex h-20 w-20 items-center justify-center">
            <span
              aria-hidden="true"
              className="bg-emission rounded-star pointer-events-none absolute"
              style={{ width: c.star * c.factor, height: c.star * c.factor, opacity: 0.9 }}
            />
            <StarMark size={c.star} />
          </span>
          <span className="font-mono text-plaque text-violet-ink">
            {c.star}px star · {c.factor}x halo{c.factor === HALO_SCALE ? " (the cap)" : ""}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const ShimmerCage: Story = {
  name: "The idle shimmer's cage",
  parameters: {
    docs: {
      description: {
        story:
          "\"Sometimes\" is temporal: the sky breathes unprompted, as the one sanctioned exception to nothing-loops (tokens.md §4.4). See it live in Sections/Constellation.",
      },
    },
  },
  render: () => (
    <div className="max-w-prose border border-rule-faint bg-card p-6">
      <p className="font-mono text-mono font-medium text-moon">the cage, in full</p>
      <ul className="mt-3 space-y-2 text-body-sm text-moon">
        <li>at most ONE star mid-swell at any moment, site-wide; two reads as particles, and particles are banned</li>
        <li>opacity-only on the star&apos;s emission halo; the star itself never moves</li>
        <li>one swell is {SHIMMER.swell}ms, rise and fall, on velvet: a breath, not a catch — kindle stays reserved for emission that answers the visitor</li>
        <li>between swells, silence: {SHIMMER.lull}ms mean lull, jittered ±{SHIMMER.jitter * 100}% so the sky never reads as a metronome</li>
        <li>constellation section only, viewport-gated, never during the entry animation</li>
        <li>zero under prefers-reduced-motion: the scope is never created</li>
      </ul>
    </div>
  ),
};
