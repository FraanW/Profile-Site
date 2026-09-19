import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { createTimeline } from "animejs";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { Camera, CameraGlyph, addShutterFire } from "./Camera";

/**
 * The scroll-assembled exploded camera (blueprint §8, owner decision
 * 2026-07-11: the fighter jet is retired). Drag the `progress` control 0→1
 * to preview the whole assembly without scrolling: parts fade into
 * existence, strokes drawing in, then drift together. No part labels
 * (owner revision 2026-07-11: the drawing carries itself). On the landing
 * page the same timeline is pinned to scroll with the site-wide smooth
 * sync value, so the scrub runs both ways: scrolling up pulls the camera
 * apart and fades the parts back out.
 */
const meta = {
  title: "Components/Camera",
  component: Camera,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Exploded engineering drawing of a DSLR in thin emerald strokes: lens barrel, aperture ring, body, pentaprism, shutter. No labels, no fills, no gradients. anime.js createTimeline + svg.createDrawable; scroll mode is a bidirectional smoothed scrub (parts fade in and assemble going down, disperse and fade out going up), never a one-shot play. Modeled on the exploded camera sequence on animejs.com.",
      },
    },
  },
  args: { mode: "scrub", progress: 0 },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    mode: { table: { disable: true } },
    scrollTarget: { table: { disable: true } },
  },
} satisfies Meta<typeof Camera>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The landing rail's frame: 96px wide, viewport tall, bottom-anchored. */
const railFrame: Decorator = (Story) => (
  <div className="h-[640px] w-28 border border-rule-faint bg-bone">
    <Story />
  </div>
);

export const ExplodedScrub: Story = {
  decorators: [railFrame],
  parameters: {
    docs: {
      description: {
        story:
          "The rail journey. At progress 0 the rail is empty; scrubbing forward, each part fades into existence up the rail, draws itself, and drifts home; by ~0.63 the line-silhouette camera sits assembled at the rail's foot and rests there. Scrub backwards and the assembly undoes itself.",
      },
    },
  },
};

export const Assembled: Story = {
  args: { mode: "static" },
  decorators: [railFrame],
  parameters: {
    docs: {
      description: {
        story: "The resting frame: camera assembled, no observers created.",
      },
    },
  },
};

function GlyphDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fire = () => {
    if (prefersReducedMotion() || !wrapRef.current) return;
    addShutterFire(createTimeline(), wrapRef.current);
  };
  return (
    <div className="flex flex-col items-start gap-6 bg-bone p-16">
      <div ref={wrapRef}>
        <CameraGlyph width={128} />
      </div>
      <button
        type="button"
        onClick={fire}
        className="border border-rule-faint bg-card px-3 py-1.5 font-mono text-label text-steel"
      >
        fire shutter
      </button>
    </div>
  );
}

export const FinaleGlyph: Story = {
  render: () => <GlyphDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "The assembled camera at finale size, with the one shutter fire: blades snap closed, a capture flash-sparkle bursts from the lens (emerald rays and glints, one leaf core inside the lens rings), blades reopen soft. Fires once; transform/opacity only; reduced motion never sees it. Sections/Contact runs this after the glide settles.",
      },
    },
  },
};
