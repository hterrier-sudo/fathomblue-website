# Fathom Blue Website — App Feature Alignment Brief
# Version 1.0 | May 2026
# Claude Code instructions — paste this directly into Claude Code

---

## Context

The Fathom Blue website was built before the app reached its current feature-complete state.
Several sections of index.html describe an older or incomplete version of the app.
This brief updates the website copy and features to accurately reflect what the app
actually delivers at v0.20.

Read CLAUDE.md before starting.

---

## Summary of Changes

1. Update Features section — 6 cards rewritten to reflect real app capabilities
2. Update Who It's For section — copy updated for all three audience cards
3. Update Hero section — subheadline and body copy updated
4. Update Pricing section — feature lists updated for Free and Premium
5. Add new Training Pillars section — new section between Features and Screenshots
6. Update Footer description

All changes are copy and content only. No structural HTML changes, no CSS changes,
no changes to js/main.js, no changes to vercel.json.

---

## CHANGE 1 — Hero Section

### Find the hero subheadline:
```
The breath training platform for ocean explorers
```

### Replace with:
```
The ocean explorer training platform
```

### Find the hero body paragraph:
```
Structured CO₂ and O₂ training for freedivers, spearfishers and surfers. Train anywhere. Go deeper. Come home safe.
```

### Replace with:
```
Breathwork, strength, and mobility training built for freedivers, spearfishers and surfers. Structured 4-week blocks, personalised to your level. Train anywhere. Go deeper. Come home safe.
```

---

## CHANGE 2 — Who It's For Section

### Update section headline:
Find:
```
Built for Ocean Explorers
```
Replace with:
```
Built for Ocean Explorers
```
(no change to headline — confirm it already says "Explorers" not "Athletes")

### Update the Freedivers card body text:
Find the Freedivers card body paragraph and replace its text with:
```
Push your depth limits with personalised CO₂ and O₂ training tables, breathwork sequences and structured 4-week training blocks. Track your progress, improve your technique, and dive deeper — safely.
```

### Update the Spearfishers card body text:
Find the Spearfishers card body paragraph and replace its text with:
```
Longer bottom time means more fish. Structured breath-hold training, spearfishing-specific techniques and ocean strength conditioning give you the edge underwater. Built for hunters.
```

### Update the Surfers card body text:
Find the Surfers card body paragraph and replace its text with:
```
Stay calm in hold-downs. Train your breath for big waves with high-stress recovery techniques, mobility flows and strength conditioning used by serious ocean explorers worldwide.
```

---

## CHANGE 3 — Features Section

### Update section headline:
Find:
```
Everything You Need to Train
```
Replace with:
```
Everything in One App
```

### Replace all 6 feature cards

Find the entire features grid section (the div containing all 6 feature cards).
Replace the 6 feature cards with the following 6 updated cards.
Keep the existing card HTML structure (class names, icons etc) — only update
the title and body text inside each card.

**Card 1 — was "CO₂ & O₂ Tables"**
- Title: `CO₂ & O₂ Training Tables`
- Body: `Personalised breathwork tables that adapt to your maximum breath-hold time. Five protocols — CO₂, O₂, Wonka, Mixed and Custom — plus Box Breathing and dynamic apnea.`

**Card 2 — was "Progress Tracking"**
- Title: `Progress Tracking`
- Body: `Log every session. Track your personal bests. Watch your breath-hold times grow with session history, charts and your training streak — all in one place.`

**Card 3 — was "Spearfishing Techniques"**
- Title: `4-Week Training Blocks`
- Body: `Structured block-based training across beginner, intermediate and advanced levels. Each block follows a proven 4-week arc — Accumulation, Progression, Intensification, Deload.`

**Card 4 — was "Safety First"**
- Title: `Safety First — Always`
- Body: `Buddy system reminders, shallow water blackout education, and a built-in Safety Certification quiz. Safe training protocols are embedded in every single session.`

**Card 5 — was "Multi-Language"**
- Title: `Three Training Pillars`
- Body: `Every session is one of three pillars — Breathwork, Workout or Mobility. Your daily training combines all three for complete ocean fitness, not just breath-hold numbers.`

**Card 6 — was "Wearable Support"**
- Title: `Wearable Support`
- Body: `Apple Watch, Android Watch, Garmin and Oximeter integration coming soon. Track your training from your wrist, in or out of the water.`
- Keep the existing Coming Soon badge (orange) on this card — do not remove it.

---

## CHANGE 4 — New "Three Training Pillars" Section

Add a new section AFTER the Features section and BEFORE the Screenshots section.

This is a new section that does not exist yet. Insert it between the closing tag
of the Features section and the opening tag of the Screenshots section.

