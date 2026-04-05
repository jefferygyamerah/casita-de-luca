# Brand Sync — Learnings

<!-- Lessons learned from running this skill. Read at start of every invocation. -->

## Logo (2026-04-05)

- Logo is a circular image: teal house outline with a white fluffy dog inside.
- "La casita de" is written in teal, "Luca" in coral/pink.
- Colors are derived from the Instagram profile: @lacasitadeluca
- Teal `#7DD3D8` is the primary brand color (circle, house, CTA buttons).
- Coral `#E85D5D` is the accent color ("Luca" wordmark, highlights).
- Favicon (`public/favicon.svg`) is a paw print in teal — used in browser tab only.
- No external logo SVG file in the repo yet. Logo appears only in the Instagram profile picture.

## Color System (2026-04-05)

- All colors are defined in `src/index.css` inside the `@theme` block as CSS custom properties.
- Tailwind 4 picks these up automatically — no `tailwind.config.js` needed.
- The warmCream `#FFFAF6` is the default page background (set on `body`).
- Do not confuse `charcoal` (#2D2D2D) with `darkText` (#2D2D2D) — they are the same value, used in different semantic contexts.
