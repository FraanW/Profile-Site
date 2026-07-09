import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Footer } from "./Footer";

/** Blueprint §6.8: stack line, both emails, GitHub, LinkedIn, location. */
const meta = {
  title: "Sections/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: { variant: "ruled", mode: "mount" },
  argTypes: { mode: { table: { disable: true } } },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {};

export const SingleLine: Story = {
  args: { variant: "single" },
};
