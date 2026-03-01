# Plan: Redesign Report Page, Visual Identity, Logo & Content Density

**Created:** 2026-02-28
**Status:** Implemented
**Request:** Major overhaul: (1) report page — 80% shorter text, add charts and visuals; (2) full visual identity redesign — distinctive fonts, colors, layout that breaks from generic AI startup aesthetics; (3) text logo for futurisk.ai that captures the emotional duality of risk/urgency + opportunity/liberation; (4) landing page refresh to match.

---

## Overview

### What This Plan Accomplishes

This plan delivers four transformations in one: (1) a **text logo** for futurisk.ai that captures the emotional duality of the brand — risk/urgency AND opportunity/liberation — using a weight-split technique in Space Grotesk; (2) the report page becomes a scannable, visual, social-media-optimized experience with ~80% less text, a career trajectory chart, and icon-driven sections; (3) the entire site gets a distinctive visual identity using uncommon typography, a warm light-mode palette, and editorial layout patterns that look nothing like a typical AI startup; (4) the AI prompt is rewritten to produce shorter, punchier content that reads like a confident LinkedIn post, not a research paper.

### The Emotional Core

The brand plays on two simultaneous emotions that create tension and intrigue:

1. **Risk/Urgency** — Your future is at risk. AI is coming. Pay attention. This is not a drill.
2. **Opportunity/Liberation** — This is the AI gold rush. If you position yourself right, this is the biggest opportunity of your career. You can come out of this in an incredibly strong position.

These emotions don't cancel each other — they amplify each other. The urgency makes the opportunity feel real (not theoretical). The opportunity makes the risk feel actionable (not paralyzing). The entire design — logo, palette, typography, content tone — must hold this tension. The site should make you feel like you just got a wake-up call AND a treasure map at the same time.

### Why This Matters

The entire business model depends on people sharing their reports on LinkedIn. A wall of text kills sharing. A generic-looking site kills credibility. The report needs to be instantly scannable, visually striking, and provocative enough that someone screenshots a section and posts it without thinking twice. Every design decision must serve the viral loop — and the emotional duality is what makes it shareable. People share things that make them feel something.

---

## Current State

### Relevant Existing Structure

```
src/app/layout.tsx                    # Font: Inter, metadata still says "AI Predictor"
src/app/globals.css                   # Dark navy theme, standard blue accent
src/app/page.tsx                      # Landing page (HeroSection + HowItWorks)
src/app/report/[username]/page.tsx    # Report page layout
src/components/landing/               # hero-section, url-input-form, how-it-works
src/components/report/                # 7 report sections (all text-heavy)
src/lib/report-prompt.ts             # AI system prompt (generates long text)
src/types/report.ts                  # Report TypeScript interface
```

### Gaps or Problems Being Addressed

1. **Text overload**: The generated report for a real profile produced ~2,000 words of dense paragraph text. Each section has multi-sentence blocks with no visual breathing room. Nobody with a 2026 attention span will read this.

