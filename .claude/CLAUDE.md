# CLAUDE.md — Fathom Blue Website
# Project Guide for Build & Maintenance
# Version 1.0 | April 2026 | Owner: Hugues | Confidential

---

## 🌊 Project Overview

| Field | Value |
|-------|-------|
| Project | Fathom Blue — Marketing Website |
| Brand | Fathom Blue — Train Wild. Dive Free. |
| Live URL | https://www.fathomblueco.com |
| GitHub Repo | https://github.com/hterrier-sudo/fathomblue-website |
| Hosting | Vercel (free Hobby plan) |
| Domain Registrar | Hostinger |
| Supabase Project | jndfzjbixgxytbufqsgd |
| Contact Email | hello@fathomblueco.com |
| Notification Email | ht.fathomblueco@gmail.com |
| Target Audience | Freedivers, spearfishers, surfers — all levels globally |

---

## 📋 Required Reading — Start of Every Session

Before starting any work on this project, read these files in order:

1. **CLAUDE.md** (this file) — project overview, design system, config reference
2. **Website_Working_Style.md** — how Claude Code works on this project
3. **Website_Project_State.md** — current build status and pending tasks
4. **Website_Decisions.md** — append-only decision log (check before making changes)

**Note on WORKING_STYLE.md:** The Fathom Blue app project has a WORKING_STYLE.md that governs how Claude Code works on the mobile app. The website has its own adapted version: **Website_Working_Style.md**. All communication patterns and Hugues's preferences from the app's WORKING_STYLE.md apply here too. Website_Working_Style.md only overrides the parts that don't apply to a static website (no sub-agents, no TypeScript, no Expo, no formal brief files for simple tasks). When in doubt, read both.

---

## 📁 File Structure

```
fathomblue-website/
├── index.html          — Home / landing page (all 7 sections)
├── privacy.html        — Privacy policy (noindex)
├── terms.html          — Terms of service (noindex)
├── sitemap.xml         — SEO sitemap (submitted to Google Search Console)
├── robots.txt          — Search engine crawl rules
├── og-image.jpg        — Social sharing preview image ⏳ PENDING
├── CLAUDE.md           — This file
├── images/             — SVG icons and images
│   └── spearfisher.svg — Spearfisher icon for Who It's For section
├── css/
│   └── styles.css      — All styles (brand colours, fonts, responsive)
├── js/
│   └── main.js         — Scroll animations, mobile menu, waitlist form
└── vercel.json         — Routing, redirects and security headers
```

---

## 🎨 Design System — STRICT RULES

### Colours — Use ONLY These Exact Hex Codes

```css
--bg:        #0A0A0A   /* Pure dark background — all pages */
--card:      #1A1A1A   /* Cards, elevated surfaces */
--cyan:      #00C8D4   /* PRIMARY accent — CTAs, links, highlights, hover, brand */
--orange:    #FF6B35   /* SECONDARY accent — badges, Coming Soon, price highlights */
--white:     #FFFFFF   /* Primary text on dark backgrounds */
--grey:      #888888   /* Secondary text, captions, muted content */
--gradient:  linear-gradient(135deg, #0A0A0A 0%, #0D1F2D 50%, #0A0A0A 100%)
```

**IMPORTANT:**
- `#00C8D4` (cyan) is the Fathom Blue signature colour — use for ALL main CTAs, links, hover states and brand elements
- `#FF6B35` (orange) is used ONLY for contrast and emphasis — use sparingly
- NEVER use the old blue `#0ea5e9` on this website
- NEVER substitute or approximate these colours

### Typography

```css
/* Load via Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

Heading font:    'Bebas Neue'  — bold, athletic, uppercase — ALL headings and brand
Body font:       'DM Sans'     — clean, readable — all body text and buttons

Hero headline:   80–96px, uppercase, Bebas Neue
Section headlines: 40–48px, Bebas Neue
Body text:       16–18px, DM Sans regular
Buttons:         14px, bold, uppercase, DM Sans
```

### Visual Style Rules
- Dark premium aesthetic — deep ocean midnight
- Glass morphism on cards: `backdrop-filter: blur(10px)`, semi-transparent border
- Scroll fade-in animations via Intersection Observer API
- Mobile-first responsive — hamburger nav on mobile
- Generous white space — premium, NOT cluttered
- Cyan glow on CTA buttons on hover
- Gradient overlays on background images

---

## 📄 Page Structure — index.html

