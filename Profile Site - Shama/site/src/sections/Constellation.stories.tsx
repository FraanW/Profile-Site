import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Constellation } from "./Constellation";

/**
 * The signature section (blueprint §6.1, palette v2): white stars directly
 * on the black page ground — no panel, no field — joined by thin violet
 * lines. A hand-composed open sky, not a network diagram: no center node,
 * no hub-and-spoke, no React Flow; an authored chain that branches once,
 * drawn in SVG, with real links and real focus rings over it.
 */
const meta = {
  title: "Sections/Constellation",
  component: Constellation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Entry: edges trace in (violet-ink chain, violet-deep branches) and stars kindle, once. Hover or focus a star: it emits violet (glint + scale pop) and its one Sentient line arrives. After the entry, the idle shimmer breathes inside its cage: one star's emission halo at a time, velvet, viewport-gated (tokens.md §4.4). Titles are real (intake-notes.md); the lines under them are PLACEHOLDER slots.",
      },
    },
  },
  args: { mode: "mount" },
} satisfies Meta<typeof Constellation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComposedSky: Story = {
  args: { variant: "sky" },
  parameters: {
    docs: {
      description: {
        story:
          "The lg+ composition: eight stars, seven edges, an open figure. Plaque placement is authored per star so no caption sits on a line. Stay a while: after the entry finishes, the shimmer begins — one halo swell, then five to twelve seconds of silence. Never two at once.",
      },
    },
  },
};

export const SkyColumn: Story = {
  args: { variant: "column" },
  parameters: {
    docs: {
      description: {
        story:
          "Below lg the sky re-composes vertically (blueprint §6.1: never a crushed scale-down): one drawn thread, each star with its plaque and its line static beside it. No shimmer in the column: the composed sky is the shimmer's scope.",
      },
    },
  },
};

export const Static: Story = {
  args: { variant: "sky", mode: "none" },
  parameters: {
    docs: {
      description: {
        story:
          "The reduced-motion / no-JS frame: sky fully drawn, stars lit star-white, plaques visible, halos dark, no observers, no shimmer. Support lines still arrive on hover and focus (a state, not motion).",
      },
    },
  },
};
