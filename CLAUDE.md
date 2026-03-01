# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What This Is

This is the development workspace for **futurisk.ai** — a viral web tool that analyzes a person's LinkedIn profile and generates a personalized report predicting how AI will impact their career. Built by Oleg Melnikov under Authority-AI.

The product is intentionally simple: a two-page website with a powerful AI engine on the backend. The goal is to provide genuine value to professionals while creating a highly shareable, viral mechanic that drives organic growth.

**This file (CLAUDE.md) is the foundation.** It is automatically loaded at the start of every session. Keep it current — it is the single source of truth for how Claude should understand and operate within this workspace.

---

## Tech Stack

Same stack as the sibling project at `/Users/olegmelnikov/Desktop/Authority-AI/Development/authority-ai`. Reference it for patterns, component structure, and configuration conventions.

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui (New York), Radix UI, Lucide React |
| Charts | Recharts via shadcn/ui chart components |
| Fonts | Space Grotesk (body/logo) + Instrument Serif (display headings) |
| Backend | Next.js API Routes (TypeScript) |
| Database | Supabase (PostgreSQL) |
| LinkedIn data | Apify |
| LLM | Claude Sonnet 4.6 via OpenRouter (with extended thinking/reasoning) |
| Deployment | Vercel |

### Design System

- **Palette**: Warm light mode — cream background (#FDFAF6), near-black warm text (#1A1207), burnt orange accent (#D4622B)
- **Logo**: Text-based wordmark using weight-split technique: "futu" (light/300) + "risk" (bold/700) + ".ai" (medium/500, accent color)
- **Emotional duality**: Risk/urgency AND opportunity/liberation — the design holds tension between these two emotions
- **Report**: Money-focused, inspiring tone. Rich quarterly career trajectory chart ("AI Money Map") as hero visual with event pins, 3 data series, earning potential Y-axis (0-200%). 3-year horizon (2026-2028). Wider layout (max-w-6xl). Peak earning window highlight. Two-column money-moves/challenges. Niche analysis section. SVG exposure gauge.

---

## The Product

### Pages

1. **Landing Page** — User pastes their LinkedIn profile URL and presses a button to start analysis.
2. **Report Page** — A personalized, shareable report showing how AI will impact their specific career.

### How It Works

1. User submits their LinkedIn URL
2. Backend scrapes/fetches their LinkedIn profile data (career history, skills, role, industry)
3. AI system cross-references their profile against a curated knowledge base of 10 research papers and articles on AI's impact across industries
4. Generates a personalized report including:
   - Money headline quantifying their financial opportunity
   - Rich quarterly career trajectory chart ("AI Money Map") showing earning potential 2026–2028
   - Peak earning window identification
   - How AI transforms their specific role and industry — framed as money opportunity
   - Actionable 3-year money plan with earning impact per step
5. Report is designed to be shareable — optimized for LinkedIn sharing to drive debate, engagement, and virality

### Viral Mechanic

The report must be provocative enough to share and debate, while being substantive enough to be taken seriously. The goal: people share their reports on LinkedIn, sparking discussion about whether the predictions are accurate — generating organic reach and driving new users to the tool.

---

## The Claude-User Relationship

- **Oleg** (Founder): Defines product direction, priorities, and goals. Makes final calls.
- **Claude**: Acts as a senior engineering and product thought partner. Reads context, proposes solutions, writes code, builds plans, and executes them. Maintains workspace consistency across sessions.

Claude should always orient itself through `/prime` at session start, then act with full awareness of who Oleg is, what the product does, and what the current priorities are.

---

## Workspace Structure

```
.
├── CLAUDE.md              # This file — core context, always loaded
├── articles.md            # Index of all knowledge base articles with summaries
├── package.json           # Node.js dependencies
├── next.config.ts         # Next.js configuration (redirects)
├── tsconfig.json          # TypeScript configuration
├── postcss.config.mjs     # Tailwind CSS PostCSS config
├── components.json        # shadcn/ui config (New York style)
├── .env.local             # Environment variables (not committed)
├── .claude/
│   └── commands/          # Slash commands Claude can execute
│       ├── prime.md       # /prime — session initialization
│       ├── create-plan.md  # /create-plan — create implementation plans
│       └── implement.md   # /implement — execute plans
├── context/               # Project and founder context
│   ├── personal-info.md   # Oleg's role and background
│   ├── business-info.md   # What futurisk.ai is and its goals
│   ├── strategy.md        # Current priorities and direction
│   └── current-data.md    # Metrics and current project state
├── src/                   # Next.js application source
│   ├── app/               # App Router: pages, layouts, API routes
│   │   ├── layout.tsx     # Root layout (Space Grotesk + Instrument Serif, metadata)
│   │   ├── page.tsx       # Landing page
│   │   ├── processing/    # Processing screen (page.tsx + client.tsx)
│   │   ├── report/[username]/  # Report display page
│   │   └── api/
│   │       ├── generate-report/route.ts   # POST: scrape + generate + store
│   │       └── report-status/[username]/route.ts  # GET: check report status
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui: button, input, card, badge, chart
│   │   ├── logo.tsx       # futurisk.ai text logo (weight-split technique)
│   │   ├── landing/       # hero-section, url-input-form, how-it-works
│   │   ├── processing/    # processing-screen
│   │   └── report/        # report-header, executive-summary, niche-analysis,
│   │                      #   timeline-section, career-trajectory-chart,
│   │                      #   exposure-gauge, risks-section, opportunities-section,
│   │                      #   action-plan-section, share-cta
│   ├── lib/               # Utilities and API clients
│   │   ├── utils.ts       # cn() helper
│   │   ├── supabase.ts    # Supabase REST client (getReport, insertReport, updateReport)
│   │   ├── apify.ts       # Apify LinkedIn scraper helper
│   │   ├── openrouter.ts  # OpenRouter/Claude API client (reasoning enabled)
│   │   └── report-prompt.ts  # System prompt + user prompt builder (career-transition detection, niche focus)
│   └── types/
│       └── report.ts      # TypeScript types: LinkedInProfile, Report, ReportRow
├── plans/                 # Implementation plans created by /create-plan
├── outputs/               # Work products, reports, and deliverables
├── reference/             # AI research PDFs powering the report engine
│   ├── anthropic--economic-index--uneven-ai-adoption--sep-2025.pdf
│   ├── stanford--canaries-in-the-coal-mine--employment-effects-of-ai--nov-2025.pdf
│   ├── ai-futures-project--ai-2027--apr-2025.pdf
│   └── mckinsey--state-of-ai-in-2025--agents-innovation-transformation--nov-2025.pdf
└── scripts/               # Automation and utility scripts
```

**Key directories:**

| Directory    | Purpose                                                                             |
| ------------ | ----------------------------------------------------------------------------------- |
| `context/`   | Founder info, product definition, strategy, and current state. Read by `/prime`.    |
| `plans/`     | Detailed implementation plans. Created by `/create-plan`, executed by `/implement`. |
| `outputs/`   | Deliverables, prototype files, report templates, and work products.                 |
| `reference/` | AI research PDFs used by the report engine. Catalogued in `articles.md`.            |
| `scripts/`   | Scraping, data processing, or automation scripts.                                   |

---

## Commands

### /prime

**Purpose:** Initialize a new session with full context awareness.

Run this at the start of every session. Claude will:

1. Read CLAUDE.md and all context files
2. Summarize understanding of the product, current state, and priorities
3. Confirm readiness to assist

### /create-plan [request]

**Purpose:** Create a detailed implementation plan before making changes.

Use before building any feature, adding scripts, or making structural changes. Produces a dated plan document in `plans/` capturing context, rationale, and ordered tasks.

Example: `/create-plan build the landing page with LinkedIn URL input`

### /implement [plan-path]

**Purpose:** Execute a plan created by /create-plan.

Reads the plan, executes each step in order, validates the work, and marks the plan complete.

Example: `/implement plans/2026-02-24-landing-page.md`

---

## Critical Instruction: Maintain This File

**Whenever Claude makes changes to the workspace, Claude MUST consider whether CLAUDE.md needs updating.**

After any change — adding features, scripts, commands, or modifying structure — ask:

1. Does this add new functionality that should be documented?
2. Does it change the workspace structure above?
3. Should a new command or script be listed?
4. Does context/ need updating?

If yes to any, update the relevant sections immediately.

---

## Session Workflow

1. **Start**: Run `/prime` to load context
2. **Work**: Use commands or direct Claude with tasks
3. **Plan features**: Use `/create-plan` before any significant build work
4. **Execute**: Use `/implement` to execute plans
5. **Maintain**: Claude updates CLAUDE.md and context/ as the project evolves

---

## Notes

- Keep context minimal but sufficient — avoid bloat
- Plans live in `plans/` with dated filenames for history
- The `reference/` folder holds the AI research PDFs. Full index with summaries is in `articles.md`.
- Currently 5 of the target knowledge base articles are loaded. More to be added.
- Outputs include report templates, prototype HTML, and any generated samples
