import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getReport } from '@/lib/supabase'
import { Logo } from '@/components/logo'
import { ReportHeader } from '@/components/report/report-header'
import { ExecutiveSummary } from '@/components/report/executive-summary'
import { NicheAnalysis } from '@/components/report/niche-analysis'
import { TimelineSection } from '@/components/report/timeline-section'
import { CareerTrajectoryChart } from '@/components/report/career-trajectory-chart'
import { RisksSection } from '@/components/report/risks-section'
import { OpportunitiesSection } from '@/components/report/opportunities-section'
import { ActionPlanSection } from '@/components/report/action-plan-section'
import { ShareCta } from '@/components/report/share-cta'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const row = await getReport(username)
  const report = row?.report

  if (!report) {
    return { title: 'Report Not Found — futurisk.ai' }
  }

  return {
    title: `${report.personName}'s AI Career Report — futurisk.ai`,
    description: report.moneyHeadline || report.executiveSummary,
    openGraph: {
      title: `${report.personName} — ${report.moneyHeadline || `AI exposure: ${report.aiExposureScore}/10`}`,
      description: report.executiveSummary,
    },
  }
}

export default async function ReportPage({ params }: Props) {
  const { username } = await params
  const row = await getReport(username)

  if (!row || !row.report) {
    notFound()
  }

  const report = row.report

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col gap-10">
        <div className="flex justify-center">
          <Logo size="sm" />
        </div>

        <ReportHeader report={report} />

        {/* Chart as hero visual — first thing users see after header */}
        {report.trajectoryData && report.trajectoryData.length > 0 && (
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-text mb-2">
              Your AI Money Map
            </h2>
            <p className="text-sm text-text-muted mb-6">
              Earning potential over the next 3 years — two paths, one choice.
            </p>
            <CareerTrajectoryChart data={report.trajectoryData} />
          </div>
        )}

        {/* Peak Earning Window highlight */}
        {report.peakEarningWindow && (
          <div className="rounded-xl border-2 border-success/30 bg-success/5 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="shrink-0 h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <span className="text-lg">&#128176;</span>
            </div>
            <div>
              <p className="text-sm font-bold text-success">
                Peak Earning Window: {report.peakEarningWindow.start} – {report.peakEarningWindow.end}
              </p>
              <p className="text-sm text-text-muted mt-0.5">
                {report.peakEarningWindow.description}
              </p>
            </div>
          </div>
        )}

        <ExecutiveSummary report={report} />
        <NicheAnalysis report={report} />
        <TimelineSection report={report} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <OpportunitiesSection report={report} />
          <RisksSection report={report} />
        </div>

        <ActionPlanSection report={report} />
        <ShareCta report={report} username={username} />

        <footer className="text-center text-xs text-text-muted pt-4 border-t border-border">
          <p>
            Report based on{' '}
            {report.researchSources.join(', ')}.{' '}
            futurisk.ai by{' '}
            <a
              href="https://authority.ai"
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Authority-AI
            </a>
            .
          </p>
        </footer>
      </div>
    </main>
  )
}
