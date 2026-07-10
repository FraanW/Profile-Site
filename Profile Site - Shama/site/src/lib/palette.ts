/**
 * Hex mirrors of design/tokens.md §1 (palette v2) for anime.js color tweens
 * (the engine interpolates literal color values, not CSS variables).
 * tokens.md and globals.css are the source of truth; if a value changes
 * there, it changes here. Components import from this module only — no
 * inline hex anywhere.
 *
 * `--color-night` (#000000) is deliberately NOT mirrored: no animation ever
 * tweens to the ground color, and the tokens.md §7 checklist requires that
 * `#000` appear exactly once in the codebase, at the token's definition.
 */
export const CARD = "#0D0D10";
export const STAR = "#F7F5FA";
export const MOON = "#E9E6F0";
export const DIM = "#C8C1DC";
export const VIOLET = "#A886FF";
export const VIOLET_INK = "#9165FF";
export const VIOLET_DEEP = "#7C3AED";
export const RULE = "#2B2340";
export const RULE_FAINT = "#1B1626";
export const SELECTION = "#2E2452";
