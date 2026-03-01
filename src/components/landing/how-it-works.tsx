import { Link, Brain, FileText, ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Paste your LinkedIn URL',
    description: 'No login. No permissions. Just your public profile link.',
    icon: Link,
  },
  {
    number: '02',
    title: 'AI analyzes your career',
    description: 'Cross-referenced against the latest AI research in seconds.',
    icon: Brain,
  },
  {
    number: '03',
    title: 'Get your personal report',
    description: 'Specific risk score, timeline, and action plan for your role.',
    icon: FileText,
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-center text-text mb-12">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center text-center rounded-xl border border-border bg-surface px-6 py-8 transition-colors hover:border-accent/30 hover:bg-surface-raised/30"
            >
              {/* Connector arrow (desktop only, not after last item) */}
              {i < steps.length - 1 && (
                <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center rounded-full bg-background border border-border">
                  <ArrowRight className="h-3 w-3 text-text-muted" />
                </div>
              )}

              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors">
                <step.icon className="h-7 w-7 text-accent" />
              </div>

              <span className="font-[family-name:var(--font-display)] text-3xl text-accent/20 mb-2">
                {step.number}
              </span>

              <h3 className="text-base font-semibold text-text mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
