Status: ready-for-agent

# AMES Step Up calculator on Vercel

## Problem Statement

AMES staff need a shareable web dashboard that turns a team’s average steps and headcount into distance, fun comparisons, and a Melbourne-centred journey narrative for the Step Up challenge. Today that experience exists only as a single local HTML file (`step_calc_v12.html`): it has no durable shareable URL, limited tracking, thin fun-fact coverage, uncited maths constants, and is not deployed as a maintainable TypeScript app on Vercel with automated tests.

## Solution

Ship a Vite + React + TypeScript app named **step_calc**, deployed to the user’s personal Vercel account on a default `*.vercel.app` URL, that:

- Calculates challenge metrics from average steps per person and team size
- Syncs those inputs into a shareable query string and hydrates from it
- Shows comparisons, great-circle journey progress from Melbourne GPO, and a curated set of mostly number-driven fun facts
- Tracks pageviews (Vercel Web Analytics) plus a few custom events
- Locks source-backed constants behind Vitest fixtures so the maths stays solid

## User Stories

1. As a challenge participant, I want to open the AMES Step Up page in a browser, so that I can explore our team’s progress without installing anything.
2. As a challenge participant, I want the page title and header to say “AMES Step Up” (not October-specific), so that the asset stays usable beyond one month.
3. As a challenge participant, I want to enter average steps per person, so that the calculator matches how we already talk about step totals.
4. As a challenge participant, I want a clear label “Average steps per person” (not “Total Average Steps”), so that I am not confused about whether the field is a team total.
5. As a challenge participant, I want to enter team size, so that the dashboard scales to my whole team.
6. As a challenge participant, I want a Calculate action, so that I can refresh all derived metrics after changing inputs.
7. As a challenge participant, I want total steps shown as average × team size, so that I can see the combined effort.
8. As a challenge participant, I want distance in kilometres using 0.70 m per step, so that distance matches an average adult step length.
9. As a challenge participant, I want marathon equivalents using 42.195 km, so that I can relate distance to a familiar race.
10. As a challenge participant, I want “moon progress” as a percentage of 384400 km, so that I get a playful long-distance framing.
11. As a challenge participant, I want whimsical object comparisons (crocodiles, bean cans, flat whites, trams, sausages, MCG AFL lengths, noodle packs, textbooks, mosquitoes, blue whales), so that the numbers feel memorable.
12. As a challenge participant, I want MCG comparisons labelled as AFL ground length (160 m goal-to-goal), so that I know what “MCG length” means.
13. As a challenge participant, I want a journey section from Melbourne outward through the existing city list, so that I can see “how far from Melbourne” we have travelled in narrative terms.
14. As a challenge participant, I want journey distances to be great-circle from Melbourne GPO, so that the kilometres are reproducible and citable.
15. As a challenge participant, I want the journey UI to say distances are “as the crow flies”, so that I do not mistake them for driving distances.
16. As a challenge participant, I want to see last reached destination, next destination, and kilometres remaining, so that progress is scannable.
17. As a challenge participant, I want a random fun fact after calculating, so that the page feels lively.
18. As a challenge participant, I want an “Another Comparison” (or equivalent) control to draw another fact, so that I can browse more facts without recalculating.
19. As a challenge participant, I want roughly 20–25 fun facts with about 80% number-driven from on-page metrics only, so that facts stay accurate and non-repetitive padding is avoided.
20. As a challenge participant, I want invalid or empty team size to behave as at least 1, so that the page does not break on blank input.
21. As a challenge participant, I want negative or non-finite inputs coerced to safe non-negative finite values, so that absurd inputs do not corrupt the dashboard.
22. As a sharer, I want Calculate to update the URL with `steps` and `team` via `replaceState`, so that I can copy the address bar or use Copy link without cluttering browser history.
23. As a sharer, I want a Copy link control, so that I can paste the current result into chat or email.
24. As a recipient of a shared link, I want opening `?steps=&team=` to hydrate the inputs and show matching results, so that I see the same dashboard as the sender.
25. As a product owner, I want Vercel Web Analytics pageviews, so that we know the tool is being used.
26. As a product owner, I want custom events `calculate`, `generate_fact`, and `share_link`, so that we can see engagement beyond pageviews.
27. As a product owner, I want Analytics enabled by me in the Vercel dashboard after deploy, so that tracking is intentional and account-scoped.
28. As a maintainer, I want the app built with Vite, React, and TypeScript, so that the codebase is maintainable and typed.
29. As a maintainer, I want CSS and challenge data extracted from the original monolith HTML, so that presentation and constants are editable separately.
30. As a maintainer, I want npm as the package manager, so that install/run scripts stay conventional.
31. As a maintainer, I want the repo/project named `step_calc`, so that naming matches deploy and GitHub expectations.
32. As a maintainer, I want deployment on my personal Vercel account with a default `*.vercel.app` URL first, so that we can ship without custom domain work.
33. As a maintainer, I want the Git remote on my personal GitHub, so that Vercel can deploy from Git later.
34. As a maintainer, I want cited constants documented (sources file or equivalent), so that maths claims are auditable.
35. As a maintainer, I want comparison constants locked to the approved proposed values (crocodile 4.0 m, bean can 0.108 m, cup 0.09 m, tram 33 m, sausage 0.15 m BBQ snag, MCG 160 m, noodle pack ~0.22 m, textbook 0.03 m, mosquito 0.006 m, blue whale 24 m, casual walk 5 km/h for facts), so that UI and tests agree.
36. As a maintainer, I want Melbourne GPO coordinates fixed at approximately −37.81384, 144.963028 as the journey origin, so that great-circle distances share one origin.
37. As a maintainer, I want Vitest coverage of the pure calculation and URL helpers with fixtures for expected values, so that regressions in maths are caught before deploy.
38. As a maintainer, I want the original HTML prototype’s visual structure and AMES brand colours preserved in spirit, so that stakeholders recognise the tool.
39. As a challenge organiser, I want static fun facts (the minority ~20%) to stay light and workplace-appropriate, so that tone fits AMES.
40. As a challenge organiser, I want number-driven facts to reuse only metrics already on the page (steps, km, marathons, moon %, comparison counts, journey remaining/next), so that facts cannot drift from displayed maths.
41. As a user on a phone, I want the layout to remain usable on narrow viewports, so that people can open shared links on mobile.
42. As a user, I want formatted integers with locale grouping where appropriate, so that large step counts are readable.
43. As a user, I want marathons to one decimal and moon progress to two decimals, so that precision matches the prototype’s readability choices.
44. As a developer implementing from this spec, I want a single high-level pure seam for calculations, so that UI stays thin and tests stay stable.
45. As a developer, I want great-circle city distances precomputed into data fixtures (not live geodesy APIs at runtime), so that results are offline-stable and testable.
46. As a developer, I want share-link analytics to fire when the user successfully copies (or invokes Copy link), so that `share_link` reflects intent to share.
47. As a developer, I want `generate_fact` to fire when the user requests another fact, so that fact engagement is measurable.
48. As a developer, I want `calculate` to fire when Calculate runs (including hydration-driven initial compute from URL if that path uses the same compute entry), so that usage of the core action is visible—without double-counting purely cosmetic re-renders.
49. As an accessibility-conscious user, I want inputs and buttons to remain keyboard-operable with visible labels, so that the tool is usable without a mouse.
50. As a stakeholder reviewing maths, I want journey milestones to keep the same city names/order as the prototype while replacing kilometre values with great-circle figures, so that the narrative arc is familiar but distances are honest.

