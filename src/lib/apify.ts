import type { LinkedInProfile } from '@/types/report'

const APIFY_API_KEY = process.env.APIFY_API_KEY!
const ACTOR_ID = 'VhxlqQXRwhW8H5hNV'
const BASE_URL = 'https://api.apify.com/v2'

function extractUsername(linkedinUrl: string): string {
  // Handle: https://www.linkedin.com/in/username/ or linkedin.com/in/username
  const match = linkedinUrl.match(/linkedin\.com\/in\/([^/?#]+)/)
  if (!match) throw new Error('Could not extract LinkedIn username from URL')
  return match[1].replace(/\/$/, '')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProfile(raw: any): LinkedInProfile {
  const experience = (raw.experience ?? raw.positions ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pos: any) => ({
      title: pos.title ?? pos.jobTitle ?? '',
      company: pos.companyName ?? pos.company ?? '',
      duration: pos.duration ?? pos.timePeriod?.duration ?? '',
      description: pos.description ?? '',
    })
  )

  const skills = (raw.skills ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (s: any) => (typeof s === 'string' ? s : s.name ?? s.title ?? '')
  ).filter(Boolean)

  return {
    fullName: raw.fullName ?? raw.name ?? '',
    headline: raw.headline ?? '',
    summary: raw.about ?? raw.summary ?? '',
    location: raw.location ?? raw.addressWithCountry ?? '',
    industry: raw.industry ?? raw.industryName ?? '',
    currentRole: experience[0]?.title ?? raw.headline ?? '',
    currentCompany: experience[0]?.company ?? '',
    yearsExperience: raw.yearsOfExperience ?? experience.length * 2,
    skills: skills.slice(0, 20),
    experience: experience.slice(0, 5),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    education: (raw.education ?? raw.educations ?? []).map((edu: any) => ({
      school: edu.schoolName ?? edu.school ?? '',
      degree: edu.degreeName ?? edu.degree ?? '',
      field: edu.fieldOfStudy ?? edu.field ?? '',
    })),
  }
}

export async function scrapeLinkedInProfile(
  linkedinUrl: string
): Promise<LinkedInProfile> {
  const username = extractUsername(linkedinUrl)

  const response = await fetch(
    `${BASE_URL}/acts/${ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_API_KEY}&timeout=55`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Apify scrape failed: ${response.status}`)
  }

  const results: unknown[] = await response.json()

  if (!results || results.length === 0) {
    throw new Error('No profile data returned from Apify')
  }

  return normalizeProfile(results[0])
}
