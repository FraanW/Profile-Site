# Shama Anjum — profile site (prototype)

Flame and stars, on palette v2: a fully black night sky where the stars are white and emit
violet, projects are stars, and a drawn instrument rides the margin. Built against
`../design/blueprint.md` (binding intent) and `../design/tokens.md` (binding values; three
dated revision layers — current law is the unstruck text).

> **Content is placeholder.** Shama's intake has not happened; the only truth on the page is
> the 8 project titles from `../context/intake-notes.md` (scope notes bind: Adloom and
> Shelvefy are AI-engine scope, Cohorts dashboard is ongoing). Nothing may deploy until
> `context/profile.md` exists, Shama locks it, and Dwight passes the build. All content
> lives in `src/content/copy.ts` behind a placeholder banner. Shama is non-binary:
> they/them everywhere.

## Stack

Next.js 16 (App Router, TypeScript, fully static) · Tailwind CSS v4 (tokens as a verbatim
`@theme` block in `src/app/globals.css`) · anime.js v4 (the sole motion engine, no spring) ·
Storybook 10 (the design-review surface).

## Scripts

```bash
npm run dev              # app on :3000
npm run storybook        # storybook on :6007
npm run build            # production build (static)
npm run build-storybook  # static storybook
npm run lint             # eslint
npm run typecheck        # tsc --noEmit
```

## Layout

```
src/app          routes, layout (fonts), globals.css (the token contract)
src/content      copy.ts — ALL visitor-facing words, placeholder-marked
src/lib          motion.ts (eases/durations/shimmer cage from tokens §4), palette.ts
src/components   Reveal, GlintLink, Star, Plaque, PullQuote, Section, TopBar, Camera, StarCard
src/sections     Hero, About, CaseTiles, Constellation, Signals, Contact, Footer
src/stories      foundation stories (colors, type, emission, motion, rules)
```

## The devices

- **The constellation** (`src/sections/Constellation.tsx`): a hand-composed SVG sky directly
  on the black ground — eight white stars, seven violet edges (ink chain, deep branches), an
  open chain that branches once. Edges draw with `trace`, stars kindle with `kindle`,
  plaques are real links with real focus rings. Below `lg` it re-composes as a vertical sky
  column. After entry, the idle shimmer breathes inside its tokens §4.4 cage: one star's
  emission halo at a time, velvet, viewport-gated, silent under reduced motion.
- **The camera** (`src/components/Camera.tsx`): the DSLR rail device shared with Farhaan's
  site by owner decision, drawn in this system — violet-ink and violet-deep strokes at
  1.25/1, scrubbed bidirectionally along the right margin, silhouette complete by signals.
  At contact the rail hands off over disjoint scroll bands (one camera at every scroll
  position) and the glyph glides to the CTA on velvet, blinks, and fires the capture flash
  once: star-white core, loud-violet rays, `bg-emission` bloom, inside the 2600ms budget.
- **The pull-quotes** (`src/components/PullQuote.tsx`): Playfair Display 500 italic (the
  only slice loaded — the register lock is structural), dim ink, 40ch, fading in once on
  velvet. TODO(Lefler) stand-ins themed on building business prototypes from scratch to
  scale; never attributed.

Reduced motion renders every final frame (stars lit, sky drawn, camera parked by the CTA,
quotes visible) and constructs zero ScrollObservers and zero shimmer.
