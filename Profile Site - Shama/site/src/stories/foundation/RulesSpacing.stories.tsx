import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatementRule } from "@/components/Section";
import { StarMark } from "@/components/Star";

/**
 * Rules, radii, measures, and the rail margin (tokens.md §3). Thin violet
 * line-work on black is the mood — the taste reference is literally purple
 * drawing on a black canvas; everything is hairline; every rectangle is
 * square.
 */
const meta = {
  title: "Foundation/Rules and spacing",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rules: Story = {
  name: "The three rules",
  render: () => (
    <div className="max-w-prose space-y-8">
      <div>
        <p className="font-mono text-plaque text-violet-ink">
          statement rule · 1px violet-ink · one per section, draws in with trace — the one
          structural line that carries the working violet; where Farhaan&apos;s site asserts
          with 2px, this site traces
        </p>
        <div className="mt-2">
          <StatementRule mode="mount" />
        </div>
      </div>
      <div>
        <p className="font-mono text-plaque text-violet-ink">
          hairline rule · 1px --color-rule · quiet structure: signals rows, dividers. never
          the vivid steps — a vivid border on every card is how a black site turns purple
        </p>
        <hr className="mt-2 border-0 border-t border-rule" />
      </div>
      <div>
        <p className="font-mono text-plaque text-violet-ink">
          faint rule · 1px --color-rule-faint · card borders, photo border
        </p>
        <hr className="mt-2 border-0 border-t border-rule-faint" />
      </div>
      <p className="font-mono text-plaque text-violet-ink">
        no shadows, no blurs: on the night ground, elevation is a surface half-step plus a
        hairline, and light is color — the one glow is the emission halo, a gradient.
      </p>
    </div>
  ),
};

export const Radii: Story = {
  name: "Squared, one exception",
  parameters: {
    docs: {
      description: {
        story:
          "Every rectangle on the site is square: plaques, tiles, buttons, the photo. The single exception is --radius-star, for star points and the capture flash's sparkle marks. The only circles on this site are points of light.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-prose flex-wrap items-end gap-8">
      <div>
        <div className="flex h-24 w-24 items-center justify-center border border-rule-faint bg-card">
          <span className="font-mono text-plaque text-violet-ink">square</span>
        </div>
        <p className="mt-2 font-mono text-plaque text-violet-ink">everything</p>
      </div>
      <div>
        <div className="flex h-24 w-24 items-center justify-center">
          <StarMark size={10} />
        </div>
        <p className="mt-2 font-mono text-plaque text-violet-ink">--radius-star: the one circle</p>
      </div>
    </div>
  ),
};

export const Measures: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-plaque text-violet-ink">
          --container-prose · 58ch · two channels narrower than a light-ground site: long
          light-on-dark lines fatigue
        </p>
        <p className="mt-2 max-w-prose border-l border-rule pl-4 text-body text-moon">
          Placeholder reading paragraph at the prose measure. This line exists to show where
          the measure wraps on the night ground, nothing more; the real words arrive after
          intake, from Lefler, and never from anyone else.
        </p>
      </div>
      <div>
        <p className="font-mono text-plaque text-violet-ink">--container-narrow · 40ch · ledes, one-liners, and the quote measure</p>
        <p className="mt-2 max-w-narrow border-l border-rule pl-4 text-lede text-moon">
          Placeholder lede at the narrow measure, wrapping where it should.
        </p>
      </div>
      <div>
        <p className="font-mono text-plaque text-violet-ink">--container-site · 72rem · the page shell</p>
      </div>
    </div>
  ),
};

export const RailMargin: Story = {
  name: "The camera rail margin",
  parameters: {
    docs: {
      description: {
        story:
          "The camera owns the right edge: 48px below md, 80px at md and up (tokens.md §3.1) — deliberately slimmer than Farhaan's 96px rail; a shared device must not share proportions. Landing sections keep clear through the Section shell; line-work never collides with text. Section rhythm is --spacing-section, 96 to 160px: the visitor walks, not scrolls.",
      },
    },
  },
  render: () => (
    <div className="relative max-w-2xl border border-rule-faint">
      <div className="absolute bottom-0 right-0 top-0 flex w-sky-sm flex-col items-center justify-around border-l border-rule-faint md:w-sky">
        <StarMark size={5} />
        <span className="font-mono text-plaque rotate-90 text-violet-ink">rail</span>
        <StarMark size={5} />
      </div>
      <div className="pl-6 pr-sky-sm md:pr-sky">
        <div className="py-10">
          <p className="font-mono text-plaque text-violet-ink">
            w-sky-sm (48px) below md · w-sky (80px) at md+ · right edge
          </p>
          <p className="mt-3 max-w-narrow text-body-sm text-moon">
            Content ends here, clear of the rail. If real copy could not keep clear of 48px
            at some breakpoint, that breakpoint would degrade to finale-only — the rail
            never shrinks below the slim margin.
          </p>
        </div>
      </div>
    </div>
  ),
};
