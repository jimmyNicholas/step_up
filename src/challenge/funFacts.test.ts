import { describe, expect, it } from 'vitest'
import { computeStepChallenge } from './computeStepChallenge'
import { buildFunFacts, pickFunFact } from './funFacts'

describe('buildFunFacts', () => {
  it('returns a pool of number-driven and general facts', () => {
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })
    const facts = buildFunFacts(result)

    expect(facts.filter((fact) => fact.kind === 'number-driven')).toHaveLength(
      11,
    )
    expect(facts.filter((fact) => fact.kind === 'static')).toHaveLength(12)
  })

  it('embeds values from the result into number-driven facts', () => {
    // 10,000 × 10 → 100,000 steps → 70 km
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })
    const joined = buildFunFacts(result)
      .map((fact) => fact.text)
      .join('\n')

    expect(joined).toContain('18.3 laps of the Tan')
    expect(joined).toContain('7.91 Mount Everests')
    expect(joined).toContain('235 Eureka Towers')
    expect(joined).toContain('28.8% of the Great Ocean Road')
    expect(joined).toContain('1.84 standard 7.6-hour workdays')
    expect(joined).toContain('1.16 days to match your team')
    expect(joined).toContain('11.7% of the way from Melbourne to Hobart')
  })

  it('switches to whole trips once a destination is passed', () => {
    // 1,500,000 steps → 1,050 km, beyond Hobart (598 km) and the Great Ocean Road (243 km)
    const result = computeStepChallenge({
      averageStepsPerPerson: 1_500_000,
      teamSize: 1,
    })
    const joined = buildFunFacts(result)
      .map((fact) => fact.text)
      .join('\n')

    expect(joined).toContain('from Melbourne to Hobart 1.76 times')
    expect(joined).toContain('Great Ocean Road 4.32 times over')
  })
})

describe('pickFunFact', () => {
  it('returns a fact from the built pool', () => {
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })
    const texts = buildFunFacts(result).map((fact) => fact.text)

    expect(texts).toContain(pickFunFact(result, undefined, () => 0))
  })
})
