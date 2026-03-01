import type { Report } from '@/types/report'
import { Crosshair, Zap, ShieldAlert, Fingerprint } from 'lucide-react'

export function NicheAnalysis({ report }: { report: Report }) {
  if (!report.nicheAnalysis) return null

  const items = [
    {
      icon: Crosshair,
      label: 'Current Focus',
      value: report.nicheAnalysis.currentFocus,
      color: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      icon: Zap,
      label: 'Industry Context',
      value: report.nicheAnalysis.industryContext,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
    {
      icon: ShieldAlert,
      label: 'Niche Vulnerability',
      value: report.nicheAnalysis.nicheVulnerability,
      color: 'text-danger',
      bg: 'bg-danger/10',
    },
    {
      icon: Fingerprint,
      label: 'Your Unique Advantage',
      value: report.nicheAnalysis.uniqueAdvantage,
      color: 'text-success',
      bg: 'bg-success/10',
    },
  ]

  return (
    <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-text mb-6">
        Your Niche, Analyzed
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item.label} className="flex gap-3">
            <div className={`shrink-0 h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center`}>
              <item.icon className={`h-4.5 w-4.5 ${item.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                {item.label}
              </p>
              <p className="text-sm text-text leading-relaxed">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
