import { Suspense } from 'react'
import { ProcessingPageClient } from './client'

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-text-muted">Loading...</div>}>
      <ProcessingPageClient />
    </Suspense>
  )
}
