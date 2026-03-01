# Plan: Report Quality & Visual Overhaul

**Created:** 2026-03-01
**Status:** Implemented
**Request:** Dramatically improve report specificity via reasoning-enabled AI, fix chart truncation and make visuals more compelling, widen the report layout, and rebalance the landing page's text-to-visual ratio with better visual hierarchy.

---

## Overview

### What This Plan Accomplishes

This plan addresses four interconnected problems: (1) reports are too generic and fail to identify the user's *current* career position, defaulting to past career history, (2) the career trajectory chart has truncation/overflow issues and looks generic, (3) the report page uses only ~30% of screen width, and (4) the landing page has a broken visual hierarchy below the form with too much text and not enough visual interest. The end result is a product that generates deeply specific, trustworthy reports and presents them in a visually polished, wider layout — while the landing page becomes more visually engaging and less corporate.

### Why This Matters

The entire viral mechanic depends on people seeing their report and thinking "this really knows me." Generic reports kill shareability. If someone who left finance 1.5 years ago gets a finance-focused report, they won't share it — they'll close the tab. Similarly, a chart that looks like a generic "line goes up / line goes down" graphic erodes trust. And a landing page that's text-heavy and dry won't convert visitors into users. Every change here directly impacts conversion, shareability, and virality.

---

## Current State

### Relevant Existing Structure

| File | Role |
|---|---|
| `src/lib/report-prompt.ts` | System prompt + user prompt builder — controls what the AI generates |
| `src/lib/openrouter.ts` | OpenRouter API client — currently uses `anthropic/claude-sonnet-4-6` without reasoning |
| `src/types/report.ts` | TypeScript types for Report, LinkedInProfile, ReportRow |
| `src/app/report/[username]/page.tsx` | Report page layout — currently `max-w-2xl` (672px) |
| `src/components/report/career-trajectory-chart.tsx` | Recharts AreaChart — truncated labels, generic dual-line design |
| `src/components/report/report-header.tsx` | Name, role, exposure gauge |
| `src/components/report/executive-summary.tsx` | Summary + shareable quote |
| `src/components/report/timeline-section.tsx` | Timeline milestones |
| `src/components/report/risks-section.tsx` | Top 3 risks |
| `src/components/report/opportunities-section.tsx` | Top 3 opportunities |
| `src/components/report/action-plan-section.tsx` | 5-step action plan |
| `src/components/report/share-cta.tsx` | LinkedIn share button |
| `src/components/landing/hero-section.tsx` | Hero with stats — visual hierarchy breaks below form |
| `src/components/landing/how-it-works.tsx` | 3-step text-only cards |
| `src/lib/apify.ts` | LinkedIn scraper — normalizes profile data |
| `src/app/api/generate-report/route.ts` | API route — orchestrates scrape → generate → store |

### Gaps or Problems Being Addressed

1. **Report specificity**: The prompt doesn't explicitly instruct the AI to determine the person's *current* career focus. If someone has 10 years in finance but recently switched to AI consulting, the prompt doesn't emphasize detecting and focusing on the transition. The model also doesn't use reasoning/extended thinking, so it can't deeply analyze niche career positions.

2. **Chart truncation**: The chart container is `h-[280px]` inside a `max-w-2xl` parent. `ReferenceDot` labels overflow the chart area because margins are tight (`top: 10, right: 10, left: -20, bottom: 0`) and labels positioned "top" with 11px font can easily clip. No `overflow-visible` is set on the chart container.

3. **Chart is generic**: Two smooth lines (one up, one down) with gradient fills look like a stock template. There's no visual differentiation, no meaningful data granularity, and no way to trust the numbers.

4. **Report page too narrow**: `max-w-2xl` = 672px max. On a 1440px+ screen, this uses less than 50% of width. The content feels cramped and wastes available space.

5. **Landing page visual hierarchy**: Below the form, 3 stat items are plain text in a grid. The "How it works" section is 3 text-only cards. No illustrations, icons, or visual elements break up the text. The page feels corporate and dry.

