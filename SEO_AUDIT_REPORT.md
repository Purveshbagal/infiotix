# SEO Audit Report — infiotix.com

**Audited:** 4 October 2026
**Site:** https://infiotix.com
**Stack found:** Next.js **16.3.5** (App Router, Turbopack) · React 19.2.8 · TypeScript 5 · Tailwind CSS v4
**Package manager:** npm (`package-lock.json` present; no pnpm/yarn lockfile)
**Source layout:** `src/app` (App Router) with `@/*` → `./src/*` path alias

---

## 0. Headline finding

**This site was already well optimised before this audit.** Whoever built it put real work into
SEO: there is a single source of truth for titles and descriptions, correct canonical tags on
every page, generated share images, a real sitemap, valid structured data and clean image
handling. Most "SEO audit" checklists would come back almost empty.

That changes what is useful here. There was no low-hanging fruit of the "you forgot meta
descriptions" kind. The problems that remained were narrower and, in two cases, actively
harmful. They are listed below in severity order.

**Your brand-visibility problem is mostly not a code problem.** The single biggest reason Google
autocorrects "Infiotix Technologies" to "Infinix Technologies" is that Infiotix has almost no
presence *off* this website — no linked social profiles, no Google Business Profile, few or no
mentions on other sites. Google learns that a brand name is a real, distinct entity from
corroborating sources, not from the brand's own site repeating its name. See
[LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md) and section 5 below.

---

## 1. What was already correct (verified, no change needed)

Each of these was checked against the live build, not assumed.

| Area | Status | Where |
| --- | --- | --- |
| Metadata API usage | Correct for Next.js 16 | `src/lib/seo.ts` (`buildMetadata`) |
| `metadataBase` | Set correctly | `src/app/layout.tsx:28` |
| Unique title + description per page | **No duplicates** across all 19 pages | `src/data/seo.ts` |
| Title / description lengths | All ≤ 60 / ≤ 160 chars | longest title 58, longest description 157 |
| Canonical URL on every indexable route | Present and self-referencing | `buildMetadata` → `alternates.canonical` |
| Open Graph + Twitter cards | Complete on every page, with generated 1200×630 image | `src/app/og/[key]/route.tsx` |
| Language declaration | `<html lang="en-IN">` | `src/app/layout.tsx:73` |
| Robots + Googlebot directives | `max-image-preview:large`, `max-snippet:-1` | `src/lib/seo.ts` |
| `/robots.txt` | Valid, allows all, announces sitemap | `src/app/robots.ts` |
| `/sitemap.xml` | 19 URLs, all real and canonical, real `lastmod` from file mtimes | `src/app/sitemap.ts` |
| Structured data | Organization, WebSite, WebPage, SoftwareApplication, Service, Product, FAQPage, BreadcrumbList, ItemList — **57 blocks, 0 invalid** | `src/lib/schema.ts` |
| Stable `@id` references | `#organization`, `#website`, `#webpage`, `#product` | `src/lib/schema.ts:17-18` |
| No fake ratings/reviews/prices | Confirmed absent | — |
| One `<h1>` per page | Confirmed on all 19 | `Hero.tsx`, `PageHero.tsx` |
| Image optimisation | `next/image` everywhere, AVIF/WebP configured | `next.config.ts:7-9` |
| Image `alt` text | Descriptive; decorative images correctly `alt=""` | `src/data/site.ts` |
| Font loading | `next/font` with `display: swap` | `src/app/layout.tsx:12-23` |
| LCP handling | Hero poster explicitly preloaded with `fetchPriority: high` | `src/components/sections/Hero.tsx:15` |
| Client-side JS | Only **4** client components in the whole app | `ContactForm`, `Header`, `HeroVideo`, `ProjectFilter` |
| Third-party scripts | **None.** No analytics, no tag manager, no chat widget | — |
| Accessibility basics | Skip link, `aria-labelledby` sections, `aria-current`, focus rings | `src/app/layout.tsx:80` |
| Trailing-slash consistency | `/about/` → **308** → `/about` (verified live) | Next.js default |
| Broken internal links | **Zero**, across all 19 pages and all `#anchor` targets | crawled and verified |
| `/llms.txt` | Present, valid, generated from the same data | `src/app/llms.txt/route.ts` |

---

## 2. Problems found and FIXED in this pass

### 2.1 — HIGH · Footer linked to social platforms, not to Infiotix

**File:** `src/components/layout/Footer.tsx` (was lines 13–18)

The footer rendered four social icons pointing at:

```
https://www.linkedin.com      https://www.youtube.com
https://www.instagram.com     https://www.facebook.com
```

