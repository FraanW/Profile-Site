# Project Roster & Proof Inventory — Muhammad Farhaan

> **Purpose.** The complete, evidence-checked answer to "what am I, what have I done, and what can
> I advertise." Built 2026-09-18 from a full sweep of `D:\github repos\`, the GitHub account
> `FraanW` plus its four orgs, the npm registry, and the whole of `job-hunt-system/`.
>
> **Relationship to other files.** `context/profile.md` remains the truth ledger (claim rules, NDA
> guardrails, funding discipline). This file is the *inventory*: everything real, tiered by
> site-worthiness, with the evidence named for each item. Where the two conflict, profile.md's
> claim rules win; new facts here are marked **NEW** and need folding back into the ledger.
>
> Verification key: **[V]** verified this session against a repo, registry, or API.
> **[L]** from the ledger (owner-confirmed or master.md). **[?]** needs Farhaan before it ships.

---

## 1. What you are

**Cybersecurity Analyst (IAM) by title. Forward-deployed full-stack engineer by passion.**
*(Owner decision 2026-09-18: lead with the current role, but never let it outweigh the FDE
identity. The two carry equal weight; the FDE half is what the site is for.)*

**Owner correction, 2026-09-18 — read this before writing a single headline.** Farhaan's own
words: *"my motto is not about raising the money. I'm more of a product thinker and end-to-end
full-stack systems builder and engineer, trying to build and think of disruptive and secure
systems. I'm down to collaborate if anyone has an idea to build upon. We can take it from ideation
to product and to scale together."*

**What that means for the site.** The funding outcomes stay on the page as evidence, and they stay
factual, but **they are not the claim**. A hero built on "his projects raised money" is now a
misread of the person. The spine is:

1. **Product thinker.** He decides what to build and why, not just how.
2. **End-to-end systems builder.** Ideation to product to scale, the whole arc, one person.
3. **Disruptive and secure by intent.** The security half is not a day job he happens to hold; it
   is a property he wants his systems to have. This retroactively explains the PCI DSS work on
   Sanady, the RLS and RBAC in LedgerLine, AWS IAM on Deals24, and the dependency sweep at TPC.
4. **An open invitation.** The site's ask is collaboration, not employment. "Bring an idea and we
   take it from ideation to scale together." That is the CTA, and it changes the contact section
   from a hiring funnel into a build invitation.

The old framing, kept only as the evidence layer beneath the claim:

> He gets dropped into an unformed problem, runs the research, ships the MVP, and then engineers
> the thing properly. Four ventures inside a venture studio, two of which raised. An open-source
> standards team. Solo systems of real depth. Security for a global fintech by day, building
> alongside it.

**Employer naming.** Default to **unnamed**: "a global fintech", never the real company name.
`CyberSecurity-Repo` deliberately uses the FinCo codename *"so the real company name never appears
in a public place"*, and a public site is the most public place there is. Farhaan can overrule
this, but silence means unnamed. **[assumption, flag at copy review]**

Three claims the evidence actually supports, in the order that convinces people:

1. **Products you built attracted real money.** Adloom.ai raised seed funding; your market
   research and pitch decks contributed. Deals24.ai is raising at DIFC. [L]
2. **You engineer properly, not just fast.** LedgerLine is a correctness-first double-entry ledger
   with row-level security, hand-written SQL, a transactional outbox, and 22 test classes under
   Testcontainers. It exists specifically to prove claim 1 does not come at the cost of this. [V]
3. **You operate at the frontier and publish.** An IEEE paper on agentic control, 428 commits into
   a production AI-native monorepo, and an open standard shipping 8 npm packages. [V]

Supporting texture: dual degree (SNU Chennai B.Tech CSE + IIT Madras BS Data Science), product
sense (research, decks, architecture, not just tickets), and real maintenance and support work,
not only greenfield.

---

## 2. Experience timeline

| Period | Org | Role | Status |
|---|---|---|---|
| Dec 2024 to Jan 2026 | **Venture Cube**, Dubai (remote) | EIR, Full-Stack and Founding Engineer, Adloom.ai | Closed [L] |
| Apr 2026 to **present** | **The Product Creator / Arkheiev UG** | Core Founding Engineer (Entopo + UPG) | **Active, concurrent** (owner 2026-09-18) |
| Jul 2026 to **present** | a global fintech, Chennai (unnamed) | Cybersecurity Analyst, IAM | **Active** (owner 2026-09-18) |

