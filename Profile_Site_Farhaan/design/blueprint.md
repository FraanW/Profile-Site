# Website blueprint — Farhaan's profile site

> **Status: owner-decided.** Produced in an interactive design session with Farhaan, 2026-07-10.
> This file records the owner's choices and is the binding textual plan of how the site looks and
> behaves. Where it conflicts with `design/direction.md` (Riker's three proposals), this file
> wins: the owner chose a fresh blend rather than one proposal as-is. Riker formalizes tokens
> from this file; Mimir reworks `context/content-map.md` to it; Lefler writes the words for its
> copy slots; Sindri builds it; Dwight audits everything against it plus the truth ledger.

---

## 1. Identity concept — The Graph

The site is a product graph of Farhaan. His flagship open-source work is literally the Unified
Product Graph, his daily work is agent systems over graphs, and the site's signature element is
a radial node graph with him at the center and projects radiating outward. No other portfolio
can claim this honestly; his can.

**Critical framing rule (owner, 2026-07-10):** capabilities are not graph branches. Every
project is product-thinking-related and every app is full-stack AI-native, so the graph never
sorts projects into capability buckets. The hero names the capabilities as the claim; the graph
shows the projects as the evidence; each node carries all three qualities.

## 2. Positioning shift (content consequence)

Owner direction, 2026-07-10, which Mimir must fold into the content map:

- **Lead with capability:** AI-native full-stack development, product thinking, and product
  management. That is the hero claim.
- **Then the evidence:** Adloom.ai, UPG, Entopo, LedgerLine, and the other projects.
- **De-emphasize** the venture-studio frame and the "20,000+ live advertising assets" figure
  (owner: "don't talk about the live ad assets maybe"). Adloom.ai stays a big project he worked
  on; the story is what he built, not the studio's numbers.
- All truth-ledger discipline still binds: funding claims per venture, NDA guardrails on Entopo,
  exact numbers, the works.

## 3. Typography

| Register | Face | Duty |
|----------|------|------|
| Display | **Playfair Display** (Google Fonts) | Name, headlines, section heads, card titles. Display sizes only (~28px+, or letterspaced caps small); never body text. Owner's requested face (replaced Josefin Sans, owner decision 2026-07-11). |
| Body | **Erode** (Indian Type Foundry, Fontshare) | All reading text: about, one-liners, card descriptions. Sharp editorial serif, Indian foundry, deliberate. |
| Technical | **Spline Sans Mono** (Google Fonts) | Node labels, stack rows, captions, figures, nav links, part labels on the airplane. The graph speaks machine. |

Three faces, three registers, strict separation. No neutral grotesk anywhere.

## 4. Palette — Emerald ink

| Role | Color intent | Use |
|------|-------------|-----|
| Ground | Bone white (≈ `#F7F5F0`) | Page background everywhere outside statement fields |
| Text | Near-black, green-tinted ink | All reading text |
| Statement | Deep emerald (≈ `#065F46`) | Hero color field, graph edges and node rings, section rules, the airplane's line-work |
| Accent | Bright leaf green | Sparingly: live/active graph marks, node-ring hover fill, one highlight per section max |

Feel: grounded, serious, quietly rich. No gradients, no glows, no blobs. Exact values, contrast
checks (including red/green-blind safety on emerald vs leaf), and dark-mode decision are Riker's
at token phase; the intent above binds.

## 5. Page map

```
/                         (landing)
├── thin top bar          farhaan (mono) ..... projects · contact
├── 1. hero               emerald field, type + living graph
├── 2. about              photo + 60-90 words, serif
├── 3. case tiles         2×2 minimal grid: Adloom.ai, UPG, Entopo, LedgerLine
├── 4. radial graph       static React Flow, Farhaan center ──▶ /projects
├── 5. signals            IEEE, dual degree, pedigree scan
├── 6. contact            CTA; the airplane's finale
└── footer                stack line, both emails, GitHub, LinkedIn, location

/projects                 (browse page)
├── same top bar (+ "◂ back" affordance)
├── intro line (one sentence, Lefler)
└── node-card grid        every project, 2-up desktop, 1-up mobile
```

The camera assembles along the right edge across the whole landing scroll (§8). (Owner decision
2026-07-11: the airplane is retired; a DSLR camera is the rail device — see §8.)

## 6. Landing page, viewport by viewport

### 6.1 Top bar

Thin, persistent, bone ground. Name in small mono left; "projects · contact" mono links right.
Disappears into the design; navigation should be conventional.

### 6.2 Hero — emerald field, living graph

- Full-viewport deep-emerald color field. This is the bold color statement.
- Name huge in Playfair Display, bone-white, with room to breathe.
- Capability claim under it (Lefler writes it; the raw material is: AI-native full-stack
  development, product thinking, product management; under 10 words headline + under 25 words
  support, per the writing law).
- **The living graph:** beside/behind the type, a small node graph draws itself once on load:
  nodes appear, emerald edges connect, done in under 2 seconds, then the hero is completely
  still. `prefers-reduced-motion` gets the final frame instantly.
- No photo in the hero. One primary action visible (scroll cue or contact), GitHub link present.

### 6.3 About — photo lives here

- One scroll down, on bone ground.
- Squared photo (document treatment, not avatar circle), mono caption (name, Chennai, year).
- 60 to 90 words of first-person serif text beside it. The title-versus-scope story, told
  capability-first. Owner supplies the photo asset before build.

### 6.4 Case tiles — minimal 2×2 grid

- Four tiles, owner-picked set: **Adloom.ai, UPG, Entopo, LedgerLine.**
- Very minimal per owner: Playfair title, one serif line, one mono proof/stack fragment, an
  arrow link. No images, no boxes-in-boxes.
- Tiles link to the corresponding full card (or case anchor) on `/projects`.
- Deals24.ai and Sanady.ai do NOT get tiles; they live as cards on `/projects` (funding
  discipline: Deals24 "raising at DIFC", never "raised"; Sanady no funding claim).
- Entopo tile copy stays inside the NDA-sayable block; UPG carries technical detail.
- Mobile: 2×2 holds if the tiles stay legible at half-width; otherwise stack to one column.
  Sindri decides at build with real copy; legibility beats layout fidelity.

### 6.5 Radial projects graph — the signature section

- **Farhaan at the center; projects radiate outward.** Each node: project name + one-line
  description (visible on desktop hover and mobile tap, or set statically beside nodes where
  space allows).
- **Implementation (owner-specified):** a graph library, React Flow or equivalent, rendered
  **static**: no pan, no zoom, no drag, and the default dotted background removed. Custom node
  and edge components so it looks like ours (emerald edges, ring nodes, mono labels), not like
  a flow-chart demo.
- Nodes are real links into `/projects` cards.
- Mobile reflow: same nodes and edges in a vertical constellation (center node top, nodes
  cascading down, edges still drawn) — a radial layout crushed to 390px is unreadable, a
  constellation keeps the identity. Owner may veto for a scaled radial at build preview.
- Section entry: edges draw in once on scroll-into-view (anime.js, §9).

### 6.6 Signals

Compact pedigree block for the panel scan: IEEE publication (with DOI link), dual degree (SNU
CGPA 8.75 + IIT Madras), hackathon finalist if space allows. Ruled emerald lines, mono labels,
serif detail. Content per Mimir's reworked map.

### 6.7 Contact — the finale

- One tiny ask, both emails (mdfarhaanhere@gmail.com primary pending owner confirmation,
  farhaan@theproductcreator.com alongside), GitHub, LinkedIn, location.
- **The camera lands here** (§8): the assembled camera glides from the right rail, settles by
  the CTA button, fires its shutter once with a capture flash-sparkle (owner revision
  2026-07-11), and delivers one short line. Owner's locked sentiment: "reach out to me with your ideas, let's build."
  (The lift-off flavor retired with the airplane, 2026-07-11.) **Lefler writes the shipped
  wording** so it carries exactly that energy while passing the writing law (no exclamation
  marks, no banned constructions); the sentiment is owner-locked, the letters are not.

### 6.8 Footer

One-line core stack (mono), both emails, GitHub, LinkedIn, location. Nothing else.

## 7. /projects page — node cards

The graph's nodes, grown into cards. Grid: 2-up desktop, 1-up mobile.

**Node card anatomy (top to bottom):**

1. Emerald ring marker ◉ + project name in Playfair Display (ring fills leaf-green on hover)
2. One- to two-line serif description (what it is, why it's hard)
3. Mono stack row (java 21 · spring · postgres rls · no orm)
4. Thin emerald rule
5. Proof figures in mono (exact ledger numbers only, never rounded)
6. Links row: ▸ github, ▸ live site / case study where they exist

**Card inventory** (final selection is Mimir's, inside the truth ledger): Adloom.ai, UPG,
Entopo (NDA-scoped card, links to entopo.app only), LedgerLine, Deals24.ai, Sanady.ai (no repo,
no funding claim, architecture story only), Research Orchestration Platform, ADCEA, Remedify
(conditional on the repo tidy-up). Every linked repo passes Dwight's public-README-matches-claims
check before shipping.

## 8. Motion system — anime.js runs everything

**Owner decision (2026-07-10, emphatic):** anime.js is the site's ONLY animation engine, and it
handles **every** scroll feature, **every** animation, **every** transition on the site — not
just the camera. This fully supersedes the repo's CSS-first motion default. No Framer Motion,
no CSS keyframes, no one-off CSS transitions: if it moves, anime.js moves it.

**Everything anime.js owns:**

- Hero: the living graph drawing itself on load (`svg.createDrawable` + timeline)
- Scroll: every section entry/reveal via `onScroll()` ScrollObservers (smooth `sync` mode
  site-wide for the buttery feel)
- The radial graph: edges drawing in on scroll-into-view, node ring hover fills
- Hovers and micro-interactions: nav links, card rings, buttons, arrow links
- Case tiles: staggered entry (`stagger()`)
- Page transition between `/` and `/projects` (View Transitions triggered/choreographed through
  anime.js where the browser allows; graceful cut where not)
- The camera: full mapping below
- Signals/contact reveals, footer, all of it

**Discipline (how "animate everything" stays tasteful instead of becoming slop):**

- **Character:** buttery smooth. Sections fade in with contrasting color moments: accent
  elements (rules, rings, edges) draw in emerald, content rises in ink on bone. Transform,
  opacity, and SVG `draw` only; no layout-shifting animation; 60fps or it gets cut.
- **Scroll reveals animate once.** Nothing loops, nothing floats idle. After a section has
  entered, it is still until the user interacts. Hover animations are the only repeatable motion.
- One shared easing vocabulary (2 or 3 named eases max, defined at token phase) so the whole
  site moves like one system, not a demo reel.
- **Reduced motion:** every animated element has a final-frame static state;
  `prefers-reduced-motion` gets all final frames and a plain CTA (no camera glide).
- **Performance guardrails:** SVG line-work only for the plane and graph, lazy-mount below-fold
  animation, no scroll-jacking (native scroll speed is never hijacked), Lighthouse stays green
  or Darryl bounces it.

### The camera — blueprint line-art, scroll-assembled

> **Owner decision, 2026-07-11: the fighter jet is retired.** The rail device is now a DSLR
> camera, modeled on the exploded camera sequence on animejs.com (the "A lightweight and
> modular API" section, verified in-browser 2026-07-11: the lens tips into 3/4 view, explodes
> into a pencil-style engineering drawing with small labeled callouts per part, and scroll
> scrubs the assembly together and apart bidirectionally, smoothed — never a one-shot play).
> The rail-journey structure below is unchanged; the object, its finale, and the scrub
> behavior change.

The site's storytelling device, owner-specified, styled to read as an engineer's artifact:

- **Style:** an exploded engineering drawing of a DSLR camera in thin emerald strokes (lens
  barrel, aperture ring, body, pentaprism, shutter). **No part labels** (owner revision
  2026-07-11: the drawing carries itself; the mono callouts are removed). Not a cartoon, no
  fills beyond the palette, no gradients.
- **Behavior (camera-demo scrub):** parts **fade into existence** and drift together as the
  visitor scrolls, scrubbed with ScrollObserver smoothing; scrolling back up **undoes the
  assembly** — parts drift apart and fade back out (bidirectional, must be verified in a real
  browser both directions). By the signals section it is a clean line-silhouette camera.
- **One camera only:** the finale camera is a hand-off from the rail silhouette, never a
  duplicate. At no scroll position do two cameras render at once (owner caught the rail copy
  still visible at the footer while the finale camera sat at the CTA, 2026-07-11).
- **Finale:** at the contact section the finished camera glides out of the right rail, settles
  by the CTA button, and fires its shutter once **with a capture flash: the aperture blink
  plus a brief flash-sparkle burst radiating from the lens** to pull the viewer's eye to the
  CTA (owner revision 2026-07-11, supersedes the earlier no-flash rule; it fires once, stays
  in the palette, and is drawn with transform/opacity only). Then it delivers its one
  Lefler-written line (§6.7).
- **Mobile (owner choice: slim right edge):** the full assembly runs on mobile too, smaller,
  hugging the right margin, **never overlapping text** — collision-checked at every breakpoint
  with real copy. If a breakpoint cannot guarantee clean separation, that breakpoint degrades
  to finale-only rather than overlapping content.
- **Metaphor note (for Dwight):** the camera is owner-chosen aesthetic-first, from the
  anime.js reference. The sayable story is "assemble the instrument, then take the shot":
  build it properly first, capture the moment when it counts. No factual claim rides on it.

### anime.js v4 implementation mapping (verified against animejs.com docs, 2026-07-10)

The library covers every beat of the device natively; no second animation dependency needed.

| Beat | anime.js v4 API |
|------|-----------------|
| Emerald line-work drawing itself (camera parts, graph edges, section rules) | `svg.createDrawable()` on `<path>/<line>/<polyline>/<rect>`, animating the `draw` property (`'0 0' → '0 1'`) |
| Scroll-linked assembly progress | `autoplay: onScroll({ ... })` on a `createTimeline()`; `enter`/`leave` thresholds pin the assembly to the landing scroll range |
| The "buttery" feel | ScrollObserver's smooth-scroll `sync` mode: a 0–1 smoothing value makes progress ease toward scroll position instead of tracking it 1:1 |
| Parts drifting together + labels fading | one master `createTimeline()`: per-part transform/opacity tweens, `stagger()` for the mono labels |
| The finale glide onto the CTA | `svg.createMotionPath(glidePath)` returns `translateX/translateY/rotate` tweens; spread into an `animate()` call and the camera glides along an authored SVG path to the button, then the aperture blink + capture flash-sparkle plays as a short timeline |
| React integration + responsive variants | `createScope()` with media queries: desktop full-assembly vs. mobile slim-edge variants declared once, cleaned up on unmount |
| Reduced motion | gate every scope behind `prefers-reduced-motion`; matching users get final-frame statics (`draw: '0 1'`, camera pre-assembled at rest by the CTA, no ScrollObservers created) |

## 9. Rules that still bind (unchanged by any of the above)

1. **Truth ledger:** every claim traces to `context/profile.md`. Funding discipline per venture.
   Exact numbers, never rounded up.
2. **Entopo NDA guardrails:** absolute, everywhere the name appears (tiles, cards, graph nodes).
3. **Writing law:** `shared/writing-style.md` governs every visitor-facing word, including the
   plane's line, node one-liners, and card microcopy. No em dashes in site copy.
4. **Accessibility:** the graph and camera are decorative-plus; all content they carry is also
   available as text/links. Keyboard and screen-reader paths never depend on hover, motion, or
   the graph. Contrast AA minimum on every pairing.
5. **Dwight gates before ship**, as three hostile readers, against this blueprint + the ledger.

## 10. Follow-ups (in order)

1. **Owner approves this blueprint** (or edits it — it's his site).
2. **Riker:** `design/tokens.md` + Tailwind v4 token config from §3–§4; retire the unchosen
   parts of `direction.md` with a decision note.
3. **Mimir:** rework `context/content-map.md` to the §5 page map and §2 positioning shift
   (capability-led, 4 tiles, /projects page, de-emphasized assets figure) — then owner re-approves.
4. **Lefler:** hero claim, tile one-liners, card copy, the camera's line — after the reworked map.
5. **Sindri:** scaffold Next.js 16 + Tailwind v4; build order: layout + tokens → hero → tiles →
   graph → cards page → camera choreography last (it touches everything).
6. Still open from Mimir's earlier questions: primary mailto confirmation, what Contact invites,
   decision color for Adloom/Deals24, Remedify repo tidy-up, current UPG API count, deals24.ai
   link check, photo asset delivery.
