import type { ChallengeResult } from './computeStepChallenge'

export type FunFactKind = 'number-driven' | 'static'

export type FunFact = {
  kind: FunFactKind
  text: string
}

function formatInteger(value: number): string {
  return Math.round(value).toLocaleString()
}

/** Whole numbers from 100 up, one decimal from 10, otherwise two decimals. */
function formatAmount(value: number): string {
  const maximumFractionDigits = value >= 100 ? 0 : value >= 10 ? 1 : 2
  return value.toLocaleString(undefined, { maximumFractionDigits })
}

function tripPhrase(trips: number, destination: string): string {
  if (trips >= 1) {
    return `That's enough to get from Melbourne to ${destination} ${formatAmount(trips)} times`
  }
  return `You're ${formatAmount(trips * 100)}% of the way from Melbourne to ${destination}`
}

/**
 * Curated fun-fact pool (~20–25). About 80% interpolate on-page metrics /
 * {@link ChallengeResult.factValues}; the rest are light static workplace lines.
 */
export function buildFunFacts(result: ChallengeResult): readonly FunFact[] {
  const {
    distanceKm,
    marathons,
    moonPercent,
    journey,
    factValues,
  } = result

  const marathonLabel = marathons.toFixed(1)

  const numberDriven: string[] = [
    `That's ${formatAmount(factValues.tanLaps)} laps of the Tan. Most people stop after one and go for a coffee.`,
    `Each team member walked about ${formatAmount(factValues.perPersonKm)} km on average, roughly ${formatAmount(factValues.perPersonTanLaps)} laps of the Tan each.`,
    factValues.greatOceanRoads >= 1
      ? `That's the full Great Ocean Road ${formatAmount(factValues.greatOceanRoads)} times over, without the car sickness.`
      : `That's ${formatAmount(factValues.greatOceanRoads * 100)}% of the Great Ocean Road, without the car sickness.`,
    `You've walked ${formatAmount(factValues.earthPercent)}% of the way around the Earth at the equator.`,
    `Pointed straight up, your distance would stack ${formatAmount(factValues.everestsStacked)} Mount Everests on top of each other.`,
    `Stood on end, that's ${formatAmount(factValues.eurekaTowersStacked)} Eureka Towers stacked one on top of the other.`,
    `Light would cover your team's whole distance in about ${formatAmount(factValues.lightMilliseconds)} milliseconds. Show-off.`,
    `A wombat at full sprint (they can hit about 40 km/h) would need ${formatAmount(factValues.wombatSprintHours)} hours to match you.`,
    `A garden snail moving at its usual 1 mm a second would need about ${formatAmount(factValues.snailYears)} years to cover your distance.`,
    `Walking it in one go at a relaxed 5 km/h would fill about ${formatAmount(factValues.casualWalkWorkdays)} standard 7.6-hour workdays. No meetings, just walking.`,
    `Taking one step every second, day and night, one person would need about ${formatAmount(factValues.oneStepPerSecondDays)} days to match your team.`,
    `${tripPhrase(factValues.hobartTrips, 'Hobart')} (Bass Strait swim not included).`,
    `${tripPhrase(factValues.perthTrips, 'Perth')}, as the crow flies across the Nullarbor.`,
    `${tripPhrase(factValues.uluruTrips, 'Uluru')}, as the crow flies.`,
    journey.next
      ? `You still have ${formatInteger(journey.remainingKm)} km (as the crow flies) to reach ${journey.next.name}.`
      : `You've passed every crow-flies milestone on the list — journey complete past ${journey.lastReached.name}.`,
    `Last crow-flies waypoint reached: ${journey.lastReached.name} (${formatInteger(journey.lastReached.distanceKm)} km from Melbourne GPO).`,
    `Your marathon total (${marathonLabel}) and moon progress (${moonPercent.toFixed(2)}%) come from the same ${formatInteger(distanceKm)} km on the dashboard.`,
  ]

  const staticFacts: string[] = [
    "The 10,000-steps-a-day goal started as marketing: a 1965 Japanese pedometer was called the manpo-kei, meaning '10,000-step meter'.",
    'Leonardo da Vinci sketched a design for a mechanical pedometer more than 500 years ago.',
    'Each of your feet has 26 bones, so about a quarter of the bones in your body are in your feet.',
    "The word 'pedometer' comes from the Latin pes, meaning foot.",
  ]

  return [
    ...numberDriven.map((text) => ({ kind: 'number-driven' as const, text })),
    ...staticFacts.map((text) => ({ kind: 'static' as const, text })),
  ]
}

const PICK_AVOID_ATTEMPTS = 8

/** Pick a random fact text; optionally avoid repeating the current line. */
export function pickFunFact(
  result: ChallengeResult,
  avoid?: string,
  random: () => number = Math.random,
): string {
  const facts = buildFunFacts(result)
  if (facts.length === 0) {
    return ''
  }
  if (facts.length === 1) {
    return facts[0].text
  }

  let next = facts[Math.floor(random() * facts.length)].text
  if (avoid !== undefined) {
    let guard = 0
    while (next === avoid && guard < PICK_AVOID_ATTEMPTS) {
      next = facts[Math.floor(random() * facts.length)].text
      guard += 1
    }
  }
  return next
}
