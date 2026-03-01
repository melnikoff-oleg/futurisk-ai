# Current Data — futurisk.ai

---

## Project Status

**Stage:** MVP built + wider layout / money-focused overhaul complete — ready for testing and deployment
**Date:** 2026-03-01

## Build Status

| Component | Status | Notes |
|---|---|---|
| Landing page | Redesigned | Wider layout (max-w-7xl), hero + URL input + visual stat cards + how-it-works |
| LinkedIn data ingestion | Complete | Apify `curious_coder~linkedin-profile-scraper` |
| Processing screen + animations | Complete | 5-step animated flow, ~50s scripted |
| AI report generation | Upgraded | Claude Sonnet 4.6 via OpenRouter with extended thinking. 3-year horizon (2026-2028), money-maximization focus, current-job-only analysis, quarterly trajectory data, 5 research sources. |
| Report page / UI | Redesigned | Wider layout (max-w-6xl), rich chart as hero, money-focused framing, peak earning window, money moves / challenges sections, 3-year money plan |
| Career trajectory chart | Rebuilt | 12 quarterly data points, 3 data series (adapted/statusQuo/aiAdoption), event pins, earning potential Y-axis (0-200%), 520px tall, zone shading |
| Visual identity | Complete | Space Grotesk + Instrument Serif, warm cream palette, burnt orange accent, weight-split logo |
| LinkedIn share mechanic | Complete | One-click share + clipboard copy of pre-written post with money-focused framing |
| Knowledge base (10 papers) | In progress | 5 of ~10 articles stored in `reference/`. See `articles.md` for full index. |
| Backend / API | Updated | `/api/generate-report` (maxDuration=120) + `/api/report-status/[username]` |
| Supabase schema | Needs setup | SQL in plan `plans/2026-02-24-build-mvp.md` Step 6 — run in Supabase dashboard |
| Environment variables | Needs values | See `.env.local` — add Apify, OpenRouter, Supabase keys |
| Deployment | Not started | Deploy to Vercel once env vars are set. May need Pro plan for 120s timeout. |

## Key Metrics

No live metrics yet — product not launched.

| Metric | Current | Target |
|---|---|---|
| Reports generated | 0 | 100 (MVP validation) |
| LinkedIn shares | 0 | 50 (virality signal) |
| Unique visitors | 0 | — |
| Cost per report | Unknown | < $0.20 |

## Blockers / Open Questions

- **Supabase table**: Must run SQL from plan Step 6 in Supabase dashboard before the app works
- **API keys needed**: Apify API key, OpenRouter API key, Supabase URL + service role key
- **Apify actor**: Using `curious_coder~linkedin-profile-scraper` — verify at runtime this actor is active and its output schema matches `apify.ts` normalizer
- **Vercel function timeout**: `maxDuration = 120` set on generate-report route; may require Vercel Pro plan (Hobby supports 60s max)
- Knowledge base partially curated — 5 articles in `reference/`, need ~5 more (WEF, Goldman Sachs, Oxford, etc.)
- Abuse protection / rate limiting: not implemented — monitor post-launch

## Cost Estimate (per report)

~$0.10–$0.25: Apify scrape (~$0.01–$0.03) + OpenRouter Claude Sonnet 4.6 with reasoning (~$0.10–$0.20 for extended thinking + quarterly trajectory output tokens)

---

_Update this file as the project progresses. Stale data limits Claude's usefulness as a partner._

_Last updated: 2026-03-01 — Wider layout, money-focused 3-year predictions, rich quarterly chart, inspiring tone, Moats article added_
