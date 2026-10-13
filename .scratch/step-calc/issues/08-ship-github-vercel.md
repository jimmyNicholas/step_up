# 08: Ship to personal GitHub + Vercel

**What to build:** The step_calc app is on the user’s personal GitHub and deployed to their personal Vercel account on a default `*.vercel.app` URL so others can open the tool in a browser. Enabling Analytics in the Vercel dashboard remains a human follow-up after deploy.

**Blocked by:** 07 Vercel Analytics events

**Status:** ready-for-human

- [x] Repository is available on the user’s personal GitHub as step_calc (or equivalent agreed remote name)
- [ ] Personal Vercel project deploys the app to a default `*.vercel.app` URL
- [ ] Production URL loads the AMES Step Up calculator
- [x] Custom domains and AMES org/team Vercel accounts are not required for this ticket
- [x] Note left for the human owner to enable Web Analytics in the Vercel dashboard after deploy

## Comments

- GitHub: `origin` is already `https://github.com/jimmyNicholas/step_up.git` (agreed equivalent of step_calc naming).
- Vercel: created personal project `step-calc` (`prj_w1exwJFCzkKwdbbWeUQM63hf54ak`) under team `jimmy-nicholas-projects` (`team_jhAK83q0NhJHUwlz8VAcj2dm`). Framework Vite; build `npm run build` → `dist`.
- Blocker for agent finish: MCP + local CLI cannot use that team scope (CLI token stale; MCP returns 403 “re-authenticate to this scope”). GitHub→Vercel repo link also needs the Vercel GitHub integration / unrestricted access (`isAccessRestricted: true` on the jimmyNicholas namespace).
- Human path: run `bash scripts/ship-to-vercel.sh` (login → link → `vercel --prod` → turn off Deployment Protection → paste URL). README documents the Analytics dashboard enable step.
- After a public `*.vercel.app` URL loads AMES Step Up, check the remaining boxes and set Status to `resolved`.
