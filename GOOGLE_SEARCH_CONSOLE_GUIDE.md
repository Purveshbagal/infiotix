# Google Search Console Guide — infiotix.com

**Date:** 4 October 2026
**Prerequisite:** deploy first — [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md).
Telling Google to recrawl before the changes are live wastes the trip.

---

## 1. Verify ownership (both property types)

You already have a property, so this section is mainly about adding the **Domain** property if
you don't have one.

### Which property type?

| Type | Covers | Use for |
| --- | --- | --- |
| **Domain** (`infiotix.com`) | All subdomains, both `http` and `https`, `www` and non-`www` | ⭐ **Recommended.** Only this type reveals whether `www` duplicates are being indexed |
| **URL prefix** (`https://infiotix.com/`) | Exactly that prefix | Narrower; misses `www` problems entirely |

> **Add the Domain property even if you already have a URL-prefix one.** Your audit found that
> Search Console knows about **20 URLs when only 19 pages exist**, and a `www` duplicate is the
> most likely explanation. A URL-prefix property for the non-`www` host **cannot show you that**.
> Keep both — they coexist fine.

### Domain property (DNS verification)

1. Search Console → property dropdown → **Add property** → **Domain** → enter `infiotix.com`
2. Google gives a `TXT` record like `google-site-verification=abc123...`
3. In **Hostinger hPanel → Domains → DNS / Nameservers**, add:
   ```
   Type: TXT     Name: @  (or blank, or "infiotix.com" — depends on the panel)
   Value: google-site-verification=abc123...
   TTL: 3600
   ```
4. Wait 5–60 minutes, then click **Verify**
5. Confirm it propagated: `nslookup -type=TXT infiotix.com`

> **DNS is yours to change.** I have not modified and cannot modify any DNS record.

### URL-prefix property (HTML tag) — already supported in code

The app can emit the verification meta tag from an environment variable:

1. Search Console → property → **Settings → Ownership verification → HTML tag**
2. You get `<meta name="google-site-verification" content="XXXXXXXX" />`
3. Put **only the content value** into `.env.production` on the VPS:
   ```
   GOOGLE_SITE_VERIFICATION=XXXXXXXX
   ```
4. **Rebuild** — this is a build-time value:
   ```bash
   npm run build && pm2 restart YOUR_PROCESS_NAME
   ```
5. Confirm, then click Verify:
   ```bash
   curl -s https://infiotix.com | grep -o 'google-site-verification[^>]*'
   ```

`.env.example` documents this. Bing works the same way via `BING_SITE_VERIFICATION`.

- [ ] Domain property added and verified
- [ ] URL-prefix property verified

---

## 2. Submit the sitemap

Your sitemap is at **`https://infiotix.com/sitemap.xml`** and contains exactly **19** URLs.

1. Search Console → **Indexing → Sitemaps**
2. If `sitemap.xml` is already listed and shows "Success", **leave it alone** — Google re-reads it
   automatically. There is no benefit to resubmitting
3. If it is missing or errored: enter `sitemap.xml` → **Submit**
4. Confirm after a day or two:

| Field | Expected |
| --- | --- |
| Status | Success |
| Discovered URLs | **19** |
| Last read | within the last few days |

**If "Discovered URLs" is not 19:** compare against the list in
[GOOGLE_INDEXING_ACTION_PLAN.md](GOOGLE_INDEXING_ACTION_PLAN.md) §1.

**Also submit to Bing** — https://www.bing.com/webmasters — it can import directly from Search
Console. Low effort, and Bing feeds DuckDuckGo and some AI answer engines.

- [ ] Sitemap shows Success with 19 URLs

---

## 3. Deal with the 8 not-indexed URLs

This has its own document because each status reason needs a different fix:

**→ [GOOGLE_INDEXING_ACTION_PLAN.md](GOOGLE_INDEXING_ACTION_PLAN.md)**

Short version:

1. **Indexing → Pages** → under "Why pages aren't indexed", **export each reason's URL list**
2. Match each URL to the right section of the action plan
3. Fix **by reason**, not URL by URL
4. Click **Validate fix** on the reason
5. Request indexing only for pages you actually changed — **once each**

> **Expect 2–3 pages to stay unindexed permanently.** `/sitemap`, `/privacy-policy` and
> `/terms-and-conditions` are low-value by nature. That is a healthy profile for a 19-page site,
> not a problem to solve. Do not chase 19/19.

---

## 4. Check the changes landed

After deploying, use **URL Inspection** (the search bar at the top) on these three URLs. For each,
click **Test live URL** — that shows what Googlebot sees right now, not what is cached.

### `https://infiotix.com`

