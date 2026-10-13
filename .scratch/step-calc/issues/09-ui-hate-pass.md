# 09: UI hate pass

**What to build:** Fix the React port UX regressions and share affordances locked in the “what I hate about it” grill: input row layout, prototype emojis, delete crow-flies journey note, Share + toast + Calculate-gated enablement, and remove three bad fun-fact lines.

**Blocked by:** 05 Shareable URL end-to-end; 06 Fun facts end-to-end

**Status:** ready-for-human

- [x] Average steps + team size sit **side-by-side** on desktop; **stack** vertically below the existing narrow breakpoint
- [x] Primary share control label is **Share** (not “Copy link”)
- [x] Share copies the current share URL to the clipboard and shows a non-blocking **toast** near the button (~2s, auto-dismiss) saying **Link copied**
- [x] Share is **enabled only** when current inputs equal the last Calculate/`shareInputs`; otherwise disabled with **no** hint text
- [x] URL still updates with `?steps=&team=` via `replaceState` **on Calculate only** (unchanged contract)
- [x] Restore prototype emojis exactly: header `🚶`, stats `👣` `📏` `🏃` `🌙`, journey `✅` `🎯` `📍`, fun-fact heading `🎲`
- [x] Delete the journey note paragraph (“Distances are as the crow flies from Melbourne GPO.”) entirely
- [x] Remove fun-fact pool lines that are crow-flies/GPO journey copy and the dashboard-meta marathon/moon line (grill inventory **#17, #18, #19** in `buildFunFacts`)
- [x] Tests updated for any fun-fact pool size/content assertions broken by the three deletions

## Comments

- Grilling locked 2026-10-13: subject = React port; full remaining fun-fact vet deferred to issue 10.
- Implemented 2026-10-13: input row layout, Share + toast (token reset on re-click) + Calculate/`shareInputs` gating, prototype emojis, journey note removed, fun-fact #17–#19 deleted with Vitest updates. `npm test` / `npm run build` green.
