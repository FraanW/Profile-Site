import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";

/**
 * Blueprint §5: one mono line — stack, email, GitHub, LinkedIn, location.
 * Nothing else earns a place.
 */
const meta = {
  title: "Sections/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Every value is a PLACEHOLDER slot, pending Shama's intake.",
      },
    },
  },
  args: { variant: "ruled", mode: "mount" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {
  parameters: {
    docs: { description: { story: "Default: a quiet top rule closes the page." } },
  },
};

export const Single: Story = {
  args: { variant: "single" },
  parameters: {
    docs: { description: { story: "Variant: one unruled wrapping line." } },
  },
};
