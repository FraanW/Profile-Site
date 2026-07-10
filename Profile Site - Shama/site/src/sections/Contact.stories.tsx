import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Contact } from "./Contact";

/**
 * Blueprint §5 + §6.2: one tiny ask, the links row, and the camera's
 * finale. The assembled camera glides in on VELVET (no spring on this
 * site), settles beside the CTA, and fires once — aperture blink, then the
 * capture flash: star-white core, loud-violet rays, the emission bloom.
 * The site's one finale-scale emission moment, complete inside 2600ms,
 * once per page visit.
 */
const meta = {
  title: "Sections/Contact",
  component: Contact,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "In mount mode the finale plays immediately and a replay button appears (top right). On the landing page the glide is a hand-off from the rail over disjoint scroll bands: one camera on screen at every scroll position. All copy is PLACEHOLDER; the mailto is deliberately dead until intake.",
      },
    },
  },
  args: { variant: "outline", mode: "mount" },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default: the squared outline CTA (violet-ink border, star label). Watch the glide settle, the blades blink, and the flash catch — then stillness.",
      },
    },
  },
};

export const Bar: Story = {
  args: { variant: "bar" },
  parameters: {
    docs: { description: { story: "Variant: the CTA as a full-measure bar; the glyph settles on its right end." } },
  },
};

export const Quiet: Story = {
  args: { variant: "quiet" },
  parameters: {
    docs: {
      description: { story: "Variant: the CTA as a bare underlined mono line. Same finale." },
    },
  },
};

export const StaticFinale: Story = {
  args: { mode: "none" },
  parameters: {
    docs: {
      description: {
        story:
          "The reduced-motion / no-JS frame: the camera parked assembled beside the CTA, line visible, no observers, no flash (every flash element rests at opacity 0). This is what prefers-reduced-motion users land on — their one camera.",
      },
    },
  },
};