These are the platforms' own home pages. A visitor clicking "Infiotix on LinkedIn" landed on
LinkedIn's logged-out splash screen. Meanwhile `SOCIAL_PROFILES` in `src/lib/seo.ts` was an
empty array, so the Organization structured data declared **no** `sameAs` profiles at all.

**Why this is the most important item in the report:** `sameAs` pointing at verified profiles is
the strongest signal available for telling Google that "Infiotix Technologies" is a distinct
company. It is the mechanism Google uses to connect a website to a real-world organisation. You
were simultaneously shipping dead links *and* withholding the one signal that addresses your
stated problem.

**Fixed:** both the footer icons and the `sameAs` list now read from one list,
`socialProfiles` in `src/lib/seo.ts`. It is empty, so **no social icons currently render** —
this is deliberate and was chosen over keeping dead links. Add real URLs in that one place and
both the footer and the structured data pick them up.

**Still needs you:** the real profile URLs. See section 5.

---

### 2.2 — HIGH · The 404 page claimed to be the home page

**File:** `src/app/not-found.tsx`

`not-found.tsx` exported no `metadata`, so it inherited the root layout's — which meant every
404 response carried:

- the **home page's** `<title>` and `<meta name="description">`, and
- `<link rel="canonical" href="https://infiotix.com">`

A canonical tag on a 404 telling Google "this page is the home page" is wrong and can interfere
with how Google consolidates your canonical URLs. Any mistyped or stale URL a crawler hit served
this.

**Fixed:** `not-found.tsx` now exports its own metadata — own title, own description,
`alternates: {}` to clear the inherited canonical, and `robots: { index: false }`.

**Verified live:** `/this-definitely-does-not-exist` → `HTTP 404`, `robots: noindex`, no
canonical tag, title `Page not found | Infiotix Technologies`.

---

### 2.3 — MEDIUM · `/contact` was the only page rendered on demand

**Files:** `src/app/contact/page.tsx`, `src/components/forms/ContactForm.tsx`

The build marked `/contact` as `ƒ (Dynamic) — server-rendered on demand` while all 18 other
pages were static. The cause: the page read `searchParams` on the server to pre-select the
enquiry dropdown from `?interest=…`. In the App Router, touching `searchParams` opts the whole
page out of static generation.

The cost: every visit to one of your most important conversion pages required a Node render on
the VPS instead of serving a file from disk — a slower first byte, more CPU per visit, and a
slower crawl.

**Fixed:** the page no longer takes `searchParams`. `ContactForm` reads `?interest=` in the
browser after hydration instead, so the page is a static file *and* the pre-selection still
works. The whole form (all 13 dropdown options) is still in the prerendered HTML — this was not
traded for client-side rendering.

**Verified:** `/contact` is now `○ (Static)`. **Every route in the app is now statically
prerendered; there are no dynamic routes left.** The prefill logic was confirmed present in the
shipped client bundle, and all `?interest=` links pass values that exist in the dropdown.

---

### 2.4 — MEDIUM · Organization schema declared no service areas

**File:** `src/lib/schema.ts`

The Organization node had a `PostalAddress` with city/region/country but no `areaServed`, so
nothing told search engines *where Infiotix works*. For a company whose target market is
Pune/Maharashtra/India this is a missed, and completely safe, signal.

**Fixed:** added `areaServed` for Pune (City), Maharashtra (AdministrativeArea) and India
(Country) — all three already stated in the visible site copy, so nothing new is claimed.

Also added, in a way that stays dormant until you supply real data:

- `foundingDate` — emitted only if set
- `streetAddress` / `postalCode` — emitted only if set
- a `ProfessionalService` (LocalBusiness) node — emitted only if a real street address **and**
  postcode are present **and** explicitly enabled

All four live in `BUSINESS_PROFILE` in `src/lib/seo.ts`, documented inline. They are empty, so
current output is unchanged apart from `areaServed`.

---

### 2.5 — MEDIUM · The home page never said the company's name above the fold

**File:** `src/components/sections/Hero.tsx`

The `<h1>` is `Smart Software / Smarter Solutions` — a slogan. It contains neither the brand name
nor any indication of the industry. The company name first appeared in visible text well down the
page in the "About Infiotix" block.

Given that your specific problem is Google substituting a different brand, the first visible
sentence on the home page not naming the company is a real weakness.

**Fixed, without touching the design:** the paragraph directly under the headline changed from

> We build intelligent software and IoT solutions for a smarter, safer and more connected world.

to

> **Infiotix Technologies** builds intelligent software and IoT solutions for a smarter, safer and more connected world.

The `<h1>` and its styling are untouched. This is one word-level edit, not keyword stuffing —
the brand still appears naturally and only where it reads correctly.

---

### 2.6 — MEDIUM · Listing pages had almost no readable prose

