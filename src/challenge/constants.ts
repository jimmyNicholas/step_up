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
