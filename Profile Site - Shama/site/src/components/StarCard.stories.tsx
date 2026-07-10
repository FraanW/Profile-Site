import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { projectBySlug } from "@/content/copy";
import { StarCard } from "./StarCard";

/**
 * The /projects star card (blueprint §5): a star grown into a museum
 * plaque. Caption first (the art-book move), then star + Fraunces title,
 * Sentient one-liner, mono stack, quiet rule, proof figures, links.
 * Hover the card: its star emits violet. Titles are real
 * (intake-notes.md); every other slot is PLACEHOLDER.
 */
const meta = {
  title: "Components/StarCard",
  component: StarCard,
  parameters: {
    layout: "padded",
  },
  args: { project: projectBySlug("hostel-outpass"), variant: "plaque" },
  argTypes: {
    project: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: "The full anatomy: two figure slots, one link slot." } },
  },
};

export const Compact: Story = {
  args: { variant: "compact" },
  parameters: {
    docs: { description: { story: "Denser padding and body-sm one-liner." } },
  },
};

export const Unframed: Story = {
  args: { variant: "unframed" },
  parameters: {
    docs: {
      description: {
        story: "No card surface: a hairline top rule only, for list-like compositions.",
      },
    },
  },
};

export const ScopedTitle: Story = {
  name: "Scope-bound title",
  args: { project: projectBySlug("adloom-ai-engine") },
  parameters: {
    docs: {
      description: {
        story:
          "The binding scope note rendered: Adloom's card reads AI engine in the title itself (intake-notes.md: Shama's part is the AI engine, never the whole product). Also the dense state: four figure slots wrapping.",
      },
    },
  },
};

export const NoFiguresNoLinks: Story = {
  args: { project: projectBySlug("medulla-ai") },
  parameters: {
    docs: {
      description: {
        story: "The sparse state: no figures, no links. The rule still closes the stack row.",
      },
    },
  },
};
