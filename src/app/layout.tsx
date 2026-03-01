import type { Metadata } from 'next'
import { Space_Grotesk, Instrument_Serif } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'futurisk.ai — Find out when AI is coming for your job',
  description:
    'Paste your LinkedIn profile and get a personalized report predicting how AI will impact your career. Backed by McKinsey, Stanford, and Anthropic research.',
  openGraph: {
    title: 'futurisk.ai — Find out when AI is coming for your job',
    description:
      'Get a personalized AI career impact report in 60 seconds. Backed by real research.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
