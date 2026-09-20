/**
 * Every string here traces to context/project-roster.md and context/profile.md.
 * Writing rules from shared/writing-style.md apply to all of it: no em dashes,
 * sentence case, no banned vocabulary, numbers instead of adjectives.
 *
 * NDA: nothing about Entopo may exceed entopo.app's public pages.
 */

import type { HeroTitle } from "@/components/HeroAvatar";
import type { ProcessStep } from "@/components/ProcessMorph";

export const identity = {
  name: "Muhammad Farhaan",
  location: "Chennai, India",
  /*
    Swapped 2026-09-21, owner's call. `email` is the one on the contact card and
    every mailto on the page; `emailAlt` is the quieter one in the footer. The
    personal address leads now, because the card says "the fastest way to reach
    me" and that has to be the inbox he actually reads. The Product Creator
    address stays on the page, one line down.
  */
  email: "mdfarhaanhere@gmail.com",
  emailAlt: "farhaan@theproductcreator.com",
  github: "https://github.com/FraanW",
  linkedin: "https://linkedin.com/in/muhammadfarhaan",
};

export const hero = {
  /*
    "and hold up" cut, owner 2026-09-20. The headline is drawn at up to 100px
    and ran to four lines on a phone, which pushed the support line and both
    CTAs under the fold. Three words back is most of a line back.

    The durability claim is not lost with them. It is already on the page three
    times, and in every one of them it is evidence rather than a boast, which is
    where writing-style.md wants it: about[1] ("correct under load at three in
    the morning"), contact.invitation ("already built and needs to hold up
    better than it does"), and the third skills card. Do not put it back here.
  */
  headline: "I turn ideas into systems that ship.",
  /*
    Hand-set breaks for the drawn headline, which cannot wrap on its own.
    StrokeText clips at the column edge rather than wrapping, so these are
    ceilings, not preferences: 13 characters narrow, 17 wide, measured against
    Playfair Display at the hero's clamp. Both arrays must match `headline`
    exactly, or the page draws one sentence and reads another out.
  */
  lines: {
    narrow: ["I turn ideas", "into systems", "that ship."],
    wide: ["I turn ideas into", "systems that ship."],
  },
  support:
    "Product thinking and full-stack engineering, with security designed in.",
};

/**
 * The titles the hero types, one after another, and what each one switches
 * the avatar to. Owner brief, 2026-09-19; the titles are his wording. They
 * replace the one-line status that used to sit here (Fiserv, IAM, UPG), all of
 * which is still on the page under "Where I have done it."
 */
export const heroTitles: HeroTitle[] = [
  {
    title: "Full Stack Engineer",
    article: "A",
    pose: "zen",
    planets: [
      { label: "Frontend", icon: "browser" },
      { label: "Backend", icon: "server" },
      { label: "Database", icon: "database" },
      { label: "Deployment", icon: "deploy" },
      { label: "CI/CD", icon: "pipeline" },
    ],
  },
  {
    title: "Product Thinker",
    article: "A",
    pose: "think",
    planets: [
      { label: "Product", icon: "cube" },
      { label: "Personas", icon: "people" },
      { label: "Features", icon: "checklist" },
      { label: "Roadmap", icon: "roadmap" },
      { label: "Ideas", icon: "bulb" },
    ],
  },
  {
    title: "AI and Cyber Systems Engineer",
    article: "An",
    pose: "fix",
    planets: [
      { label: "ML", icon: "neural" },
      { label: "LLMs", icon: "bot" },
      { label: "Security", icon: "shield" },
      { label: "Networks", icon: "globe" },
      { label: "Code", icon: "code" },
    ],
  },
];

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
    line: "I work in the IAM solutions domain and build AI systems for the security wing, so the product half of me and the security half finally do the same job.",
  },
  {
    org: "Unified Product Graph",
    logo: "/logos/upg.png",
    role: "Open source contributor",
    period: "2026 to now",
    where: "Remote",
    line: "I help build the Model Context Protocol server that lets AI agents read and write product knowledge as a typed graph. I've also worked on the local command line and parts of the spec, and the project has eight packages on npm.",
  },
  {
    org: "Venture Cube",
    logo: "/logos/venture-cube.png",
    role: "Founding engineer",
    period: "2024 to 2026",
    where: "Dubai, remote",
    line: "I worked across four ventures. I built Adloom.ai and every dashboard behind Deals24.ai, and ran the research and the decks for Sanady.ai, all against real deadlines with real money watching.",
  },
];

/**
 * The build sequence, for the morphing sequence component. Each step carries a
 * pixel icon (owner brief 2026-09-19); the icons live in components/PixelArt.
 * "Plan" is a treasure map on purpose: it rhymes with the pirate on the shelf.
 */
export const process: ProcessStep[] = [
  { label: "Identify the problem", icon: "magnifier" },
  { label: "Think", icon: "thought" },
  { label: "Ideate", icon: "bulb" },
  { label: "Plan", icon: "map" },
  { label: "Validate", icon: "check" },
  { label: "Build", icon: "hammer" },
  // Ship before Scale, owner's addition 2026-09-19: the rocket is the launch,
  // and scale is the team that grows around it.
  { label: "Ship", icon: "rocket" },
  { label: "Scale", icon: "team" },
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
  note: "Most products don't die loudly. They fade, and the first thing to go is the reason anyone started. Product thinking is how I keep that reason in view, and building is what makes it stick. Thomas wrote the line as a plea from one person to another, and that's the part I keep: the refusal works better with someone beside you.",
};

