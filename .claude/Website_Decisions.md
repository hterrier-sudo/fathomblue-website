# Website_Decisions.md — Fathom Blue Website
> **Append-only. Never edit or delete existing entries.**
> One entry per decision. Format: date → decision → rationale.
> This file covers WEBSITE decisions only.
> For app decisions, see DECISIONS.md in the app repo.

---

## 2026-04-16 — Static HTML/CSS/JS — no framework

**Decision:** Build the marketing website as plain HTML/CSS/JS with no React, Next.js or other framework.

**Rationale:** The website is a static marketing page with no complex state management or routing requirements. A framework would add unnecessary build complexity, dependencies and maintenance overhead. Plain HTML deploys instantly to Vercel with zero config and loads faster for visitors.

---

## 2026-04-16 — Vercel hosting — same account as Marketing Hub

**Decision:** Host the marketing website on the same Vercel account as hub.fathomblueco.com.

**Rationale:** Simplifies account management. Both are static deployments. Vercel free Hobby plan is sufficient for both. Each deployment is independent — a change to one cannot affect the other.

---

## 2026-04-16 — Supabase waitlist — insert-only RLS

**Decision:** Store waitlist signups in Supabase `waitlist` table with RLS enabled, insert-only public policy, anon key in js/main.js.

**Rationale:** Supabase is already the app's database. Reusing it avoids a third-party email capture service. RLS insert-only means the public can add rows but cannot read the list. The anon key is safe for this use case — it cannot read, update or delete rows.

---

## 2026-04-16 — No email framework — direct Supabase REST API call

**Decision:** Waitlist form POSTs directly to Supabase REST API (no Supabase JS client library).

**Rationale:** Loading the full Supabase JS client library for a single INSERT operation on a static site adds unnecessary weight. The REST API with anon key achieves the same result with less code and no dependencies.

---

## 2026-04-16 — Make.com for waitlist email automations

**Decision:** Use Make.com (existing account) to trigger notification and auto-response emails on every waitlist INSERT via Supabase webhook.

**Rationale:** Make.com is already in the Fathom Blue stack for social post scheduling. Adding a waitlist automation scenario avoids a new tool. Supabase webhook → Make.com → Hostinger SMTP is a clean three-step flow.

---

## 2026-04-16 — Hostinger SMTP for auto-response emails

**Decision:** Send auto-response emails from hello@fathomblueco.com via Hostinger SMTP (Other SMTP in Make.com), not Gmail.

**Rationale:** Using hello@fathomblueco.com as the sender is more professional and on-brand than ht.fathomblueco@gmail.com. Gmail connection caused a 403 insufficient scopes error due to Google's OAuth restrictions. Hostinger SMTP resolved cleanly.

---

## 2026-04-16 — "Ocean explorers" not "ocean athletes"

**Decision:** All website copy uses "ocean explorers" and "Explorers" — never "ocean athletes" or "Athletes".

**Rationale:** "Explorer" is the Fathom Blue brand term for users, consistent with the mobile app. Applied to all three pages — index.html, privacy.html, terms.html — and to all future content.

---

## 2026-04-16 — Remove "Priority support" from Premium

**Decision:** Premium pricing card does not include "Priority support" as a listed feature.

**Rationale:** Hugues decided this feature should not be advertised at launch as fulfilment cannot be guaranteed as a solo founder. Removed from index.html pricing section. Do not reinstate without explicit instruction.

---

## 2026-04-16 — Wearable Support = Coming Soon

**Decision:** Wearable Support feature card shows Coming Soon badge (orange `#FF6B35`). Copy: "Apple Watch, Android Watch, Garmin and Oximeter integration coming soon."

**Rationale:** Wearable integration is on the roadmap but not built yet. Being transparent about this avoids misleading users. The Coming Soon badge (orange) visually distinguishes it from live features. Remove badge only when integration is live.

---

## 2026-04-16 — Spearfisher icon from SVG file, not inline code

**Decision:** Spearfisher icon in "Who It's For" section uses an external SVG file (images/spearfisher.svg) referenced via `<img>` tag with CSS filter for brand colour, rather than inline SVG code.

**Rationale:** Two inline SVG attempts produced a "stick figure" result that was not acceptable. An external SVG file sourced from a professional icon library gives far better quality. CSS filter `invert(72%) sepia(98%) saturate(400%) hue-rotate(140deg) brightness(95%)` converts black SVG to brand cyan `#00C8D4`.

