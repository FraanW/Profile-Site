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
  now: "Cybersecurity analyst at Fiserv in Chennai, working in IAM, building AI into how the security team works. Contributing to the open Unified Product Graph alongside it.",
};

/**
 * The record, in the order it happened. Never the word "intern": owner
 * instruction 2026-09-18, and it was never an accurate description of the work
 * anyway. "Founding engineer" is a sanctioned framing in resume/master.md.
 *
 * Logos supplied by Farhaan 2026-09-19, replacing the drawn marks that stood in
 * while none were available. These are other parties' trademarks, used here to
 * identify where he has worked. If any of them ever objects, the drawn marks in
 * OrgMark are still there and the swap is one line per row.
 */
export const experience = [
  {
    org: "Fiserv",
    logo: "/logos/fiserv.png",
    role: "Cybersecurity analyst, IAM",
    period: "2026 to now",
    where: "Chennai",
    line: "I work in the IAM solutions domain and build AI systems for the security wing, which is where the product half of me and the security half finally do the same job.",
  },
  {
    org: "Unified Product Graph",
    logo: "/logos/upg.png",
    role: "Open source contributor",
    period: "2026 to now",
    where: "Remote",
    line: "I build the Model Context Protocol server that lets AI agents read and write product knowledge as a typed graph, plus the local command line and parts of the spec. Eight packages on npm.",
  },
  {
    org: "Venture Cube",
    logo: "/logos/venture-cube.png",
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
 * Dylan Thomas, 1951, recited through Interstellar. Both are named because the
 * words are Thomas's and the film is why most people know them; crediting only
 * the film would be wrong.
 *
 * The pairing below joins the villanelle's first and third lines. Its second,
 * "Old age should burn and rave at close of day", sits between them in the
 * original. That elision is how the poem is normally quoted, and it is what
 * Farhaan asked for.
 *
 * The gloss matters as much as the quote. A famous line dropped onto a page
 * without a reason is decoration; this one has to earn its place by saying
 * something about how he works.
 */
export const quote = {
  text: "Do not go gentle into that good night. Rage, rage against the dying of the light.",
  source: "Dylan Thomas, 1951. Recited through Interstellar.",
  note: "Most products do not die loudly. They fade, and the first thing to go is the reason anyone started. Product thinking is the argument against that fade. Building is what makes the argument hold. Thomas wrote the line as a plea from one person to another, and that is the part I keep: the refusal works better with someone beside you.",
};

export const about = [
  "I spent a year as a founding engineer in a Dubai venture studio, building products from the first conversation about them. I built Adloom.ai's platform and every dashboard behind Deals24.ai, and ran the research and the product process for Sanady.ai. Two of those ventures raised money. One of them did not survive anyway, and that taught me more than the raise did.",
  "Now I work in IAM at Fiserv, and build AI systems for the security team there. I care about systems that are still correct at three in the morning, under load, when nobody is watching. That is the same instinct behind both halves of the job.",
];

/**
 * The agentic-harness argument. Framing and figures come from
 * unifiedproductgraph.org (324 entity types, 37 domains, 6 edge types), which
 * is open source, so there is no NDA question here. Nothing about Entopo.
 */
export const harness = {
  /*
    The heading used to be "A team of two, carrying the context of a team of
    ten", which stated a capability at the reader rather than offering them
    anything. "Two of us" keeps the same 2-against-10 argument, which is the
    actual point of the section, and makes the reader the second person.
  */
  heading: "Two of us could build what used to take ten.",
  body: [
    "AI expanded what you can produce, not what you can hold in your head. One person now ships in a week what used to take a team a quarter, and almost none of it is connected by design. The documents pile up and the context does not.",
    "So I stopped handing agents documents and started handing them a graph. Product knowledge goes into UPG as typed entities with explicit relationships: a persona connects to a need, a need to an opportunity, an opportunity to the solution and the experiment that tested it. 324 entity types across 37 domains, joined by six kinds of edge.",
    "Then I build the harness on top of it. Agents read that graph through a Model Context Protocol server rather than guessing from prose, so they start already knowing what the product is and what was decided about it last week. The same graph renders as an opportunity solution tree, a business model canvas, or a roadmap, so nobody rebuilds the context to answer a different question.",
    "That is what makes a small team fast. Planning stops being a meeting where everyone reloads the same background, and the work of staying on the same page is done by the graph instead of by people. Which means two people and an idea is now a real team, not a compromise.",
  ],
  link: { label: "unifiedproductgraph.org", href: "https://unifiedproductgraph.org" },
};

/*
  The old `work` and `alsoBuilt` arrays lived here and were imported by nothing.
  They were a second, quietly diverging description of the same projects that
  content/projects.ts already owns, which is exactly how a site ends up
  contradicting itself. Deleted 2026-09-19; projects.ts is the only source.
*/

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
  /*
    Rewritten so it stops echoing the heading above it. That heading now
    carries "half-formed" and "together", and this paragraph used to repeat
    both within about twenty words, which reads as a writer who liked a phrase
    too much. It earns its place by adding the claim instead.
  */
  invitation:
    "I am looking for people with an idea worth building. The earlier you bring it the better, because the part I am best at is the stretch before anyone is sure what the thing even is. Ideation to product to scale is an arc I have walked before.",
};
