# Local SEO Checklist — Infiotix Technologies, Pune

**Date:** 4 October 2026
**Goal:** make Google recognise Infiotix Technologies as a real, distinct company in Pune — and
stop it suggesting "Infinix Technologies" instead.

---

## 0. Read this first

Your main problem is **not** on your website. It is that Infiotix has almost no verifiable
presence anywhere else on the internet.

Google decides that a brand name is a real entity — rather than a typo for a bigger, similar
brand — by finding **independent, corroborating sources**: a LinkedIn company page with real
employees, a verified Google Business Profile, directory listings, mentions in articles, other
sites linking to you. "Infinix" is a large phone manufacturer with tens of thousands of such
signals. "Infiotix" currently has its own website and little else, so Google's spelling model
assumes a typo.

**A website cannot solve this by itself, no matter how well optimised.** The code is now correct
and ready; what is missing is off-site evidence. The two highest-impact actions on this entire
page are **§1 (social profiles)** and **§2 (Google Business Profile)**. Everything else is
secondary.

### What the website already does correctly

| Signal | Status |
| --- | --- |
| Consistent business name — "Infiotix Technologies" everywhere | ✅ `src/data/site.ts` |
| Brand alias declared ("Infiotix") | ✅ `alternateName` in Organization + WebSite schema |
| Consistent phone — `+91 70584 09290` | ✅ Same in header, footer, contact page, schema |
| Consistent email — `info@infiotix.com` | ✅ Same everywhere |
| City/region/country in structured data | ✅ Pune / Maharashtra / IN |
| **Service areas declared** | ✅ Added in this pass — Pune, Maharashtra, India |
| Clear Contact page with all methods | ✅ `/contact` |
| Pune mentioned naturally in page copy and titles | ✅ Throughout |
| `sameAs` social profiles | ❌ **Empty — this is §1** |
| Street address in schema | ❌ **Not public yet — this is §3** |
| `foundingDate` | ❌ **Not set — this is §4** |
| LocalBusiness schema | ⏸️ Deliberately off until §3 is done |

---

## 1. Social profiles — do this first ⭐

**Impact: highest. Effort: low. This is the single most valuable item in this document.**

Until this is done, your Organization structured data tells Google: *"this company has no
profiles anywhere"* — which is indistinguishable from a company that doesn't exist.

### Step 1 — create the profiles (if they don't exist)

Priority order. A LinkedIn company page is by far the most important for a B2B software company.

| Platform | Priority | Notes |
| --- | --- | --- |
| **LinkedIn company page** | ⭐⭐⭐ Essential | Use the exact name "Infiotix Technologies". Add the logo, Pune location, and website link. **Have your team members list Infiotix as their employer** — employee connections are a strong authenticity signal. |
| **Google Business Profile** | ⭐⭐⭐ Essential | Covered separately in §2 |
| Instagram | ⭐⭐ Useful | Good for IoT product photos |
| YouTube | ⭐⭐ Useful | Software demo videos would also help the product pages |
| Facebook page | ⭐ Optional | Still carries weight for Indian local search |
| GitHub organisation | ⭐⭐ Useful | Strong credibility signal for a software company |

**For every profile, keep these identical to the website** — inconsistency actively hurts:

```
Name:    Infiotix Technologies
Phone:   +91 70584 09290
Email:   info@infiotix.com
Website: https://infiotix.com
City:    Pune, Maharashtra, India
```

### Step 2 — add the URLs to the website

Open `src/lib/seo.ts`, find `socialProfiles` (currently an empty array), and fill it in:

```ts
export const socialProfiles: SocialProfile[] = [
  { platform: "LinkedIn",  url: "https://www.linkedin.com/company/YOUR-REAL-HANDLE" },
  { platform: "Instagram", url: "https://www.instagram.com/YOUR-REAL-HANDLE" },
  { platform: "YouTube",   url: "https://www.youtube.com/@YOUR-REAL-HANDLE" },
  { platform: "Facebook",  url: "https://www.facebook.com/YOUR-REAL-HANDLE" },

  // No icon for these, so keep them out of the footer but still declare them:
  { url: "https://www.google.com/maps/place/?q=place_id:YOUR_PLACE_ID", footer: false },
  { url: "https://github.com/YOUR-ORG", footer: false },
];
```

**One edit updates two things:** the footer icons reappear, and the URLs are added to the
Organization `sameAs` list in the structured data. You do not need to touch `Footer.tsx`.

Add only profiles that **actually exist and open an Infiotix page**. A URL that 404s or lands on
a platform's login screen is worse than no URL — that was the problem this pass fixed.

### Step 3 — deploy and verify

```bash
npm run build          # required: these values are read at build time
```

