import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPage } from "./ProjectsPage";

/**
 * /projects (blueprint §7): the graph's nodes grown into cards, 2-up at md+,
 * 1-up below, every figure an exact ledger number.
 */
const meta = {
  title: "Pages/Projects",
  component: ProjectsPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Intro line and card prose are DRAFT copy, pending Lefler. Card inventory: 8 of the blueprint's 9 candidates; Remedify waits on its repo tidy-up.",
      },
    },
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: { viewport: { value: "mobile2", isRotated: false } },
  parameters: {
    docs: { description: { story: "1-up card stack at 414px." } },
  },
};
