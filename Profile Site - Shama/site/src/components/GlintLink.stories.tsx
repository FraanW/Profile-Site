import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GlintLink } from "./GlintLink";

/**
 * The one link recipe (tokens.md §1.3 rules 4-5). Violet-ink and underlined
 * on night and card — the only grounds the site has. Hover: loud violet +
 * an underline-offset shift, kindle ease at glint duration — the only way
 * loud violet enters by pointer. Pressed shares the hover violet; the
 * offset returning is the pressed signal. Focus: the double ring.
 */
const meta = {
  title: "Components/GlintLink",
  component: GlintLink,
  parameters: {
    layout: "padded",
  },
  args: { href: "#", children: "a placeholder link" },
} satisfies Meta<typeof GlintLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnNight: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 bg-night p-8">
      <p className="font-mono text-plaque text-violet-ink">
        night ground · violet-ink at rest · hover to see it catch
      </p>
      <GlintLink href="#" className="font-mono text-mono">
        a mono link at rest
      </GlintLink>
      <p className="text-body text-moon">
        Links also live inline in reading text, like{" "}
        <GlintLink href="#">this placeholder</GlintLink>, underlined always: color is never
        the only affordance.
      </p>
    </div>
  ),
};

export const OnCard: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4 border border-rule-faint bg-card p-8">
      <p className="font-mono text-plaque text-violet-ink">
        card surface · same recipe · violet-ink holds 5.09:1 here (binding check 2)
      </p>
      <GlintLink href="#" className="font-mono text-mono">
        link pending
      </GlintLink>
      <GlintLink href="#" className="font-mono text-plaque">
        a plaque-size link
      </GlintLink>
    </div>
  ),
};

export const TwoChannels: Story = {
  name: "Second channel rule",
  parameters: {
    docs: {
      description: {
        story:
          "No state is hue-only (tokens.md §1.3 rule 3). The hover glint pairs loud violet with an underline-offset shift; press keeps the violet and returns the offset; focus pairs violet with ring geometry. Every violet state survives every CVD type.",
      },
    },
  },
  render: () => (
    <div className="max-w-prose space-y-3 bg-night p-8">
      <p className="font-mono text-plaque text-violet-ink">rest → hover → press → focus</p>
      <div className="flex flex-wrap items-baseline gap-8 font-mono text-mono">
        <span className="text-violet-ink underline decoration-violet-deep underline-offset-4">
          rest
        </span>
        <span className="text-violet underline underline-offset-[7px]">hover (shifted)</span>
        <span className="text-violet underline underline-offset-4">press (offset returns)</span>
        <span className="text-violet-ink underline decoration-violet-deep underline-offset-4 [box-shadow:0_0_0_2px_var(--color-night),0_0_0_4px_var(--color-violet)]">
          focus ring
        </span>
      </div>
      <p className="font-mono text-plaque text-violet-ink">
        the middle two are static renders of the animated states, for inspection
      </p>
    </div>
  ),
};
