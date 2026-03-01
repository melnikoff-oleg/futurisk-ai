export interface LinkedInProfile {
  fullName: string
  headline: string
  summary: string
  location: string
  industry: string
  currentRole: string
  currentCompany: string
  yearsExperience: number
  skills: string[]
  experience: {
    title: string
    company: string
    duration: string
    description?: string
  }[]
  education: {
    school: string
    degree: string
    field: string
  }[]
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface TrajectoryPoint {
  quarter: string                    // "Q1 2026", "Q2 2026", etc.
  year: number                      // 2026, 2027, 2028
  statusQuo: number                 // 0–200 earning potential % if they don't adapt (100 = current level)
  adapted: number                   // 0–200 earning potential % if they follow the plan
  aiAdoption: number                // 0–100 AI adoption rate in their industry this quarter
  eventPin?: {
    label: string                   // MAX 8 words. e.g., "GPT-5 disrupts content pipelines"
    type: 'opportunity' | 'disruption' | 'milestone'
  }
}

export interface Report {
  personName: string
  currentRole: string
  industry: string
  aiExposureScore: number           // 1–10
  aiExposureLabel: string           // "Critical Urgency" | "High Urgency" | "Moderate Urgency" | "Low Urgency"
  moneyHeadline: string             // MAX 15 words. e.g., "You could 2x your income by 2028 — or lose 40%."
  executiveSummary: string          // MAX 2 sentences, ~40 words total
  peakEarningWindow?: {
    start: string                   // e.g., "Q2 2026"
    end: string                     // e.g., "Q4 2027"
    description: string             // MAX 20 words. Why this window matters.
  }
  nicheAnalysis?: {
    currentFocus: string            // MAX 15 words. What they actually do RIGHT NOW.
    industryContext: string         // MAX 30 words. How AI is specifically hitting this industry.
    nicheVulnerability: string      // MAX 30 words. The specific threat to their exact niche position.
    uniqueAdvantage: string         // MAX 20 words. What they have that AI can't easily replicate.
  }
  careerSnapshot: {
    yearsExperience: number
    keyStrengths: string[]          // 3–4 items, each MAX 8 words
    currentExposure: string         // MAX 1 sentence, ~20 words
  }
  trajectoryData: TrajectoryPoint[]
  timeline: {
    year: number
    milestone: string               // MAX 15 words
    severity: RiskLevel
    type?: 'opportunity' | 'disruption'
  }[]
  topRisks: {
    risk: string                    // MAX 6 words
    detail: string                  // MAX 1 sentence, ~20 words
    timeframe: string
    earningImpact?: string          // e.g., "-30% earnings"
  }[]
  topOpportunities: {
    opportunity: string             // MAX 6 words
    detail: string                  // MAX 1 sentence, ~20 words
    earningMultiplier?: string      // e.g., "2x potential"
  }[]
  actionPlan: {
    step: number
    action: string                  // MAX 15 words — imperative, direct
    timeframe: string
    earningImpact?: string          // e.g., "+50% earning potential"
  }[]
  shareableQuote: string            // MAX 15 words. Empowering. Aspirational.
  researchSources: string[]
}

export interface ReportRow {
  id: string
  username: string
  linkedin_url: string
  profile_data: LinkedInProfile | null
  report: Report
  status: 'pending' | 'processing' | 'complete' | 'error'
  error_message: string | null
  created_at: string
}
