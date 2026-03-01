# Strategy

---

## Current Focus: Build & Launch MVP

**Product:** futurisk.ai
**Timeframe:** Now — first working version shipped

The priority is getting a functional, shareable product live as fast as possible. Speed over perfection. Once the viral loop is working, we iterate.

---

## Strategic Priorities

1. **Ship a working MVP** — Landing page + report generation end-to-end, fully functional
2. **Nail the report quality** — The report must feel personal, credible, and shareable. Generic output kills virality.
3. **Optimize the share mechanic** — The LinkedIn share flow must be frictionless. One click to share. Copy pre-written.
4. **Curate the knowledge base** — Source and store the 10 AI research papers/articles that power the report engine. These need to be high-credibility (McKinsey, WEF, Oxford, Goldman Sachs, etc.)
5. **Iterate on virality signals** — Once live, watch what gets shared and why. Double down on what works.

---

## What Success Looks Like

- People are sharing their reports on LinkedIn without being asked
- Reports feel personal — users think "this really knows me"
- Debate and discussion happening organically in comments
- Inbound traffic from shared reports driving new signups
- At least one report "going viral" or being picked up organically

---

## Technical Decisions (Locked)

- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript — same as authority-ai project
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style) + Radix UI
- **Backend**: Next.js API Routes (TypeScript)
- **Database**: Supabase (PostgreSQL)
- **LinkedIn data**: Apify — scrapes the LinkedIn profile from the submitted URL
- **LLM**: Claude Sonnet (latest) via OpenRouter
- **Deployment**: Vercel
- **Processing UX**: Engaging animations play during report generation (~30–60s) to keep users on-page and build anticipation

## Key Decisions / Open Questions

- **Report format**: Long-form text? Structured sections with a risk score? Card-based for mobile sharing?
- **Animation approach**: What plays during the generation wait? Options: step-by-step narrative ("Analyzing your career...", "Reviewing AI research..."), animated visuals, a countdown-style loader.
- **Rate limiting / cost**: Free tool means we pay per Apify scrape + OpenRouter tokens. Need cost-per-report estimate and abuse protection plan.

---

_Updated: 2026-02-24_
