import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { About } from "./About";

/**
 * Blueprint §6.3: squared photo (document treatment), mono caption, 60 to 90
 * words of first-person serif. Body is DRAFT copy, pending Lefler; the photo
 * asset is pending from the owner.
 */
const meta = {
  title: "Sections/About",
  component: About,
  parameters: { layout: "fullscreen" },
  args: { variant: "photo-left", mode: "mount" },
  argTypes: { mode: { table: { disable: true } } },
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PhotoLeft: Story = {};

export const PhotoRight: Story = {
  args: { variant: "photo-right" },
};

export const OffsetPlate: Story = {
  args: { variant: "plate" },
  parameters: {
    docs: {
      description: {
        story:
          "Variant: a flat emerald plate offset behind the photo. Solid color block, not a shadow; Riker vetoes or keeps it.",
      },
    },
  },
};
