import type { ChallengeInput } from './computeStepChallenge'

export type ShareParams = ChallengeInput

export function serializeShareParams(params: ShareParams): string {
  const search = new URLSearchParams({
    steps: String(params.averageStepsPerPerson),
    team: String(params.teamSize),
  })
  return search.toString()
}

export function parseShareParams(search: string): ShareParams | null {
  const normalized = search.startsWith('?') ? search.slice(1) : search
  const params = new URLSearchParams(normalized)

  if (!params.has('steps') || !params.has('team')) {
    return null
  }

  return {
    averageStepsPerPerson: Number(params.get('steps')),
    teamSize: Number(params.get('team')),
  }
}
