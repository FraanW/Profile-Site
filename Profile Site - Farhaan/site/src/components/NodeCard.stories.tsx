import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NodeCard } from "./NodeCard";
import { projectBySlug } from "@/content/projects";

/**
 * Blueprint §7 node-card anatomy, built with real ledger data. Hover the
 * card: the emerald ring fills leaf-green and thickens via anime.js.
 * All prose is draft copy, pending Lefler.
 */
const meta = {
  title: "Components/NodeCard",
  component: NodeCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Ring ◉ + Playfair title → serif one-liner → mono stack row → thin emerald rule → mono proof figures (exact ledger numbers) → links row. Draft copy, pending Lefler.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NodeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LedgerLine: Story = {
  args: { project: projectBySlug("ledgerline") },
  parameters: {
    docs: {
      description: {
        story: "The engineering-depth flagship: every figure traces to the truth ledger.",
      },
    },
  },
};

export const UnifiedProductGraph: Story = {
  args: { project: projectBySlug("upg") },
};

export const NdaScoped: Story = {
  name: "NDA-scoped (Entopo)",
  args: { project: projectBySlug("entopo") },
  parameters: {
    docs: {
      description: {
        story:
          "Entopo's card carries no figures and links only to entopo.app: copy stays inside the NDA-sayable block.",
      },
    },
  },
};

export const Numbered: Story = {
  args: { project: projectBySlug("adloom"), variant: "numbered", index: 0 },
  parameters: {
    docs: { description: { story: "Variant: mono index in the corner, for ordered grids." } },
  },
};

export const Compact: Story = {
  args: { project: projectBySlug("deals24"), variant: "compact" },
  parameters: {
    docs: {
      description: {
        story:
          "Variant: tighter paddings and body-sm. Note the funding line: Deals24 is 'raising, in progress', never 'raised'.",
      },
    },
  },
};

export const LongContentStress: Story = {
  name: "Stress: densest card",
  args: { project: projectBySlug("ledgerline"), variant: "compact" },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-xs">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: { story: "The densest data set at ~360px: mobile 1-up width check." },
    },
  },
};
