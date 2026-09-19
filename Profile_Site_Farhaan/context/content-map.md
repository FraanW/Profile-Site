# Content Map — Farhaan's Profile Site

> **Owner of this file:** Mimir. **Consumer:** Lefler (writes from the briefs), Riker (shapes the
> structure), Dwight (audits against it), Sindri (builds to it).
> Every fact below traces to `context/profile.md` (the truth ledger, Phase 1 locked 2026-07-10).
> Nothing on the site may exceed the ledger; nothing in a brief here does.
> This is a repo doc, so its punctuation is exempt from `shared/writing-style.md`. All final copy
> Lefler produces from it is NOT exempt. Any phrasing below marked *direction* is an argument to
> make, never copy to paste.
>
> Created: 2026-07-10.

---

## 1. Page structure: one page, no sub-pages

**Decision: a single scrolling page with at most three anchor links. No case-study sub-pages, no
blog, no separate "projects" page.**

Why, per audience:

- **Founders (mobile, under a minute, from a shared link).** Every navigation event on mobile is a
  drop-off point. A founder who taps a link in WhatsApp and lands on a nav menu is gone. One page
  means the funded work is one thumb-scroll from the hero, and the whole argument survives a
  30-second skim.
- **Engineering managers (desktop, click GitHub links).** They want depth, but depth for them
  lives *off-site*: the LedgerLine repo, the UPG org, the IEEE DOI. The page's job is to make
  those links irresistible and honest, not to replicate them in sub-pages nobody maintains.
- **Corporate panels (skimming for signal).** They scan headers and numbers. A single page with
  scannable section headers and a credentials block serves a 45-second skim better than a site
  map does.

Supporting reasons: the writing law caps the whole site at a 4-minute read, which fits one page
with room to spare; one page means one CTA (the ask must be tiny); static-first Next.js makes a
single page the fastest thing Sindri can ship and Darryl can score 100 on.

Anchor nav (if Riker wants any): maximum three anchors plus the email CTA. Not a menu of seven.

---

## 2. Section order

Nine slots, top to bottom. Working titles only; Lefler owns final headers (sentence case, no
self-narrating headers per the writing law).

| # | Section (working title) | Purpose in one line | Must prove |
|---|------------------------|---------------------|------------|
| 1 | **Hero** | Pass the 30-second founder test: who, what outcome, what now, one ask | Both persona claims in one viewport: ships fundable MVPs AND engineers properly |
| 2 | **Proof strip** | Four hard numbers a skimmer absorbs without reading | The claims in §1 are backed by artifacts, not adjectives |
| 3 | **About (short)** | The arc in first person: intern title, founding-engineer scope | The gap between title and scope is the story; this is a person, not a template |
| 4 | **Case study: Adloom.ai** | The funded-outcome flagship | Zero-to-one: MVP and decks behind a documented seed raise, then real production scale |
| 5 | **Case study: LedgerLine** | The engineering-depth flagship | One-to-N: correctness-first engineering, solo, with zero AI slop |
| 6 | **Case study: Deals24.ai** (+ Sanady coda) | Range and speed: a three-sided product's dashboards, one engineer | He repeats the zero-to-one trick; second venture now raising at DIFC |
| 7 | **Case study: Now (The Product Creator: Entopo + UPG)** | The current chapter: AI-native, building tools builders use | Trusted as Core Founding Engineer; open-source standards work carries the detail |
| 8 | **Also built** | Three one-line repo mentions for the EM who wants more to click | Depth is a pattern, not a one-off |
| 9 | **Signals + Contact** | Scannable pedigree (IEEE, dual degree), then one tiny ask | Corporate-panel markers; a single clear next step |

Footer: one-line core stack + both emails + GitHub + LinkedIn + location. The stack line is the
only stack listing on the page outside case-study context lines (tech stacks are footers, not
headlines).

### First-viewport spec (the 30-second test)

On a phone, before any scroll, a founder must see:

1. Name.
2. Headline, under 10 words, carrying the dual claim.
3. Support line, under 25 words, containing **at least one hard number or the funding outcome**
   (the proof strip may sit below the fold on mobile, so the support line cannot be adjective-only).
4. Current-role line: Core Founding Engineer at The Product Creator.
5. **Photo** (owner confirmed yes; asset supplied by Farhaan before build). It belongs here, in
   the hero viewport: a face in the first screen is the fastest "this is a person you can email,
   not an agency" signal. Riker owns placement and treatment; if he proposes moving it to About,
   that is his call to argue, but hero is the default.
