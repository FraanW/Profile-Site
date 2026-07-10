# Website blueprint — Shama Anjum's profile site

> **Status: owner-directed (design system only).** Produced in an interactive design session
> with Farhaan on Shama's behalf, 2026-07-11. This file is the binding textual plan for how
> the site looks and behaves. Riker formalizes tokens from it; Sindri builds the Storybook
> prototype from it; Dwight audits against it.
>
> **What this file is NOT:** a truth ledger. `context/profile.md` does not exist yet — intake
> (`context/INTAKE.md`) is still blocking. Every word of content in the prototype is
> **placeholder** (mirrored from Farhaan's site structure per owner instruction: "just have
> the same, [they] will make changes to it"), with one exception: the 8 real project titles
> in `context/intake-notes.md` (owner-provided 2026-07-11, titles only, scope notes bind).
> **Nothing ships publicly before Shama's intake is complete, profile.md is locked, and
> Dwight passes it.** Shama also gets veto over the
> identity concept itself, including the reading of their name (§1).
>
> **Shama is non-binary: they/them everywhere** — every document, every commit, every word of
> site copy (owner instruction, 2026-07-11).

---

## 1. Identity concept — Flame & Stars

Their name, read literally: **Shama (شمع) is the candle, Anjum (انجم) is the stars.** Classic
ghazal imagery, the candle and the night sky. The site is a dusk-purple night with light in
it: projects are stars, attention is candlelight, and the visitor's scroll kindles the page.
No other portfolio can claim this honestly; theirs can.

**Confirmation required from Shama:** that they want their name read through its Urdu/Arabic
meaning. If they veto, the visual system (palette, type, mood) survives unchanged; only the
star/flame devices need a replacement concept.

## 2. Palette — Night sky (v2, Shama's direction, 2026-07-11)

> **Palette v1 ("Aubergine ink + candle gold") was vetoed by Shama on first sight**
> (2026-07-11, ~02:07, verbatim): "It's too purple... these are too plum purplish. I want
> primarily black with purple accents. Black, white, purple. Black being main. White text.
> Think of an actual sky. Background is dark. But the stars are white and emit purple hue
> sometimes." Their site, their palette; v1 lives in git history. Fonts, mood, devices, and
> structure were not questioned and stand.
>
> **Follow-up (02:11, reacting to a screenshot of the constellation on the plum field):**
> "make it fuulllly black. Bg black. With maybe purple gradient. Idk. I'm yapping. But point
> is primarily black." Binding part: the ground is FULLY black. Tentative part: "maybe purple
> gradient" is an unsure allowance, not a mandate — at most one whisper-subtle option Riker
> may propose for Shama's review; the default is flat black.
>
> **Taste reference (02:12):** Shama sent an image of vivid purple butterflies on a true-black
> canvas — "See how beautiful this is. This is the idea... Not the butterfly. Just the purple
> elements on a black canvas." Saved at `design/references/2026-07-11-shama-purple-on-black.png`.
> What it says about the accent: the purple is **vivid, luminous, saturated violet** — electric,
> not muted lilac — and drawn elements themselves may carry full purple on the black. Read with
> the 02:08 message, the reconciliation is: stars stay white; lines, line-work, and emission
> carry the vivid violet.

| Role | Color intent | Use |
|------|-------------|-----|
| Ground | **Fully black** ("Bg black", 02:11 follow-up). Riker rules whether that is literal `#000` or the closest craft-safe black — but it must read fully black, zero perceptible tint. | Page background everywhere. |
| Text | White ("white text" — exact warmth/off-white step is Riker's, but it must read white, not lilac, not grey) | All reading and display text. |
| Stars | White | Constellation stars, rail marks. Stars are white, full stop. |
| Accent | Purple (violet family, an accent that reads *purple*, brighter than v1's lilac inks) | **The emission color:** star glints and hue emission, hovers, active/focus, rules and line-work, the camera's strokes, the capture flash. Never a ground, never large fields. |
| ~~Statement plum fields~~ | **Retired**, dusk gradients with them. If a section needs a field, it is a near-black surface step, not a color. |
| ~~Candle gold~~ | **Retired.** Shama's palette is black, white, purple — purple takes over every "alive" duty gold had. The candle survives in the name's story (§1), not as a color. |

The governing image is Shama's: **an actual night sky. The ground is dark, the stars are
white, and they emit purple hue sometimes.** Purple is light the sky gives off, not a tint
the sky is soaked in.

### Palette v2 rules

1. **Black is main.** Purple is never a ground, never a field, never body text. Its dosage is
   what makes it an accent; if a screenshot reads "purple site" instead of "black site with
   purple light", it fails Shama's brief.
2. **Stars are white; purple is what they emit.** Glints, hue shifts, small halos on
   interaction — the emission reading of "emit purple hue sometimes."
3. **The emission ruling is Riker's:** v1's no-glow law meets Shama's "emit." Decide the
   execution (drawn rays / opacity pops vs a genuine soft halo — if a halo, it is the one
   sanctioned glow and it is tokenized), and rule whether "sometimes" earns a subtle idle
   star shimmer as the one exception to the nothing-loops law, or stays interaction/scroll
   triggered only. Record the ruling and its reasoning in tokens.md.
4. White-on-black contrast is trivially safe; the audit's binding checks move to the purple
   accent (non-text 3:1 on night for line-work and marks, AA where it ever carries text).
5. Dwight audits purple dosage per section against rule 1 before anything ships.

## 3. Typography — the art book stack

| Register | Face | Duty |
|----------|------|------|
| Display | **Fraunces** (Google Fonts) | Name, headlines, section heads, oversized folio moments. Display sizes only; its character is the drama. |
| Body | **Sentient** (Indian Type Foundry, Fontshare) | All reading text. Gentle text serif, book-like on dark. |
| Technical | **IBM Plex Mono** (Google Fonts) | Plaque captions, figures, stack rows, nav links, star labels. `fig. 01` energy — captions in an art book. |
| Quote | **Playfair Display** (Google Fonts) | Pull-quotes ONLY (§6.3). Owner decision 2026-07-11, chosen knowingly over Fraunces italic: this face is shared with Farhaan's display register. It may never appear as a headline, body text, caption, or anywhere outside a pull-quote. |

Serif at every reading size; mono only whispers in captions. One face is now shared with
Farhaan's site: Playfair Display (his display register, this site's quote register — owner
decision 2026-07-11). The not-a-template separation therefore leans on the palettes, devices,
and motion character (§8), on register-locking Playfair to quotes here, and on the display
faces' opposite temperaments: Playfair sharp and formal, Fraunces soft and characterful.
Riker owns the quote register's exact sizes/weights/tracking and the added font loading at the
token revision; the hairline-serif-on-dark contrast check applies.

## 4. Mood — luxe gallery

Big dramatic type, full-bleed statement moments, art-book pacing. Generous blackspace, thin
lilac rules, plum fields as the rich moments. Slower and heavier than Farhaan's site in every
motion and spacing decision: this site walks through an exhibition, his flies through a build.

## 5. Page map — mirrored skeleton, their devices

Same skeleton as Farhaan's site per owner instruction; every content slot is placeholder until
intake.

```
/                         (landing)
├── thin top bar          shama (mono) ..... projects · contact
├── 1. hero               night ground, name huge in Fraunces, white on black
├── 2. about              photo slot + 60-90 words, Sentient (placeholder)
├── 3. case tiles         2×2 minimal grid (placeholder projects)
├── 4. constellation      the signature section ──▶ /projects
├── 5. signals            pedigree block (placeholder)
├── 6. contact            CTA; the camera lands here, capture flash in purple
└── footer                stack line, email, GitHub, LinkedIn, location (placeholder)

/projects                 (browse page)
├── same top bar (+ "◂ back" affordance)
├── intro line (placeholder until Lefler)
└── star-card grid        every project as a plaque card, 2-up desktop, 1-up mobile
```

The camera assembles along the right edge across the whole landing scroll (§6.2).

## 6. Signature devices

### 6.1 The constellation (their radial graph equivalent)

- Projects rendered as **white stars on the night ground**: a hand-composed constellation,
  not a network diagram — points of white light joined by thin purple-accent lines,
  asymmetric, sky-like. Star interactions emit purple (§2 v2).
- Each star carries a **plaque** beneath or beside it: `fig. 03 · project name` in Plex Mono,
  one Sentient line under it (desktop hover / mobile tap, or static where space allows).
  (Separator ruled `·` on 2026-07-11: the em dash this file originally specified collides with
  the repo-wide em dash ban on visitor-facing copy; the writing law wins.)
- Stars are real links into `/projects` cards.
- Section entry: edges draw in and stars kindle on scroll-into-view (anime.js).
- Mobile: the constellation re-composes vertically (sky column), never a crushed scale-down.
- Distinct from Farhaan's radial graph by construction: no center node, no hub-and-spoke, no
  React Flow; this is a composed SVG sky.

### 6.2 The camera (rail device — owner decision 2026-07-11, replaces the kindling)

> Owner direction: the DSLR camera rail device from Farhaan's site runs here too, "same way
> it is on Farhaan's." The kindling margin stars are retired; the constellation (§6.1) keeps
> the star identity. The previous kindling spec lives in git history as the fallback if Shama
> vetoes the shared device at review.

- **Same behavior as Farhaan's blueprint §8 (as revised 2026-07-11):** exploded engineering
  drawing of a DSLR, no part labels, parts fade into existence and drift together under
  bidirectional smoothed scroll scrub along the right rail, complete silhouette by signals,
  strict single-camera hand-off (two cameras never render at once), finale glide to the CTA
  with an aperture blink and a capture flash-sparkle.
- **Drawn in THIS site's system (palette v2):** thin purple-accent strokes on the night
  ground (exact stroke color and weights are Riker's; must pass the non-text 3:1 check on
  the ground). No fills, no gradients. It must read as this site's instrument, not a
  re-tinted copy of the emerald drawing.
- **The capture flash-sparkle is the purple emission moment** — white core glint, purple
  sparkle rays and a quick pop, fired once, `kindle` ease: the site's one finale-scale
  emission (was candle gold in v1; gold retired by Shama's palette, 2026-07-11). Reduced
  motion: parked camera by the CTA, no rail, no flash.
- Mobile: slim right edge, never overlapping text, degrade to finale-only where separation
  cannot be guaranteed.
- **Template-risk flag (for Dwight and Shama's review):** a shared rail device is the single
  biggest same-template risk between the two sites. Binding mitigations: purple line-work on
  black vs emerald on bone, white-and-purple capture flash vs leaf-green, velvet/trace/kindle
  tempo vs buttery, and the constellation stays unique to this site.

### 6.3 The pull-quotes (owner addition, 2026-07-11)

- **What:** short pull-quotes in Playfair Display — the art-book device: a line of borrowed-
  looking editorial gravity between sections. One in the hero, and one under each major
  section where it earns its place ("wherever applicable" is the owner's phrasing; if a
  section's quote feels forced, it goes — Dwight prunes ruthlessly, because a quote under
  every section is also a classic slop pattern if the lines are hollow).
- **Content:** each line speaks to Shama's prowess in building business prototypes from
  scratch to scale — the zero-to-one-to-N persona claim. These are positioning statements in
  the site's own voice, NOT attributed testimonials: no invented attribution, ever (truth
  rule). Lefler writes the shipped lines after intake; the prototype carries clearly marked
  TODO(Lefler) placeholders, plain declarative, no em dashes, no exclamation marks.
- **Type:** Playfair Display, quote register only (§3). White-family ink on the night ground
  (palette v2); exact size/weight/tracking are Riker's, with the hairline-contrast-on-dark
  check.
- **Motion:** each quote **fades into existence** on scroll-into-view — opacity only, velvet
  ease, once, then still. No sliding, no letter-by-letter reveals, no loops.

## 7. Motion system — anime.js, luxe tempo

anime.js is the site's only animation engine (same mandate as Farhaan's site: if it moves,
anime.js moves it — no Framer Motion, no CSS keyframes, no one-off transitions).

The vocabulary is their own:

- **Tempo: slow, heavy, sparse.** Longer durations, weightier easings, fewer moves than
  Farhaan's buttery system. An exhibition, not a demo reel.
- Section entries: rise-and-fade in ink on aubergine; plum fields breathe in via opacity;
  rules and constellation lines draw in lilac.
- **Scroll reveals animate once.** Nothing loops, nothing floats idle. Hover is the only
  repeatable motion.
- Gold appears only on interaction and at the finale (§6.2), always as a discrete glint,
  never a pulse.
- 2 or 3 named eases max, defined at token phase, shared site-wide.
- Reduced motion: every animated element has a final-frame static; scopes gated behind
  `prefers-reduced-motion`.
- Performance guardrails: transform/opacity/SVG-draw only, lazy-mount below-fold animation,
  no scroll-jacking, Lighthouse stays green or Darryl bounces it.

## 8. Not-a-template proof (vs Farhaan's site)

The repo rule: the two sites must not look like the same template.

| Axis | Farhaan | Shama |
|------|---------|-------|
| Ground | Bone white, light site | Aubergine dark, night site |
| Statement | Deep emerald, flat fields | Deep plum, dusk-fade fields |
| Live accent | Bright leaf green | Candle gold, tiny doses |
| Display face | Playfair Display (sharp, formal serif) | Fraunces (soft, characterful serif) |
| Body face | Erode (sharp serif) | Sentient (gentle serif) |
| Mono | Spline Sans Mono | IBM Plex Mono |
| Signature section | Radial project graph (hub-and-spoke) | Composed constellation (open sky) |
| Rail device | DSLR camera, emerald line-work, leaf-green burst | DSLR camera, lilac line-work, candle-gold capture flash (shared device — owner decision 2026-07-11; mitigations in §6.2) |
| Motion character | Buttery, quick, precise | Slow, heavy, luxe |
| Metaphor source | His flagship work (the graph) | Their name (flame and stars) |
| Playfair Display | Display register (headlines, name) | Quote register only (pull-quotes, §6.3 — the one shared face, register-locked) |

## 9. Rules that bind

1. **Truth ledger pending.** All prototype content is placeholder and marked as such. No
   public deploy, no real claims, until intake → `context/profile.md` → Shama's approval.
2. **Writing law:** `shared/writing-style.md` governs every visitor-facing word once Lefler
   writes real copy. No em dashes in site copy.
3. **Accessibility:** constellation and camera are decorative-plus; all content they carry
   also exists as text/links. Keyboard and screen-reader paths never depend on hover, motion,
   or the sky. Contrast AA minimum on every pairing.
4. **Gradient rules (§2) and gold rules (§2, §7) are hard constraints**, not suggestions.
5. **Dwight gates before ship**, as three hostile readers, against this blueprint plus the
   (future) truth ledger.

## 10. Follow-ups (in order)

1. **Riker:** `design/tokens.md` + Tailwind v4 `@theme` block from §2–§4 (exact values,
   computed contrast checks, gradient recipe token, easing vocabulary).
2. **Sindri:** scaffold `Profile Site - Shama/site` (Next.js 16 + Tailwind v4 + Storybook,
   mirroring Farhaan's site tooling); build the component library and pages on placeholder
   content; constellation and camera devices per §6.
3. **Intake:** Shama (or Farhaan on their behalf, confirmed by them) completes
   `context/INTAKE.md` → Mimir + Lefler draft `context/profile.md` → Shama locks it.
4. **Shama's review:** identity concept (name reading, §1), palette, type, and the prototype;
   they edit freely — it's their site.
5. **Mimir → Lefler:** real content map, then real words, after the ledger locks.
6. **Dwight:** full audit. **Darryl:** ship.
