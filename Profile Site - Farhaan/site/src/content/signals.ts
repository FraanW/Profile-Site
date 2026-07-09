/** Signals section data (blueprint §6.6). Facts from context/profile.md. */

export type Signal = {
  /** Mono row label, lowercase. */
  label: string;
  /** Serif detail. */
  detail: string;
  /** Mono figure/reference. */
  figure: string;
  href?: string;
};

export const signals: Signal[] = [
  {
    label: "ieee publication",
    detail:
      '"Agentic Fuzzy Control: A Dual-Loop Framework for Self-Adaptive IoT Systems", ICNWC 2026. ~8% lower overshoot and ~78% lower energy than baselines.',
    figure: "doi 10.1109/ICNWC68145.2026.11518407",
    href: "https://ieeexplore.ieee.org/document/11518407",
  },
  {
    label: "dual degree",
    detail:
      "B.Tech CSE (IoT) at Shiv Nadar University Chennai, CGPA 8.75, alongside a BS in Data Science at IIT Madras.",
    figure: "2022 to 2026 · 2023 to 2027",
  },
  {
    label: "hackathon",
    detail: "Finalist, Hack2Skill GenAI Hackathon: an AI marketplace assistant for artisans.",
    figure: "nov 2025",
  },
];
