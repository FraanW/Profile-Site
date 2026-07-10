import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { About } from "./About";

/**
 * Blueprint §5: photo slot plus 60 to 90 words of first-person Sentient on
 * the night ground. The photo is squared with a mono plaque caption — a
 * document in the exhibition, never a circle avatar.
 */
const meta = {
  title: "Sections/About",
  component: About,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Body copy is a PLACEHOLDER slot, pending Shama's intake; the paragraph proves the measure and the voice, and makes no claim about them. Photo is an owner asset, pending.",
      },
    },
  },
  args: { variant: "photo-left", mode: "mount" },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhotoLeft: Story = {
  parameters: {
    docs: { description: { story: "Default: photo column left, paragraph right." } },
  },
};

export const PhotoRight: Story = {
  args: { variant: "photo-right" },
  parameters: {
    docs: { description: { story: "Mirrored: paragraph leads, photo closes." } },
  },
};

export const Mounted: Story = {
  args: { variant: "mounted" },
  parameters: {
    docs: {
      description: {
        story: "The photo set on a card surface with a mat of padding, like a mounted print.",
      },
    },
  },
};
