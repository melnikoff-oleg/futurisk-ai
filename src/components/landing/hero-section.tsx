import { UrlInputForm } from './url-input-form'
import { Logo } from '@/components/logo'
import { Users, Building2, TrendingDown } from 'lucide-react'

const stats = [
  {
    value: '40%',
    label: 'of employees now use AI at work',
    source: 'Anthropic, 2025',
    icon: Users,
  },
  {
    value: '32%',
    label: 'of companies plan workforce cuts',
    source: 'McKinsey, 2025',
    icon: Building2,
  },
  {
    value: '16%',
    label: 'drop in entry-level white-collar jobs',
    source: 'Stanford, 2025',
    icon: TrendingDown,
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="flex flex-col items-center text-center max-w-3xl">
        <Logo size="lg" className="mb-8" />

        <span className="inline-block mb-6 border border-border text-text-muted bg-surface-raised text-xs font-medium rounded-full px-4 py-1.5 tracking-wide">
          Backed by McKinsey, Stanford &amp; Anthropic research
        </span>

        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-text leading-tight">
          Find out when AI is
          <br />
          <span className="text-accent">coming for your job</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed">
          Paste your LinkedIn URL. Get a personalized report — in 60 seconds — predicting
          exactly how AI will reshape your career, with a timeline and action plan.
        </p>

        <div className="mt-10 w-full flex justify-center">
          <UrlInputForm />
        </div>
      </div>

      {/* Stats bar — visual break below hero */}
      <div className="mt-20 w-full max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface-raised/50 px-6 py-6 text-center"
            >
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-3xl sm:text-4xl font-bold text-accent tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm text-text-muted leading-snug">
                {stat.label}
              </span>
              <span className="text-[10px] text-text-muted/60 font-medium uppercase tracking-wider">
                {stat.source}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
