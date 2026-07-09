import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LandingPage } from "./LandingPage";

/**
 * The full landing composition in blueprint §5 order, with the real scroll
 * choreography: every section reveals once via anime.js ScrollObservers
 * (smooth sync site-wide) and the airplane assembles along the right rail
 * across the whole scroll. Scroll the canvas top to bottom to preview.
 */
const meta = {
  title: "Pages/Landing",
  component: LandingPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "All copy is DRAFT, pending Lefler. The dotted-background stories exist for the owner to judge the field against plain bone (default).",
      },
    },
  },
  args: { background: "none" },
  argTypes: {
    background: { control: "radio", options: ["none", "paper", "drift"] },
  },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "Plain bone ground, the blueprint's baseline." } },
  },
};

export const WithDottedPaper: Story = {
  args: { background: "paper" },
  parameters: {
    docs: {
      description: { story: "Owner comparison: the static drafting-paper field behind the page." },
    },
  },
};

export const WithDottedDrift: Story = {
  args: { background: "drift" },
  parameters: {
    docs: {
      description: { story: "Owner comparison: the ambient drift field behind the page." },
    },
  },
};
