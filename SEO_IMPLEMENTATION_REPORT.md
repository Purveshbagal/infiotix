# SEO Implementation Report — infiotix.com

**Date:** 4 October 2026
**Scope:** technical SEO fixes applied directly to the workspace at `C:\Users\Admin\Downloads\infiotix-master`
**Companion document:** [SEO_AUDIT_REPORT.md](SEO_AUDIT_REPORT.md) explains *why* each change was made.

---

## 1. Summary in plain language

The website was already in good shape. I did not redesign anything, did not remove any feature,
and did not change how the site looks apart from two deliberate, visible edits (both listed
below). What I changed falls into four groups:

1. **Removed two things that were actively working against you** — four footer links that went
   to social media home pages instead of to Infiotix, and a 404 page that told Google it was the
   home page.
2. **Made the site faster** — the contact page is now a static file instead of being rebuilt by
   the server on every visit. Every page on the site is now static.
3. **Gave search engines more to read** — the Software and IoT pages had almost no plain
   sentences, only cards and icons. They now have a short, honest description of what Infiotix
   does, which also covers four service areas that previously had no coverage anywhere.
4. **Prepared the parts that need your information** — service areas are now declared; street
   address, founding year and social profiles are wired up and waiting for real values. Nothing
   was invented.

---

## 2. Files changed

### 2.1 New files (5)

| File | Purpose |
| --- | --- |
| `src/components/sections/ServiceIntro.tsx` | Reusable prose + internal-links section for listing pages |
| `.env.example` | Documents the 3 env vars the code reads. **Contains no secrets.** |
| `SEO_AUDIT_REPORT.md` | Findings, severities, verification results |
| `SEO_IMPLEMENTATION_REPORT.md` | This file |
| `GOOGLE_INDEXING_ACTION_PLAN.md`, `LOCAL_SEO_CHECKLIST.md`, `HOSTINGER_DEPLOYMENT_GUIDE.md`, `GOOGLE_SEARCH_CONSOLE_GUIDE.md` | Manual action guides |

### 2.2 Modified files (13)

| File | What changed | Visible? |
| --- | --- | --- |
| `src/lib/seo.ts` | Added `socialProfiles` (single source for footer + `sameAs`), `BUSINESS_PROFILE` (documented placeholders), `AREAS_SERVED` | No |
| `src/lib/schema.ts` | Added `areaServed`, conditional `foundingDate`, `postalAddressNode()`, conditional `localBusinessNode()` | No |
| `src/components/layout/Footer.tsx` | Social icons now come from `socialProfiles`; renders nothing while empty | **Yes** — 4 dead icons gone |
| `src/components/sections/Hero.tsx` | Intro paragraph now names the company | **Yes** — one sentence |
| `src/components/forms/ContactForm.tsx` | Reads `?interest=` in the browser via `useEffect` | No |
| `src/app/contact/page.tsx` | No longer reads `searchParams` → page is now static | No |
| `src/app/not-found.tsx` | Own title/description, cleared inherited canonical, explicit `noindex` | No (404 only) |
| `src/app/privacy-policy/page.tsx` | Added `WebPage` JSON-LD | No |
| `src/app/terms-and-conditions/page.tsx` | Added `WebPage` JSON-LD | No |
| `src/app/sitemap/page.tsx` | Added `WebPage` JSON-LD | No |
| `src/app/software/page.tsx` | Added `ServiceIntro` section + 2 FAQs + descriptive link list | **Yes** — new section |
| `src/app/iot-products/page.tsx` | Added `ServiceIntro` section + 1 FAQ + descriptive link list | **Yes** — new section |
| `src/app/solutions/page.tsx` | Added "Business Automation" capability block | **Yes** — new block |
| `src/data/seo.ts` | Added `listingAbout` prose; updated `/solutions` description + keywords | **Yes** — via above |
| `src/data/site.ts` | Added "Business Automation" to footer services | **Yes** — 1 footer link |
| `src/data/products.ts` | Added "Business Automation" to enquiry dropdown | **Yes** — 1 option |
| `.gitignore` | Added `!.env.example` exception | No |

### 2.3 Explicitly NOT touched

