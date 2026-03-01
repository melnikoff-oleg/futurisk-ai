# Plan: Wider Layout, Money-Focused 3-Year Predictions, Rich Career Chart & Inspiring Tone

**Created:** 2026-03-01
**Status:** Implemented
**Request:** Redesign landing and report pages to use full screen width, focus on current job/industry only, shift to 3-year money-maximization predictions (2026–2028), build a rich data-dense career chart as the report hero, shift tone from anxiety to inspiration, and add the AI Startups Moats article to the knowledge base.

---

## Overview

### What This Plan Accomplishes

A comprehensive overhaul across five dimensions: (1) layout — both landing and report pages expand from `max-w-4xl` to use the full available screen width, (2) AI prompt — rewired to focus exclusively on the user's current job/industry, predict only 2026–2028, and optimize for "how to make maximum money" rather than long-term career survival, (3) chart — completely rebuilt from a bare two-line area chart into a rich, data-dense visualization with event pins, quarterly data points, non-linear realistic curves, and positioned as the hero element of the report, (4) tone — shifted from pessimistic/anxiety-inducing to inspiring and empowering ("here's how you get rich"), and (5) knowledge base — the AI Startups Moats transcript added as a 5th research source.

### Why This Matters

The current report reads like a doom forecast. The real value is showing people *how to capitalize on AI disruption to make money*. The narrow layout wastes 70% of desktop screens. The chart is uninformative — two lines with two dots each. These changes directly improve shareability (people share wins, not fears), credibility (a rich chart looks professional), and screen presence (wider layout = more impressive, more informative).

---

## Current State

### Relevant Existing Structure

| File | Role |
|---|---|
| `src/components/landing/hero-section.tsx` | Landing hero — `max-w-4xl` centered |
| `src/components/landing/how-it-works.tsx` | How it works — `max-w-4xl` centered |
| `src/app/report/[username]/page.tsx` | Report layout — `max-w-4xl` centered |
| `src/components/report/career-trajectory-chart.tsx` | Current chart — 380px tall, basic AreaChart, 5 data points, two lines |
| `src/components/report/report-header.tsx` | Report hero — name + role + exposure gauge |
| `src/components/report/executive-summary.tsx` | Executive summary with shareable quote |
| `src/lib/report-prompt.ts` | System prompt + user prompt — 5-year horizon, generic career advice |
| `src/types/report.ts` | Report TypeScript types — `trajectoryData` has 5 points |
| `articles.md` | Knowledge base index — 4 articles |
| `reference/The 7 Most Powerful Moats for AI Startups.md` | Already exists in reference/ but not indexed or used in prompt |

### Gaps or Problems Being Addressed

1. **Layout too narrow**: `max-w-4xl` (896px) on landing + report wastes ~70% of a wide desktop screen
2. **Wrong career focus**: Prompt doesn't strongly enough force current-job-only analysis; can still drift to past careers
3. **Wrong time horizon**: Currently 5-year predictions (2026–2030); should be 3 years (2026–2028) with deeper analysis
4. **Wrong framing**: "When AI replaces you" vs. "How to make maximum money from AI"
5. **Chart is uninformative**: Two smooth lines, ~5 data points, no event markers, linear trajectories, no quarterly granularity, tiny size, buried mid-page
6. **Pessimistic tone**: Report induces anxiety rather than inspiring action and wealth-building
7. **Missing knowledge source**: The Moats article exists in `reference/` but isn't in the prompt or `articles.md`

---

## Proposed Changes

### Summary of Changes

- Widen landing page from `max-w-4xl` to `max-w-7xl` (1280px) with full-bleed hero
- Widen report page from `max-w-4xl` to `max-w-6xl` (1152px)
- Rebuild `career-trajectory-chart.tsx` into a rich, large, data-dense visualization:
  - 12 quarterly data points (Q1 2026 through Q4 2028) instead of 5 annual
  - Event pins/markers on the timeline with labeled milestones
  - Non-linear, realistic curves (using monotone interpolation)
  - Three data series: "Earning Potential (Adapted)", "Earning Potential (Status Quo)", and "Industry AI Adoption" as a contextual backdrop area
  - Labeled zones (e.g., "Window of Opportunity", "Peak Earnings", "Disruption Phase")
  - Larger size: full-width, 500px+ tall
  - Dots on every data point with tooltips
