import { githubAvatarUrl } from "../src/lib/github";

export const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "Emediong-Etuk";

export const profileData = {
  name: "Emediong Etuk",
  role: "Backend-Focused Full-Stack Developer",
  tagline:
    "I build products end-to-end — Laravel APIs and solid data models on the backend, React/Next.js on the front.",
  bio: "I'm a backend-focused full-stack developer who enjoys building complete products, not just demos. Most of my work starts with the data model and the API — Laravel and PHP on the backend, MySQL or Postgres underneath — and extends into the React and Next.js interfaces that consume it. Recent projects span fintech, SaaS, and Web3: pooled crypto purchasing, multi-tenant project management, and an AI-assisted payroll wallet. I like clean architecture, sensible abstractions, and shipping things that actually work.",
  githubUsername: GITHUB_USERNAME,
  githubUrl: `https://github.com/${GITHUB_USERNAME}`,
  contactEmail: "emedionggregory12@gmail.com",
  location: null,
  avatarUrl: githubAvatarUrl(GITHUB_USERNAME),
  avatarSource: "GITHUB" as const,
};

export const servicesData = [
  {
    title: "Backend API Development",
    description:
      "Designing and building robust REST APIs in Laravel/PHP, with clean, well-modeled data layers underneath.",
    order: 0,
  },
  {
    title: "Database Design",
    description:
      "Structuring relational schemas in MySQL or Postgres that scale with the product instead of against it.",
    order: 1,
  },
  {
    title: "Full-Stack Web Applications",
    description:
      "End-to-end apps — a Next.js/React front end wired directly to a backend I also built and understand.",
    order: 2,
  },
  {
    title: "SaaS & Multi-Tenant Architecture",
    description:
      "Multi-tenant systems with proper data isolation, role-based access, and billing baked in from the start.",
    order: 3,
  },
  {
    title: "Third-Party & API Integrations",
    description:
      "Wiring payments, auth, blockchain, and AI APIs into features that are actually production-ready.",
    order: 4,
  },
];

export const skillsData = [
  // Technical
  { name: "PHP & Laravel", category: "TECHNICAL" as const, order: 0 },
  { name: "TypeScript & Next.js/React", category: "TECHNICAL" as const, order: 1 },
  { name: "MySQL & PostgreSQL", category: "TECHNICAL" as const, order: 2 },
  { name: "REST API Design", category: "TECHNICAL" as const, order: 3 },
  { name: "Prisma & Eloquent ORM", category: "TECHNICAL" as const, order: 4 },
  { name: "Tailwind CSS", category: "TECHNICAL" as const, order: 5 },
  { name: "Git & GitHub", category: "TECHNICAL" as const, order: 6 },
  // Soft skills
  { name: "Problem-Solving", category: "SOFT" as const, order: 0 },
  { name: "Attention to Detail", category: "SOFT" as const, order: 1 },
  { name: "Clear Technical Communication", category: "SOFT" as const, order: 2 },
  { name: "Self-Directed Learning", category: "SOFT" as const, order: 3 },
  { name: "Ownership & Follow-Through", category: "SOFT" as const, order: 4 },
  { name: "Collaboration & Code Review", category: "SOFT" as const, order: 5 },
  { name: "Adaptability Across Stacks", category: "SOFT" as const, order: 6 },
  { name: "Time Management", category: "SOFT" as const, order: 7 },
];

