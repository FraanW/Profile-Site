import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plaque } from "./Plaque";

/**
 * The art-book caption (blueprint §6.1): `fig. NN · name` in lowercase Plex
 * Mono, violet-ink, with an optional single Sentient support line. Captions
 * in an exhibition, not labels in a UI. Separator ruled `·` (2026-07-11):
 * the writing law's em dash ban wins on visitor-facing copy.
 */
const meta = {
  title: "Components/Plaque",
  component: Plaque,
  parameters: {
    layout: "padded",
  },
  args: { fig: "02", name: "Medibase" },
} satisfies Meta<typeof Plaque>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Caption: Story = {
  parameters: {
    docs: { description: { story: "The bare caption: mono, lowercase, violet-ink. Real title, from intake-notes.md." } },
  },
};

export const WithSupportLine: Story = {
  args: {
    fig: "07",
    name: "Blockmove",
    support: "One placeholder Sentient line under the caption, and only one.",
  },
};

export const ScopedTitle: Story = {
  name: "A scope-bound title",
  args: {
    fig: "04",
    name: "Adloom (AI engine)",
    support: "Placeholder line. The scope suffix is load-bearing and never dropped.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Adloom and Shelvefy carry Shama's AI-engine scope baked into the title (intake-notes.md: site copy must never imply more), so every rendering is safe by construction.",
      },
    },
  },
};