- Any layout, spacing, colour, font, animation or responsive breakpoint
- `next.config.ts` (no redirects added — your choice; see Nginx guide)
- `src/app/robots.ts`, `src/app/sitemap.ts` — both already correct
- `src/app/og/[key]/route.tsx` — share-image generation already correct
- Hero video, `HeroVideo.tsx`, poster handling, reduced-motion behaviour
- `Header.tsx`, `ProjectFilter.tsx`, `WhatsAppButton.tsx`
- All product content in `src/data/products.ts` except the one dropdown entry
- The `50+ / 30+ / 5+` hero statistics (left exactly as found — see audit §3.3)
- All existing titles and descriptions except `/solutions`
- `images/`, `public/videos/video 1.mp4`, `public/images/logoo.png` — flagged, not deleted

---

## 3. Phase-by-phase outcome

| Phase | Outcome |
| --- | --- |
| 1 · Audit | Done → `SEO_AUDIT_REPORT.md` |
| 2 · Technical SEO (Metadata API) | Already correct. Fixed the one gap: 404 page inherited the home page's title/description/canonical |
| 3 · Sitemap | Already correct — 19 real canonical URLs, real `lastmod`, no API/admin/redirect/404/noindex URLs, no duplicates. **No change needed** |
| 4 · robots.txt | Already correct — allows all crawling incl. `/_next/` assets, announces sitemap, not used as security. **No change needed** |
| 5 · Canonical & redirects | Verified in code: canonicals self-reference, trailing slash 308s correctly, no redirect chains, 0 broken links. **www/http redirects live on the VPS and could not be inspected** — see `HOSTINGER_DEPLOYMENT_GUIDE.md` §2 |
| 6 · Organization / WebSite schema | Added `areaServed`; wired `foundingDate`, street address and optional LocalBusiness behind documented placeholders. No fake ratings/reviews. 57 blocks, 0 invalid |
| 7 · Brand SEO | Company name now appears in the first visible paragraph of the home page. H1 and design untouched. No keyword stuffing |
| 8 · Service-specific SEO | **Strengthened existing pages instead of creating new ones** (your choice) — avoids thin, cannibalising pages. Web app dev, mobile app dev, business automation and IoT solutions now covered with prose + FAQs |
| 9 · Indexing | Analysed; sitemap matches page count exactly. Per-URL procedure in `GOOGLE_INDEXING_ACTION_PLAN.md`. **Needs your Search Console status reasons to finish** |
| 10 · Performance | Removed the only dynamic route. Confirmed existing good practice (next/image, font swap, LCP preload, 4 client components, zero third-party scripts). **No CWV score claimed — not measured** |
| 11 · Local SEO | `areaServed` added; address placeholders documented; `LOCAL_SEO_CHECKLIST.md` written. No office invented |
| 12 · Content & internal linking | New prose sections with descriptive anchor text; new footer link; 0 broken links/anchors after changes |
| 13 · Security & production safety | **No Nginx/PM2/env/DB config exists in this repo** — reported, not guessed. Nothing restarted, no secrets touched, no DNS changed |
| 14 · Testing | lint ✅ · tsc ✅ · build ✅ · 19/19 pages 200 ✅ · 0 broken links ✅ · JSON-LD 0 invalid ✅ |
| 15 · Deliverables | All 6 documents written |

---

## 4. Test results

```
npx eslint          → exit 0, no errors, no warnings
npx tsc --noEmit    → exit 0
npm run build       → ✓ Compiled successfully
                      ✓ 44/44 static pages generated
                      0 errors, 0 warnings
```

Runtime checks against `next start`:

| Check | Before | After |
| --- | --- | --- |
| Dynamic routes | 1 (`/contact`) | **0** |
| Pages HTTP 200 | 19/19 | **19/19** |
| Broken internal links | 0 | **0** |
| Broken `#anchors` | 0 | **0** |
| JSON-LD blocks / invalid | 54 / 0 | **57 / 0** |
| Duplicate titles | 1 | **0** |
| Duplicate descriptions | 1 | **0** |
| Duplicate canonicals | 1 | **0** |
| `noindex` pages | `/_not-found` | `/_not-found` (correct) |
| 404 canonical tag | points to home page | **none** |

