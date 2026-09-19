import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { hero } from "@/content/copy";
import { identity } from "@/content/profile";
import { PARTICLE_HOUSE, ParticleField } from "./ParticleField";

/**
 * The React Bits Antigravity effect (three.js / @react-three/fiber),
 * recolored to emerald ink. Owner brief 2026-09-16.
 *
 * Move the pointer across the stage: particles gather into a ring around it
 * and lerp back out when it leaves. Unlike ShardField this needs no WebGPU,
 * and its `meshBasicMaterial` is unlit, so it never introduces a glow or a
 * gradient. Under `prefers-reduced-motion` the canvas does not mount at all.
 */
const meta = {
  title: "Components/ParticleField",
  component: ParticleField,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Antigravity in the site palette. One flat token color per field: leaf or bone-muted on emerald grounds, emerald on bone. Cursor-driven; `autoAnimate` keeps it drifting when the pointer is elsewhere.",
      },
    },
  },
  // Spread the house tuning into args so every slider shows the value that is
  // actually in play, not its own minimum.
  args: { ...PARTICLE_HOUSE, palette: "leaf", pauseOffscreen: false },
  argTypes: {
    palette: { control: { type: "inline-radio" }, options: ["leaf", "bone", "emerald"] },
    particleShape: {
      control: { type: "inline-radio" },
      options: ["capsule", "sphere", "box", "tetrahedron"],
    },
    count: { control: { type: "range", min: 50, max: 2000, step: 10 } },
    magnetRadius: { control: { type: "range", min: 1, max: 80, step: 1 } },
    ringRadius: { control: { type: "range", min: 1, max: 30, step: 0.5 } },
    fieldStrength: { control: { type: "range", min: 0, max: 60, step: 1 } },
    waveSpeed: { control: { type: "range", min: 0, max: 3, step: 0.05 } },
    waveAmplitude: { control: { type: "range", min: 0, max: 20, step: 0.5 } },
    particleSize: { control: { type: "range", min: 0.1, max: 4, step: 0.05 } },
    lerpSpeed: { control: { type: "range", min: 0.01, max: 1, step: 0.01 } },
    particleVariance: { control: { type: "range", min: 0, max: 3, step: 0.05 } },
    rotationSpeed: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
    depthFactor: { control: { type: "range", min: 0, max: 6, step: 0.1 } },
    pulseSpeed: { control: { type: "range", min: 0, max: 15, step: 0.5 } },
  },
} satisfies Meta<typeof ParticleField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A hero-sized stage, so the field is judged at the size it will ship at. */
const emeraldStage: Decorator = (Story) => (
  <div className="relative h-svh w-full overflow-hidden bg-emerald">
    <Story />
  </div>
);

export const Leaf: Story = {
  decorators: [emeraldStage],
  args: { className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "The owner's pasted config at house scale, in leaf on the emerald field. Move the pointer to pull the ring.",
      },
    },
  },
};

export const BoneMuted: Story = {
  decorators: [emeraldStage],
  args: { palette: "bone", className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story: "The quiet cut: bone-muted particles. Reads as dust in a light shaft, not as a signal.",
      },
    },
  },
};

export const OnBone: Story = {
  decorators: [
    (Story) => (
      <div className="relative h-svh w-full overflow-hidden bg-bone">
        <Story />
      </div>
    ),
  ],
  args: { palette: "emerald", className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "Emerald particles on bone ground. Leaf is not an option here: 1.92:1 on bone (tokens.md §1.3 rule 1).",
      },
    },
  },
};

export const Shapes: Story = {
  decorators: [emeraldStage],
  args: { particleShape: "tetrahedron", count: 800, className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "Shape comparison. Capsule reads as filings, tetrahedron as shards (and rhymes with the camera's line-work), box as pixels, sphere as dust.",
      },
    },
  },
};

/** The only question that matters: can you still read the name? */
export const BehindTheHero: Story = {
  decorators: [emeraldStage],
  args: { className: "absolute inset-0" },
  render: (args) => (
    <>
      <ParticleField {...args} />
      <div className="pointer-events-none relative flex h-full flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-site">
          <h1 className="font-display text-hero text-bone">{identity.name}</h1>
          <p className="mt-6 max-w-narrow text-lede text-bone">{hero.claims.short}</p>
          <p className="mt-4 max-w-narrow text-body text-bone-muted">{hero.support}</p>
        </div>
      </div>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hero type over the field, pointer events passed through to the canvas. Leaf particles crossing bone text is the pairing to watch: push `count` and `particleSize` until the support line stops reading, and that is the ceiling.",
      },
    },
  },
};
