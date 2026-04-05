# Visto Design System
> Derived from: branding pack (direction) + `src/pages/para-profesionales.html` (execution)  
> All UI must converge to this system. Do not introduce new sizes, spacing, or component variants.

---

## Colors

```
vgreen:       #1AB87A   — UI green (buttons, accents, icons)
vgreenDark:   #09756A   — hover states, icon fills
vgreenLight:  #E8F8F2   — icon container backgrounds, tints
vgreenMid:    #C6EFE0   — card hover borders
vdark:        #0F1727   — primary dark background, headings on light
vdarkMid:     #1C2B3A   — gradient dark end
vtext:        #2D3748   — body text on white
vtextMuted:   #6B7280   — secondary body text, captions
vtextLight:   #9CA3AF   — micro text, disabled
vborder:      #E5E7EB   — card borders, dividers
vborderLight: #F3F4F6   — subtle borders, decorative step numbers
vbg:          #F7F8FA   — page background, card bg on white sections
red:          #EF4444   — errors only

Logo green:   #0A9947   — logo SVG only, never used in UI
```

---

## Typography

Single font family pair: **Montserrat** (heading) + **Roboto** (body).  
Lufga is the brand font from the kit — not in production (not on Google Fonts).

### Levels — use exactly these, no others

| Level | Classes | Usage |
|-------|---------|-------|
| Eyebrow | `font-heading text-[11px] font-bold tracking-[0.14em] uppercase` | Section labels above headings |
| Micro | `font-body text-[11px]` | Author subtitles, tag lines |
| Caption | `font-body text-xs` | Stat labels, nav hints |
| Body SM | `font-body text-[13px]` | Card body text |
| Body | `font-body text-sm` | Standard body, testimonials |
| Body LG | `font-body text-base md:text-[17px]` | Hero subtext only |
| Card Title SM | `font-heading text-[13px] font-bold` | Dark-bg card headings |
| Card Title | `font-heading text-[15px] font-extrabold` | Light-bg card headings |
| H2 | `font-heading text-2xl md:text-3xl font-extrabold` | Section headings |
| H1 | `font-heading text-3xl md:text-[42px] font-extrabold` | Hero heading only |
| Stat | `font-heading text-2xl font-extrabold text-vgreen` | Hero trust stats |
| Decorative | `font-heading text-3xl font-extrabold text-vborderLight` | Step numbers (background) |

---

## Spacing

**Grid:** 8pt base.

### Section padding
```
Standard section:  py-14 md:py-16
Hero section:      py-16 md:py-24
```

### Containers
```
Wide:    max-w-5xl mx-auto px-5
Medium:  max-w-4xl mx-auto px-5
Narrow:  max-w-2xl mx-auto px-5
```

### Cards
```
Card padding standard:  p-5
Card padding large:     p-6
Grid gap standard:      gap-4
Grid gap medium:        gap-5
```

### Internal vertical rhythm
```
Eyebrow → H2:        mb-2 on eyebrow
H2 → body:           mt-3
Section header → grid: mb-10
Icon → title:        mb-2 (inside card)
Title → body:        implicit (no extra margin)
Card → CTA row:      mt-8 / mt-10
Stat row:            mt-12
```

### Icon containers
```
Small:  w-10 h-10 rounded-lg
Large:  w-12 h-12 rounded-xl
```

---

## Components

### Eyebrow + Section Header
```html
<div class="text-center mb-10">
  <div class="font-heading text-[11px] font-bold text-vgreen tracking-[0.14em] uppercase mb-2">Label</div>
  <h2 class="font-heading text-2xl md:text-3xl font-extrabold text-vdark">Heading</h2>
  <!-- optional subtext -->
  <p class="font-body text-sm text-vtextMuted leading-relaxed max-w-lg mx-auto mt-3">…</p>
</div>
```

### Feature Card (light bg)
```html
<div class="card-hover bg-white border border-vborder rounded-xl p-6">
  <div class="w-10 h-10 rounded-lg bg-vgreenLight flex items-center justify-center mb-4">
    <svg class="w-5 h-5 text-vgreenDark" …/>
  </div>
  <div class="font-heading text-[15px] font-extrabold text-vdark mb-2">Title</div>
  <p class="font-body text-[13px] text-vtextMuted leading-relaxed">Body</p>
</div>
```

