# Website_Working_Style.md — Fathom Blue Website
> **Read this at the start of every Claude Code session for the website.**
> These rules govern how Claude Code works on the Fathom Blue website.
> Based on the app's WORKING_STYLE.md — adapted for static website context.
> Where this file is silent, the app's WORKING_STYLE.md communication
> patterns and preferences apply (see "What Hugues prefers" section).

---

## What's the Same as the App Working Style

The following rules from WORKING_STYLE.md apply to the website unchanged:

**Communication patterns (all apply):**
- Short paragraphs, no walls of text
- Name your lean — "My lean: X" with one-sentence reason
- Push back when you disagree — name the tradeoff
- Own mistakes directly — "I was wrong. Here's what I missed."
- Flag when something feels off — diagnose before fixing
- No sycophancy at message start — never open with "Great question!"
- Ask explicit yes/no questions when you need a decision
- Tighter cadence — short status, questions if needed, recommendation, next action

**What Hugues prefers (all apply):**
- Hugues handles Supabase SQL and terminal commands himself — Claude Code gives instructions only
- Claude Code briefs are explicit and specific — not "clean this up"
- Incremental commits after each working feature
- Explain technical decisions — don't just make them
- Windows 10 + PowerShell dev environment
- Lead with the recommendation, not the options list
- Be stubborn about information you need — don't proceed blind

---

## What's Different for the Website

### No Brief Files Required

The app uses downloadable `.md` brief files delivered via chat. The website is simpler — instructions are pasted directly into Claude Code as plain text prompts. Reason: website tasks are smaller in scope and don't require the same level of formal briefing.

**Rule:** Paste Claude Code instructions directly in chat for website tasks. Reserve `.md` brief files for complex multi-step changes only.

### No SQL in Claude Code Prompts

The same rule applies: SQL that Hugues runs (Supabase Table Editor, SQL Editor) is delivered in chat as fenced code blocks. Never inside Claude Code prompts. Claude Code does not run SQL.

### No Schema Verification Required for Routine Updates

The "verify before writing" rule from WORKING_STYLE.md applies to database table changes. For the website, the only table is `waitlist` (4 columns, well-documented). Routine copy/style/layout changes do not require schema verification.

**Rule:** Run schema verification SQL only when changing the waitlist form behaviour, adding new Supabase tables, or modifying how data is sent to Supabase.

Schema probe for waitlist:
```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'waitlist'
ORDER BY ordinal_position;
```

### No Sub-Agents

The app uses five Claude Code sub-agents (Code Reviewer, SQL Writer, Documentation Updater, Test Runner, fathom-blue-diagnostics). These are app-specific and not configured for the website repo. Do not reference or invoke them for website work.

### No TypeScript — No `tsc` Checks

The website is plain JavaScript. There is no TypeScript compiler, no `tsconfig.json`, no type errors. Do not run `npx tsc --noEmit` or any TypeScript tooling on website sessions.

### No Expo / React Native / Metro

The website has no Expo, no React Native, no Metro bundler, no `npx expo start`. Do not reference these tools in website sessions.

### No Dev Buttons

The app uses `__DEV__`-gated buttons on the Home screen for testing. The website has no equivalent concept. Testing is done via Live Server (VS Code) and the live Vercel deployment.

### Testing is Simple

| App testing | Website testing |
|-------------|----------------|
| Physical Android device via Expo Go | Live Server (right-click index.html → Open with Live Server) |
| Device-specific state setup | No state — just open the URL |
| Dev buttons for navigation | Not needed — scroll to section |
| Sub-agent diagnostics | Manual visual check + form test |

**Website test checklist for any change:**
1. Open Live Server — visual check at desktop width
2. Resize to mobile — check responsive layout
3. Check relevant section looks correct
4. If form changed: submit test email, check Supabase Table Editor
5. Push to GitHub, check live at www.fathomblueco.com within 30 seconds

### No Untouchable File List

The app has a formal untouchable file list for complex renderers and hooks. The website has no equivalent — all files can be modified. However:

**Files that require extra care:**
- `vercel.json` — security headers and redirect rules. Always check CSP after edits — a wrong CSP can break the waitlist form or block fonts.
- `js/main.js` — waitlist form logic. After any change, test the form end-to-end (submit email, check Supabase).
- DNS records in Hostinger — **never touch the hub CNAME** (hub.fathomblueco.com serves the Marketing Hub).

### Commit After Every Change

Same pattern as the app — commit after every validated change:

```bash
git add .
git commit -m "Brief description of change"
git push
```

Vercel auto-deploys within ~30 seconds. Always verify on the live site after pushing.

---

## Common Website Claude Code Prompts

Use these as starting points. Be specific about which section/element to change.

### Copy change
```
In index.html, find "[exact current text]" and replace with "[new text]".
Save the file.
```

### Style change
```
In css/styles.css, find the [section name] styles and change [property] from [old value] to [new value].
Save the file.
```

### New section
```
In index.html, add a new section after [existing section id].
The section should have: headline "[X]", body text "[Y]", background [colour].
Use the same card style as the existing [features/audience] section.
```

### Supabase form change
```
In js/main.js, find the submitWaitlist function.
Change [specific behaviour].
After changing, describe what you changed so I can test the form.
```

### Security header change
```
In vercel.json, find the Content-Security-Policy header.
Add [new domain] to the [connect-src/script-src/img-src] directive.
Confirm the full updated CSP value after the change.
```

### Social link update
```
In index.html, find the footer social links section.
Update the [platform] link href from [old URL] to [new URL].
```

---

## What to Check at the Start of Every Website Session

1. **Is the site live?** Visit www.fathomblueco.com — confirm it loads
2. **Is Make.com active?** Confirm the "Fathom Blue Waitlist" scenario is ON
3. **Any pending items from last session?** Check Website_Project_State.md
4. **OG image status?** If not yet created, this is the highest priority pending task

---

## Key Brand Rules — Never Violate

- Always "ocean explorers" — never "ocean athletes"
- Always "Explorer/Explorers" — never "Athlete/Athletes"
- Primary colour: `#00C8D4` (cyan) — never substitute
- Secondary colour: `#FF6B35` (orange) — use sparingly
- No inline `<script>` blocks in HTML — all JS in js/main.js
- No `unsafe-inline` in CSP script-src
- Never touch hub CNAME in Hostinger DNS
- Never add Priority support back to Premium pricing
- Keep Coming Soon badge on Wearable Support until integration is live

---

*Fathom Blue Website_Working_Style.md v1.0 — April 2026*
