# Website_Project_State.md — Fathom Blue Website
> **Update this file at the end of every working session.**
> Keep entries short. Dates in ISO format (YYYY-MM-DD).
> This file covers the WEBSITE only (www.fathomblueco.com).
> For the mobile app, see PROJECT_STATE.md in the app repo.

Last updated: 2026-04-16
Current status: **Live and deployed** — www.fathomblueco.com

---

## Current Environment

| Field | Value |
|-------|-------|
| Repo path | `C:\Projects\FathomBlueSite\` |
| GitHub repo | `hterrier-sudo/fathomblue-website` |
| Live URL | https://www.fathomblueco.com |
| Hosting | Vercel (free Hobby plan) |
| Domain | Hostinger — fathomblueco.com |
| Supabase project | jndfzjbixgxytbufqsgd |
| Supabase URL | https://jndfzjbixgxytbufqsgd.supabase.co |
| Contact email | hello@fathomblueco.com |
| Notification email | ht.fathomblueco@gmail.com |
| Marketing Hub | hub.fathomblueco.com (separate Vercel deployment — do not touch) |

---

## ✅ Completed

### Infrastructure
- Static HTML/CSS/JS site — no framework, no build process
- GitHub repo created and connected to Vercel
- Vercel auto-deploy on every `git push` to main branch
- Custom domain www.fathomblueco.com live and verified
- HTTPS auto-provisioned by Vercel — active
- Naked domain fathomblueco.com redirects to www via vercel.json

### Pages Built
- `index.html` — full landing page, all 7 sections complete
- `privacy.html` — privacy policy (noindex — required for App Store)
- `terms.html` — terms of service with safety disclaimer (noindex — required for App Store)
- `sitemap.xml` — 3 URLs — submitted to Google Search Console
- `robots.txt` — allow all crawlers, references sitemap

### Design & UI
- Brand colours applied: `#0A0A0A` bg, `#00C8D4` cyan, `#FF6B35` orange
- Google Fonts loaded: Bebas Neue (headings) + DM Sans (body)
- Dark premium aesthetic with glass morphism cards
- Intersection Observer scroll fade-in animations
- Mobile-first responsive — hamburger nav on mobile
- Favicon: 🌊 emoji — applied to all 3 pages

### Sections — index.html
- **Nav:** sticky, backdrop-blur on scroll, hamburger mobile menu
- **Hero:** full viewport, CSS gradient, two CTA buttons (link to #waitlist), Coming Soon badge
- **Who It's For:** Freedivers / Spearfishers / Surfers — 3 glass morphism cards
- **Features:** 6 cards — CO₂ & O₂ Tables / Progress Tracking / Spearfishing Techniques / Safety First / Multi-Language / Wearable Support
- **Screenshots:** 4 placeholder phone mockup cards in horizontal carousel
- **Pricing:** Free + Premium cards — Premium has Most Popular badge (orange)
- **Waitlist:** email form → Supabase insert
- **Footer:** social SVG icons, links, copyright

### Key Content Decisions (April 2026)
- "Priority support" deliberately removed from Premium pricing
- Wearable Support: Apple Watch, Android Watch, Garmin, Oximeter — Coming Soon badge (orange)
- Spearfisher icon: custom SVG from images/spearfisher.svg (replaces original stick-figure attempts)
- "ocean athletes" → "ocean explorers" — brand decision, applied site-wide
- Duplicate email: returns friendly orange message instead of error

### Supabase
- `waitlist` table created — RLS enabled — insert-only public policy
- Anon key configured in js/main.js — Supabase bug fixed (unquoted JWT was causing JS crash)
- Duplicate email (error code 23505) handled gracefully in main.js
- Waitlist table manually cleared of test data (April 2026)

### Security
- Security headers in vercel.json: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, CSP, Permissions-Policy
- CSP: no `unsafe-inline` in script-src — all JS in external files only
- Rating: **A on securityheaders.com**

### SEO
- Meta description, keywords, author, robots, canonical — index.html
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card (summary_large_image — @FathomBlueCo)
- Schema.org MobileApplication structured data
- noindex on privacy.html and terms.html
- Google Search Console: domain verified via TXT record, sitemap submitted
- PageSpeed Insights: **90+ on all four metrics**
- Page title updated: `Fathom Blue — Freediving & Breath Training App | Train Wild. Dive Free.`

### Social Media
- All 5 social SVG icons in footer with real URLs and cyan hover effect
- Instagram: https://www.instagram.com/fathomblue/
- TikTok: https://www.tiktok.com/@fathomblue
- Facebook: https://www.facebook.com/profile.php?id=61573485373523
- YouTube: https://www.youtube.com/@FathomBlue
- X / Twitter: https://x.com/FathomBlueCo

### Email Automations (Make.com)
- Supabase webhook on waitlist INSERT → Make.com scenario
- Action 1: notification email to ht.fathomblueco@gmail.com
- Action 2: auto-response from hello@fathomblueco.com via Hostinger SMTP
- Auto-response: branded HTML email with social links — active ✅

---

## ⏳ Pending — Before App Launch

- [ ] **OG image** — create og-image.jpg in Canva (1200×630px) — upload to repo root
  - Background: gradient `#0A0A0A → #0D1F2D → #0A0A0A`
  - "FATHOM BLUE" in Bebas Neue, `#00C8D4`, 130px
  - "Train Wild. Dive Free." in Bebas Neue, white, 48px
  - Cyan accent lines top and bottom
- [ ] **Test waitlist form** — submit real email, verify in Supabase Table Editor
- [ ] **hello@fathomblueco.com** — confirm email is set up and forwarding in Hostinger
- [ ] **App Store download link** — update hero CTA href once app is live
- [ ] **Google Play download link** — update hero CTA href once app is live
- [ ] **Real app screenshots** — replace 4 placeholder cards in screenshot carousel
- [ ] **Hero background image** — replace CSS gradient with real underwater photo (Unsplash)
- [ ] **Remove "Launching soon" badge** — remove from hero section at launch

---

## 🔜 Phase 2 — Post Launch

- [ ] French language version (index.html)
- [ ] Spanish language version (index.html)
- [ ] Blog / SEO content — freediving tips, spearfishing guides
- [ ] Testimonials section — after App Store reviews accumulate
- [ ] Explorer/Ambassador page
- [ ] Affiliate signup page
- [ ] Live App Store ratings widget
- [ ] Cross-Origin security headers (COEP, COOP, CORP)
- [ ] Google Analytics or PostHog tracking

---

## Notes for Next Session

- Verify Google Search Console shows pages indexed (48hrs after sitemap submission)
- Check Make.com scenario is still ON and processing correctly
- Spearfisher icon (images/spearfisher.svg) — confirm final version looks correct on live site
- OG image is the highest priority outstanding task