### Navigation
- Logo: "FATHOM BLUE" — Bebas Neue, cyan `#00C8D4`
- Links: Features | Pricing | Waitlist
- Sticky with backdrop-blur on scroll
- Hamburger menu on mobile

### Section 1 — Hero
- Full viewport height (100vh)
- Background: CSS gradient `#0A0A0A → #0D1F2D → #0A0A0A` at 135°
- Headline: `TRAIN WILD. DIVE FREE.`
- Subheadline: `The breath training platform for ocean explorers`
- Body: `Structured CO₂ and O₂ training for freedivers, spearfishers and surfers. Train anywhere. Go deeper. Come home safe.`
- CTA 1: `Download on App Store` — href: UPDATE AT LAUNCH ⏳
- CTA 2: `Get it on Google Play` — href: UPDATE AT LAUNCH ⏳
- Coming Soon badge: `Launching soon — join the waitlist below 🌊` — REMOVE AT LAUNCH ⏳
- Scroll indicator arrow (animated bounce)

### Section 2 — Who It's For
- Headline: `Built for Ocean Explorers`
- Three cards: Freedivers | Spearfishers | Surfers
- Spearfisher icon: `images/spearfisher.svg` with cyan filter
- Glass morphism cards, cyan top border
- Freedivers: mentions CO₂/O₂ tables, breathwork sequences, 4-week training blocks
- Spearfishers: mentions breath-hold training, spearfishing techniques, ocean strength conditioning
- Surfers: mentions breath training, mobility flows, strength conditioning

### Section 3 — Key Features
- Headline: `Everything in One App`
- 6 feature cards in 3×2 grid:
  1. CO₂ & O₂ Training Tables — 5 protocols + Box Breathing + dynamic apnea
  2. Progress Tracking — session history, charts, training streak
  3. 4-Week Training Blocks — beginner/intermediate/advanced periodisation arc
  4. Safety First — Always — buddy reminders, blackout education, Safety Certification quiz
  5. Three Training Pillars — Breathwork / Workout / Mobility
  6. Wearable Support — Apple Watch, Android Watch, Garmin, Oximeter — COMING SOON badge (orange)

### Section 3.5 — Training Pillars (NEW — May 2026)
- Headline: `Three Pillars. One Ocean Explorer.`
- Subheadline: mentions breathwork, conditioning and mobility as the three pillars
- Three cards with bullet lists:
  - Breathwork (cyan top border): CO₂/O₂/Wonka/Mixed/Custom, Box Breathing, sequences, PB tracking
  - Workout (orange top border): bodyweight + kettlebell, dive fitness, ocean strength, equipment-matched
  - Mobility (grey top border): sport-specific flows, thoracic/shoulder/hip work, active recovery, deload flows

### Section 4 — App Screenshots
- Headline: `See It In Action`
- 4 placeholder phone mockup cards — REPLACE WITH REAL SCREENSHOTS AT LAUNCH ⏳

### Section 5 — Pricing
- Headline: `Start Free. Go Deeper.`
- Free: $0/forever — 3 sessions/week, all three pillars, basic tables, progress tracking + PBs, Safety Certification, ad-supported
- Premium: $12.99/month or $69.99/year — unlimited sessions, all three pillars, all 5 protocols + advanced tables, advanced blocks, spearfishing library, wearable integration (coming soon), no ads
- "Most Popular" badge on Premium (orange `#FF6B35`)
- NOTE: Priority support was deliberately removed from Premium features — do not reinstate

### Section 6 — Waitlist
- Headline: `Be First in the Water`
- Email form POSTs to Supabase waitlist table
- Success: `You're on the list! We'll notify you at launch. Stay salty 🌊` (cyan)
- Duplicate email: `You're already on the list! We'll see you at launch 🌊` (orange)
- Error: `Network error. Please check your connection and try again.` (red)

### Section 7 — Footer
- Tagline: `Train Wild. Dive Free.`
- Description: `Breathwork · Workout · Mobility training for ocean explorers. Freediving · Spearfishing · Surfing`
- Links: Privacy Policy | Terms of Service | Contact
- Social icons: SVG icons with cyan hover
- Copyright: `© 2026 Fathom Blue. All rights reserved.`
- Closing: `Built for ocean explorers, by ocean explorers 🌊`

---

## 🔗 Social Media Links

| Platform | URL |
|----------|-----|
| Instagram | https://www.instagram.com/fathomblue/ |
| TikTok | https://www.tiktok.com/@fathomblue |
| Facebook | https://www.facebook.com/profile.php?id=61573485373523 |
| YouTube | https://www.youtube.com/@FathomBlue |
| X / Twitter | https://x.com/FathomBlueCo |

