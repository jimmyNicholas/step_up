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

  it('exposes factValues derived only from on-page metrics', () => {
    // 70 km ÷ 5 km/h → 14 hours; 100_000 steps ÷ 3600 ≈ 28 hours at 1 step/s
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })

    expect(result.factValues).toEqual({
      casualWalkHours: 14,
      oneStepPerSecondHours: 28,
    })
  })

  it('computes each object comparison as distance metres ÷ locked length', () => {
    // 10_000 × 10 → 70 km → 70_000 m
    const metres = 70_000
    const result = computeStepChallenge({
      averageStepsPerPerson: 10_000,
      teamSize: 10,
    })

    expect(result.comparisons).toEqual({
      crocodile: metres / 4.0,
      beanCan: metres / 0.108,
      flatWhite: metres / 0.09,
      tram: metres / 33,
      sausage: metres / 0.15,
      mcg: metres / 160,
      noodlePack: metres / 0.22,
      textbook: metres / 0.03,
      mosquito: metres / 0.006,
      blueWhale: metres / 24,
    })
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
      comparisons: {
        crocodile: 0,
        beanCan: 0,
        flatWhite: 0,
        tram: 0,
        sausage: 0,
        mcg: 0,
        noodlePack: 0,
        textbook: 0,
        mosquito: 0,
        blueWhale: 0,
      },
      journey: {
        lastReached: { name: 'Melbourne CBD', distanceKm: 0 },
        next: { name: 'Geelong', distanceKm: 65 },
        remainingKm: 65,
      },
      factValues: {
        casualWalkHours: 0,
        oneStepPerSecondHours: 0,
      },
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

  it('reports Melbourne CBD with next Geelong before meaningful progress', () => {
    // 50 km is still short of Geelong (65 km crow-flies)
    const result = computeStepChallenge({
      averageStepsPerPerson: (50 * 1000) / 0.7,
      teamSize: 1,
    })

    expect(result.distanceKm).toBeCloseTo(50, 10)
    expect(result.journey).toEqual({
      lastReached: { name: 'Melbourne CBD', distanceKm: 0 },
      next: { name: 'Geelong', distanceKm: 65 },
      remainingKm: 15,
    })
  })

  it('reports mid-list last reached, next, and remaining km', () => {
    // 500 km lies between Canberra (467) and Sydney (713)
    // distanceKm = steps × 0.70 / 1000 → steps = 500 × 1000 / 0.70
    const result = computeStepChallenge({
      averageStepsPerPerson: (500 * 1000) / 0.7,
      teamSize: 1,
    })

    expect(result.distanceKm).toBeCloseTo(500, 10)
    expect(result.journey).toEqual({
      lastReached: { name: 'Canberra', distanceKm: 467 },
      next: { name: 'Sydney', distanceKm: 713 },
      remainingKm: 213,
    })
  })

  it('reports journey complete past the final milestone', () => {
    // London is 16_904 km; 17_000 km is past the end of the list
    const result = computeStepChallenge({
      averageStepsPerPerson: (17_000 * 1000) / 0.7,
      teamSize: 1,
    })

    expect(result.journey).toEqual({
      lastReached: { name: 'London', distanceKm: 16_904 },
      next: null,
      remainingKm: 0,
    })
  })
})
