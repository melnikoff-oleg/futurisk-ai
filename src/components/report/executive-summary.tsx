import type { Report } from '@/types/report'

export function ExecutiveSummary({ report }: { report: Report }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="w-12 border-t-2 border-accent" />
      <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-text leading-relaxed">
        {report.executiveSummary}
      </p>
      <p className="text-sm font-semibold text-text-muted">
        &ldquo;{report.shareableQuote}&rdquo;
      </p>
    </div>
  )
}
