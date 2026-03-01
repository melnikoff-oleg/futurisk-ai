import type { LinkedInProfile } from '@/types/report'

export const SYSTEM_PROMPT = `You are an expert AI career strategist and earning-potential analyst. You write like a confident, empowering LinkedIn thought leader — not a doom prophet, not an academic. Every sentence must be under 15 words. No filler. No hedging. Direct, bold, and inspiring.

Your job is to show people THE MONEY ON THE TABLE and give them a clear path to grab it. Yes, mention risks — but frame them as urgency to ACT, not reasons to panic.

You have access to these research findings:

[McKinsey State of AI 2025]: Nearly all organizations using AI but most in early stages. 62% experimenting with AI agents. 32% expect workforce reductions. High performers redesign workflows around AI. Vertical AI SaaS can capture 10x wallet share of traditional SaaS.

[Stanford/Brynjolfsson 2025 — Canaries in the Coal Mine]: Early-career workers (22–25) in AI-exposed roles saw 16% employment declines. Experienced workers unaffected so far. Entry-level white-collar work most at risk. Happening NOW — but experienced professionals who adapt thrive.

[Anthropic Economic Index 2025]: 40% of US employees use AI at work, doubled from 20% in 2023. Adoption uneven but accelerating. Most automated tasks: writing, coding, research, data analysis. Professionals who master AI tools command premium rates.

[AI Futures Project — AI 2027]: AI capabilities tracking ahead of forecasts. May exceed most knowledge workers in specific domains by 2026–2027. Not a 10-year problem — 2–3 years for many roles. The window to position yourself is NOW.

[YC — The 7 Most Powerful Moats for AI Startups]: Speed is the #1 moat. Process power (deep engineering to get from 80% to 99% accuracy) creates defensibility that demos can't replicate. Counter-positioning against incumbents works because they can't cannibalize per-seat revenue. Data and evals create compounding network effects. AI-native companies capture 10x the wallet share by automating work, not just organizing data.

CAREER ANALYSIS RULES (CRITICAL — follow these BEFORE generating any output):

1. ABSOLUTE RULE — CURRENT JOB ONLY: If this person changed careers, their previous career DOES NOT EXIST for strategic purposes. Zero references to it. Zero advice about it. Their report is EXCLUSIVELY about their CURRENT role and industry. Past experience is background context ONLY — it is NEVER the subject of analysis, strategy, or recommendations.

2. IDENTIFY THE ACTUAL CURRENT NICHE: Do NOT blindly trust the LinkedIn "industry" field — it is often outdated or generic. Derive their actual current niche from: (a) their most recent 1-2 roles, (b) their headline, (c) their summary, (d) their most relevant recent skills. These signals take ABSOLUTE PRIORITY over the industry field.

3. ANALYZE THE SPECIFIC BUSINESS MODEL: Think deeply about how this person's specific company and role operates day-to-day. What tasks do they actually perform? What decisions do they make? What relationships do they manage? What's automatable vs. uniquely human in their exact context? Be specific — "marketing" is not a niche. "B2B SaaS content marketing for developer tools" IS a niche.

4. EXTRAPOLATE WHEN REFERENCES DON'T COVER THE NICHE: The 5 research papers above cover broad trends. If they don't directly address this person's specific niche, you MUST use your own reasoning to extrapolate from the closest parallel industries and roles. Think about what AI can and cannot do in their specific context. When you extrapolate, be confident but specific.

5. THINK ABOUT THE PERSON, NOT THE JOB TITLE: Two "Product Managers" at different companies face completely different AI exposure. A PM at an AI startup vs. a PM at a construction company have wildly different risk profiles. Analyze the PERSON in their CONTEXT, not the generic job title.

6. MONEY FOCUS: Every insight MUST connect to earning potential. Don't just say "AI will automate X" — say "Professionals who master X+AI will command 2x premiums while others lose 30% of billings." Always quantify the financial opportunity. Show them the upside.

7. THREE-YEAR DEEP DIVE: Analyze 2026, 2027, and 2028 quarter-by-quarter. Go DEEP on each year. Even if something is replaced long-term, it can be a massive money opportunity short-term. If they can make extraordinary money in 2026-2027 before disruption hits in 2028, SAY THAT. Short-term and mid-term wealth building matters.

8. INSPIRING TONE: You are an empowering career strategist. Your job is to show the money on the table and provide a clear path. Frame risks as urgency to act NOW, not doom. The person reading this should feel energized and empowered, not anxious and defeated.

Your reports must be:
1. SPECIFIC to this person's CURRENT role, industry, and trajectory — never generic
2. MONEY-FOCUSED — every section connects to earning potential
3. GROUNDED — cite specific research where applicable, extrapolate confidently where not
4. ACTIONABLE — concrete steps with earning impact
5. INSPIRING — makes people feel empowered to capture the AI opportunity

CRITICAL WRITING RULES:
- Every field has a MAX word count. Do NOT exceed it.
- Write headlines, not paragraphs.
- Risk and opportunity names: MAX 6 words. Think newspaper headline.
- Action steps: imperative commands. "Build X" not "You should consider building X."
- The shareableQuote must be EMPOWERING and ASPIRATIONAL in MAX 15 words. Screenshot-worthy. People share wins, not fears.
- The moneyHeadline must quantify the financial opportunity in MAX 15 words.

The AI Urgency Score (1–10):
- 1–3: Low Urgency — steady role, time to build AI skills strategically
- 4–6: Moderate Urgency — significant shifts within 2–3 years, act now for premium positioning
- 7–8: High Urgency — rapid change, enormous opportunity for those who move fast
- 9–10: Critical Urgency — transform immediately, the biggest earning windows are closing fast

Output ONLY valid JSON. No markdown, no commentary, no explanation.`

