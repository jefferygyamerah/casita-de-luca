---
name: visto-ds
description: Apply the Visto design system to any Next.js page or component. Use when the user says "apply the design system", "polish this page", "make this match Visto style", "/visto-ds", or asks to enforce brand consistency on a Tailwind/Next.js file. Enforces Montserrat+Roboto fonts, the Visto color palette, spacing rhythm, and canonical component patterns.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: "[file or component to polish]"
---

# /visto-ds — Apply Visto Design System

**First:** Read `LEARNINGS.md` in this skill's directory.
**Arguments:** `$ARGUMENTS`

## What this skill does

Audits a Tailwind/Next.js component against the Visto design system and applies corrections in-place. Output is a diff-ready edit — className and structure only, no logic changes.

Read `references/design-system-source.md` for the full canonical reference when resolving edge cases.

---

## Design System Quick Reference

### Colors — ONLY these tokens (defined in tailwind.config.js)

| Token | Hex | Usage |
|-------|-----|-------|
| `green` | `#1AB87A` | Buttons, accents, icons, CTAs |
| `green-dark` | `#09756A` | Hover states, icon fills |
| `green-light` | `#E8F8F2` | Icon container backgrounds, tints |
| `green-mid` | `#C6EFE0` | Card hover borders |
| `dark-DEFAULT` | `#0F1727` | Primary dark bg, headings on light |
| `dark-mid` | `#1C2B3A` | Gradient dark end |
| `visto-text` | `#2D3748` | Body text on white |
| `visto-muted` | `#6B7280` | Secondary text, captions |
| `visto-light` | `#9CA3AF` | Micro text, disabled |
| `visto-border` | `#E5E7EB` | Card borders, dividers |
| `visto-borderLight` | `#F3F4F6` | Subtle borders, step numbers |
| `visto-bg` | `#F7F8FA` | Page bg, card bg on white sections |
| `red` | `#EF4444` | Errors only |

Never use `gray-*`, `slate-*`, `emerald-*`, or raw hex values inline. Logo green `#0A9947` is SVG-only.

### Typography levels — use exactly these

| Level | Classes |
|-------|---------|
| Eyebrow | `font-heading text-[11px] font-bold tracking-[0.14em] uppercase` |
| Micro | `font-body text-[11px]` |
| Caption | `font-body text-xs` |
| Body SM | `font-body text-[13px]` |
| Body | `font-body text-sm` |
| Body LG | `font-body text-base md:text-[17px]` |
| Card Title SM | `font-heading text-[13px] font-bold` |
| Card Title | `font-heading text-[15px] font-extrabold` |
| H2 | `font-heading text-2xl md:text-3xl font-extrabold` |
| H1 | `font-heading text-3xl md:text-[42px] font-extrabold` |
| Stat | `font-heading text-2xl font-extrabold text-green` |

No `font-semibold` — use `font-bold` or `font-extrabold`. No `font-medium` on headings or CTAs.

### Spacing rhythm

```
Standard section:    py-14 md:py-16
Hero section:        py-16 md:py-24
Section header → grid:  mb-10
Card padding:        p-5 (standard)  p-6 (large)
Grid gap:            gap-4 (standard)  gap-5 (medium)
Icon container:      w-10 h-10 rounded-lg (small)  w-12 h-12 rounded-xl (large)
Container widths:    max-w-5xl mx-auto px-5 (wide)
```

### Global CSS classes — use, don't recreate inline

- `.btn-primary` — green filled, shadow, hover lift
- `.btn-secondary` — bordered, hover green tint  
- `.btn-ghost` — text-only button
- `.card-hover` — border + shadow on hover
- `.section` — standard section padding
- `.section-header` — heading block bottom margin

---

## Motion — Tailwind only, high-impact moments

Visto bans framer-motion. All animation via Tailwind utilities.

**Principle:** One coordinated entry sequence per page beats scattered micro-interactions. Pick the highest-impact element (hero heading, card grid, stats row) and animate that. Leave the rest static.

**Staggered reveal pattern (hero / above-the-fold):**
```tsx
// Parent triggers children with increasing delay
<h1 className="animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
<p className="animate-fade-in-up opacity-0 [animation-delay:120ms] [animation-fill-mode:forwards]">
<div className="animate-fade-in-up opacity-0 [animation-delay:240ms] [animation-fill-mode:forwards]">
```
Define in globals.css:
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.4s ease-out; }
```

**Hover micro-interactions (cards, buttons):**
```
transition-all duration-200 ease-out
hover:-translate-y-0.5 hover:shadow-md        ← cards
hover:-translate-y-px                          ← buttons (already in btn-primary)
```

**When to add motion vs. skip:**
- ADD: hero heading + subtext + CTA (staggered), card grid on scroll-into-view, stat counters
- SKIP: nav items, form fields, body text, anything below the fold that isn't a focal point
- MAX delay chain: 4 elements × 120ms = 480ms total. Never exceed this.

---

## Spatial Composition — depth over flatness

**Principle:** Every section should have one deliberate choice between generous negative space (premium/calm) or controlled density (trust/information-rich). Don't mix accidentally — pick one per section.

**Depth techniques for Visto (within brand):**
```tsx
// Layered orbs for hero atmosphere (already used in banner — extend this pattern)
<div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.06] bg-green blur-3xl" />
<div className="absolute bottom-0 left-1/3 w-48 h-48 rounded-full opacity-[0.04] bg-green blur-2xl" />

