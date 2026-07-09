import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Airplane } from "./Airplane";

/**
 * The scroll-assembled blueprint aircraft (blueprint §8). Drag the
 * `progress` control 0→1 to preview the whole assembly without scrolling:
 * strokes draw in, parts drift together, labels fade as pieces join.
 */
const meta = {
  title: "Components/Airplane",
  component: Airplane,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Exploded engineering drawing in thin emerald strokes with mono part labels. anime.js createTimeline + svg.createDrawable + stagger; on the landing page the same timeline is pinned to scroll with the site-wide smooth sync value. Geometry is prototype line-work; Riker refines the drawing.",
      },
    },
  },
  args: { variant: "top", mode: "scrub", progress: 0 },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    mode: { table: { disable: true } },
    scrollTarget: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="h-[640px] w-28 border border-rule-faint bg-bone">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Airplane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopDown: Story = {
  parameters: {
    docs: { description: { story: "Default rail drawing: top-down exploded plan." } },
  },
};

export const SideProfile: Story = {
  args: { variant: "side" },
};

export const PaperDart: Story = {
  args: { variant: "paper" },
  parameters: {
    docs: {
      description: { story: "Minimal three-stroke geometry, if the owner wants it quieter." },
    },
  },
};

export const Assembled: Story = {
  args: { mode: "static" },
  parameters: {
    docs: {
      description: {
        story: "The reduced-motion frame: plane assembled, labels gone, no observers created.",
      },
    },
  },
};
