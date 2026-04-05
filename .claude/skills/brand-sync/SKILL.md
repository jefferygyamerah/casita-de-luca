---
name: brand-sync
description: >
  Propagate branding (colors, fonts, logo tokens) across all Casita de Luca
  React components and pages. Trigger when: user provides updated colors or logo;
  user says "update branding", "sync brand", "apply new colors", "brand-sync";
  or when brand tokens drift from the source of truth in brand-config.json.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
argument-hint: "[--dry-run] [--colors-only] [--fonts-only]"
---

# /brand-sync — Propagate Branding Across La Casita de Luca

**First:** Read `LEARNINGS.md` in this skill's directory.

**Arguments:** `$ARGUMENTS`

## Step 1: Load Current Brand Config

Read `references/brand-config.json` in this skill's directory. This is the single source of truth.

If the user is providing NEW branding values, update `brand-config.json` first (backing up current to `references/brand-config.previous.json`) before propagating.

The config contains:
- `colors`: all color hex values with semantic names
- `fonts`: heading (Nunito) and body (Quicksand) font families + Google Fonts URL
- `logo`: favicon path, brand name, primary/accent colors

## Step 2: Scan Target Files

Find all files containing brand tokens:

```bash
# CSS theme (primary source)
cat src/index.css

# React components and pages
find src -name "*.jsx" -o -name "*.tsx" | sort

# HTML entry point (font import)
cat index.html
```

## Step 3: Identify Token Locations

For each file, identify which brand tokens are present:

1. **`src/index.css` `@theme` block** — CSS custom properties (`--color-teal`, `--font-heading`, etc.)
2. **`index.html` font import** — Google Fonts `<link>` tag
3. **Hardcoded hex values** in JSX — any hex that matches a current brand color
4. **Tailwind class names** — `bg-teal`, `text-coral`, etc. (these reference the theme, no change needed unless token names change)

If `--dry-run` is passed, report findings without making changes and stop here.

## Step 4: Apply Updates

The primary target is `src/index.css`. Update the `@theme` block to match `brand-config.json`.

For each changed color, find any hardcoded hex instances in JSX files and replace:

```bash
grep -rn "#OLD_HEX" src/
# Then edit each occurrence
```

For font changes, update:
1. `src/index.css` — `--font-heading` and `--font-body` values
2. `index.html` — Google Fonts import URL

## Step 5: Verify

After applying changes:

1. Check no old hex values remain:
   ```bash
   grep -rn "#OLD_HEX" src/
   ```

2. Verify `src/index.css` `@theme` block matches `brand-config.json` exactly.

3. Run dev server briefly to confirm no build errors:
   ```bash
   npm run build 2>&1 | tail -20
   ```

## Step 6: Commit

```
style: sync brand tokens — [what changed]
```

## Rules

- NEVER change content, layout, or functionality — only brand tokens
- `src/index.css` is the single source of rendering truth — update it first
- Tailwind class names (e.g. `bg-teal`) do NOT need changing unless token names change
- If a color isn't in `brand-config.json`, leave it alone
- Before overwriting `brand-config.json`, copy current to `references/brand-config.previous.json`
- Rgba values must be recalculated from the new hex, not guessed