---

## Proposed Changes

### Summary of Changes

**AI & Report Quality (Steps 1–3):**
- Rewrite the system prompt to force career-transition detection and current-state focus
- Add explicit reasoning instructions for niche-specific analysis
- Enable extended thinking via OpenRouter's `reasoning` parameter
- Increase `max_tokens` to accommodate reasoning overhead
- Add niche analysis fields to the report schema (industry deep-dive, niche-specific risks)

**Chart & Visuals (Steps 4–5):**
- Fix chart container overflow and margins to prevent label truncation
- Redesign the chart to show more meaningful data: milestone markers, inflection annotations, divergence shading between the two paths
- Add a legend and contextual annotations

**Report Layout (Step 6):**
- Widen report page from `max-w-2xl` to `max-w-4xl`
- Use a responsive two-column layout for risks/opportunities side by side
- Give the chart more breathing room

**Landing Page (Steps 7–8):**
- Redesign stats section with large animated counter-style numbers, icon accents, and source citations
- Redesign "How it works" with visual step illustrations using Lucide icons, connector lines, and more visual weight
- Improve visual hierarchy and spacing below the form
- Add subtle background visual elements for depth

### Files to Modify

| File Path | Changes |
|---|---|
| `src/lib/report-prompt.ts` | Major rewrite: add career-transition detection, niche analysis instructions, current-state focus rules |
| `src/lib/openrouter.ts` | Enable reasoning parameter, increase max_tokens, handle reasoning in response |
| `src/types/report.ts` | Add `nicheAnalysis` field to Report type with industry-specific fields |
| `src/app/report/[username]/page.tsx` | Widen from `max-w-2xl` to `max-w-4xl`, add two-column layout for some sections |
| `src/components/report/career-trajectory-chart.tsx` | Fix overflow, add margins, redesign with milestone markers and divergence shading |
| `src/components/report/report-header.tsx` | Adjust spacing for wider layout |
| `src/components/report/executive-summary.tsx` | Remove `max-w-lg` constraint, adjust for wider layout |
| `src/components/report/risks-section.tsx` | Adjust for potential side-by-side layout |
| `src/components/report/opportunities-section.tsx` | Adjust for potential side-by-side layout |
| `src/components/landing/hero-section.tsx` | Redesign stats section with icons and visual weight |
| `src/components/landing/how-it-works.tsx` | Add Lucide icons, connector visuals, more visual treatment |
| `src/app/globals.css` | Add any new CSS variables or utility styles needed |
| `CLAUDE.md` | Update to reflect new report schema fields and model configuration |

### Files to Delete

None.

---

## Design Decisions

### Key Decisions Made

1. **Use OpenRouter reasoning parameter (not a separate :thinking model)**: OpenRouter's unified `reasoning` parameter with `effort: "high"` enables extended thinking on Claude Sonnet 4.6 without switching models. This is the modern approach — the `:thinking` variant is deprecated. Adaptive thinking means the model decides how much to think based on task complexity.

2. **Keep the same model (Claude Sonnet 4.6), just add reasoning**: Switching to Opus would be significantly more expensive ($15/$75 vs $3/$15). Sonnet 4.6 with reasoning enabled should provide the deep analysis needed at a fraction of the cost.

3. **Widen to `max-w-4xl` (896px) not full-width**: Full-width text is unreadable. `max-w-4xl` gives ~60% more content area while maintaining comfortable reading width. Some sections (risks + opportunities) can go side-by-side in two columns to use the extra width meaningfully.

4. **Add `nicheAnalysis` to report schema**: Rather than just making the existing fields "more specific," adding a dedicated section for niche-specific analysis gives the AI a structured place to demonstrate deep understanding of the person's exact position and industry.

5. **Fix chart with overflow-visible + increased margins rather than complete rewrite**: The core Recharts AreaChart works. The issues are container constraints and margins. Fix those first, then enhance with annotations and visual improvements.

