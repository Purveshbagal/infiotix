# Infiotix Technologies – website

Marketing site for **Infiotix Technologies** (smart software + IoT solutions), built with
**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Where things live

```
src/
  app/
    layout.tsx          fonts (Inter + Mrs Saint Delafield), SEO metadata
    page.tsx            page = Header + sections + Footer
    globals.css         design tokens, fluid root font-size, shared classes
    icon.svg            favicon (infinity mark)
  components/
    layout/             Header (scroll-spy + mobile menu), Footer, WhatsAppButton
    sections/           Hero, ProcessStrip, SoftwareSolutions, IoTProducts,
                        Industries (+ Why choose), CtaBanner
    ui/                 Logo, Button, SectionHeading, HeroVideo, Robot, GlobeSkyline, BrandIcons
  data/site.ts          ALL copy, links, phone/e-mail, cards, icons – edit content here
public/images/          optimised source photos (see mapping below)
images/                 original files as supplied (untouched)
```

## Image mapping

| Original        | Used as (`public/images/`)  | Section                    |
| --------------- | --------------------------- | -------------------------- |
| `image 2.png`   | `software-hospital.png`     | Hospital Management System |
| `image 3.png`   | `software-school.png`       | School Management System   |
| `image 4.png`   | `software-gym.png`          | Gym Management System      |
| `image 5.png`   | `software-custom.png`       | Custom Software Development|
| `image 7.png`   | `iot-door-lock.png`         | Smart Door Lock            |
| `image 8.png`   | `iot-water-tank.png`        | Water Tank Level Monitor   |
| `image 9.png`   | `iot-home-automation.png`   | Home Automation            |
| `image 10.png`  | `iot-door-bell.png`         | Smart Door Bell            |
| _`image 6.png` (not supplied)_ | `cta-banner.png` (optional) | "Let's Build a Smarter Tomorrow" banner |

Drop a photo at `public/images/cta-banner.png` and the CTA banner picks it up
automatically (restart the dev server / rebuild). Until then a designed placeholder is shown.

## Hero video

The hero background is a looping video (`src/components/ui/HeroVideo.tsx`):

| File                            | Purpose                                                        |
| ------------------------------- | -------------------------------------------------------------- |
| `public/videos/video 1.mp4`     | Source clip (1280×720, 20 s, 30 fps) – not used by the site directly |
| `public/videos/hero-loop.mp4`   | What the site plays – see below                                |
| `public/videos/hero-poster.jpg` | First frame; shown until playback starts / if autoplay is blocked |

`hero-loop.mp4` is derived from the source because a plain `loop` would show a hard cut
(first and last frame differ) and a small freeze (the audio track is a few ms longer than the video):
the audio is removed and the last 1.5 s are cross-dissolved into the first 1.5 s, so the wrap-around
is as smooth as any other pair of frames. The source is full-range BT.601 (`yuvj420p`), so it is also
converted to the web-standard BT.709 limited range. To rebuild it (after replacing `video 1.mp4`)
for a clip of length **L** seconds (dissolve **F** = 1.5 s → `offset = L − 2F`,
`trim duration = L − F`, `trim start = F`):

```bash
ffmpeg -i "public/videos/video 1.mp4" -an -filter_complex \
 "[0:v]fps=30,scale=in_range=full:in_color_matrix=bt601:out_range=tv:out_color_matrix=bt709,format=yuv420p,setpts=PTS-STARTPTS,split=2[a][b];[a]trim=start=1.5,setpts=PTS-STARTPTS[body];[b]setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1.5:offset=17,trim=duration=18.5,setpts=PTS-STARTPTS[v]" \
 -map "[v]" -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 19 -pix_fmt yuv420p \
 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv -r 30 -movflags +faststart public/videos/hero-loop.mp4
ffmpeg -i public/videos/hero-loop.mp4 -frames:v 1 -q:v 2 public/videos/hero-poster.jpg
```

(For a clip that is already BT.709 limited-range, drop the `scale=…` part of the filter.)

The component pauses the video while it is off-screen or the tab is hidden, and shows only the
poster for visitors who prefer reduced motion. The files are requested as `…mp4?v=<modified time>`
and cached for a year, so replacing `hero-loop.mp4` / `hero-poster.jpg` shows the new video
straight away (in dev just reload; for production rebuild).

## SEO

Everything search engines look at is generated from a few files, so a new page/product only has to be added in one place.

| What | Where |
| ---- | ----- |
| Titles, descriptions, keywords, share-card text, product "About" paragraphs, home FAQ | `src/data/seo.ts` |
| Canonical URL, Open Graph + Twitter cards, robots meta (`buildMetadata`), site address (`SITE_URL`) | `src/lib/seo.ts` |
| Structured data (Organization, WebSite, WebPage, SoftwareApplication / Service / Product, FAQPage, BreadcrumbList, ItemList) | `src/lib/schema.ts` + `src/components/seo/JsonLd.tsx` |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/llms.txt/route.ts` |
| 1200×630 share images (`/og/<key>`, made at build time) | `src/app/og/[key]/route.tsx` |

**Before going live** copy `.env.example` and set `NEXT_PUBLIC_SITE_URL` to the exact public address
(with or without `www`, whichever you will use). Rebuild after changing it.

**Adding a product or page:** add it to `src/data/products.ts`, add its entry to `productSeo`
(or `pageSeo`) in `src/data/seo.ts`, and the page metadata, sitemap entry, share image and
structured data follow automatically. Keep titles ≤ ~60 and descriptions ≤ ~160 characters and unique.

**Rules the markup follows:** only facts that are true and visible on the page (no invented ratings,
reviews, prices or addresses); FAQ structured data matches the visible FAQ; one `<h1>` per page.
Add real profile links to `SOCIAL_PROFILES` in `src/lib/seo.ts` once those accounts exist.

**What code cannot do** (needs you): verify the site in Google Search Console and submit
`/sitemap.xml`, create a Google Business Profile, list the company on relevant directories and get
other sites to link to it. Rankings depend on those, on competition and on time; no site can be
guaranteed a position.

## Design notes

- **Font sizes** have one global knob: `--type-scale` in `src/app/globals.css`
  (`0.94` on mobile/tablet, `0.86` on desktop). Text uses the `fs-NN` utility
  (`fs-90` = 0.90 rem × scale, never below `--fs-floor`), so layout and spacing are unaffected.

- Desktop (≥ 1280 px) scales fluidly: the root font-size follows the viewport
  (16 px at 1440 px), so every `rem` value keeps the proportions of the design.
- Below 1280 px the layout switches to a mobile-first stack (hamburger menu,
  1–2 column card grids).
- Per-photo crops are set in `src/data/site.ts` (`position`, `scale`, `origin`),
  e.g. to hide text that is baked into a photo.
- Placeholder links: "View Details" / "Get a Quote" jump to the contact banner;
  Privacy / Terms / Sitemap point to `#` until those pages exist.
