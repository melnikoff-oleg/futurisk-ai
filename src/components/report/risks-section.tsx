import type { Report } from '@/types/report'
import { ShieldAlert } from 'lucide-react'

export function RisksSection({ report }: { report: Report }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-text mb-6">
        Challenges to Navigate
      </h2>
      <div className="flex flex-col divide-y divide-border">
        {report.topRisks.map((risk, i) => (
          <div key={i} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-4 w-4 text-accent shrink-0" />
              <span className="text-sm font-semibold text-text flex-1">{risk.risk}</span>
              <div className="flex items-center gap-2 shrink-0">
                {risk.earningImpact && (
                  <span className="text-[10px] font-semibold text-danger bg-danger/10 rounded-full px-2 py-0.5">
                    {risk.earningImpact}
                  </span>
                )}
                <span className="text-[10px] font-semibold text-text-muted bg-surface-raised rounded-full px-2 py-0.5">
                  {risk.timeframe}
                </span>
              </div>
            </div>
            <p className="mt-1.5 pl-7 text-sm text-text-muted">{risk.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
