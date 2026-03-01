'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProcessingScreen } from '@/components/processing/processing-screen'

export function ProcessingPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const username = searchParams.get('username')

  // Read sessionStorage on first render (browser-only, safe with lazy initializer)
  const [linkedinUrl] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null
    return sessionStorage.getItem('pending_linkedin_url')
  })

  useEffect(() => {
    if (!linkedinUrl || !username) {
      router.push('/')
    }
  }, [linkedinUrl, username, router])

  if (!linkedinUrl || !username) return null

  return <ProcessingScreen username={username} linkedinUrl={linkedinUrl} />
}
