import { track } from '@vercel/analytics'

export const CHALLENGE_EVENTS = {
  calculate: 'calculate',
  generateFact: 'generate_fact',
  shareLink: 'share_link',
} as const

export type ChallengeEventName =
  (typeof CHALLENGE_EVENTS)[keyof typeof CHALLENGE_EVENTS]

export function trackChallengeEvent(name: ChallengeEventName): void {
  track(name)
}