- [ ] Coverage: **URL is on Google**
- [ ] User-declared canonical: `https://infiotix.com`
- [ ] Google-selected canonical: `https://infiotix.com` ← **if this says `www`, go fix your
      redirects:** [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §2
- [ ] **View crawled page → HTML** contains `Infiotix Technologies builds intelligent software`
- [ ] Enhancements lists **FAQ** and **Breadcrumbs**

### `https://infiotix.com/contact`

- [ ] Returns 200
- [ ] The rendered HTML contains the full enquiry form, including all dropdown options
      *(this confirms making the page static did not push the form to client-only rendering)*

### `https://infiotix.com/this-does-not-exist`

- [ ] Reports **404 / not found**
- [ ] **No canonical pointing at the home page** — this was the bug fixed in this pass

### Rich-results validation

Paste `https://infiotix.com` into **https://search.google.com/test/rich-results**:

- [ ] **0 errors**
- [ ] `Organization` detected, with `areaServed` (Ahilyanagar, Maharashtra, India) and `sameAs` (Instagram)
- [ ] `FAQPage` detected
- [ ] `BreadcrumbList` detected
- [ ] No `aggregateRating` anywhere ← correct; none should exist

Then spot-check one product page, e.g. `/software/hospital-management-system`:

- [ ] `SoftwareApplication` detected
- [ ] `FAQPage` detected

> Warnings about "recommended" missing fields (e.g. `priceRange`, `aggregateRating`) are **fine to
> ignore**. Filling them with invented values is exactly the thing that earns manual actions.

---

## 5. Measure performance (do not guess it)

**No Core Web Vitals score is claimed anywhere in this work, because none was measured.** Measure
it yourself after deploying.

### Lab measurement — immediate

**https://pagespeed.web.dev** → enter `https://infiotix.com` → check **Mobile** first (that is
what Google ranks on).

Record your actual numbers:

| Metric | Good | Mobile | Desktop |
| --- | --- | --- | --- |
| LCP (Largest Contentful Paint) | < 2.5 s | ______ | ______ |
| CLS (Cumulative Layout Shift) | < 0.1 | ______ | ______ |
| INP / TBT | < 200 ms | ______ | ______ |
| Performance score | — | ______ | ______ |

Also test a product page and `/contact` (the page whose rendering changed).

**What should help, in principle:** the hero poster is explicitly preloaded with
`fetchPriority: high` for LCP; `next/image` serves AVIF/WebP; fonts use `display: swap`; there
are only 4 client components and **zero third-party scripts**; and every page is now a static
file. **Whether that adds up to a good score on your hardware and network is something only the
measurement tells you.**

If LCP on mobile is poor, the most likely cause is the hero video/poster above the fold — the
poster is 104 KB and `hero-loop.mp4` is 6.4 MB (the component does defer the video and respects
reduced-motion). Measure before changing anything.

### Field data — needs traffic

**Search Console → Experience → Core Web Vitals** uses real visitor data and needs ~28 days of
sufficient traffic. If it says "Not enough data", that is normal for a low-traffic site; rely on
PageSpeed Insights until it populates.

- [ ] Mobile measured and numbers recorded
- [ ] Desktop measured
- [ ] Re-check at the 30-day mark

---

## 6. 30-day monitoring plan

**Set a baseline today, before Google recrawls.** Without it you cannot tell what changed.

### Day 0 — baseline (do this now)

Search Console → **Performance** → last 28 days → **Export**. Record:

| Metric | Baseline |
| --- | --- |
| Total clicks (28 d) | ______ |
| Total impressions (28 d) | ______ |
| Average CTR | ______ |
| Average position | ______ |
| Indexed pages | 12 |
| Not indexed | 8 |
| Clicks for query "infiotix" | ______ |
| Impressions for "infiotix technologies" | ______ |

Also search `Infiotix Technologies` on Google and note whether it says *"Showing results for
Infinix Technologies"*.

- [ ] Baseline exported and saved

### Days 1–3 — confirm the deploy

