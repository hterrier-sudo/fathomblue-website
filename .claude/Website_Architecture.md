# Website_Architecture.md — Fathom Blue Website
> Reference document for the website's technical architecture.
> Update when infrastructure or deployment config changes.
> This file covers the WEBSITE only (www.fathomblueco.com).

Last updated: 2026-05-08

---

## Overview

The Fathom Blue website is a **static marketing site** with no server-side rendering, no build process and no JavaScript framework. It is hosted on Vercel and deployed automatically on every `git push` to the main branch.

```
Visitor
  ↓
Vercel CDN (www.fathomblueco.com)
  ↓ serves
Static HTML/CSS/JS files
  ↓ waitlist form submits to
Supabase REST API (jndfzjbixgxytbufqsgd)
  ↓ INSERT triggers
Supabase Webhook → Make.com Scenario
  ↓ sends
Notification email (ht.fathomblueco@gmail.com)
Auto-response email (hello@fathomblueco.com via Hostinger SMTP)
```

---

## Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Semantic, accessible |
| Styling | CSS3 | Custom properties, flexbox, grid, glass morphism |
| Scripting | Vanilla JavaScript | No framework, no bundler |
| Fonts | Google Fonts | Bebas Neue + DM Sans |
| Hosting | Vercel | Free Hobby plan |
| Database | Supabase (PostgreSQL) | Shared with mobile app and Marketing Hub |
| Automations | Make.com | Waitlist email notifications |
| Email delivery | Hostinger SMTP | hello@fathomblueco.com |
| DNS | Hostinger | fathomblueco.com |
| Domain | fathomblueco.com | Registered at Hostinger |
| Version control | GitHub | hterrier-sudo/fathomblue-website |

---

## File Structure

```
fathomblue-website/                 ← C:\Projects\FathomBlueSite\
├── index.html                      ← Home / landing page
├── privacy.html                    ← Privacy policy (noindex)
├── terms.html                      ← Terms of service (noindex)
├── sitemap.xml                     ← SEO sitemap
├── robots.txt                      ← Search engine rules
├── og-image.jpg                    ← Social sharing image ⏳ PENDING
├── CLAUDE.md                       ← Project guide for Claude Code
├── Website_Project_State.md        ← Current build status
├── Website_Decisions.md            ← Append-only decision log
├── Website_Architecture.md         ← This file
├── Website_Database.md             ← Database reference
├── Website_Working_Style.md        ← Claude Code working rules
├── images/
│   └── spearfisher.svg             ← Spearfisher icon (Who It's For section)
├── css/
│   └── styles.css                  ← All styles
├── js/
│   └── main.js                     ← Scroll animations, mobile menu, waitlist
└── vercel.json                     ← Routing, redirects, security headers
```

---

## DNS Architecture

All DNS is managed in Hostinger under fathomblueco.com.

```
fathomblueco.com        (A record → 76.76.21.21)         → Vercel
www.fathomblueco.com    (CNAME → cname.vercel-dns.com)   → Vercel → index.html
hub.fathomblueco.com    (CNAME → cname.vercel-dns.com)   → Vercel → Marketing Hub
fathomblueco.com        (TXT → google-site-verification) → Google Search Console
```

**Critical:** `hub.fathomblueco.com` is a separate Vercel deployment. Never modify the hub CNAME.

**Redirect:** Vercel redirects naked domain `fathomblueco.com` → `www.fathomblueco.com` via vercel.json rule.

---

## Vercel Configuration

```json
{
  "redirects": [
    {
      "source": "/",
      "has": [{ "type": "host", "value": "fathomblueco.com" }],
      "destination": "https://www.fathomblueco.com",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;" },
        { "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=(), payment=()" }
      ]
    }
  ]
}
```

**Security rating:** A on securityheaders.com (April 2026)

**CSP rules:**
- `script-src 'self'` — no inline scripts permitted
- `style-src 'unsafe-inline'` — required for Google Fonts and inline styles
- `connect-src https://*.supabase.co` — permits waitlist form POST

---

## Waitlist Form Architecture

```
User enters email on www.fathomblueco.com
  ↓
js/main.js validates email format client-side
  ↓
POST https://jndfzjbixgxytbufqsgd.supabase.co/rest/v1/waitlist
Headers: apikey, Authorization: Bearer <anon_key>, Content-Type, Prefer: return=minimal
Body: { email: "user@example.com", source: "website" }
  ↓
Supabase evaluates RLS policy (insert allowed for all)
  ↓ success → 201 Created
show success message (cyan): "You're on the list! We'll notify you at launch. Stay salty 🌊"
  ↓ duplicate (error code 23505)
show duplicate message (orange): "You're already on the list! We'll see you at launch 🌊"
  ↓ other error
show error message (red): "Network error. Please check your connection and try again."
```

**Supabase webhook chain (on INSERT):**
```
Supabase waitlist INSERT
  ↓
Supabase Webhook → POST to Make.com webhook URL
  ↓
Make.com Scenario: "Fathom Blue Waitlist"
  ├── Module 1: Notification → ht.fathomblueco@gmail.com
  └── Module 2: Auto-response → {{1.record.email}} via Hostinger SMTP
```

---

## index.html — Section Structure (current as of May 2026)

