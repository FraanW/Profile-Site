# Playbook — non-obvious gotchas

Cross-site engineering knowledge. Add an entry when a bug or trap costs real
time and would plausibly bite the other site too. Keep entries short: symptom,
mechanism, fix, where it's applied.

## Reduced motion + React hydration: anime revert() restores dimmed styles (2026-07-11)

**Symptom.** Under `prefers-reduced-motion`, content that anime.js animates
(e.g. a line faded in by a timeline) renders invisible on page load, even
though the reduced-motion code path looks correct. Found on Shama's site;
reproduced deterministically on Farhaan's production build (the contact
line's computed opacity was 0 for reduced-motion visitors).

**Mechanism.** `useReducedMotion` (a `useSyncExternalStore` over matchMedia)
must assume motion in its server snapshot, so hydration's first client render
runs the motion branch. The passive-effect flush then builds the anime
timeline and dims elements (`utils.set`, tween from-values) *before* the
store-mismatch re-render arrives. When the re-render flips to the static
branch, React first commits the static styles, then runs the old effect's
cleanup — and `timeline.revert()` restores the element's recorded
pre-animation inline styles, which are the dimmed ones. The new gated effect
runs, sees "reduced", and returns without touching anything. Net: final
frame overwritten by the reverted dim, element invisible. The same sequence
fires on a live motion→reduce preference toggle.

**Fix (two parts, both required).**
1. Gate observer/timeline creation *synchronously* inside the effect with
   `prefersReducedMotion()` (matchMedia read at effect time — it is accurate
   on the first client pass), not with the render-gate value alone. This
   keeps hydration's motion-first effect pass from ever creating observers
   for reduced-motion visitors (also required by tokens.md §4.4: zero
   ScrollObservers created).
2. The static path must *explicitly set the final frame* (`utils.set` to
   resting opacity/transform, `draw: '0 1'`), never rely on "the markup is
   already right": after a reverted motion pass (live toggle), the markup is
   NOT right, and the explicit set repairs it. Keep the reactive
   `useReducedMotion` value in the effect deps so toggles re-run the effect.

**Where applied (Farhaan).** `site/src/components/Camera.tsx`,
`site/src/sections/Contact.tsx`, `site/src/components/pages/LandingPage.tsx`.
Components that only ever gate synchronously (`Reveal`, `StatementRule`,
`Hero`, `CaseTiles`, `RadialGraph`, `NodeCard`, `GraphNode`, `TopBar`,
`DottedBackground`) never had the bug — the render-gate pattern is the trap.

## Custom CSS classes must live in `@layer components` (Tailwind v4)

**Symptom.** A utility at the call site silently does nothing. `leading-[1.18]`
on an element that also has `.display` computes to `.display`'s line-height.
`text-ink/80` on an element with `.prose-serif` renders in `.prose-serif`'s
colour.

**Cause.** `@import "tailwindcss"` sets up the cascade layers. A bare
`.display { ... }` written after that import sits *outside* every layer, and
unlayered rules beat layered ones at equal specificity. Tailwind's utilities
are in a layer, so they lose.

**Fix.** Put site classes inside `@layer components { ... }`. Utilities are
emitted after components, so overrides at the call site work again.

**Why it matters more than it sounds.** This does not error, it does not warn,
and it does not look broken in isolation. It cost two real bugs on Farhaan's
site before being diagnosed: a quote stuck at headline leading, and the
projects-page intro paragraph rendering in near-invisible ivory on a light
ground. Both looked like content mistakes rather than a cascade problem.
