# Design tokens — Farhaan's profile site

> **Status: binding.** Written by Riker, 2026-07-10, implementing `design/blueprint.md` §3
> (typography), §4 (palette), §8 (motion) exactly. **Revised by Riker, 2026-07-11: display face
> changed from Josefin Sans to Playfair Display (owner decision 2026-07-11, blueprint §3 already
> amended).** Every display-register value in §2 and §5 was re-judged for the new face, not
> carried over; the reasoning is inline. Body (Erode) and technical (Spline Sans Mono) registers
> are untouched, as is all of §4 motion. Where the blueprint gave approximate values,
> the exact values here supersede them; every deviation is flagged inline with its reason.
> The Tailwind v4 `@theme` block in §5 is the contract: Sindri pastes it verbatim into the app's
> token stylesheet. The prose in §1–§4 explains it and adds the rules a stylesheet can't express.
> All contrast figures below were computed (WCAG 2.x relative luminance), not estimated.

---

## 1. Color — Emerald ink

Four colors and their derived tints. No gradients, no glows, no shadows anywhere: elevation in
this system is expressed by rule and surface, never by material lift. If a color is not in this
table it does not exist on the site (the `@theme` block wipes Tailwind's default palette).

### 1.1 Tokens

| Token | Value | Role |
|-------|-------|------|
| `--color-bone` | `#F5F6EE` | Ground. Page background everywhere outside statement fields. |
| `--color-card` | `#FBFBF5` | Card/tile surface: a half-step lighter than ground, paper-on-desk. Always paired with a `rule-faint` hairline border; the surface step alone (1.05:1) is deliberately subliminal. |
| `--color-ink` | `#16211A` | All reading text. Near-black, green-tinted. |
| `--color-steel` | `#4C5952` | Muted/secondary text: captions, meta, de-emphasized lines. |
| `--color-emerald` | `#065F46` | Statement. Hero field, graph edges and node rings, section rules, camera line-work, links. |
| `--color-emerald-deep` | `#044A37` | Hover/active state of emerald elements (links, rings). One perceptible step darker. |
| `--color-leaf` | `#34CC73` | Accent, sparingly: live/active graph marks, node-ring hover fill, one highlight per section max. **Never text. Never a fill without an emerald or ink boundary.** |
| `--color-rule` | `#C0D5C9` | Quiet ruling: signals rows, structural hairlines. (Emerald at 22% over bone, flattened.) |
| `--color-rule-faint` | `#D8E4DA` | Faintest ruling: card borders, photo border. (Emerald at 12% over bone.) |
| `--color-bone-muted` | `#B7CFC2` | Secondary text on the emerald hero field only. (Bone at 74% over emerald.) |

Deviations from blueprint approximations, with reasons:

- **Bone `#F7F5F0` → `#F5F6EE`.** The blueprint's value is warm-neutral (R > G > B). Tipping the
  green channel highest puts the ground on the same temperature as the emerald system and keeps
  it clear of the AI-default warm cream.
- **Emerald kept exactly `#065F46`.** It passes AA for normal text in both directions on this
  bone (7.06:1); drifting it would buy nothing.

### 1.2 Contrast audit (computed)

AA thresholds: 4.5:1 normal text, 3:1 large text (≥24px, or ≥18.7px bold) and non-text UI.

| Pairing | Ratio | Verdict |
|---------|-------|---------|
| ink `#16211A` on bone `#F5F6EE` | 15.24 | AAA all sizes |
| ink on card `#FBFBF5` | 15.96 | AAA all sizes |
| steel `#4C5952` on bone | 6.75 | AA normal text (AAA large) |
| steel on card | 7.07 | AA normal text (AAA large) |
| emerald `#065F46` on bone (links, accent text) | 7.06 | AA normal text (AAA large) |
| emerald on card | 7.40 | AA normal text (AAA large) |
| emerald-deep `#044A37` on bone (hover) | 9.46 | AAA all sizes |
| **bone on emerald (hero name, hero body)** | **7.06** | **AA normal text — the hero field is safe at any type size** |
| bone-muted `#B7CFC2` on emerald (hero secondary) | 4.65 | AA normal text |
| leaf `#34CC73` on emerald (live marks, ring fills) | 3.67 | Passes 3:1 non-text UI |
| leaf on bone | 1.92 | **Fails — see prohibition below** |
| rule `#C0D5C9` on bone | 1.42 | Decorative only; carries no meaning |

### 1.3 Hard color rules

1. **Leaf is never text, anywhere.** 1.92:1 on bone. On bone, accent *text* is always emerald
   (7.06:1). Leaf appears only as a fill or mark bounded by an emerald ring, an ink glyph, or the
   emerald field itself (where it clears 3:1).
2. **Color-blind rule (blueprint §4): emerald vs leaf is never hue-only.** They are the same hue
   family separated by lightness (dark vs bright), which survives every CVD type — but no state
   may depend on even that alone. Every leaf-signaled state pairs with a second channel:
   node-ring hover = leaf fill **+ ring weight increase**; live/active mark = leaf dot **+ mono
   text label**; section highlight = leaf mark **+ weight or rule change**. Dwight checks this
   per component.
3. **Links are emerald and underlined** on bone/card; bone and underlined on the emerald field.
   Color is never the only link affordance. Hover: emerald-deep (bone context) / underline-offset
   shift (emerald context).
4. **Focus is a double ring, one recipe site-wide:** inner 2px bone, outer 2px emerald
   (`box-shadow: 0 0 0 2px bone, 0 0 0 4px emerald`). On bone grounds the emerald outer ring
   carries the 3:1; on the emerald hero the bone inner ring carries it. No single color can pass
   on both grounds (computed: impossible), which is why the recipe is layered. Base-layer CSS for
   this ships in §5.
5. **Selection:** emerald background, bone text (7.06:1). One more place the system speaks.
6. **Dark mode: none at v1.** The direction's ground rule stands (one light mode, done
   excellently); the emerald hero already gives the site its dark moment. Revisit only if it ever
   costs nothing, which for a hand-tuned four-color system it does not.

