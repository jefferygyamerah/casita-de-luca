---
name: brand-sync
description: >
  Propagate branding (logo, colors, fonts, spacing) across all Visto HTML pages
  and JSX prototypes. Trigger when: user provides a branding kit, logo file, or
  updated color palette; user says "update branding", "sync brand", "apply new
  colors", "propagate logo", "brand-sync"; or when brand tokens need updating
  across the soyvisto repo.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Agent
argument-hint: "[--dry-run] [--colors-only] [--logo-only] [--upload]"
---

# /brand-sync — Propagate Branding Across All Visto Pages

**First:** Read `LEARNINGS.md` in this skill's directory.

**Arguments:** `$ARGUMENTS`

## Step 1: Load Current Brand Config

Read `references/brand-config.json` in this skill's directory. This is the single source of truth for all brand tokens.

If the user is providing a NEW branding kit, update `brand-config.json` first with the new values before propagating.

The config contains:
- `colors`: all color hex values (green, greenDark, greenLight, greenMid, dark, darkMid, text, textMuted, textLight, border, borderLight, bg, red, redLight)
- `fonts`: heading and body font families
- `logo`: path to logo file, wordmark text, wordmark HTML
- `spacing`: base grid unit

## Step 2: Scan Target Files

Find all files that contain brand tokens:

```bash
# HTML pages (standalone)
find ~/soyvisto -maxdepth 1 -name "*.html" -type f

# JSX prototypes
find ~/soyvisto/visto-project-files -name "*.jsx" -type f

# Test fixtures
find ~/soyvisto/tests -name "*.html" -type f
```

Build a list of files to update. Report count to user.

## Step 3: Identify Token Locations

For each file, identify which brand tokens are present and where:

1. **Tailwind config blocks** — `tailwind.config = { theme: { extend: { colors: { ... }}}}`
2. **CSS `const C` objects** — `const C = { green: "#1AB87A", ... }` (in JSX files)
3. **Inline hex values** — any hardcoded hex that matches a current brand color
4. **Font references** — Google Fonts import URLs, font-family declarations
5. **Logo/wordmark** — `Visto<span ...>.</span>` pattern in nav bars
6. **Rgba values** — `rgba(26,184,122,...)` patterns (derived from brand green #1AB87A = rgb(26,184,122))

If `--dry-run` flag is passed, report findings without making changes and stop here.

## Step 4: Apply Updates

Run `scripts/brand-sync.py` to perform the replacements:

```bash
python3 .claude/skills/brand-sync/scripts/brand-sync.py \
  --config .claude/skills/brand-sync/references/brand-config.json \
  [--colors-only] [--logo-only] [--dry-run]
```

The script handles:
- Tailwind config color blocks (exact JSON replacement)
- CSS const C objects (exact object replacement)
- Inline hex values (global find/replace with old→new mapping)
- Rgba derived values (recalculated from new hex)
- Font import URLs (updated if fonts changed)
- Logo/wordmark HTML (replaced if logo changed)

## Step 5: Verify

After applying changes:

1. Run Playwright tests to ensure nothing broke:
   ```bash
   npx playwright test
   ```

2. Spot-check 3 files visually — screenshot with Puppeteer and compare:
   ```bash
   node screenshot.js <file> /tmp/brand-check.png
   ```

3. Verify no orphaned old hex values remain:
   ```bash
   grep -r "OLD_HEX_VALUE" ~/soyvisto/*.html ~/soyvisto/visto-project-files/*.jsx
   ```

## Step 6: Upload to WordPress (if --upload flag)

If the user passes `--upload`, re-upload all changed HTML files to soyvisto.com:

```bash
export WP_APP_PASSWORD="$WP_APP_PASSWORD"
for file in CHANGED_FILES; do
  filename=$(basename "$file")
  # Delete existing media with same name first
  # Then upload fresh
  curl -s -X POST "https://soyvisto.com/wp-json/wp/v2/media" \
    -u "admin:${WP_APP_PASSWORD}" \
    -H "Content-Disposition: attachment; filename=${filename}" \
    -H "Content-Type: text/html" \
    --data-binary @"$file"
done
```

## Step 7: Commit

Stage changed files, commit with message:
```
style: update brand tokens — [what changed]
```

Push to main. Sync qa and dev branches.

## Rules

- NEVER hardcode colors anywhere — always reference brand-config.json
- NEVER change content, layout, or functionality — only brand tokens
- The `const C = { ... }` object in JSX files and the `tailwind.config` block in HTML files must stay structurally identical — only values change
- Rgba values must be recalculated from the new hex, not guessed
- If a color doesn't exist in brand-config.json, leave it alone
- Always run tests after applying changes
- If `--dry-run` is passed, report what WOULD change but don't modify any files
- Logo updates: the wordmark `Visto.` pattern must be preserved — only the logo image/SVG and colors change, not the text
- Before overwriting brand-config.json, copy the current file to references/brand-config.previous.json as backup
