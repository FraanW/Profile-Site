import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopBar } from "./TopBar";

/**
 * Blueprint §6.1: thin persistent bar, mono name left, "projects · contact"
 * right. Link hovers run through anime.js (color shift, micro duration).
 */
const meta = {
  title: "Components/TopBar",
  component: TopBar,
  parameters: { layout: "fullscreen" },
  args: { variant: "ruled", back: false },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {
  parameters: {
    docs: { description: { story: "Default: hairline bottom rule anchors the bar to the page." } },
  },
};

export const Floating: Story = {
  args: { variant: "floating" },
  parameters: {
    docs: { description: { story: "No rule; the bar disappears into the ground entirely." } },
  },
};

export const CapsLinks: Story = {
  args: { variant: "caps" },
  parameters: {
    docs: {
      description: {
        story: "Nav links in the eyebrow caps branch, the only sanctioned small Josefin.",
      },
    },
  },
};

export const ProjectsBack: Story = {
  args: { back: true },
  parameters: {
    docs: { description: { story: "The /projects variant with the ◂ back affordance." } },
  },
};