---

## 🗄️ Supabase Configuration

```
Project ID:  jndfzjbixgxytbufqsgd
URL:         https://jndfzjbixgxytbufqsgd.supabase.co
Anon key:    stored in js/main.js (safe — insert-only RLS policy)
```

### Waitlist Table Schema
```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text default 'website',
  created_at timestamp default now()
);
alter table waitlist enable row level security;
create policy "Allow insert" on waitlist for insert with check (true);
```

### Important Security Notes
- RLS (Row Level Security) is ENABLED
- Public users can INSERT only — cannot read the list
- NEVER use the service_role key on the frontend
- The anon key in js/main.js is safe for this use case
- Duplicate emails return error code `23505` — handled in main.js with friendly message

---

## ⚙️ vercel.json — Current Configuration

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
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), payment=()" }
      ]
    }
  ]
}
```

**Security rating:** A on securityheaders.com
**HTTPS:** Auto-provisioned by Vercel — auto-renews

---

## 🌐 DNS Records — Hostinger

| Type | Name | Value | TTL | Purpose |
|------|------|-------|-----|---------|
| CNAME | www | cname.vercel-dns.com | 300 | Main website |
| CNAME | hub | cname.vercel-dns.com | 3600 | Marketing Hub — DO NOT TOUCH |
| A | @ | 76.76.21.21 | 3600 | Naked domain |
| TXT | @ | google-site-verification=... | 3600 | Google Search Console |

**CRITICAL:** Never modify the `hub` CNAME — it serves the Marketing Hub at hub.fathomblueco.com

---

## 📧 Email & Automations

### Waitlist Notifications — Make.com
- Scenario: Fathom Blue Waitlist
- Trigger: Supabase webhook → `waitlist` table INSERT
- Action 1: Send notification to `ht.fathomblueco@gmail.com`
- Action 2: Send auto-response to the signup email via SMTP `hello@fathomblueco.com`
- SMTP Host: smtp.hostinger.com | Port: 465 | SSL
- Status: ACTIVE ✅

### Auto-Response Email
- From: hello@fathomblueco.com (Fathom Blue)
- Subject: `🌊 Welcome to Fathom Blue — You're on the list!`
- Includes: social media links, brand colours, unsubscribe note

---

## 🔍 SEO Configuration

### Meta Tags — index.html
```html
<title>Fathom Blue — Freediving & Breath Training App | Train Wild. Dive Free.</title>
<meta name="description" content="The breath training app for freedivers, spearfishers and surfers...">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.fathomblueco.com/">
```

### Open Graph
```html
<meta property="og:image" content="https://www.fathomblueco.com/og-image.jpg">
```
**NOTE:** og-image.jpg is PENDING — create in Canva at 1200×630px:
- Background: gradient `#0A0A0A → #0D1F2D → #0A0A0A` at 135°
- "FATHOM BLUE" in Bebas Neue, `#00C8D4`, 130px
- "Train Wild. Dive Free." in Bebas Neue, white, 48px
- Cyan accent lines top and bottom
- Export as og-image.jpg, save to repo root

### Schema.org
- Type: MobileApplication
- iOS + Android
- Free + Premium offers
- sameAs: all 5 social media URLs

### Google Search Console
- Domain verified via TXT record ✅
- Sitemap submitted: https://www.fathomblueco.com/sitemap.xml ✅
- Pages to index: 1 (index.html only — privacy and terms are noindex)

### Performance
- PageSpeed Insights: 90+ on all four metrics ✅
- Run monthly at pagespeed.web.dev

---

## 🚀 Deployment Workflow

### Every Update
```bash
# 1. Make changes in VS Code
# 2. Preview with Live Server (right-click index.html → Open with Live Server)
# 3. Push to GitHub
git add .
git commit -m "Brief description of change"
git push
# 4. Vercel auto-deploys within ~30 seconds
# 5. Check live at https://www.fathomblueco.com
```

### At App Launch Checklist
```
□ Update App Store button href in index.html hero section
□ Update Google Play button href in index.html hero section
□ Remove "Launching soon" badge from hero section
□ Replace 4 placeholder screenshot cards with real app screenshots
□ Replace CSS gradient hero background with real underwater photo
□ Upload og-image.jpg to repo root
□ Run PageSpeed Insights after changes
```

---

## 🔒 Security Checklist

