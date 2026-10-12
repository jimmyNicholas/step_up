# 03: Object comparisons end-to-end

**What to build:** After calculating, the user sees all whimsical object comparison counts (crocodiles through blue whales) using the locked lengths and clear labels (including MCG as AFL goal-to-goal length), with the seam and Vitest covering every comparison.

**Blocked by:** 02 Core metrics end-to-end

**Status:** ready-for-human

- [x] UI shows all comparison cards from the spec with locked lengths (croc 4.0, bean 0.108, cup 0.09, tram 33, snag 0.15, MCG 160 AFL, noodle ~0.22, textbook 0.03, mosquito 0.006, whale 24)
- [x] MCG is labelled as AFL ground length (goal-to-goal), not cricket long axis
- [x] `computeStepChallenge` includes comparison counts derived from distance in metres ÷ object length
- [x] Vitest fixtures lock each comparison divisor so silent constant edits fail tests

## Comments

- Implemented locked `COMPARISON_LENGTHS_M`, seam `comparisons` counts, Vitest locks, and “Other Comparisons” UI with MCG AFL ground-length label. `npm test` / `npm run build` green.
