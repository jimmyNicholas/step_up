# 04: Crow-flies journey end-to-end

**What to build:** After calculating, the user sees journey progress along the prototype’s city list with precomputed great-circle kilometres from Melbourne GPO, “as the crow flies” copy, and last reached / next / remaining—tested for early, mid, and past-last cases.

**Blocked by:** 02 Core metrics end-to-end

**Status:** ready-for-agent

- [ ] Same city names and order as the prototype; distances are great-circle from Melbourne GPO (−37.81384, 144.963028), precomputed in data (no live maps API)
- [ ] UI states distances are “as the crow flies”
- [ ] Shows last reached, next destination (or journey complete), and remaining km
- [ ] Vitest covers journey last/next/remaining for before-first meaningful progress, mid-list, and past-final milestone
