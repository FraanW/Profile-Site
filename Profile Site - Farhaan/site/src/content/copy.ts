/**
 * DRAFT COPY — every string in this file is placeholder prose written by
 * Sindri from context/profile.md facts, obeying shared/writing-style.md
 * (no em dashes, no banned vocabulary, funding discipline per venture).
 *
 * PENDING LEFLER. Nothing here ships. Lefler edits this file only; components
 * never hardcode visitor-facing words.
 */

export const hero = {
  /** Headline claims, under 10 words (writing law). Two drafts to compare. */
  claims: {
    short: "Full-stack AI engineering with product judgment.",
    long: "AI-native full-stack engineering, from first research to funded build.",
  },
  /** Support line, under 25 words. */
  support:
    "I drove the research and MVP behind Adloom.ai's seed raise. I build the open-source Unified Product Graph standard.",
  scrollCue: "scroll",
} as const;

export const about = {
  heading: "About",
  /** 60 to 90 words, first person, the title-versus-scope story (blueprint §6.3). */
  body:
    "My title at Venture Cube said intern. The scope said otherwise: I ran research and MVP builds for Adloom.ai and Sanady.ai, and built Deals24.ai's investor, seller and admin dashboards end to end. Adloom.ai raised seed funding; my research and pitch decks contributed. Now I build at The Product Creator as a Core Founding Engineer: Entopo's full-stack app, and the open-source Unified Product Graph. Two degrees ran in parallel. One IEEE paper came out the other side.",
  /** Mono caption under the squared photo: name, place, year. */
  photoCaption: "muhammad farhaan · chennai · 2026",
  photoAlt: "Muhammad Farhaan", // final alt text is Lefler's
} as const;

export const caseTiles = {
  heading: "The evidence",
} as const;

export const graphSection = {
  heading: "The graph",
  intro: "Every node is a real project. Open one.",
} as const;

export const signalsSection = {
  heading: "Signals",
} as const;

export const contact = {
  heading: "Contact",
  /** One tiny ask (blueprint §6.7). */
  ask: "One email starts it. Tell me what you want to build.",
  cta: "email farhaan",
  /**
   * The airplane's landing line. Sentiment is owner-locked ("let's lift off,
   * reach out to me with your ideas, let's build"); the wording below is a
   * DRAFT carrier for that sentiment. Lefler writes the shipped line.
   */
  planeLine: "Cleared for takeoff. Send an idea and let's build.",
} as const;

export const projectsPage = {
  /** One-sentence intro line (blueprint §5). */
  intro: "The graph's nodes, grown into cards, with exact numbers.",
  back: "back",
} as const;

export const nav = {
  projects: "projects",
  contact: "contact",
} as const;
