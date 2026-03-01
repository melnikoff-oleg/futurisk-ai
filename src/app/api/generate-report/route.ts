import { NextRequest, NextResponse } from 'next/server'
import { scrapeLinkedInProfile } from '@/lib/apify'
import { generateReport } from '@/lib/openrouter'
import { getReport, deleteReport, upsertReport, updateReport } from '@/lib/supabase'

export const maxDuration = 60

const LINKEDIN_REGEX =
  /^https?:\/\/(www\.)?linkedin\.com\/in\/([a-zA-Z0-9\-_%]+)\/?([?#].*)?$/i

function extractUsername(url: string): string | null {
  const match = url.trim().match(LINKEDIN_REGEX)
  if (!match?.[2]) return null
  return decodeURIComponent(match[2]).toLowerCase().replace(/\/$/, '')
}

export async function POST(request: NextRequest) {
  let username: string | null = null
  const t0 = Date.now()

  try {
    const body = await request.json()
    const linkedinUrl = typeof body?.linkedin_url === 'string'
      ? body.linkedin_url.trim()
      : ''

    username = extractUsername(linkedinUrl)
    if (!username) {
      return NextResponse.json(
        { error: 'Please enter a valid LinkedIn profile URL.' },
        { status: 400 }
      )
    }

    // Delete any existing report so we always regenerate fresh
    const existing = await getReport(username)
    if (existing) {
      await deleteReport(username)
    }
    console.log(`[timing] cleanup: ${Date.now() - t0}ms`)

    // Create row as processing
    await upsertReport({ username, linkedin_url: linkedinUrl, status: 'processing' })
    console.log(`[timing] upsert: ${Date.now() - t0}ms`)

    // Step 1: Scrape LinkedIn profile
    const t1 = Date.now()
    const profileData = await scrapeLinkedInProfile(linkedinUrl)
    console.log(`[timing] apify scrape: ${Date.now() - t1}ms (total: ${Date.now() - t0}ms)`)

    // Step 2: Generate report
    const t2 = Date.now()
    const report = await generateReport(profileData)
    console.log(`[timing] openrouter: ${Date.now() - t2}ms (total: ${Date.now() - t0}ms)`)

    // Step 3: Store in Supabase
    await updateReport(username, {
      status: 'complete',
      profile_data: profileData,
      report,
    })
    console.log(`[timing] TOTAL: ${Date.now() - t0}ms`)

    return NextResponse.json({
      ok: true,
      username,
      status: 'complete',
      cached: false,
    })
  } catch (error) {
    console.error(`[timing] FAILED at ${Date.now() - t0}ms`)
    console.error('generate-report error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (username) {
      try {
        await updateReport(username, { status: 'error', error_message: message })
      } catch {
        // Ignore secondary errors
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate report. Please try again.' },
      { status: 500 }
    )
  }
}
