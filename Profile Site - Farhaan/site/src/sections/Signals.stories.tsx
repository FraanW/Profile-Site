import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Signals } from "./Signals";

/**
 * Blueprint §6.6: the pedigree scan. IEEE paper with a real DOI link, dual
 * degree, hackathon finalist. Ruled emerald lines, mono labels, serif detail.
 */
const meta = {
  title: "Sections/Signals",
  component: Signals,
  parameters: { layout: "fullscreen" },
  args: { variant: "rows", mode: "mount" },
  argTypes: { mode: { table: { disable: true } } },
} satisfies Meta<typeof Signals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RuledRows: Story = {
  parameters: {
    docs: { description: { story: "Default: dl rows between hairlines, panel-scannable." } },
  },
};

export const DenseLine: Story = {
  args: { variant: "dense" },
  parameters: {
    docs: { description: { story: "Variant: everything on one mono line, maximum compression." } },
  },
};

export const Cards: Story = {
  args: { variant: "cards" },
  parameters: {
    docs: { description: { story: "Variant: three card surfaces, if the section needs more weight." } },
  },
};
