# 02: Core metrics end-to-end

**What to build:** A user can enter average steps per person and team size, hit Calculate, and see total steps, distance in km (0.70 m per step), marathon equivalents, and moon progress—backed by `computeStepChallenge`, input coercion, Vitest fixtures, and cited sources for those constants.

**Blocked by:** 01 Scaffold step_calc app

**Status:** ready-for-human

- [x] Inputs labelled “Average steps per person” and team size; Calculate recomputes the four core stats
- [x] Formulae match the spec: total = average × team; km via 0.70 m/step; marathon 42.195; moon 384400 km
- [x] Empty/invalid team size coerces to at least 1; non-finite/negative inputs coerce to safe ≥ 0 finites
- [x] Vitest covers the pure seam for these outputs with fixtures locking the cited constants
- [x] Sources for step length, marathon, and moon distance are documented beside the constants

```ts
// Decision-rich shape from the spec (prototype of the seam contract)
type ChallengeInput = {
  averageStepsPerPerson: number
  teamSize: number
}
```

## Comments

- Implemented `computeStepChallenge` with cited constants, coercion, Vitest fixtures, and UI for the four core stats. `npm test` / `npm run build` green.