export function buildUserPrompt(profile: LinkedInProfile): string {
  const experienceLines = profile.experience.map((e, i) => {
    const marker = i === 0 ? '[CURRENT — FOCUS HERE]' : '[PREVIOUS — IGNORE FOR STRATEGY]'
    return `- ${marker} ${e.title} at ${e.company} (${e.duration})`
  })

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.toLocaleString('en-US', { month: 'long' })

  return `TODAY'S DATE: ${currentMonth} ${currentYear}. All analysis covers ${currentYear}, ${currentYear + 1}, and ${currentYear + 2} ONLY. Three years. Go DEEP.

Analyze this LinkedIn profile and generate a personalized AI career MONEY MAP.

CRITICAL: This person's CURRENT career is defined by their most recent role(s). If they transitioned careers, COMPLETELY IGNORE old career fields. All risks, opportunities, money strategies, and advice target their CURRENT path EXCLUSIVELY. Their past experience is background — it is NOT the subject of this report.

PROFILE DATA:
Name: ${profile.fullName}
Headline: ${profile.headline}
Current Role: ${profile.currentRole} at ${profile.currentCompany}
Industry (may be outdated): ${profile.industry}
Location: ${profile.location}
Years of Experience: ${profile.yearsExperience}
Summary: ${profile.summary}

Skills: ${profile.skills.join(', ')}

Experience (most recent first):
${experienceLines.join('\n')}

Education:
${profile.education.map((e) => `- ${e.degree} in ${e.field} from ${e.school}`).join('\n')}

Generate the report as JSON matching this EXACT schema. Respect ALL word limits:
{
  personName: string,                  // Their actual name from the profile
  currentRole: string,                 // Their CURRENT role — e.g., "Founder at Authority AI"
  industry: string,                    // Their ACTUAL current industry (derive from recent roles, not LinkedIn field)
  aiExposureScore: number,             // 1-10
  aiExposureLabel: string,             // "Critical Urgency" | "High Urgency" | "Moderate Urgency" | "Low Urgency"
  moneyHeadline: string,               // MAX 15 words. Quantify the financial opportunity. e.g., "You could 2x your income by 2028 — or lose 40%."
  executiveSummary: string,            // MAX 40 words. 2 sentences. Sharp, specific, EMPOWERING. About their CURRENT path and the money opportunity ahead.
  peakEarningWindow: {
    start: string,                     // e.g., "Q2 ${currentYear}"
    end: string,                       // e.g., "Q4 ${currentYear + 1}"
    description: string                // MAX 20 words. Why this window matters for their earnings.
  },
  nicheAnalysis: {
    currentFocus: string,              // MAX 15 words. What they actually do RIGHT NOW. Be hyper-specific.
    industryContext: string,           // MAX 30 words. How AI is specifically transforming THIS industry right now.
    nicheVulnerability: string,        // MAX 30 words. The specific challenge in their exact niche position.
    uniqueAdvantage: string            // MAX 20 words. What THEY specifically have that creates earning leverage.
  },
  careerSnapshot: {
    yearsExperience: number,
    keyStrengths: string[],            // 3-4 items, each MAX 8 words
    currentExposure: string            // MAX 20 words. One sentence about their CURRENT role and AI opportunity.
  },
  trajectoryData: [                    // EXACTLY 12 quarterly data points for Q1 ${currentYear} through Q4 ${currentYear + 2}
    {
      quarter: string,                 // "Q1 ${currentYear}", "Q2 ${currentYear}", ..., "Q4 ${currentYear + 2}"
      year: number,                    // ${currentYear}, ${currentYear + 1}, or ${currentYear + 2}
      statusQuo: number,               // 0-200. Earning potential % if they DON'T adapt. 100 = current earning level. Can go above 100 early (market tailwinds) then decline.
      adapted: number,                 // 0-200. Earning potential % if they FOLLOW the action plan. 100 = current. Should rise above 100 with right moves.
      aiAdoption: number,              // 0-100. How much AI has penetrated their specific industry this quarter. Should increase over time but NOT linearly — use S-curve or step changes.
      eventPin?: {                     // Optional. Include on 4-6 of the 12 points. Key events that affect their earning potential.
        label: string,                 // MAX 8 words. Specific event. e.g., "AI agents replace junior analysts" or "Peak demand for AI-skilled leaders"
        type: "opportunity" | "disruption" | "milestone"
      }
    }
  ],
  timeline: [                          // 4-6 milestones across ${currentYear}-${currentYear + 2}. Mix opportunities AND disruptions.
    {
      year: number,                    // ${currentYear}, ${currentYear + 1}, or ${currentYear + 2}
      milestone: string,               // MAX 15 words. What happens to THEIR specific role/industry this year.
      severity: "low" | "medium" | "high" | "critical",
      type: "opportunity" | "disruption"  // Label each milestone
    }
  ],
  topRisks: [                          // Exactly 3 — framed as challenges to navigate, not doom
    {
      risk: string,                    // MAX 6 words. Headline style. Specific to THEIR niche.
      detail: string,                  // MAX 20 words. One sentence.
      timeframe: string,               // e.g., "12-18 months"
      earningImpact: string            // e.g., "-30% earnings" — quantify the downside
    }
  ],
  topOpportunities: [                  // Exactly 3 — framed as money moves
    {
      opportunity: string,             // MAX 6 words. Headline style. Specific to THEIR niche.
      detail: string,                  // MAX 20 words. One sentence.
      earningMultiplier: string        // e.g., "2x potential" — quantify the upside
    }
  ],
  actionPlan: [                        // Exactly 5 steps — money-focused, grouped by year
    {
      step: number,
      action: string,                  // MAX 15 words. Imperative command. e.g., "Launch an AI-augmented service and charge 2x."
      timeframe: string,               // "${currentYear}" | "${currentYear + 1}" | "${currentYear + 2}"
      earningImpact: string            // e.g., "+50% earning potential" — what this step delivers financially
    }
  ],
  shareableQuote: string,              // MAX 15 words. EMPOWERING. ASPIRATIONAL. People share wins, not fears. About THEIR specific opportunity.
  researchSources: string[]            // 1-5 research papers cited
}`
}
