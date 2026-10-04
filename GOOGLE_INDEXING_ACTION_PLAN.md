# Google Indexing Action Plan — infiotix.com

**For:** resolving your 8 "Not indexed" URLs in Google Search Console
**Date:** 4 October 2026

---

## 1. Start here: the arithmetic doesn't add up, and that's useful

Your site has exactly **19 indexable HTML pages**. I verified this by crawling the production
build — every one returns HTTP 200, and `/sitemap.xml` contains exactly those same 19 URLs.

Search Console reports **12 indexed + 8 not indexed = 20 URLs**.

**That extra URL is a clue.** Google knows about one more URL than exists on your site. The usual
causes, in order of likelihood:

1. A **`www.` duplicate** — `https://www.infiotix.com/...` returning 200 instead of redirecting
2. An **old URL** from a previous version of the site that no longer exists
3. An **`http://`** version counted separately
4. A URL with a **query string** (e.g. `/contact?interest=...`) counted separately

Check cause #1 first. It is both the most likely and the most damaging, and it is a two-minute
test — see [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §2.

### The complete list of your 19 pages

```
https://infiotix.com                                           ← priority 1.0
https://infiotix.com/about
https://infiotix.com/contact
https://infiotix.com/iot-products
https://infiotix.com/iot-products/home-automation
https://infiotix.com/iot-products/smart-door-bell
https://infiotix.com/iot-products/smart-door-lock
https://infiotix.com/iot-products/water-tank-level-monitor
https://infiotix.com/privacy-policy
https://infiotix.com/projects
https://infiotix.com/sitemap
https://infiotix.com/software
https://infiotix.com/software/custom-software-development
https://infiotix.com/software/gym-management-system
https://infiotix.com/software/hospital-management-system
https://infiotix.com/software/school-management-system
https://infiotix.com/solutions
https://infiotix.com/support
https://infiotix.com/terms-and-conditions
```

**Compare this list against your Search Console export.** Any URL in Search Console that is *not*
on this list is a ghost — handle it with §3.6 below.

---

## 2. Get the data I could not see

I can audit the code; I cannot see inside your Search Console. To finish this you need the
per-URL reasons.

1. Open **Search Console → Indexing → Pages**
2. Under **"Why pages aren't indexed"** you'll see a list of reasons with counts
3. Click each reason → **Export** (top right) → copy the URLs
4. Write them into the table at the end of this document (§5)

Each reason has a completely different fix. Treating them as one problem is the most common
mistake, which is why §3 is organised by reason rather than by URL.

---

## 3. What to do, by exact status reason

### 3.1 "Crawled – currently not indexed"

**Meaning:** Google fetched the page, read it, and chose not to index it. This is a *quality and
value* judgement, not a technical error. Submitting it for reindexing without changing anything
will not help.

**Most likely to appear for, on your site:**

| Page | Why | What to do |
| --- | --- | --- |
| `/sitemap` | It is a list of links that duplicates your navigation and footer. It adds no information a crawler can't get elsewhere. | **Accept it.** This page exists for humans. It being unindexed costs you nothing. Do not noindex it either — it is a useful internal-link hub. |
| `/privacy-policy` | Boilerplate legal text, near-identical to millions of other sites | **Accept it.** Normal and harmless. |
| `/terms-and-conditions` | Same | **Accept it.** |
| `/projects` | Previously it mostly re-listed products shown elsewhere | Worth a reindex request after this deploy, but low priority |
| `/support` | Thin-ish, though it does have unique FAQ content | Worth a reindex request after this deploy |

**Do not force these into the index.** Three or four unindexed low-value pages is a healthy,
normal profile for a 19-page site. A site where legal pages and an HTML sitemap are unindexed is
not a site with a problem.

**Action if a page you actually care about is in this bucket** (e.g. one of the four
`/software/*` or four `/iot-products/*` pages — these have real, substantial, unique content):

1. Confirm the content is genuinely unique — all eight product pages already have unique
   overviews, features, audiences and FAQs, so this is unlikely to be the cause
2. Make sure it is linked from more than one place (all eight are linked from the home page,
   their listing page, the footer-adjacent nav, `/sitemap` and related-product blocks)
3. Request indexing (§4) — **once**
4. Wait 2–4 weeks

---

### 3.2 "Discovered – currently not indexed"

**Meaning:** Google knows the URL exists (from your sitemap) but hasn't fetched it yet. Usually a
crawl-budget or server-responsiveness issue, not a content issue.

**Checks, in order:**

1. **Server responsiveness.** Search Console → Settings → **Crawl stats**. Look at average
   response time. If it is above ~600 ms, or there are spikes of 5xx, Google throttles crawling.
   - The fix already applied helps here: `/contact` was the only page the server had to render on
     demand; **every page is now a static file**, which is as fast as a Node server gets.
2. **Confirm the sitemap was read.** Search Console → Sitemaps → should show
   **19 discovered URLs** and a recent successful read.
3. **Internal links.** Verified: 0 broken links, and every one of the 19 pages is reachable from
   the home page. Not your problem.
4. **Request indexing** for the specific URLs (§4).

If pages sit in "Discovered" for over a month with a healthy server, it generally reflects how
much crawl budget Google assigns the whole domain — which comes back to brand authority, i.e.
§5 of [SEO_AUDIT_REPORT.md](SEO_AUDIT_REPORT.md).

---

### 3.3 "Duplicate without user-selected canonical" / "Alternate page with proper canonical tag" / "Google chose different canonical than user"

**Meaning:** Google found two or more URLs serving the same content.

**This is the one I most expect to be behind your extra URL.** Every page on your site carries a
correct self-referencing canonical pointing at the `https://infiotix.com` (non-www) form — I
verified all 19. So if this reason appears, the duplicate is almost certainly a **host-level**
duplicate:

- `https://www.infiotix.com/page` serving 200 instead of redirecting
- `http://infiotix.com/page` serving 200 instead of redirecting

**Fix:** make both redirect with a 301 to the non-www HTTPS form at the Nginx level.
Exact config: [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §2.

**Note:** if Search Console says *"Google chose different canonical than user"* and the Google-chosen
canonical is the `www` version, that is a strong signal the www host is live and being preferred.
Fixing the redirect resolves it.

---

### 3.4 "Page with redirect"

**Meaning:** the URL redirects, so it is not indexed itself — the target is. **This is usually
correct behaviour, not a problem.**

Expected on your site for:

- Any URL with a trailing slash — `/about/` → 308 → `/about` (verified; this is correct)
- `www` or `http` URLs once you fix the redirects in §3.3

**Action:** confirm the redirect target is the right page, then ignore. Do **not** try to index a
redirecting URL. Also confirm these URLs are not in your sitemap — I verified they are not.

---

### 3.5 "Excluded by 'noindex' tag"

**Meaning:** the page tells Google not to index it.

**On your site exactly one page does this: the 404 page (`/_not-found`), which is correct.**
I verified that none of your 19 real pages carry `noindex`.

**If Search Console lists a real page here, that would be new** — check the page's
`metadata.robots`, as nothing in the current code sets `noindex` on a public page.

---

### 3.6 "Not found (404)" / "Soft 404"

**Meaning:** the URL doesn't exist. Normal for old URLs from a previous site version.

**Important fix already applied:** your 404 page previously returned the **home page's**
`<title>`, description and `rel="canonical"`. That is exactly the pattern that produces **Soft
404** reports and canonical confusion. It now returns a proper 404 with its own title, `noindex`
and no canonical tag. Verified live.

**Action per URL:**

| Situation | Do this |
| --- | --- |
| Old URL with a clear modern equivalent (e.g. an old `/hospital-software` page) | Add a **301 redirect** to the new page in Nginx or `next.config.ts` |
| Old URL with no equivalent, no inbound links | **Leave it 404.** Correct and healthy. Mark "Validate fix" in Search Console |
| URL you never created and don't recognise | Leave it 404. Often scraper noise |

**Do not redirect unrelated 404s to the home page.** That creates soft 404s, which is worse than
a clean 404.

---

### 3.7 "Server error (5xx)" / "Crawled, but blocked by robots.txt"

**5xx:** check PM2 (`pm2 logs infiotix --lines 200`). Commands in
[HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §5.

**Blocked by robots.txt:** should be impossible — your `/robots.txt` is
`User-Agent: * / Allow: /` with no `Disallow`. I verified this returns HTTP 200 as
`text/plain`. If this reason appears, something on the server (Nginx, Hostinger panel, or a CDN)
is serving a **different** robots.txt than the app generates. Test:

```bash
curl -s https://infiotix.com/robots.txt
# Must print:
#   User-Agent: *
#   Allow: /
#
#   Sitemap: https://infiotix.com/sitemap.xml
```

If the output differs, Nginx or Hostinger is intercepting `/robots.txt` — remove that override.

---

## 4. How to request indexing (and how not to)

For each URL you genuinely want indexed:

1. Search Console → **URL Inspection** (top search bar)
2. Paste the full URL including `https://infiotix.com`
3. Read **"URL is on Google"** / **"URL is not on Google"**
4. Click **Test live URL** — this shows what Googlebot sees *right now*
5. Check the live test for: HTTP 200, no `noindex`, correct canonical, and that the rendered HTML
   contains your content
6. If it looks right → **Request indexing**

**Rules:**

- Quota is roughly **10–12 URLs per day** per property. You have at most 8 to deal with, so this
  is not a constraint.
- **Request each URL once.** Repeat requests do not increase priority and waste your quota.
- **Never** request indexing for a page you haven't actually changed — if Google declined it on
  quality grounds, resubmitting an unchanged page gets the same answer.
- After fixing a *reason* (e.g. the redirects), use **"Validate fix"** on that reason in the
  Pages report instead of inspecting URLs one at a time. This is faster and tells Google to
  recheck the whole group.

---

## 5. Your worksheet

Fill this in from the Search Console export (§2), then work top to bottom.

| # | URL | Status reason from GSC | Which section applies | Action | Done |
| --- | --- | --- | --- | --- | --- |
| 1 | | | | | ☐ |
| 2 | | | | | ☐ |
| 3 | | | | | ☐ |
| 4 | | | | | ☐ |
| 5 | | | | | ☐ |
| 6 | | | | | ☐ |
| 7 | | | | | ☐ |
| 8 | | | | | ☐ |

**Triage shortcut:**

- URL not in the §1 list of 19 → §3.6 (404 / redirect)
- URL is `www.` or `http://` → §3.3 (fix Nginx redirect)
- URL is `/sitemap`, `/privacy-policy` or `/terms-and-conditions` → §3.1, **accept it**
- URL is a `/software/*` or `/iot-products/*` page → worth pursuing; §3.1 or §3.2
- Anything else → match the exact reason text to §3.x

---

## 6. Order of operations

Do these in order. Steps 1–2 may resolve several URLs at once, which saves effort on the rest.

1. **Verify www/http redirects on the VPS** → [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §2
   *May resolve the duplicate-canonical URLs and the extra 20th URL in one move.*
2. **Deploy this build** → [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §3
   *Ships the 404 fix, the static contact page and the new page content.*
3. **Confirm the sitemap re-reads cleanly** — 19 URLs discovered, no errors
4. **Export the 8 URLs with their reasons** (§2) and fill in §5
5. **Fix by reason**, using §3 — not URL by URL
6. **Click "Validate fix"** on each reason you addressed
7. **Request indexing** only for pages you changed and genuinely want indexed (§4)
8. **Wait 2–4 weeks.** Then re-check the Pages report

### What success actually looks like

Not "20 indexed". A realistic good outcome for this site:

- **16–17 indexed** — home, about, contact, software, iot-products, solutions, projects, support,
  and all 8 product pages
- **2–3 not indexed** — `/sitemap`, `/privacy-policy`, `/terms-and-conditions`
- **0 duplicates, 0 soft 404s, 0 server errors**

If you reach that, your indexing is healthy and further effort belongs in off-site brand building
([LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md)), not in Search Console.

---

## 7. What this will not fix

The 8 not-indexed URLs and the "Infiotix → Infinix" autocorrect are **two separate problems**.
Getting all 19 pages indexed will not, on its own, stop Google suggesting "Infinix Technologies".

Brand disambiguation needs off-site corroboration: real linked social profiles, a verified Google
Business Profile, and mentions on sites Google already trusts. Those are in
[LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md) and are, honestly, higher-impact for your stated
goal than anything in this document.