### Feature Card (dark bg)
```html
<div class="bg-white/[0.06] border border-white/[0.1] rounded-xl p-5">
  <div class="text-xl mb-3"><!-- emoji icon --></div>
  <div class="font-heading text-[13px] font-bold text-white mb-1.5">Title</div>
  <p class="font-body text-[13px] text-white/50 leading-relaxed">Body</p>
</div>
```

### Step Card
```html
<div class="relative bg-vbg border border-vborder rounded-xl p-6 text-center">
  <div class="absolute top-4 right-4 font-heading text-3xl font-extrabold text-vborderLight">01</div>
  <div class="w-12 h-12 rounded-xl bg-vgreenLight flex items-center justify-center mb-4 mx-auto">
    <svg class="w-6 h-6 text-vgreenDark" …/>
  </div>
  <div class="font-heading text-[15px] font-extrabold text-vdark mb-2">Title</div>
  <p class="font-body text-[13px] text-vtextMuted leading-relaxed">Body</p>
</div>
```

### Testimonial Card
```html
<div class="bg-vbg border border-vborder rounded-xl p-5">
  <p class="font-body italic text-sm text-vtext leading-relaxed border-l-[3px] border-vgreen pl-3.5 mb-5">
    "Quote text."
  </p>
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-lg bg-[#059669] flex items-center justify-center text-white font-heading text-xs font-extrabold shrink-0">AB</div>
    <div>
      <div class="font-heading text-[13px] font-bold text-vdark">Name</div>
      <div class="font-body text-[11px] text-vtextMuted">Title · Location</div>
    </div>
  </div>
</div>
```

### CTA Button (primary)
```html
<a href="#" class="cta-btn inline-block bg-vgreen text-white font-heading text-sm font-bold px-8 py-3.5 rounded-lg tracking-wide shadow-[0_6px_20px_rgba(26,184,122,0.4)] no-underline">
  LABEL →
</a>
```

### CTA Button (nav / small)
```html
<a href="#" class="cta-btn bg-vgreen text-white font-heading text-xs font-bold px-4 py-2 rounded-md tracking-wide no-underline">
  LABEL
</a>
```

### Badge / Pill
```html
<div class="inline-flex items-center gap-1.5 bg-[rgba(26,184,122,0.15)] border border-[rgba(26,184,122,0.3)] rounded px-3 py-1">
  <span class="font-heading text-[11px] font-bold text-vgreen tracking-widest uppercase">Label</span>
</div>
```

### Nav
```html
<nav class="sticky top-0 z-50 bg-white border-b border-vborder shadow-sm">
  <div class="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
    <!-- logo left, single CTA right -->
  </div>
</nav>
```

---

## Section Backgrounds (alternating pattern)

| # | Background | Usage |
|---|------------|-------|
| 1 | `bg-gradient-to-br from-vdark to-vdarkMid` | Hero |
| 2 | `bg-vbg` | First content section |
| 3 | `bg-white border-t border-vborder` | Alternating light |
| 4 | `bg-gradient-to-br from-vdark to-vdarkMid` | Mid-page dark emphasis |
| 5 | `bg-white border-t border-vborder` | Social proof / form |

---

## CSS Utilities (required in `<style>`)

```css
.cta-btn {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(26,184,122,0.45);
}
.cta-btn:active { transform: translateY(0); }

.card-hover {
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.card-hover:hover {
  border-color: #C6EFE0;
  box-shadow: 0 4px 16px rgba(26,184,122,0.08);
}
```

---

## Tailwind Config (required in every page)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        vgreen:       '#1AB87A',
        vgreenDark:   '#09756A',
        vgreenLight:  '#E8F8F2',
        vgreenMid:    '#C6EFE0',
        vdark:        '#0F1727',
        vdarkMid:     '#1C2B3A',
        vtext:        '#2D3748',
        vtextMuted:   '#6B7280',
        vtextLight:   '#9CA3AF',
        vborder:      '#E5E7EB',
        vborderLight: '#F3F4F6',
        vbg:          '#F7F8FA',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body:    ['Roboto', 'sans-serif'],
      },
    },
  },
}
```
