# 07: Vercel Analytics events

**What to build:** The live app reports Vercel Web Analytics pageviews (once enabled in the dashboard) and fires custom events `calculate`, `generate_fact`, and `share_link` on the corresponding user actions—without third-party trackers.

**Blocked by:** 05 Shareable URL end-to-end; 06 Fun facts end-to-end

**Status:** ready-for-agent

- [ ] Vercel Web Analytics is wired in a way appropriate for the Vite SPA
- [ ] `calculate` fires when the user runs Calculate (and any intentional shared compute entry used for URL hydration, without double-counting cosmetic re-renders)
- [ ] `generate_fact` fires when the user requests another fact
- [ ] `share_link` fires when the user invokes Copy link (successful share intent)
- [ ] No Google Analytics or other third-party trackers are added