6. **Landing page: icons + visual accents, not illustrations**: Custom illustrations would require a designer. Lucide icons are already in the stack and can provide significant visual lift. Combined with colored backgrounds, subtle borders, and better spacing, this creates visual interest without external dependencies.

### Alternatives Considered

- **Using Claude Opus 4.6 for reasoning**: Rejected — too expensive (~5x cost per report). Sonnet 4.6 with reasoning should be sufficient for career analysis.
- **Completely custom chart library (D3.js)**: Rejected — Recharts is already integrated and can be enhanced. D3 adds complexity without proportional value.
- **Full-width report layout**: Rejected — text becomes unreadable past ~900px. The extra width should be used for multi-column sections, not wider paragraphs.
- **Adding actual images/photos to landing page**: Rejected — stock photos look generic, custom photography needs a shoot. Icon-based visuals stay on-brand and are immediately implementable.

### Open Questions

1. **Cost impact of reasoning**: Extended thinking tokens are billed at a higher rate. Currently ~$0.04–0.06/report. With reasoning, this could increase to ~$0.10–0.20/report. Is that acceptable for MVP?
2. **Max duration on Vercel**: Currently set to 60s. Reasoning may make generation take longer (potentially 30–60s for thinking + 10–20s for output). May need to increase to 90–120s or implement streaming. Vercel Hobby plan supports up to 60s — may need Pro plan.
3. **Report schema backward compatibility**: Adding `nicheAnalysis` to the schema means old cached reports won't have it. Should we invalidate old reports or make the new field optional?

---

## Step-by-Step Tasks

### Step 1: Rewrite the System Prompt for Career-Transition Detection & Niche Focus

The core problem: the current prompt sends the full career history but doesn't instruct the AI to identify career transitions or focus on the *current* position. A person who spent 10 years in finance then became a startup founder gets a finance report.

**Actions:**

- Add a new section to the system prompt called "CAREER ANALYSIS RULES" that explicitly instructs:
  1. **Detect career transitions**: Look at the chronological order of experience. If the most recent role differs significantly from prior roles, the person has transitioned. Focus the entire report on their CURRENT trajectory, not their past.
  2. **Identify the actual current niche**: Don't use the LinkedIn "industry" field blindly — it's often outdated. Derive the actual niche from: (a) most recent 1-2 roles, (b) headline, (c) summary, (d) recent skills. These take priority over everything else.
  3. **Analyze the specific business model**: Think about how the person's specific company/role operates day-to-day. What are the actual tasks they perform? What's automatable vs. uniquely human in their specific context?
  4. **Extrapolate when references don't cover the niche**: If the 4 research papers don't directly address this person's niche, use your reasoning to extrapolate from the closest parallel industries and roles. State when you're extrapolating.

- Rewrite the user prompt to present profile data with emphasis markers:
  - Mark the most recent role as `[CURRENT — FOCUS HERE]`
  - Mark prior roles as `[PREVIOUS]`
  - Add a line: "CRITICAL: This person's CURRENT career is defined by their most recent role(s). If they transitioned careers, IGNORE old career fields for the analysis focus. All risks, opportunities, and advice must target their CURRENT path."

**Files affected:**
- `src/lib/report-prompt.ts`

---

### Step 2: Add Niche Analysis to the Report Schema

Add a new `nicheAnalysis` field that forces the AI to demonstrate deep understanding of the person's specific position before generating generic advice.

**Actions:**

- Add to the `Report` interface in `src/types/report.ts`:
```typescript
nicheAnalysis: {
  currentFocus: string           // MAX 15 words. What they actually do RIGHT NOW.
  industryContext: string        // MAX 30 words. How AI is specifically hitting this industry.
  nicheVulnerability: string     // MAX 30 words. The specific threat to their exact niche position.
  uniqueAdvantage: string        // MAX 20 words. What they have that AI can't easily replicate.
}
```

- Add corresponding JSON schema instructions to the user prompt in `report-prompt.ts`

- Make this field optional (`nicheAnalysis?`) in the TypeScript type so old cached reports don't break