**The two current roles run concurrently** (owner-confirmed 2026-09-18). That is the "now" line:
security analyst at a global fintech by day, Core Founding Engineer on Entopo and UPG alongside it.
Present tense is correct for both. The 2026-08-06 last-commit date reflects a lull, not an exit, so
avoid any copy that implies continuous daily shipping on TPC.

Told carefully this is a strong story: a person who does identity and access security for a
payments company and builds AI-native developer tooling in the same week. Told carelessly it reads
as unfocused. The fix is to make the FDE work the spine and the security role the current chapter,
not to give each equal airtime.

Source for the role: `D:\github repos\CyberSecurity-Repo` (public, pushed 2026-09-10), which states
*"Role: Cybersecurity Analyst (IAM), FinCo — Fintech · Started: 2026-07"*. Absent from profile.md
(locked 2026-07-10); backfill it there.

**Corroborating evidence:** the job hunt ran Jun 2026 and stopped. `data/applications.csv` records
three applications, last one 2026-06-21 (Apple IS&T). Nothing after. The search ended because it
worked. [V]

### Venture Cube (Dec 2024 to Jan 2026)

Four ventures touched. The org `github.com/venture-cube` confirms the estate: `adloom_reactjs`,
`adloom_services`, `adloom_ai_search`, `adloom_admin_reactjs`, `sanady`, `lead_generation_service`,
`lead_generation_reactjs`, `data_scraping_service`, `uae_businesses_collector`, `shelvefy_service`,
`salvage_pro`, `proposal-service`, `tradebeez_*`. All private. [V]

- **Adloom.ai** — AI-driven billboard advertising. 20,000+ live advertising assets, active client
  campaigns, real production load. FastAPI + React + PostgreSQL on AWS (EC2, RDS, Amplify).
  Agentic lead-gen pipeline (LangChain, CrewAI, n8n, Zoho CRM) cutting manual SDR effort ~60% per
  cycle. Billboard recommendation engine (Google Places, geohash proximity, vector embeddings,
  semantic search) taking location scouting from ~5 hours to ~5 minutes. Your market research and
  pitch decks contributed to a **seed raise**. [L]
- **Deals24.ai** — distressed real-estate deals platform. You built all three role dashboards end
  to end: investor, seller, admin. FastAPI + React + PostgreSQL, AWS with IAM. **It raised its
  funding, and the startup later failed.** *(Owner 2026-09-18, superseding the "raising at DIFC"
  status in profile.md.)*

  **Claim discipline, revised.** Two truths now apply and both should appear together:
  1. You may say Deals24.ai **raised** funding. That is no longer a forward-looking claim, so the
     old "never write raised" rule is retired.
  2. The company subsequently failed. **Say so.** A raise you mention while omitting the shutdown
     is the kind of half-claim that costs all your other claims their credibility the moment a
     founder searches the name and finds a dead site. Disclosed plainly it costs you nothing:
     you were the engineer, not the CEO, and startups fail for reasons that are not the build.

  Recommended framing for Lefler, an argument not copy: *two of the ventures I built for raised
  money; one of them didn't survive anyway.* That sentence is honest, unusual, and makes the
  Adloom outcome read as more credible rather than less, because it proves you are not curating.
- **Sanady.ai** — micro-lending for UAE expatriates. You ideated and designed it: product flow,
  system architecture, transaction workflows, lending lifecycle, e-wallet strategy, and a backend
  architecture aligned to PCI DSS. **No funding claim attaches to Sanady.** [L]
- **The lead-generation stack** — local `Lead_Qualification` (CrewAI crews, FastAPI app laid out
  as `api/ core/ crews/ models/ services/ tools/`; you are a top-2 committer) plus commits to
  `venture-cube/data_scraping_service`. This is the machinery behind the ~60% SDR number. [V]

### The Product Creator / Arkheiev UG (Apr 2026 to Aug 2026)

