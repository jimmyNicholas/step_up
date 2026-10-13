import type { ChallengeResult } from './computeStepChallenge'

export type FunFactKind = 'number-driven' | 'static'

export type FunFact = {
  kind: FunFactKind
  text: string
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

/** "X times over" once the team has covered the whole thing, otherwise "X% of it". */
function coverage(ratio: number): string {
  if (ratio >= 1) {
    return `Your team has covered it ${formatAmount(ratio)} times over.`
  }
  return `Your team has covered ${formatAmount(ratio * 100)}% of it.`
}

/**
 * Curated fun-fact pool. Number-driven facts interpolate
 * {@link ChallengeResult.factValues}; the rest are light general facts about
 * walking from Australia and around the world.
 */
export function buildFunFacts(result: ChallengeResult): readonly FunFact[] {
  const { factValues } = result

  const numberDriven: string[] = [
    `That's ${formatAmount(factValues.tanLaps)} laps of the Tan. Most people stop after one and go for a coffee.`,
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
    `Spain's Camino Francés pilgrim route runs about 780 km from the French Pyrenees to Santiago de Compostela. ${coverage(factValues.caminoFrancesWalks)}`,
    `A 2012 survey by China's heritage authority measured the Great Wall, with all its branches, at about 21,196 km. ${coverage(factValues.greatWallWalks)}`,
    `The Appalachian Trail in the United States runs about 3,500 km from Georgia to Maine. ${coverage(factValues.appalachianTrailWalks)}`,
    `At the Nijmegen Four Days Marches in the Netherlands, the longest route is 50 km a day for four days, 200 km in all. ${coverage(factValues.nijmegenMarches)}`,
    factValues.raceWalks >= 1
      ? `Race walking is an Olympic sport where judges watch that one foot always looks to be on the ground. Your distance is ${formatAmount(factValues.raceWalks)} Olympic 20 km race walks.`
      : `Race walking is an Olympic sport where judges watch that one foot always looks to be on the ground. Your distance is ${formatAmount(factValues.raceWalks * 100)}% of an Olympic 20 km race walk.`,
  ]

  const staticFacts: string[] = [
    "The 10,000-steps-a-day goal started as marketing: a 1965 Japanese pedometer was called the manpo-kei, meaning '10,000-step meter'.",
    'Leonardo da Vinci sketched a design for a mechanical pedometer more than 500 years ago.',
    'Each of your feet has 26 bones, so about a quarter of the bones in your body are in your feet.',
    "The word 'pedometer' comes from the Latin pes, meaning foot.",
    'Ötzi the Iceman, who lived about 5,300 years ago in the Alps, was found wearing shoes made of bearskin, deer hide and grass.',
    "Japan's Forestry Agency coined the term shinrin-yoku, or 'forest bathing', in 1982 to encourage walks among trees.",
    "Venice's historic centre has no cars, so locals get around on foot or by boat.",
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
