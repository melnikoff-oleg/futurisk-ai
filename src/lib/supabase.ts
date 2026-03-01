const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function supabaseRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T | null> {
  const url = `${SUPABASE_URL}/rest/v1/${path}`
  const response = await fetch(url, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...options.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Supabase error ${response.status}: ${error}`)
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export async function getReport(username: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = await supabaseRequest<any[]>(
    `reports?username=eq.${encodeURIComponent(username)}&limit=1`
  )
  return rows?.[0] ?? null
}

export async function upsertReport(data: {
  username: string
  linkedin_url: string
  status: string
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = await supabaseRequest<any[]>('reports?on_conflict=username', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Prefer: 'return=representation,resolution=merge-duplicates',
    },
  })
  return rows?.[0] ?? null
}

export async function deleteReport(username: string) {
  await supabaseRequest(
    `reports?username=eq.${encodeURIComponent(username)}`,
    { method: 'DELETE' }
  )
}

export async function updateReport(
  username: string,
  data: {
    status: string
    report?: object
    profile_data?: object
    error_message?: string
  }
) {
  await supabaseRequest(
    `reports?username=eq.${encodeURIComponent(username)}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    }
  )
}
