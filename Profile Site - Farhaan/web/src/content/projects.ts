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
      "Brands want billboards near the people who will actually buy from them. Nobody could answer that question quickly. A campaign planner would spend most of a working day cross-referencing maps, footfall guesses, and a spreadsheet of available sites.",
      "I built the services and the frontend, then the part that mattered: a recommendation engine that matched a brand to locations using Google Places data, geohash proximity, and semantic search over embeddings. Scouting went from about five hours to about five minutes.",
      "Alongside that I built an agentic pipeline for lead generation, which cut the manual sales work per campaign cycle by around 60%. I also ran the market research and built the pitch decks. Those decks fed the seed raise.",
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
    stack: ["Java 21", "Spring Boot 3.4", "PostgreSQL with RLS", "Next.js", "LangGraph"],
    proof: [
      { figure: "94.3%", label: "categorisation accuracy" },
      { figure: "zero", label: "false accepts" },
      { figure: "22", label: "test classes on real containers" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/FraanW/ledgerline-money-tracker" }],
    summary: "A double-entry money ledger built so that it cannot go wrong quietly.",
    body: [
      "Most personal finance apps store a number and hope. I wanted one that could not drift: balances that can never go negative, every movement recorded twice, and tenant isolation enforced by the database through row-level security rather than by application code somebody might forget to call.",
      "I wrote the SQL by hand rather than reaching for an ORM, because when a balance is wrong you want to read the query that made it wrong. Rows lock pessimistically where concurrent writes could corrupt a total. A transactional outbox sits between the ledger and anything downstream, so nothing is ever published for a transaction that later rolled back.",
      "The statement reader is the part I am most pleased with. Indian bank merchant strings are noisy, so it runs deterministic rules first, sentence embeddings second, and a constrained language model only as a last resort. It abstains instead of guessing when confidence drops. It categorises at 94.3% accuracy with full abstain recall and no false accepts, which matters more: a wrong category entered silently is worse than a question asked out loud.",
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
    summary: "A distressed real-estate platform with three different people to serve.",
    body: [
      "Investors, sellers, and admins each needed their own view of the same set of deals, and each view disagreed about what mattered. An investor wants yield and risk. A seller wants speed and certainty. An admin wants to see everything and touch very little.",
      "I built all three dashboards end to end on one FastAPI backend, with access scoped through AWS IAM so that the boundary between those three views was infrastructure rather than a conditional in a template.",
      "The venture raised its round. The company did not survive. I am putting both facts on the same page because a portfolio that only lists the raises is not a portfolio, it is marketing. I built the product. I did not build the business, and the business is what ran out of road.",
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
      "Expatriate workers in the UAE are among the least well served borrowers anywhere. They need small amounts quickly, they have thin credit files, and the products aimed at them are usually built by people who have never had to ask for two hundred dirhams before payday.",
      "This one is mine from the idea outwards. I ran the market research, worked out who it was actually for, and designed the whole thing: the product flow, the system architecture, the transaction workflows, the lending lifecycle, and how an e-wallet would fit into it. The backend architecture was aligned to PCI DSS from the start, because retrofitting payment compliance onto a lending product is how you discover you have to rebuild it.",
      "Then I ran the MVP development process to get it built. I also produced the business research and the pitch deck.",
      "There is no funding claim attached to this one, and no repository to send you to. It is here because the work was real and because it is the clearest example of me doing the front half of the job rather than the engineering half.",
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
      "Product knowledge normally lives in documents that no machine can read: a strategy deck here, a spec there, a decision buried in somebody's messages. UPG is an open TypeScript standard that turns all of it into a graph with a real schema.",
      "I build the tooling on top of it. The Model Context Protocol server is the piece I care about most: it lets an AI agent read and write that graph through typed, bounded operations instead of guessing at free text. An agent is only ever as good as the tools you hand it, and that is an API design problem before it is a model problem.",
      "I also work on the local command line, the data-sync layer, and parts of the spec itself. Eight packages are published to npm and pull around twenty-eight thousand downloads a month.",
      "Alongside the standard I build the full-stack app for Entopo, an AI-native product creation tool with a canvas, AI, and a graph.",
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
      "Agentic research tasks run for minutes, sometimes longer. If the process dies at minute nine, restarting from zero is not an inconvenience, it is the whole product failing.",
      "So this one is built around persistence rather than around the model. Sessions checkpoint as they go, which means a crashed run resumes instead of restarting. Multiple tenants run concurrently without seeing each other's work.",
      "Retrieval sits on PostgreSQL with pgvector rather than a separate vector database, and stays under 400 milliseconds across ten or more concurrent sessions. One less system to operate, and the data lives next to everything else it needs to join against. Progress streams to the client over WebSockets instead of being polled for.",
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
      "The unglamorous majority of machine learning is cleaning. Missing values, outliers, inconsistent encodings, features that need scaling before any model will behave.",
      "ADCEA does that stretch without a human in the loop: it ingests a dataset, profiles it, cleans it, engineers features, and trains a baseline model through AutoML. Training runs asynchronously, and a React interface shows the profiling results and model comparisons as they arrive.",
      "It is a breadth project rather than a depth one. It exists to prove I can work outside large language models, in ordinary supervised learning, where the hard part is the data rather than the prompt.",
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
      "ArtiShine takes a photograph of a piece and produces the story behind it, then posts it. Buyers get a marketplace where things are discoverable by where they were made, not just by keyword. Both artisans and buyers have accounts, with the permissions that implies.",
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
      "So put them at different speeds. The inner loop stays a classical fuzzy controller, fast and bounded. A supervisory loop above it proposes candidate rule sets, simulates them, ranks them against classical stability constraints, and only then hands one down. The reasoning never touches the real-time path.",
      "Against static rule-based and fuzzy-only baselines it drew about 78% less energy with about 8% less overshoot. Published at the 2026 International Conference on Networking and Communications.",
      "The repository is the working implementation, not a reconstruction: the MCP server, both fuzzy inference systems, and the Simulink automation.",
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
      "It is the only thing I have built that runs a local model end to end, and the only one where latency is felt as rudeness rather than as a number on a dashboard.",
    ],
  },
];
