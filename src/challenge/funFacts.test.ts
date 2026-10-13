import { describe, expect, it } from 'vitest'
import { computeStepChallenge } from './computeStepChallenge'
import { buildFunFacts, pickFunFact } from './funFacts'

describe('buildFunFacts', () => {
  it('returns about 20–25 facts with ~80% number-driven from the result', () => {
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })
    const facts = buildFunFacts(result)

    expect(facts.length).toBeGreaterThanOrEqual(20)
    expect(facts.length).toBeLessThanOrEqual(25)

    const numberDriven = facts.filter((fact) => fact.kind === 'number-driven')
    expect(numberDriven.length / facts.length).toBeGreaterThanOrEqual(0.8)
  })

  it('embeds formatted on-page metrics into number-driven facts', () => {
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })
    const joined = buildFunFacts(result)
      .map((fact) => fact.text)
      .join('\n')

    // 70 km, 7 km each across a team of 10
    expect(joined).toContain('18.3 laps of the Tan')
    expect(joined).toContain('about 7 km on average')
    expect(joined).toContain('7.91 Mount Everests')
    expect(joined).toContain('235 Eureka Towers')
    expect(joined).toContain('28.8% of the Great Ocean Road')
    expect(joined).toContain('1.84 standard 7.6-hour workdays')
    expect(joined).toContain('1.16 days to match your team')
    expect(joined).toContain('11.7% of the way from Melbourne to Hobart')
    expect(joined).toContain(`${result.moonPercent.toFixed(2)}%`)
    expect(joined).toContain('Geelong')
  })

  it('switches destination facts from a percentage to whole trips past 100%', () => {
    // 1,500,000 steps → 1,050 km, beyond Hobart (598 km) but short of Perth
    const result = computeStepChallenge({
      averageStepsPerPerson: 1_500_000,
      teamSize: 1,
    })
    const joined = buildFunFacts(result)
      .map((fact) => fact.text)
      .join('\n')

    expect(joined).toContain('from Melbourne to Hobart 1.76 times')
    expect(joined).toContain('Great Ocean Road 4.32 times over')
    expect(joined).toContain('38.6% of the way from Melbourne to Perth')
  })

  it('still builds a pool when the journey is complete', () => {
    const result = computeStepChallenge({
      averageStepsPerPerson: (17_000 * 1000) / 0.7,
      teamSize: 1,
    })
    const facts = buildFunFacts(result)

    expect(facts.length).toBeGreaterThanOrEqual(20)
    expect(facts.map((fact) => fact.text).join('\n')).toContain('London')
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
