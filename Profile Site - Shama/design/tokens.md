# Design tokens — Shama's profile site

> **Status: binding.** Written by Riker, 2026-07-11, implementing `design/blueprint.md` §2
> (palette + gradient rules), §3 (typography), §4 (mood), §7 (motion) exactly. Where the
> blueprint gave approximate values, the exact values here supersede them; every deviation is
> flagged inline with its reason. The Tailwind v4 `@theme` block in §5 is the contract: Sindri
> pastes it verbatim into the app's token stylesheet. The prose in §1–§4 explains it and adds
> the rules a stylesheet can't express. All contrast figures below were computed (WCAG 2.x
> relative luminance), not estimated.
>
> Content caveat inherited from the blueprint: everything built on these tokens is prototype
> until Shama's intake completes and they lock `context/profile.md`. Tokens bind; copy doesn't
> exist yet.
>
> **Revised 2026-07-11 (same day)** after three owner decisions amended the blueprint: the
> Playfair Display quote register (blueprint §3, §6.3 — new §2.3 here), the camera rail device
> replacing the kindling (blueprint §6.2 — §3.1, §3.2, §4.2, §4.3 here), the finale-ease ruling
> (§4.1, note resolved), and the plaque separator `·` (writing-law ruling, blueprint §6.1).
> Every change is flagged inline with `[rev 2026-07-11]`; untouched sections stand exactly as
> written this morning.
>
> **PALETTE v2, 2026-07-11 (02:07–02:12): Shama vetoed the aubergine-and-gold system on first
> sight.** Blueprint §2 is rewritten ("Night sky, v2") and §1 here is re-cut against it plus
> the taste reference (`design/references/2026-07-11-shama-purple-on-black.png`): **fully
> black ground, white text and stars, one vivid violet family for everything alive or drawn.**
> Plum statement fields, the dusk gradient, `bg-dusk`, and candle gold are retired entirely;
> the v1 color layer lives in git history. Everything structural from the morning revision
> survives — Playfair 500-italic-only, the quote clamp, camera stroke weights 1.25/1, the
> no-spring ruling, the `·` separator, all durations — but **every ink was re-judged and every
> ratio recomputed against black.** v2 changes are flagged `[palette v2]`; surviving
> `[rev 2026-07-11]` flags mean the morning ruling stands. Current law is the unstruck text;
> history is the flags plus git.

---

## 1. Color — Black canvas, white stars, violet light `[palette v2]`

> Shama, 2026-07-11 02:07, verbatim: **"It's too purple... these are too plum purplish. I
> want primarily black with purple accents. Black, white, purple. Black being main. White
> text. Think of an actual sky. Background is dark. But the stars are white and emit purple
> hue sometimes."** And at 02:11: **"make it fuulllly black. Bg black. With maybe purple
> gradient. Idk. I'm yapping. But point is primarily black."** The 02:12 taste reference
> (`design/references/2026-07-11-shama-purple-on-black.png`): vivid violet butterflies on a
> true-black canvas — saturated purple drawing, absolute black ground, nothing else.