- [ ] All 14 `curl` checks in [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §4 pass
- [ ] Redirects verified (§2 of that guide)
- [ ] URL Inspection live test on the home page shows the new copy
- [ ] Rich Results Test: 0 errors
- [ ] PageSpeed Insights baseline recorded
- [ ] **Not expected yet:** any change in rankings, clicks or indexing

### Days 3–7 — Google starts noticing

- [ ] Sitemap "Last read" date is after your deploy
- [ ] Home page's *Google-selected canonical* is the non-`www` form
- [ ] Export the 8 not-indexed URLs and work through
      [GOOGLE_INDEXING_ACTION_PLAN.md](GOOGLE_INDEXING_ACTION_PLAN.md)
- [ ] **Meanwhile, do the thing that actually matters:**
      [LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md) §1 (LinkedIn + social URLs) and §2
      (Google Business Profile)
- [ ] **Not expected yet:** ranking changes. Impressions may wobble — that is noise

### Days 7–14 — first real signals

- [ ] Pages report: has "Not indexed" dropped below 8?
- [ ] Crawl stats (Settings → Crawl stats): average response time, and **0 server errors**
- [ ] Any new coverage issues introduced? (expect none)
- [ ] Social profiles live and `sameAs` confirmed in the HTML
- [ ] Google Business Profile submitted for verification
- [ ] Watch impressions, **not** position — impressions move first

### Days 14–30 — assess

- [ ] Performance → compare last 28 days against your Day 0 baseline
- [ ] Filter queries by `infiotix` — are impressions for brand terms up?
- [ ] Indexed count vs. 12
- [ ] Core Web Vitals report — populated yet?
- [ ] Re-run PageSpeed Insights and compare
- [ ] Re-search "Infiotix Technologies" — still autocorrecting to Infinix?
- [ ] Business Profile verified and fully completed

### Day 30 — honest review

Fill this in from data, not impressions:

| Metric | Day 0 | Day 30 | Change |
| --- | --- | --- | --- |
| Indexed pages | 12 | ____ | ____ |
| Not indexed | 8 | ____ | ____ |
| Impressions (28 d) | ____ | ____ | ____ |
| Clicks (28 d) | ____ | ____ | ____ |
| Brand-term impressions | ____ | ____ | ____ |
| Mobile LCP | ____ | ____ | ____ |
| Autocorrect to Infinix? | Yes | ____ | ____ |

### How to read the result honestly

| Outcome | What it means |
| --- | --- |
| Indexing improved, impressions flat | **Normal and fine.** Technical fixes land first; visibility follows |
| Indexing improved, brand impressions up | Working as intended — keep going on off-site signals |
| Nothing changed and §1/§2 of the local checklist are **not** done | Expected. The code was already good; off-site presence is the bottleneck |
| Nothing changed and §1/§2 **are** done | Give it to 90 days. Brand entity recognition is slow |
| Something got **worse** | Check for new coverage errors, then redirects, then roll back ([deployment guide](HOSTINGER_DEPLOYMENT_GUIDE.md) §7) |

> **Please don't check rankings daily.** Day-to-day position for a low-traffic brand term is
> almost entirely noise, and reacting to it leads to undoing work that hasn't had time to take
> effect. The 30-day comparison against your Day 0 export is the only reading worth acting on.

---

## 7. Things worth setting up once

- [ ] **Email alerts** — Settings → Users and permissions: confirm your address receives coverage
      and manual-action alerts. Google emails you about real problems; this is your early warning
- [ ] **Bing Webmaster Tools** — import from Search Console
- [ ] **Link Search Console to Google Analytics** if you add analytics later. There is currently
      **no analytics and no third-party script on the site** — which is good for performance. If
      you add one, prefer a lightweight option and re-measure Core Web Vitals afterwards
- [ ] **Check for manual actions** — Security & Manual actions → both should read "No issues".
      Check once now so you have a clean baseline

---

## 8. Summary — what to do in what order

| # | Action | Where | Impact |
| --- | --- | --- | --- |
| 1 | Check & fix www/http redirects | [Deployment guide](HOSTINGER_DEPLOYMENT_GUIDE.md) §2 | ⭐⭐⭐ |
| 2 | Deploy this build | [Deployment guide](HOSTINGER_DEPLOYMENT_GUIDE.md) §3 | ⭐⭐⭐ |
| 3 | Run the 14 verification checks | [Deployment guide](HOSTINGER_DEPLOYMENT_GUIDE.md) §4 | ⭐⭐ |
| 4 | Export Day 0 baseline | §6 above | ⭐⭐ required to judge anything |
| 5 | Add Domain property | §1 above | ⭐⭐ reveals www duplicates |
| 6 | **LinkedIn page + social URLs in `socialProfiles`** | [Local SEO](LOCAL_SEO_CHECKLIST.md) §1 | ⭐⭐⭐ |
| 7 | **Google Business Profile, verified** | [Local SEO](LOCAL_SEO_CHECKLIST.md) §2 | ⭐⭐⭐ |
| 8 | Work the 8 not-indexed URLs by reason | [Indexing plan](GOOGLE_INDEXING_ACTION_PLAN.md) | ⭐⭐ |
| 9 | Measure Core Web Vitals | §5 above | ⭐ |
| 10 | Review at day 30 | §6 above | ⭐⭐ |

**Items 6 and 7 are the ones that address your actual stated problem.** Everything else removes
technical obstacles — necessary, but not sufficient. No position can be guaranteed, and nothing
here should be judged before day 30.
