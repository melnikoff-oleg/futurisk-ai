'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Loader2 } from 'lucide-react'

export function UrlInputForm() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showSuggestion, setShowSuggestion] = useState(false)
  const TEST_URL = 'https://www.linkedin.com/in/olegai/'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('Please enter your LinkedIn profile URL.')
      return
    }

    if (!url.includes('linkedin.com/in/')) {
      setError('Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/yourname).')
      return
    }

    setLoading(true)

    try {
      // Navigate immediately to processing screen, which will start the job
      const username = url.trim().split('linkedin.com/in/')[1]?.split('/')[0]?.split('?')[0]
      if (!username) {
        setError('Could not parse LinkedIn username from URL.')
        setLoading(false)
        return
      }

      // Store the URL for the processing page to use
      sessionStorage.setItem('pending_linkedin_url', url.trim())
      router.push(`/processing?username=${encodeURIComponent(username)}`)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder="linkedin.com/in/yourname"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setShowSuggestion(e.target.value === '' || TEST_URL.includes(e.target.value))
            }}
            onFocus={() => setShowSuggestion(url === '' || TEST_URL.includes(url))}
            onBlur={() => setTimeout(() => setShowSuggestion(false), 150)}
            className="h-12 w-full bg-surface border-border text-text placeholder:text-text-muted text-base"
            disabled={loading}
          />
          {showSuggestion && url !== TEST_URL && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                setUrl(TEST_URL)
                setShowSuggestion(false)
              }}
              className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-left text-sm text-text hover:bg-accent/10 cursor-pointer"
            >
              {TEST_URL}
            </button>
          )}
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="h-12 bg-accent hover:bg-accent-hover text-white font-semibold px-6 gap-2 shrink-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Analyze my career
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-danger">{error}</p>
      )}
      <p className="mt-3 text-xs text-text-muted">
        Free. No login required. Your data is not stored beyond report generation.
      </p>
    </form>
  )
}
