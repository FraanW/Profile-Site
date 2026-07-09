# Design direction — Farhaan's profile site

> **DECISION (owner, 2026-07-10): none of the three chosen as-is.** In an interactive session
> Farhaan built a fresh blend, recorded as the binding plan in `design/blueprint.md`: identity
> "The Graph" (radial project graph, static React Flow), Emerald ink palette, Double Entry's
> type stack (Josefin Sans / Erode / Spline Sans Mono), node cards on a separate /projects page,
> anime.js as the sole engine for every animation, transition, and scroll feature, headlined by
> a scroll-assembled blueprint-line-art airplane. This file stays as the
> exploration record; where it conflicts with blueprint.md, blueprint.md wins. Riker's next
> deliverable: tokens from the blueprint.

> **Status: proposal. Three named directions; owner picks one, then it binds.**
> Written by Riker, 2026-07-10. Inputs: root `CLAUDE.md`, `shared/persona.md`,
> `shared/writing-style.md`, `Profile Site - Farhaan/context/profile.md` (Phase 1 locked).
> Owner input 2026-07-10: Farhaan wants **Josefin Sans** in the typography. It is honored where
> it genuinely fits (Direction 1, as the display face) and deliberately not forced into the other
> two; see Direction 1's rationale for what it buys and costs.
> No tokens, no component specs in this file. Direction only.

## The design problem

The site must make two claims stick in one visual system: he ships MVPs fast enough to raise
money, and he engineers properly enough to deserve the money. Most portfolios pick a costume for
one claim (playful = hacker, austere = engineer) and lose the other. The identity here has to
carry the tension itself: "moves like a hacker, builds like an engineer," read by a founder on a
phone in under a minute and by a staff engineer on desktop who is allergic to inflation.

His raw material is unusually good for this: money outcomes (Adloom seed raised, Deals24 raising
at DIFC), production numbers (20,000+ live assets, 5 hours to 5 minutes), a published IEEE DOI,
an open-source standard on npm, and LedgerLine, a hand-built double-entry ledger. The design's
job is to make the evidence look inevitable, not decorated.

## Ground rules common to all three directions

These hold regardless of which direction wins:

- **Light ground, one mode, done excellently.** Every AI-generated dev portfolio is dark. A
  confident light site is itself a differentiator, reads better in the contexts our audiences
  actually open links (office monitors, phones outdoors, shared in chat), and leaves the dark
  space free for Shama's future identity. A dark mode ships only if it costs nothing.
- **No product-screenshot dependency.** Entopo is NDA-bound, Sanady was architecture work, and
  browser-chrome mockups are the fastest route to template-land anyway. Case-study layouts must
  carry their weight with typography, numbers, and linked artifacts (DOI, npm, GitHub, live
  domains). If a layout slot demands a screenshot to work, the layout is wrong.
- **Numbers are first-class citizens.** His best evidence is numeric. Whatever the direction,
  numerals get deliberate treatment: tabular figures where they align, real scale contrast, never
  buried in body text.
- **The photo is a document, not a hero.** Owner confirmed a photo. In all three directions it is
  treated as evidence about a real person (a record, a panel, a figure), never as a centered
  avatar circle with a waving-hand emoji.
- **Banned on sight** (from the brief, plus current AI-default looks): dark-portfolio gradient
  blobs, Inter-plus-purple SaaS, terminal/hacker cosplay, bento card grids, particles, warm-cream
  + terracotta editorial default, near-black + acid accent default, broadsheet-newspaper hairline
  default. Each direction below states how it stays clear of its nearest banned neighbor.

---

## Direction 1 — Double Entry

### Concept

The site is set like a ledger: every claim is an entry, and every entry is posted against its
proof. Double-entry bookkeeping has one rule, and it is Farhaan's whole positioning: nothing goes
in one column without a corresponding entry in the other. Shipped fast, and here is the funding
event. Engineered properly, and here is the DOI, the npm package, the migration count. The
metaphor is load-bearing three times over: LedgerLine (his depth flagship) is literally a
double-entry ledger; `context/profile.md` calls itself "the truth ledger"; and the outcome
founders care about is, precisely, money that arrived. The site feels like opening the books of
someone whose books balance: calm, ruled, numerate, quietly confident, with the elegance of the
era when double-entry ran the world's banks. The intern-title, founding-engineer-reality story
reads perfectly here, because a ledger doesn't care about titles, only about what was posted.