6. One primary CTA (email) and a GitHub link. Nothing else asks for a click.

If the first viewport reads as a template, the site failed regardless of what follows.

### Why case studies run Adloom → LedgerLine → Deals24 → Now

The order alternates the two persona claims on purpose: funded venture (zero-to-one), then
engineering depth (one-to-N), then venture range again, then the current chapter that blends both.
Two reasons:

- A founder who reads only one case study reads Adloom, the documented raise. An EM who reads two
  gets the skeptic's question ("fine, the startup raised, but is his code real?") answered
  immediately by LedgerLine, before a second venture claim is made.
- Separating Adloom ("raised") from Deals24 ("raising") by a full section reduces the risk of a
  skimmer blurring the two funding statuses together. The funding-claim discipline is easier to
  keep when the claims are not adjacent.

Ending on the current chapter flows naturally into contact.

---

## 3. Case-study selection

### Earn case-study depth (4)

| Project | Why it earns depth |
|---------|-------------------|
| **Adloom.ai** | The only documented funding outcome on the ledger, plus the best production numbers (20,000+ live assets, ~60% SDR reduction, 5 hours to 5 minutes). Nothing else proves zero-to-one with money attached. Flagship. |
| **LedgerLine** | The single best "no AI slop once funded" evidence he has (ledger's own words). Double-entry ledger, RLS, hand-written SQL, transactional outbox, Testcontainers, and an ML canonicalizer engineered to abstain rather than guess (100% abstain recall, zero false-accepts). This is the one-to-N proof an EM actually believes. |
| **Deals24.ai** | Real, on-record scope: all three role dashboards (investor, seller, admin) built end to end by one engineer, and a second venture outcome in motion (raising at DIFC). Proves the Adloom pattern repeats. Shorter than the flagships. |
| **The Product Creator: Entopo + UPG** | The current chapter and the AI-native argument. Entopo stays inside NDA guardrails (role + public-site description only); UPG carries all the detail (90+ MCP graph APIs, npm, spec work). Answers "what does he do now" and proves he builds the tools builders use. |

### One-line mentions

| Item | Placement | Reasoning |
|------|-----------|-----------|
| **Sanady.ai** | One-line coda at the end of the Deals24 case study | Real and interesting (fintech architecture, PCI DSS alignment) but design-phase work with **no funding claim allowed** and no public artifact to land on. A case study without an outcome or artifact weakens the spine. One precise line keeps the PCI DSS and fintech-architecture signal and keeps the studio story complete. |
| **Research Orchestration Platform** | "Also built" | Strong numbers (sub-400ms pgvector RAG across 10+ concurrent sessions) but its signals (concurrency, RAG, PostgreSQL depth) are already carried by LedgerLine and UPG. One line plus repo link serves the EM without lengthening the read. |
| **ADCEA** | "Also built" | AutoML pipeline shows ML breadth beyond LLMs; one line is its honest weight. |
| **Remedify** | "Also built" (conditional, see open question 4) | Adds a modality nothing else shows (local LLM + voice: Llama 3.1B, FAISS +40% accuracy, Whisper, Coqui). But the repo is named `Kratos_Desk_Bot` with the work on a branch; the landing experience currently fails Dwight's check. Include only if the repo is tidied or the link is dropped. |

### Omitted

| Item | Reasoning |
|------|-----------|
| **GradeVault** | Reads student-grade next to LedgerLine. Its signals (RBAC, test coverage) are carried better by LedgerLine's 22 JUnit test classes and RLS work. Padding costs more than it adds. |
| **Leadership (Literary Club president, MUN)** | Moves none of the three audiences toward a yes. Cuttable; cut. Lefler may spend at most one dry clause on it in About if it earns its words, but the default is omission. |
| **STIRS university seed (INR 10,000)** | Not a credentials item: a four-figure INR grant listed beside a UAE seed round reads as padding. But the *pattern* is good (his research and pitch have won money three times: STIRS, Adloom, Deals24 in progress). Offered to Lefler as an optional About clause only, without the INR figure. |
| **Certifications, full skills inventory** | Ledger says the site should not list all of it. One stack line in the footer; the rest lives in case-study context lines. |
| **Hackathon (Hack2Skill GenAI finalist)** | Borderline. Keep as a single Signals line item (it is recent, Nov 2025, and AI-relevant), but it is the first thing to cut if the Signals block feels long. |

---

## 4. Per-section briefs for Lefler

Global rules for every brief: first person, active voice, sentence-case headers, no em dashes, no
banned vocabulary, no triads, no mirrored contrasts ("not just X, but Y" is banned even though the
persona's tension invites it; state both claims as facts and let them collide). Numbers exactly as
written here, never rounded up. Venture Cube title is always the exact string
**"EIR, Full-Stack and Founding Engineer, Adloom.ai"**.

**Total word budget: 1,050 words of visitor-facing copy, hard cap 1,150.** That is a 4-minute
read with margin. Per-section budgets below sum inside it; if a section runs over, cut it, do not
borrow from another.

### 4.1 Hero

- **Goal:** a founder on a phone decides in 30 seconds that this person can build their company.
- **Must prove:** both claims at once: turns ideas into products that raise money, engineers them
  properly for what comes after.
- **Facts available:** the ledger's positioning block. Tested language exists ("AI-Native
  Full-Stack Engineer..." from LinkedIn) but that is a keyword string, not a headline; do not
  paste it. The strongest single-sentence ammunition: drove the research and MVP builds behind
  ventures that raised (Adloom.ai, documented) or are raising (Deals24.ai, DIFC) investor money
  in the UAE; ships fast enough for founders, engineers properly enough for what comes after
  funding (direction, not copy).
- **Structure:** headline (<10 words) + support line (<25 words, must contain a number or the
  funding outcome) + role line ("Core Founding Engineer at The Product Creator" or equivalent,
  ~10 words) + email CTA + GitHub link + photo.
- **Tone:** confident builder. No greeting, no "welcome", no "hi, I'm". The name is on the page;
  the headline works for a living.
- **Traps:** "passionate", any triad, the audience-menu construction ("whether you're a
  founder..."), and the funding attribution: Adloom raised; his research, decks, and platform
  contributed. The hero must not read as "I raised money".
- **Budget:** headline + support + role line, roughly 45 words total.

### 4.2 Proof strip

- **Goal:** four numbers a skimmer absorbs in five seconds, each anchored to a noun.
- **The four (exact):**
  1. Adloom.ai: seed funded (attribution lives in the case study, not here)
  2. 20,000+ live advertising assets in production
  3. IEEE published, ICNWC 2026
  4. 90+ open-source graph APIs for AI agents (verify the current npm/GitHub count at write
     time; the ledger notes it has grown, and 90+ is the floor)
- **Why these four:** one per reader anxiety: funded (founder), scale (founder + EM), pedigree
  (panel), open source (EM).
- **Tone:** labels, not sentences. No verbs needed. Never round up.
- **Budget:** ~24 words total (4 × ~6).

### 4.3 About

- **Goal:** the narrative frame that makes the case studies land: hired as an intern, operated as
  a founding engineer.
- **Must prove:** the title-versus-scope gap (Chapter 1 of the ledger's story arc) and that a
  human wrote this page.
- **Facts available:** EIR Full-Stack Intern on paper at Venture Cube (Dec 2024 to Jan 2026,
  Dubai, remote); drove business research and MVP builds behind three ventures; Adloom raised
  seed, Deals24 raising at DIFC, Sanady carries no funding statement (do not enumerate funding
  per venture here; the safe collective framing names Adloom's raise and Deals24's in-progress
  round only). In parallel: IEEE paper published, two degrees at once (mention the fact here,
  leave institutions and numbers to Signals). Now: Core Founding Engineer at The Product Creator.
  Optional clause: the research-and-pitch-wins-money pattern (see §3, STIRS row; no INR figure).
- **Tone:** first person, factual, one understated aside allowed (this is the natural home for
  the page's single dry moment). State the title and state the scope; do not editorialize the gap
  with a mirrored contrast.
- **Traps:** "journey" (banned), "wearing many hats", any sentence that could sit on a stranger's
  About.
- **Budget:** 60 to 90 words.

### 4.4 Case study: Adloom.ai

- **Context line:** Venture Cube, Dubai (remote), Dec 2024 to Jan 2026. Title string:
  "EIR, Full-Stack and Founding Engineer, Adloom.ai". Stack: FastAPI, React.js, PostgreSQL, AWS
  (EC2, RDS, Amplify).
- **Must prove:** an idea became a platform, the platform helped raise money, and the platform
  then held real production load.
- **Mandatory facts (exact):**
  - AI-driven billboard advertising platform
  - 20,000+ live advertising assets, active client campaigns, real production load
  - Agentic lead-generation pipeline (LangChain, CrewAI, n8n, Zoho CRM API): manual SDR effort
    down ~60% per campaign cycle
  - Billboard recommendation engine (Google Places API, geohash proximity, vector embeddings,
    semantic search): location scouting from ~5 hours to ~5 minutes per campaign
  - Market research and pitch decks; **Adloom.ai attracted seed funding, with those decks
    contributing** (this exact attribution shape: the company raised, his work contributed)
- **Narrative skeleton:** problem (billboard advertising is scouted and sold by hand) →
  what he built (platform, recommendation engine, agentic pipeline) → business outcome (seed
  funding; the numbers above). Lead with the outcome, then the how.
- **Tone:** decisions over descriptions where the ledger supports it. The ledger records
  components and outcomes, not reasoning; Lefler must not invent a rationale. Owner has been
  asked for one hardest-call sentence (open question 3); until it arrives, write outcomes and
  named components only.
- **Traps:** funding attribution (see above); "spearheaded" is banned even though the ledger's
  internal notes use it; do not let all three metrics pile into one participle-tail sentence.
- **Budget:** 250 words (style law allows 300; the strip already carries two of the numbers).

### 4.5 Case study: LedgerLine

- **Context line:** solo project, repo `FraanW/ledgerline-money-tracker` (Dwight verifies public
  + README before the link ships). Java 21, Spring Boot 3.4, PostgreSQL, Next.js 14.
- **Must prove:** when nobody was watching, he engineered like money depended on it. This is the
  anti-slop exhibit; it answers the doubt the funded-MVP story creates.
- **Mandatory facts (exact, pick-and-arrange but none may be altered):**
  - Multi-tenant double-entry ledger; PostgreSQL row-level security + data-driven RBAC
  - Hand-written SQL, no ORM; pessimistic locking; transactional outbox; 13 Flyway migrations
  - Idempotent CSV/PDF ingestion; 8 Gradle modules; 11 REST controllers; JWT
  - 22 JUnit test classes with Testcontainers; Storybook frontend
  - ML bank-statement canonicalizer: rule floor → MiniLM embeddings over pgvector → LangGraph
    constrained fallback with confidence gating; **94.3% accuracy, 100% abstain recall, zero
    false-accepts**
- **Narrative skeleton:** constraint (money data punishes optimism) → the calls (double-entry,
  locking, outbox, no ORM, abstain over guess) → the numbers. The star is the canonicalizer's
  100% abstain recall: an AI component engineered to know when it does not know. That single
  fact IS the "AI-native without AI slop" argument; give it the closing beat.
- **Tone:** dry confidence. The spec list above must NOT appear as a list; the writing law's
  "specific nouns" rule means choosing five or six that carry decisions and letting the repo
  carry the rest. Unlike Adloom, the decisions here are visible in the artifact itself, so
  Lefler may state them as choices without owner input.
- **Traps:** tag-cloud effect (dumping all specs); "robust" is banned; do not call it a side
  project apologetically.
- **Budget:** 250 words.

### 4.6 Case study: Deals24.ai (+ Sanady coda)

- **Context line:** Venture Cube, same title string. Stack: FastAPI, React.js, PostgreSQL, AWS
  with IAM. Product: deals24.ai, platform for distressed real estate deals (Dwight verifies the
  domain is live before linking).
- **Must prove:** the zero-to-one pattern repeats, and one engineer can carry a three-sided
  product.
- **Mandatory facts (exact):**
  - Built complete end-to-end dashboards for all three roles: investor, seller, and admin
  - Funding: **in progress at DIFC, UAE**. The site says "raising" or "funding in progress",
    never "raised", "funded", or any phrasing implying a close. State the status exactly once.
- **Sanady coda (one sentence, end of this section):** at the same studio he designed Sanady.ai,
  a fintech for quick small-ticket loans to UAE expatriates: end-to-end product flow, transaction
  workflows, lending lifecycle, and a backend architecture aligned with PCI DSS. **No funding
  claim of any kind attaches to Sanady.** No repo, no link.
- **Tone:** brisk. This study earns its place through scope, not drama.
- **Traps:** funding-status blur (the one BLOCKER-grade risk on the page); do not let "raising"
  sit in the same sentence as Adloom's "raised".
- **Budget:** 150 words including the Sanady sentence.

### 4.7 Case study: Now (The Product Creator: Entopo + UPG)

- **Context line:** The Product Creator / Arkheiev UG, Core Founding Engineer, Apr 2026 to
  present, remote.
- **Must prove:** current, trusted, AI-native; builds developer tools and standards, not just
  apps.
- **Entopo, the full sayable universe (NDA, ABSOLUTE, per ledger guardrails):** he is a Core
  Founding Engineer at The Product Creator, building the full-stack app for Entopo (entopo.app),
  an AI-native product creation tool: canvas + AI + graph. Craft framing allowed:
  TypeScript/Next.js, AI agent systems, MCP, multi-agent development workflows, described as how
  he works, never as Entopo internals. One to two sentences maximum. If a sentence about Entopo
  goes one word beyond entopo.app's public copy, it dies. Dwight flags overreach as a BLOCKER.
- **UPG, full detail allowed (open source):**
  - Open-source, full-stack TypeScript standard for structured product knowledge
  - npm: `@unified-product-graph`; github.com/unified-product-graph (link both or the GitHub org)
  - Node.js MCP server exposing 90+ graph read/write APIs to AI agents (verify current count at
    write time; state the verified number, floor 90+)
  - Aligned CLI and data-sync layers to the v0.2 spec; contributed entity-schema properties;
    authored guided AI skills that turn natural-language sessions into structured product graphs
- **Structure:** role line first, one NDA-safe Entopo sentence for the commercial frame, then UPG
  carries the technical weight. The confident shape: the reader should never sense a redaction.
- **Tone:** present tense. This is the only section where "AI-native" may appear as a term, and
  it must be immediately grounded by the MCP/UPG specifics.
- **Traps:** any Entopo detail beyond the block above; "cutting-edge" (banned); vague "working
  with AI agents" filler where the 90+ APIs number should be.
- **Budget:** 200 words.

### 4.8 Also built

- **Goal:** show depth is a pattern; give the clicking EM two or three more doors.
- **Format:** one line each (~20 words), name + claim + number + repo link. No intro sentence
  beyond the two-sentence max; ideally none.
- **Items (exact numbers):**
  1. Multi-Tenant Research Orchestration Platform: stateful concurrent research workflows,
     session persistence and checkpointing, PostgreSQL + pgvector RAG at sub-400ms across 10+
     concurrent sessions, WebSockets, cloud OCR. Repo: `FraanW/Agentic-Research-Tool`.
  2. ADCEA: autonomous data cleaning, feature engineering, and AutoML pipeline; async training
     pipelines; React SPA. Repo: `FraanW/ADCEA`.
  3. Remedify (conditional on open question 4): voice health assistant; Llama 3.1B with FAISS
     retrieval (+40% accuracy), Whisper STT, Coqui TTS.
- **Traps:** participle tails on every line (vary the shape); letting this grow. Three items,
  never more.
- **Budget:** 60 words total.

### 4.9 Signals + Contact

- **Goal (Signals):** the corporate panel's 15-second pedigree scan.
- **Signals items (exact):**
  1. IEEE publication: "Agentic Fuzzy Control: A Dual-Loop Framework for Self-Adaptive IoT
     Systems", ICNWC 2026, DOI 10.1109/ICNWC68145.2026.11518407, linked to ieeexplore
     (document/11518407). Result numbers if space allows: ~8% lower overshoot, ~78% lower energy
     vs baselines.
  2. Dual degree, run simultaneously: B.Tech CSE (IoT), Shiv Nadar University Chennai, CGPA
     8.75, 2022 to 2026; BS Data Science, IIT Madras, 2023 to 2027.
  3. Finalist, Hack2Skill GenAI Hackathon, Nov 2025 (AI marketplace assistant for artisans).
     First to cut if the block runs long.
- **Goal (Contact):** one tiny ask, zero friction.
- **Contact contents:** primary mailto CTA (email choice: open question 1; default
  mdfarhaanhere@gmail.com). Both emails listed: **mdfarhaanhere@gmail.com** and
  **farhaan@theproductcreator.com**. GitHub (github.com/FraanW), LinkedIn
  (linkedin.com/in/muhammadfarhaan). Location line: Chennai, India; open to Bengaluru, Hyderabad,
  and remote.
- **Tone:** no "Let's Connect" (banned self-narrating header), no availability begging, no
  exclamation mark. Until open question 2 is answered, the ask is a plain "email me" shape with
  no availability claim.
- **Budget:** Signals 70 words, Contact 35 words.

### 4.10 Footer stack line

One line, footer register, serving the panel's keyword scan without becoming a tag cloud:
TypeScript, Python, React/Next.js, FastAPI, Node, PostgreSQL (+pgvector), AWS, LangChain,
LangGraph, MCP. Lefler may trim; may not extend. (~15 words.)

---

## 5. Compliance block (Dwight audits against this)

1. **Funding claims, per venture:** Adloom.ai raised seed funding (plainly stateable; his
   research and decks contributed). Deals24.ai is raising at DIFC, UAE ("raising" / "funding in
   progress" only). Sanady.ai carries **no** funding claim anywhere on the page.
2. **Entopo NDA:** the sayable universe is §4.7's Entopo block, nothing more. Product description
   never exceeds entopo.app's public pages.
3. **Title string:** "EIR, Full-Stack and Founding Engineer, Adloom.ai", identical everywhere
   Venture Cube work is titled.
4. **Links:** before any repo or domain ships, Dwight verifies it is public/live and the README
   or landing page matches the claims (`ledgerline-money-tracker`, `Agentic-Research-Tool`,
   `ADCEA`, Remedify's repo, deals24.ai, entopo.app, the UPG org, the IEEE DOI).
5. **Numbers:** exactly as in the truth ledger; 90+ UPG APIs is a floor pending a count check at
   write time; never round anything up.
6. **Both emails on the page.** Photo in the hero, asset supplied by owner before build.

## 6. Word-budget ledger

| Section | Budget |
|---------|--------|
| Hero | 45 |
| Proof strip | 24 |
| About | 90 |
| Adloom.ai | 250 |
| LedgerLine | 250 |
| Deals24.ai + Sanady | 150 |
| Now (Entopo + UPG) | 200 |
| Also built | 60 |
| Signals | 70 |
| Contact | 35 |
| Footer stack | 15 |
| **Total** | **~1,090 (hard cap 1,150)** |

## 7. Open questions for the owner

1. **Primary CTA email:** both emails appear on the site (locked), but the mailto button needs
   one target. Recommendation: mdfarhaanhere@gmail.com (personal, durable, not tied to the
   current employer). Confirm.
2. **What should Contact invite?** Full-time roles, contract MVP builds, or both? One line of
   copy depends on it. Until answered, the CTA stays a plain email ask with no availability claim.
3. **Decision color, one to two sentences each, for Adloom and Deals24:** the hardest technical
   call made and why (e.g. why geohash + embeddings for the recommendation engine). The writing
   law demands decisions over descriptions and the ledger records outcomes, not reasoning; Lefler
   will not invent rationale. LedgerLine's decisions are visible in the artifact, so it can ship
   without this, but color helps there too.
4. **Remedify repo:** the work lives on the `CoquiTTS-Version` branch of `FraanW/Kratos_Desk_Bot`.
   Rename the repo / promote the branch so the link lands well, or drop Remedify from "Also
   built"? Dwight will fail the current landing experience.
5. **UPG API count:** the ledger says the published count has grown past 90+. Confirm the current
   number (or Dwight counts from the repo) so the site states a verified figure.
6. **deals24.ai live?** If the domain is not live and presentable at write time, the case study
   ships without the product link.
7. **Photo asset:** needed before Sindri builds the hero (already in the ledger; repeated here as
   a build dependency).

## 8. Handoffs

- **Lefler:** write every section from §4, in order of leverage: hero first, then Adloom, then
  LedgerLine, then the rest. Nothing ships until open questions 1 to 3 are answered or their
  fallbacks (noted inline) are accepted.
- **Riker:** structure is nine slots, one page, photo in hero, proof strip designed to be
  absorbed without reading, anchor nav of at most three. Case studies must be visually distinct
  from each other without becoming four templates of the same card.
- **Dwight:** audit against §5 plus `shared/writing-style.md`. The two BLOCKER-grade risks on
  this page: Deals24 funding-status blur and Entopo NDA overreach.
