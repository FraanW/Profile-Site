/**
 * The shelf. Every project Farhaan is willing to stand behind, as a book.
 *
 * Tiering and truth come from context/project-roster.md. Anything marked there
 * as omitted or "not yours" must never appear here.
 *
 * Colours are drawn from the site's plasma palette so the shelf reads as part
 * of the same world rather than a component demo.
 */

export type SymbolId =
  | "billboard"
  | "balance"
  | "keys"
  | "graph"
  | "checkpoint"
  | "sieve"
  | "kiln"
  | "dualLoop"
  | "waveform"
  | "vault";

export type ProjectBook = {
  id: string;
  /** Spine and cover title. Keep it short: long titles get truncated on spines. */
  title: string;
  /** Printed on the cover. */
  date: string;
  symbol: SymbolId;
  color: string;
  foil?: string;

  /** Left leaf of the modal. */
  year: string;
  role: string;
  context: string;
  stack: string[];
  proof: { figure: string; label: string }[];
  links: { label: string; href: string }[];

  /** Right leaf of the modal. */
  summary: string;
  body: string[];
};

export const projectBooks: ProjectBook[] = [
  {
    id: "adloom",
    title: "Adloom.ai",
    date: "2025",
    symbol: "billboard",
    color: "#16277a",
    year: "2025",
    role: "Founding engineer, Venture Cube",
    context: "Dubai, remote",
    stack: ["FastAPI", "React", "PostgreSQL", "AWS EC2, RDS, Amplify"],
    proof: [
      { figure: "20,000+", label: "live advertising assets" },
      { figure: "5 hrs to 5 min", label: "location scouting" },
      { figure: "~60%", label: "less manual sales effort" },
    ],
    links: [],
    summary: "An AI-driven billboard advertising platform, taken from nothing to real campaigns.",
    body: [
      "Brands want billboards near the people who will actually buy from them, and nobody could work out where those were quickly. A campaign planner would spend most of a working day cross-referencing maps and footfall guesses against a spreadsheet of available sites.",
      "I built the services and the frontend. The piece that mattered most was a recommendation engine that matched a brand to locations using Google Places data and geohash proximity, plus semantic search over embeddings. Scouting went from about five hours to about five minutes.",
      "Alongside that I built an agentic pipeline for lead generation, which cut the manual sales work per campaign cycle by around 60%. I also ran the market research and built the pitch decks that went into the seed raise.",
      "The platform carried more than twenty thousand live advertising assets and real client campaigns while I worked on it.",
    ],
  },
  {
    id: "ledgerline",
    title: "LedgerLine",
    date: "2026",
    symbol: "balance",
    color: "#0b1e4b",
    year: "2026",
    role: "Solo, end to end",
    context: "Personal, open source",
    stack: [
      "Java 21",
      "Spring Boot 3.4",
      "PostgreSQL with row-level security",
      "Next.js 14",
      "Supabase auth",
      "LangGraph",
    ],
    proof: [
      { figure: "never negative", label: "an envelope cannot be overspent, even under concurrent posting" },
      { figure: "94.3%", label: "statement categorisation, with zero false accepts" },
      { figure: "13", label: "migrations, about 1,100 lines of deliberate SQL" },
      { figure: "22", label: "test classes against real Postgres in containers" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/FraanW/ledgerline-money-tracker" }],
    summary: "Upload a bank statement and it becomes a budget you physically cannot overspend.",
    body: [
      "Money Tracker is the product; LedgerLine is the platform underneath it. You upload a bank statement, as CSV or as a password-protected PDF, and it comes back as an envelope budget. The password unlocks the file in memory on the server and is never written down or logged.",
      "Every budgeting app I've used categorises spending after the fact, which makes it more of a diary than a budget. This one limits spending up front. Income lands in Unallocated, you spread it across envelopes, and any spend that would take an envelope below zero is refused. The database and the ledger enforce that rule together, so there's no warning to click past.",
      "The whole engineering problem is keeping that promise when two people spend at once. Every movement is a balanced set of entries that sum to zero. Before posting, the service takes row locks in a deterministic order so it can't deadlock. It then recomputes the balance from the entries instead of trusting a stale read, and rejects the whole transfer if any envelope would go negative. Replaying the same spend returns the existing transfer, and a unique constraint makes sure of it. An adversarial multi-threaded test suite runs all of this against real Postgres in containers.",
      "I wrote every statement by hand instead of using an ORM. The locking order and the timing are the design here, and an ORM hides exactly the part that has to be precise. Tenants are separated by row-level security set per transaction, so isolation holds even if application code forgets to ask for it.",
      "On top of that sits the part people actually see: a dashboard, envelopes, transactions with search and upload, household members with their own permissions, net worth, and a gallery of 26 different philosophies of tracking money. It ships three persona themes, Gen Z, Millennial and Senior, which restyle every screen through design tokens and follow the user between sessions.",
      "The statement reader is the piece I'm most pleased with. Merchant strings from Indian banks are noisy, so it tries deterministic rules first, then sentence embeddings, and uses a constrained language model only as a last resort. When confidence drops, it abstains instead of guessing. It reaches 94.3% accuracy with no false accepts, because a wrong category filed silently is worse than a question asked out loud.",
    ],
  },
  {
    id: "deals24",
    title: "Deals24.ai",
    date: "2025",
    symbol: "keys",
    color: "#2233b8",
    year: "2025",
    role: "Full-stack engineer, Venture Cube",
    context: "Dubai, remote",
    stack: ["FastAPI", "React", "PostgreSQL", "AWS with IAM"],
    proof: [
      { figure: "3", label: "role dashboards, end to end" },
      { figure: "raised", label: "then the company closed" },
    ],
    links: [],
    summary: "A platform for distressed real estate, serving three kinds of user.",
    body: [
      "Investors, sellers and admins each needed their own view of the same deals, and they disagreed about what mattered. Investors look at yield and risk, sellers want speed and certainty, and an admin wants to see everything while touching very little.",
      "I built all three dashboards end to end on one FastAPI backend, with access scoped through AWS IAM so that the boundary between those three views was infrastructure rather than a conditional in a template.",
      "The venture raised its round, and the company still didn't survive. I'm putting both facts on the same page because a portfolio that lists only the raises is marketing. I built the product. The business, which I didn't build, is what ran out of road.",
    ],
  },
  {
    id: "sanady",
    title: "Sanady.ai",
    date: "2025",
    symbol: "vault",
    color: "#0b1e4b",
    year: "2025",
    role: "Ideation, research and product lead",
    context: "Venture Cube, Dubai",
    stack: ["System architecture", "PCI DSS alignment", "Product process"],
    proof: [
      { figure: "0 to MVP", label: "ideation through to a built product" },
      { figure: "PCI DSS", label: "architecture aligned for lending" },
    ],
    links: [],
    summary: "Small loans for expatriates, designed from the first conversation about it.",
    body: [
      "Expatriate workers in the UAE are among the least well served borrowers anywhere. They need small amounts quickly and have thin credit files. The products aimed at them are usually built by people who have never had to ask for two hundred dirhams before payday.",
      "This one is mine from the idea outwards. I ran the market research, worked out who it was actually for, and designed the whole thing: the product flow, the system architecture, the transaction workflows, the lending lifecycle, and how an e-wallet would fit into it. The backend architecture was aligned to PCI DSS from the start, because retrofitting payment compliance onto a lending product is how you discover you have to rebuild it.",
      "Then I ran the MVP development process to get it built. I also produced the business research and the pitch deck.",
      "There's no funding claim attached to this one, and no repository to send you to. It's here because the work was real, and it's the clearest example of me doing the front half of the job instead of the engineering half.",
    ],
  },
  {
    id: "upg",
    title: "Unified Product Graph",
    date: "2026",
    symbol: "graph",
    color: "#4040ff",
    year: "2026 to now",
    role: "Core founding engineer, The Product Creator",
    context: "Remote, open source",
    stack: ["TypeScript", "Node.js", "Model Context Protocol", "Next.js"],
    proof: [
      { figure: "8", label: "packages on npm" },
      { figure: "~28,000", label: "downloads a month" },
      { figure: "428", label: "commits to the monorepo" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/unified-product-graph" },
      { label: "Entopo", href: "https://entopo.app" },
    ],
    summary: "An open standard for product knowledge, and the tooling that makes it usable.",
    body: [
      "Product knowledge normally lives in documents that no machine can read: a strategy deck here, a decision buried in somebody's messages there. UPG is an open TypeScript standard that turns all of it into a graph with a real schema.",
      "I help build the tooling on top of it, as part of a team. The Model Context Protocol server is the piece I care about most: it lets an AI agent read and write that graph through typed, bounded operations instead of guessing at free text. An agent can only work with the tools you give it, so to me this is an API design problem before it's a model problem.",
      "I've also contributed to the local command line, the data-sync layer, and parts of the spec itself. Eight packages are published to npm and pull around twenty-eight thousand downloads a month. That's the number I'm proudest of, because none of it is mine alone.",
      "Alongside the standard I help build the full-stack app for Entopo, an AI-native product creation tool with a canvas, AI, and a graph.",
    ],
  },
  {
    id: "research",
    title: "Research orchestration",
    date: "2025",
    symbol: "checkpoint",
    color: "#6b7bff",
    year: "2025",
    role: "Solo, end to end",
    context: "Personal, open source",
    stack: ["FastAPI", "PostgreSQL with pgvector", "WebSockets", "Cloud OCR"],
    proof: [
      { figure: "under 400ms", label: "retrieval latency" },
      { figure: "10+", label: "concurrent sessions" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/FraanW/Agentic-Research-Tool" }],
    summary: "Long-running agent research that survives a crash.",
    body: [
      "Agentic research tasks run for minutes, sometimes longer. If the process dies at minute nine and has to start again from zero, the whole product has failed.",
      "So I designed it around persistence first and the model second. Sessions checkpoint as they go, so a crashed run picks up where it stopped. Several tenants can run at once without seeing each other's work.",
      "Retrieval runs on PostgreSQL with pgvector instead of a separate vector database, and stays under 400 milliseconds across ten or more concurrent sessions. That's one less system to operate, and the data lives next to everything else it needs to join against. Progress streams to the client over WebSockets, so nothing has to poll for it.",
    ],
  },
  {
    id: "adcea",
    title: "ADCEA",
    date: "2025",
    symbol: "sieve",
    color: "#9fb0ff",
    foil: "#16277a",
    year: "2025",
    role: "Solo, end to end",
    context: "Personal, open source",
    stack: ["Python", "Pandas", "scikit-learn", "React"],
    proof: [{ figure: "end to end", label: "raw dataset to trained baseline" }],
    links: [{ label: "GitHub", href: "https://github.com/FraanW/ADCEA" }],
    summary: "Hand it a raw dataset, get back a trained baseline.",
    body: [
      "Most of the work in machine learning is cleaning: missing values, outliers, inconsistent encodings, and features that need scaling before any model will behave.",
      "ADCEA does that part without a human in the loop: it ingests a dataset, profiles it, cleans it, engineers features, and trains a baseline model through AutoML. Training runs asynchronously, and a React interface shows the profiling results and model comparisons as they arrive.",
      "It's a breadth project. I built it to show I can work outside large language models, in ordinary supervised learning, where the hard part is the data.",
    ],
  },
  {
    id: "artishine",
    title: "ArtiShine",
    date: "2025",
    symbol: "kiln",
    color: "#efe8d4",
    foil: "#2233b8",
    year: "2025",
    role: "Top contributor, team of four",
    context: "Hack2Skill GenAI hackathon",
    stack: ["Python", "Google Gemini", "JWT", "Instagram API"],
    proof: [
      { figure: "finalist", label: "Hack2Skill GenAI hackathon" },
      { figure: "29 of 56", label: "commits were mine" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/Google-Hackathon-Gen/ArtiShine" }],
    summary: "Artisans photograph their work and get a story and a social post back.",
    body: [
      "Craftspeople make objects with real histories and then have to sell them through a feed that rewards copywriting. Most of them have no interest in becoming marketers, and no reason they should have to.",
      "ArtiShine takes a photograph of a piece and produces the story behind it, then posts it. Buyers get a marketplace where they can search by where something was made as well as by keyword. Both artisans and buyers have accounts, with the permissions that implies.",
      "It went to the finals of the Hack2Skill GenAI hackathon in November 2025. I wrote 29 of its 56 commits.",
    ],
  },
  {
    id: "fuzzy",
    title: "Agentic fuzzy control",
    date: "2026",
    symbol: "dualLoop",
    color: "#25252a",
    year: "2026",
    role: "Author, published research",
    context: "IEEE ICNWC 2026",
    stack: ["Python", "Simulink", "MCP", "Gemini"],
    proof: [
      { figure: "~78%", label: "lower energy use" },
      { figure: "~8%", label: "lower overshoot" },
    ],
    links: [
      { label: "Read the paper", href: "https://ieeexplore.ieee.org/document/11518407" },
      { label: "GitHub", href: "https://github.com/Maderanx/Agentic-Fuzzy-Simulink-IoT" },
    ],
    summary: "A fast control loop, with a slower reasoning loop deciding its rules.",
    body: [
      "A fuzzy controller reacts in real time but cannot reconsider its own rules. A language model can reason about rules but is far too slow and far too unpredictable to sit in a control loop.",
      "The design runs them at different speeds. The inner loop stays a classical fuzzy controller, fast and bounded. Above it, a supervisory loop proposes candidate rule sets, simulates them, ranks them against classical stability constraints, and only then hands one down, so the reasoning never touches the real-time path.",
      "Against static rule-based and fuzzy-only baselines it drew about 78% less energy with about 8% less overshoot. The paper was published at the 2026 International Conference on Networking and Communications.",
      "The repository holds the working implementation itself: the MCP server, both fuzzy inference systems and the Simulink automation.",
    ],
  },
  {
    id: "remedify",
    title: "Remedify",
    date: "2025",
    symbol: "waveform",
    color: "#3a3a40",
    year: "2025",
    role: "Solo, end to end",
    context: "Personal",
    stack: ["FastAPI", "Llama 3.1B", "FAISS", "Whisper", "Coqui TTS"],
    proof: [{ figure: "+40%", label: "retrieval accuracy after indexing" }],
    links: [],
    summary: "A health assistant you talk to, running a local model.",
    body: [
      "Somebody unwell enough to want advice is rarely in the mood to type. This one listens, searches a dataset of remedies, and answers out loud.",
      "Whisper handles speech to text, FAISS does semantic search over the remedies dataset, a Llama 3.1B model generates the answer, and Coqui speaks it back. Reindexing the dataset lifted retrieval accuracy by around 40%.",
      "It's the only thing I've built that runs a local model end to end, and the only one where latency is felt as rudeness rather than as a number on a dashboard.",
    ],
  },
];
