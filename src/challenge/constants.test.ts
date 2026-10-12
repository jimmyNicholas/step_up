import { describe, expect, it } from 'vitest'
import {
  COMPARISON_LENGTHS_M,
  JOURNEY_MILESTONES,
  MARATHON_DISTANCE_KM,
  MEAN_EARTH_MOON_DISTANCE_KM,
  MELBOURNE_GPO,
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

  it('locks Melbourne GPO origin coordinates', () => {
    expect(MELBOURNE_GPO).toEqual({
      latitude: -37.81384,
      longitude: 144.963028,
    })
  })

  it('locks journey milestones in prototype order with crow-flies km from GPO', () => {
    expect(JOURNEY_MILESTONES).toEqual([
      { name: 'Melbourne CBD', distanceKm: 0 },
      { name: 'Geelong', distanceKm: 65 },
      { name: 'Ballarat', distanceKm: 102 },
      { name: 'Bendigo', distanceKm: 132 },
      { name: 'Shepparton', distanceKm: 164 },
      { name: 'Albury-Wodonga', distanceKm: 259 },
      { name: 'Canberra', distanceKm: 467 },
      { name: 'Sydney', distanceKm: 713 },
      { name: 'Newcastle', distanceKm: 823 },
      { name: 'Port Macquarie', distanceKm: 1015 },
      { name: 'Coffs Harbour', distanceKm: 1123 },
      { name: 'Brisbane', distanceKm: 1374 },
      { name: 'Rockhampton', distanceKm: 1690 },
      { name: 'Mackay', distanceKm: 1898 },
      { name: 'Townsville', distanceKm: 2071 },
      { name: 'Cairns', distanceKm: 2325 },
      { name: 'Port Moresby', distanceKm: 3162 },
      { name: 'Nouméa', distanceKm: 2683 },
      { name: 'Auckland', distanceKm: 2626 },
      { name: 'Jakarta', distanceKm: 5207 },
      { name: 'Wellington', distanceKm: 2572 },
      { name: 'Singapore', distanceKm: 6063 },
      { name: 'Manila', distanceKm: 6343 },
      { name: 'Kuala Lumpur', distanceKm: 6368 },
      { name: 'Bangkok', distanceKm: 7373 },
      { name: 'Hong Kong', distanceKm: 7421 },
      { name: 'Tokyo', distanceKm: 8190 },
      { name: 'Seoul', distanceKm: 8583 },
      { name: 'Honolulu', distanceKm: 8879 },
      { name: 'Los Angeles', distanceKm: 12_774 },
      { name: 'New York', distanceKm: 16_672 },
      { name: 'London', distanceKm: 16_904 },
    ])
  })
})
