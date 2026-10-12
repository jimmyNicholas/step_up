import {
  MARATHON_DISTANCE_KM,
  MEAN_EARTH_MOON_DISTANCE_KM,
  METRES_PER_STEP,
} from './constants'

export type ChallengeInput = {
  averageStepsPerPerson: number
  teamSize: number
}

export type ChallengeResult = {
  totalSteps: number
  distanceKm: number
  marathons: number
  moonPercent: number
}

function coerceAverageStepsPerPerson(value: number): number {
  if (!Number.isFinite(value) || value < 0) {
    return 0
  }
  return value
}

function coerceTeamSize(value: number): number {
  if (!Number.isFinite(value) || value < 1) {
    return 1
  }
  return value
}

export function computeStepChallenge(input: ChallengeInput): ChallengeResult {
  const averageStepsPerPerson = coerceAverageStepsPerPerson(
    input.averageStepsPerPerson,
  )
  const teamSize = coerceTeamSize(input.teamSize)

  const totalSteps = averageStepsPerPerson * teamSize
  const distanceKm = (totalSteps * METRES_PER_STEP) / 1000
  const marathons = distanceKm / MARATHON_DISTANCE_KM
  const moonPercent = (distanceKm / MEAN_EARTH_MOON_DISTANCE_KM) * 100

  return {
    totalSteps,
    distanceKm,
    marathons,
    moonPercent,
  }
}
