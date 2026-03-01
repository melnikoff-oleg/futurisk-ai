import type { Report } from '@/types/report'

export function ActionPlanSection({ report }: { report: Report }) {
  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-text mb-6">
        Your 3-Year Money Plan
      </h2>
      <div className="flex flex-col divide-y divide-border">
        {report.actionPlan.map((item) => (
          <div key={item.step} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <span className="shrink-0 text-2xl font-bold text-accent tabular-nums leading-none pt-0.5">
              {item.step}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text">{item.action}</p>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-text-muted">{item.timeframe}</span>
                {item.earningImpact && (
                  <span className="text-[10px] font-bold text-success bg-success/10 rounded-full px-2 py-0.5">
                    {item.earningImpact}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
