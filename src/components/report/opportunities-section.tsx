import type { Report } from '@/types/report'
import { TrendingUp } from 'lucide-react'

export function OpportunitiesSection({ report }: { report: Report }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-text mb-6">
        Money Moves
      </h2>
      <div className="flex flex-col divide-y divide-border">
        {report.topOpportunities.map((opp, i) => (
          <div key={i} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-success shrink-0" />
              <span className="text-sm font-semibold text-text flex-1">{opp.opportunity}</span>
              {opp.earningMultiplier && (
                <span className="text-[10px] font-bold text-success bg-success/10 rounded-full px-2.5 py-0.5 shrink-0">
                  {opp.earningMultiplier}
                </span>
              )}
            </div>
            <p className="mt-1.5 pl-7 text-sm text-text-muted">{opp.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
