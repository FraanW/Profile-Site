import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { hero } from "@/content/copy";
import { identity } from "@/content/profile";
import { SHARD_HOUSE, ShardField } from "./ShardField";

/**
 * The React Bits AeroShards background (WebGPU, via `vgpu`), recolored to
 * emerald ink. Owner decision 2026-09-16.
 *
 * Requires WebGPU: Chrome and Edge have it, Safari 26+ has it, Firefox is
 * still partial. Where it is missing, and under `prefers-reduced-motion`,
 * every story below renders an empty box on purpose. On the live hero that
 * empty box is the flat emerald field, which is the design's resting state.
 */
const meta = {
  title: "Components/ShardField",
  component: ShardField,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "AeroShards in the site palette. Backgrounds are token values only: emerald or bone ground, bone-muted or rule shards, leaf accent on emerald grounds and emerald accent on bone (leaf on bone measures 1.92:1 and is never used). The house tuning runs slower and sparser than the stock demo, with glow and bloom pulled down; flip the `stock` control to compare against the shipped defaults.",
      },
    },
  },
  args: { palette: "statement", stock: false, pauseOffscreen: false },
  argTypes: {
    palette: { control: { type: "inline-radio" }, options: ["statement", "deep", "bone"] },
    placement: { control: { type: "inline-radio" }, options: ["full", "right", "left", "center"] },
    material: { control: { type: "inline-radio" }, options: ["pearl", "chrome", "satin"] },
    flow: { control: { type: "inline-radio" }, options: ["stream", "vortex", "ribbon"] },
    detail: { control: { type: "inline-radio" }, options: ["bold", "balanced", "fine"] },
    interaction: { control: { type: "inline-radio" }, options: ["none", "repel", "attract"] },
    density: { control: { type: "range", min: 0.2, max: 3, step: 0.05 } },
    shardSize: { control: { type: "range", min: 0.3, max: 2.5, step: 0.05 } },
    speed: { control: { type: "range", min: 0, max: 3, step: 0.05 } },
    spin: { control: { type: "range", min: 0, max: 3, step: 0.05 } },
    turbulence: { control: { type: "range", min: 0, max: 3, step: 0.05 } },
    glow: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    bloom: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    grain: { control: { type: "range", min: 0, max: 0.4, step: 0.005 } },
    chromaticAberration: { control: { type: "range", min: 0, max: 0.03, step: 0.0005 } },
    edgeSoftness: { control: { type: "range", min: 0, max: 5, step: 0.1 } },
    spread: { control: { type: "range", min: 0.2, max: 3, step: 0.05 } },
    depth: { control: { type: "range", min: 0.2, max: 3, step: 0.05 } },
    stretch: { control: { type: "range", min: 0.2, max: 3, step: 0.05 } },
  },
} satisfies Meta<typeof ShardField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A hero-sized stage, so the field is judged at the size it will ship at. */
const stage: Decorator = (Story) => (
  <div className="relative h-svh w-full overflow-hidden bg-emerald">
    <Story />
  </div>
);

export const Statement: Story = {
  decorators: [stage],
  // Spread the house tuning so every slider shows the value actually in play.
  // StockTuning deliberately passes none of these, so it falls through to the
  // component's own shipped defaults.
  args: { ...SHARD_HOUSE, className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "The shipping candidate: house tuning, emerald ground, shards right-placed so the headline column stays clean. Drag the mouse to repel; hold to gather.",
      },
    },
  },
};

export const Deep: Story = {
  decorators: [stage],
  args: { ...SHARD_HOUSE, palette: "deep", className: "absolute inset-0" },
  parameters: {
    docs: {
      description: { story: "The darker cut. Use when the type needs more room to carry." },
    },
  },
};

export const Bone: Story = {
  decorators: [
    (Story) => (
      <div className="relative h-svh w-full overflow-hidden bg-bone">
        <Story />
      </div>
    ),
  ],
  args: { ...SHARD_HOUSE, palette: "bone", placement: "full", className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "Bone ground, emerald accent. Included to test the idea, not because the blueprint asks for it: bone is the reading ground everywhere outside the hero, and moving light under body copy is a different argument.",
      },
    },
  },
};

export const ShardsRight: Story = {
  decorators: [stage],
  args: { ...SHARD_HOUSE, placement: "right", className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "The owner's tuning with placement moved off `full` to `right`. Same field, same material, but the headline column stays clear of it. This is the legibility trade against Statement, nothing else differs.",
      },
    },
  },
};

export const StockTuning: Story = {
  decorators: [stage],
  args: { stock: true, className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "The exact demo configuration, recolored: full placement, pearl, density 1.5, glow 1, bloom 0.5, chromatic aberration 0.0075. Louder and faster than the house tuning. This is the A/B.",
      },
    },
  },
};

/** The only question that matters: can you still read the name? */
export const BehindTheHero: Story = {
  decorators: [stage],
  args: { ...SHARD_HOUSE, className: "absolute inset-0" },
  render: (args) => (
    <>
      <ShardField {...args} />
      <div className="relative flex h-full flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-site">
          <h1 className="font-display text-hero text-bone">{identity.name}</h1>
          <p className="mt-6 max-w-narrow text-lede text-bone">{hero.claims.short}</p>
          <p className="mt-4 max-w-narrow text-body text-bone-muted">{hero.support}</p>
          <div className="mt-10 flex items-baseline gap-8">
            <a href="#contact" className="font-mono text-mono text-bone underline underline-offset-4">
              ▸ contact
            </a>
            <a
              href={identity.github.href}
              className="font-mono text-mono text-bone-muted underline underline-offset-4"
            >
              github
            </a>
          </div>
        </div>
      </div>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hero type over the field. Bone on flat emerald is 7.06:1; shards passing behind the text lift local luminance and cut into that. Push `density` and `glow` up until the support line in bone-muted (4.65:1 at rest) starts to fail, and that is the ceiling.",
      },
    },
  },
};