- Move the chart into the report hero section — right after the header, before everything else
- Rewrite `report-prompt.ts`:
  - Current job/industry ONLY — explicitly discard past careers from strategy
  - 3-year horizon: 2026, 2027, 2028 — quarterly granularity in trajectory data
  - Money-maximization framing: "How to earn the most in this window"
  - Inspiring, empowering tone: opportunity-first, risk as context
  - Add Moats article as 5th research source
- Update `report.ts` types to match new trajectory data schema (quarterly, event markers, earning potential framing)
- Update all report components for wider layout and inspiring language
- Update `articles.md` with the Moats article entry

### New Files to Create

None — all changes are modifications to existing files.

### Files to Modify

| File | Changes |
|---|---|
| `src/components/landing/hero-section.tsx` | Widen from `max-w-4xl` to `max-w-7xl`, wider stats grid |
| `src/components/landing/how-it-works.tsx` | Widen from `max-w-4xl` to `max-w-7xl` |
| `src/app/report/[username]/page.tsx` | Widen from `max-w-4xl` to `max-w-6xl`, move chart to hero position (right after header), update section ordering |
| `src/types/report.ts` | Redesign `trajectoryData` for quarterly points with event markers and earning potential framing; add `earningPotential` fields |
| `src/lib/report-prompt.ts` | Complete rewrite: 3-year horizon, money focus, current job only, inspiring tone, add Moats source, quarterly trajectory schema |
| `src/components/report/career-trajectory-chart.tsx` | Complete rebuild: larger, quarterly X-axis, event pins, three data series, zone labels, reference lines, dots on all points |
| `src/components/report/report-header.tsx` | Update language — opportunity framing instead of "exposure" anxiety |
| `src/components/report/executive-summary.tsx` | Tone shift — empowering, money-focused |
| `src/components/report/risks-section.tsx` | Rename and reframe as "Challenges to Navigate" — still honest but not doom |
| `src/components/report/opportunities-section.tsx` | Elevate — "Money Moves" or "High-Value Opportunities" framing |
| `src/components/report/action-plan-section.tsx` | Money-focused action steps, earning potential language |
| `src/components/report/timeline-section.tsx` | 3-year focus, opportunity milestones alongside risk milestones |
| `src/components/report/share-cta.tsx` | Update share text for empowering/opportunity framing |
| `articles.md` | Add entry #5 for the Moats article |

### Files to Delete

None.

---

## Design Decisions

### Key Decisions Made

1. **Layout widths — `max-w-7xl` (landing) and `max-w-6xl` (report)**: The landing page can go wider (1280px) because it has simpler content that benefits from spread. The report stays slightly narrower (1152px) because long-form text becomes hard to read past ~1100px, but this is still 28% wider than the current 896px. The chart itself will be full-width within the report container.

2. **12 quarterly data points instead of 5 annual**: 12 points across 3 years (Q1 2026 – Q4 2028) creates a realistic-looking curve with enough granularity to place specific event markers. This is 2.4x more data points than the current 5, but more importantly each point can carry a milestone annotation.

3. **Three data series on the chart**: (a) "If You Adapt" earning potential — the aspirational green line, (b) "If You Don't" earning potential — the cautionary red dashed line, (c) "AI Adoption Rate" — a subtle background area showing how quickly AI is entering their industry, providing context for why the lines diverge. This gives 3x more information density.

4. **Event pins as ReferenceDot with custom labels**: Key industry events (e.g., "GPT-5 launches", "Your sector sees first AI layoffs", "Peak demand for AI-skilled pros") will be placed as labeled dots on the timeline. The AI will generate 4-6 of these per report, specific to the person's industry. This is the single biggest improvement to chart informativeness.

5. **Chart as report hero**: The chart moves from position 5 (after timeline) to position 2 (right after header). Visual-first = immediate engagement. Text sections follow below for users who scroll.

6. **Earning potential in dollar terms rather than abstract 0-100**: Instead of an abstract "career value" 0-100 scale, we'll use a relative "Earning Potential" percentage scale (0-200%) where 100% = their current earning level. This is more tangible and money-focused. The Y-axis labels become: "2x Current", "1.5x Current", "Current Level", "0.5x Current", "Declining".

