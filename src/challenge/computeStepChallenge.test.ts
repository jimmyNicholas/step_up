import { describe, expect, it } from 'vitest'
import { computeStepChallenge } from './computeStepChallenge'

describe('computeStepChallenge', () => {
  it('computes total steps, distance km, marathons, and moon progress', () => {
    // 10_000 avg × 10 team = 100_000 steps
    // 100_000 × 0.70 m = 70_000 m = 70 km
    // 70 / 42.195 ≈ marathons; (70 / 384400) × 100 ≈ moon %
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })

    expect(result.totalSteps).toBe(100_000)
    expect(result.distanceKm).toBe(70)
    expect(result.marathons).toBeCloseTo(70 / 42.195, 10)
    expect(result.moonPercent).toBeCloseTo((70 / 384_400) * 100, 10)
  })

  it('coerces empty or invalid team size to at least 1', () => {
    expect(
      computeStepChallenge({ averageStepsPerPerson: 100, teamSize: 0 })
        .totalSteps,
    ).toBe(100)
    expect(
      computeStepChallenge({ averageStepsPerPerson: 100, teamSize: Number.NaN })
        .totalSteps,
    ).toBe(100)
    expect(
      computeStepChallenge({
        averageStepsPerPerson: 100,
        teamSize: Number.POSITIVE_INFINITY,
      }).totalSteps,
    ).toBe(100)
  })

  it('coerces non-finite and negative inputs to safe non-negative finites', () => {
    expect(
      computeStepChallenge({
        averageStepsPerPerson: -50,
        teamSize: -3,
      }),
    ).toEqual({
      totalSteps: 0,
      distanceKm: 0,
      marathons: 0,
      moonPercent: 0,
    })

    expect(
      computeStepChallenge({
        averageStepsPerPerson: Number.NaN,
        teamSize: 5,
      }).totalSteps,
    ).toBe(0)

    expect(
      computeStepChallenge({
        averageStepsPerPerson: Number.POSITIVE_INFINITY,
        teamSize: 5,
      }).totalSteps,
    ).toBe(0)
  })
})
