import { describe, expect, it } from 'vitest'
import {
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
})