7. **Inspiring tone shift — "Your AI Money Map"**: The chart title shifts from "Your Career Trajectory" to "Your AI Money Map" or similar. The overall report framing shifts from "how screwed are you" to "here's the money on the table and how to grab it."

8. **Moats article integration**: Added as a 5th source with key insight about speed, process power, and counter-positioning as startup strategies — relevant for anyone thinking about how to build defensibility in the AI era.

### Alternatives Considered

- **Full-bleed edge-to-edge layout**: Rejected — text readability suffers badly past ~1200px. `max-w-6xl`/`max-w-7xl` is the sweet spot.
- **Separate "opportunity chart" and "risk chart"**: Rejected — the power is in showing both paths on one chart with the divergence between them.
- **Dollar amounts on Y-axis**: Rejected — we don't know actual salaries. Percentage-relative-to-current is honest and still money-focused.
- **Interactive/animated chart**: Considered but deferred — static is fine for V1, animation adds complexity with minimal shareability gain (screenshots are static).

### Open Questions

None — requirements are clear enough to proceed.

---

## Step-by-Step Tasks

### Step 1: Update TypeScript Types (`report.ts`)

Redesign the `trajectoryData` type for quarterly data with event markers, and adjust other types for money-focused framing.

**Actions:**

- Change `trajectoryData` from 5 annual points to 12 quarterly points
- Add `quarter` field (e.g., "Q1 2026") alongside `year`
- Add `aiAdoption` field (0-100) for the third data series
- Change `statusQuo`/`adapted` from 0-100 "career value" to 0-200 "earning potential percentage" where 100 = current level
- Add `eventPin` optional field: `{ label: string, type: 'opportunity' | 'disruption' | 'milestone' }` for markers
- Rename Y-axis concept in comments from "career value" to "earning potential relative to today"
- Add `moneyHeadline` field to Report: a punchy 1-line summary like "You could 2x your income by 2028 — or lose 40% of it"
- Add `peakEarningWindow` field: `{ start: string, end: string, description: string }` — the specific window where they can make the most money

**Files affected:**

- `src/types/report.ts`

---

### Step 2: Rewrite the AI Prompt (`report-prompt.ts`)

Complete rewrite of system prompt and user prompt for money-maximization, 3-year focus, current-job-only, inspiring tone, quarterly trajectory data, and the Moats article.

**Actions:**

- **System prompt changes:**
  - Add Moats article key insights: "Speed is the #1 moat for startups. Process power (deep engineering) is the main form of defensibility. Counter-positioning against incumbents works because incumbents can't cannibalize their own revenue. Data and evals create compounding network effects. Vertical AI SaaS can capture 10x the wallet share of traditional SaaS."
  - Change framing from "brutally honest about risk" to "opportunity-first, honest about urgency": The report should inspire people to act NOW because the money window is closing, not terrify them into paralysis
  - Change time horizon from 5 years to 3 years (2026, 2027, 2028) — go DEEPER on each year
  - Add rule: "MONEY FOCUS: Every insight must connect to earning potential. Don't just say 'AI will automate X' — say 'People who master X+AI will command 2x premiums while others lose 30% of their billings.' Always quantify the financial opportunity."
  - Strengthen current-job-only rule: "ABSOLUTE RULE: If this person changed careers, their previous career DOES NOT EXIST for strategic purposes. Zero references to it. Zero advice about it. Their report is about their CURRENT role and industry ONLY."
  - Add rule: "TONE: You are an empowering career strategist, not a doom prophet. Your job is to show people the money on the table and give them a clear path to grab it. Yes, mention risks — but frame them as urgency to ACT, not reasons to panic."

- **User prompt changes:**
  - Change trajectoryData schema from 5 annual to 12 quarterly points
  - Request `aiAdoption` percentage per quarter
  - Request `eventPin` markers (4-6 per report)
  - Change Y-axis from "career value 0-100" to "earning potential percentage 0-200" (100 = current)
  - Request `moneyHeadline` field
  - Request `peakEarningWindow` field
  - Change `topRisks` framing to "challenges" with earning-impact quantification
  - Change `topOpportunities` to include estimated earning multiplier
  - Change `actionPlan` steps to include expected earning impact
  - Change `shareableQuote` guidance: must be empowering/aspirational, not fearful
  - Change timeline milestones to include both disruptions AND opportunities
  - Limit trajectory to Q1 2026 – Q4 2028 (12 points)