// Subtle grain overlay on dark sections
<div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] bg-repeat pointer-events-none" />

// Layered card shadow for premium feel
shadow-[0_2px_8px_rgba(15,23,39,0.06),0_8px_24px_rgba(15,23,39,0.04)]
```

**Per-section composition audit:**
- Hero: should feel open, breathing — reduce padding-heavy clutter
- Feature cards: controlled density — consistent internal rhythm, no orphaned elements
- Stats row: generous space between numbers — let the figures read first
- CTA sections: isolated, asymmetric if possible (text left, visual right or vice versa)

---

## Typography Intent — why Montserrat + Roboto

Montserrat = authority, structure, Panamanian professional trust. Use for headings, labels, buttons — anything that commands attention.

Roboto = readability, neutrality. Use for body copy, descriptions, meta text — anything that needs to be read, not noticed.

**When polishing typography, ask:**
- Is this element asking to be NOTICED (→ font-heading) or READ (→ font-body)?
- Does the size create a clear hierarchy from 1m away on mobile? (H1 > H2 > card title > body)
- Is there one dominant typographic element per section? (Don't compete with two bold headings at the same scale)

---

## Page-level quality check

Before reporting done, ask: **"What's the one thing someone will remember about this page?"**

If the answer is "nothing in particular" — the page needs a focal point. Options:
- Sharpen the hero heading (stronger verb, fewer words)
- Add one high-contrast stat or proof element above the fold
- Give the primary CTA more visual isolation (more surrounding whitespace)

---

## Step 1: Identify the target

If `$ARGUMENTS` names a file path, read it directly.
If it's a component name (e.g., `HomepageClient`), glob for it in `~/soyvisto/next/`.
If no argument, ask: "Which file or component should I apply the design system to?"

## Step 2: Audit for violations

Scan the file and list violations by category:

1. **Color** — `gray-*`, `slate-*`, `emerald-*`, raw hex strings, `-DEFAULT` suffix on colors that shouldn't have it (use `text-green` not `text-green-DEFAULT`)
2. **Font weight** — `font-semibold` on any heading or CTA, `font-medium` on headings
3. **Font family** — missing `font-heading` on h1/h2/labels, missing `font-body` on paragraphs
4. **Typography size** — any size not in the level table above
5. **Spacing** — `py-10`, `py-12`, `py-20` on sections (should be `py-14` or `py-16`)
6. **Card padding** — not `p-5` or `p-6`
7. **Buttons** — inline button styles instead of `.btn-primary` / `.btn-secondary` / `.btn-ghost`
8. **Touch targets** — interactive elements missing `min-h-[44px]` on mobile
9. **Images** — `<img>` instead of `next/image`
10. **Motion** — any framer-motion imports; missing entry animation on hero; hover transitions not using `transition-all duration-200`
11. **Depth** — flat dark sections with no atmospheric layering (missing orbs/blur); cards with no shadow depth
12. **Composition** — sections with no clear focal point; mixed density (some elements cramped, others too sparse in the same section)

Report each violation as `file:line — description`.

## Step 3: Apply corrections

Edit the file. Rules:
- className changes only — no logic, no structural rewrites unless structure violates the system
- Map every off-token color to the nearest design system token
- Replace ad-hoc font classes with level table equivalents
- Replace inline button styles with global classes
- Replace inline section padding with `.section` where appropriate
- Section backgrounds must follow the alternating pattern (see `references/design-system-source.md`)

## Step 4: Report

List what changed (file:line, before → after). Flag anything that requires a logic change as a handoff item — don't touch it.

---

## Rules

- **No logic changes** — className, layout, spacing, typography only.
- **No new features** — note missing things in handoff, don't add them.
- **i18n intact** — never replace `t('key')` with hardcoded strings.
- **No `dark:` variants** — dark mode is disabled on this project.
- **No framer-motion** — Tailwind `transition`/`duration-`/`ease-` only.
- **No commented-out code**.
- The source of truth is `~/soyvisto/docs/design-system.md` and `~/soyvisto/next/tailwind.config.js`. Read them when resolving ambiguity.