2. **Generic AI aesthetic**: Inter font, dark navy background (#0a0f1e), blue accent (#3b82f6), standard shadcn/ui card patterns. This looks identical to thousands of AI startup landing pages.

3. **Zero data visualization**: The timeline is text-only. The AI exposure score is just a number in a box. There's no chart, no gauge, no visual that tells a story at a glance.

4. **Not screenshot-friendly**: No section of the report looks good as a standalone screenshot for LinkedIn sharing. The share CTA only copies text — there's no visual "card" to share.

5. **Metadata still references "AI Predictor"**: Multiple places in code still use the old name instead of "futurisk.ai".

6. **No logo**: The site has no logo. The brand name "futurisk.ai" has no visual identity — it's just plain text. There's no wordmark that captures the brand's emotional duality.

---

## Proposed Changes

### Summary of Changes

**Logo:**
- Create a text-based logo component for "futurisk.ai" using Space Grotesk with a weight-split technique
- "futu" in light weight (300) — open, aspirational, the future as opportunity
- "risk" in bold weight (700) — heavy, urgent, demands attention
- ".ai" in medium weight (500) with accent color — the technology bridge
- Logo used in the site header/nav and landing page

**Visual Identity (affects everything):**
- Replace Inter with **Space Grotesk** (body) + **Instrument Serif** (display headings)
- Switch from dark mode to warm light mode: cream/off-white base, near-black warm text, burnt orange accent
- Redesign all color tokens in globals.css — the palette must reflect the emotional duality: warm amber/gold tones for opportunity, deep warm red/charcoal for risk
- Update shadcn/ui theme mapping

**Report Page (the main event):**
- Rewrite AI prompt to produce 80% shorter text — one-liner descriptions, not paragraphs
- Update Report TypeScript interface to match new shorter content fields
- Add a **career trajectory chart** (dual-line area chart: "status quo" vs "if you adapt") using Recharts via shadcn/ui charts
- Add a **radial gauge** for the AI Exposure Score (custom SVG)
- Replace text-heavy risk/opportunity cards with icon-driven compact cards
- Redesign timeline as a visual step-based graphic, not a text list
- Make action plan a numbered checklist-style layout, not paragraph blocks
- Add section icons throughout using Lucide
- Ensure every section looks good as a standalone screenshot

**Landing Page:**
- Restyle to match new visual identity
- Update typography and colors
- Keep same structure (hero + how-it-works) but with new aesthetic

**Content/Prompt:**
- Rewrite system prompt: enforce maximum character limits per field
- Add new fields: `trajectoryData` (chart data points), short-form risk/opportunity labels
- Remove verbose fields, restructure for brevity

### New Files to Create

| File Path | Purpose |
|---|---|
| `src/components/logo.tsx` | The futurisk.ai text logo component with weight-split technique |
| `src/components/report/career-trajectory-chart.tsx` | Dual-line area chart showing career value over time (adapt vs. don't adapt) |
| `src/components/report/exposure-gauge.tsx` | Radial SVG gauge for AI Exposure Score |

### Files to Modify

| File Path | Changes |
|---|---|
| `src/app/layout.tsx` | Replace Inter with Space Grotesk + Instrument Serif; update metadata to "futurisk.ai" |
| `src/app/globals.css` | Complete color palette overhaul: light warm mode; new tokens |
| `src/types/report.ts` | Add `trajectoryData` field, add short-form labels, update field constraints |
| `src/lib/report-prompt.ts` | Rewrite system prompt for brevity; add character limits; request chart data |
| `src/components/report/report-header.tsx` | Replace text score box with radial gauge; tighten layout |
| `src/components/report/executive-summary.tsx` | Shorten to max 2 sentences; add visual emphasis |
| `src/components/report/timeline-section.tsx` | Redesign as visual step-based timeline with markers |
| `src/components/report/risks-section.tsx` | Compact icon-driven cards, max 1 sentence per risk |
| `src/components/report/opportunities-section.tsx` | Compact icon-driven cards, max 1 sentence per opportunity |
| `src/components/report/action-plan-section.tsx` | Numbered checklist style, short action descriptions |
| `src/components/report/share-cta.tsx` | Update styling, keep LinkedIn share logic |
| `src/components/landing/hero-section.tsx` | Restyle with new fonts, colors, layout |
| `src/components/landing/how-it-works.tsx` | Restyle with new visual identity |
| `src/components/landing/url-input-form.tsx` | Restyle input + button for new palette |
| `src/app/page.tsx` | Update if needed for layout changes |
| `src/app/report/[username]/page.tsx` | Add chart section, update metadata to "futurisk.ai", restructure layout |
| `package.json` | Add `recharts` dependency (required by shadcn/ui charts) |

### Files to Delete

None.

---

## Design Decisions

### Key Decisions Made

1. **Logo: Space Grotesk weight-split technique**: The word "futurisk" naturally splits into "futu" (future) and "risk" — and the weight-split technique makes this semantic split visible. Light weight = openness/aspiration/opportunity. Bold weight = gravity/urgency/risk. This is more sophisticated than a color split alone because it changes the physical presence of the letters — "risk" literally takes up more visual space, feels heavier, demands more attention. The ".ai" in accent color adds a third element that ties it together. The logo tells the brand story purely through typography, no icon needed.

2. **Space Grotesk + Instrument Serif**: Space Grotesk is geometric with character, tech-appropriate but far less common than Inter (414B accesses) or Poppins. Its monospace heritage gives it a technical edge that other geometric sans-serifs lack — perfect for an AI product. Instrument Serif for display headings adds editorial gravitas and immediately signals "this is a serious report" while breaking from the all-sans-serif AI startup cliche. Both are on Google Fonts — no external hosting needed.

2. **Warm light mode instead of dark**: Research shows ~80%+ of AI startup sites use dark backgrounds with purple/blue gradients. A warm cream/off-white background with dark text and a burnt orange accent instantly differentiates. It also reads better for long-form content (the report page) and makes screenshots pop on LinkedIn's white feed.

3. **Burnt orange accent (#D4622B) instead of blue/purple**: Blue accent (#3b82f6) is the most overused color in tech. Purple/indigo is the documented "AI purple problem." Orange signals energy, urgency, and warmth — fitting for a product about career disruption. It's uncommon in AI products.

4. **Recharts via shadcn/ui charts for the trajectory chart**: Already in our stack ecosystem (shadcn/ui has built-in chart wrappers for Recharts). No need for a new charting paradigm. SVG-based, responsive, clean animations.

5. **Custom SVG gauge instead of a library**: The exposure score gauge is a single radial element. Adding a full gauge library for one component is overkill. A custom SVG arc is ~40 lines, fully themed, and zero extra dependencies.

6. **Prompt-level brevity enforcement**: Rather than truncating long AI output on the frontend, we enforce character limits directly in the system prompt. This produces better content — the AI writes concisely by design rather than having its output chopped.

7. **Single-column editorial layout for report**: The current 2-column grid for risks/opportunities doesn't work on mobile and makes text harder to scan. A single-column vertical flow with clear section breaks matches how people actually scroll and read on mobile — which is how LinkedIn traffic arrives.

### Alternatives Considered

- **Logo: Darker Grotesque** — More aggressive/urgent but less premium. Its brutalist DNA leans too far into "danger" without enough "opportunity." Space Grotesk balances both emotions better.
- **Logo: Bricolage Grotesque with width-axis variation** — Using compressed width for "risk" and regular width for "futu" is a more unusual technique. However, the weight-split in Space Grotesk is a cleaner, more legible effect — especially at small sizes in the nav.
- **Logo: Color split only (no weight split)** — Using different colors for "futu" and "risk" but the same weight. Less impactful — the weight difference is what creates the physical/visceral tension. Color alone is too subtle.
- **Logo: Bebas Neue all-caps** — Maximum urgency, Bloomberg energy. But it's a single-weight font so the weight-split technique is impossible, and all-caps feels like shouting rather than the sophisticated tension we want.
- **Fraunces for display font**: More distinctive but its "wonky" optical axis can feel playful rather than authoritative. Instrument Serif strikes the right balance of editorial + credible.
- **Clash Display from Fontshare**: High quality but requires self-hosting. Sticking with Google Fonts keeps the build simpler.
- **Nivo or Tremor for charts**: More chart types, but adds a major dependency. Recharts via shadcn/ui covers our needs and stays within the existing ecosystem.
- **Dark mode with warm colors**: Considered warm dark mode (dark brown/charcoal instead of navy). Rejected because light mode is a stronger differentiator and better for readability on the report page.

### Open Questions

1. **Existing report data**: The user already has a generated report in Supabase with the old (verbose) schema. After the type change, should we add backward compatibility or just regenerate? (Recommendation: just regenerate — it's one test report.)

---

## Step-by-Step Tasks

### Step 1: Install Dependencies

Install Recharts (required by shadcn/ui chart components).

**Actions:**
- Run `npm install recharts`
- Add the shadcn/ui chart component: `npx shadcn@latest add chart`

**Files affected:**
- `package.json`
- `src/components/ui/chart.tsx` (new, auto-generated by shadcn)

---

### Step 2: Replace Fonts

Swap Inter for Space Grotesk (body) and Instrument Serif (display headings).

**Actions:**
- In `layout.tsx`: Replace `import { Inter }` with imports for `Space_Grotesk` and `Instrument_Serif` from `next/font/google`
- Configure both fonts with appropriate weights:
  - Space Grotesk: weights 300, 400, 500, 600, 700; subsets: ['latin']; variable: `--font-sans` — **NOTE: weight 300 (Light) is required for the logo**
  - Instrument Serif: weights 400; subsets: ['latin']; variable: `--font-display`
- Apply both font variables to the `<body>` className
- Update metadata title/description from "AI Predictor" to "futurisk.ai"
- In `globals.css`: Update `--font-sans` reference; add `--font-display` for heading usage

**Files affected:**
- `src/app/layout.tsx`
- `src/app/globals.css`

---

### Step 3: Build the futurisk.ai Logo Component

Create a text-based logo that visually embodies the brand's emotional duality: risk/urgency + opportunity/liberation.

**Design concept:**

The word "futurisk" is split at its natural semantic break. The typography tells the story before you even read the words:
- **"futu"** — set in Space Grotesk Light (300). Light, open, airy. The future is full of possibility. The thin strokes feel aspirational, like looking at an open horizon.
- **"risk"** — set in Space Grotesk Bold (700). Heavy, grounded, urgent. The thick strokes hit you — this is serious, this has weight, this demands your attention.
- **".ai"** — set in Space Grotesk Medium (500) in the accent color (burnt orange). The bridge between the two emotions. The technology. The tool that both creates the risk and enables the opportunity.

The weight contrast within a single word creates visual tension — your eye feels the shift from light to heavy. It's the typographic equivalent of "this could go either way."

**Actions:**

Create `src/components/logo.tsx`:

```tsx
// Text logo for futurisk.ai
// Uses weight-split technique in Space Grotesk:
//   "futu" (light/300) = opportunity, openness, future
//   "risk" (bold/700) = urgency, weight, danger
//   ".ai"  (medium/500, accent color) = the technology bridge

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'    // sm: nav, md: default, lg: hero
  className?: string
}

// Size maps to text sizes:
// sm: text-lg (~18px) — for nav/header
// md: text-2xl (~24px) — default
// lg: text-4xl (~36px) — for landing hero
```

- The component renders three `<span>` elements side by side with different `font-weight` values
- "futu" span: `font-light` (300), color: `text-text` (default dark)
- "risk" span: `font-bold` (700), color: `text-text` (default dark)
- ".ai" span: `font-medium` (500), color: `text-accent` (burnt orange)
- All three share the same `font-sans` (Space Grotesk) family
- Tracking: slightly tighter on "risk" (`tracking-tight`) vs normal on "futu" to create subtle compression/tension
- No wrapping — the logo is always on one line (`whitespace-nowrap`)

**Files affected:**
- `src/components/logo.tsx` (new)

---

### Step 4: Overhaul Color Palette & Theme

Replace the dark navy/blue theme with a warm light palette.

**Actions:**

New color tokens for `globals.css`:
```
--color-background: #FDFAF6       (warm cream)
--color-surface: #FFFFFF           (white cards)
--color-surface-raised: #F5F0EA   (slightly warm gray)
--color-border: #E5DDD3            (warm border)
--color-text: #1A1207              (near-black, warm brown undertone)
--color-text-muted: #7A7060        (warm gray)
--color-accent: #D4622B            (burnt orange)
--color-accent-hover: #B8511F      (darker orange)
--color-danger: #C43E2B            (warm red)
--color-warning: #D4862B           (amber)
--color-success: #2B7A4B           (forest green)
```

Update all shadcn/ui CSS variable mappings:
```
--background → var(--color-background)
--foreground → var(--color-text)
--card → var(--color-surface)
--primary → var(--color-accent)
--primary-foreground → #FFFFFF
--secondary → var(--color-surface-raised)
--muted → var(--color-surface-raised)
--muted-foreground → var(--color-text-muted)
--destructive → var(--color-danger)
--border → var(--color-border)
--input → var(--color-border)
--ring → var(--color-accent)
```

Update the body styles:
```css
body {
  background: var(--color-background);
  color: var(--color-text);
}
```

Remove any dark mode or `@media (prefers-color-scheme: dark)` blocks.

**Files affected:**
- `src/app/globals.css`

---

### Step 5: Update Report TypeScript Interface

Restructure the Report type for brevity and add chart data.

**Actions:**

Update `src/types/report.ts` with these changes:

```typescript
export interface Report {
  personName: string
  currentRole: string
  industry: string
  aiExposureScore: number        // 1–10
  aiExposureLabel: string        // "Critical Risk" | "High Risk" | "Moderate Risk" | "Low Risk"
  executiveSummary: string       // MAX 2 sentences, ~40 words total

  careerSnapshot: {
    yearsExperience: number
    keyStrengths: string[]       // 3–4 items, each MAX 8 words
    currentExposure: string      // MAX 1 sentence, ~20 words
  }

  trajectoryData: Array<{       // NEW: 5 data points for the chart
    year: number
    statusQuo: number            // 0–100 career value if they don't adapt
    adapted: number              // 0–100 career value if they follow the action plan
    label?: string               // optional annotation for key inflection points
  }>

  timeline: Array<{
    year: number
    milestone: string            // MAX 15 words
    severity: 'low' | 'medium' | 'high' | 'critical'
  }>

  topRisks: Array<{
    risk: string                 // MAX 6 words
    detail: string               // MAX 1 sentence, ~20 words
    timeframe: string
  }>

  topOpportunities: Array<{
    opportunity: string          // MAX 6 words
    detail: string               // MAX 1 sentence, ~20 words
  }>

  actionPlan: Array<{
    step: number
    action: string               // MAX 15 words — imperative, direct
    timeframe: string
  }>

  shareableQuote: string         // MAX 15 words. Punchy. Provocative.
  researchSources: string[]
}
```

Keep the `LinkedInProfile` and `ReportRow` types unchanged.

**Files affected:**
- `src/types/report.ts`

---

### Step 6: Rewrite AI System Prompt

Rewrite the system prompt to enforce brevity and generate chart data.

**Actions:**

Rewrite `SYSTEM_PROMPT` in `src/lib/report-prompt.ts`:

Key changes to the prompt:
- Add explicit instruction: "Write like a confident LinkedIn thought leader, not an academic. Every sentence must be under 15 words. No filler. No hedging. Direct and bold."
- Add character/word limits to every field in the JSON schema comments
- Add instruction to generate `trajectoryData`: "Generate 5 data points (years) showing career value (0–100) for two scenarios: status quo (not adapting to AI) and adapted (following your action plan). Start at the person's current career stage. Include a `label` annotation on 1–2 key inflection points."
- Remove the verbose description allowances. Replace instructions like "1-2 sentences" with "MAX 20 words"
- Add: "Risk and opportunity names must be MAX 6 words. Think headline, not explanation."
- Add: "Action plan steps must be imperative commands. MAX 15 words each. Example: 'Ship an AI-augmented prototype of your core workflow this quarter.'"
- Add: "The shareableQuote must be MAX 15 words. It should be something someone would screenshot and post."
- Update `X-Title` header from 'AI Predictor' to 'futurisk.ai' in openrouter.ts

**Files affected:**
- `src/lib/report-prompt.ts`
- `src/lib/openrouter.ts` (X-Title header)

---

### Step 7: Build the Career Trajectory Chart Component

Create a dual-line area chart showing "status quo" vs "adapted" career trajectories.

**Actions:**

Create `src/components/report/career-trajectory-chart.tsx`:

- Use shadcn/ui `ChartContainer` + Recharts `AreaChart`
- Two areas: "Status Quo" (warm red/danger color, dashed) and "If You Adapt" (forest green/success color, solid)
- X-axis: years
- Y-axis: career value (0–100), labeled "Career Value"
- Custom tooltip showing both values
- Annotation dots on inflection points with labels (from `trajectoryData[].label`)
- Gradient fills under the curves (subtle)
- Responsive container
- Use the new color tokens: `--color-danger` for status quo, `--color-success` for adapted
- No grid lines — keep it clean

Chart config:
```typescript
const chartConfig = {
  statusQuo: { label: "If you don't adapt", color: "var(--color-danger)" },
  adapted: { label: "If you adapt", color: "var(--color-success)" },
}
```

**Files affected:**
- `src/components/report/career-trajectory-chart.tsx` (new)

---

### Step 8: Build the Exposure Score Gauge

Create a radial SVG gauge for the AI Exposure Score.

**Actions:**

Create `src/components/report/exposure-gauge.tsx`:

- Custom SVG component: a semicircular arc (180°) gauge
- Score needle/fill that animates from 0 to the actual score
- Color gradient along the arc: green (1) → orange (5) → red (10)
- Large score number in the center of the arc
- Label below: the `aiExposureLabel` text
- Size: ~180px wide, responsive
- Props: `score: number`, `label: string`

The gauge replaces the current plain box in report-header.

**Files affected:**
- `src/components/report/exposure-gauge.tsx` (new)

---

### Step 9: Redesign Report Header

Replace the current header with a cleaner layout featuring the gauge.

**Actions:**

Rewrite `src/components/report/report-header.tsx`:

New layout:
```
[Centered layout]
Small label: "YOUR AI CAREER REPORT" — uppercase, tracking-widest, text-muted, font-sans
Name: h1, font-display (Instrument Serif), text-3xl
Meta: role · industry — text-muted, text-sm

[Gauge centered below]
ExposureGauge component

[Divider line]
```

Remove the old score box and left/right flex layout. The new design is centered and editorial.

**Files affected:**
- `src/components/report/report-header.tsx`

---

### Step 10: Redesign Executive Summary

Make it punchier and more visual.

**Actions:**

Rewrite `src/components/report/executive-summary.tsx`:

New design:
- Remove the "SUMMARY" label
- Display the `executiveSummary` text as a large pull-quote style:
  - `font-display` (Instrument Serif), `text-xl` or `text-2xl`
  - Centered text
  - No border/background box — just the text with generous spacing above and below
  - Subtle accent-colored left border or top accent line
- Below: the `shareableQuote` in a smaller, bold style as a secondary hook

**Files affected:**
- `src/components/report/executive-summary.tsx`

---

### Step 11: Redesign Timeline Section

Transform from text list to visual timeline.

**Actions:**

Rewrite `src/components/report/timeline-section.tsx`:

New design:
- Section heading: "Your AI Timeline" in `font-display`
- Vertical timeline with a thin line running down the left side
- Each milestone is a node on the line:
  - Colored dot (severity color) on the line
  - Year in bold to the right of the dot
  - Milestone text (max 15 words) next to it
  - Severity badge as a small colored pill
- Compact spacing between items
- On mobile: single column, line on left
- Each milestone should be visually scannable in under 3 seconds

**Files affected:**
- `src/components/report/timeline-section.tsx`

---

### Step 12: Add Chart Section to Report Page

Insert the career trajectory chart into the report layout.

**Actions:**

In `src/app/report/[username]/page.tsx`:

- Add the `CareerTrajectoryChart` component after the timeline section
- Wrap in a section with heading: "Your Career Trajectory" in `font-display`
- Add a one-line description: "Two paths. One choice."
- Pass `report.trajectoryData` as prop

**Files affected:**
- `src/app/report/[username]/page.tsx`

---

### Step 13: Redesign Risks & Opportunities Sections

Replace text-heavy cards with compact, icon-driven cards.

**Actions:**

Rewrite `src/components/report/risks-section.tsx`:
- Section heading: "Risks" in `font-display`
- Each risk:
  - Single row: icon (Lucide `AlertTriangle` or `Flame`) + risk name (bold, max 6 words) + timeframe pill on right
  - Detail text below in one line, text-muted
  - No card border — use subtle bottom divider between items
  - Tight spacing

Rewrite `src/components/report/opportunities-section.tsx`:
- Section heading: "Opportunities" in `font-display`
- Same layout pattern as risks but with `TrendingUp` or `Sparkles` icon and success color
- No card borders — dividers only

Both sections are now single-column (remove the 2-column grid from the report page layout).

**Files affected:**
- `src/components/report/risks-section.tsx`
- `src/components/report/opportunities-section.tsx`
- `src/app/report/[username]/page.tsx` (remove the grid wrapper)

---

### Step 14: Redesign Action Plan Section

Transform into a numbered checklist.

**Actions:**

Rewrite `src/components/report/action-plan-section.tsx`:

New design:
- Section heading: "Your Action Plan" in `font-display`
- Each step:
  - Large step number (accent color, bold) on the left
  - Action text (max 15 words, bold) to the right
  - Timeframe below in small text-muted
  - Subtle bottom divider between steps
- Clean, minimal, no card backgrounds

**Files affected:**
- `src/components/report/action-plan-section.tsx`

---

### Step 15: Update Share CTA

Restyle for the new palette.

**Actions:**

Update `src/components/report/share-cta.tsx`:
- Keep the LinkedIn share logic intact
- Update colors: the box should use `bg-surface-raised` with `border` in the new warm palette
- Update the LinkedIn button color (keep `#0A66C2` — that's LinkedIn's brand color, don't change)
- Update the shareable quote display to use `font-display`
- Ensure the share text references "futurisk.ai" not "AI Predictor"

**Files affected:**
- `src/components/report/share-cta.tsx`

---

### Step 16: Restyle Landing Page & Integrate Logo

Update all landing components for the new visual identity and add the logo.

**Actions:**

Update `src/components/landing/hero-section.tsx`:
- **Add the Logo component** at the top of the hero section, above the heading. Use `size="lg"` for the hero.
- Replace heading font with `font-display` (Instrument Serif) for the main heading
- Remove gradient background — use flat `bg-background` (cream)
- Update accent word styling to use new `text-accent` (burnt orange)
- Update the Badge component styling for warm palette
- Update stats section colors
- The emotional tone of the hero should capture both emotions: the heading should feel urgent ("Find out when AI is coming for your job") while the subheading and CTA should feel empowering (opportunity, action, positioning)

Update `src/components/landing/how-it-works.tsx`:
- Update colors and typography for new palette
- Step numbers in `font-display`

Update `src/components/landing/url-input-form.tsx`:
- Update input and button styling for warm palette
- The suggestion dropdown styling

**Files affected:**
- `src/components/landing/hero-section.tsx`
- `src/components/landing/how-it-works.tsx`
- `src/components/landing/url-input-form.tsx`

---

### Step 17: Update Report Page Layout & Footer

Final layout adjustments and branding cleanup.

**Actions:**

In `src/app/report/[username]/page.tsx`:
- Remove the 2-column grid wrapper around risks/opportunities — make everything single-column
- Add the chart section
- Update the footer text from "AI Predictor" to "futurisk.ai"
- Update `generateMetadata` title/description references from "AI Predictor" to "futurisk.ai"

**Files affected:**
- `src/app/report/[username]/page.tsx`

---

### Step 18: Delete Old Report Data & Test

Clear the old verbose report from Supabase and test end-to-end.

**Actions:**
- Delete the existing `olegai` row from Supabase (it has the old verbose schema)
- Run `npm run dev`
- Submit `https://www.linkedin.com/in/olegai/` on the landing page
- Verify the processing screen works
- Verify the new report generates with short content and chart data
- Verify the report page renders correctly with all visual changes
- Check mobile responsiveness
- Test the LinkedIn share button

**Files affected:**
- None (runtime testing)

---

### Step 19: Update CLAUDE.md and Context

Document the visual identity changes.

**Actions:**

Update `CLAUDE.md`:
- Update the Tech Stack table: add Recharts row
- Note the design system: Space Grotesk + Instrument Serif, warm light palette

Update `context/current-data.md`:
- Update build status to reflect the redesign is complete
- Note that old report data needs regeneration after schema change

**Files affected:**
- `CLAUDE.md`
- `context/current-data.md`

---

## Connections & Dependencies

### Files That Reference This Area

- `src/lib/openrouter.ts` — has `X-Title: 'AI Predictor'` (update to 'futurisk.ai')
- `src/app/report/[username]/page.tsx` — has "AI Predictor" in metadata and footer
- `src/app/layout.tsx` — has "AI Predictor" in metadata
- All components use color tokens from `globals.css`

### Updates Needed for Consistency

- Every reference to "AI Predictor" in the codebase must be changed to "futurisk.ai"
- All components using `text-accent`, `bg-accent`, `border-accent` will automatically pick up the new orange color via CSS variables — no per-component changes needed for the base color swap
- shadcn/ui components (Button, Input, Badge, Card) will automatically inherit the new theme via CSS variables

### Impact on Existing Workflows

- The Report TypeScript interface changes mean **existing reports in Supabase will not render** — they lack `trajectoryData` and have overly long text fields. The one existing test report must be deleted and regenerated.
- The prompt change means future reports will have fundamentally different content — shorter, punchier, with chart data included.

---

## Validation Checklist

- [ ] `npm run dev` starts without errors
- [ ] Logo renders on landing page with visible weight split: "futu" (light), "risk" (bold), ".ai" (accent color)
- [ ] Logo is legible at all three sizes (sm, md, lg)
- [ ] Landing page renders with new fonts (Space Grotesk body, Instrument Serif headings)
- [ ] Landing page uses warm cream background, not dark navy
- [ ] Accent color is burnt orange throughout, not blue
- [ ] Report generates successfully with new shorter content and trajectoryData
- [ ] Career trajectory chart renders with two lines (status quo vs adapted)
- [ ] Exposure gauge renders as a semicircular radial indicator
- [ ] All report sections display short, scannable text (no paragraph blocks)
- [ ] Timeline appears as visual timeline with dots and line, not text list
- [ ] Risks and opportunities are compact single-line items, not cards with paragraphs
- [ ] Action plan is a numbered checklist, not paragraph blocks
- [ ] Report page is single-column layout (no 2-column grid)
- [ ] All "AI Predictor" references are changed to "futurisk.ai"
- [ ] LinkedIn share button works and share text references futurisk.ai
- [ ] Mobile responsive: report looks good on 375px width
- [ ] No TypeScript or build errors
- [ ] CLAUDE.md updated with new tech stack info

---

## Success Criteria

The implementation is complete when:

1. The futurisk.ai logo renders with clear visual tension — you can see and feel the weight shift from "futu" (light) to "risk" (bold) with ".ai" in accent color
2. The report page text is roughly 80% shorter than the current version — every section is scannable in under 5 seconds
3. The career trajectory chart renders correctly with two distinct lines and optional annotation labels
4. The visual identity is distinctly different from generic AI startup sites — warm palette, serif headings, editorial feel
5. The overall site evokes the emotional duality: urgency/risk AND opportunity/liberation — not just one or the other
6. A screenshot of any report section looks like something you'd share on LinkedIn without cropping or editing
7. `npm run dev` builds and runs without errors, and a full end-to-end test (submit URL → processing → report) completes successfully

---

## Notes

- The chart data is AI-generated (the model creates the `trajectoryData` values). This means the trajectories will be personalized to each user's career profile, not generic curves.
- Space Grotesk and Instrument Serif are both Google Fonts with good weight coverage and excellent rendering. No self-hosting complexity.
- The warm light palette will need contrast-checking for accessibility (WCAG AA). Burnt orange on cream should pass for large text; check body text contrast meets 4.5:1 ratio.
- Future consideration: add an animated counter for the exposure score on page load (count up from 0 to N). Not in this plan to keep scope tight.
- Future consideration: generate a shareable OG image (dynamic) for each report so LinkedIn shows a visual card when the URL is shared. This would significantly boost share engagement but is a separate plan.
