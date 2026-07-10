import type { Meta, StoryObj } from "@storybook/nextjs-vite";

/**
 * Four faces, four registers, strict separation (tokens.md §2). Serif at
 * every reading size. Sample lines are PLACEHOLDER copy, pending intake;
 * project names shown are real titles (intake-notes.md).
 */
const meta = {
  title: "Foundation/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Fraunces (display serif, variable: wght + auto opsz, 560/600 only), Sentient (body serif, the default voice), IBM Plex Mono (technical, lowercase), Playfair Display 500 italic (pull-quotes ONLY — the one face shared with Farhaan's site, register-locked; his roman, this site's italic, zero shared font files). Sentient loads from Fontshare's CDN at prototype phase; self-hosting is a production TODO.",
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
        <p className="font-mono text-plaque text-violet-ink">
          display · fraunces 560/600, opsz auto · google fonts
        </p>
        <p className="mt-2 font-display text-display text-star">Shama Anjum</p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          body · sentient 400/500 · fontshare (itf)
        </p>
        <p className="mt-2 max-w-prose text-body text-moon">
          The reading voice. A gentle text serif from an Indian foundry, set 18px over 1.75:
          a shade more generous than a light-ground site would take, because air is the
          luxury. Below 16px the system switches to mono, never to a smaller serif.
        </p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          technical · ibm plex mono 400/500 · google fonts · lowercase
        </p>
        <p className="mt-2 font-mono text-mono text-moon">
          fig. 02 · medibase · stack row · pending · intake
        </p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          quote · playfair display 500 italic ONLY · google fonts · pull-quotes, nothing else
        </p>
        <p className="mt-2 font-quote text-quote max-w-narrow italic text-dim">
          Every business begins as a prototype someone refused to abandon.
        </p>
      </div>
    </div>
  ),
};

const SCALE: Array<{
  step: string;
  cls: string;
  face: "display" | "serif" | "mono" | "quote";
  note: string;
  sample: string;
}> = [
  { step: "folio", cls: "text-folio", face: "display", note: "52→120px · fraunces 560", sample: "Shama Anjum" },
  { step: "display", cls: "text-display", face: "display", note: "32→52px · fraunces 560", sample: "The constellation" },
  { step: "title", cls: "text-title", face: "display", note: "32px fixed · fraunces 600", sample: "Medibase" },
  { step: "quote", cls: "text-quote", face: "quote", note: "24→30px · playfair 500 italic · dim ink", sample: "Scale is a prototype that kept its promises." },
  { step: "lede", cls: "text-lede", face: "serif", note: "20→23px · sentient 400", sample: "Placeholder claim: their work, under ten words." },
  { step: "body", cls: "text-body", face: "serif", note: "18px/1.75 · sentient 400", sample: "Placeholder body line: the reading voice on the night ground." },
  { step: "body-sm", cls: "text-body-sm", face: "serif", note: "16px/1.65 · sentient 400", sample: "Dense serif moments: plaque support lines, tile one-liners." },
  { step: "figure", cls: "text-figure", face: "mono", note: "24px · mono 500", sample: "tbd" },
  { step: "mono", cls: "text-mono", face: "mono", note: "14px · mono 400", sample: "stack row · pending · intake" },
  { step: "plaque", cls: "text-plaque", face: "mono", note: "13px · mono 400 · the art-book caption · violet-ink", sample: "fig. 07 · blockmove" },
];

const FACE_CLS = {
  display: "font-display text-star",
  serif: "text-moon",
  mono: "font-mono text-moon",
  quote: "font-quote italic text-dim",
} as const;

export const Scale: Story = {
  name: "Type scale",
  render: () => (
    <div className="space-y-6">
      {SCALE.map((s) => (
        <div
          key={s.step}
          className="grid items-baseline gap-2 border-t border-rule pt-4 md:grid-cols-[10rem_minmax(0,1fr)]"
        >
          <p className="font-mono text-plaque text-violet-ink">
            {s.step}
            <br />
            {s.note}
          </p>
          <p className={`${FACE_CLS[s.face]} ${s.cls} ${s.step === "plaque" ? "text-violet-ink" : ""}`}>
            {s.sample}
          </p>
        </div>
      ))}
    </div>
  ),
};

export const FrauncesFloor: Story = {
  name: "The 32px Fraunces floor",
  parameters: {
    docs: {
      description: {
        story:
          "Fraunces exists only at folio/display/title; none renders below 32px at any viewport, and there is NO eyebrow/caps branch — lowercase Plex Mono is the caption voice. If a design needs Fraunces smaller, the answer is a mono plaque or a different layout, never a smaller Fraunces.",
      },
    },
  },
  render: () => (
    <div className="max-w-prose space-y-6">
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">sanctioned: display sizes, 32px and up</p>
        <p className="mt-2 font-display text-title text-star">MEDULLA AI</p>
        <p className="mt-4 font-mono text-plaque text-violet-ink">
          sanctioned: the caption voice is mono, lowercase
        </p>
        <p className="mt-2 font-mono text-plaque text-violet-ink">fig. 06 · medulla ai</p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          banned: fraunces below the floor. Its hairline contrast shatters on ClearType at
          small sizes; the fix for sparkle is always size, never weight.
        </p>
        <p className="mt-2 font-display text-body-sm text-moon line-through">
          Fraunces pretending to be a caption at 16 pixels.
        </p>
      </div>
    </div>
  ),
};

export const PlayfairLock: Story = {
  name: "The Playfair register lock",
  parameters: {
    docs: {
      description: {
        story:
          "Playfair is a pull-quote or it is nothing (tokens.md §2.3): only the quote step carries font-quote, the 24px clamp floor is the Playfair floor, and only the 500 italic slice is loaded. The lock is structural: the roman does not exist in the bundle, so a stray font-quote heading renders in the Georgia fallback and fails review on sight instead of passing as a plausible headline.",
      },
    },
  },
  render: () => (
    <div className="max-w-prose space-y-6">
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          sanctioned: the quote register, italic, dim, 24-30px, 40ch
        </p>
        <p className="mt-2 font-quote text-quote max-w-narrow italic text-dim">
          From scratch is not a constraint. It is the advantage.
        </p>
      </div>
      <div className="border border-rule-faint bg-card p-6">
        <p className="font-mono text-plaque text-violet-ink">
          banned: playfair as a headline. The non-italic render below falls to the Georgia
          fallback because the roman is never loaded — the lock enforcing itself.
        </p>
        <p className="mt-2 font-quote text-title text-moon line-through">
          Playfair pretending to be a headline.
        </p>
      </div>
    </div>
  ),
};
