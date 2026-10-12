import { describe, expect, it } from 'vitest'
import {
  COMPARISON_LENGTHS_M,
  MARATHON_DISTANCE_KM,
  MEAN_EARTH_MOON_DISTANCE_KM,
  METRES_PER_STEP,
} from './constants'

describe('cited challenge constants', () => {
  it('locks step length, marathon distance, and moon distance to approved values', () => {
    expect(METRES_PER_STEP).toBe(0.7)
    expect(MARATHON_DISTANCE_KM).toBe(42.195)
    expect(MEAN_EARTH_MOON_DISTANCE_KM).toBe(384_400)
  })

  it('locks each object comparison length in metres to approved values', () => {
    expect(COMPARISON_LENGTHS_M).toEqual({
      crocodile: 4.0,
      beanCan: 0.108,
      flatWhite: 0.09,
      tram: 33,
      sausage: 0.15,
      mcg: 160,
      noodlePack: 0.22,
      textbook: 0.03,
      mosquito: 0.006,
      blueWhale: 24,
    })
  })
})
