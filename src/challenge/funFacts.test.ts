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

    expect(joined).toContain('100,000')
    expect(joined).toContain('70')
    expect(joined).toContain(result.marathons.toFixed(1))
    expect(joined).toContain(`${result.moonPercent.toFixed(2)}%`)
    expect(joined).toContain('14')
    expect(joined).toContain('28')
    expect(joined).toContain('Geelong')
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
