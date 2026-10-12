# 03: Object comparisons end-to-end

**What to build:** After calculating, the user sees all whimsical object comparison counts (crocodiles through blue whales) using the locked lengths and clear labels (including MCG as AFL goal-to-goal length), with the seam and Vitest covering every comparison.

**Blocked by:** 02 Core metrics end-to-end

**Status:** ready-for-agent

- [ ] UI shows all comparison cards from the spec with locked lengths (croc 4.0, bean 0.108, cup 0.09, tram 33, snag 0.15, MCG 160 AFL, noodle ~0.22, textbook 0.03, mosquito 0.006, whale 24)
- [ ] MCG is labelled as AFL ground length (goal-to-goal), not cricket long axis
- [ ] `computeStepChallenge` includes comparison counts derived from distance in metres ÷ object length
- [ ] Vitest fixtures lock each comparison divisor so silent constant edits fail tests
