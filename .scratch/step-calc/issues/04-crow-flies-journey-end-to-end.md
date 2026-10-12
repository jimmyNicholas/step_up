# 04: Crow-flies journey end-to-end

**What to build:** After calculating, the user sees journey progress along the prototype’s city list with precomputed great-circle kilometres from Melbourne GPO, “as the crow flies” copy, and last reached / next / remaining—tested for early, mid, and past-last cases.

**Blocked by:** 02 Core metrics end-to-end

**Status:** resolved

- [x] Same city names and order as the prototype; distances are great-circle from Melbourne GPO (−37.81384, 144.963028), precomputed in data (no live maps API)
- [x] UI states distances are “as the crow flies”
- [x] Shows last reached, next destination (or journey complete), and remaining km
- [x] Vitest covers journey last/next/remaining for before-first meaningful progress, mid-list, and past-final milestone

## Comments

- Added precomputed crow-flies `JOURNEY_MILESTONES` from Melbourne GPO, seam `journey` summary (last/next/remaining), Vitest cases for early/mid/complete, and journey UI with “as the crow flies” copy. `npm test` / `npm run build` green.
