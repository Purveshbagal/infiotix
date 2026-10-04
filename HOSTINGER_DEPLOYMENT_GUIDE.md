# Hostinger VPS Deployment Guide — infiotix.com

**Date:** 4 October 2026
**Stack:** Next.js 16.3.5 · Node.js · PM2 · Nginx · Hostinger VPS

---

## 0. Important: I could not inspect your server

**There is no Nginx config, no PM2 config (`ecosystem.config.js`), no `.env` file and no CI
configuration anywhere in this repository.** I searched the whole workspace.

Phase 13 of your brief asked me to inspect the existing Nginx and PM2 setup before changing
anything. I am telling you plainly that I could not, because none of it is in the workspace — it
lives on the VPS, which I have no access to.

**Consequences:**

- Every command below is **written to be run by you**, after you have confirmed it matches your
  actual setup. Paths, the PM2 process name and the Nginx file name are **assumptions** — verify
  them with §1 before running anything in §2 or §3.
- **I have not changed any server configuration, restarted any service, touched any `.env`, or
  modified DNS.** Nothing in this document has been executed.
- `next.config.ts` has **no redirects added** — per your decision, host redirects stay in Nginx.

> ⚠️ Read §1 first. Do not paste commands from §2 or §3 until §1 confirms your real paths and
> process name.

---

## 1. Find out what you actually have

SSH in and run these **read-only** commands. Nothing here changes anything.

```bash
ssh root@YOUR_SERVER_IP          # or your configured user

# --- Node / npm versions (Next.js 16 needs Node 20.9+; Node 20 LTS or 22 LTS recommended) ---
node -v
npm -v

# --- PM2: what is running, and what is the real process name? ---
pm2 list
pm2 describe 0                   # repeat for each id; note "exec cwd" and "script path"

# --- Where is the app checked out? ---
pm2 jlist | grep -o '"pm_cwd":"[^"]*"'

# --- Nginx: which config files exist and which server_names do they claim? ---
nginx -v
ls -la /etc/nginx/sites-enabled/
ls -la /etc/nginx/conf.d/        2>/dev/null
grep -rn "server_name\|proxy_pass\|root " /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null

# --- Does an env file already exist? (DO NOT print it if it may contain secrets) ---
ls -la /path/to/your/app/.env*   # substitute the pm_cwd you found above

# --- SSL certificates ---
certbot certificates 2>/dev/null || ls -la /etc/letsencrypt/live/ 2>/dev/null
```

Write down, because the rest of this guide needs them:

| Thing | Your value |
| --- | --- |
| App directory (`pm_cwd`) | `________________` |
| PM2 process name | `________________` |
| Nginx site config file | `________________` |
| Node version | `________________` |
| Env file path (if any) | `________________` |

---

## 2. ⭐ Check your redirects — do this before anything else

**This is the highest-value server task in this document.** If `www.infiotix.com` serves pages
instead of redirecting, Google sees two copies of all 19 pages, which can by itself explain
several of your 8 not-indexed URLs.

### 2.1 Test what happens now

Run these **from your own computer**, not the server:

```bash
# Each should end at https://infiotix.com/... with a 301
curl -sSIL http://infiotix.com       | grep -iE "^HTTP/|^location:"
curl -sSIL http://www.infiotix.com   | grep -iE "^HTTP/|^location:"
curl -sSIL https://www.infiotix.com  | grep -iE "^HTTP/|^location:"

# And a deep page, to confirm the path is preserved (not dumped at the home page)
curl -sSIL https://www.infiotix.com/software/hospital-management-system \
  | grep -iE "^HTTP/|^location:"
```

### 2.2 Read the result

| What you see | Meaning | Action |
| --- | --- | --- |
| `301` → `https://infiotix.com/...`, path preserved | ✅ Correct | Nothing to do. Skip to §3 |
| `200 OK` on any `www` or `http` URL | ❌ **Duplicate content** | Apply §2.3 |
| `301` → `https://infiotix.com` (path lost) | ❌ All deep links dumped at home page | Apply §2.3 |
| Two or more hops (`http://www` → `https://www` → `https://`) | ⚠️ Redirect chain — works but wasteful | §2.3 fixes it in one hop |
| `curl: (6)` / `(7)` on `www` | `www` DNS doesn't resolve at all | Acceptable, but §2.3 is tidier |

### 2.3 Nginx config for the canonical host

**Back up first:**

```bash
sudo cp /etc/nginx/sites-enabled/YOUR_SITE_FILE ~/nginx-site-backup-$(date +%F).conf
```

Then edit so the structure is **three** server blocks. Replace `YOUR_APP_PORT` with the port PM2
serves on (commonly `3000`) and keep your existing `ssl_certificate` lines exactly as Certbot
wrote them.