**Files:** `src/app/software/page.tsx`, `src/app/iot-products/page.tsx`,
`src/app/solutions/page.tsx`, `src/data/seo.ts`, `src/components/sections/ServiceIntro.tsx` (new)

`/software` and `/iot-products` were built almost entirely from cards, icons and short headings.
Good for people, thin for search engines, which rank on sentences. Separately, four of the eight
service themes you listed had no real on-page coverage anywhere: web application development,
mobile application development, business automation, and "IoT solutions" as a phrase.

**Approach taken (your choice):** strengthen the existing pages rather than create four new
landing pages. Four thin pages overlapping `/software/custom-software-development` would compete
with each other for the same queries — the exact pattern that produces "Crawled, currently not
indexed".

**Fixed:**

- New `ServiceIntro` section component (prose + descriptive internal links), used on `/software`
  and `/iot-products`. Copy lives in `listingAbout` in `src/data/seo.ts`.
- `/software` prose covers *software development company in Pune*, *web application
  development*, *mobile application development* and *business automation*.
- `/iot-products` prose covers *IoT solutions company in Pune* and custom IoT work.
- Three new FAQs (which also flow into the existing `FAQPage` structured data automatically):
  web/mobile app development, business automation, custom IoT solutions.
- `/solutions` gained a fourth capability block, **Business Automation**, with
  `id="business-automation"`, linked from the footer and selectable in the enquiry form.

Every claim added is one the site already made elsewhere (chiefly the feature list of
`custom-software-development` in `src/data/products.ts`). **No new capability, client, number or
achievement was invented.**

---

### 2.7 — LOW · Three pages described themselves to search engines less than the others

**Files:** `src/app/privacy-policy/page.tsx`, `src/app/terms-and-conditions/page.tsx`,
`src/app/sitemap/page.tsx`

These emitted only `Organization`, `WebSite` and `BreadcrumbList` — no `WebPage` node, unlike
every other page. Cosmetic rather than harmful, but inconsistent.

**Fixed:** all three now emit a `WebPage` node via the existing `simplePageGraph` helper.

---

### 2.8 — LOW · README told you to copy a file that did not exist

**Files:** `.env.example` (new), `.gitignore`

The README says *"copy `.env.example` and set `NEXT_PUBLIC_SITE_URL`"*. No such file existed, and
`.gitignore`'s `.env*` rule would have excluded it anyway.

