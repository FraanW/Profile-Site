import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Three faces, three registers, strict separation (tokens.md §2).
 * Sample lines are draft copy, pending Lefler.
 */
const meta = {
  title: "Foundation/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Josefin Sans (display, 600 only), Erode (body serif, the default voice), Spline Sans Mono (technical). No neutral grotesk anywhere. Erode loads from Fontshare's CDN at prototype phase; self-hosting is a production TODO.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Faces: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-label text-steel">display · josefin sans 600 · google fonts</p>
        <p className="mt-2 font-display text-display text-ink">Muhammad Farhaan</p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-label text-steel">body · erode 400/500 · fontshare (itf)</p>
        <p className="mt-2 max-w-prose text-body text-ink">
          The reading voice. A sharp editorial serif from an Indian foundry, set 18px over 1.7.
          Below 16px the system switches to mono, never to a smaller serif.
        </p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-label text-steel">technical · spline sans mono 400/500 · google fonts</p>
        <p className="mt-2 font-mono text-mono text-ink">
          java 21 · spring boot 3.4 · postgres rls · no orm
        </p>
      </div>
    </div>
  ),
};

const SCALE: Array<{
  step: string;
  cls: string;
  face: "display" | "serif" | "mono";
  note: string;
  sample: string;
}> = [
  { step: "hero", cls: "text-hero", face: "display", note: "46→96px · josefin 600", sample: "Muhammad Farhaan" },
  { step: "display", cls: "text-display", face: "display", note: "28→42px · josefin 600", sample: "The evidence" },
  { step: "title", cls: "text-title", face: "display", note: "28px fixed · josefin 600", sample: "LedgerLine" },
  { step: "eyebrow", cls: "text-eyebrow uppercase", face: "display", note: "13px caps 0.14em · the only small josefin", sample: "the caps branch" },
  { step: "lede", cls: "text-lede", face: "serif", note: "19→22px · erode 400", sample: "Full-stack AI engineering with product judgment." },
  { step: "body", cls: "text-body", face: "serif", note: "18px/1.7 · erode 400", sample: "My title at Venture Cube said intern. The scope said otherwise." },
  { step: "body-sm", cls: "text-body-sm", face: "serif", note: "16px/1.6 · erode 400", sample: "Dense serif moments: tile one-liners if space demands." },
  { step: "stat", cls: "text-stat", face: "mono", note: "22px · mono 500", sample: "94.3%" },
  { step: "mono", cls: "text-mono", face: "mono", note: "14px · mono 400", sample: "typescript · node · mcp · npm" },
  { step: "label", cls: "text-label", face: "mono", note: "12px · mono 400", sample: "muhammad farhaan · chennai · 2026" },
];

const FACE_CLS = { display: "font-display", serif: "", mono: "font-mono" } as const;

export const Scale: Story = {
  name: "Type scale",
  render: () => (
    <div className="space-y-6">
      {SCALE.map((s) => (
        <div key={s.step} className="grid items-baseline gap-2 border-t border-rule pt-4 md:grid-cols-[9rem_minmax(0,1fr)]">
          <p className="font-mono text-label text-steel">
            {s.step}
            <br />
            {s.note}
          </p>
          <p className={`${FACE_CLS[s.face]} ${s.cls} text-ink`}>{s.sample}</p>
        </div>
      ))}
    </div>
  ),
};

export const JosefinLaw: Story = {
  name: "Josefin's law",
  parameters: {
    docs: {
      description: {
        story:
          "Josefin exists only at hero/display/title (28px floor) and as eyebrow caps. The scale makes violation structurally impossible: no other step carries the display face.",
      },
    },
  },
  render: () => (
    <div className="max-w-prose space-y-6">
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-label text-steel">sanctioned: display sizes, 28px and up</p>
        <p className="mt-2 font-display text-title text-ink">Unified Product Graph</p>
        <p className="mt-4 font-mono text-label text-steel">sanctioned: the letterspaced caps branch</p>
        <p className="mt-2 font-display text-eyebrow uppercase text-steel">open source · npm</p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-label text-steel">
          banned: josefin as body text. Its low x-height gives out below the floor; the answer is
          eyebrow caps or a different face, never a smaller Josefin.
        </p>
        <p className="mt-2 font-display text-body-sm text-steel line-through">
          Josefin Sans pretending to be a reading face at 16 pixels.
        </p>
      </div>
    </div>
  ),
};