```nginx
# 1) All plain HTTP -> canonical HTTPS, in one hop, path preserved
server {
    listen 80;
    listen [::]:80;
    server_name infiotix.com www.infiotix.com;

    # Let Certbot renew without being redirected away
    location /.well-known/acme-challenge/ { root /var/www/html; }

    location / { return 301 https://infiotix.com$request_uri; }
}

# 2) HTTPS www -> canonical non-www
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.infiotix.com;

    # must cover www as well - see §2.4
    ssl_certificate     /etc/letsencrypt/live/infiotix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/infiotix.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://infiotix.com$request_uri;
}

# 3) The real site
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name infiotix.com;

    ssl_certificate     /etc/letsencrypt/live/infiotix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/infiotix.com/privkey.pem;
    include             /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam         /etc/letsencrypt/ssl-dhparams.pem;

    # Next.js serves pre-compressed assets poorly through a proxy without this
    gzip              on;
    gzip_proxied      any;
    gzip_comp_level   5;
    gzip_min_length   256;
    gzip_types        text/plain text/css application/javascript application/json
                      application/xml image/svg+xml;

    # Hashed build assets never change - cache them hard
    location /_next/static/ {
        proxy_pass http://127.0.0.1:YOUR_APP_PORT;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass         http://127.0.0.1:YOUR_APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }
}
```

> **Do not add a `robots.txt` or `sitemap.xml` `location` block.** The Next.js app generates both.
> An Nginx override would shadow them — a cause of the "Blocked by robots.txt" report described in
> [GOOGLE_INDEXING_ACTION_PLAN.md](GOOGLE_INDEXING_ACTION_PLAN.md) §3.7.

Apply it:

```bash
sudo nginx -t                    # MUST print "syntax is ok" / "test is successful"
sudo systemctl reload nginx      # reload, not restart - no dropped connections
```

If `nginx -t` fails, **do not reload**. Restore and investigate:

```bash
sudo cp ~/nginx-site-backup-*.conf /etc/nginx/sites-enabled/YOUR_SITE_FILE
sudo nginx -t
```

### 2.4 Make sure the certificate covers `www`

Block 2 terminates TLS for `www.infiotix.com`, so the certificate must include that name —
otherwise visitors hitting `https://www.` get a browser security warning *before* the redirect
runs.

```bash
certbot certificates      # check "Domains:" lists BOTH infiotix.com and www.infiotix.com
```

If `www` is missing:

```bash
sudo certbot --nginx -d infiotix.com -d www.infiotix.com
```

If `www.infiotix.com` has no DNS record, that command fails. Either add an `A`/`CNAME` record for
`www` pointing at the same server (recommended — then the redirect works properly), or drop
server block 2 and remove `www.infiotix.com` from block 1's `server_name`.

> **DNS:** I have not changed and cannot change any DNS record. Adding a `www` record is your
> decision, made in the Hostinger DNS panel.

### 2.5 Re-test

```bash
for u in http://infiotix.com http://www.infiotix.com https://www.infiotix.com; do
  echo "--- $u"; curl -sSIL "$u" | grep -iE "^HTTP/|^location:"
done
curl -sSI https://infiotix.com | head -1      # expect: HTTP/2 200
```

- [ ] `http://infiotix.com` → 301 → `https://infiotix.com`
- [ ] `http://www.infiotix.com` → 301 → `https://infiotix.com`
- [ ] `https://www.infiotix.com` → 301 → `https://infiotix.com`
- [ ] Deep paths preserved
- [ ] `https://infiotix.com` → 200
- [ ] Certificate covers both names

---

## 3. Deploy this build

### 3.1 Before you start

- [ ] §1 done — you know your real app path and PM2 process name
- [ ] You have a way to roll back (§7)
- [ ] You are deploying at a low-traffic time

### 3.2 Get the code onto the server

**This workspace is not a git repository** (I checked). So either initialise one and push, or
upload the files directly.

**If you use git:**

```bash
cd /path/to/your/app
git status                       # confirm nothing local will be lost
git pull origin main
```

**If you upload directly** — from your own machine. Note the excludes: never overwrite the
server's `node_modules`, `.next` or `.env` files.

```bash
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env*' \
  --exclude '.git' \
  --exclude 'images/' \
  "C:/Users/Admin/Downloads/infiotix-master/" \
  root@YOUR_SERVER_IP:/path/to/your/app/
```

> `--exclude 'images/'` skips the 16 MB of unused originals (see §6). Drop that line if you want
> them on the server.
>
> ⚠️ `--delete` removes server files that no longer exist locally. Run once with `--dry-run`
> first and read the output.

### 3.3 Environment variables

The app reads three variables, **all at build time**:

| Variable | Required | Value |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://infiotix.com` (no trailing slash) |
| `GOOGLE_SITE_VERIFICATION` | Optional | Search Console HTML-tag content value |
| `BING_SITE_VERIFICATION` | Optional | Bing `msvalidate.01` content value |

`.env.example` in the repo documents all three. On the server:

```bash
cd /path/to/your/app
cp .env.example .env.production   # ONLY if .env.production does not already exist
nano .env.production
```

> ⚠️ **If `.env.production` already exists, do not overwrite it.** Open it and add only the
> missing keys. I have not touched any env file.
>
> `SITE_URL` defaults to `https://infiotix.com` in code, so the site is correct even with no env
> file at all. Set it explicitly anyway, so the canonical host is never ambiguous.
>
> **These are build-time values.** Changing `.env.production` and only restarting PM2 does
> nothing — you must rebuild.

### 3.4 Install, build, restart

```bash
cd /path/to/your/app

# Exact, reproducible install from the lockfile
npm ci

# Production build (~30s on a typical VPS)
npm run build

# Restart - substitute YOUR real PM2 process name from §1
pm2 restart YOUR_PROCESS_NAME --update-env
pm2 save

pm2 list
pm2 logs YOUR_PROCESS_NAME --lines 40
```

> **`npm ci` not `npm install`** — `ci` installs exactly what `package-lock.json` specifies and
> won't silently upgrade anything mid-deploy.
>
> **Low-RAM VPS:** if `npm run build` is killed (exit 137 / OOM) on a 1 GB plan, build with a
> swap file or build locally and rsync the `.next` directory up (also copy `package.json` and
> `node_modules`, and keep Node versions identical).
>
> **I have not restarted anything.** Run the restart yourself when ready.

### 3.5 First-run check

If this is a fresh PM2 setup rather than a restart:

```bash
cd /path/to/your/app
pm2 start npm --name infiotix -- start
pm2 save
pm2 startup          # prints a command to run - it survives reboots
```

---

## 4. Post-deploy verification

Run from your own machine. **Expected output is given for each**, so you can spot a failure.

```bash
# 1) Home page - expect: HTTP/2 200
curl -sSI https://infiotix.com | head -1

# 2) robots.txt - expect exactly the 4 lines shown
curl -s https://infiotix.com/robots.txt
#   User-Agent: *
#   Allow: /
#
#   Sitemap: https://infiotix.com/sitemap.xml

# 3) sitemap - expect: 19
curl -s https://infiotix.com/sitemap.xml | grep -c "<loc>"

# 4) sitemap must contain NO www and NO http:// URLs - expect: 0 and 0
curl -s https://infiotix.com/sitemap.xml | grep -c "www\."
curl -s https://infiotix.com/sitemap.xml | grep -c "<loc>http://"

# 5) Canonical on the home page - expect: https://infiotix.com
curl -s https://infiotix.com | grep -o 'rel="canonical" href="[^"]*"'

# 6) No accidental noindex on a real page - expect: NO noindex
curl -s https://infiotix.com | grep -o 'name="robots" content="[^"]*"'

# 7) 404 behaves correctly - expect: 404, and NO canonical line
curl -sSI https://infiotix.com/this-does-not-exist | head -1
curl -s  https://infiotix.com/this-does-not-exist | grep -c 'rel="canonical"'   # expect 0

# 8) Trailing slash - expect: 308 -> https://infiotix.com/about
curl -sSI https://infiotix.com/about/ | grep -iE "^HTTP/|^location:"

# 9) Share image - expect: HTTP/2 200, content-type: image/png
curl -sSI https://infiotix.com/og/home | grep -iE "^HTTP/|^content-type"

# 10) llms.txt - expect: HTTP/2 200
curl -sSI https://infiotix.com/llms.txt | head -1

# 11) Structured data present - expect: 2 or more
curl -s https://infiotix.com | grep -c 'application/ld+json'

# 12) New service areas present - expect: areaServed
curl -s https://infiotix.com | grep -o 'areaServed'

# 13) Brand name in visible home page copy - expect: a match
curl -s https://infiotix.com | grep -o 'Infiotix Technologies builds intelligent software'

# 14) Social profiles - expect NOTHING until LOCAL_SEO_CHECKLIST.md §1 is done
curl -s https://infiotix.com | grep -o '"sameAs":\[[^]]*\]'
```

Then check all 19 pages return 200:

```bash
curl -s https://infiotix.com/sitemap.xml \
  | grep -o '<loc>[^<]*</loc>' | sed 's/<[^>]*>//g' \
  | while read -r u; do printf "%-62s %s\n" "$u" "$(curl -s -o /dev/null -w '%{http_code}' "$u")"; done
```

Every line should end in `200`.

Finally, in a browser:

- [ ] Home page looks unchanged apart from the new first paragraph
- [ ] Footer has **no** social icons (expected until §1 of the local SEO checklist)
- [ ] `/software` and `/iot-products` show the new "About" prose section
- [ ] `/solutions` shows the Business Automation block
- [ ] **`/contact?interest=Smart%20Door%20Lock`** pre-selects "Smart Door Lock" in the dropdown —
      this confirms the static-page change kept the prefill working
- [ ] Contact form's WhatsApp and Email buttons still open correctly
- [ ] Mobile menu, hero video and animations all behave as before

Validate the structured data:

- **https://search.google.com/test/rich-results** → paste `https://infiotix.com`
- **https://validator.schema.org** → paste the same

---

## 5. Monitoring and troubleshooting

```bash
pm2 status
pm2 logs infiotix --lines 200
pm2 monit                                  # live CPU / memory
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
free -h                                    # memory
df -h                                      # disk
```

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| 502 Bad Gateway | App not running, or Nginx `proxy_pass` port ≠ app port | `pm2 list`; compare the port in your Nginx config |
| Site serves old content | Build didn't run, or PM2 wasn't restarted | `npm run build && pm2 restart NAME` |
| Env change had no effect | They are build-time values | Rebuild, don't just restart |
| `robots.txt` content is wrong | Nginx or Hostinger overriding it | Remove any `robots.txt` `location` block |
| Build killed, exit 137 | Out of memory | Add swap, or build locally and rsync `.next` |
| `Cannot find name 'PageProps'` from `tsc` | No `.next/types` yet | Run `npm run build` once first — see below |
| Styles missing after deploy | Stale `.next` | `rm -rf .next && npm run build` |

> **On that TypeScript error:** on a clean checkout with no `.next/` directory,
> `npx tsc --noEmit` reports `Cannot find name 'PageProps'` / `LayoutProps`. This is **not** a
> code defect — in Next.js 16 these are global helper types generated into `.next/types` by
> `next build`. Order matters if you add type checking to CI: build first, then typecheck.

---

## 6. Optional cleanup (~21 MB)

Not required and **not done by me** — deleting source material is your call.

| Path | Size | Notes |
| --- | --- | --- |
| `images/` | 16 MB | Original supplied photos, already copied into `public/images/`. Outside `public/`, so never served. |
| `public/videos/video 1.mp4` | 4.8 MB | Source clip. README says it is not used by the site — but it **is** in `public/`, so it is publicly downloadable. |
| `public/images/logoo.png` | 101 KB | Superseded by `logo-tight.png`; referenced only in a comment. |

Before deleting `video 1.mp4`, note that `README.md` documents the `ffmpeg` command that rebuilds
`hero-loop.mp4` **from it**. Keep a copy off-server if you may ever need to regenerate the hero
video.

```bash
# Keep the originals off the server without deleting them anywhere:
#   add  --exclude 'images/'  to the rsync in §3.2   (already included above)

# If you decide to remove the unused public video from the SERVER only:
mv "/path/to/your/app/public/videos/video 1.mp4" ~/infiotix-source-backup/
cd /path/to/your/app && npm run build && pm2 restart YOUR_PROCESS_NAME
```

---

## 7. Rollback

**Before deploying, know your way back.**

```bash
# git-based
cd /path/to/your/app
git log --oneline -5
git checkout <previous-good-commit>
npm ci && npm run build
pm2 restart YOUR_PROCESS_NAME

# Nginx only
sudo cp ~/nginx-site-backup-YYYY-MM-DD.conf /etc/nginx/sites-enabled/YOUR_SITE_FILE
sudo nginx -t && sudo systemctl reload nginx
```

If you are not using git, take a snapshot before you deploy:

```bash
cd /path/to
tar czf ~/infiotix-backup-$(date +%F-%H%M).tar.gz \
  --exclude node_modules --exclude .next your-app-dir/
```

Hostinger VPS plans also include snapshots — taking one from the hPanel before deploying is the
simplest safety net of all.

---

## 8. Quick reference

```bash
# Deploy (after §1 confirms your paths)
cd /path/to/your/app && git pull && npm ci && npm run build && pm2 restart infiotix

# Verify
curl -sSI https://infiotix.com | head -1
curl -s https://infiotix.com/sitemap.xml | grep -c "<loc>"      # 19
curl -sSIL https://www.infiotix.com | grep -iE "^HTTP/|^location:"

# Logs
pm2 logs infiotix --lines 100
```

### Order of operations

1. §1 — find out what you have
2. §2 — **check and fix redirects** ⭐ highest value
3. §3 — deploy this build
4. §4 — verify
5. [GOOGLE_SEARCH_CONSOLE_GUIDE.md](GOOGLE_SEARCH_CONSOLE_GUIDE.md) — tell Google
6. [LOCAL_SEO_CHECKLIST.md](LOCAL_SEO_CHECKLIST.md) §1–2 — the actual brand fix