**Fixed:** created `.env.example` documenting the three variables the code actually reads
(`NEXT_PUBLIC_SITE_URL`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`) and added
`!.env.example` to `.gitignore`. **It contains no secrets** — only variable names and
instructions.

---

## 3. Problems found and deliberately NOT changed

### 3.1 — HIGH · www / http redirects cannot be verified from this repo

There is **no Nginx config, no PM2 config, no `ecosystem.config.js` and no `.env` file anywhere
in this workspace.** Phase 13 asked me to inspect the existing Nginx and PM2 setup; I am
reporting plainly that I could not, because it is not here — it lives on the VPS.

This matters: if `https://www.infiotix.com` and `https://infiotix.com` both return `200`, Google
sees two copies of all 19 pages. That alone could account for several of your 8 not-indexed URLs.
The canonical tags point at the non-www form, which helps, but canonical tags are a hint and
redirects are an instruction.

**Not changed, by your choice.** Exact copy-paste Nginx config and the commands to check which
redirects are currently live are in [HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md)
§2. **Run that check first — it is the highest-value thing you can do on the server.**

### 3.2 — HIGH · No verified street address, so no LocalBusiness schema

You indicated the full address exists but is not public yet. `BUSINESS_PROFILE` in
`src/lib/seo.ts` holds documented empty placeholders; LocalBusiness stays off until they are
filled. Steps in [LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md) §3.

### 3.3 — INFO · Unverified marketing claims, kept out of structured data

`src/data/site.ts:86-91` states `50+ Projects Delivered`, `30+ Happy Clients`,
`5+ Years Experience`. These were already on the site; I did not touch them.

**I deliberately did not put them into structured data**, and I recommend against it. Numeric
business claims in JSON-LD need to be substantiable. They are fine as visible marketing copy;
they are a liability as machine-readable claims. (`5+ Years Experience` is also the number to
reconcile with `foundingDate` when you set it.)

### 3.4 — LOW · ~21 MB of files that are never served

| Path | Size | Status |
| --- | --- | --- |
| `images/` (`image 1.png` … `image 10.png`) | **16 MB** | Originals, duplicated into `public/images/`. Outside `public/`, so never served — pure repo/deploy weight. |
| `public/videos/video 1.mp4` | **4.8 MB** | Source clip. README confirms it is "not used by the site directly" — but it **is** inside `public/`, so it is publicly downloadable and deployed. |
| `public/images/logoo.png` | 101 KB | Superseded by `logo-tight.png`; referenced only in a code comment. |

No SEO penalty, but it slows every deploy and `video 1.mp4` is an unnecessary 4.8 MB on your
server. **I did not delete these** — deleting source material is your call. Commands in
[HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §6.

### 3.5 — LOW · No `apple-icon`, no web manifest

`src/app/icon.png` exists and Next.js serves it as the favicon. There is no `apple-icon.png`
(iOS home-screen) or `manifest.ts`. Not a ranking factor; a polish item. Creating these needs
image assets, so I left them alone rather than generate artwork.

### 3.6 — LOW · README has drifted from the code

- References `src/app/icon.svg`; the actual file is `src/app/icon.png`.
- The closing "Placeholder links" note says Privacy / Terms / Sitemap "point to `#` until those
  pages exist" — all three pages now exist and are linked properly.
- Still says to add profile links to `SOCIAL_PROFILES`; the list is now `socialProfiles`
  (see §2.1).

Documentation only; no effect on the site.

---

## 4. Indexing analysis (12 indexed / 8 not indexed)

The site has exactly **19 indexable HTML pages**, and `/sitemap.xml` contains exactly those 19
URLs — no missing pages, no extras, no API routes, no admin paths, no redirected URLs, no
duplicates. Verified by crawl.

Your Search Console total of 12 + 8 = **20** is therefore one higher than the number of pages
that exist. That gap is itself a clue — the extra URL is likely a www duplicate, an old URL from
a previous version of the site, or a non-page URL. **Resolving the real cause needs the actual
per-URL status reasons from your Search Console, which I cannot see.**

Full per-URL decision procedure, including which pages you should *expect* to stay unindexed and
not worry about, is in [GOOGLE_INDEXING_ACTION_PLAN.md](GOOGLE_INDEXING_ACTION_PLAN.md).

---

## 5. What code cannot fix — and what is actually limiting you

Ranked by expected impact on the "Infiotix vs Infinix" problem:

1. **Create real social profiles and add their URLs** to `socialProfiles` in `src/lib/seo.ts`.
   Highest impact. Until Google can corroborate the brand from independent profiles, it will keep
   treating the name as a probable misspelling.
2. **Create and verify a Google Business Profile** for Pune.
   See [LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md).
3. **Verify which redirects are live on the VPS** (§3.1).
4. **Get mentions on other sites** — Indian B2B directories, Clutch, GitHub org, a LinkedIn
   company page with employees. Google needs corroboration from sources it already trusts.
5. **Submit a brand-name correction** via the "Did you mean / Showing results for" feedback link
   on the Google results page for "Infiotix Technologies".

> **On expectations:** everything in sections 2 and 4 improves your site's *eligibility* to rank
> and removes technical obstacles. None of it guarantees a position, and none of it takes effect
> until Google recrawls. Do not judge the outcome before the 30-day checkpoint in
> [GOOGLE_SEARCH_CONSOLE_GUIDE.md](GOOGLE_SEARCH_CONSOLE_GUIDE.md) §6.

---

## 6. Verification results

All run against the real production build on 4 October 2026.

| Check | Result |
| --- | --- |
| `npx eslint` | **Pass**, exit 0, no warnings |
| `npx tsc --noEmit` | **Pass**, exit 0 |
| `npm run build` | **Pass** — 44 static pages, 0 errors, 0 warnings |
| Dynamic routes remaining | **0** (was 1) |
| Pages returning HTTP 200 | **19 / 19** |
| Broken internal links | **0** |
| Broken `#anchor` targets | **0** |
| JSON-LD blocks parsed | **57**, invalid **0** |
| Duplicate `<title>` | **0** (was 1) |
| Duplicate descriptions | **0** (was 1) |
| Duplicate canonicals | **0** (was 1) |
| Pages with `noindex` | **1** — `/_not-found` only, which is correct |
| `/robots.txt` | HTTP 200, `text/plain`, valid, sitemap announced |
| `/sitemap.xml` | HTTP 200, valid XML, 19 URLs, all `https://infiotix.com` |
| `/llms.txt` | HTTP 200, `text/plain` |
| `/og/home` | HTTP 200, `image/png`, 1200×630 |
| Trailing slash | `/about/` → 308 → `/about` |
| 404 handling | HTTP 404 + `noindex` + no canonical |

> **Not measured:** Core Web Vitals. LCP, INP and CLS require real-device or lab measurement,
> which I cannot do from here, so **no score is claimed**. The changes in §2.3 and the
> pre-existing optimisations in §1 are expected to help LCP and TTFB. Measure with PageSpeed
> Insights after deploying — procedure in
> [GOOGLE_SEARCH_CONSOLE_GUIDE.md](GOOGLE_SEARCH_CONSOLE_GUIDE.md) §5.
