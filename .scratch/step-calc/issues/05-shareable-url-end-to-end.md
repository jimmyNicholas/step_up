# 05: Shareable URL end-to-end

**What to build:** A user can share results via `?steps=&team=`: opening the link hydrates inputs and matching results; Calculate updates the URL with `replaceState`; Copy link copies the current share URL—with parse/serialize helpers covered by Vitest.

**Blocked by:** 02 Core metrics end-to-end

**Status:** ready-for-agent

- [ ] On load, `steps` and `team` query params hydrate inputs and drive the same compute path as Calculate
- [ ] Calculate writes `steps` and `team` via `history.replaceState` (no history spam)
- [ ] Copy link control copies a URL that reproduces the current result when opened
- [ ] Vitest covers parse/serialize round-trips for the share params
