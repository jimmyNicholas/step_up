import {
  CASUAL_WALK_KM_H,
  COMPARISON_LENGTHS_M,
  JOURNEY_MILESTONES,
  MARATHON_DISTANCE_KM,
  MEAN_EARTH_MOON_DISTANCE_KM,
  METRES_PER_STEP,
  type ComparisonId,
  type JourneyMilestone,
} from './constants'

export type ChallengeInput = {
  averageStepsPerPerson: number
  teamSize: number
}

export type JourneySummary = {
  lastReached: JourneyMilestone
  next: JourneyMilestone | null
  remainingKm: number
}

export type FactValues = {
  /** Hours to cover distanceKm at {@link CASUAL_WALK_KM_H}, rounded up. */
  casualWalkHours: number
  /** Hours if taking one step per second, rounded. */
  oneStepPerSecondHours: number
}

export type ChallengeResult = {
  totalSteps: number
  distanceKm: number
  marathons: number
  moonPercent: number
  comparisons: Record<ComparisonId, number>
  journey: JourneySummary
  factValues: FactValues
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

export function normalizeChallengeInput(input: ChallengeInput): ChallengeInput {
  return {
    averageStepsPerPerson: coerceAverageStepsPerPerson(
      input.averageStepsPerPerson,
    ),
    teamSize: coerceTeamSize(input.teamSize),
  }
}

function computeComparisons(
  distanceMetres: number,
): Record<ComparisonId, number> {
  const comparisons = {} as Record<ComparisonId, number>
  for (const id of Object.keys(COMPARISON_LENGTHS_M) as ComparisonId[]) {
    comparisons[id] = distanceMetres / COMPARISON_LENGTHS_M[id]
  }
  return comparisons
}

function computeJourney(distanceKm: number): JourneySummary {
  let lastReached = JOURNEY_MILESTONES[0]
  let next: JourneyMilestone | null = null

  for (const milestone of JOURNEY_MILESTONES) {
    if (distanceKm >= milestone.distanceKm) {
      lastReached = milestone
    } else {
      next = milestone
      break
    }
  }

  return {
    lastReached,
    next,
    remainingKm: next ? next.distanceKm - distanceKm : 0,
  }
}

export function computeStepChallenge(input: ChallengeInput): ChallengeResult {
  const { averageStepsPerPerson, teamSize } = normalizeChallengeInput(input)

  const totalSteps = averageStepsPerPerson * teamSize
  const distanceMetres = totalSteps * METRES_PER_STEP
  const distanceKm = distanceMetres / 1000
  const marathons = distanceKm / MARATHON_DISTANCE_KM
  const moonPercent = (distanceKm / MEAN_EARTH_MOON_DISTANCE_KM) * 100
  const comparisons = computeComparisons(distanceMetres)
  const journey = computeJourney(distanceKm)
  const factValues: FactValues = {
    casualWalkHours: Math.ceil(distanceKm / CASUAL_WALK_KM_H),
    oneStepPerSecondHours: Math.round(totalSteps / 3600),
  }

  return {
    totalSteps,
    distanceKm,
    marathons,
    moonPercent,
    comparisons,
    journey,
    factValues,
  }
}
