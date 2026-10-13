# 08: Ship to personal GitHub + Vercel

**What to build:** The step_calc app is on the user’s personal GitHub and deployed to their personal Vercel account on a default `*.vercel.app` URL so others can open the tool in a browser. Enabling Analytics in the Vercel dashboard remains a human follow-up after deploy.

**Blocked by:** 07 Vercel Analytics events

**Status:** resolved

- [x] Repository is available on the user’s personal GitHub as step_calc (or equivalent agreed remote name)
- [x] Personal Vercel project deploys the app to a default `*.vercel.app` URL
- [x] Production URL loads the AMES Step Up calculator
- [x] Custom domains and AMES org/team Vercel accounts are not required for this ticket
- [x] Note left for the human owner to enable Web Analytics in the Vercel dashboard after deploy

## Comments

- GitHub: `origin` is `https://github.com/jimmyNicholas/step_up.git` (agreed equivalent of step_calc naming).
- Vercel project: `step-calc` (`prj_w1exwJFCzkKwdbbWeUQM63hf54ak`) under `jimmy-nicholas-projects`. Git connected; production deploy from `main` (`3945856`) is READY.
- Production URL: https://step-calc-omega.vercel.app (also `step-calc-jimmy-nicholas-projects.vercel.app`). Verified title/header “AMES Step Up”.
- Deployment Protection / Vercel Auth disabled so the URL is publicly reachable.
- Human follow-up: enable Web Analytics in the Vercel dashboard — https://vercel.com/jimmy-nicholas-projects/step-calc/analytics