**No pre-existing test failures were found, and no new ones were introduced.**

> One note on type checking: `npx tsc --noEmit` fails with
> `Cannot find name 'PageProps'` / `LayoutProps` on a **clean checkout with no `.next/`
> directory**. This is not a bug in the code — in Next.js 16 these are global helper types
> generated into `.next/types` by `next dev`/`next build`. Run `npm run build` once first, then
> `tsc` passes. Relevant if you add type checking to CI.

---

## 5. Three groups of remaining work

### A. Completed automatically in code — nothing for you to do

Everything in §2. It is in your workspace now and will take effect on your next deploy.

### B. Needs your approval or account access

| # | Action | Where | Why it matters |
| --- | --- | --- | --- |
| B1 | **Check which www/http redirects are live** | VPS / Nginx | Highest-value server task. Duplicate www pages may explain several not-indexed URLs → `HOSTINGER_DEPLOYMENT_GUIDE.md` §2 |
| B2 | **Add real social profile URLs** | `src/lib/seo.ts` → `socialProfiles` | Highest-value SEO task for the Infiotix/Infinix problem. One edit updates footer + structured data |
| B3 | Create & verify Google Business Profile | Google | → `LOCAL_SEO_CHECKLIST.md` §2 |
| B4 | Fill in street address + postcode, enable LocalBusiness | `src/lib/seo.ts` → `BUSINESS_PROFILE` | → `LOCAL_SEO_CHECKLIST.md` §3 |
| B5 | Set `foundingDate` | `src/lib/seo.ts` → `BUSINESS_PROFILE` | Reconcile with the "5+ Years Experience" claim |
| B6 | Set `GOOGLE_SITE_VERIFICATION` | `.env.production` on VPS | → `GOOGLE_SEARCH_CONSOLE_GUIDE.md` §1 |
| B7 | Deploy the build | VPS | → `HOSTINGER_DEPLOYMENT_GUIDE.md` §3 |
| B8 | Get the 8 not-indexed URLs + their status reasons | Search Console | → `GOOGLE_INDEXING_ACTION_PLAN.md` §2 |
| B9 | Decide on deleting ~21 MB of unused files | repo | → audit §3.4 |
| B10 | Submit brand-name feedback for the Infinix autocorrect | Google results page | → `LOCAL_SEO_CHECKLIST.md` §6 |

### C. Depends on Google recrawling — only time

| What | Realistic timescale |
| --- | --- |
| Home page recrawled, new copy picked up | 1–7 days |
| `areaServed` / updated schema read | 3–14 days |
| `/software`, `/iot-products` new prose assessed | 1–3 weeks |
| 404 canonical correction propagating | 1–4 weeks |
| "Crawled – currently not indexed" pages reassessed | 2–8 weeks, not guaranteed |
| Brand entity recognition improving (**requires B2 + B3 first**) | 1–6 months |
| Autocorrect to "Infinix" stopping | Not directly controllable; follows brand corroboration |

> **No ranking improvement is claimed here.** None of these changes can be credited with a
> ranking change until your own Search Console data shows it. Measure against the 30-day plan in
> `GOOGLE_SEARCH_CONSOLE_GUIDE.md` §6, not against day-to-day position checks.

---

## 6. If you want to undo any visible change

There are exactly four visible changes. Each is a single, isolated edit:

| Change | Revert by |
| --- | --- |
| Social icons no longer shown | Add real URLs to `socialProfiles` in `src/lib/seo.ts` (intended path), or re-add the old array in `Footer.tsx` (not recommended — dead links) |
| Home page paragraph names the company | `src/components/sections/Hero.tsx` — change `Infiotix Technologies builds` back to `We build` |
| New prose sections on `/software`, `/iot-products` | Remove the `<ServiceIntro … />` block from either page |
| "Business Automation" block on `/solutions` | Remove the `business-automation` entry from `capabilities` in `src/app/solutions/page.tsx`, plus the matching footer link in `src/data/site.ts` and dropdown entry in `src/data/products.ts` |