| # | Section ID | Description |
|---|-----------|-------------|
| 1 | `#hero` | Full-viewport hero — headline, subheadline, two CTA buttons, Coming Soon badge |
| 2 | `#who` | Who It's For — 3 audience cards: Freedivers, Spearfishers, Surfers |
| 3 | `#features` | Features — 6 cards: CO₂ & O₂ Tables, Progress Tracking, 4-Week Blocks, Safety First, Three Pillars, Wearable Support |
| 3.5 | `#pillars` | Training Pillars — NEW May 2026 — 3 cards: Breathwork (cyan), Workout (orange), Mobility (grey) |
| 4 | `#screenshots` | App Screenshots — 4 placeholder phone mockup cards |
| 5 | `#pricing` | Pricing — Free + Premium cards |
| 6 | `#waitlist` | Waitlist — email capture form → Supabase |
| 7 | footer | Footer — social icons, links, copyright |

---

## JavaScript Architecture (js/main.js)

Single file. No bundler. No imports. Key functions:

| Function | Purpose |
|----------|---------|
| `submitWaitlist(email)` | POSTs to Supabase REST API, returns `{success, duplicate}` |
| `showMessage(type, text)` | Renders success/duplicate/error message below form |
| Intersection Observer | Adds `.visible` class to sections as they scroll into view |
| Scroll listener | Adds `.scrolled` class to nav for backdrop-blur effect |
| Hamburger toggle | Shows/hides mobile nav menu |

**Key constant — Supabase config:**
```javascript
const SUPABASE_URL = 'https://jndfzjbixgxytbufqsgd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJ...' // anon public key — safe for frontend
```

---

## CSS Architecture (css/styles.css)

Single file. Custom properties at `:root`. Mobile-first with breakpoints at 768px and 1024px.

**Custom properties:**
```css
:root {
  --bg:     #0A0A0A;
  --card:   #1A1A1A;
  --cyan:   #00C8D4;
  --orange: #FF6B35;
  --white:  #FFFFFF;
  --grey:   #888888;
}
```

**Key patterns:**
- Glass morphism: `backdrop-filter: blur(10px)` + semi-transparent borders
- Scroll animation: `.fade-in` → `.fade-in.visible` via Intersection Observer
- Hero gradient: `linear-gradient(135deg, #0A0A0A 0%, #0D1F2D 50%, #0A0A0A 100%)`
- Cyan glow on hover: `box-shadow: 0 0 20px rgba(0, 200, 212, 0.3)`

---

## Shared Supabase Database

The website, mobile app and Marketing Hub all share the same Supabase project (`jndfzjbixgxytbufqsgd`). Each surface uses different tables:

| Surface | Tables Used |
|---------|------------|
| Website | `waitlist` |
| Mobile App | `users`, `workout_logs`, `fitness_blocks`, `fitness_workout_plans`, `exercises`, etc. |
| Marketing Hub | `admin_users`, `brand_config`, `hub_settings`, `post_history` |

The website only touches the `waitlist` table. It has no access to any user authentication tables or app data.

---

## Deployment Pipeline

```
Developer (Hugues)
  ↓ edits files in VS Code
  ↓ git add . && git commit -m "..." && git push
GitHub (hterrier-sudo/fathomblue-website)
  ↓ push triggers Vercel webhook
Vercel
  ↓ detects new commit on main branch
  ↓ deploys static files to CDN (~30 seconds)
www.fathomblueco.com
  ↓ live immediately after deploy
```

No build step. No environment variables. No CI/CD pipeline beyond Vercel's automatic deploy.

---

## SEO Architecture

| Element | Value |
|---------|-------|
| Page title | `Fathom Blue — Freediving & Breath Training App \| Train Wild. Dive Free.` |
| Meta description | 160 chars — targets freedivers, spearfishers, surfers |
| Canonical | https://www.fathomblueco.com/ |
| Robots | index, follow (index.html) — noindex, follow (privacy + terms) |
| OG image | og-image.jpg — 1200×630px ⏳ PENDING |
| Twitter card | summary_large_image |
| Schema | MobileApplication — iOS + Android — Free + Premium |
| Sitemap | /sitemap.xml — 3 URLs — submitted to Google Search Console |
| Robots.txt | /robots.txt — allow all, references sitemap |
| Search Console | Domain verified — sitemap submitted April 2026 |
| PageSpeed | 90+ all four metrics (April 2026) |

---

## Security Architecture

| Control | Implementation | Status |
|---------|---------------|--------|
| HTTPS | Vercel auto SSL | ✅ Active |
| HSTS | Vercel auto (max-age=63072000) | ✅ Active |
| X-Frame-Options | DENY — vercel.json | ✅ Active |
| X-Content-Type-Options | nosniff — vercel.json | ✅ Active |
| Referrer-Policy | strict-origin-when-cross-origin | ✅ Active |
| CSP | script-src 'self' (no unsafe-inline) | ✅ Active |
| Permissions-Policy | camera/mic/geo/payment blocked | ✅ Active |
| Supabase RLS | Enabled — insert-only public policy | ✅ Active |
| No service_role key on frontend | Anon key only in js/main.js | ✅ Confirmed |
| Cross-Origin headers (COEP/COOP) | Not yet added | 🔜 Phase 2 |

**Security scan:** A rating on securityheaders.com (April 2026)

---

## Phase 2 Architecture Changes

These will require architectural updates when implemented:

1. **Blog section** — add `/blog/` directory with HTML articles — update sitemap.xml
2. **French/Spanish versions** — add `/fr/` and `/es/` directories — update sitemap.xml with hreflang
3. **Cross-Origin headers** — add COEP, COOP, CORP to vercel.json headers
4. **Analytics** — add PostHog or Google Analytics script tag — update CSP `script-src`
5. **App Store ratings** — add third-party widget — update CSP `script-src` and `connect-src`
