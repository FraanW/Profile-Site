import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsPage } from "./ProjectsPage";

/**
 * /projects (blueprint §5): every star grown into a plaque card, 2-up at
 * md+, 1-up below, entered with capped velvet stagger.
 */
const meta = {
  title: "Pages/Projects",
  component: ProjectsPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "All eight titles are real (intake-notes.md; Adloom and Shelvefy scope-bound to the AI engine, Cohorts dashboard ongoing); every description, stack, and figure is a PLACEHOLDER slot. The constellation's stars land here: each card id matches its star's link target.",
      },
    },
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "The browse page, complete with back affordance." } },
  },
};