**428 commits** across `entopo-app/the-product-creator` (9,980 total; you are the #3 contributor,
behind only the founder's two identities). Commit span 2026-04-11 to 2026-08-06. [V]

Where your commits landed, by file touches:

| Area | Touches | What it is |
|---|---|---|
| `apps/entopo/src` | 1,614 | The product itself (canvas + AI + graph). **NDA-scoped.** |
| `packages/ui/src` | 925 | The shared design system and component library |
| `apps/upg-local/*` | 154 | UPG local CLI + desktop |
| `packages/upg-spec/src` | 24 | The UPG specification package |
| `packages/graph-service/src` | 19 | Graph service |

This is not junior work. The commit log shows large-scale safe deletions (retiring a 48-renderer
registry; a 35-file subsystem at -13.4k LOC), a dependency-security sweep taking 24 alerts down to
a low-single-digit residual, an AI provider migration off a direct vendor API onto a gateway, test
work, and ownership of design tokens and Storybook inside `packages/ui`. **Describe all of this as
craft. Never with internal ticket IDs, codenames, or subsystem names.** [V]

**Unified Product Graph (open source, full detail allowed).** Now at **v0.41.0**, not the v0.2
recorded in the ledger. **8 published npm packages** under `@unified-product-graph` (`core`, `sdk`,
`cli`, `mcp-server`, `cloud-server`, `adapters`, `markdown`, `templates`) totalling **~28,000
downloads per month**. Public repos: `unified-product-graph/spec` and `unified-product-graph/tools`.
Your contribution per the ledger: Node.js MCP server operations exposing 90+ graph read/write APIs
to AI agents, CLI and data-sync alignment to spec, entity-schema properties, and guided AI skills
that turn natural-language sessions into structured product graphs. [V for registry numbers, L for
contribution scope]

> **Caution:** the "90+ APIs" figure comes from master.md when the spec was at v0.2. It is now
> v0.41.0. Either re-count before publishing that number or state the capability without a count.

---

## 3. The hard numbers (what a skimmer absorbs)

| Number | Claim | Evidence |
|---|---|---|
| **2 raises** | Adloom.ai raised seed (your research and decks contributed); Deals24.ai raised and later failed | master.md 2026-06-06 + owner 2026-09-18 [L] |
| **20,000+** | live advertising assets on Adloom.ai in production | master.md [L] |
| **~60%** | reduction in manual SDR effort per campaign cycle | master.md [L] |
| **5 hrs to 5 min** | billboard location scouting, >90% faster | master.md [L] |
| **3 dashboards** | investor, seller, admin, built end to end by one engineer (Deals24.ai) | owner 2026-07-10 [L] |
| **~8% / ~78%** | lower overshoot / lower energy vs baselines, IEEE paper | doi 10.1109/ICNWC68145.2026.11518407 [L] |
| **428** | commits to a production AI-native monorepo | git log [V] |
| **8 packages, ~28k/mo** | npm packages under `@unified-product-graph`, monthly downloads | npm registry, 2026-09-18 [V] |
| **94.3% / 100% / 0** | LedgerLine canonicalizer accuracy / abstain recall / false-accepts | repo README [V] |
| **22 test classes** | JUnit 5 + Testcontainers, LedgerLine backend | repo [V] |
| **sub-400ms** | pgvector RAG retrieval across 10+ concurrent sessions | master.md [L] |
| **CGPA 8.75** | B.Tech CSE (IoT), SNU Chennai, alongside an IIT Madras BS in Data Science | master.md [L] |

**Credentials block:** IEEE publication · dual degree · INR 10,000 STIRS university seed funding
(your research and pitch won it) · Hack2Skill GenAI Hackathon finalist · five certifications (Udemy
AI Engineer track, two IIT Kharagpur NPTEL, Angela Yu web dev, Microsoft) · President of the
English Literary Club for two years (10+ events, compered on stage) · Under Secretary General,
Delegate Affairs, MUN. [L]

---

## 4. THE PROJECT ROSTER

### Tier 1 — earns a full case study (4)

| # | Project | Why it earns depth | Link | Role |
|---|---|---|---|---|
| 1 | **Adloom.ai** (Venture Cube) | The only documented funding outcome, plus the best production numbers. Zero-to-one with money attached. | no public repo (private org) | flagship |
| 2 | **LedgerLine** | The engineering-depth flagship. Java 21 + Spring Boot 3.4, 8 Gradle modules, multi-tenant never-negative double-entry ledger, PostgreSQL RLS + data-driven RBAC, 11 REST controllers, JWT, idempotent CSV/PDF ingestion, pessimistic row locking, hand-written SQL (no ORM), 13 Flyway migrations, transactional outbox, 22 JUnit/Testcontainers classes, Next.js 14 + strict TS frontend. Plus a hybrid ML/LLM bank-statement canonicalizer (deterministic rule floor, then MiniLM embeddings over pgvector, then a LangGraph constrained fallback with confidence gating that abstains under threshold): 94.3% accuracy, 100% abstain recall, zero false-accepts. | `FraanW/ledgerline-money-tracker` public, **19KB README** [V] | flagship |
| 3 | **Deals24.ai** (Venture Cube) | Three role dashboards end to end, one engineer, and a **second venture that raised**. Proves the pattern repeats rather than being one lucky outcome. The shutdown gets disclosed in the same breath as the raise (see §2). Sanady.ai rides along as a one-line coda. | no public repo | supporting |
| 4 | **Entopo + UPG** (The Product Creator) | The AI-native argument and, depending on §8, the current chapter. Entopo stays inside the NDA guardrails; UPG carries the detail (8 npm packages, ~28k downloads/mo, MCP graph APIs, spec work). | `unified-product-graph/spec`, `/tools`; npm `@unified-product-graph/*` [V] | current |

### Tier 2 — strong one-liners with a live link ("Also built")

| Project | One-line signal | Link | Landable? |
|---|---|---|---|
| **Multi-Tenant Research Orchestration Platform** | Stateful concurrent research workflows: FastAPI, session persistence + checkpointing, pgvector RAG under 400ms across 10+ concurrent sessions, WebSockets, cloud OCR. Your strongest system-design interview story, per `docs/interview-prep.md`. | `FraanW/Agentic-Research-Tool` public, 1.4KB README, 1 star [V] | README is thin. Needs a pass before you link it. |
| **ADCEA** | Autonomous data cleaning, feature engineering, and AutoML: Pandas/scikit-learn, JWT, async training pipelines, React SPA. Shows ML breadth beyond LLMs. | `FraanW/ADCEA` public, 3.5KB README [V] | Yes |
| **ArtiShine** — **NEW to the roster** | AI marketplace assistant for artisans: Gemini-powered product storytelling, automated Instagram posting, JWT auth, dual artisan/buyer roles, geo discovery. **This is the artifact behind the Hack2Skill GenAI Hackathon finalist award (Nov 2025)**, and you are the top contributor (29 of 56 commits). The ledger lists the award but never connects it to the code. | `Google-Hackathon-Gen/ArtiShine` public [V] | Yes. Connect award to artifact. |
| **Agentic-Fuzzy-Simulink-IoT** — **NEW to the roster** | The working implementation behind your IEEE paper: MCP server, dual fuzzy inference systems, a Gemini reasoning loop, Simulink/OTA automation. Turns the paper from a citation into running code. | `Maderanx/Agentic-Fuzzy-Simulink-IoT` public, thin README [V] | Link it beside the DOI. Needs a README pass. |

### Tier 3 — real and useful, situational (hold unless a section needs them)

| Project | Signal | Note |
|---|---|---|
| **voice-service-app** — **NEW** | Free-tier TTS microservice with an OpenAI-compatible API and three pluggable backends (Edge, Google Chirp3-HD, Chatterbox), Docker + HF ZeroGPU. | Local only, no remote [V]. Small, tidy, genuinely useful. |
| **Remedify** | Voice health assistant: Llama 3.1B, FAISS retrieval (+40% accuracy), Whisper STT + Coqui TTS, React. Adds a modality nothing else in the roster shows. | `FraanW/Kratos_Desk_Bot`, work on the `CoquiTTS-Version` branch. **Owner approved a rename 2026-09-18** — once renamed and the branch situation resolved, this is linkable. |
| **mcp-news** | An MCP server exposing Khaleej Times headlines and article content to AI agents. | `FraanW/mcp-news` public [V]. Early MCP work; its signal is carried far better by UPG now. |
| **CyberSecurity-Repo** — **NEW** | A 10-domain security curriculum with labs and a specialist agent crew, IAM-focused. Real evidence of how you ramp into a new domain. | Public. Only goes on the site **if** the FinCo role does. See §8. |
| **GradeVault** | RBAC, normalized PostgreSQL, Node/Express, 90% coverage across 20+ endpoints. | `FraanW/Student-Result-Management-System`. Reads academic next to LedgerLine. The ledger already omits it; keep it omitted. |

### Tier 4 — omit

**Social Content Extractor** — *owner call 2026-09-18: "really not a project, leave that one
alone."* Off the roster. (Noted only so a future sweep does not rediscover it and re-propose it.)

`neetcode-submissions` (practice), every `week*_devops_lab` / `Ci-Cd_*` / `ci-cd-demo` (coursework),
`MATLAB-MCP-SERVER`, `RAG_LLM`, `adloom_img_processing` (a fragment), `IoT-Based-Smart-Bin`, all
forks (`Trends-MCP`, `DocsGPT`, `watchparty`, `sensorLM`, `code-review-graph`, `ADCEA` upstream),
`LeadGen` (no git history), `Portfolio_projects` (superseded by the LedgerLine repo itself), and
`relationship` (personal).

**Not yours, do not list:** `integriix-frontend` and `shelvefy-dataset-creation` (both Shama's, org
`yugen-21`; you have 1 commit in the first and 0 in the second), `uae_businesses_collector`,
`lead_generation_reactjs`, `gmap_data_extraction` (colleagues' work). [V]

---

## 5. Skills, honestly scoped

The full inventory is in master.md. What the **site** should actually lead with, ordered by how
much evidence sits behind each:

- **Full-stack product delivery** — React/Next.js + TypeScript, FastAPI/Node/Express, PostgreSQL,
  AWS. Proven four times over on things real users touched.
- **AI-native engineering** — LLMs, RAG, agents, MCP, embeddings, semantic search. LangChain,
  LangGraph, CrewAI, FAISS, pgvector. This is the deepest, most current, most differentiated area.
- **Correctness-first backend** — Java 21 + Spring Boot, hand-written SQL, RLS, transactions,
  concurrency control, Testcontainers. LedgerLine alone carries this.
- **Product and research** — market research, pitch decks, system architecture, an IEEE paper.
- **Maintenance and support** — see §6; this is real but currently invisible.

Do not put a tag cloud on the site. The old portfolio did that and it is explicitly what this one
is built against.

---

## 6. Coverage check: does the roster prove the positioning?

| Claim you want to make | Carried by | Verdict |
|---|---|---|
| Ships MVPs that raise money | Adloom.ai (raised, survived), Deals24.ai (raised, failed) | strong, and stronger for disclosing the failure |
| Security-literate engineering | The IAM day job, Sanady's PCI DSS-aligned architecture, LedgerLine's RLS + RBAC, AWS IAM on Deals24, the dependency-security sweep at TPC | **new spine.** Four independent pieces of evidence point the same way, and no document has ever connected them |
| Engineers properly once funded | LedgerLine, the Entopo monorepo work | strong |
| End-to-end, full stack | Deals24 (3 dashboards), LedgerLine (Java + Python + Next.js), Adloom | strong |
| AI-native and agentic depth | UPG MCP, Adloom lead-gen crews, Research Platform, ADCEA, Remedify, the IEEE paper | very strong |
| Product-facing, not ticket-facing | Research and decks (Adloom, Sanady, STIRS), Sanady architecture, the Entopo design system | strong |
| Research credibility | The IEEE paper plus its implementation repo | strong |
| **Maintenance and support** | The dependency-security sweep, large-scale safe deletions, a vendor-API migration | **real but never stated.** You named this as a selling point and nothing in any document says it. It deserves its own line. |
| Open source | UPG: 8 packages, ~28k downloads/mo | strong |

---

## 7. What changed since the ledger was locked (2026-07-10)

1. **A new, current role**: Cybersecurity Analyst (IAM) at a global fintech, from 2026-07. Absent
   from the ledger entirely. Resolved in §8. [V + owner]
2. **TPC is still active**, concurrent with the day job; the 2026-08-06 last commit is a lull, not
   an exit. Resolved in §8. [owner]
2b. **Deals24.ai raised and then the startup failed.** The ledger's "raising at DIFC" status is
   superseded, and so is its "never say raised" rule. See §2 for the replacement. [owner]
3. **UPG moved v0.2 to v0.41.0**, 8 packages live, ~28k downloads/mo. Ledger numbers are stale. [V]
4. **428 commits** to the TPC monorepo: a citable number the ledger never had. [V]
5. **ArtiShine identified** as the artifact behind the hackathon-finalist award. [V]
6. **Agentic-Fuzzy-Simulink-IoT identified** as the artifact behind the IEEE paper. [V]
7. **Social Content Extractor and voice-service-app** exist and appear in no inventory. [V]
8. **Deals24.ai is still missing from `master.md`.** Backfill it. [L]
9. The job hunt ended after 2026-06-21. `job-hunt-system` is now a source of *positioning language*
   (tested headlines, the About paragraph, the keyword bank) rather than an active pipeline. Its
   best reusable asset for this site is `linkedin/profile.md` §2, which is the most human paragraph
   written about you anywhere. [V]

---

## 8. Decisions (owner, 2026-09-18) — Phase 1 re-locked

| # | Question | Decision |
|---|---|---|
| 1 | Current role on the site? | **Lead with it, but never above the FDE identity.** Framing: *Cybersecurity Analyst (IAM) / full-stack FDE by passion.* Equal weight; the FDE half is the site's reason to exist. |
| 2 | Name the employer? | **Unnamed by default** ("a global fintech"), consistent with the FinCo codename convention. Assumption, not an explicit instruction. Confirm at copy review. |
| 3 | The Product Creator status? | **Active and concurrent with the day job.** Present tense for Entopo and UPG. |
| 4 | Deals24.ai funding? | **Raised, then the startup failed.** Both facts ship together. The old "never say raised" rule is retired and replaced by the disclosure rule in §2. |
| 5 | Repo cleanup? | Rename `Kratos_Desk_Bot`; thicken the `Agentic-Research-Tool` and `Agentic-Fuzzy-Simulink-IoT` READMEs. Social Content Extractor is **not a project** and is off the roster. |

### Later owner decisions (2026-09-19)

| Item | Decision |
|---|---|
| Tech stack display | A scroll-velocity marquee of brand marks, not a tag cloud. 30 logos, two rows, names on hover. |
| **NestJS** | Added to the stack by owner statement. **It does not appear anywhere in `master.md`, the repos swept, or any prior document.** It is the only claim on the site with no corroboration behind it. Backfill master.md, or drop it. |
| Storybook | Added by owner statement, and corroborated independently: LedgerLine's frontend ships it, and Farhaan owns the Storybook setup in the TPC monorepo's `packages/ui`. No action needed. |
| AWS | Deliberately absent from the logo strip. Amazon had its mark removed from simple-icons under its trademark policy, so AWS is named in the writing rather than drawn. |
| Quote | Dylan Thomas, 1951, by way of Interstellar, replacing the Whitman line. Carries a short gloss tying it to product thinking and building with someone. |

### Open work items (not blocking design)

- [ ] Rename `FraanW/Kratos_Desk_Bot` to something matching Remedify, and resolve the
      `CoquiTTS-Version` branch so the default branch is what a visitor lands on.
- [ ] Thicken `FraanW/Agentic-Research-Tool`'s README (currently 1.4KB behind a sub-400ms claim).
- [ ] Thicken `Maderanx/Agentic-Fuzzy-Simulink-IoT`'s README (it backs the IEEE paper).
- [ ] Backfill `master.md`: Deals24.ai, the current security role, TPC still active, UPG at v0.41.0.
- [ ] Re-count the UPG MCP API surface, or publish the capability without a number.
- [x] Employer naming resolved: Fiserv is named, and its logo is on the site.
- [x] Photo resolved: an 8-bit pixel portrait, supplied 2026-09-19, background removed
      and sitting bottom-right of the hero.
- [ ] **NestJS still has no corroboration** in master.md or any repo. Backfill or drop.

Nothing here blocks design. The roster is ready to build against.