Then deploy ([HOSTINGER_DEPLOYMENT_GUIDE.md](HOSTINGER_DEPLOYMENT_GUIDE.md) §3) and confirm:

```bash
curl -s https://infiotix.com | grep -o '"sameAs":\[[^]]*\]'
```

Finally paste `https://infiotix.com` into
**https://search.google.com/test/rich-results** and check the Organization block lists your
profiles.

- [ ] Profiles created
- [ ] URLs added to `socialProfiles`
- [ ] Built and deployed
- [ ] `sameAs` confirmed in live HTML
- [ ] Cross-linked: each profile also links back to `https://infiotix.com`

---

## 2. Google Business Profile ⭐

**Impact: highest for local search. Effort: medium (needs verification).**

This is what puts Infiotix in Google Maps and in the box on the right of branded search results.
It is also one of the strongest possible brand-entity signals.

### Decide your business type first

| If you... | Choose |
| --- | --- |
| Have an office customers can visit | **Storefront** — the address will be shown publicly |
| Work from an office but don't receive customers | **Service-area business** — you give Google the address for verification but it is **not shown publicly** |

**If your reason for not publishing the address is privacy, use the service-area option.** You
get the full local-SEO benefit without the address appearing on Maps. This is a very common
setup for software companies and it is entirely legitimate.

### Steps

1. Go to **https://business.google.com** and sign in
2. Search "Infiotix Technologies" — **check it doesn't already exist** (auto-generated or created
   by an ex-employee). If it does, click **"Claim this business"** rather than creating a duplicate
