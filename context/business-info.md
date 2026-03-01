# Business Info

---

## Product: futurisk.ai

**tagline:** Find out when AI is coming for your job — and what to do about it.

A free, viral web tool that analyzes a professional's LinkedIn profile and generates a personalized report predicting how AI will impact their career. Built under the **Authority-AI** brand.

## What It Does

1. User pastes their LinkedIn profile URL on the landing page
2. The backend fetches and analyzes their career history, skills, role, and industry
3. The AI engine cross-references this against a curated knowledge base of 10 research papers and articles on AI's impact across industries
4. A personalized report is generated, covering:
   - Their career trajectory and current exposure to AI disruption
   - How AI is likely to reshape their specific role and industry
   - A predicted timeline: when AI may partially or fully displace their function
   - Concrete, actionable advice for the next 1–5 years

## Pages

- **Page 1 — Landing Page**: Clean, minimal. LinkedIn URL input + CTA button to start.
- **Page 1.5 — Processing Screen**: Engaging animations play while the report generates (~30–60s). Keeps users on-page and builds anticipation. Steps shown: scraping profile → analyzing career → reviewing AI research → generating report.
- **Page 2 — Report Page**: The personalized AI impact report. Designed to be shared on LinkedIn.

## Tech Stack (Decided)

Same stack as the authority-ai project (`/Users/olegmelnikov/Desktop/Authority-AI/Development/authority-ai`).

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide React |
| Backend | Next.js API Routes (TypeScript) |
| Database | Supabase (PostgreSQL) |
| LinkedIn data | Apify |
| LLM | Claude Sonnet (latest) via OpenRouter |
| Deployment | Vercel |
| Analytics | Plausible |

## Viral Mechanic

The report is the product's growth engine. It is designed to:
- Be provocative enough that people feel compelled to share and debate it
- Be substantive enough to be taken seriously (backed by real research)
- Include a native LinkedIn share CTA so distribution is frictionless
- Spark conversations: "Is this accurate? What do you think?" — driving new users back to the tool

## Business Context

- Early-stage, solo-founder project
- No revenue yet — initial goal is virality and user acquisition
- Distribution strategy: LinkedIn organic sharing
- Primary audience: professionals concerned about AI's impact on their careers

---

_Updated: 2026-02-24_
