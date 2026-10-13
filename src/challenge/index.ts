export {
  CASUAL_WALK_KM_H,
  COMPARISON_LENGTHS_M,
  FUN_FACT_REFERENCES,
  JOURNEY_MILESTONES,
  MARATHON_DISTANCE_KM,
  MEAN_EARTH_MOON_DISTANCE_KM,
  MELBOURNE_GPO,
  METRES_PER_STEP,
  type ComparisonId,
  type JourneyMilestone,
} from './constants'
export {
  computeStepChallenge,
  normalizeChallengeInput,
  type ChallengeInput,
  type ChallengeResult,
  type FactValues,
  type JourneySummary,
} from './computeStepChallenge'
export {
  buildFunFacts,
  pickFunFact,
  type FunFact,
  type FunFactKind,
} from './funFacts'
export {
  parseShareParams,
  serializeShareParams,
  type ShareParams,
} from './shareParams'