export const about = [
  "I spent a year as a founding engineer at a venture studio in Dubai, where I worked on products from the first conversation about them. I built Adloom.ai's platform and every dashboard behind Deals24.ai, and ran the research and the product process for Sanady.ai. Two of those ventures raised money. One of them didn't survive anyway, and that taught me more than the raise did.",
  "Now I work in IAM at Fiserv and build AI systems for the security team. I care about systems that stay correct under load at three in the morning, when nobody is watching. Product work and security work both come down to that.",
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
  /*
    Split in two, owner 2026-09-20: four paragraphs ran long enough that the
    section looked like homework. The lead is the problem, which is all anyone
    needs before deciding whether the rest is worth their time, and the three
    that follow are the answer, behind a toggle. The split is here rather than
    in the page so the writing and the cut stay in one place.
  */
  lead: "AI made it easier to produce things, but no easier to keep them all in your head. One person now ships in a week what used to take a team a quarter, and almost none of it is connected by design, so the documents pile up and the context doesn't.",
  more: [
    "So I stopped handing agents documents and started handing them a graph. Product knowledge goes into UPG as typed entities with explicit relationships: a persona connects to a need, a need to an opportunity, an opportunity to the solution and the experiment that tested it. The standard has 324 entity types across 37 domains, joined by six kinds of edge.",
    "Then I build the harness on top of it. Agents read the graph through a Model Context Protocol server instead of guessing from prose, so they start out knowing what the product is and what was decided about it last week. The same graph renders as an opportunity solution tree, a business model canvas or a roadmap, so nobody has to rebuild the context to answer a different question.",
    "This is what makes a small team fast: planning stops being a meeting where everyone reloads the same background, because the graph keeps everyone on the same page. With that in place, two people and an idea make a real team.",
  ],
  /*
    The line that carries the link, owner 2026-09-20. It does the most work in
    the collapsed state, which otherwise states a problem, offers a toggle and
    then drops a bare domain on the reader without ever naming the thing. Now
    the section names it and points at it whether or not anyone expands it.

    He builds the standard: profile.md line 28, and UPG is open source, so
    saying so here is inside the guardrails rather than near them.

    His wording was "solves this... see here:". The ellipsis and "see here" both
    go: writing-style.md would have them out, and the colon points just as well.
  */
  closer: "Unified Product Graph solves this, and it is open source:",
  link: { label: "unifiedproductgraph.org", href: "https://unifiedproductgraph.org" },
};

/*
  The old `work` and `alsoBuilt` arrays lived here and were imported by nothing.
  They were a second, quietly diverging description of the same projects that
  content/projects.ts already owns, which is exactly how a site ends up
  contradicting itself. Deleted 2026-09-19; projects.ts is the only source.
*/

/**
 * Education, from context/profile.md: B.Tech CSE (IoT), SNU Chennai, CGPA 8.75,
 * 2022 to 2026; BS Data Science, IIT Madras, 2023 to 2027.
 *
 * Owner brief, 2026-09-19: the Chennai degree is the primary one; IIT Madras is
 * secondary and still in progress, so it sits smaller and says so.
 */
export const education = {
  primary: {
    degree: "B.Tech, Computer Science and Engineering (IoT)",
    school: "Shiv Nadar University Chennai",
    detail: "2022 to 2026, CGPA 8.75",
  },
  secondary: {
    status: "Also, in progress",
    degree: "BS in Data Science",
    school: "IIT Madras",
    detail: "2023 to 2027",
  },
};

/**
 * Shown under Education, headed "I'm proud of these." (the owner's wording,
 * 2026-09-19, so they register as his own feats rather than as a list). The
 * dual-degree entry that used to be here is now the Education block itself.
 */
export const signals = [
  {
    figure: "IEEE, 2026",
    label: "Agentic fuzzy control: a dual-loop framework for self-adaptive IoT systems",
    note: "About 78% lower energy and 8% lower overshoot against static and fuzzy-only baselines.",
    href: "https://ieeexplore.ieee.org/document/11518407",
  },
  {
    figure: "Seed funded at university",
    label: "Won INR 10,000 and approval for an IoT build under the STIRS programme, on my own research and pitch",
  },
];

export const contact = {
  /*
    Two jobs, both learned the hard way.

    First, it must not echo the heading above it, which already carries
    "challenging" and "together".

    Second, and more important: the heading skews early-stage, and on its own it
    quietly turns away anyone whose product already exists. That is half of
    Farhaan's actual range, since the maintenance, migration and security work
    is real and is otherwise invisible on this page. So the paragraph widens the
    door deliberately: already built and creaking is the same conversation.

    Third: it closes on appetite rather than on a record. Owner 2026-09-19. He
    is early in his career, so a closing line that lists what he has already
    done invites the reader to measure it against people with ten more years.

    "Bring it on!" is his wording and his call. It carries the only exclamation
    mark on the site, which shared/writing-style.md otherwise bans outright, so
    it is a deliberate exception rather than an oversight. The middle sentence
    changed from "bring it early" to "show me early" so the closing lands as a
    bookend to the heading's "Bring me something challenging" instead of being
    the third "bring" in four lines.

    Two earlier drafts failed here. "The stretch before anyone is sure what the
    thing even is" was overwritten and, worse, only invited idea-stage people,
    which shuts out half his range. "I have done the first sketch and the year
    after launch" fixed the range and reintroduced the CV boast.
  */
  invitation:
    "I'm looking for people with something worth building. If it's still an idea, show me early. If it's already built and needs to hold up better than it does, that's the same conversation. Bring it on!",
};
