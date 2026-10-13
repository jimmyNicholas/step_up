import {
  CASUAL_WALK_KM_H,
  COMPARISON_LENGTHS_M,
  FUN_FACT_REFERENCES,
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
  tanLaps: number
  greatOceanRoads: number
  earthPercent: number
  everestsStacked: number
  eurekaTowersStacked: number
  lightMilliseconds: number
  wombatSprintHours: number
  snailYears: number
  /** Standard 7.6-hour workdays needed to walk the distance at a casual pace. */
  casualWalkWorkdays: number
  /** Days for one person taking one step per second, day and night. */
  oneStepPerSecondDays: number
  /** Distance as multiples of the Melbourne GPO to Hobart great-circle distance. */
  hobartTrips: number
  /** Distance as multiples of each international walk's length. */
  caminoFrancesWalks: number
  greatWallWalks: number
  appalachianTrailWalks: number
  nijmegenMarches: number
  raceWalks: number
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
  const refs = FUN_FACT_REFERENCES

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
    tanLaps: distanceKm / refs.tanLapKm,
    greatOceanRoads: distanceKm / refs.greatOceanRoadKm,
    earthPercent: (distanceKm / refs.earthCircumferenceKm) * 100,
    everestsStacked: distanceKm / refs.everestKm,
    eurekaTowersStacked: distanceKm / refs.eurekaTowerKm,
    lightMilliseconds: (distanceKm / refs.lightKmPerSecond) * 1000,
    wombatSprintHours: distanceKm / refs.wombatKmH,
    snailYears: distanceKm / refs.snailKmH / (24 * 365.25),
    casualWalkWorkdays: distanceKm / CASUAL_WALK_KM_H / refs.workdayHours,
    oneStepPerSecondDays: totalSteps / 86_400,
    hobartTrips: distanceKm / refs.hobartKm,
    caminoFrancesWalks: distanceKm / refs.caminoFrancesKm,
    greatWallWalks: distanceKm / refs.greatWallKm,
    appalachianTrailWalks: distanceKm / refs.appalachianTrailKm,
    nijmegenMarches: distanceKm / refs.nijmegenMarchKm,
    raceWalks: distanceKm / refs.raceWalkKm,
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
