import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopBar } from "./TopBar";

/**
 * Blueprint §5: thin persistent top bar — mono name left, "projects ·
 * contact" right, lowercase throughout. Links glint violet on hover (kindle
 * ease, underline-offset shift: two channels).
 */
const meta = {
  title: "Components/TopBar",
  component: TopBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "No caps branch exists on this site; the mono is the caption voice. Tab through it: the double focus ring (night inner, violet outer) is the one loud-violet state reachable by keyboard.",
      },
    },
  },
  args: { variant: "ruled", back: false },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ruled: Story = {
  parameters: {
    docs: { description: { story: "Default: hairline bottom rule on the night ground." } },
  },
};

export const Floating: Story = {
  args: { variant: "floating" },
  parameters: {
    docs: { description: { story: "Variant: no rule; the bar floats on the night." } },
  },
};

export const WithBack: Story = {
  args: { back: true },
  parameters: {
    docs: {
      description: { story: "The /projects chrome: back affordance beside the name." },
    },
  },
};
