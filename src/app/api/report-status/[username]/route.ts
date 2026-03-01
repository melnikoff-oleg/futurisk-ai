import { NextRequest, NextResponse } from 'next/server'
import { getReport } from '@/lib/supabase'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  try {
    const row = await getReport(username)

    if (!row) {
      return NextResponse.json({ status: 'not_found' }, { status: 404 })
    }

    return NextResponse.json({
      status: row.status,
      username: row.username,
      hasReport: Boolean(row.report),
    })
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
