import type { Report } from '@/types/report'
import { ExposureGauge } from './exposure-gauge'

export function ReportHeader({ report }: { report: Report }) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
        Your AI Career Report
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl text-text">
        {report.personName}
      </h1>
      <p className="text-sm text-text-muted -mt-4">
        {report.currentRole} · {report.industry}
      </p>

      {report.moneyHeadline && (
        <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl text-accent font-medium max-w-2xl">
          {report.moneyHeadline}
        </p>
      )}

      <ExposureGauge score={report.aiExposureScore} label={report.aiExposureLabel} />

      <div className="w-full border-t border-border" />
    </div>
  )
}
