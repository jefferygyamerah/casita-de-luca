# Brand Sync - Learnings

<!-- Lessons learned from running this skill. Read at start of every invocation. -->

## Logo (2026-03-25)

- The logo uses designer green `#0A9747`, which is NOT the brand green `#1AB87A`. Brand green is for UI elements (buttons, CTAs, accents). Logo green is only inside logo SVGs.
- Logo is an inline SVG with `viewBox="1700 2020 3300 980"`, extracted from the designer's original file.
- The "o" in "Visto" is a compound path (outer ellipse + inner cutout in the same `<path>` element). Do NOT separate them into two paths — it will break the letterform.
- There are 55 logo instances across 32 files: each file has a nav (dark) variant and a footer (white) variant.
- Logo SVG files: `assets/visto-logo-dark.svg` (dark text, for light backgrounds) and `assets/visto-logo-white.svg` (white text, for dark backgrounds).
- The old text-based wordmark (`<div>Visto<span>.</span></div>` and hand-drawn SVG with `<text>` elements) has been fully replaced by the designer SVGs.
