import type { Report, RiskLevel } from '@/types/report'

const dotColor: Record<RiskLevel, Record<string, string>> = {
  low: { disruption: 'bg-accent', opportunity: 'bg-success' },
  medium: { disruption: 'bg-accent', opportunity: 'bg-success' },
  high: { disruption: 'bg-warning', opportunity: 'bg-success' },
  critical: { disruption: 'bg-danger', opportunity: 'bg-success' },
}

const pillColor: Record<string, string> = {
  opportunity: 'text-success bg-success/10',
  disruption: 'text-warning bg-warning/10',
}

const severityPill: Record<RiskLevel, string> = {
  low: 'text-success bg-success/10',
  medium: 'text-accent bg-accent/10',
  high: 'text-warning bg-warning/10',
  critical: 'text-danger bg-danger/10',
}

export function TimelineSection({ report }: { report: Report }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-text mb-6">
        What&apos;s Coming (2026–2028)
      </h2>
      <div className="relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />

        <div className="flex flex-col gap-6">
          {report.timeline.map((item, i) => {
            const itemType = item.type || 'disruption'
            const dot = dotColor[item.severity]?.[itemType] || 'bg-accent'

            return (
              <div key={i} className="relative flex items-start gap-4">
                {/* Dot on the line */}
                <div
                  className={`absolute -left-8 top-1 h-[18px] w-[18px] rounded-full border-2 border-background ${dot}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-bold tabular-nums text-text">
                      {item.year}
                    </span>
                    {item.type && (
                      <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 ${pillColor[item.type] || severityPill[item.severity]}`}>
                        {item.type}
                      </span>
                    )}
                    <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 ${severityPill[item.severity]}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted leading-relaxed">
                    {item.milestone}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
