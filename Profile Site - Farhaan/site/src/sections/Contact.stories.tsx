import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Contact } from "./Contact";

/**
 * Blueprint §6.7 + §8: one tiny ask, both emails, and the finale: the
 * assembled camera glides in along an SVG motion path (svg.createMotionPath
 * + the lift spring), settles by the CTA, fires its shutter once (aperture
 * blink + capture flash-sparkle from the lens), and delivers its one line.
 */
const meta = {
  title: "Sections/Contact",
  component: Contact,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The camera's line and every other string here are DRAFT copy, pending Lefler; the line's sentiment (reach out with your ideas, let's build) is owner-locked. Use the replay button to re-run the finale, capture flash included. Reduced motion shows the camera at rest, no flash, line readable.",
      },
    },
  },
  args: { variant: "solid", mode: "mount" },
  argTypes: { mode: { table: { disable: true } } },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SolidCta: Story = {
  parameters: {
    docs: { description: { story: "Default: solid emerald CTA; the camera settles by it." } },
  },
};

export const OutlineCta: Story = {
  args: { variant: "outline" },
};

export const BarCta: Story = {
  args: { variant: "bar" },
  parameters: {
    docs: { description: { story: "Variant: full-measure CTA bar." } },
  },
};

export const ReducedMotionFrame: Story = {
  name: "Reduced motion frame",
  args: { mode: "none" },
  parameters: {
    docs: {
      description: {
        story: "The final frame: camera pre-assembled at rest, line visible, no observers created.",
      },
    },
  },
};
