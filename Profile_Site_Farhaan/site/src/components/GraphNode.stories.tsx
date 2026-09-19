import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GraphNodeVisual } from "./GraphNode";

/**
 * The radial graph's custom node, standalone. Hover fills the ring
 * leaf-green and thickens it (anime.js; leaf always carries its second
 * channel). Notes are draft copy, pending Lefler.
 */
const meta = {
  title: "Components/GraphNode",
  component: GraphNodeVisual,
  parameters: { layout: "centered" },
  args: {
    title: "ledgerline",
    note: "double-entry ledger, hand-written sql",
    href: "/projects#ledgerline",
    variant: "ring",
    center: false,
  },
} satisfies Meta<typeof GraphNodeVisual>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ring: Story = {};

export const CenterNode: Story = {
  args: { title: "farhaan", note: undefined, href: undefined, center: true },
  parameters: {
    docs: { description: { story: "The graph's center: heavier ring, medium mono." } },
  },
};

export const Pill: Story = {
  args: { variant: "pill" },
  parameters: {
    docs: {
      description: {
        story:
          "Variant: the node as a rounded capsule (radius-node is the system's one sanctioned radius, and it belongs to the graph's nodes).",
      },
    },
  },
};

export const Dot: Story = {
  args: { variant: "dot" },
  parameters: {
    docs: { description: { story: "Variant: filled emerald dot, constellation-friendly." } },
  },
};

export const Cluster: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <GraphNodeVisual title="farhaan" center />
      <div className="flex gap-10 pl-8">
        <GraphNodeVisual title="adloom.ai" note="billboard ad platform, seed raised" href="/projects#adloom" />
        <GraphNodeVisual title="upg" note="open-source product graph standard" href="/projects#upg" />
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: "A small grouping to judge node rhythm and label spacing." } },
  },
};
