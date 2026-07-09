import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseTiles } from "./CaseTiles";

/**
 * Blueprint §6.4: the owner-picked four (Adloom.ai, UPG, Entopo, LedgerLine)
 * in a minimal 2×2, staggered entry via anime.js stagger(). Deals24 and
 * Sanady deliberately have no tiles; they live on /projects.
 */
const meta = {
  title: "Sections/CaseTiles",
  component: CaseTiles,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tile copy is DRAFT, pending Lefler. Entopo's line stays inside the NDA-sayable block; funding claims follow the per-venture discipline.",
      },
    },
  },
  args: { variant: "open", mode: "mount" },
  argTypes: { mode: { table: { disable: true } } },
} satisfies Meta<typeof CaseTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenWhitespace: Story = {
  parameters: {
    docs: { description: { story: "Default: whitespace-separated, most minimal." } },
  },
};

export const Hairline: Story = {
  args: { variant: "hairline" },
  parameters: {
    docs: { description: { story: "Variant: 1px rule-faint lattice between tiles." } },
  },
};

export const Numbered: Story = {
  args: { variant: "numbered" },
  parameters: {
    docs: { description: { story: "Variant: mono 01 to 04 indices above titles." } },
  },
};