## Implementation Decisions

- Greenfield app in this repo, renamed/identified as **step_calc**: Vite + React + TypeScript, npm.
- Port behaviour and brand look from the AMES Step Up HTML prototype; extract styles and data out of a single HTML file into the React app’s style and data modules.
- **Primary domain seam (one seam):** `computeStepChallenge({ averageStepsPerPerson, teamSize }) → ChallengeResult`, where `ChallengeResult` includes total steps, distance km, marathons, moon percent, all comparison counts, journey summary (last reached, next, remaining km), and values needed to render number-driven facts. React components only display `ChallengeResult` and collect inputs.
- Adjacent pure helpers on the same public surface: `parseShareParams` / `serializeShareParams` for query keys `steps` and `team`.
- Core formulae: `totalSteps = averageStepsPerPerson × teamSize`; `distanceKm = totalSteps × 0.70 / 1000`; `marathons = distanceKm / 42.195`; `moonPercent = (distanceKm / 384400) × 100`; comparisons = distance in metres ÷ object length.
- Input UX: label “Average steps per person”; coerce to finite numbers ≥ 0; invalid/empty team size → minimum 1; Calculate triggers recompute + URL sync.
- URL UX: on Calculate, `history.replaceState` with `steps` and `team`; on load, hydrate from those params then compute; provide Copy link.
- Journey: retain the prototype’s destination list and order; replace distances with great-circle km from Melbourne GPO (−37.81384, 144.963028); UI copy states “as the crow flies”. Precompute and store milestone distances in data (no runtime maps API).
- Fun facts: ~20–25 total; ~80% number-driven from on-page metrics only; avoid near-duplicate padding; static minority stays light workplace tone (no weight/body-shaming, politics, alcohol, religion gags).
- Analytics: keep Vercel Web Analytics snippet pattern appropriate for the Vite SPA; custom events `calculate`, `generate_fact`, `share_link` only. User enables Analytics in the personal Vercel project dashboard after first deploy.
- Document cited constants in a sources note alongside the locked numeric constants module.
- Locked comparison lengths: crocodile 4.0 m; bean can 0.108 m; flat white cup 0.09 m; Melbourne tram 33 m; sausage 0.15 m (BBQ snag); MCG 160 m AFL goal-to-goal (labelled as such); noodle pack ~0.22 m; textbook 0.03 m; mosquito 0.006 m; blue whale 24 m; fact walking speed 5 km/h.
- Deploy target: personal Vercel account, default `*.vercel.app`; GitHub personal remote when auth/remote are available. Custom domains out of initial delivery.
- No Next.js, no Playwright in the initial delivery, no third-party analytics beyond Vercel.