3. Create the profile:
   ```
   Business name:  Infiotix Technologies      ← exactly this, no extra keywords
   Category:       Software company            ← primary
   Additional:     Website designer · Computer consultant · Home automation company
   Phone:          +91 70584 09290
   Website:        https://infiotix.com
   Service areas:  Pune, Pimpri-Chinchwad, Maharashtra, India
   ```
   > **Do not** put keywords in the business name ("Infiotix Technologies – Software Development
   > Pune"). It violates Google's guidelines and can get the profile suspended. The name field
   > must match your real trading name.
4. **Verify** — Google will offer postcard, phone, email or video verification. Video is now
   common for Indian service-area businesses; have your office, signage and equipment ready to film
5. Complete the profile:
   - [ ] Logo (`public/images/logo-tight.png`) and cover image
   - [ ] Real photos of the office/team — stock images reduce trust
   - [ ] Opening hours (your site says 24/7 *support*; set your actual *office* hours here)
   - [ ] Description (750 chars max) — adapt the first paragraph from `/about`, mention Pune,
         software and IoT naturally, **no keyword stuffing**
   - [ ] Services — add Hospital Management Software, School Management Software, Gym Management
         Software, Custom Software Development, Web Application Development, Mobile Application
         Development, Business Automation, IoT Solutions, Home Automation, Smart Door Locks
   - [ ] Products — your four IoT products with photos
6. **Copy your Place ID** (find it at https://developers.google.com/maps/documentation/places/web-service/place-id)
   and add the Maps URL to `socialProfiles` with `footer: false` (§1 Step 2)
7. **Ask genuine customers for reviews.** Never buy reviews, never post them yourself, never
   offer incentives — all three are detectable and can get the profile suspended.
   > Reviews live on your Google profile. They must **not** be copied into the website's
   > structured data as `aggregateRating` — self-reported ratings in JSON-LD are a manual-action
   > risk. The code currently has none, correctly.

- [ ] Profile created or claimed
- [ ] **Verified**
- [ ] Fully completed
- [ ] Place ID added to `socialProfiles`

---

## 3. Street address → LocalBusiness schema

You said the full address exists but is not public yet. The code is already wired for it and
waiting.

### When you are ready

Open `src/lib/seo.ts`, find `BUSINESS_PROFILE`:

```ts
export const BUSINESS_PROFILE = {
  streetAddress: "",        // ← e.g. "Office 204, Example Business Park, Baner Road"
  postalCode: "",           // ← e.g. "411045"
  foundingDate: "",         // ← see §4
  localBusiness: false,     // ← set true ONLY after the two above are real
};
```

### Rules

1. Fill in `streetAddress` **and** `postalCode` — both, or neither
2. The address must be **byte-identical** to your Google Business Profile address. "Rd" vs
   "Road", or a different suite format, weakens the match
3. Only then set `localBusiness: true`. This adds a `ProfessionalService` node to your structured
   data
4. `npm run build` and deploy — these are build-time values
5. Validate at **https://search.google.com/test/rich-results**

### Why it is gated

> Never set `localBusiness: true` with a guessed, partial or placeholder address. LocalBusiness
> schema asserts a physical premises. An invented one can earn a structured-data manual action in
> Search Console, which is far worse than having no LocalBusiness schema at all.
>
> **Until then, nothing is wrong.** The site claims Pune/Maharashtra/India, which is true, plus
> the new `areaServed`. That is accurate and carries zero risk.

- [ ] `streetAddress` filled with the verified address
- [ ] `postalCode` filled
- [ ] Matches Google Business Profile **exactly**
- [ ] `localBusiness: true`
- [ ] Rebuilt, deployed, validated

---

## 4. Founding date

Same `BUSINESS_PROFILE` block. Set `foundingDate` to the real year the company started:

```ts
foundingDate: "2020",          // or "2020-06-01" if you want the exact date
```

**Reconcile it with your own site.** `src/data/site.ts` currently shows **"5+ Years
Experience"** in the home page hero. In October 2026 that implies founding in 2021 or earlier. If
the real founding year contradicts that statistic, fix the statistic too — a date in structured
data that contradicts visible page copy is a bad signal, and the claim should be accurate
regardless.

- [ ] Real founding year confirmed
- [ ] `foundingDate` set
- [ ] Consistent with the "5+ Years Experience" claim (adjust whichever is wrong)

---

## 5. Directory and citation consistency

Google corroborates businesses through consistent listings ("citations"). The requirement is
**identical** details everywhere — inconsistency is worse than absence.

Use exactly:

```
Infiotix Technologies
+91 70584 09290
info@infiotix.com
https://infiotix.com
Pune, Maharashtra, India
```

### Worth doing (Indian B2B / software)

- [ ] **LinkedIn company page** (§1 — most important)
- [ ] **Google Business Profile** (§2)
- [ ] Justdial
- [ ] IndiaMART
- [ ] Sulekha
- [ ] Clutch.co — strong for software firms; profile + verified client reviews
- [ ] GoodFirms
- [ ] Bing Places (set `BING_SITE_VERIFICATION` too — already supported in `.env.example`)
- [ ] Apple Business Connect
- [ ] Local Pune business / IT association directories
- [ ] GitHub organisation (§1)

### Avoid

- Paid link schemes and "500 directories for ₹999" packages — these are link spam
- Any listing requiring a different business name
- Listings you can't keep updated

---

## 6. The "Infinix" autocorrect specifically

Google is substituting a better-known brand. There is no switch for this; it resolves as Infiotix
accumulates its own signals. In rough order of effect:

1. **§1 and §2** — real linked profiles and a verified Business Profile. These do most of the work
2. **Submit feedback directly:** search `Infiotix Technologies` on Google. If it shows *"Showing
   results for Infinix Technologies — Search instead for Infiotix Technologies"*, **click "Search
   instead for Infiotix Technologies"**. That click is a signal. Ask colleagues to do the same —
   genuinely, not in bulk from one machine
3. **Use the full name consistently** in every off-site profile and mention. Always "Infiotix
   Technologies", never shortened in formal listings
4. **Earn mentions on sites Google trusts** — a guest article, a local tech meetup listing, a
   university collaboration page, a press mention. One mention on a trusted domain is worth more
   than fifty directory listings
5. **Wikidata** — once you have enough independent coverage (a Business Profile, a LinkedIn page,
   and ideally press mentions), a Wikidata entry can help Google's entity graph. Do **not** attempt
   this early: entries for companies without independent coverage get deleted, and it wastes effort

> **Timescale, honestly:** brand entity recognition takes **1–6 months** after §1 and §2 are
> genuinely done. It is not a code change and it will not happen in a fortnight. Nothing in this
> document guarantees the autocorrect will stop — it guarantees you are no longer invisible to
> the systems that decide.

- [ ] Clicked "Search instead for Infiotix Technologies"
- [ ] Full name used consistently across all profiles
- [ ] At least one mention earned on an independent, trusted site

---

## 7. Priority order

| Order | Action | Section | Effort | Impact |
| --- | --- | --- | --- | --- |
| 1 | LinkedIn company page + add URL to `socialProfiles` | §1 | Low | ⭐⭐⭐ |
| 2 | Google Business Profile, created **and verified** | §2 | Medium | ⭐⭐⭐ |
| 3 | Remaining social profiles + URLs | §1 | Low | ⭐⭐ |
| 4 | Clutch / GoodFirms / Justdial / IndiaMART | §5 | Medium | ⭐⭐ |
| 5 | Street address + `localBusiness: true` | §3 | Low | ⭐⭐ |
| 6 | `foundingDate` (+ fix the "5+ years" claim if needed) | §4 | Low | ⭐ |
| 7 | Brand feedback clicks | §6 | Low | ⭐ |
| 8 | Earn an independent mention | §6 | High | ⭐⭐⭐ |

**If you only do two things: §1 and §2.** Together they address the majority of your stated
problem, and neither requires a developer.