| Check | Status | Tool |
|-------|--------|------|
| HTTPS / SSL | ✅ Active | Vercel auto |
| Security headers | ✅ A rating | securityheaders.com |
| CSP (no unsafe-inline in scripts) | ✅ Active | vercel.json |
| Permissions-Policy | ✅ Active | vercel.json |
| Supabase RLS | ✅ Enabled | Supabase dashboard |
| No service_role key on frontend | ✅ Confirmed | js/main.js |
| Cross-Origin headers (COEP/COOP) | 🔜 Phase 2 | vercel.json |

---

## 💡 Common Claude Code Tasks

### Update any text on the website
```
In index.html, find "[exact current text]" and replace with "[new text]"
```

### Update pricing
```
In index.html, find the Premium pricing card and update the price to [X]
```

### Add a new feature card
```
In index.html, find the features grid section and add a new feature card
with title "[X]" and body text "[Y]" after the last existing card
```

### Update social media links
```
In index.html, find the footer social links section and update the
[platform] href to [new URL]
```

### Add real app screenshots at launch
```
In index.html, find the screenshots carousel section and replace the
4 placeholder cards with real screenshot images from the images/ folder.
The images should be named: screenshot-1.jpg, screenshot-2.jpg etc.
```

### Add hero background image
```
In css/styles.css, find the hero section background and replace the
CSS gradient with: background-image: url('../images/hero-bg.jpg');
Keep the dark overlay for text readability.
```

---

## 📋 Brand Voice Guidelines

- **Tone:** Motivational, educational, safety-conscious
- **Audience:** Ocean explorers — freedivers, spearfishers, surfers
- **Always use:** "ocean explorers" NOT "ocean athletes"
- **Always use:** "Explorer/Explorers" NOT "Athlete/Athletes"
- **Safety messaging:** Always include safety reminders in any freediving content
- **Key messages:**
  - Train Wild. Dive Free.
  - Go deeper. Come home safe.
  - Built for ocean explorers, by ocean explorers
  - Stay salty 🌊

---

## 🔜 Phase 2 Roadmap

| Feature | Priority | Notes |
|---------|----------|-------|
| OG image (og-image.jpg) | HIGH ⏳ | Create in Canva — see spec above |
| Real hero background image | HIGH ⏳ | Unsplash: search "freediving" |
| Real app screenshots | AT LAUNCH | Replace 4 placeholder cards |
| App Store / Play Store links | AT LAUNCH | Update hero CTA buttons |
| French language version | Phase 2 | Translate index.html |
| Spanish language version | Phase 2 | Translate index.html |
| Blog / SEO content | Phase 2 | Freediving tips, spearfishing guides |
| Testimonials section | Phase 2 | After App Store reviews accumulate |
| Explorer/Ambassador page | Phase 2 | Influencer commission links |
| Live App Store ratings widget | Phase 2 | Post-launch |
| Cross-Origin security headers | Phase 2 | COEP, COOP, CORP |
| Google Search Console indexing | 48hrs | Check pages are indexed |

---

## ⚠️ Important Notes for Future Claude Sessions

1. **Always use "ocean explorers"** — never "ocean athletes" — brand decision made April 2026
2. **Never modify hub CNAME** in Hostinger DNS — it serves a separate Marketing Hub
3. **Never add Priority support back** to Premium pricing — deliberately removed
4. **Wearable Support is Coming Soon** — Apple Watch, Android Watch, Garmin, Oximeter — do not remove the Coming Soon badge until integration is live
5. **App Store buttons link to #waitlist** until real store URLs are available — update at launch
6. **Supabase anon key is in js/main.js** — this is safe, do not move to environment variables for this static site
7. **CSP has no unsafe-inline in script-src** — all JavaScript must be in external files (js/main.js), never inline in HTML
8. **Duplicate email error code is 23505** — already handled in js/main.js with orange friendly message
9. **Make.com scenario must stay ON** — it handles waitlist notification + auto-response emails
10. **privacy.html and terms.html are noindex** — required for App Store submission, not meant for Google
11. **Multi-language is NOT a live feature** — French and Spanish versions are Phase 2 only — do not advertise as available
12. **Three Training Pillars section exists** at `#pillars` between Features and Screenshots — Breathwork (cyan), Workout (orange), Mobility (grey) — added May 2026
13. **Feature card copy is now aligned to app v0.20** — "Spearfishing Techniques" and "Multi-Language" cards no longer exist. Do not reinstate them.

---

*Fathom Blue CLAUDE.md v2.0 — Confidential — Hugues — May 2026*