### Type pairing

- **Display: Josefin Sans** (Google Fonts, by Santiago Orozco; owner's requested face, and this
  is its honest home). A geometric sans built deliberately on 1920s letterforms: low x-height,
  compass-drawn rounds, an Art Deco poise. The 1920s are the golden age of banking and
  bookkeeping, so the era flavor is load-bearing here, not decorative. Used for the name, section
  heads, and account titles at display sizes only (roughly 28px and up, or letterspaced caps for
  eyebrow-size uses); never for body text, where its low x-height and light color give out.
- **Text: Erode** (Indian Type Foundry, free via Fontshare, self-hostable). A sharp text serif
  with real bite, designed in India, which is not a coincidence we ignore: a Chennai engineer's
  narrative set in an Indian foundry's serif is a deliberate, defensible choice no template would
  make. Erode carries all long-form reading and supplies the ink weight Josefin doesn't have.
- **Ledger voice: Spline Sans Mono** (Google Fonts). All entries, figures, dates, captions, and
  evidence links. Monospace numerals align by nature (which also covers for Josefin's unsuitability
  for tabular figures); the mono is the sound of the ledger.
- Reasoning: three faces, three registers, strict separation. Josefin = the era and the elegance;
  serif = judgment and voice; mono = record and rigor. No neutral grotesk anywhere, so nothing on
  the page could belong to a SaaS template.

### Palette intent

Ledger stock, not cream. A cool ruled-paper white (near `#FBFAF6` but tipped green-gray, away
from the AI-default warm cream), ink near-black for text, and ruling lines in a faded
ledger-green (the tint of real columnar pads, clearly green, not newspaper gray). Two functional
colors only: red ink (an oxblood vermilion, roughly `#A3271E`, AA-checked on the paper white) for
the one figure per section that matters most, and a deep bookkeeping green for links. Red is
never decoration; it is the auditor's pen. Temperature: cool, dry, precise, a little old-money.

### Layout language

- **Grid attitude:** two registers, not two equal columns. A wide narrative measure on the left,
  a figures column on the right where every numeral right-aligns to a shared edge. Rows are ruled
  by the green lines; the ruling is functional (it separates entries), never texture. Mobile
  collapses to stacked entry rows, figure first.
- **First viewport:** identity block top left: name in Josefin Sans at real display scale (it
  needs room to breathe; give it the whole measure), the one-line thesis under it,
  and the photo set small and squared beside them like the photo corner of a filed record, with a
  mono caption (name, Chennai, year). Below, the opening of the books: four posted entries, one
  row each, description left, figure right. Adloom seed raised. 20,000+ assets in production.
  IEEE DOI. npm @unified-product-graph. A founder gets the entire argument without scrolling; the
  scroll is for the workings.
- **Case studies:** each venture is an account. A header row (venture, role, period, all mono),
  narrative in the serif measure, and every number pulled out to the figures column on the exact
  line where the claim is made. Each account closes with a balance line: what it produced, worded
  strictly per the funding-claim discipline in `context/profile.md` (Adloom "raised", Deals24
  "raising at DIFC", Sanady no funding claim).
- **Density:** medium-high. Generous leading in narrative, tight and tabular in the figures
  column. The contrast between the two registers is the texture.

### Motion attitude

On first scroll into a section, its ruling line draws in once (short, sub-300ms) and the entries
settle; no count-up numbers, no parallax. Hovering an entry underlines its evidence link in red
ink. Reduced motion gets everything instantly. CSS only.

### References

- **Stripe Press** (press.stripe.com): print-grade restraint on the web; proof that bookish can
  feel expensive, not academic.
