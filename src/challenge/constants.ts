/**
 * Average adult step length used for challenge distance.
 * Source: commonly cited mean adult step ≈ 0.70–0.76 m; locked to 0.70 m
 * per AMES Step Up product decision (see spec).
 */
export const METRES_PER_STEP = 0.7

/**
 * Official marathon race distance.
 * Source: World Athletics Competition & Technical Rules — marathon = 42.195 km.
 * https://worldathletics.org/
 */
export const MARATHON_DISTANCE_KM = 42.195

/**
 * Mean Earth–Moon centre-to-centre distance.
 * Source: NASA Solar System Exploration — Moon fact sheet (≈ 384,400 km).
 * https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
 */
export const MEAN_EARTH_MOON_DISTANCE_KM = 384_400

/**
 * Casual walking speed used for number-driven fun facts.
 * Source: commonly cited comfortable walk ≈ 5 km/h; locked per AMES Step Up product decision.
 */
export const CASUAL_WALK_KM_H = 5

/**
 * Object comparison lengths in metres (locked product values for AMES Step Up).
 * Counts = distance in metres ÷ length. Sources are approximate typical sizes;
 * MCG is AFL goal-to-goal playing length (not cricket long axis).
 */
export const COMPARISON_LENGTHS_M = {
  /** Saltwater crocodile typical adult length ≈ 4.0 m. */
  crocodile: 4.0,
  /** Standard baked-bean can height ≈ 0.108 m. */
  beanCan: 0.108,
  /** Flat-white takeaway cup height ≈ 0.09 m. */
  flatWhite: 0.09,
  /** Melbourne tram vehicle length ≈ 33 m (E-class order of magnitude). */
  tram: 33,
  /** BBQ snag / sausage length ≈ 0.15 m. */
  sausage: 0.15,
  /** MCG AFL ground length, goal-to-goal ≈ 160 m. */
  mcg: 160,
  /** Instant noodle packet long edge ≈ 0.22 m. */
  noodlePack: 0.22,
  /** Typical textbook thickness ≈ 0.03 m. */
  textbook: 0.03,
  /** Mosquito body length ≈ 0.006 m. */
  mosquito: 0.006,
  /** Blue whale typical adult length ≈ 24 m. */
  blueWhale: 24,
} as const

export type ComparisonId = keyof typeof COMPARISON_LENGTHS_M

/**
 * Melbourne General Post Office origin for the journey narrative.
 * Source: commonly cited Melbourne GPO coordinates ≈ −37.81384, 144.963028
 * (AMES Step Up product decision / spec).
 */
export const MELBOURNE_GPO = {
  latitude: -37.81384,
  longitude: 144.963028,
} as const

export type JourneyMilestone = {
  name: string
  distanceKm: number
}

/**
 * Journey destinations in the prototype’s narrative order.
 * `distanceKm` values are great-circle kilometres from {@link MELBOURNE_GPO}
 * (mean Earth radius 6371 km), rounded to the nearest kilometre — precomputed
 * offline so the app never calls a maps API at runtime.
 *
 * Note: a few later Pacific cities are closer to Melbourne than Port Moresby;
 * order is kept for the narrative arc, not sorted by distance.
 */
export const JOURNEY_MILESTONES: readonly JourneyMilestone[] = [
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
]