**Files affected:**

- `src/lib/report-prompt.ts`

---

### Step 3: Rebuild the Career Trajectory Chart (`career-trajectory-chart.tsx`)

Complete rebuild into a rich, data-dense, impressive visualization.

**Actions:**

- Increase chart height from 380px to 520px
- Change X-axis from yearly to quarterly labels (Q1'26, Q2'26, ..., Q4'28)
- Add third data series: `aiAdoption` as a subtle filled area in the background (light grey/blue)
- Change Y-axis from abstract 0-100 to earning potential tiers: "2x Current" (200), "1.5x" (150), "Current Level" (100), "0.5x" (50), "Declining" (0)
- Add event pin markers using `ReferenceDot` with custom render:
  - Opportunity pins: green circle with upward arrow icon
  - Disruption pins: amber/red circle with alert icon
  - Each pin has a label below/above positioned to avoid overlap
- Add zone shading using `ReferenceArea`:
  - "Window of Opportunity" zone in light green where adapted line peaks
  - "Disruption Zone" in light red where statusQuo drops significantly
- Make both main lines show dots on EVERY data point (12 dots each)
- Add inline legend at the top of the chart (not a separate legend box)
- Keep divergence shading between the two main lines
- Add "You are here" marker on Q1 2026
- Add end-of-line labels on Q4 2028 with the final earning potential percentage
- Update title from "Your Career Trajectory" to "Your AI Money Map"
- Update subtitle to something like "Earning potential over the next 3 years — two paths, one choice"

**Files affected:**

- `src/components/report/career-trajectory-chart.tsx`

---

### Step 4: Widen the Landing Page Layout

Expand hero section and how-it-works from `max-w-4xl` to `max-w-7xl`.

**Actions:**

- In `hero-section.tsx`:
  - Change outer content container from `max-w-4xl` to `max-w-7xl`
  - Change stats grid container from `max-w-4xl` to `max-w-7xl`
  - Keep the text content centered with `max-w-3xl` for readability (text should not stretch to 1280px)
  - Give the stats grid more breathing room — potentially 4 columns on wider screens
  - Keep URL input form at `max-w-xl` (functional, doesn't need to be wider)

- In `how-it-works.tsx`:
  - Change container from `max-w-4xl` to `max-w-7xl`
  - Cards can now be wider with more padding on larger screens

**Files affected:**

- `src/components/landing/hero-section.tsx`
- `src/components/landing/how-it-works.tsx`

---

### Step 5: Widen and Restructure the Report Page

Expand from `max-w-4xl` to `max-w-6xl` and move chart to hero position.

**Actions:**

- In `report/[username]/page.tsx`:
  - Change `max-w-4xl` to `max-w-6xl`
  - Move the `CareerTrajectoryChart` block from position 5 (after timeline) to position 2 (directly after `ReportHeader`)
  - Add the `moneyHeadline` as a prominent display text between header and chart
  - Wrap chart in a section with the new title "Your AI Money Map"
  - Keep two-column grid for risks/opportunities sections — these benefit from wider layout
  - Add `peakEarningWindow` highlight card before the action plan

**Files affected:**

- `src/app/report/[username]/page.tsx`

---

### Step 6: Update Report Components for Inspiring Tone

Shift language across all report components from anxiety to empowerment.

**Actions:**

- **`report-header.tsx`**:
  - Keep exposure gauge but reframe: instead of just "Critical Risk", add context like "High Urgency — Act Now to Capture Opportunity"
  - Add the `moneyHeadline` as a prominent subheading

- **`executive-summary.tsx`**:
  - No structural changes needed — the prompt will generate empowering content
  - The shareable quote will be aspirational per the prompt rewrite

- **`risks-section.tsx`**:
  - Rename from "Risks" to "Challenges to Navigate"
  - Keep the AlertTriangle icon but change color from warning to a neutral/blue tone
  - Add earning impact text if present (e.g., "Could reduce earnings by 30%")

- **`opportunities-section.tsx`**:
  - Rename from "Opportunities" to "Money Moves"
  - Add earning multiplier badge if present (e.g., "2x potential")
  - Make these visually more prominent than the challenges section

- **`action-plan-section.tsx`**:
  - Rename to "Your 3-Year Money Plan"
  - Add earning impact per step if present
  - Group steps by year (2026, 2027, 2028) instead of generic timeframes

- **`timeline-section.tsx`**:
  - Rename to "What's Coming (2026–2028)"
  - Mix opportunity milestones (green dots) alongside disruption milestones (amber/red)
  - This creates a balanced, not-doom timeline

- **`share-cta.tsx`**:
  - Update share text: empowering framing
  - Change CTA copy from "Is this accurate?" to something like "Here's my AI Money Map — I could 2x my income by 2028. Get yours free:"

**Files affected:**

- `src/components/report/report-header.tsx`
- `src/components/report/executive-summary.tsx`
- `src/components/report/risks-section.tsx`
- `src/components/report/opportunities-section.tsx`
- `src/components/report/action-plan-section.tsx`
- `src/components/report/timeline-section.tsx`
- `src/components/report/share-cta.tsx`

---

### Step 7: Update Knowledge Base Index (`articles.md`)

Add the Moats article as entry #5.

**Actions:**

- Add entry:
  ```
  ## 5. The 7 Most Powerful Moats for AI Startups
  **Source:** Y Combinator (The Light Cone Podcast)
  **Speakers:** Gary Tan, Jared Friedman, Diana Hu, Harj Taggar
  **File:** `reference/The 7 Most Powerful Moats for AI Startups.md`
  **Key insights:** Speed is the primary early-stage moat. Process power (deep, painstaking engineering to get from 80% to 99% accuracy) creates defensibility that hackathon demos can't replicate. Counter-positioning against incumbents works because established companies can't cannibalize per-seat revenue. Data and evals create compounding network effects. Vertical AI SaaS can capture 10x the wallet share of traditional SaaS by automating work, not just organizing data.
  ```

- Update the "Last updated" date to 2026-03-01

**Files affected:**

- `articles.md`

---

### Step 8: Update CLAUDE.md

Reflect the new design decisions and updated structure.

**Actions:**

- Update the "Report" description under Design System to mention: money-focused framing, 3-year horizon, quarterly trajectory chart as hero element, earning potential Y-axis
- Update the "How It Works" section point 4 to mention the money-maximization and 3-year focus
- Update the knowledge base note from "4 of ~10" to "5 of ~10"
- No structural changes needed — file paths haven't changed

**Files affected:**

- `CLAUDE.md`

---

### Step 9: Update context/current-data.md

Update project state to reflect these changes.

**Actions:**

- Update Build Status table:
  - Landing page: "Wider layout (max-w-7xl)"
  - Report page: "Wider layout (max-w-6xl), chart as hero, money-focused framing"
  - AI report generation: "3-year horizon, quarterly trajectory, earning potential, 5 research sources"
  - Knowledge base: "5 of ~10 PDFs"
- Update date

**Files affected:**

- `context/current-data.md`

---

### Step 10: Validate and Test

Verify all changes compile and render correctly.

**Actions:**

- Run `npm run build` to catch TypeScript errors
- Verify the landing page renders wider on a desktop viewport
- Verify the report page renders wider with chart as the hero section
- Verify the chart accepts and renders 12 quarterly data points with event pins
- Check that the prompt produces valid JSON matching the new schema (manual test with a sample profile)
- Verify share text is empowering/aspirational

**Files affected:**

- All modified files (compile check)

---

## Connections & Dependencies

### Files That Reference This Area

- `src/app/api/generate-report/route.ts` — calls `generateReport()` which returns a `Report` object. The shape of `Report` is changing, so any existing cached reports in Supabase will have the old schema. New reports will use the new schema. The report page should handle both gracefully (fallback for missing new fields).
- `src/lib/openrouter.ts` — no changes needed, it just passes through the prompt and parses JSON
- `src/lib/supabase.ts` — no changes needed, it stores/retrieves generic JSON

### Updates Needed for Consistency

- `CLAUDE.md` — design system and report description sections
- `context/current-data.md` — project state
- `articles.md` — knowledge base index

### Impact on Existing Workflows

- **Existing cached reports**: Reports already generated and stored in Supabase will have the old schema (5 annual trajectory points, no `moneyHeadline`, etc.). The report page components should render gracefully if new fields are missing — use optional chaining and fallbacks.
- **Processing time**: 12 quarterly trajectory points + event pins + more detailed analysis may increase token usage slightly. Monitor via OpenRouter logs. Current `max_tokens: 32000` should be sufficient.
- **Prompt length**: Adding the Moats article summary adds ~50 tokens to the system prompt — negligible impact.

---

## Validation Checklist

- [ ] TypeScript types compile with no errors (`npm run build`)
- [ ] Landing page uses wider layout (`max-w-7xl`) — visually confirmed
- [ ] Report page uses wider layout (`max-w-6xl`) — visually confirmed
- [ ] Chart is the first major visual in the report (hero position, after header)
- [ ] Chart has 12 quarterly data points on X-axis
- [ ] Chart has event pin markers with labels
- [ ] Chart has three data series (adapted, statusQuo, aiAdoption)
- [ ] Chart Y-axis shows earning potential tiers (2x, 1.5x, Current, 0.5x)
- [ ] Chart is 500px+ tall and full-width within container
- [ ] Prompt focuses on current job/industry ONLY
- [ ] Prompt uses 3-year horizon (2026–2028)
- [ ] Prompt generates money-focused, inspiring content
- [ ] Moats article is in the system prompt as source #5
- [ ] `articles.md` has 5 entries
- [ ] Report components use empowering language (not doom/anxiety)
- [ ] Share CTA text is aspirational
- [ ] Old reports (with missing new fields) render without crashes
- [ ] CLAUDE.md and context/current-data.md updated

---

## Success Criteria

The implementation is complete when:

1. Both landing and report pages visually fill at least 60% of a 1920px-wide viewport (vs. current ~30%)
2. The career trajectory chart is the first visual element users see on the report page, is 500px+ tall, shows 12 quarterly data points, event pins with labels, and earning potential Y-axis
3. A new report generated via the API uses the 3-year money-focused framing, references the Moats article, focuses exclusively on the user's current job, and has an empowering/inspiring tone
4. All existing report components render without errors for both old-schema and new-schema reports

---

## Notes

- The shift from "doom prophet" to "money strategist" is the most important change. It changes what people share. Nobody wants to share "I'm going to lose my job." Everyone wants to share "I could 2x my income by 2028."
- The quarterly chart granularity (12 points) creates a much more believable, professional-looking visualization. Linear up/down lines scream "fake." Curves with specific event markers say "this was researched."
- Consider adding chart animation in a future iteration — staggered line drawing on scroll into view would be impressive.
- The `peakEarningWindow` concept is key for virality: "Your peak earning window is Q2 2026 – Q4 2027. Here's how to capture it." This creates urgency without doom.

---

## Implementation Notes

**Implemented:** 2026-03-01

### Summary

All 10 steps executed in order. Types redesigned for quarterly trajectory data with event pins and earning potential framing. System prompt completely rewritten for money-maximization, 3-year horizon, current-job-only analysis, and inspiring tone with 5 research sources. Chart rebuilt from scratch: 520px tall, 12 quarterly data points, 3 data series, event pin annotations, zone shading, earning potential Y-axis. Landing page widened to max-w-7xl, report page to max-w-6xl. Chart moved to hero position. All report components updated with empowering language. Moats article indexed. CLAUDE.md and current-data.md updated. Build passes cleanly.

### Deviations from Plan

- **Risks section icon**: Plan said change AlertTriangle to "neutral/blue tone" — used ShieldAlert icon instead (from lucide-react) with accent color, which is more appropriate for "challenges to navigate" framing than a blue tone that doesn't exist in the palette.
- **Action plan year grouping**: Plan said "group steps by year" — kept the flat list with timeframe display per step rather than adding year group headers, as the AI prompt already generates timeframes as year labels. Adding visual group headers would over-complicate the layout.
- **Opportunities placed before Risks**: Swapped the column order in the two-column grid (opportunities first, risks second) to reinforce the money-first, opportunity-first framing. Plan mentioned making opportunities "visually more prominent" — positioning them first achieves this.

### Issues Encountered

None. Build compiled successfully on first attempt.
