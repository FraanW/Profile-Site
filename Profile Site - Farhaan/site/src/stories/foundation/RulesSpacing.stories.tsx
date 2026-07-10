import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatementRule } from "@/components/Section";

/**
 * Rules, strokes, radii, measures (tokens.md §3). Elevation is rule +
 * surface, never lift: no shadows exist in the system.
 */
const meta = {
  title: "Foundation/Rules & Spacing",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rules: Story = {
  name: "Ruling weights",
  render: () => (
    <div className="max-w-prose space-y-8">
      <div>
        <p className="font-mono text-label text-steel">
          statement rule · 2px emerald · one per section, draws in on scroll
        </p>
        <div className="mt-2">
          <StatementRule mode="mount" />
        </div>
      </div>
      <div>
        <p className="font-mono text-label text-steel">hairline rule · 1px rule · quiet structure</p>
        <hr className="mt-2 border-0 border-t border-rule" />
      </div>
      <div>
        <p className="font-mono text-label text-steel">faint rule · 1px rule-faint · card borders</p>
        <hr className="mt-2 border-0 border-t border-rule-faint" />
      </div>
      <div>
        <p className="font-mono text-label text-steel">
          svg strokes · draw 1.5 / hair 1 · non-scaling, the drawing voice
        </p>
        <svg className="mt-2 h-10 w-full" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="12" x2="400" y2="12" stroke="#065F46" strokeWidth="1.5" style={{ vectorEffect: "non-scaling-stroke" }} />
          <line x1="0" y1="30" x2="400" y2="30" stroke="#065F46" strokeWidth="1" style={{ vectorEffect: "non-scaling-stroke" }} />
        </svg>
      </div>
    </div>
  ),
};

export const Measures: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-label text-steel">--container-narrow · 42ch · hero support, intros</p>
        <p className="mt-2 max-w-narrow border-l-2 border-emerald bg-card py-1 pl-4 text-body text-ink">
          I drove the research and MVP behind Adloom.ai&apos;s seed raise. I build the open-source
          Unified Product Graph standard.
        </p>
      </div>
      <div>
        <p className="font-mono text-label text-steel">--container-prose · 60ch · the reading measure</p>
        <p className="mt-2 max-w-prose border-l-2 border-emerald bg-card py-1 pl-4 text-body text-ink">
          My title at Venture Cube said intern. The scope said otherwise: I ran research and MVP
          builds for Adloom.ai and Sanady.ai, and built Deals24.ai&apos;s investor, seller and admin
          dashboards end to end.
        </p>
      </div>
      <div>
        <p className="font-mono text-label text-steel">--container-site · 70rem · the page shell</p>
        <div className="mt-2 h-8 max-w-site border border-rule bg-card" />
      </div>
      <div>
        <p className="font-mono text-label text-steel">
          rails · 96px at md+ / 44px below · the camera&apos;s reserved edge
        </p>
        <div className="mt-2 flex gap-4">
          <div className="h-24 w-rail border border-rule bg-card text-center font-mono text-label text-steel">rail</div>
          <div className="h-24 w-rail-sm border border-rule bg-card text-center font-mono text-label text-steel">sm</div>
        </div>
      </div>
    </div>
  ),
};

export const RadiiLaw: Story = {
  name: "Radii: squared, one exception",
  parameters: {
    docs: {
      description: {
        story:
          "Every rectangle is square: cards, tiles, buttons, the photo. The single exception is --radius-node. The only circles on this site are the graph's nodes; that is what makes them the signature.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-label text-steel">card · squared</p>
      </div>
      <button
        type="button"
        className="bg-emerald px-6 py-3 font-mono text-mono font-medium text-bone"
      >
        button · squared
      </button>
      <span className="flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="5.5" fill="none" stroke="#065F46" strokeWidth="1.5" />
        </svg>
        <span className="font-mono text-label text-steel">--radius-node · the one circle</span>
      </span>
    </div>
  ),
};

export const CardGrid: Story = {
  name: "Card grid rhythm",
  render: () => (
    <div className="grid max-w-site grid-cols-1 gap-8 md:grid-cols-2">
      {["surface + faint border", "no shadows anywhere", "1px emerald internal rule", "4px base spacing scale"].map(
        (t) => (
          <div key={t} className="border border-rule-faint bg-card p-7">
            <p className="font-mono text-mono text-ink">{t}</p>
            <hr className="mt-4 border-0 border-t border-emerald" />
            <p className="mt-4 text-body-sm text-steel">
              Elevation expressed by rule and surface, never by material lift.
            </p>
          </div>
        )
      )}
    </div>
  ),
};