---

## 2. Typography

Three faces, three registers, strict separation (blueprint §3). No neutral grotesk anywhere.
Body serif is the default voice: the `@theme` block sets Erode as the default font family, and
Playfair/mono are opt-in per element.

Two of the three faces are now serifs (Playfair display, Erode body). They never meet at the
same size — the display floor is 28px, the largest body step tops out at 22px — and the contrast
gap does the rest: Playfair's hairline flick against Erode's sturdy low-contrast cut keeps the
registers unmistakable even to a reader who couldn't name either face.

### 2.1 Faces, sourcing, weights to load

| Register | Face | Source | Load exactly | Fallback stack |
|----------|------|--------|--------------|----------------|
| Display | Playfair Display | Google Fonts via `next/font/google` | **500, 600** (no italic) | `"Playfair Display", "Palatino Linotype", "Book Antiqua", Georgia, serif` |
| Body | Erode | Fontshare (ITF) via `next/font/local` — download woff2, self-host | **400, 500** | `"Erode", Georgia, "Times New Roman", serif` |
| Technical | Spline Sans Mono | Google Fonts via `next/font/google` | **400, 500** | `"Spline Sans Mono", ui-monospace, "Cascadia Mono", Consolas, monospace` |

Six font files total. No italics at v1 (the writing law barely italicizes; Playfair's italic is
handsome but unused — add it, or Erode 400 italic, later only if Lefler's copy demands it).
Nothing below Playfair 500 at v1: 400 reads frail as bone-on-emerald at hero size on a 1080p
Windows monitor, and the face has no thinner temptations anyway — its range starts at 400.

**Loading (Sindri):** Playfair Display is a variable font (wght 400–900, plus a separate italic
variable), but display-only duty means we subset hard. In `next/font/google`, request exactly
`weight: ['500', '600']`, `style: 'normal'`, `subsets: ['latin']`, `display: 'swap'` — two
compact static slices, no italic axis, no 700–900, no latin-ext. Do **not** load the full
variable range: four named steps across two weights cannot justify shipping a 400–900 axis. The
same aggressive-subset logic already governs Erode and the mono; Playfair simply joins it.

### 2.2 Playfair's law, enforced in the tokens

Blueprint §3: Playfair at display sizes (~28px+) or letterspaced caps only, never body. The scale
below makes violation structurally impossible: **the only steps that carry `font-display` are
`hero`, `display`, `title`, and `eyebrow`.** The first three never render below 28px at any
viewport (clamp minimums are pinned at or above it); `eyebrow` is the letterspaced-caps branch
(14px, 0.12em tracking, uppercase, 600). If a design need appears for Playfair below 28px, the
answer is eyebrow caps or a different face — never smaller Playfair lowercase. Playfair is a
display face by design: below display sizes its hairlines are a liability, and the law protects
us from ourselves.

**The letterspaced-caps treatment survives the face change — re-judged, not inherited.** Tracked
caps in a high-contrast serif is the engraved-plate device, and it fits this site's document
identity better than Josefin's geometric caps ever did. Caps also dodge the two things that make
small Playfair dangerous: no x-height in play, and no delicate lowercase joins. Three
adjustments, each with a reason:

- **Size 13px → 14px.** At 13px Playfair's cap-height lands near 9px and the hairline serifs
  start to evaporate on ClearType; 14px (cap-height ≈ 10px) keeps them alive.
- **Tracking 0.14em → 0.12em.** Playfair's caps are wider than Josefin's compact geometric caps,
  and their serifs already put horizontal rhythm into the letter gaps; at 0.14em the line reads
  gappy instead of engraved.
- **Weight stays 600.** Not for hierarchy — the hairlines simply need the ink at this size.

The considered alternative — handing eyebrows to the mono — was rejected: it would collapse the
display and technical registers into one voice, and a small tracked-uppercase mono eyebrow is
the single most templated move in AI-generated portfolios. Escape hatch if the Windows check
fails: eyebrow weight goes to 700 (load it then, not before). The size and the face do not move.

Rendering notes for Sindri (Windows-checked):

- Playfair Display is the optical opposite of the face it replaced: tall x-height, large wide
  caps, short extenders. It runs visually **larger** than its px size where Josefin ran smaller.
  The old ~0.06em top-compensation hack for centering display caps is retired; center Playfair
  normally and eyeball it. Do not compensate for its size by shrinking below the scale — the
  steps in 2.3 were re-judged for Playfair's optics already.
- Playfair's risk on Windows is contrast, not metrics: hairlines can band or thin to nothing at
  small sizes on ClearType. Two checkpoints on a 1080p monitor: `eyebrow` (14px caps) and
  `title` (28px). The sanctioned fix at eyebrow is weight 700 (see above); at title there is no
  self-serve fix — if 600 at 28px fails on the target monitor, escalate to Riker, don't
  improvise.
- Erode at 18px/1.7 is the reading voice; below 16px switch to mono or steel-colored Erode 16px,
  never smaller serif.
- Mono labels are lowercase by default (per blueprint card anatomy: `java 21 · spring ·
  postgres rls`); if a label must be uppercase, add +0.08em tracking on top of the step's value.

### 2.3 Type scale — named steps

All steps ship in the `@theme` block with size, line-height, letter-spacing, and weight as
Tailwind v4 sub-tokens, so `text-hero` etc. apply the full setting in one class. Tailwind's
default text scale is wiped: this closed set is the scale.

| Step | Size | Line height | Tracking | Face / weight | Duty |
|------|------|-------------|----------|---------------|------|
| `hero` | `clamp(2.875rem, 1.5rem + 6.9vw, 6rem)` (46→96px) | 1.05 | −0.015em | Playfair 500 | The name on the emerald field. Clamp floor: min 46px. |
| `display` | `clamp(1.75rem, 1.35rem + 2vw, 2.625rem)` (28→42px) | 1.12 | −0.01em | Playfair 600 | Section heads. Min pinned at the 28px display floor. |
| `title` | `1.75rem` (28px, fixed) | 1.25 | 0 | Playfair 600 | Card and tile titles. Sits exactly on the floor. |
| `eyebrow` | `0.875rem` (14px) | 1 | **0.12em, uppercase** | Playfair 600 | Eyebrows, nav-adjacent labels. The caps branch. |
| `lede` | `clamp(1.1875rem, 1.05rem + 0.7vw, 1.375rem)` (19→22px) | 1.55 | 0 | Erode 400 | Hero support line, about opener, /projects intro. |
| `body` | `1.125rem` (18px) | 1.7 | 0 | Erode 400 | All reading text. |
| `body-sm` | `1rem` (16px) | 1.6 | 0 | Erode 400 | Dense serif moments (tile one-liners if space demands). |
| `stat` | `1.375rem` (22px) | 1.3 | 0 | Mono 500 | Proof figures on cards and signals. Numbers are first-class. |
| `mono` | `0.875rem` (14px) | 1.5 | 0.01em | Mono 400 | Stack rows, nav links, node labels, top-bar name. |
| `label` | `0.75rem` (12px) | 1.4 | 0.03em | Mono 400 | Camera part labels, photo caption, figure captions. |

Re-judged for Playfair, 2026-07-11 — what changed against the Josefin values and why:

- **Sizes kept, one exception (eyebrow 13→14px, see 2.2).** Playfair runs optically larger at
  equal px, so keeping the clamps raises the presence of every display step for free; the 28px
  floor, which was borderline-display in Josefin, now reads comfortably display. The hero max
  stays 96px: large Playfair is the payoff of this face — that is where the hairline contrast
  performs — and trimming it would spend the owner's decision buying nothing.
- **Line-heights opened up: hero 1.02→1.05, display 1.08→1.12, title 1.2→1.25.** Josefin's low
  x-height left visual air inside its own line box; Playfair fills its box with tall lowercase
  and large caps, so the old values would read tighter than they used to. These keep the same
  optical leading. Hero 1.05 also protects the name's two-line mobile wrap from cap collisions.
- **Tracking flipped sign: +0.005em → −0.015em (hero) and −0.01em (display); title +0.01em → 0.**
  A geometric sans wanted a whisper of positive air. A transitional serif at display sizes wants
  the opposite: Playfair's serifs already fit the letters to each other, and at 96px default
  spacing reads loose. Negative tracking scales with size — most negative at hero, zero by the
  28px floor, and positive only in the caps branch.

Weight vocabulary: Playfair 500 for the hero, 600 for display, title, and eyebrow; Erode 400
with 500 for in-line emphasis; mono 400 with 500 for figures. The hero running one step
*lighter* than the smaller display steps is deliberate, twice over: light-on-dark halation makes
bone type on the emerald field read about a half-weight heavier than it is, and Playfair 600 at
96px turns lush and dense where Josefin 600 stayed airy — 500 keeps the hero's air and lets the
hairline contrast do the display work. Below the hero the compensation runs the correct optical
direction, bolder-as-smaller, because Playfair's hairlines thin toward extinction as sizes fall.
Nothing above 600 exists at v1 even though the face runs to 900; the system's authority still
comes from the ruling and the numbers, not from heavy type.

---

## 3. Space, rules, radii, measures, breakpoints

### 3.1 Spacing

Tailwind v4's default 4px-base scale stays (it is a good scale; replacing it buys nothing).
Three semantic additions:

| Token | Value | Reason |
|-------|-------|--------|
| `--spacing-section` | `clamp(4.5rem, 3rem + 7vw, 8rem)` (72→128px) | Vertical rhythm between landing sections. Fluid so the page breathes on desktop without ballooning on phones. |
| `--spacing-rail` | `6rem` (96px) | Right rail reserved for the camera, ≥`md`. Landing sections pad right by this; the camera owns it. |
| `--spacing-rail-sm` | `2.75rem` (44px) | The slim right edge on mobile (blueprint §8, owner choice). If real copy cannot keep clear of 44px at some breakpoint, that breakpoint degrades to finale-only per blueprint — the rail never shrinks below this. |

### 3.2 Rules and strokes

One ruling weight, two inks; the drawing stroke is its own token because anime.js draws it.

| Token | Value | Use |
|-------|-------|-----|
| Hairline rule | `1px` solid `--color-rule` | Quiet structure: signals rows, dividers inside dense blocks. |
| Faint rule | `1px` solid `--color-rule-faint` | Card borders, tile separations, photo border. |
| Statement rule | `2px` solid `--color-emerald` | One per section maximum: the section-opening rule that draws in on scroll. Card-internal emerald rules (node-card anatomy §7) are 1px emerald. |
| `--stroke-draw` | `1.5` (SVG units) | Graph edges, node rings, camera line-work. Apply `vector-effect: non-scaling-stroke` so responsive scaling never fattens the drawing. |
| `--stroke-hair` | `1` (SVG units) | Camera part-label leader lines, secondary graph marks. |

### 3.3 Radii — squared, one exception

`--radius-*` is wiped. **Every rectangle on the site is square:** cards, tiles, buttons, the
photo, inputs. The single exception is `--radius-node: 9999px` for the graph's node rings and
live dots. The rule is nameable and it is the identity: *the only circles on this site are the
graph's nodes.* That is what makes the nodes read as the signature element instead of one more
rounded card.

### 3.4 Measures and containers

| Token | Value | Use |
|-------|-------|-----|
| `--container-prose` | `60ch` | Erode reading measure (about, card descriptions, case copy). |
| `--container-narrow` | `42ch` | Hero support line, tile one-liners, intro lines. |
| `--container-site` | `70rem` (1120px) | Page shell max-width, before the rail is added. |

### 3.5 Breakpoints

Tailwind defaults stay (640/768/1024/1280). What binds is the mapping:

| Behavior | Breakpoint |
|----------|-----------|
| /projects node-card grid 1-up → 2-up | `md` (768px) |
| Case tiles 2×2 | ≥`sm` (640px) if legible with real copy; below, or if Sindri's legibility call says so, 1-column (blueprint §6.4: legibility beats layout fidelity) |
| Radial graph → vertical constellation | radial ≥`lg` (1024px); constellation below |
| Camera rail 44px → 96px | `md` (768px) |

---

## 4. Motion — anime.js vocabulary

**anime.js v4 is the sole engine** (owner mandate, blueprint §8). No CSS keyframes, no CSS
transitions, no Framer Motion: if it moves, anime.js moves it. The only CSS-declared visual
change permitted is the focus ring recipe (§1.3), which is a state, not an animation.

Tokens live as CSS custom properties (§5) so they are inspectable and single-source; Sindri
mirrors them into one motion constants module (read them once via `getComputedStyle` at scope
creation, or hand-copy with a comment pointing here — either way this file is the source of
truth and the values must match).

### 4.1 Named eases — three, no more

| Token | Value | Duty |
|-------|-------|------|
| `--ease-glide` | `cubic-bezier(0.22, 1, 0.36, 1)` | The workhorse. Every entry, reveal, fade-rise, stagger. Fast out of the gate, long soft landing: the buttery character. |
| `--ease-draw` | `cubic-bezier(0.65, 0, 0.35, 1)` | SVG line drawing only (rules, edges, rings, camera parts). Symmetric in-out reads as a hand drawing a line, not a value tweening. |
| `lift` (spring) | `createSpring({ mass: 1, stiffness: 80, damping: 14, velocity: 0 })` | The camera's finale glide and its landing settle; nothing else. Springs are expensive attention; one device gets one. (Name predates the camera swap, 2026-07-11; kept.) Parameters live as raw vars in §5. |

### 4.2 Duration scale

| Token | Value | Duty |
|-------|-------|------|
| `--duration-micro` | `150ms` | Hovers: link underlines, ring fills, arrow nudges. |
| `--duration-enter` | `450ms` | Section content reveals (fade + rise). |
| `--duration-draw` | `900ms` | A rule, edge set, or ring drawing in. |
| `--duration-flight` | `1800ms` | Total budget for the hero graph's self-draw AND for the finale glide. The blueprint's "done in under 2 seconds" is this token; nothing may exceed it. (Name predates the camera swap, 2026-07-11; kept.) |
| `--stagger-step` | `60ms` | `stagger()` interval for tiles, labels, node groups. Cap any stagger group at ~6 items (360ms spread) so late items don't feel forgotten. |
| `--reveal-rise` | `14px` | The translateY distance for content rising in. Small on purpose; sections settle, they do not leap. |

### 4.3 Scroll

- **`--scroll-sync: 0.2`** — the site-wide ScrollObserver smooth `sync` value (blueprint §8: one
  smoothing value, buttery everywhere). Lower is smoother but laggier; 0.2 keeps the camera
  assembly close enough to scroll position that it never feels detached. Never below 0.1, never
  per-section overrides: one value is what makes the whole site move like one system.
- The finale glide is **not** scroll-synced: it is a triggered timeline (enters once when the
  contact section arrives) using `lift`.

### 4.4 Hard rules (restating blueprint discipline as token law)

1. **Scroll reveals fire once.** After a section has entered it is still. Hover is the only
   repeatable motion.
2. **Transform, opacity, and SVG `draw` only.** Nothing animates layout; 60fps or it gets cut.
3. **Reduced motion:** `prefers-reduced-motion` gets final frames — `draw: '0 1'`, content at
   rest opacity/position, camera pre-assembled at rest by the CTA, and **no ScrollObservers are created at
   all** (gate the scopes, don't pause them).
4. Nothing loops, nothing floats idle, no scroll-jacking: native scroll speed is never touched.

---

## 5. The Tailwind v4 `@theme` block — the contract

Paste verbatim into the app's global stylesheet, below `@import "tailwindcss";`. The wipes at
the top are deliberate: color, font, text, radius, and shadow namespaces are closed sets — if a
value is not defined here, the utility does not exist, and that is the enforcement mechanism.
(Escape hatch for genuine emergencies: arbitrary values like `text-[15px]` remain possible and
are greppable, so Dwight can audit every exception.)

```css
@theme {
  /* ---- closed sets: wipe Tailwind defaults ---- */
  --color-*: initial;
  --font-*: initial;
  --text-*: initial;
  --radius-*: initial;
  --shadow-*: initial; /* no shadows: elevation is rule + surface, never lift */

  /* ---- color: Emerald ink (see tokens.md §1 for contrast audit) ---- */
  --color-bone: #F5F6EE;         /* ground */
  --color-card: #FBFBF5;         /* card surface; always with rule-faint border */
  --color-ink: #16211A;          /* reading text        — 15.24:1 on bone */
  --color-steel: #4C5952;        /* muted text          —  6.75:1 on bone */
  --color-emerald: #065F46;      /* statement + links   —  7.06:1 on bone; bone on it 7.06:1 */
  --color-emerald-deep: #044A37; /* hover state         —  9.46:1 on bone */
  --color-leaf: #34CC73;         /* accent, NEVER text  —  3.67:1 on emerald (UI only) */
  --color-rule: #C0D5C9;         /* quiet ruling, decorative */
  --color-rule-faint: #D8E4DA;   /* faintest ruling: card borders */
  --color-bone-muted: #B7CFC2;   /* secondary text on emerald field only — 4.65:1 */

  /* ---- type: three faces, three registers ---- */
  --font-display: "Playfair Display", "Palatino Linotype", "Book Antiqua", Georgia, serif;
  --font-serif: "Erode", Georgia, "Times New Roman", serif;
  --font-mono: "Spline Sans Mono", ui-monospace, "Cascadia Mono", Consolas, monospace;
  --default-font-family: var(--font-serif); /* Erode is the default voice */
  --default-mono-font-family: var(--font-mono);

  /* ---- type scale: the only Playfair steps are hero/display/title/eyebrow ---- */
  --text-hero: clamp(2.875rem, 1.5rem + 6.9vw, 6rem);
  --text-hero--line-height: 1.05;
  --text-hero--letter-spacing: -0.015em;
  --text-hero--font-weight: 500; /* one step lighter than display/title: see tokens.md 2.3 */

  --text-display: clamp(1.75rem, 1.35rem + 2vw, 2.625rem); /* min = 28px display floor */
  --text-display--line-height: 1.12;
  --text-display--letter-spacing: -0.01em;
  --text-display--font-weight: 600;

  --text-title: 1.75rem; /* fixed on the 28px floor */
  --text-title--line-height: 1.25;
  --text-title--letter-spacing: 0;
  --text-title--font-weight: 600;

  --text-eyebrow: 0.875rem; /* the letterspaced-caps branch: use with uppercase */
  --text-eyebrow--line-height: 1;
  --text-eyebrow--letter-spacing: 0.12em;
  --text-eyebrow--font-weight: 600;

  --text-lede: clamp(1.1875rem, 1.05rem + 0.7vw, 1.375rem);
  --text-lede--line-height: 1.55;

  --text-body: 1.125rem;
  --text-body--line-height: 1.7;

  --text-body-sm: 1rem;
  --text-body-sm--line-height: 1.6;

  --text-stat: 1.375rem; /* proof figures: mono 500 */
  --text-stat--line-height: 1.3;
  --text-stat--font-weight: 500;

  --text-mono: 0.875rem;
  --text-mono--line-height: 1.5;
  --text-mono--letter-spacing: 0.01em;

  --text-label: 0.75rem; /* camera part labels, captions */
  --text-label--line-height: 1.4;
  --text-label--letter-spacing: 0.03em;

  /* ---- measures ---- */
  --container-prose: 60ch;
  --container-narrow: 42ch;
  --container-site: 70rem;

  /* ---- semantic spacing (default 4px scale stays) ---- */
  --spacing-section: clamp(4.5rem, 3rem + 7vw, 8rem);
  --spacing-rail: 6rem;       /* camera right rail, >= md */
  --spacing-rail-sm: 2.75rem; /* slim right edge, < md */

  /* ---- radii: squared system; the only circles are the graph's nodes ---- */
  --radius-node: 9999px;

  /* ---- motion eases (anime.js reads these; see tokens.md section 4) ---- */
  --ease-glide: cubic-bezier(0.22, 1, 0.36, 1); /* every entry and reveal */
  --ease-draw: cubic-bezier(0.65, 0, 0.35, 1);  /* SVG line drawing only */
}

/* Non-utility tokens: motion scalars + SVG strokes.
   Source of truth for the anime.js constants module. */
:root {
  --duration-micro: 150ms;
  --duration-enter: 450ms;
  --duration-draw: 900ms;
  --duration-flight: 1800ms; /* hard budget: hero self-draw AND finale glide */
  --stagger-step: 60ms;
  --reveal-rise: 14px;
  --scroll-sync: 0.2;        /* site-wide ScrollObserver smooth sync value */
  --spring-lift-mass: 1;     /* createSpring params for the camera finale only */
  --spring-lift-stiffness: 80;
  --spring-lift-damping: 14;
  --stroke-draw: 1.5;        /* SVG units; pair with vector-effect: non-scaling-stroke */
  --stroke-hair: 1;
}

/* Base-layer recipes: system-level, ship with the tokens. */
@layer base {
  /* Focus: double ring, works on bone AND emerald grounds (tokens.md 1.3). */
  :where(a, button, input, textarea, select, summary, [tabindex]):focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px var(--color-bone),
      0 0 0 4px var(--color-emerald);
  }

  ::selection {
    background: var(--color-emerald);
    color: var(--color-bone);
  }
}
```

---

## 6. Sign-off checklist (what Riker reviews the build against)

1. No Playfair below 28px except uppercase `eyebrow`/tracked caps. Grep for `font-display` +
   small text classes.
2. No leaf-colored text, no leaf fill without an emerald/ink boundary, no leaf-only state.
3. Every emerald/leaf state has its second channel (weight, fill, shape, label).
4. Focus ring visible on the emerald hero field and on bone (tab through both).
5. No shadows, no gradients, no radius except `--radius-node` on node marks.
6. One statement rule per section; hairlines carry structure, never texture.
7. Motion uses only the three named eases and the duration scale; hero draw and finale each
   complete inside `--duration-flight`; reduced-motion path shows final frames with zero
   observers created.
8. Windows check (Playfair hairlines on ClearType): `eyebrow` 14px caps and `title` 28px on a
   1080p monitor, plus the hero at its 46px clamp floor; Erode 18px body legibility on the same
   monitor. Eyebrow failure → weight 700 per §2.2; title failure → back to Riker.
