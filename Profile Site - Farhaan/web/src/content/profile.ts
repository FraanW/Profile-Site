/**
 * Every string here traces to context/project-roster.md and context/profile.md.
 * Writing rules from shared/writing-style.md apply to all of it: no em dashes,
 * sentence case, no banned vocabulary, numbers instead of adjectives.
 *
 * NDA: nothing about Entopo may exceed entopo.app's public pages.
 */

export const identity = {
  name: "Muhammad Farhaan",
  location: "Chennai, India",
  email: "farhaan@theproductcreator.com",
  emailAlt: "mdfarhaanhere@gmail.com",
  github: "https://github.com/FraanW",
  linkedin: "https://linkedin.com/in/muhammadfarhaan",
};

export const hero = {
  headline: "I turn ideas into systems that ship and hold up.",
  support:
    "Product thinking and full-stack engineering, with security designed in rather than bolted on.",
  now: "Cybersecurity analyst at Fiserv in Chennai, working in identity and access, building AI into how the security team works. Contributing to the open Unified Product Graph alongside it.",
};

/**
 * The record, in the order it happened. Never the word "intern": owner
 * instruction 2026-09-18, and it was never an accurate description of the work
 * anyway. "Founding engineer" is a sanctioned framing in resume/master.md.
 */
export const experience = [
  {
    org: "Fiserv",
    role: "Cybersecurity analyst, identity and access",
    period: "2026 to now",
    where: "Chennai",
    line: "I work in the IAM solutions domain and build AI systems for the security wing, which is where the product half of me and the security half finally do the same job.",
  },
  {
    org: "Unified Product Graph",
    role: "Open source contributor",
    period: "2026 to now",
    where: "Remote",
    line: "I build the Model Context Protocol server that lets AI agents read and write product knowledge as a typed graph, plus the local command line and parts of the spec. Eight packages on npm.",
  },
  {
    org: "Venture Cube",
    role: "Founding engineer",
    period: "2024 to 2026",
    where: "Dubai, remote",
    line: "Four ventures. I built Adloom.ai and every dashboard behind Deals24.ai, ran the research and the decks for Sanady.ai, and shipped all of it against real deadlines with real money watching.",
  },
];

/** The build sequence, for the morphing sequence component. */
export const process = [
  "Identify the problem",
  "Think",
  "Ideate",
  "Plan",
  "Validate",
  "Build",
  "Scale",
];

/**
 * Keating recites this to his class in Dead Poets Society. The line is Walt
 * Whitman's, from "O Me! O Life!", so both get named: attributing it only to
 * the film would be wrong, and only to Whitman would lose why it was chosen.
 *
 * It earns its place because it is an invitation rather than a boast. The work
 * is already going on; you are asked to add to it. That is the same offer the
 * contact section makes.
 */
export const quote = {
  text: "That the powerful play goes on, and you may contribute a verse.",
  source: "Walt Whitman, by way of Dead Poets Society",
};

export const about = [
  "I spent a year as a founding engineer in a Dubai venture studio, building products from the first conversation about them. I built Adloom.ai's platform and every dashboard behind Deals24.ai, and ran the research and the product process for Sanady.ai. Two of those ventures raised money. One of them did not survive anyway, and that taught me more than the raise did.",
  "Now I work in identity and access security at Fiserv, and build AI systems for the security team there. I care about systems that are still correct at three in the morning, under load, when nobody is watching. That is the same instinct behind both halves of the job.",
];

/**
 * The agentic-harness argument. Framing and figures come from
 * unifiedproductgraph.org (324 entity types, 37 domains, 6 edge types), which
 * is open source, so there is no NDA question here. Nothing about Entopo.
 */
export const harness = {
  heading: "A team of two, carrying the context of a team of ten.",
  body: [
    "AI expanded what you can produce, not what you can hold in your head. One person now ships in a week what used to take a team a quarter, and almost none of it is connected by design. The documents pile up and the context does not.",
    "So I stopped handing agents documents and started handing them a graph. Product knowledge goes into UPG as typed entities with explicit relationships: a persona connects to a need, a need to an opportunity, an opportunity to the solution and the experiment that tested it. 324 entity types across 37 domains, joined by six kinds of edge.",
    "Then I build the harness on top of it. Agents read that graph through a Model Context Protocol server rather than guessing from prose, so they start already knowing what the product is and what was decided about it last week. The same graph renders as an opportunity solution tree, a business model canvas, or a roadmap, so nobody rebuilds the context to answer a different question.",
    "That is what makes a small team fast. Planning stops being a meeting where everyone reloads the same background, and the work of staying on the same page is done by the graph instead of by people.",
  ],
  link: { label: "unifiedproductgraph.org", href: "https://unifiedproductgraph.org" },
};

export type Project = {
  name: string;
  year: string;
  role: string;
  summary: string;
  detail: string;
  stack: string[];
  proof: { figure: string; label: string }[];
  href?: string;
  hrefLabel?: string;
};