---

## 2026-04-16 — CSP: no unsafe-inline in script-src

**Decision:** Content Security Policy removes `unsafe-inline` from `script-src`. All JavaScript must live in external files (js/main.js). No inline `<script>` blocks in HTML.

**Rationale:** `unsafe-inline` in script-src is flagged as dangerous by securityheaders.com and weakens XSS protection. The `<script type="application/ld+json">` block for Schema.org is exempt — it is not executable JavaScript and does not require `unsafe-inline`.

**Note:** This caused the waitlist form to break (combined with the unquoted JWT bug). Both issues were fixed in the same session.

---

## 2026-04-16 — Duplicate email: friendly message, not error

**Decision:** When a user submits an email that is already in the waitlist table, show a friendly orange message ("You're already on the list! We'll see you at launch 🌊") instead of a generic error.

**Rationale:** Supabase returns error code 23505 (unique constraint violation) on duplicate email. Treating this as an error is confusing for the user — they have already signed up successfully. An orange (secondary brand colour) friendly message is more appropriate than the red error colour.

---

## 2026-04-16 — OG image: minimal brand design

**Decision:** OG image (og-image.jpg) to be created in Canva at 1200×630px with: brand gradient background, "FATHOM BLUE" in Bebas Neue cyan, "Train Wild. Dive Free." in white, cyan accent lines top and bottom. No photography required.

**Rationale:** Hugues requested a simple, text-based OG image on a dark background. This is consistent with the brand aesthetic, fast to produce in Canva, and more reliable than photography for social sharing previews across all platforms. ⏳ PENDING creation.

---

## 2026-04-16 — Privacy and terms pages: noindex

**Decision:** privacy.html and terms.html include `<meta name="robots" content="noindex, follow">`. They are not submitted in the sitemap.

**Rationale:** These pages are required for App Store submission but are not useful search engine landing pages. Keeping them out of Google's index focuses crawl budget on index.html and avoids diluting SEO.

---

## 2026-04-16 — Google Search Console verification via DNS TXT record

**Decision:** Verify Google Search Console ownership of fathomblueco.com via DNS TXT record in Hostinger, not via HTML meta tag.

**Rationale:** DNS verification is more robust — it works across all pages and is not affected by future HTML changes. The TXT record was added to the @ record in Hostinger DNS.

---

## 2026-04-16 — Hub CNAME is untouchable

**Decision:** The `hub` CNAME record in Hostinger DNS (hub → cname.vercel-dns.com) must never be modified when making DNS changes for the marketing website.

**Rationale:** hub.fathomblueco.com is a separate Vercel deployment serving the Fathom Blue Marketing Hub. Modifying this record would take the Marketing Hub offline. Logged after nearly conflicting with the Marketing Hub during website DNS setup.

## 2026-05-08 — App feature alignment — website synced to app v0.20

**Decision:** Website copy and features updated to reflect the app's actual v0.20 feature set. Three specific content changes made:

1. "Spearfishing Techniques" feature card replaced with "4-Week Training Blocks" — block-based periodisation is a core product differentiator for all three audiences, not a spearfishing-only feature.
2. "Multi-Language" feature card replaced with "Three Training Pillars" — multi-language is Phase 2 and not live. Three Pillars (Breathwork / Workout / Mobility) accurately describes the app's session architecture.
3. New Training Pillars section added as a standalone section — gives the three-pillar model the prominence it deserves as the primary differentiator vs generic breath training apps.

**Rationale:** The website was built before the app reached v0.20. Several feature descriptions were inaccurate or incomplete. Aligning website copy to the live app prevents visitor disappointment and improves App Store conversion.

---

## 2026-05-08 — Multi-language removed from website features

**Decision:** "Multi-Language (English, French, Spanish)" is no longer listed as a feature on the website.

**Rationale:** French and Spanish versions are Phase 2 — not built, not live, not committed to a timeline. Advertising a feature that doesn't exist is misleading. Removed from the Features section. May be reinstated when French/Spanish versions ship.

---

## 2026-05-08 — Safety Certification added to Free plan features

**Decision:** "Safety Certification quiz" added to the Free plan feature list on the Pricing section.

**Rationale:** The Safety Certification quiz is live in the app and available on the Free tier. It is a genuine differentiator — no other breath training app includes a built-in safety quiz. It was missing from the original pricing list and has been added.
