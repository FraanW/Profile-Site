import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { hero } from "@/content/copy";
import { identity } from "@/content/profile";
import { HUE_EMERALD, VEIL_HOUSE, VeilField } from "./VeilField";

/**
 * The React Bits DarkVeil background (WebGL2, via `ogl`), hue-rotated onto
 * emerald. Owner brief 2026-09-16.
 *
 * This is the only one of the three fields with no color props: the aurora
 * lives in a CPPN's weights and `hueShift` rotates it in YIQ space. The
 * default here is the fitted value from scripts/sweep-veil.mjs, not a guess.
 */
const meta = {
  title: "Components/VeilField",
  component: VeilField,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "DarkVeil rotated onto the token emerald. Renders fully opaque, so it replaces the ground rather than compositing over it: this is a hero-field treatment, not an overlay. Needs WebGL2 only, so unlike ShardField it runs anywhere.",
      },
    },
  },
  args: { ...VEIL_HOUSE, pauseOffscreen: false },
  argTypes: {
    hueShift: { control: { type: "range", min: -180, max: 180, step: 1 } },
    speed: { control: { type: "range", min: 0, max: 4, step: 0.05 } },
    warpAmount: { control: { type: "range", min: 0, max: 3, step: 0.05 } },
    noiseIntensity: { control: { type: "range", min: 0, max: 0.5, step: 0.005 } },
    scanlineIntensity: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    scanlineFrequency: { control: { type: "range", min: 0, max: 200, step: 1 } },
    resolutionScale: { control: { type: "range", min: 0.25, max: 2, step: 0.05 } },
  },
} satisfies Meta<typeof VeilField>;

export default meta;
type Story = StoryObj<typeof meta>;

const stage: Decorator = (Story) => (
  <div className="relative h-svh w-full overflow-hidden bg-emerald">
    <Story />
  </div>
);

export const Emerald: Story = {
  decorators: [stage],
  args: { className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story: `The shipping candidate: the owner's config at hueShift ${HUE_EMERALD}, the fitted rotation onto token emerald.`,
      },
    },
  },
};

export const AsPasted: Story = {
  decorators: [stage],
  args: { hueShift: -20, className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "The owner's pasted hueShift of -20, for comparison. It lands in blue-violet, which is off-palette; everything else about the config is unchanged.",
      },
    },
  },
};

export const LightMode: Story = {
  decorators: [
    (Story) => (
      <div className="relative h-svh w-full overflow-hidden bg-bone">
        <Story />
      </div>
    ),
  ],
  args: { lightMode: true, className: "absolute inset-0" },
  parameters: {
    docs: {
      description: {
        story:
          "DarkVeil's own bone treatment: ink on white rather than light on black. Closer to the site's reading grounds than the dark cut is.",
      },
    },
  },
};

/** Sweep target: bare field, no stage chrome, so the sampler reads clean. */
export const Sweep: Story = {
  args: { className: "h-svh w-full" },
  parameters: {
    docs: {
      description: {
        story:
          "Harness story for scripts/sweep-veil.mjs, which drives `hueShift` across its range and scores each frame against the token emerald in Lab. Not a design story.",
      },
    },
  },
};

/** The only question that matters: can you still read the name? */
export const BehindTheHero: Story = {
  decorators: [stage],
  args: { className: "absolute inset-0" },
  render: (args) => (
    <>
      <VeilField {...args} />
      <div className="relative flex h-full flex-col justify-center px-6">
        <div className="mx-auto w-full max-w-site">
          <h1 className="font-display text-hero text-bone">{identity.name}</h1>
          <p className="mt-6 max-w-narrow text-lede text-bone">{hero.claims.short}</p>
          <p className="mt-4 max-w-narrow text-body text-bone-muted">{hero.support}</p>
        </div>
      </div>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Hero type over the veil. This field is opaque and its luminance moves under the text, so bone-on-emerald's 7.06:1 is not a floor here: the bright lobes of the aurora are where the support line will fail first.",
      },
    },
  },
};
