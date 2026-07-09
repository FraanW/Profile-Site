import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadialGraph } from "./RadialGraph";

/**
 * The signature section (blueprint §6.5): static React Flow, Farhaan center,
 * projects radiating. No pan, no zoom, no drag, no dotted background; custom
 * emerald nodes and edges. Edges draw in once via svg.createDrawable.
 */
const meta = {
  title: "Sections/RadialGraph",
  component: RadialGraph,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Every node is a real link into /projects. Node one-liners are DRAFT copy, pending Lefler. A sr-only list mirrors the graph for keyboard and screen-reader paths.",
      },
    },
  },
  args: { layout: "radial", nodeVariant: "ring", mode: "mount" },
  argTypes: {
    mode: { table: { disable: true } },
    nodeVariant: { control: "radio", options: ["ring", "pill", "dot"] },
  },
} satisfies Meta<typeof RadialGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radial: Story = {
  parameters: {
    docs: { description: { story: "Desktop (lg+) radial layout, ring nodes." } },
  },
};

export const RadialPills: Story = {
  args: { nodeVariant: "pill" },
  parameters: {
    docs: { description: { story: "Node style variant: capsule nodes (radius-node exception)." } },
  },
};

export const Constellation: Story = {
  args: { layout: "constellation" },
  globals: { viewport: { value: "mobile2", isRotated: false } },
  parameters: {
    docs: {
      description: {
        story:
          "The mobile reflow (blueprint §6.5): center node top, nodes cascading down, edges still drawn. A radial crushed to 390px is unreadable; the constellation keeps the identity. Owner may veto for a scaled radial at build preview.",
      },
    },
  },
};