**Files affected:**
- `src/types/report.ts`
- `src/lib/report-prompt.ts`

---

### Step 3: Enable Extended Thinking in OpenRouter Client

Switch the OpenRouter call to use reasoning, so the model thinks deeply before generating the report JSON.

**Actions:**

- Modify `src/lib/openrouter.ts`:
  - Add `reasoning` parameter to the request body:
    ```json
    {
      "reasoning": {
        "effort": "high"
      }
    }
    ```
  - Increase `max_tokens` from 4000 to 8000 (reasoning tokens come from the context window, but the output may be longer with more detailed analysis)
  - Add logging for reasoning content in the response (for debugging/monitoring)
  - Handle the `reasoning` field in the response (it appears alongside `content`)

- Update `maxDuration` in `src/app/api/generate-report/route.ts` from 60 to 120 seconds (reasoning takes longer). Note: this may require Vercel Pro plan.

**Files affected:**
- `src/lib/openrouter.ts`
- `src/app/api/generate-report/route.ts`

---

### Step 4: Fix Chart Truncation & Container Overflow

The career trajectory chart labels are being clipped because the container doesn't allow overflow and margins are too tight.

**Actions:**

- In `career-trajectory-chart.tsx`:
  - Add `overflow-visible` to the ChartContainer: `className="h-[350px] w-full [&_svg]:overflow-visible"`
  - Increase chart height from 280px to 350px to give labels more room
  - Increase chart margins: `{ top: 30, right: 30, left: 10, bottom: 10 }` (was `{ top: 10, right: 10, left: -20, bottom: 0 }`)
  - Increase ReferenceDot label offset from 10 to 15
  - Add `position: 'insideTop'` fallback logic — if a label would overflow top, position it below the dot

**Files affected:**
- `src/components/report/career-trajectory-chart.tsx`

---

### Step 5: Redesign the Career Trajectory Chart

Make the chart more compelling, specific, and trustworthy. The current "one line up, one line down" feels generic and unearned.

**Actions:**

- **Add divergence shading**: Fill the area BETWEEN the two lines with a subtle gradient (red-ish where statusQuo < adapted) to visually emphasize the cost of inaction. This is more impactful than separate gradient fills under each line.