- **Oxide Computer** (oxide.computer): an identity engineers trust on sight; density and
  typography doing all the persuasion.
- **Berkshire Hathaway shareholder letters:** tone reference, not visual. Numbers carry, prose is
  dry, decoration is zero, and the credibility is total.
- **Real columnar ledger stationery** (the green-ruled pads): the material source for ruling,
  tint, and column behavior.

### Rationale + risk

- **Why it wins:** it is the only direction where one device proves both claims simultaneously;
  founders read money natively and engineers read alignment discipline natively. It is maximally
  ownable: poster sites and paper sites exist in the wild, but nobody's portfolio is a ledger,
  and his flagship project makes the metaphor true rather than clever. It also flatters the
  writing law: entries force numbers-over-adjectives.
- **Risk:** over-literalness. If we label things debit/credit or fake aging effects, it becomes
  fintech cosplay; the metaphor must stay structural (entries, figures, balance) and never
  costume. Nearest banned neighbor is the broadsheet default; we stay clear because ruling is
  green and functional, rows are records rather than columns of news, and the density is ledger
  (generous) not newspaper (crammed). Red/green must be handled so meaning never depends on hue
  alone (color-blind check at token phase).
- **What Josefin Sans buys and costs:** it buys era-true elegance (the Deco geometry is the
  period voice of double-entry's golden age), a display register no developer portfolio uses, a
  graceful counterweight to Erode's ink, and an owner who loves his own site. It costs authority
  and range: Josefin has no real mass, so the name and heads read elegant rather than weighty,
  and it is unusable below display sizes, so the system's rigor must come entirely from the mono
  entries, the ruling, and the dry copy. Its boutique and wedding-brand associations are real;
  the ledger apparatus around it is what keeps it reading as 1928 bank, not 2024 lifestyle
  brand. Confinement discipline (display sizes only, tracked caps at small sizes, thin weights
  checked against Windows ClearType rendering at token phase) is non-negotiable.

---

## Direction 2 — The Hoarding (front and back)

### Concept

In Indian English a billboard is a hoarding, and Farhaan's funded flagship is a billboard
advertising platform with 20,000+ live assets. A hoarding is two artifacts in one: the front is a
message engineered to land in three seconds at 80 km/h, and the back is a welded steel structure
engineered to survive wind load. That is the persona exactly: the front raises the money, the
back holds it up. The site reads as a sequence of hoardings: each viewport is one poster-scale
claim (the front), and behind each claim sits a dense riveted spec plate (the back) with the
decisions, stack, and numbers for engineers who flip things over. Chennai's Anna Salai to Dubai's
Sheikh Zayed Road, one road of signs.

### Type pairing

- **Display: Tanker** (Indian Type Foundry, free via Fontshare). A single-weight poster face with
  serious ink-trapped mass; at hoarding scale it is unmistakable, and its single weight enforces
  poster discipline (one voice, full volume, used sparingly).
- **Text: Supreme** (ITF, Fontshare). A sturdy workhorse grotesk with enough weights for the
  support lines and short narrative; neutral enough to never compete with Tanker.
- **Spec plates: Martian Mono** (Google Fonts), set narrow. The maintenance-plate voice:
  condensed, technical, dense, for stacks, constraints, and figures on the backs.
- Reasoning: both display and text come from the same Indian foundry (coherence with a reason),
  and the three faces map one-to-one to the three surfaces: poster, caption, plate.

### Palette intent

Daylight and paint. A hard sun-white ground, tar-black ink, and one poster color: marigold, the
yellow of painted signage, used only as a full field behind black type (never as small text on
white, where it would fail contrast). The backs go galvanized: a gray-blue steel tone for spec
plates. Temperature: hot, high-contrast, outdoor. No gradients anywhere; paint doesn't gradient.

### Layout language

- **Grid attitude:** full-bleed panels, one idea per panel, hard edges. Bimodal density is the
  identity: poster fronts are almost empty, spec backs are packed.
- **First viewport:** one hoarding. The headline claim in Tanker at maximum size (Lefler writes
  it; the under-10-words law is native to this direction), a support line in Supreme, and a small
  route marker (name, Chennai, links). Nothing else. On mobile this is naturally a full screen,
  which is exactly the founder-on-a-phone scenario.
- **Case studies:** front, then back. The front is the outcome at poster scale (the funding
  event, or 5 hours to 5 minutes); the back is the plate: role, period, stack, three or four
  decision lines, evidence links, all in narrow mono on the steel ground. Founders read fronts
  and keep scrolling; engineers stop and read plates.
- **Photo:** its own panel in the sequence, poster-treated (full-bleed on mobile, black and white
  or single-tone so it sits in the paint palette), with a plate-style caption. A person on a
  hoarding, which is what the medium does with people.
- **Density:** very low then very high, alternating. The alternation is the argument.

### Motion attitude

Poster fronts arrive with one hard cut or a short rise, like a bill being pasted; spec backs do
not move at all. Nothing floats, nothing loops, no scroll-jacking. CSS scroll-driven reveals
only, instant under reduced motion.

### References

- **Josef Müller-Brockmann's Swiss posters:** one message, mathematical grid, scale as the whole
  rhetorical device.
- **Grilli Type specimen microsites:** the web version of poster logic; type as the entire
  interface, one idea per screen.
- **Chennai hand-painted banner and hoarding craft:** the vernacular anchor, taken as spirit
  (message first, fearless scale, made by hand) and never as pastiche.
- **Vignelli's NYC subway standards manual:** legibility at speed as an engineering discipline.

### Rationale + risk

- **Why it wins:** the fastest 30-second impression of the three, and the most memorable link to
  receive cold in a chat. It is mobile-first by physics, and the front/back device gives
  engineering managers a genuine layer instead of leaving them with a shouty poster site. The
  Adloom story makes the conceit true: he literally engineered the platform behind 20,000 of
  these.
- **Risk:** big display type is a current agency trend, so execution must lean hard on the
  hoarding/structure conceit or it reads as trend-surfing. It is unforgiving of copy: one flabby
  headline breaks a whole panel, so Lefler's discipline is a hard dependency. Tanker's single
  weight limits hierarchy on the fronts (deliberate, but constraining). And the register is loud;
  a corporate panel skimming for sober signal may trust it less than Directions 1 or 3.

---

## Direction 3 — Camera-Ready

### Concept

"Camera-ready" is the state a paper must reach before IEEE will publish it: final, formatted,
every claim cited, ready for hostile review. The site is built as a camera-ready record of an
engineer: title, author line with affiliations, abstract, numbered sections, figures with dry
captions, and a real references section where every claim resolves to an artifact you can check
(DOI, npm, GitHub, live domains). He has an actual IEEE publication and an IIT Madras + SNU dual
affiliation; this direction takes the most verifiable thing about him and makes it the whole
grammar. The feel is still, exact, and quietly severe: a site that submits itself for review
because it expects to pass.

### Type pairing

- **Text and display: STIX Two Text** (OFL, Google Fonts). Designed by and for scientific
  publishers as the successor to Times in journals; it is literally the instrument of the
  tradition being invoked, and its display cuts are handsome at title size. Not a costume version
  of LaTeX; the real modern face of the genre.
- **Label system: Archivo** (Google Fonts, variable width). Small tracked caps and narrow widths
  for eyebrows, section numbers, figure labels, and the margin rail; the technical counterpoint
  that keeps the page from going fusty.
- **Artifact strings: Spline Sans Mono** for DOIs, package names, and repo paths only.
- Reasoning: the serif carries the tradition, the grotesk labels the apparatus, the mono marks
  the checkable strings. Each face has exactly one job.

### Palette intent

Lab white, not cream. Ink at slightly reduced black for long reading, hairline apparatus in light
gray, and exactly one chromatic element on the entire site: citation blue, the color of a link
that expects to be followed. The photo may keep natural color, which makes it the second most
colorful thing on the page, which is the point. Temperature: cold, even, unhurried.

### Layout language

- **Grid attitude:** one readable column with a margin-note rail on desktop (Tufte-style); the
  rail holds numbers, links, and asides so the narrative measure stays clean. On mobile the rail
  folds into small labeled asides between paragraphs; designed mobile-first so the collapse is
  the default, not a degradation.
- **First viewport:** the paper header. His positioning line set as the title in STIX Two
  (sentence case, per the writing law), the author line with real affiliations (The Product
  Creator; SNU Chennai; IIT Madras), a two-line abstract, and Fig. 1: the photo with a dry
  caption ("Fig. 1. The author, Chennai, 2026."). One understated joke, spent exactly where the
  writing law allows it.
- **Case studies:** numbered sections, and the numbering is honest because his story is genuinely
  sequential (the venture year, the depth work, the standards work). Claims carry small citation
  markers that resolve to a real references section at the foot of the page, which doubles as the
  link hub and replaces the footer. That references section is the signature element.
- **Density:** even and bookish throughout; the margin rail provides texture without breaking the
  measure.

### Motion attitude

Almost none, and the stillness is deliberate. Citation markers show their reference inline on
hover (the one distill.pub-style affordance); everything else is static. The absence of motion is
the credibility.

### References

- **distill.pub:** the existence proof that scientific publishing on the web can be beautiful and
  modern rather than nostalgic.
- **Edward Tufte's book design:** the margin-note rail, captions, and integration of evidence
  with prose.
- **Butterick's Practical Typography:** a self-published web book whose typography is the
  argument for its author's competence, which is exactly our play.
- **The IEEE camera-ready tradition itself:** the artifact he actually shipped into; the site
  borrows its apparatus, not its two-column newsprint economy.

### Rationale + risk

- **Why it wins:** unimpeachable with engineering managers and corporate panels; it amplifies the
  IEEE and IIT pedigree markers those audiences skim for, and the citation apparatus makes the
  truth-only directive visible as design. Of the three it is the strongest "this person is
  serious" signal per pixel.
- **Risk:** it optimizes the second and third audiences and asks patience of the first; a founder
  on a phone gets the abstract and Fig. 1, which must be strong enough alone. Handled lazily it
  drifts academic and buries the raised-money story under rigor, so the abstract and section
  order must lead with funding outcomes, not scholarship. Tufte-style CSS has a known open-source
  template (tufte-css), so the execution must be visibly custom: our rail, our apparatus, our
  scale, or it reads as borrowed clothes.

---

## How to choose

All three are truthful to the same ledger of facts; they differ in which audience they optimize
and which risk they accept.

- **Double Entry** is the only direction whose core device proves both persona claims at once
  (money in one column, rigor in the other), and the most ownable: no other portfolio is a
  ledger, and LedgerLine makes it true rather than clever. It is also where the owner's requested
  Josefin Sans genuinely belongs (1920s geometry, 1920s banking); it was not forced into the
  other two, where it would fail honestly stated jobs (no poster mass for The Hoarding, wrong
  instrument for Camera-Ready's scientific apparatus). Its risk is execution drift into costume;
  the metaphor must stay structural and Josefin must stay confined to display duty.
- **The Hoarding** buys the strongest 30-second, founder-on-mobile impression and the most
  memorable shared link, at the cost of register: it is loud, copy-fragile, and the least
  reassuring to a sober corporate panel.
- **Camera-Ready** buys maximum credibility with engineers and panels and makes verifiability
  itself the aesthetic, at the cost of first-audience patience: founders get one abstract and one
  figure to be convinced.

**Riker's recommendation: Double Entry.** It serves both audiences with one device instead of
trading one for the other, it is the hardest of the three to mistake for anyone else's site, and
its central metaphor is anchored in his actual flagship work, which is what "specific to this
person" means. The Hoarding is the direction I would fight for if the site's only job were
founder outreach; Camera-Ready if it were corporate screening. It is both, so the books should
balance.

Once the owner picks, the chosen direction binds; I write `design/tokens.md` and the Tailwind v4
token config next, and the unchosen directions are retired (not recycled for Shama's site, whose
identity starts from her own context, not from Farhaan's leftovers).
