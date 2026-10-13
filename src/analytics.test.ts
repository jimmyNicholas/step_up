import { beforeEach, describe, expect, it, vi } from 'vitest'

const track = vi.hoisted(() => vi.fn())

vi.mock('@vercel/analytics', () => ({
  track,
}))

describe('trackChallengeEvent', () => {
  beforeEach(() => {
    track.mockClear()
  })

  it('fires calculate, generate_fact, and share_link by those exact names', async () => {
    const { CHALLENGE_EVENTS, trackChallengeEvent } = await import('./analytics')

    trackChallengeEvent(CHALLENGE_EVENTS.calculate)
    trackChallengeEvent(CHALLENGE_EVENTS.generateFact)
    trackChallengeEvent(CHALLENGE_EVENTS.shareLink)

    expect(track.mock.calls).toEqual([
      ['calculate'],
      ['generate_fact'],
      ['share_link'],
    ])
  })
})