- **Add milestone markers on BOTH lines**: Currently only the adapted line gets ReferenceDots. Add markers on the statusQuo line too (showing what happens if they don't adapt — e.g., "Role automated," "Layoff risk peaks").

- **Replace the plain legend with inline labels**: Instead of a separate legend, put labeled callouts at the end of each line: "If you adapt" on the green line's final point, "If you don't" on the red line's final point. This is more editorial and less chart-like.

- **Add Y-axis context**: Change Y-axis from raw 0-100 numbers to labeled tiers: "Thriving" (80-100), "Stable" (50-80), "At Risk" (20-50), "Displaced" (0-20). This makes the numbers meaningful.

- **Update trajectoryData in the prompt**: Add a `statusQuoLabel` field alongside the existing `label` field so both lines can have annotations. Update the prompt instructions to generate more specific, niche-relevant labels.

**Files affected:**
- `src/components/report/career-trajectory-chart.tsx`
- `src/types/report.ts` (add `statusQuoLabel?: string` to trajectory data point)
- `src/lib/report-prompt.ts` (update trajectory data instructions)

---

### Step 6: Widen the Report Page Layout

Expand the report from `max-w-2xl` (672px) to `max-w-4xl` (896px) and use the extra width meaningfully.

**Actions:**

- In `src/app/report/[username]/page.tsx`:
  - Change `max-w-2xl` to `max-w-4xl`
  - Add a niche analysis section after the executive summary (renders the new `nicheAnalysis` field)
  - Create a two-column grid for risks + opportunities side by side: `grid grid-cols-1 md:grid-cols-2 gap-8`
  - Give the chart section full width with generous padding

- In `src/components/report/executive-summary.tsx`:
  - Remove `max-w-lg` constraint on the summary text
  - Increase text size slightly to `text-2xl sm:text-3xl` for the Instrument Serif summary to fill the wider space

- In `src/components/report/report-header.tsx`:
  - Increase name text from `text-3xl sm:text-4xl` to `text-4xl sm:text-5xl`
  - Allow more breathing room

- Add a new `NicheAnalysis` component to render the niche analysis section with a visually distinct treatment (perhaps a bordered card with accent left-border, showing the 4 analysis points)

**Files affected:**
- `src/app/report/[username]/page.tsx`
- `src/components/report/executive-summary.tsx`
- `src/components/report/report-header.tsx`
- `src/components/report/niche-analysis.tsx` (NEW)

---

### Step 7: Redesign Landing Page Stats Section

Transform the plain text stats into a visually compelling element that builds urgency.

**Actions:**

- Redesign each stat card with:
  - Large number in accent color (keep this, it works)
  - Add a relevant Lucide icon above each number (e.g., `Users` for 40%, `Building2` for 32%, `TrendingDown` for 16%)
  - Add a subtle background card with `bg-surface-raised` and a thin border
  - Add the research source as a tiny citation below: e.g., "(Anthropic, 2025)"
  - Slight rounded corners and padding

- Improve spacing: increase `mt-16` to `mt-20`, add more gap between cards

- Consider making the stats a single full-width bar below the hero fold rather than a grid inside the hero. This creates a clear visual break and acts as a "trust bar" pattern.

**Files affected:**
- `src/components/landing/hero-section.tsx`

---

### Step 8: Redesign "How It Works" Section

Add visual weight and make it less text-heavy.

**Actions:**

- Add large Lucide icons to each step:
  - Step 1: `Link` icon (paste URL)
  - Step 2: `Brain` icon (AI analyzes)
  - Step 3: `FileText` icon (get report)

- Style each icon: `h-10 w-10 text-accent mb-4` inside a `h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center` container

- Add visual connector between steps on desktop: a subtle dashed line or arrow between the 3 cards using CSS `::after` pseudo-elements or a flex gap with a decorative element

- Reduce description text length — make it punchier (one line each max)

- Add subtle hover effect on cards for interactivity feel

**Files affected:**
- `src/components/landing/how-it-works.tsx`

---

### Step 9: Update CLAUDE.md and Context Files

**Actions:**

- Update CLAUDE.md:
  - Note that OpenRouter now uses reasoning/extended thinking
  - Document the new `nicheAnalysis` report field
  - Update the report page description to note the wider layout
  - Note `niche-analysis.tsx` in the components list

- Update `context/current-data.md`:
  - Note the report quality and visual improvements
  - Update cost estimate to reflect reasoning token costs

**Files affected:**
- `CLAUDE.md`
- `context/current-data.md`

---

### Step 10: Test & Validate

**Actions:**

- Run `npm run build` to verify no TypeScript errors
- Run `npm run dev` and test:
  - Landing page renders with new visual stats and how-it-works design
  - Report page is wider and properly laid out
  - Chart doesn't truncate labels
  - If API keys are configured, generate a test report and verify niche analysis appears
  - Check responsive behavior on mobile/tablet breakpoints

**Files affected:**
- No files modified — validation only

---

## Connections & Dependencies

### Files That Reference This Area

| File | Depends On |
|---|---|
| `src/app/report/[username]/page.tsx` | `Report` type, all report components |
| `src/app/api/generate-report/route.ts` | `openrouter.ts`, `report-prompt.ts` |
| `src/components/report/*.tsx` | `Report` type from `src/types/report.ts` |
| Processing page (`src/app/processing/`) | API route format (no changes needed) |

### Updates Needed for Consistency

- `CLAUDE.md` must reflect the new report schema and model configuration
- `context/current-data.md` must reflect the cost changes
- Old cached reports in Supabase won't have `nicheAnalysis` — the field must be optional in TypeScript and the UI must handle its absence gracefully

### Impact on Existing Workflows

- Report generation will take longer (reasoning adds ~15-30s). The processing screen already handles ~50s waits, so this should be fine as long as the Vercel function timeout is increased.
- Cost per report will increase from ~$0.05 to ~$0.10-0.20 due to reasoning tokens.
- Old cached reports will still render correctly since `nicheAnalysis` is optional — they just won't have the niche section.

---

## Validation Checklist

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Report page uses `max-w-4xl` and fills ~60% of a 1440px screen
- [ ] Career trajectory chart labels are fully visible (no truncation)
- [ ] Chart shows divergence shading between lines and Y-axis tier labels
- [ ] Landing page stats section has icons, cards, and source citations
- [ ] "How it works" section has large icons and visual connectors
- [ ] System prompt includes career-transition detection rules
- [ ] OpenRouter request includes `reasoning` parameter with `effort: "high"`
- [ ] `nicheAnalysis` field renders on report page when present
- [ ] Old reports without `nicheAnalysis` still render without errors
- [ ] CLAUDE.md updated with new schema fields and model config
- [ ] Responsive: report page and landing page work on mobile (375px), tablet (768px), desktop (1440px)

---

## Success Criteria

The implementation is complete when:

1. A user who recently transitioned careers (e.g., finance → AI consulting) receives a report focused entirely on their current path, not their old career
2. The career trajectory chart is fully visible with no clipped labels, shows meaningful tier labels on Y-axis, and has visual distinction beyond "one line up, one line down"
3. The report page fills ~60% of a 1440px desktop screen and uses the width with two-column sections
4. The landing page stats section has icons and visual cards, and the "how it works" section has prominent icons with connector visuals — the overall text-to-visual balance feels engaging, not corporate
5. The AI uses extended thinking to deeply analyze the person's specific niche before generating the report

---

## Notes

- **Vercel timeout**: The current `maxDuration = 60` may not be enough with reasoning enabled. Monitor generation times. If consistently over 60s, will need Vercel Pro plan (allows 300s) or implement a background job pattern with polling.
- **Reasoning cost monitoring**: Track the `reasoning_tokens` in OpenRouter responses to understand cost impact. Log this alongside report generation.
- **Future enhancement**: Once reasoning is working well, consider adding a "How we analyzed this" section to the report that surfaces key reasoning steps — this could further build trust and demonstrate the depth of analysis.
- **Future enhancement**: The `trajectoryData` could eventually be generated from a more sophisticated model that considers actual industry data, not just AI reasoning. For now, the reasoning-enhanced prompt should produce significantly better trajectories.
- **Chart animation**: Consider adding entry animations to the chart (lines drawing themselves) for a more engaging reveal. Not in scope for this plan but worth noting.

---

## Implementation Notes

**Implemented:** 2026-03-01

### Summary

All 10 steps executed successfully. The system prompt now forces career-transition detection and niche-specific analysis. Extended thinking is enabled via OpenRouter's reasoning parameter. The report schema includes a new `nicheAnalysis` field (optional for backward compatibility). The career trajectory chart is redesigned with divergence shading, Y-axis tier labels, milestone markers on both lines, inline end-of-line labels, and a "You are here" starting marker. The report page is widened to max-w-4xl with two-column risks/opportunities. The landing page stats section now has icon cards with source citations, and the how-it-works section features large icon containers with connector arrows between steps.

### Deviations from Plan

- Chart redesign: Added a "You are here" marker on the first data point for additional context, which was not in the original plan but enhances the editorial feel.
- Y-axis tiers: Used fixed tick positions (90, 65, 35, 10) with text labels rather than band fills, which is cleaner and more readable.
- Divergence shading: Implemented via ReferenceArea segments between each pair of data points rather than a single filled area, since Recharts doesn't natively support "area between two lines."
- Stats section: Kept inside the hero section but with a clear visual break (mt-20 + cards), rather than making it a completely separate full-width bar. This maintains the single-scroll hero feel.

### Issues Encountered

None — build passes cleanly with zero TypeScript errors.
