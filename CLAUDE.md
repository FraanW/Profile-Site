# CLAUDE.md — Profile Sites

Guidance for Claude Code in this workspace. This repo builds **personal profile landing pages** that
position their owners as **Forward-Deployed Full-Stack Engineers** — people who can take any
engineering problem, ship an MVP that raises money, and then scale it properly once the money lands.

Two sites live here:

| Site | Directory | Owner | Status |
|------|-----------|-------|--------|
| Farhaan | `Profile_Site_Farhaan/` | Muhammad Farhaan | Context phase |
| Shama | `Profile Site - Shama/` | Shama Anjum (Farhaan's friend; **non-binary, they/them — always**) | Design phase (intake pending) |

## Prime directives

1. **Truth only.** Every claim on either site must trace to that person's `context/profile.md`, which
   itself traces to real evidence (resume master, repos, confirmations by the owner). Re-framing and
   re-emphasis are fine; fabrication never. When in doubt, ask the owner.
2. **No AI slop.** These sites exist to prove their owners ship *without* AI slop — so the sites
   themselves must have none. Every sentence follows `shared/writing-style.md`. Every design choice
   avoids the templated-portfolio look. The `critic` agent gates both before anything ships.
3. **NDA discipline.** Farhaan's current work on Entopo is under NDA with Captain San. What may and
   may not be said is spelled out in `Profile_Site_Farhaan/context/profile.md` § NDA guardrails.
   Never exceed it. UPG is open source — full detail allowed.
4. **Impress in 30 seconds.** The reader is a founder deciding who builds their MVP, or an engineering
   manager screening candidates. If the first viewport doesn't make them want to scroll, it failed.

## Build order (per site)

1. **Context** — `context/profile.md` complete and owner-approved. No design or code before this.
2. **Design system** — visual identity, tokens, typography, layout language (`design/` in each site).
3. **App** — Next.js build in the site directory.
4. **Deployment** — Vercel, custom domain, OG/SEO, analytics.

Farhaan's site goes first, start to finish. Shama's follows, reusing the crew and the tooling but
with their own context and their own visual identity (the two sites must not look like the same
template). Shama is non-binary: they/them in every document, every commit message, every word of
site copy. They take it seriously; so does this repo.

## The crew

Six agents in `.claude/agents/`, drawn from three universes (Star Trek/TPC + job-hunt-system,
God of War, The Office). Lanes are strict; hand off rather than overlap.

| Agent | Universe | Role | Invoke for |
|-------|----------|------|-----------|
| `riker` | Star Trek / TPC | Design Director | Design direction, tokens, typography, layout language, motion rules |
| `sindri` | God of War | Frontend Builder | Scaffold, components, pages, animation implementation, performance, a11y |
| `mimir` | God of War / job-hunt-system | Content Strategist | Information architecture, section choice, case-study structure, proof-point curation |
| `lefler` | Star Trek / job-hunt-system | Wordsmith | Headlines, About, case studies, microcopy — human voice only, governed by Lefler's Laws |
| `dwight` | The Office | Critic | Pre-ship review of any design, copy, or build; slop detection; truth audit |
| `darryl` | The Office | Launch Ops | Vercel setup, domains, OG images, meta/SEO, analytics, Lighthouse |

Typical flow: Mimir decides *what* → Lefler writes it → Riker shapes it → Sindri builds it →
Dwight tears it apart → fix → Darryl ships it.

Lefler and Mimir are deliberately the same Lefler and Mimir from `job-hunt-system`
(`D:\github repos\job-hunt-system\.claude\agents\`): Lefler writes the words, Mimir engineers
the human path to a yes. One voice, one strategy, across both systems.

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript, static-first — these are content sites)
- **Styling:** Tailwind CSS v4, design tokens defined per site in `design/tokens`
- **Motion:** CSS-first; Framer Motion only where it earns its bundle weight
- **Deploy:** Vercel
- **Analytics:** decide at launch phase (Vercel Analytics default)

## Conventions

- **No em dashes in site copy.** They read as AI-generated. Use commas, colons, periods, "to" for
  ranges. (Repo docs like this file are exempt; anything a visitor reads is not.)
- Shared, person-independent knowledge lives in `shared/` (persona, writing style, later: reusable
  tooling notes). Person-specific truth lives in `<site>/context/`.
- Dates in filenames: `YYYY-MM-DD`.
- Owners click "deploy to production" themselves. Preview deploys are fair game.
- Record non-obvious gotchas in `shared/playbook.md` (create on first gotcha).

## Source material (Farhaan)

- `D:\github repos\job-hunt-system\resume\master.md` — authoritative fact record
- `D:\github repos\job-hunt-system\linkedin\profile.md` — tested positioning language
- Old portfolio (muhammad-farhaan.netlify.app) — predecessor; replace, don't imitate