export const projectsData = [
  {
    slug: "tessera-clubs",
    name: "Tessera Clubs",
    summary:
      "Pooled crypto-buying clubs on Solana — friends combine funds to hit better token prices together.",
    description:
      "A full-stack platform where a group can pool USDC into a shared club wallet, track live savings versus buying solo, and execute a single on-chain purchase once the funding goal is hit. Includes public read-only club pages, live token price polling with auto-retry, and real wallet SOL-balance surfacing on the dashboard.",
    role: "Solo full-stack developer",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Solana Web3.js"],
    highlights: [
      "Pooled on-chain purchasing with a shared, goal-funded club wallet",
      "Live token price feed with automatic retry on failure",
      "Public read-only club pages alongside the authenticated dashboard",
      "Deployed live on Render with a Postgres backend",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Tessera-Clubs`,
    liveUrl: "https://tessera-clubs.onrender.com",
    featured: true,
    order: 0,
  },
  {
    slug: "saas-project-management-tool",
    name: "SaaS Project Management Tool",
    summary:
      "Multi-tenant project management backend — separate companies share one server without sharing data.",
    description:
      "A Laravel API powering a multi-tenant project management SaaS: each company (tenant) manages its own projects, tasks, and team privately on shared infrastructure. Models cover tenants, projects, tasks and task submissions, comments with @mentions, notifications, pricing plans, and transactions — the real shape of a billable SaaS product, not just a CRUD demo.",
    role: "Backend developer (API)",
    techStack: ["Laravel", "PHP", "MySQL", "Sanctum", "REST API"],
    highlights: [
      "Multi-tenant data isolation so companies never see each other's data",
      "Task submissions, comments, and @mention-based notifications",
      "Pricing plans and transactions modeled for real billing",
      "Paired with a dedicated Next.js frontend consuming the API",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/SAAS-Project-Management-Tool`,
    liveUrl: null,
    featured: true,
    order: 1,
  },
  {
    slug: "saas-project-management-tool-frontend",
    name: "SaaS PM Tool — Frontend",
    summary:
      "The Next.js client for the multi-tenant project management API, built as its own dedicated project.",
    description:
      "The React/Next.js frontend that consumes the SaaS Project Management Tool's Laravel API. Uses TanStack Query for data fetching and cache management and cookie-based auth to talk to the multi-tenant backend, keeping the client thin and the business logic on the server where it belongs.",
    role: "Frontend developer",
    techStack: ["Next.js", "React", "TypeScript", "TanStack Query", "Tailwind CSS"],
    highlights: [
      "TanStack Query for server-state caching and background refetching",
      "Cookie-based session auth against the Laravel API",
      "Kept intentionally thin — business logic lives in the backend",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/SAAS-project-management-tool-frontend`,
    liveUrl: null,
    featured: true,
    order: 2,
  },
  {
    slug: "harbor",
    name: "Harbor",
    summary:
      "Instant-dollar payroll wallet for remote contractors — hold USD, cash out to local currency on demand.",
    description:
      "A fintech product demo: employers pay contractors in dollars, contractors hold USD in-app and cash out to a local bank (starting with the US → Nigeria corridor) whenever they choose, or park idle funds in a short-term yield sleeve. Built with a real ledger system, seeded accounts for both roles, and live USD/NGN quotes polled while the app is open.",
    role: "Solo full-stack developer",
    techStack: ["TanStack Start", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    highlights: [
      "Employer and contractor roles with a shared ledger backend",
      "Live USD/NGN quotes with a transparent fee on cash-out",
      "An 'Earn' sleeve for idle balances alongside instant cash-out",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/harbor`,
    liveUrl: null,
    featured: true,
    order: 3,
  },
  {
    slug: "showingkit",
    name: "ShowingKit",
    summary: "Turns a 15-20 minute apartment walkthrough into a same-day Walk / Negotiate / Offer brief.",
    description:
      "A field kit for renters and first-time buyers: file a showing from listing text and photos, get a timed room-by-room shot list, upload visit photos and broker quotes, then get a listing-vs-visit diff, a risk score, a dollar-range estimate, and a one-page brief with ready-to-send messages to the listing agent. Fifteen-plus routes across public marketing pages and an authenticated app.",
    role: "Solo full-stack developer",
    techStack: ["TanStack Start", "React", "TypeScript", "Tailwind CSS", "Zustand"],
    highlights: [
      "Room-by-room shot script generated per showing",
      "Automatic listing-vs-visit diff with a risk score and dollar range",
      "15+ routes spanning marketing pages, app views, and legal pages",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/showingkit`,
    liveUrl: null,
    featured: true,
    order: 4,
  },
  {
    slug: "blogapp",
    name: "BlogApp",
    summary: "A Laravel blogging platform with categories, tags, comments, and Sanctum-based auth.",
    description:
      "A clean CRUD blogging application built on Laravel with Sanctum authentication. Covers the full content model — posts, categories, tags, and comments — as a focused exercise in Eloquent relationships, authorization, and API resource design.",
    role: "Backend developer",
    techStack: ["Laravel", "PHP", "Sanctum", "MySQL"],
    highlights: [
      "Full post/category/tag/comment relational model",
      "Sanctum-based API authentication",
      "Clean Eloquent relationships and resource design",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/BlogApp`,
    liveUrl: null,
    featured: true,
    order: 5,
  },
  {
    slug: "chirper2",
    name: "Chirper",
    summary: "A Twitter-style micro-blogging app built on Laravel — posting, feeds, and auth from scratch.",
    description:
      "A social micro-blogging clone ('Chirps') covering the fundamentals of a Laravel application: authentication, authorization policies, and a Chirp/User relational model powering a live feed.",
    role: "Backend developer",
    techStack: ["Laravel", "PHP", "MySQL"],
    highlights: [
      "Authentication and authorization policies for post ownership",
      "Live feed backed by a simple, well-structured Chirp model",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Chirper2`,
    liveUrl: null,
    featured: true,
    order: 6,
  },
  {
    slug: "movie",
    name: "Movie Catalog",
    summary: "A Laravel movie catalog with token-based email verification.",
    description:
      "A movie cataloguing app built on Laravel 11, with a custom token-based email verification flow alongside the core movie/user data model — a focused exercise in Laravel auth flows beyond the framework defaults.",
    role: "Backend developer",
    techStack: ["Laravel", "PHP", "MySQL"],
    highlights: ["Custom token-based email verification flow", "Movie/User relational data model"],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Movie`,
    liveUrl: null,
    featured: true,
    order: 7,
  },
  {
    slug: "miniblogsite",
    name: "Mini Blog Site",
    summary: "A lightweight Laravel blogging app focused on clean post authoring and display.",
    description:
      "A smaller, focused Laravel blog build centered on a simple BlogPost/User model — used as a clean baseline for practicing Eloquent, routing, and Blade views without extra scope.",
    role: "Backend developer",
    techStack: ["Laravel", "PHP", "MySQL"],
    highlights: ["Simple, clean BlogPost/User relational model", "Blade-based views and routing"],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/miniblogsite`,
    liveUrl: null,
    featured: true,
    order: 8,
  },
  {
    slug: "forager-ai",
    name: "Forager AI",
    summary: "AI-powered Web3 research, stored permanently on-chain so your findings never disappear.",
    description:
      "A research tool that pairs an AI assistant with permanent on-chain storage — Web3 research and findings are persisted so they survive beyond a single session or a dead link. Built with Supabase for data and the Anthropic API for the AI layer.",
    role: "Solo full-stack developer",
    techStack: ["React", "TypeScript", "Supabase", "Anthropic API"],
    highlights: [
      "AI-assisted research workflow for Web3 topics",
      "Findings persisted permanently rather than lost to session storage",
    ],
    repoUrl: `https://github.com/${GITHUB_USERNAME}/Forager-AI`,
    liveUrl: null,
    featured: true,
    order: 9,
  },
];
