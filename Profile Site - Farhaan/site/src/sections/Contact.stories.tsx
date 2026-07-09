import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Contact } from "./Contact";

/**
 * Blueprint §6.7: one tiny ask, both emails, and the finale: the assembled
 * plane banks in along an SVG motion path (svg.createMotionPath + the lift
 * spring) and lands on the CTA with its one line.
 */
const meta = {
  title: "Sections/Contact",
  component: Contact,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The plane's line and every other string here are DRAFT copy, pending Lefler; the line's sentiment (lift off, send ideas, build) is owner-locked. Use the replay button to re-run the flight. Reduced motion parks the plane and shows the line.",
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
    docs: { description: { story: "Default: solid emerald CTA; the plane lands on it." } },
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
        story: "The final frame: plane pre-landed, line visible, no observers created.",
      },
    },
  },
};
