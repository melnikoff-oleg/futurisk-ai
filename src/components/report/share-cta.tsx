'use client'

import type { Report } from '@/types/report'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'

interface ShareCtaProps {
  report: Report
  username: string
}

export function ShareCta({ report, username }: ShareCtaProps) {
  const reportUrl = `${
    typeof window !== 'undefined' ? window.location.origin : 'https://futurisk.ai'
  }/report/${username}`

  const moneyLine = report.moneyHeadline || `AI exposure score: ${report.aiExposureScore}/10`

  const shareText = `I just got my AI career money map. ${moneyLine}\n\n"${report.shareableQuote}"\n\nGet yours free: ${reportUrl}\n\n#Futurisk #FutureOfWork #AI`

  function handleShare() {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(reportUrl)}`
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer,width=600,height=600')

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {})
    }
  }

  return (
    <div className="rounded-xl bg-surface-raised border border-border p-6 text-center">
      <h2 className="font-[family-name:var(--font-display)] text-lg text-text mb-2">
        Share your AI Money Map
      </h2>
      <p className="text-sm text-text-muted mb-5">
        Think this is accurate? Share on LinkedIn and see what others think.
      </p>
      <blockquote className="font-[family-name:var(--font-display)] text-sm text-text-muted italic border-l-2 border-accent/40 pl-4 text-left mb-5">
        &ldquo;{report.shareableQuote}&rdquo;
      </blockquote>
      <Button
        onClick={handleShare}
        className="bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold gap-2 w-full sm:w-auto"
      >
        <Linkedin className="h-4 w-4" />
        Share on LinkedIn
      </Button>
      <p className="mt-3 text-xs text-text-muted">
        Share text is copied to your clipboard automatically
      </p>
    </div>
  )
}
