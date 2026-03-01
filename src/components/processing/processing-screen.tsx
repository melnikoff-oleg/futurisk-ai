'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Circle, Loader2 } from 'lucide-react'

const STEPS = [
  {
    id: 'scraping',
    label: 'Fetching your LinkedIn profile',
    detail: 'Reading your career history, skills, and experience...',
    duration: 5000,
  },
  {
    id: 'analyzing',
    label: 'Analyzing your career trajectory',
    detail: 'Mapping your role and industry to AI earning potential...',
    duration: 8000,
  },
  {
    id: 'researching',
    label: 'Reviewing AI research',
    detail: 'Cross-referencing McKinsey, Stanford, Anthropic, and YC data...',
    duration: 10000,
  },
  {
    id: 'mapping',
    label: 'Building your AI Money Map',
    detail: 'Charting your earning potential quarter by quarter...',
    duration: 12000,
  },
  {
    id: 'generating',
    label: 'Generating your personalized report',
    detail: 'Creating your 3-year money plan and action steps...',
    duration: 20000,
  },
]

// Last step never auto-completes — it stays spinning until API is done
const LAST_STEP_ID = STEPS[STEPS.length - 1].id

type StepStatus = 'pending' | 'active' | 'complete'

interface ProcessingScreenProps {
  username: string
  linkedinUrl: string
}

export function ProcessingScreen({ username, linkedinUrl }: ProcessingScreenProps) {
  const router = useRouter()
  const [stepStatuses, setStepStatuses] = useState<Record<string, StepStatus>>(
    Object.fromEntries(STEPS.map((s, i) => [s.id, i === 0 ? 'active' : 'pending']))
  )
  const [apiDone, setApiDone] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const startTime = useRef(Date.now())

  // Track elapsed time for the counter
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Animate steps based on durations — last step stays active until API returns
  useEffect(() => {
    let cumulativeTime = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    STEPS.forEach((step, i) => {
      // Mark step as active at its start time
      const startTimer = setTimeout(() => {
        setStepStatuses((prev) => ({ ...prev, [step.id]: 'active' }))
      }, cumulativeTime)
      timers.push(startTimer)

      cumulativeTime += step.duration

      // Don't auto-complete the last step — only complete when API is done
      if (i < STEPS.length - 1) {
        const endTimer = setTimeout(() => {
          setStepStatuses((prev) => ({ ...prev, [step.id]: 'complete' }))
        }, cumulativeTime)
        timers.push(endTimer)
      }
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  // When API finishes, mark ALL steps complete (animation may still be mid-way)
  useEffect(() => {
    if (apiDone) {
      setStepStatuses(
        Object.fromEntries(STEPS.map((s) => [s.id, 'complete' as StepStatus]))
      )
    }
  }, [apiDone])

  // Fire the actual API call
  useEffect(() => {
    async function generate() {
      try {
        const response = await fetch('/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ linkedin_url: linkedinUrl }),
        })
        const data = await response.json()

        if (data.ok) {
          setApiDone(true)
        } else {
          router.push(`/?error=${encodeURIComponent(data.error ?? 'Generation failed')}`)
        }
      } catch {
        router.push('/?error=Something+went+wrong')
      }
    }

    generate()
  }, [linkedinUrl, router])

  // Navigate to report once API is done and last step is marked complete
  useEffect(() => {
    if (!apiDone) return

    const allComplete = STEPS.every((s) => stepStatuses[s.id] === 'complete')
    if (allComplete) {
      const timer = setTimeout(() => {
        router.push(`/report/${username}`)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [apiDone, stepStatuses, username, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (mins > 0) return `${mins}m ${secs}s`
    return `${secs}s`
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-text">Analyzing your career</h1>
          <p className="mt-2 text-text-muted text-sm">
            Our AI is analyzing your earning potential. This usually takes about a minute.
          </p>
          <p className="mt-3 text-xs text-text-muted tabular-nums">
            {formatTime(elapsed)} elapsed
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {STEPS.map((step) => {
            const status = stepStatuses[step.id]
            return (
              <div key={step.id} className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                  {status === 'complete' ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : status === 'active' ? (
                    <Loader2 className="h-5 w-5 text-accent animate-spin" />
                  ) : (
                    <Circle className="h-5 w-5 text-border" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      status === 'active'
                        ? 'text-text'
                        : status === 'complete'
                          ? 'text-text-muted'
                          : 'text-border'
                    }`}
                  >
                    {step.label}
                  </p>
                  {status === 'active' && (
                    <p className="mt-0.5 text-xs text-text-muted">{step.detail}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Reassurance message when it's taking a while */}
        {elapsed > 60 && !apiDone && (
          <p className="mt-8 text-center text-xs text-text-muted animate-pulse">
            Still working — deep analysis takes longer but produces better results.
          </p>
        )}
      </div>
    </div>
  )
}
