import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hero } from "./Hero";

/**
 * Blueprint §6.2: emerald field, huge Josefin name, the living graph drawing
 * itself once on mount (anime.js svg.createDrawable + createTimeline, under
 * the 1800ms flight budget), then complete stillness.
 */
const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Headline and support are DRAFT copy, pending Lefler (raw material: AI-native full-stack development, product thinking, product management). Re-mount the story to replay the self-draw.",
      },
    },
  },
  args: { variant: "beside", claim: "short" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GraphBeside: Story = {
  parameters: {
    docs: { description: { story: "Default: the living graph beside the type at lg+." } },
  },
};

export const GraphBehind: Story = {
  args: { variant: "behind" },
  parameters: {
    docs: { description: { story: "Variant: the graph as a faint field behind the type." } },
  },
};

export const GraphStrip: Story = {
  args: { variant: "strip" },
  parameters: {
    docs: { description: { story: "Variant: a small graph strip under the claim; type carries the viewport." } },
  },
};

export const LongerClaim: Story = {
  args: { claim: "long" },
  parameters: {
    docs: { description: { story: "The alternate draft headline, for comparing claim lengths." } },
  },
};
