import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseTiles } from "./CaseTiles";

/**
 * Blueprint §5: four project slots in a minimal 2×2. Fraunces title in
 * star-white, one Sentient line, one mono fragment, a link into /projects.
 * Velvet stagger on entry, once, then stillness.
 */
const meta = {
  title: "Sections/CaseTiles",
  component: CaseTiles,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Titles are real (intake-notes.md); WHICH four appear is TODO(Mimir) — the visible selection note under the heading says so until Mimir decides. Every other slot is PLACEHOLDER. Below sm the grid drops to one column: legibility beats layout fidelity (tokens.md §3.5).",
      },
    },
  },
  args: { variant: "open", mode: "mount" },
} satisfies Meta<typeof CaseTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  parameters: {
    docs: { description: { story: "Default: open grid, generous gutters, no boxes." } },
  },
};

export const Hairline: Story = {
  args: { variant: "hairline" },
  parameters: {
    docs: {
      description: { story: "Variant: tiles separated by faint hairlines, a quiet table." },
    },
  },
};

export const Numbered: Story = {
  args: { variant: "numbered" },
  parameters: {
    docs: {
      description: {
        story: "Variant: each tile carries its fig. number — the tiles as catalogue entries.",
      },
    },
  },
};
