import type { LinkedInProfile, Report } from '@/types/report'
import { SYSTEM_PROMPT, buildUserPrompt } from './report-prompt'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!
const MODEL = 'anthropic/claude-sonnet-4-6'

export async function generateReport(profile: LinkedInProfile): Promise<Report> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://futurisk.ai',
      'X-Title': 'futurisk.ai',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(profile) },
      ],
      temperature: 0.7,
      max_tokens: 32000,
      response_format: { type: 'json_object' },
      reasoning: {
        effort: 'high',
      },
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenRouter API error ${response.status}: ${error}`)
  }

  const data = await response.json()
  const choice = data.choices?.[0]
  const content = choice?.message?.content
  const reasoning = choice?.message?.reasoning
  const finishReason = choice?.finish_reason

  console.log('[openrouter] finish_reason:', finishReason)
  console.log('[openrouter] content length:', content?.length)
  console.log('[openrouter] reasoning length:', reasoning?.length ?? 0)
  console.log('[openrouter] content preview:', content?.slice(0, 300))
  if (reasoning) {
    console.log('[openrouter] reasoning preview:', reasoning.slice(0, 500))
  }

  // Log usage for cost monitoring
  const usage = data.usage
  if (usage) {
    console.log('[openrouter] tokens — prompt:', usage.prompt_tokens, 'completion:', usage.completion_tokens, 'reasoning:', usage.reasoning_tokens ?? 0)
  }

  // Check finish_reason first — if cut off, reasoning ate the budget
  if (finishReason === 'length') {
    throw new Error(
      `Report generation was cut off (finish_reason: length). ` +
      `Content: ${content?.length ?? 0} chars, Reasoning: ${reasoning?.length ?? 0} chars. ` +
      `Increase max_tokens.`
    )
  }

  if (!content) {
    throw new Error(
      `No content returned from OpenRouter. finish_reason: ${finishReason}. ` +
      `Reasoning: ${reasoning?.length ?? 0} chars. Full response: ${JSON.stringify(data).slice(0, 500)}`
    )
  }

  try {
    // Extract JSON object regardless of markdown code fences or other wrapping
    const start = content.indexOf('{')
    const end = content.lastIndexOf('}')
    if (start === -1 || end === -1) throw new Error('No JSON object found in response')
    return JSON.parse(content.slice(start, end + 1)) as Report
  } catch (e) {
    console.error('[openrouter] parse error:', e)
    console.error('[openrouter] full content:', content)
    throw new Error(`Failed to parse report JSON: ${content.slice(0, 300)}`)
  }
}