export const work: Project[] = [
  {
    name: "Adloom.ai",
    year: "2025",
    role: "Founding engineer",
    summary: "An AI-driven billboard advertising platform, taken from nothing to real campaigns.",
    detail:
      "I built the services and the frontend, then the part that mattered most: a recommendation engine that matched brands to billboard locations using Google Places data, geohash proximity, and semantic search over embeddings. Scouting a campaign's locations went from about five hours to about five minutes. I also ran the market research and built the pitch decks, which fed the seed raise.",
    stack: ["FastAPI", "React", "PostgreSQL", "AWS EC2, RDS, Amplify"],
    proof: [
      { figure: "20,000+", label: "live advertising assets in production" },
      { figure: "5 hrs to 5 min", label: "campaign location scouting" },
      { figure: "~60%", label: "less manual sales effort per cycle" },
    ],
  },
  {
    name: "LedgerLine",
    year: "2026",
    role: "Solo, end to end",
    summary: "A double-entry money ledger built so that it cannot go wrong quietly.",
    detail:
      "Balances can never go negative, every movement is double-entry, and tenants are isolated at the database with row-level security rather than in application code that someone can forget to call. I wrote the SQL by hand instead of reaching for an ORM, locked rows pessimistically where concurrency could corrupt a balance, and put a transactional outbox between the ledger and anything downstream. The statement reader is a hybrid: deterministic rules first, embeddings second, a constrained language model last, and it abstains rather than guessing when confidence drops.",
    stack: ["Java 21", "Spring Boot 3.4", "PostgreSQL with RLS", "Next.js", "LangGraph"],
    proof: [
      { figure: "94.3%", label: "statement categorisation accuracy" },
      { figure: "zero", label: "false accepts, at 100% abstain recall" },
      { figure: "22", label: "test classes against real containers" },
    ],
    href: "https://github.com/FraanW/ledgerline-money-tracker",
    hrefLabel: "Read the code",
  },
  {
    name: "Deals24.ai",
    year: "2025",
    role: "Full-stack engineer",
    summary: "A distressed real-estate platform with three different people to serve.",
    detail:
      "Investors, sellers, and admins each needed their own view of the same deals, and each view had a different idea of what mattered. I built all three end to end, on one FastAPI backend, with access scoped through AWS IAM. The venture raised its round. The company did not make it, which is worth saying plainly: I built the product, not the business, and both facts belong on the same page.",
    stack: ["FastAPI", "React", "PostgreSQL", "AWS with IAM"],
    proof: [
      { figure: "3", label: "role dashboards, built end to end" },
      { figure: "raised", label: "then closed, and I am not hiding it" },
    ],
  },
  {
    name: "Unified Product Graph",
    year: "2026 to now",
    role: "Core founding engineer",
    summary: "An open standard for product knowledge, and the tooling that makes it usable.",
    detail:
      "Product knowledge usually lives in documents that no machine can read. UPG is an open TypeScript standard that turns it into a graph, and I build the tooling on top: the Model Context Protocol server that lets AI agents read and write that graph safely, the local command line, and parts of the spec itself. I also build the full-stack app for Entopo, an AI-native product creation tool with a canvas, AI, and a graph.",
    stack: ["TypeScript", "Node.js", "Model Context Protocol", "Next.js"],
    proof: [
      { figure: "8", label: "packages published to npm" },
      { figure: "~28,000", label: "downloads a month" },
      { figure: "428", label: "commits into the production monorepo" },
    ],
    href: "https://github.com/unified-product-graph",
    hrefLabel: "See the standard",
  },
];

export const alsoBuilt = [
  {
    name: "Research orchestration platform",
    line: "Long-running agent research that survives a crash. Session checkpointing, and retrieval under 400ms across ten concurrent sessions.",
    href: "https://github.com/FraanW/Agentic-Research-Tool",
  },
  {
    name: "ADCEA",
    line: "Hands a model a raw dataset and gets back a cleaned, feature-engineered, trained baseline without a human in the loop.",
    href: "https://github.com/FraanW/ADCEA",
  },
  {
    name: "ArtiShine",
    line: "Artisans photograph their work and get a written story and a social post back. Finalist at the Hack2Skill GenAI hackathon.",
    href: "https://github.com/Google-Hackathon-Gen/ArtiShine",
  },
  {
    name: "Agentic fuzzy control",
    line: "The running implementation behind the IEEE paper: a fast fuzzy controller with a slower reasoning loop above it, deciding the rules.",
    href: "https://github.com/Maderanx/Agentic-Fuzzy-Simulink-IoT",
  },
];

export const signals = [
  {
    figure: "IEEE, 2026",
    label: "Agentic fuzzy control: a dual-loop framework for self-adaptive IoT systems",
    note: "About 78% lower energy and 8% lower overshoot against static and fuzzy-only baselines.",
    href: "https://ieeexplore.ieee.org/document/11518407",
  },
  {
    figure: "Two degrees at once",
    label: "B.Tech in computer science at Shiv Nadar Chennai, CGPA 8.75, and a BS in data science at IIT Madras",
  },
  {
    figure: "Seed funded at university",
    label: "Won INR 10,000 and approval for an IoT build under the STIRS programme, on my own research and pitch",
  },
];

export const contact = {
  invitation:
    "I am looking for people with an idea worth building. Bring it early, bring it half-formed. We can take it from ideation to product to scale together.",
};
