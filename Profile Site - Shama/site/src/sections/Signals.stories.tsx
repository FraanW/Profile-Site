import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Signals } from "./Signals";

/**
 * Blueprint §5: the compact pedigree block. Hairline-ruled rows, mono
 * labels in violet-ink, Sentient detail in moon — the catalogue's quiet
 * page.
 */
const meta = {
  title: "Sections/Signals",
  component: Signals,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "All three rows are PLACEHOLDER slots, pending Shama's intake.",
      },
    },
  },
  args: { variant: "rows", mode: "mount" },
} satisfies Meta<typeof Signals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rows: Story = {
  parameters: {
    docs: { description: { story: "Default: ruled rows — label, detail, reference." } },
  },
};

export const Dense: Story = {
  args: { variant: "dense" },
  parameters: {
    docs: { description: { story: "Variant: one mono paragraph, interpunct-separated." } },
  },
};

export const Plaques: Story = {
  args: { variant: "plaques" },
  parameters: {
    docs: { description: { story: "Variant: three card plaques on the night." } },
  },
};
