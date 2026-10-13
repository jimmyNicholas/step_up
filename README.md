# step_calc

AMES Step Up — a Vite + React + TypeScript calculator for the team step challenge.

## Scripts

- `npm run dev` — local Vite server
- `npm run build` — typecheck and production build
- `npm test` — Vitest (once)
- `npm run test:watch` — Vitest watch mode

## Deploy (personal GitHub + Vercel)

- Git remote: personal GitHub (`jimmyNicholas/step_up` — agreed equivalent of `step_calc`).
- Vercel project: personal account / team `jimmy-nicholas-projects`, project name `step-calc` (default `*.vercel.app` URL; no custom domain required).
- Ship wizard (login → link → production deploy → public access → Analytics reminder):

```bash
bash scripts/ship-to-vercel.sh
```

### Human follow-up after first deploy

In the Vercel project dashboard, **enable Web Analytics** so pageviews from `@vercel/analytics` are recorded. Custom events (`calculate`, `generate_fact`, `share_link`) are already wired in the app.
