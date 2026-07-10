import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { STAR } from "@/lib/palette";
import { Hero } from "./Hero";

/**
 * Blueprint §5, palette v2: the flat black night ground, the name huge in
 * Fraunces star-white, the first stars kindling in the upper dark (kindle
 * ease, staggered, once), and the hero pull-quote — then complete
 * stillness.
 */
const meta = {
  title: "Sections/Hero",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "No field, no fade: the ground is fully black (Shama's brief; the tokens.md §1.4 hero gradient proposal ships only with their explicit yes). All copy is PLACEHOLDER, pending intake. Re-mount the story to replay the kindling.",
      },
    },
  },
  args: { variant: "horizon", claim: "short" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizon: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default: the name sits low, like a signature on a plate; the stars own the dark above.",
      },
    },
  },
};

export const Centered: Story = {
  args: { variant: "centered" },
  parameters: {
    docs: { description: { story: "Variant: the name holds the field's center." } },
  },
};

export const LongClaim: Story = {
  args: { claim: "long" },
  parameters: {
    docs: {
      description: { story: "The longer claim slot, for comparing line lengths after Lefler writes." },
    },
  },
};

export const FirstStarsOnly: Story = {
  name: "The first stars",
  render: () => (
    <div className="border border-rule-faint bg-night p-10">
      <p className="font-mono text-plaque text-violet-ink">
        the hero&apos;s six stars: points only, no edges — the joined sky belongs to the
        constellation. star-white at rest, per the dosage law.
      </p>
      <div className="mx-auto mt-6 max-w-lg">
        {/* Static composition reference: the SVG at rest (server frame). */}
        <svg viewBox="0 0 400 200" aria-hidden="true" className="w-full">
          {[
            { x: 60, y: 66, r: 4 },
            { x: 152, y: 26, r: 3 },
            { x: 254, y: 84, r: 5.5 },
            { x: 336, y: 38, r: 3 },
            { x: 306, y: 156, r: 4 },
            { x: 124, y: 142, r: 2.5 },
          ].map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={STAR} />
          ))}
        </svg>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "The hand-composed fragment on its own, at rest: the reduced-motion frame.",
      },
    },
  },
};