```html
<!-- Training Pillars Section -->
<section id="pillars" class="pillars-section">
  <div class="container">
    <h2 class="section-title">Three Pillars. One Ocean Explorer.</h2>
    <p class="section-subtitle">Every Fathom Blue training block combines breathwork, physical conditioning and mobility — the three pillars of complete ocean fitness.</p>
    <div class="pillars-grid">

      <div class="pillar-card pillar-breathwork">
        <div class="pillar-icon">🫁</div>
        <h3>Breathwork</h3>
        <p>CO₂ and O₂ training tables, static apnea, dynamic apnea, and breathwork sequences. Personalised to your maximum breath-hold time and calibrated week by week.</p>
        <ul class="pillar-list">
          <li>CO₂, O₂, Wonka, Mixed & Custom tables</li>
          <li>Box Breathing & dynamic apnea</li>
          <li>Breathwork sequences with voice cues</li>
          <li>Personal best tracking</li>
        </ul>
      </div>

      <div class="pillar-card pillar-workout">
        <div class="pillar-icon">💪</div>
        <h3>Workout</h3>
        <p>Ocean-specific strength and conditioning. Kettlebell circuits, bodyweight training and dive fitness exercises designed to make you stronger, more powerful underwater.</p>
        <ul class="pillar-list">
          <li>Bodyweight & kettlebell training</li>
          <li>Dive fitness circuits</li>
          <li>Ocean strength conditioning</li>
          <li>Equipment-matched to your kit</li>
        </ul>
      </div>

      <div class="pillar-card pillar-mobility">
        <div class="pillar-icon">🧘</div>
        <h3>Mobility</h3>
        <p>Flexibility and movement quality for ocean performance. Thoracic mobility, hip openers, shoulder work and full-body flows — built for divers, surfers and spearfishers.</p>
        <ul class="pillar-list">
          <li>Sport-specific mobility flows</li>
          <li>Thoracic, shoulder & hip work</li>
          <li>Active recovery sessions</li>
          <li>Deload week recovery flows</li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

Then add these styles to the END of css/styles.css:

```css
/* ── Training Pillars Section ── */
.pillars-section {
  padding: 100px 0;
  background: var(--card);
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.pillar-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 36px 28px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.pillar-card:hover {
  transform: translateY(-4px);
}

.pillar-breathwork {
  border-top: 3px solid var(--cyan);
}

.pillar-workout {
  border-top: 3px solid var(--orange);
}

.pillar-mobility {
  border-top: 3px solid #888888;
}

.pillar-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.pillar-card h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.8rem;
  color: var(--white);
  margin-bottom: 12px;
  letter-spacing: 0.05em;
}

.pillar-list {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.pillar-list li {
  color: var(--grey);
  font-size: 0.9rem;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 8px;
}

.pillar-list li::before {
  content: '→';
  color: var(--cyan);
  font-size: 0.8rem;
}

.pillar-list li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## CHANGE 5 — Pricing Section

### Update Free plan feature list

Find the Free plan feature list items and replace them with:

```html
<li>3 training sessions per week</li>
<li>All three training pillars — Breathwork, Workout & Mobility</li>
<li>Basic CO₂ and O₂ tables</li>
<li>Progress tracking & personal bests</li>
<li>Safety Certification quiz</li>
<li>Ad-supported</li>
```

### Update Premium plan feature list

Find the Premium plan feature list items and replace them with:

```html
<li>Unlimited training sessions</li>
<li>All three training pillars — Breathwork, Workout & Mobility</li>
<li>All 5 breathwork protocols + advanced table types</li>
<li>Advanced training blocks (intermediate & advanced)</li>
<li>Spearfishing technique library</li>
<li>Wearable integration (coming soon)</li>
<li>No ads</li>
```

---

## CHANGE 6 — Footer Description

### Find the footer description:
```
The breath training platform for ocean explorers. Freediving · Spearfishing · Surfing
```

### Replace with:
```
Breathwork · Workout · Mobility training for ocean explorers. Freediving · Spearfishing · Surfing
```

---

## CHANGE 7 — Update sitemap.xml last modified date

In sitemap.xml, find the `<lastmod>` tag for index.html and update the date to today's date.

---

## Verification Checklist

After making all changes, confirm:

- [ ] Hero subheadline updated
- [ ] Hero body copy updated — mentions breathwork, strength and mobility
- [ ] Freedivers card mentions breathwork sequences and 4-week blocks
- [ ] Spearfishers card mentions ocean strength conditioning
- [ ] Surfers card mentions mobility flows and strength conditioning
- [ ] Features section headline updated to "Everything in One App"
- [ ] Feature Card 3 now says "4-Week Training Blocks" (not "Spearfishing Techniques")
- [ ] Feature Card 5 now says "Three Training Pillars" (not "Multi-Language")
- [ ] Feature Card 6 (Wearable Support) still has the Coming Soon badge
- [ ] New Pillars section exists between Features and Screenshots sections
- [ ] Pillars section has 3 cards: Breathwork (cyan top border), Workout (orange), Mobility (grey)
- [ ] Pillars section is responsive — stacks to 1 column on mobile
- [ ] Pricing Free plan has 6 feature bullets
- [ ] Pricing Premium plan has 7 feature bullets — no "Priority support"
- [ ] Footer description updated
- [ ] sitemap.xml lastmod date updated
- [ ] No references to "athletes" or "athlete" anywhere in index.html — search and confirm

---

## After Claude Code Completes

Preview in Live Server, then run:

```
git add .
git commit -m "Align website features with app v0.20 — pillars, breathwork, workout, mobility"
git push
```

Vercel deploys within 30 seconds. Check www.fathomblueco.com to confirm.