The v2 system in one sentence: **a black canvas, white text and stars, and one violet family
for everything alive or drawn.** The aubergine ground, plum fields, dusk gradient, warm wax,
lilac, heather, and candle gold are all retired (v1 lives in git history). No shadows, no
blurs, no glows — with exactly one sanctioned exception, the emission halo (§1.4). Elevation
is still a surface half-step plus a hairline. If a color is not in this table it does not
exist on the site (the `@theme` block wipes Tailwind's default palette).

### 1.1 Tokens

| Token | Value | Role |
|-------|-------|------|
| `--color-night` | `#000000` | Ground. Literal black — the ruling is recorded below. Page background everywhere; there are no colored fields left to interrupt it. |
| `--color-card` | `#0D0D10` | Plaque/card surface, and the only "field" the site has: a near-black step with a whisper-cool cast. Always paired with a `rule-faint` hairline border; the surface step alone (1.08:1) is deliberately subliminal. |
| `--color-star` | `#F7F5FA` | Stars and display text. White with a whisper-cool cast — starlight, not paper. The brightest thing on the site. |
| `--color-moon` | `#E9E6F0` | All reading text. Still reads white on black (17.04:1); sits a half-step under star deliberately, to damp halation over long paragraphs on a true-black ground. |
| `--color-dim` | `#C8C1DC` | The far star: white dimmed by distance, faint violet whisper. **Quote register ink only** (§2.3). Not a body text color, not an accent. |
| `--color-violet` | `#A886FF` | **The loud violet: alive only.** Hover glints, active states, focus, star emission, the capture flash's sparkle rays. The reference's brightest wing edges. Never at rest, never a surface, never body text. |
| `--color-violet-ink` | `#9165FF` | **The working violet: drawn or labeled, at rest.** Constellation edges, camera strokes, statement rules, plaque labels, nav links at rest. Fully saturated (B=255) and luminous enough to carry 13px text on both grounds — see the binding check below. |
| `--color-violet-deep` | `#7C3AED` | **The deep end: receded line-work, non-text only.** Secondary constellation edges, receded marks. Passes 3:1 non-text on both grounds (3.69 / 3.41) and nothing more — it never carries text. |
| `--color-rule` | `#2B2340` | Quiet ruling: signals rows, structural hairlines. The deep end at decorative-dark weight; carries no meaning. |
| `--color-rule-faint` | `#1B1626` | Faintest ruling: card borders, photo border. |
| `--color-selection` | `#2E2452` | Text selection surface only: the deep end at surface weight, transient and user-cast. The one violet-tinted surface in the system (rule 6 carves why it is legal). |

Value decisions, with reasons `[palette v2]`:

- **The ground is literal `#000000`, and the v1 "no pure black" law is amended, not dodged.**
  Shama said "fuulllly black" twice; the taste reference's canvas is true black; on OLED,
  `#000` is pixels-off, which is exactly what makes the reference's violet burn; and black
  maximizes contrast headroom for the saturated violet — the binding tension of this palette
  is that the deep end of the reference range fails 3:1, so every 0.005 of ground luminance
  matters. A `#050505` "craft black" would exist only to protect the old rule from
  amendment: rule-worship, deleted. The amended law is rule 2 below.
- **Two whites, split by duty.** Star (`#F7F5FA`) for stars and display; moon (`#E9E6F0`) for
  reading. Both read white (the brief), both carry a whisper-cool cast, neither is `#FFFFFF`.
  The half-step between them exists because full display-white body text halates on true
  black over paragraph lengths; moon dims the vibration without ever reading grey. Both are
  cool because the candle is retired: this light is starlight now.
- **The violet ramp is cut from the reference image.** Loud `#A886FF` matches the brightest
  wing edges. The working ink wanted to be `#8B5CF6` (the reference's core electric violet) —
  it computes **4.96:1 on black but 4.58:1 on card**: it passes AA for the 13px plaque labels
  with no real margin. `#9165FF` is the same hue at full saturation lifted half a step:
  **5.51:1 on black, 5.09:1 on card**, and it still reads emphatically purple. Deep
  `#7C3AED` is kept exactly (the reference's dark wing regions): it fails AA text everywhere,
  so it is banned from text and earns its keep as receded line-work at 3:1+.
- **Dim (`#C8C1DC`) exists for one register:** the pull-quote ink (§2.3) — quieter than
  body-white, not accent-purple, 12.12:1 on black. One duty, one token.

### 1.2 Contrast audit (computed, against the actual grounds) `[palette v2]`

AA thresholds: 4.5:1 normal text, 3:1 large text (≥24px, or ≥18.7px bold) and non-text UI.
The v1 dusk light-stop convention is gone with the fields: every pairing is now checked on
the two real grounds, black and card. Selection is audited as a third, transient ground.

| Pairing | Ratio | Verdict |
|---------|-------|---------|
| moon `#E9E6F0` on night `#000000` (all body text) | 17.04 | AAA all sizes |
| star `#F7F5FA` on night (display, stars) | 19.40 | AAA all sizes |
| moon on card `#0D0D10` | 15.75 | AAA all sizes |
| star on card | 17.92 | AAA all sizes |
| dim `#C8C1DC` on night (quote register, ≥24px) | 12.12 | AAA even as normal text; the register is always large text |
| violet `#A886FF` on night (glints, focus ring, flash rays, CTA hover text) | 7.52 | AA normal text (AAA large); 2.5× margin on non-text 3:1 |
| violet on card | 6.95 | AA normal text |
| **violet-ink `#9165FF` on night (13px plaque labels, nav at rest, line-work)** | **5.51** | **AA normal text — binding check 1** |
| **violet-ink on card (plaque labels on star-cards)** | **5.09** | **AA normal text — binding check 2; this pairing forced the half-step lift from `#8B5CF6` (4.58)** |
| violet-deep `#7C3AED` on night (receded edges, marks) | 3.69 | Non-text 3:1 only — **never text** |
| violet-deep on card | 3.41 | Non-text 3:1 only |
| star on selection `#2E2452` | 13.01 | AAA all sizes |
| moon on selection | 11.43 | AAA all sizes |
| violet on selection (a link inside a dragged selection) | 5.05 | AA normal text |
| card vs night (surface step) | 1.08 | Decorative by design; the hairline border carries the edge |
| rule `#2B2340` on night | 1.42 | Decorative only; carries no meaning |
| rule-faint `#1B1626` on night | 1.19 | Decorative only |
| selection vs night | 1.49 | Transient surface; visibility carried by the text-color flip |

### 1.3 Hard color rules `[palette v2]`

1. **The violet dosage law** (replaces the gold law — gold survives nowhere). Three steps,
   three duties, no leakage: **loud violet (`--color-violet`) is alive or absent** — hover,
   active, focus, emission, the flash rays; never at rest. **Violet-ink is drawn or labeled**
   — line-work and small mono labels, at rest is fine, but never a paragraph, never a
   headline. **Violet-deep is receded line-work only, never text.** No violet step is ever a
   ground or a field (one transient exception: selection, rule 6). **The screenshot test
   binds:** if any full viewport reads "purple site" rather than "black site with purple
   light," it fails Shama's brief — Dwight audits dosage per section against this sentence.
2. **Pure black is the ground, and only the ground** (amends v1's "no pure black" — the old
   rule protected an aubergine that no longer exists). `#000000` appears exactly once in the
   system, as `--color-night`; no other element (SVG fill, border, text) may be pure black.
   `#FFFFFF` still does not exist: the brightest value is star. OG images and
   favicon-adjacent assets inherit the same law.
3. **Color-blind rule: no state is hue-only.** Violet vs white differs in both hue and
   lightness, which survives every CVD type — but no state may depend on even that alone.
   Every violet-signaled state pairs with a second channel: link hover = violet **+
   underline-offset shift**; star glint = violet **+ scale/opacity pop**; CTA finale = violet
   **+ the capture flash's geometry (star-white core, sparkle rays, aperture blink)**; focus
   = violet **+ ring geometry**. Dwight checks this per component.
4. **Links are violet-ink and underlined** on night and card. Color is never the only link
   affordance. Hover: loud violet + underline-offset shift (the glint). Pressed shares the
   hover violet; the offset returning is the pressed signal — the ramp has no fourth step and
   does not need one.
5. **Focus is a double ring, one recipe site-wide:** inner 2px night, outer 2px violet
   (`box-shadow: 0 0 0 2px night, 0 0 0 4px violet`). The violet outer ring carries 3:1+ on
   both grounds (7.52 / 6.95, a 2.3× margin); the black inner ring separates it from white or
   violet elements. Focus is attention, attention is alive, so focus is loud violet — the one
   place it appears by keyboard rather than pointer, and it is still an active state.
   Base-layer CSS ships in §5.
6. **Selection: `--color-selection` background, star text** (13.01:1). Selection floods whole
   paragraphs, so it must not be the loud violet (a violet field, even momentary, breaks rule
   1's letter) — but a *dark* violet surface that exists only while the reader drags is light
   the user casts, not a field the site paints. That is the carve-out, in full: transient,
   user-caused, `#2E2452`, nothing else.
7. **Violet-ink is the accent floor for text.** Violet-deep, rule, and rule-faint never carry
   text or meaning beyond 3:1-checked line-work (deep) and pure structure (rules).
8. **Light mode: none at v1.** The direction is a night sky; one mode, done excellently.

### 1.4 The emission — one glow, tokenized; the dusk gradient is retired `[palette v2]`

**Retired, 02:07:** the dusk gradient recipe, both plum stops, and the `bg-dusk` utility no
longer exist. There are no colored fields, so there is nothing left for a linear fade to do.

**The emission ruling (blueprint §2 v2, rule 3 — Riker's call, recorded):** Shama's stars
"emit purple hue sometimes." v1's no-glow law meets that brief here, and the ruling is:
**one sanctioned soft halo, tokenized — not drawn rays.** Reasons: "emit purple *hue*" is
atmospheric light, not iconography — a star-scale burst of drawn rays reads as a sparkle
emoji, the exact cartoon this system exists to avoid (drawn rays remain correct at the
camera flash, §6.2's one-shot finale geometry, where they are a photographic event, not a
state). And the taste reference settles the aesthetic question: its violet bleeds softly
into the black; nothing in that image has hard-edged rays. Execution is a **radial gradient,
not a blur**: no `filter`, no `box-shadow`, GPU-cheap, deterministic edge, greppable.

```
--gradient-emission: radial-gradient(
  closest-side,
  color-mix(in oklab, var(--color-violet) 32%, transparent),
  transparent 70%
);
```

- Applied **only** via the `bg-emission` utility (§5), **only** on star-emission elements
  (a halo layer behind a star, the finale flash's bloom). Never behind text, never on
  surfaces, never as section atmosphere.
- **Size-capped by token:** `--halo-scale: 6` — a halo's diameter never exceeds 6× its
  star's diameter. Emission is local light, not a spotlight; past ~6× it becomes a field
  and violates rule 1.
- Animated by **transform/opacity only** (the element scales and fades; the gradient itself
  never animates). Triggered emission runs on `--ease-kindle`; the idle shimmer's swell on
  `--ease-velvet` (§4.4).
- `filter: blur`, `text-shadow`, `drop-shadow`, and glow-shaped `box-shadow` remain banned
  site-wide. This radial is the one glow, and Dwight can grep for it.

**The "maybe purple gradient" follow-up (02:11) — proposal, off by default:** Shama's
allowance was tentative, so flat black ships. One whisper option is prepared for their
review and nothing more: a hero-only fade from `#0E0918` (violet-black, 1.07:1 vs black —
perceptible only on a good panel in a dark room) at the top edge to pure black by 60% of the
hero's height. It lives as a commented-out token in §5; if Shama doesn't pick it at review,
the comment is deleted. It never ships without their yes.

---

## 2. Typography

Four faces, four registers, strict separation (blueprint §3, as amended 2026-07-11): a display
serif with drama, a gentle text serif, a mono that whispers in captions, and a quote voice that
speaks only between sections. Serif at every reading size — the deliberate inverse of Farhaan's
stack. One family name is now shared with his site: Playfair Display, his display register,
this site's quote register (owner decision 2026-07-11, chosen knowingly). The separation
survives at the file level: he loads Playfair 500/600 roman; this site loads **only the 500
italic** — the two sites share no font file and no glyph style (§2.3). The `@theme` block sets
Sentient as the default font family; Fraunces, Playfair, and Plex Mono are opt-in per element.

### 2.1 Faces, sourcing, weights to load

| Register | Face | Source | Load exactly | Fallback stack |
|----------|------|--------|--------------|----------------|
| Display | Fraunces | Google Fonts via `next/font/google` | **Variable: `wght` axis + `axes: ["opsz"]`** (one file) | `"Fraunces", Georgia, "Times New Roman", serif` |
| Body | Sentient | Fontshare (ITF) — CDN `<link>` at prototype phase (same approach as Erode on Farhaan's site), self-hosted woff2 via `next/font/local` as a production TODO | **400, 500** | `"Sentient", Georgia, "Times New Roman", serif` |
| Technical | IBM Plex Mono | Google Fonts via `next/font/google` | **400, 500** | `"IBM Plex Mono", ui-monospace, "Cascadia Mono", Consolas, monospace` |
| Quote `[rev 2026-07-11]` | Playfair Display | Google Fonts via `next/font/google` | **500 italic only** (`weight: "500", style: "italic"` — one file; the roman is never loaded, see §2.3) | `"Playfair Display", Georgia, "Times New Roman", serif` |

Six font files total (Fraunces variable ×1, Sentient ×2, Plex Mono ×2, Playfair italic ×1)
`[rev 2026-07-11: was five]`. The Playfair italic is the site's only italic: the writing law
barely italicizes, Sentient loads no italic slice, and Fraunces and the mono never slant. Add
Sentient 400 italic later only if Lefler's copy demands it.
Fontshare CSS URL for the prototype: `https://api.fontshare.com/v2/css?f[]=sentient@400,500&display=swap`.

### 2.2 Fraunces: the axis decision, recorded

Fraunces is a variable font with four axes. The settings below are the identity — they are not
Sindri's to revisit:

| Axis | Setting | Reason |
|------|---------|--------|
| `opsz` (9–144) | **Auto** — load the axis (`axes: ["opsz"]`), set `font-optical-sizing: auto` (the browser default; never override it) | At folio sizes the axis reaches its 144pt display cut: high-contrast hairlines, tight apertures, the drama the blueprint bought Fraunces for. At the 32px floor it relaxes toward text forms on its own. Pinning 144 everywhere would shatter at 32px on ClearType; pinning low would flatten the hero. |
| `wght` | **560** for folio and display; **600** for title | 560 is luxe-luminous on the night ground — lighter shimmers on Windows, heavier goes advertising. Title takes 600 because 32px is the smallest Fraunces on the site and needs a touch more body. Nothing below 500 ever exists on this ground. |
| `SOFT` (0–100) | **0** — the axis is *not loaded*; omitting it from `axes` pins the default, which is 0, and saves the bytes | Softening blunts the serifs' snap. The gallery is crisp; the warmth comes from the palette, not from melted type. |
| `WONK` (0–1) | **0** — not loaded, pinned at default 0 | The wonky alternates are charming and wrong: this site is elegant, not whimsical. |

**The 32px Fraunces floor.** Blueprint §3: display sizes only; the character is the drama. The
scale below makes violation structurally impossible: the only steps that carry `font-display`
are `folio`, `display`, and `title`, and none renders below 32px at any viewport (clamp
minimums are pinned at or above it; title sits exactly on it). There is **no eyebrow/caps
branch**: Plex Mono lowercase is the caption voice of this site (the deliberate inverse of
Farhaan's letterspaced Josefin caps). If a design need appears for Fraunces below 32px, the
answer is a mono plaque or a different layout — never a smaller Fraunces.

Rendering notes for Sindri (Windows-checked):

- Light-on-dark blooms on Windows ClearType: text reads a half-weight heavier than on light
  grounds. This is why body is Sentient 400 (never 300), why Fraunces sits at 560 not 600 for
  folio, and why no thin weight exists anywhere in the system.
- Fraunces at folio sizes has true hairline contrast: check it on a 1080p monitor at 100%
  zoom, not just a retina laptop. If hairlines sparkle, the fix is size (bigger), never weight.
- Sentient at 18px/1.75 is the reading voice; below 16px switch to mono, never smaller serif.
- Mono labels are lowercase by default (`fig. 03 · project name`, `next.js · postgres` —
  separator ruled `·` 2026-07-11, per the repo-wide em dash ban on visitor-facing copy); if a
  label must be uppercase, add +0.08em tracking on top of the step's value.

### 2.3 Playfair: the quote register, recorded `[rev 2026-07-11]`

Blueprint §6.3: pull-quotes in Playfair Display, the between-sections editorial voice, on the
black ground only `[palette v2: was aubergine]`. The owner chose this face knowing it is
Farhaan's display register; the settings below are what keep that choice from reading as a
shared template. They are the identity — not Sindri's to revisit.

| Property | Setting | Reason |
|----------|---------|--------|
| Style | **Italic, always** | Playfair's italic is the canonical pull-quote voice: calligraphic entry strokes, a true cursive `a`, nothing like its roman. Farhaan's site uses the roman only (500/600, no italic loaded) — so italic-only here means the sites share a family name but not one font file and not one glyph shape. The italic slice is not a cost on top of the roman; it is *instead of* the roman, so the register costs exactly one file either way. And the lock becomes structural: the roman is never loaded, so a stray `font-quote` heading renders in the Georgia fallback and fails review on sight rather than passing as a plausible headline. |
| Weight | **500** (single weight) | The same night-ground law as Fraunces: nothing below 500 exists on this ground. Playfair 400 italic thins are true hairlines and would sparkle on ClearType at quote sizes; 500 gives the thins the half-step of ink that light-on-dark bloom then rounds up to comfortable. 600 would push the quote toward headline authority it must not have. |
| Size | `clamp(1.5rem, 1.125rem + 0.9375vw, 1.875rem)` — **24→30px** | The register lives in the gap the scale left open: above `lede` (max 23px), below the 32px Fraunces display floor. 24px at ≤640px viewport, 30px at ≥1280px, and it can never collide with either neighbor. 24px is also the Playfair floor (see the hairline judgment below). |
| Line height | **1.5** | Editorial air for a 2–3 line quote; tighter than body (1.75) because the size is doing the pacing, looser than display (1.08) because this voice murmurs rather than announces. |
| Tracking | **0** | Italics close their own letterfit; tracking a calligraphic italic either direction breaks the joins. |
| Measure | `--container-narrow` (**40ch**) | No new token: `ch` computes in the quote's own font, so the measure self-scales with the clamp. At 30px that is roughly 560–600px — two to three poem-like lines, never a paragraph block. |
| Ink | **`--color-dim` `#C8C1DC`** `[palette v2: was lilac]` | Re-judged for the black ground. The register must sit quiet-editorial between body-white and accent-purple, so it takes neither: moon (17.04:1) would make quotes read as more body text at a bigger size, and any violet step would put the accent family in an editorial voice, breaking the dosage law (§1.3 rule 1). Dim is the far star — white dimmed by distance, with a violet whisper too faint to read as color — at **12.12:1 on night** (computed, §1.2): AAA even as normal text, and the register is always large text (≥24px), where the requirement is 3:1. It also serves the hairlines: on true black, *brighter* inks halate harder, so stepping the quote down from moon both quiets the voice and steadies Playfair's thins. |
| Ground | **Night only** | Quotes sit on the black ground, full stop `[palette v2: the dusk-field clause died with the fields — night is the only ground the site has]`. So 12.12:1 is the only ratio the register ever needs. |
| Motion | Opacity-only fade, `--ease-velvet`, once, then still (blueprint §6.3) | No rise, no slide, no letter-by-letter. The quiet entrance is the device. |

**Hairline-serif-on-dark judgment, re-run against black `[palette v2]`:** Playfair is a
high-contrast face; at 500 italic its thins sit near one device pixel at 24px on a 1080p
monitor. Three things carry it on the v2 ground: light-on-dark ClearType bloom adds apparent
weight to exactly the strokes at risk (and blooms *more* on true black than it did on
aubergine); dim's 12.12:1 gives the antialiaser more luminance span than lilac's 8.42 ever
did; and dim deliberately stops short of moon/star brightness, where the same bloom tips from
help into halation and the thins start to shimmer. The danger zone is below ~20px, where the
thins alias to nothing — and the clamp floor makes that structurally unreachable. Same law as
Fraunces: **if the hairlines sparkle on a 1080p Windows check, the fix is size, never
weight.**

**The register lock, as token law: Playfair is a pull-quote or it is nothing.** Never a
headline, never body, never a caption, never a nav link, never an OG image. Only the `quote`
step carries `--font-quote`; only the pull-quote component uses the `quote` step; the floor is
24px by clamp. Enforcement is structural (italic-only loading, single step) plus greppable
(§7).

### 2.4 Type scale — named steps `[renumbered from 2.3, rev 2026-07-11]`

All steps ship in the `@theme` block with size, line-height, letter-spacing, and weight as
Tailwind v4 sub-tokens, so `text-folio` etc. apply the full setting in one class. Tailwind's
default text scale is wiped: this closed set is the scale.

| Step | Size | Line height | Tracking | Face / weight | Duty |
|------|------|-------------|----------|---------------|------|
| `folio` | `clamp(3.25rem, 1.9rem + 6.75vw, 7.5rem)` (52→120px) | 1.0 | −0.01em | Fraunces 560 | The name in star-white on the black ground `[palette v2]`; oversized folio moments. Floor: 52px. Bigger than a hero has any right to be — that is the luxe. |
| `display` | `clamp(2rem, 1.55rem + 2.25vw, 3.25rem)` (32→52px) | 1.08 | −0.005em | Fraunces 560 | Section heads. Min pinned at the 32px Fraunces floor. |
| `title` | `2rem` (32px, fixed) | 1.15 | 0 | Fraunces 600 | Card and star-card titles. Sits exactly on the floor. |
| `quote` `[rev 2026-07-11]` | `clamp(1.5rem, 1.125rem + 0.9375vw, 1.875rem)` (24→30px) | 1.5 | 0 | Playfair 500 italic | Pull-quotes only (§2.3). Night ground only. Fills the 24–30px gap between lede and the display floor. |
| `lede` | `clamp(1.25rem, 1.14rem + 0.55vw, 1.4375rem)` (20→23px) | 1.6 | 0 | Sentient 400 | Hero support line, about opener, /projects intro. |
| `body` | `1.125rem` (18px) | 1.75 | 0 | Sentient 400 | All reading text. The leading is a shade more generous than a light-ground site would take: air is the luxury. |
| `body-sm` | `1rem` (16px) | 1.65 | 0 | Sentient 400 | Dense serif moments (plaque support lines, tile one-liners). |
| `figure` | `1.5rem` (24px) | 1.3 | 0 | Plex Mono 500 | Proof figures on cards and signals. Numbers are first-class. |
| `mono` | `0.875rem` (14px) | 1.5 | 0.01em | Plex Mono 400 | Nav links, stack rows, top-bar name, footer line. |
| `plaque` | `0.8125rem` (13px) | 1.6 | 0.02em | Plex Mono 400 | The art-book caption: `fig. 03 · project name`, star labels, photo caption. Violet-ink by default `[palette v2: was heather]` — the binding 5.51/5.09 checks in §1.2 exist for this row. `[separator ruled ·, rev 2026-07-11]` |

Weight vocabulary: Fraunces 560 with 600 at title only, Playfair 500 italic at quote only,
Sentient 400 with 500 for in-line emphasis, mono 400 with 500 for figures. Nothing bolder
exists; the system's authority comes from scale, space, and the numbers, not from heavy type.

---

## 3. Space, rules, radii, measures, breakpoints

### 3.1 Spacing

Tailwind v4's default 4px-base scale stays. Three semantic additions:

| Token | Value | Reason |
|-------|-------|--------|
| `--spacing-section` | `clamp(6rem, 4rem + 8vw, 10rem)` (96→160px) | Vertical rhythm between landing sections. Gallery pacing: noticeably more air than a fast site would tolerate — the visitor walks, not scrolls. |
| `--spacing-sky` | `5rem` (80px) | Right-edge margin reserved for the camera rail, ≥`md` `[rev 2026-07-11: the kindling is retired; the camera device from blueprint §6.2 owns this margin]`. Landing sections keep clear of it; the sky owns it. Deliberately slimmer than Farhaan's 96px rail: his camera commands its lane, this one traces along the edge — a shared device must not share proportions. |
| `--spacing-sky-sm` | `3rem` (48px) | The slim rail on mobile. If real copy cannot keep clear of 48px at some breakpoint, that breakpoint degrades to finale-only per blueprint §6.2 — the rail never shrinks below this. |

### 3.2 Rules and strokes

Thin drawn lines are the mood (blueprint §4); in v2 they are violet on black — the taste
reference is literally purple line-work on a black canvas `[palette v2]`. Everything is
hairline. The drawn statement rule is 1px on purpose — where Farhaan's site asserts with a
2px stroke, this site *traces*.

| Token | Value | Use |
|-------|-------|-----|
| Hairline rule | `1px` solid `--color-rule` | Quiet structure: signals rows, dividers inside dense blocks. Decorative violet-dark; never the vivid steps — a vivid border on every card is how a black site turns purple. |
| Faint rule | `1px` solid `--color-rule-faint` | Card/plaque borders, photo border. |
| Statement rule | `1px` solid `--color-violet-ink` `[palette v2: was heather]` | One per section maximum: the section-opening rule that draws in on scroll (`--ease-trace`). The one structural line that carries the working violet. |
| `--stroke-sky` | `1` (SVG units) | Constellation edges, plaque leader lines, and the camera's detail strokes (aperture blades, dials, seams) — the fine line-work everywhere. Apply `vector-effect: non-scaling-stroke` so responsive scaling never fattens the lines. Stroke color `[palette v2]`: violet-ink at full, violet-deep for receded edges. |
| `--stroke-instrument` | `1.25` (SVG units) `[rev 2026-07-11]` | The camera's primary strokes only: body silhouette, lens barrel, pentaprism — the lines that must read as the instrument. Same non-scaling-stroke rule. |

The camera's ink and weights, recorded (blueprint §6.2 delegated both here):

- **Ink `[palette v2]`: violet-ink `#9165FF` primary, violet-deep `#7C3AED` for receded
  strokes** — the same two-ink line-work convention as the constellation, so the sky and the
  instrument read as one drawing system: a vivid violet instrument drawn on the black canvas,
  visibly not Farhaan's emerald. The loud violet touches the camera only when it is alive
  (the aperture blink, the flash rays). Grounds: with the dusk fields retired the rail
  crosses only the black ground and, at the star-cards, the card surface. Non-text 3:1,
  computed: **violet-ink 5.51:1 on night / 5.09:1 on card** (1.7× margin); **violet-deep
  3.69:1 on night / 3.41:1 on card** (passes, no room to darken — this is why the working
  steps sit luminous: the reference's deep end fails 3:1 on black and may only appear where
  §1.2's computed rows say it passes).
- **Weights: 1.25 primary / 1 detail**, against Farhaan's 1.5 / 1. The hierarchy inside an
  exploded drawing needs two weights (silhouette must beat detail), but §3.2's law is that this
  site traces where his asserts — so the ceiling drops. Light-on-dark bloom on the night ground
  reads strokes roughly a half-step heavier than drawn, which is what lets 1.25 carry the
  silhouette that 1.5 carries on his bone ground. If the 1.25/1 hierarchy compresses too far in
  a real browser, the sanctioned fix is fewer detail lines, never a fatter primary: 1.25 is the
  ceiling on the instrument's ink.
- No sub-pixel strokes anywhere on the camera: the parts move under scrub, and sub-pixel
  strokes shimmer under transform.

Star geometry (point sizes, glint radii) is component-level and lives in the constellation
spec, not here — but its colors and eases come from this file.

### 3.3 Radii — squared, one exception

`--radius-*` is wiped. **Every rectangle on the site is square:** plaques, tiles, buttons, the
photo, inputs `[palette v2: dusk fields struck from this list with the fields themselves]`.
The single exception is `--radius-star: 9999px` for star points
and the capture flash's sparkle marks `[rev 2026-07-11: kindling marks retired with the
kindling; the flash is the device that inherits the exception — it is literally a point of
light]`. The rule is nameable and it is the identity: *the only circles on this
site are points of light.* (Same structural law as Farhaan's site, opposite meaning: there the
circles are his graph's nodes; here they are literally stars. Both sites earn their one
circle; neither inherits it.)

### 3.4 Measures and containers

| Token | Value | Use |
|-------|-------|-----|
| `--container-prose` | `58ch` | Sentient reading measure (about, plaque descriptions, case copy). Two channels narrower than a light-ground site: long light-on-dark lines fatigue. |
| `--container-narrow` | `40ch` | Hero support line, tile one-liners, intro lines. |
| `--container-site` | `72rem` (1152px) | Page shell max-width, before the sky margin is added. |

### 3.5 Breakpoints

Tailwind defaults stay (640/768/1024/1280). What binds is the mapping:

| Behavior | Breakpoint |
|----------|-----------|
| /projects star-card grid 1-up → 2-up | `md` (768px) |
| Case tiles 2×2 | ≥`sm` (640px) if legible with real copy; below, or if Sindri's legibility call says so, 1-column (legibility beats layout fidelity) |
| Constellation: composed sky → vertical sky column | composed ≥`lg` (1024px); column below — a re-composition, never a crushed scale-down (blueprint §6.1) |
| Camera rail margin 48px → 80px `[rev 2026-07-11]` | `md` (768px) |

---

## 4. Motion — anime.js, luxe tempo

**anime.js v4 is the sole engine** (owner mandate, blueprint §7). No CSS keyframes, no CSS
transitions, no Framer Motion: if it moves, anime.js moves it. The only CSS-declared visual
change permitted is the focus ring recipe (§1.3), which is a state, not an animation.

The tempo is the anti-Farhaan: his site is buttery and quick; this one is slow, heavy, and
sparse. Every duration here is roughly 1.5× his equivalent, every ease starts with weight
instead of snap, and fewer things move at all. An exhibition, not a demo reel.

Tokens live as CSS custom properties (§5) so they are inspectable and single-source; Sindri
mirrors them into one motion constants module (read them once via `getComputedStyle` at scope
creation, or hand-copy with a comment pointing here — either way this file is the source of
truth and the values must match).

### 4.1 Named eases — three, no more

| Token | Value | Duty |
|-------|-------|------|
| `--ease-velvet` | `cubic-bezier(0.45, 0.05, 0.15, 1)` | The workhorse. Every entry, reveal, fade-rise, stagger, quote fade — the camera's finale glide to the CTA `[rev 2026-07-11]` — and the idle shimmer's halo swell (§4.4: a breath, not a catch) `[palette v2]`. Starts with weight — no snap off the line — then a long, settling landing. Heavy curtains, not spring hinges. |
| `--ease-trace` | `cubic-bezier(0.6, 0.05, 0.25, 1)` | SVG line drawing only: constellation edges, statement rules, leader lines, the camera parts drawing themselves in. A deliberate start and a resting finish — a hand laying a line, not a value tweening. |
| `--ease-kindle` | `cubic-bezier(0.3, 1.35, 0.45, 1)` | The glint. Star glints, violet emission answering the visitor, the aperture blink and capture flash at the finale CTA `[palette v2: gold struck; emission is violet now]`. A small overshoot (~6%) on scale/opacity reads as light catching. **The only ease permitted on triggered emission or stars, and it never touches layout-scale elements.** |

**No spring on this site — the note left here this morning is now resolved, and the rule
stands `[rev 2026-07-11]`.** The camera port (blueprint §6.2) raised the question: Farhaan's
camera glides to his CTA on a spring (`lift`: mass 1, stiffness 80, damping 14), and this site
now runs the same device. Ruling: **the glide runs on velvet; the no-spring rule earns no
exception.** Three reasons, recorded so nobody relitigates it at build time:

1. **Identical spring physics on a shared device is the same-template pressure named in
   blueprint §6.2 and §8.** Motion character is one of the four binding mitigations that make
   the shared camera defensible. Import his spring and the two finales become the same finale
   in different colors — the exact failure the mitigations exist to prevent.
2. **A spring is his site's personality, not this one's.** Bounce at arrival is buttery-quick-
   precise; this site is slow, heavy, luxe. Velvet's long settling landing is a dolly move — an
   exhibition piece wheeled into place — and it is the same physics language as every other
   arrival on the page. The finale should feel like the site finishing its sentence, not
   borrowing someone else's.
3. **The drama here was never the landing; it is the catch.** This site's finale beat is the
   capture flash on kindle — a star-white core with violet sparkle rays, the one finale-scale
   emission moment `[palette v2: was gold]`. A springy landing would spend the spectacle
   before the flash fires and steal its beat. Quiet arrival, then the light catches: glide on
   velvet, aperture blink + flash on kindle.

Three curves remain the whole vocabulary. No spring parameters exist in this system, and none
may be added for the camera.

### 4.2 Duration scale

| Token | Value | Duty |
|-------|-------|------|
| `--duration-glint` | `260ms` | Hovers: link glints, star pops, underline shifts. Slower than a snappy UI hover on purpose — the light takes a beat to catch — but still comfortably inside perceived-instant response. |
| `--duration-enter` | `700ms` | Section content reveals (fade + rise in velvet). |
| `--duration-draw` | `1400ms` | An edge set or statement rule tracing in. |
| `--duration-finale` | `2600ms` | Total budget for the contact finale: the camera's glide from the rail, the aperture blink, AND the capture flash, complete `[rev 2026-07-11: was constellation assembly + CTA catch; the camera finale inherits the budget unchanged — 2600ms is ~1.44× Farhaan's 1800ms flight budget, holding the ~1.5× luxe-tempo law on the shared device]`. Nothing on the site may exceed this token. |
| `--stagger-step` | `110ms` | `stagger()` interval for tiles, plaques, star groups. Cap any stagger group at ~6 items (660ms spread) so late items don't feel forgotten. |
| `--reveal-rise` | `20px` | The translateY distance for content rising in. Larger than a quick site would use: weight needs travel to read as weight. |
| `--duration-shimmer` | `2400ms` `[palette v2]` | One idle-shimmer swell, complete: a single star's halo rises and falls, opacity only, on velvet (§4.4). |
| `--shimmer-lull` | `9000ms` `[palette v2]` | Mean quiet time between shimmer swells. Implementation jitters ±40% per swell so the sky never reads as a metronome; the token is the mean, and it may drift up at review, never down. |

### 4.3 Scroll

- **`--scroll-sync: 0.15`** — the site-wide ScrollObserver smooth `sync` value for the
  camera's assembly scrub (bidirectional, per blueprint §6.2) `[rev 2026-07-11: was the
  kindling scrub; the value survives the device swap]`. Lower is smoother and laggier; 0.15
  gives the drifting parts a heavier trail than Farhaan's 0.2 without feeling detached — on a
  shared device this gap is load-bearing: same scrub mechanics, measurably different weight.
  Never below 0.1, never per-section overrides: one value is what makes the page move like one
  sky.
- The finale is **not** scroll-synced: it is a triggered timeline (enters once when the
  contact section arrives) inside `--duration-finale` — the glide on `--ease-velvet`, the
  aperture blink and capture flash on `--ease-kindle` (§4.1 ruling). The flash is a
  star-white core with violet sparkle rays `[palette v2: was candle gold]`, fires exactly
  once, and is the site's one finale-scale emission moment (§1.3, §1.4).

### 4.4 The idle shimmer — "sometimes," ruled `[palette v2]`

Shama's brief says the stars "emit purple hue **sometimes**." That word is temporal — it
describes what the sky does unprompted, not what it does when touched. An actual night sky
(their image, twice) twinkles on its own; a constellation that only glows under a pointer is
a hover state wearing a metaphor. **Ruling: "sometimes" earns one sanctioned idle shimmer —
the single exception to the nothing-loops law** — and it is caged by tokens so it can never
drift into ambient AI-slop motion:

- **At most one star mid-swell at any moment,** site-wide. Two stars breathing at once reads
  as particles, and particles are banned.
- A swell is **opacity-only** on the star's emission halo (§1.4): rise and fall inside
  `--duration-shimmer` (2400ms), on **velvet** — a breath, not a catch. Kindle stays reserved
  for emission that answers the visitor (§4.1); an idle sky must not use the interaction ease,
  or interactions stop meaning anything.
- Between swells, silence: `--shimmer-lull` (9000ms mean, jittered ±40%). Roughly four
  breaths a minute across one section — "sometimes," not "constantly."
- **Constellation section only**, and only while it is in the viewport; the shimmer scope
  pauses off-screen and never runs during the section's entry animation.
- **Zero under `prefers-reduced-motion`** — the scope is never created (§4.5 rule 4).
- Dwight audits against this list; any shimmer behavior not on it is a violation.

### 4.5 Hard rules (restating blueprint discipline as token law) `[renumbered from 4.4, palette v2]`

1. **Scroll reveals fire once.** After a section has entered it is still. Hover is the only
   repeatable motion. Nothing loops, nothing floats idle, nothing pulses — with exactly one
   sanctioned exception, the idle shimmer inside its §4.4 cage. A glint happens once per
   interaction; a glinted star returns to star-white and stays still.
2. **Transform, opacity, and SVG `draw` only.** Nothing animates layout; 60fps or it gets cut.
3. **Triggered emission moves on kindle** `[palette v2: was the gold rule]`. The loud violet
   may only appear via `--ease-kindle` at `--duration-glint` (interactions) or inside the
   finale timeline — except the idle shimmer's velvet swell (§4.4). Violet-ink line-work
   draws in on trace like all line-work. A loud-violet element easing in with velvet outside
   the shimmer is a spec violation.
4. **Reduced motion:** `prefers-reduced-motion` gets final frames — all stars lit star-white,
   constellation fully drawn, no shimmer (the scope is never created), the camera parked
   assembled beside the CTA (no rail, no scrub, no flash — blueprint §6.2) `[rev
   2026-07-11]`, CTA in its lit state, content at rest opacity/position, and **no
   ScrollObservers are created at all** (gate the scopes, don't pause them).
5. No scroll-jacking: native scroll speed is never touched.

---

## 5. The Tailwind v4 `@theme` block — the contract

Paste verbatim into the app's global stylesheet, below `@import "tailwindcss";`. The wipes at
the top are deliberate: color, font, text, radius, and shadow namespaces are closed sets — if
a value is not defined here, the utility does not exist, and that is the enforcement
mechanism. (Escape hatch for genuine emergencies: arbitrary values like `text-[15px]` remain
possible and are greppable, so Dwight can audit every exception.)

```css
@theme {
  /* ---- closed sets: wipe Tailwind defaults ---- */
  --color-*: initial;
  --font-*: initial;
  --text-*: initial;
  --radius-*: initial;
  --shadow-*: initial; /* no shadows; the one glow is bg-emission, a gradient, not a shadow */

  /* ---- color: palette v2 — black canvas, white stars, violet light.
          (tokens.md 1 for the audit; plum/wax/lilac/heather/candle are retired) ---- */
  --color-night: #000000;       /* ground; literal black, ground ONLY (1.3 rule 2) */
  --color-card: #0D0D10;        /* plaque surface; always rule-faint border  */
  --color-star: #F7F5FA;        /* stars + display text — 19.40:1 on night   */
  --color-moon: #E9E6F0;        /* reading text — 17.04:1 night, 15.75 card  */
  --color-dim: #C8C1DC;         /* quote register ONLY — 12.12:1 on night    */
  --color-violet: #A886FF;      /* ALIVE ONLY — 7.52:1 night, 6.95:1 card    */
  --color-violet-ink: #9165FF;  /* drawn/labeled at rest — 5.51:1 night, 5.09:1 card */
  --color-violet-deep: #7C3AED; /* receded line-work, NEVER text — 3.69/3.41 non-text */
  --color-rule: #2B2340;        /* quiet ruling, decorative                  */
  --color-rule-faint: #1B1626;  /* faintest ruling: card borders, frames     */
  --color-selection: #2E2452;   /* ::selection ONLY — transient, user-cast   */

  /* ---- type: four faces, four registers ---- */
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-serif: "Sentient", Georgia, "Times New Roman", serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "Cascadia Mono", Consolas, monospace;
  --font-quote: "Playfair Display", Georgia, "Times New Roman", serif; /* 500 italic ONLY is loaded; pull-quotes only (tokens.md 2.3) */
  --default-font-family: var(--font-serif); /* Sentient is the default voice */
  --default-mono-font-family: var(--font-mono);

  /* ---- type scale: the only Fraunces steps are folio/display/title (32px floor);
          quote is the only Playfair step (24px floor, italic only) ---- */
  --text-folio: clamp(3.25rem, 1.9rem + 6.75vw, 7.5rem);
  --text-folio--line-height: 1;
  --text-folio--letter-spacing: -0.01em;
  --text-folio--font-weight: 560;

  --text-display: clamp(2rem, 1.55rem + 2.25vw, 3.25rem); /* min = 32px floor */
  --text-display--line-height: 1.08;
  --text-display--letter-spacing: -0.005em;
  --text-display--font-weight: 560;

  --text-title: 2rem; /* fixed on the 32px floor */
  --text-title--line-height: 1.15;
  --text-title--font-weight: 600;

  /* quote: Playfair 500 italic, dim ink. text-quote sets size/leading/weight
     only — the component pairs it with `font-quote italic` (family and style
     are not text-* sub-tokens). Black ground only. */
  --text-quote: clamp(1.5rem, 1.125rem + 0.9375vw, 1.875rem); /* 24 -> 30px */
  --text-quote--line-height: 1.5;
  --text-quote--letter-spacing: 0em;
  --text-quote--font-weight: 500;

  --text-lede: clamp(1.25rem, 1.14rem + 0.55vw, 1.4375rem);
  --text-lede--line-height: 1.6;

  --text-body: 1.125rem;
  --text-body--line-height: 1.75;

  --text-body-sm: 1rem;
  --text-body-sm--line-height: 1.65;

  --text-figure: 1.5rem; /* proof figures: mono 500 */
  --text-figure--line-height: 1.3;
  --text-figure--font-weight: 500;

  --text-mono: 0.875rem; /* nav, stack rows, top-bar name */
  --text-mono--line-height: 1.5;
  --text-mono--letter-spacing: 0.01em;

  --text-plaque: 0.8125rem; /* fig. captions, star labels; lowercase */
  --text-plaque--line-height: 1.6;
  --text-plaque--letter-spacing: 0.02em;

  /* ---- measures ---- */
  --container-prose: 58ch;
  --container-narrow: 40ch;
  --container-site: 72rem;

  /* ---- semantic spacing (default 4px scale stays) ---- */
  --spacing-section: clamp(6rem, 4rem + 8vw, 10rem);
  --spacing-sky: 5rem;    /* camera rail margin, >= md (slimmer than Farhaan's 96px) */
  --spacing-sky-sm: 3rem; /* slim rail, < md; below this, finale-only */

  /* ---- radii: squared system; the only circles are points of light ---- */
  --radius-star: 9999px;

  /* ---- motion eases (anime.js reads these; see tokens.md section 4) ---- */
  --ease-velvet: cubic-bezier(0.45, 0.05, 0.15, 1); /* entries, reveals, idle shimmer swell */
  --ease-trace: cubic-bezier(0.6, 0.05, 0.25, 1);   /* SVG line drawing only */
  --ease-kindle: cubic-bezier(0.3, 1.35, 0.45, 1);  /* triggered emission + stars only */
}

/* Non-utility tokens: the emission recipe + motion scalars + SVG strokes.
   Source of truth for the anime.js constants module. [palette v2: the dusk
   recipe and bg-dusk are RETIRED — nothing may reintroduce them.] */
:root {
  /* The only gradient and the only glow in the system (tokens.md 1.4):
     violet emission bleeding into black. Applied ONLY via .bg-emission,
     ONLY on star-emission elements. Never behind text, never a surface. */
  --gradient-emission: radial-gradient(
    closest-side,
    color-mix(in oklab, var(--color-violet) 32%, transparent),
    transparent 70%
  );
  --halo-scale: 6;           /* halo diameter <= 6x its star's diameter (tokens.md 1.4) */

  /* PROPOSAL, off by default (tokens.md 1.4): Shama's tentative "maybe purple
     gradient" (02:11). Ships flat black unless they pick it at review; if not
     picked, DELETE this comment. Hero only, top edge to 60% of hero height:
     --gradient-breath: linear-gradient(to bottom, #0E0918 0%, #000000 60%); */

  --duration-glint: 260ms;
  --duration-enter: 700ms;
  --duration-draw: 1400ms;
  --duration-finale: 2600ms; /* hard budget: camera glide + aperture blink + capture flash */
  --duration-shimmer: 2400ms; /* one idle swell, opacity only, velvet (tokens.md 4.4) */
  --shimmer-lull: 9000ms;     /* mean quiet between swells; jitter +/-40% in code */
  --stagger-step: 110ms;
  --reveal-rise: 20px;
  --scroll-sync: 0.15;       /* site-wide ScrollObserver smooth sync value (camera scrub) */
  --stroke-sky: 1;           /* SVG units; sky line-work + camera detail strokes;
                                pair with vector-effect: non-scaling-stroke */
  --stroke-instrument: 1.25; /* camera primary strokes only; same non-scaling rule;
                                the ceiling on the instrument's ink (tokens.md 3.2) */
}

/* The one way to apply the emission halo. Greppable: every glow on the site
   answers to a search for "bg-emission". Star-emission elements only. */
@utility bg-emission {
  background-image: var(--gradient-emission);
}

/* Base-layer recipes: system-level, ship with the tokens. */
@layer base {
  /* Focus: double ring — violet carries 3:1+ on night AND card (7.52 / 6.95);
     the black inner ring separates it from white or violet elements
     (tokens.md 1.3). Focus is attention; attention is alive; alive is violet. */
  :where(a, button, input, textarea, select, summary, [tabindex]):focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-night),
      0 0 0 4px var(--color-violet);
  }

  /* Selection: the deep end at surface weight, transient and user-cast — the
     one violet-tinted surface (tokens.md 1.3 rule 6). Never the loud violet. */
  ::selection {
    background: var(--color-selection);
    color: var(--color-star);
  }
}
```

---

## 6. Usage rules — the hard constraints, in one place

The blueprint's laws (§2, §7) restated as the checklist Sindri builds against and Dwight
audits against. Where §1–§4 explain, this section only forbids.

1. **The violet dosage law** `[palette v2: replaces the gold rule — gold survives nowhere]`.
   Loud violet is alive or absent: hover, active, focus, emission, flash rays — never at
   rest, never a text block, never decoration. Violet-ink is drawn or labeled: line-work and
   small mono labels only. Violet-deep is receded line-work, never text. No violet is ever a
   ground or field (sole transient exception: `::selection`, §1.3 rule 6). A glinted star
   returns to star-white. The finale flash happens exactly once per page visit. **Screenshot
   test: any viewport that reads "purple site" instead of "black site with purple light"
   fails.**
2. **One glow** `[palette v2: bg-dusk is retired]`. `bg-emission` is the only gradient and
   the only glow: radial, violet, star-emission elements only, halo diameter capped at
   `--halo-scale`. The page ground never fades (the §1.4 hero proposal ships only with
   Shama's explicit yes). No other gradient utility, arbitrary-value gradient, mesh, or
   multi-color fade may exist in the codebase.
3. **Fields are surfaces, not colors** `[palette v2]`. The only field is card (plus transient
   selection); paragraphs sit on night or card only; no colored field exists on this site.
4. **Pure black is the ground and only the ground; no pure white, no shadows, no blurs**
   `[palette v2: amended]`. `#000000` exists once, as `--color-night`; `#FFFFFF` not at all.
   The only `box-shadow` is the focus ring recipe. `filter: blur`, `text-shadow`, and
   `drop-shadow` do not exist on this site — the emission halo is a gradient, not a blur.
5. **Fraunces never below 32px.** Only `folio`/`display`/`title` carry `font-display`. No
   caps branch exists; captions are lowercase Plex Mono.
6. **Playfair is a pull-quote or it is nothing** `[rev 2026-07-11]`. Only the `quote` step
   carries `--font-quote`; only the pull-quote component uses the `quote` step; 500 italic is
   the only slice loaded; quotes sit on the black ground in dim ink `[palette v2]`; the 24px
   clamp floor is the Playfair floor. Never a headline, body, caption, nav link, or OG image.
7. **The camera is drawn, never filled** `[rev 2026-07-11]`. Violet-ink strokes with
   violet-deep receded `[palette v2: was heather/lilac]`, loud violet only when it is alive;
   `--stroke-instrument` primary / `--stroke-sky` detail, non-scaling stroke, no fills, no
   gradients, no sub-pixel strokes. One camera on screen at any scroll position (blueprint
   §6.2 hand-off rule). The glide runs on velvet, the blink and flash on kindle; no spring
   exists on this site.
8. **Motion:** three eases, the duration scale, nothing else. Triggered emission and stars
   move only with `kindle`; the idle shimmer is the one loop, inside its §4.4 cage, on
   velvet; reveals fire once; the finale completes inside `--duration-finale`;
   reduced-motion gets final frames with zero observers and zero shimmer.
9. **Every color-signaled state has a second channel** (underline shift, ring geometry,
   scale, weight, label). No hue-only meaning.
10. **If a value isn't in §5, it doesn't exist.** Arbitrary values are emergencies and must
    survive Dwight reading them out loud.

## 7. Sign-off checklist (what Riker reviews the build against)

1. Grep `font-display` usages: none render below 32px at any viewport.
2. Grep `font-quote` and `Playfair`: both appear only in the pull-quote component and the font
   loader; the loader requests 500 italic only; no quote renders below 24px; quote ink is dim.
   `[rev 2026-07-11; palette v2]`
3. **v1-vocabulary sweep** `[palette v2]`: grep `candle`, `wax`, `lilac`, `heather`, `plum`,
   `dusk`, `gold`, `aubergine` across the codebase — zero matches. Any hit is un-migrated v1
   and fails the build revision.
4. Grep `color-violet` (the loud token — not `-ink`/`-deep`): every occurrence is inside a
   hover/active/focus handler, the finale timeline, or the emission halo recipe. Nothing loud
   at rest in any story's initial frame. `[palette v2]`
5. Grep `gradient` and `bg-emission`: the only gradient is `bg-emission`, on star-emission
   elements only, halo diameter within `--halo-scale`; the hero `--gradient-breath` proposal
   is still commented out (or deleted after Shama's review) — never live without their yes.
   `[palette v2]`
6. Grep `#fff`, `shadow`, `blur`: only the focus recipe may match. Grep `#000`: only
   `--color-night`'s definition may match. `[palette v2]`
7. Tab through the page on the black ground AND on a card surface: the double ring is visible
   on both; the camera rail never traps or obscures focus at any scroll position. `[rev
   2026-07-11]`
8. Motion audit: only velvet/trace/kindle; durations from the scale; stagger groups ≤6; the
   idle shimmer obeys every line of its §4.4 cage (one star at a time, velvet, 2400ms swell,
   9000ms ±40% lull, constellation-viewport only); `prefers-reduced-motion` renders the
   fully-lit final page with no observers constructed, no shimmer, and the camera parked
   assembled by the CTA.
9. Constellation: plaque text is violet-ink (never rule colors, never deep) `[palette v2]`,
   edges use `--stroke-sky` with non-scaling stroke in violet-ink/violet-deep, stars are
   star-white, mobile gets the recomposed column, and every star's link target exists as a
   plain text link too.
10. Camera `[rev 2026-07-11; palette v2]`: violet-ink strokes (violet-deep receded, loud
    violet only alive), `--stroke-instrument` / `--stroke-sky` with non-scaling stroke, no
    fills; verify the scrub both directions in a real browser; one camera on screen at every
    scroll position; the flash fires once — star-white core, violet rays — on kindle, inside
    `--duration-finale`; text never collides with the rail at any breakpoint (else that
    breakpoint is finale-only).
11. Windows check: Fraunces 560 folio hairlines on a 1080p monitor; Playfair 500 italic quote
    in dim at its 24px floor on black (if thins sparkle, the fix is size, never weight);
    Sentient 18px/1.75 moon body on black for halation; Plex Mono 13px plaques in violet-ink
    on card; the camera's 1.25/1 stroke hierarchy still legible under bloom; violet still
    reads purple, not blue, on a cheap TN panel.
