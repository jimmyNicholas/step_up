# 06: Fun facts end-to-end

**What to build:** After calculating, the user sees a random fun fact from a curated pool of ~20–25 (~80% number-driven from on-page metrics only), can request another, and never sees facts that invent off-page metrics or banned tone topics.

**Blocked by:** 03 Object comparisons end-to-end; 04 Crow-flies journey end-to-end

**Status:** resolved

- [x] Fact pool size ~20–25 with ~80% number-driven solely from on-page metrics (steps, km, marathons, moon %, comparisons, journey)
- [x] A fact appears after calculate; “Another Comparison” (or equivalent) draws another without requiring re-entry of inputs
- [x] Static minority stays light workplace tone (no weight/body-shaming, politics, alcohol, religion)
- [x] Number-driven fact values come from the challenge result seam (no divergent ad-hoc maths in the UI)

## Answer

`ChallengeResult.factValues` holds casual-walk and one-step-per-second hours derived from on-page distance/steps. `buildFunFacts` / `pickFunFact` on the challenge public surface build a ~23-fact pool (~83% number-driven, tagged kinds) from the result only. UI shows a fact after compute (including URL hydrate) and “Another Comparison” re-picks without re-entering inputs. Vitest covers pool size/ratio, metric embedding, journey-complete, and pick.