Shape sketch for the primary seam (decision-rich, not a demo):

```ts
type ChallengeInput = {
  averageStepsPerPerson: number
  teamSize: number
}

type ChallengeResult = {
  totalSteps: number
  distanceKm: number
  marathons: number
  moonPercent: number
  comparisons: Record<ComparisonId, number>
  journey: {
    lastReached: { name: string; distanceKm: number }
    next: { name: string; distanceKm: number } | null
    remainingKm: number
  }
  factValues: {
    /* numeric ingredients derived only from the fields above */
  }
}
```

## Testing Decisions

- Good tests assert **external behaviour of the pure seam**: given inputs (and fixtures for constants/milestones), expect specific outputs. Do not test React rendering, CSS, or Vercel network calls.
- **Single seam under test:** `computeStepChallenge` (and the share-param parse/serialize helpers treated as part of that module’s public API).
- Cover: distance/step maths with 0.70 m; marathon and moon; each comparison divisor; journey last/next/remaining across before-first, mid-list, and past-last cases; input coercion (empty team → 1, negatives/non-finite); URL round-trip for `steps`/`team`; fixtures that lock cited constant values so silent edits fail tests.
- Prior art: none in this empty repo — establish Vitest + the seam above as the pattern.
- Browser E2E is out of scope for this spec.

## Out of Scope

- Next.js / SSR frameworks
- Custom domains and AMES organisational Vercel team deploy
- Google Analytics / other third-party trackers
- Playwright or other browser E2E
- Calories, CO₂, heart-rate, or other health metrics not in the prototype
- Live geocoding or routing APIs for journey distances
- Changing the journey city list (names/order stay; only km values change)
- Height-based step-length formulas
- Offline PWA, auth, multi-team leaderboards, or backend storage of results
- Enabling Vercel Analytics in the dashboard (human step after deploy)
- `gh auth` / creating the GitHub remote if credentials are missing (human/prerequisite)

## Further Notes

- Prototype source of truth for UX structure: `/Users/jimmy/Downloads/step_calc_v12.html` (or a copy imported into the repo).
- Grilling locked personal Vercel + personal GitHub + npm; local `gh` was not authenticated at spec time — deploy/Git push may need a human auth step.
- Test seam proposed during `/to-spec`: one high seam `computeStepChallenge`; confirm with implementer if a different single seam is preferred before splitting work into tickets.
- Local issue tracker: this spec lives at `.scratch/step-calc/spec.md` with `Status: ready-for-agent`.
