import type { ChallengeResult } from './computeStepChallenge'

export type FunFactKind = 'number-driven' | 'static'

export type FunFact = {
  kind: FunFactKind
  text: string
}

function formatInteger(value: number): string {
  return Math.round(value).toLocaleString()
}

/**
 * Curated fun-fact pool (~20–25). About 80% interpolate on-page metrics /
 * {@link ChallengeResult.factValues}; the rest are light static workplace lines.
 */
export function buildFunFacts(result: ChallengeResult): readonly FunFact[] {
  const {
    totalSteps,
    distanceKm,
    marathons,
    moonPercent,
    comparisons,
    journey,
    factValues,
  } = result

  const marathonLabel = marathons.toFixed(1)
  const marathonNoun = marathonLabel === '1.0' ? 'marathon' : 'marathons'

  const numberDriven: string[] = [
    `If your team kept walking at a casual pace, it would take approximately ${formatInteger(factValues.casualWalkHours)} hours to travel this distance.`,
    `Imagine taking one step every second. Completing this many steps would take over ${formatInteger(factValues.oneStepPerSecondHours)} hours.`,
    `Your team has taken ${formatInteger(totalSteps)} steps together.`,
    `That's about ${formatInteger(distanceKm)} kilometres of combined effort.`,
    `Your distance adds up to ${marathonLabel} ${marathonNoun}.`,
    `You're ${moonPercent.toFixed(2)}% of the way to the Moon.`,
    `Lined up nose to tail, that's ${formatInteger(comparisons.crocodile)} crocodiles.`,
    `Stacked end to end, that's ${formatInteger(comparisons.beanCan)} baked-bean cans.`,
    `That's ${formatInteger(comparisons.flatWhite)} flat-white cups tall.`,
    `Your distance equals ${formatInteger(comparisons.tram)} Melbourne trams parked bumper to bumper.`,
    `That's ${formatInteger(comparisons.sausage)} BBQ snags in a row.`,
    `You've covered ${formatInteger(comparisons.mcg)} MCG AFL ground lengths (goal to goal).`,
    `That's ${formatInteger(comparisons.noodlePack)} instant noodle packets end to end.`,
    `Stacked as textbooks, that's ${formatInteger(comparisons.textbook)} volumes.`,
    `Mosquito-sized: ${formatInteger(comparisons.mosquito)} of them in a line.`,
    `Blue-whale lengths: ${formatInteger(comparisons.blueWhale)}.`,
    journey.next
      ? `You still have ${formatInteger(journey.remainingKm)} km (as the crow flies) to reach ${journey.next.name}.`
      : `You've passed every crow-flies milestone on the list — journey complete past ${journey.lastReached.name}.`,
    `Last crow-flies waypoint reached: ${journey.lastReached.name} (${formatInteger(journey.lastReached.distanceKm)} km from Melbourne GPO).`,
    `Your marathon total (${marathonLabel}) and moon progress (${moonPercent.toFixed(2)}%) come from the same ${formatInteger(distanceKm)} km on the dashboard.`,
  ]

  const staticFacts: string[] = [
    'Walking is one of the simplest ways to improve both physical health and mental wellbeing.',
    "That's a lot of footsteps. Luckily nobody had to count them manually.",
    "That's enough steps to make 'just a quick walk' sound slightly misleading.",
    "One thing is certain: the lifts didn't do all the work this month.",
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
