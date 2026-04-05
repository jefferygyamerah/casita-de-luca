#!/usr/bin/env python3
"""
brand-sync.py — Propagate brand tokens across all Visto HTML/JSX files.

Usage:
    python3 brand-sync.py --config CONFIG_PATH [--dry-run] [--colors-only] [--logo-only]

The config JSON must have "previous" and "current" keys, each containing:
  - colors: { tokenName: "#hexvalue", ... }
  - fonts: { heading: { family, fallback, googleImport }, body: { ... } }
  - logo: { wordmark, wordmarkHtml, imageFile, svgFile }
  - rgba: { tokenName: "r,g,b", ... }

The script finds all .html and .jsx files in ~/soyvisto, replaces old values
with new values, and reports what changed.
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path


def hex_to_rgb(hex_color):
    """Convert #RRGGBB to 'r,g,b' string."""
    h = hex_color.lstrip('#')
    return f"{int(h[0:2],16)},{int(h[2:4],16)},{int(h[4:6],16)}"


def find_target_files(base_dir):
    """Find all HTML and JSX files to update."""
    files = []
    base = Path(base_dir)

    # Root HTML files
    for f in base.glob("*.html"):
        files.append(f)

    # JSX prototypes
    for f in (base / "visto-project-files").glob("*.jsx"):
        files.append(f)

    # Test fixtures
    for f in (base / "tests").rglob("*.html"):
        files.append(f)

    return sorted(files)


def build_replacements(previous, current, colors_only=False, logo_only=False):
    """Build old→new replacement pairs from previous and current config."""
    replacements = []

    if logo_only:
        # Only logo replacements
        if previous.get("logo") and current.get("logo"):
            old_wm = previous["logo"].get("wordmarkHtml", "")
            new_wm = current["logo"].get("wordmarkHtml", "")
            if old_wm and new_wm and old_wm != new_wm:
                replacements.append((old_wm, new_wm, "wordmark"))
        return replacements

    # Color hex replacements (case-insensitive)
    prev_colors = previous.get("colors", {})
    curr_colors = current.get("colors", {})
    for token, old_hex in prev_colors.items():
        new_hex = curr_colors.get(token)
        if new_hex and old_hex.lower() != new_hex.lower():
            replacements.append((old_hex, new_hex, f"color:{token}"))

    # Rgba replacements
    prev_rgba = previous.get("rgba", {})
    curr_rgba = current.get("rgba", {})
    for token, old_rgb in prev_rgba.items():
        new_rgb = curr_rgba.get(token)
        if new_rgb and old_rgb != new_rgb:
            replacements.append((old_rgb, new_rgb, f"rgba:{token}"))

    if colors_only:
        return replacements

    # Font replacements
    prev_fonts = previous.get("fonts", {})
    curr_fonts = current.get("fonts", {})
    for role in ("heading", "body"):
        old_font = prev_fonts.get(role, {})
        new_font = curr_fonts.get(role, {})
        if old_font.get("family") and new_font.get("family"):
            if old_font["family"] != new_font["family"]:
                replacements.append((
                    old_font["family"], new_font["family"], f"font:{role}"
                ))
        if old_font.get("googleImport") and new_font.get("googleImport"):
            if old_font["googleImport"] != new_font["googleImport"]:
                replacements.append((
                    old_font["googleImport"], new_font["googleImport"],
                    f"googleImport:{role}"
                ))

    # Logo
    prev_logo = previous.get("logo", {})
    curr_logo = current.get("logo", {})
    if prev_logo.get("wordmarkHtml") and curr_logo.get("wordmarkHtml"):
        if prev_logo["wordmarkHtml"] != curr_logo["wordmarkHtml"]:
            replacements.append((
                prev_logo["wordmarkHtml"], curr_logo["wordmarkHtml"], "wordmark"
            ))

    return replacements


def apply_replacements(file_path, replacements, dry_run=False):
    """Apply replacements to a single file. Returns list of changes made."""
    content = file_path.read_text(encoding="utf-8")
    original = content
    changes = []

    for old_val, new_val, label in replacements:
        count = content.lower().count(old_val.lower())
        if count > 0:
            # Case-insensitive replacement preserving structure
            pattern = re.compile(re.escape(old_val), re.IGNORECASE)
            content = pattern.sub(new_val, content)
            changes.append(f"  {label}: {old_val} → {new_val} ({count} occurrences)")

    if changes and not dry_run:
        file_path.write_text(content, encoding="utf-8")

    return changes


def main():
    parser = argparse.ArgumentParser(description="Propagate brand tokens")
    parser.add_argument("--config", required=True, help="Path to brand-config.json")
    parser.add_argument("--dry-run", action="store_true", help="Report only, no changes")
    parser.add_argument("--colors-only", action="store_true", help="Only update colors")
    parser.add_argument("--logo-only", action="store_true", help="Only update logo")
    parser.add_argument("--base-dir", default=os.path.expanduser("~/soyvisto"),
                        help="Base directory to scan")
    args = parser.parse_args()

    config = json.loads(Path(args.config).read_text())

    if not config.get("previous") or not config.get("current"):
        print("ERROR: brand-config.json must have 'previous' and 'current' keys populated.")
        print("Run /brand-sync with a branding kit to populate them first.")
        sys.exit(1)

    files = find_target_files(args.base_dir)
    print(f"Found {len(files)} target files")

    replacements = build_replacements(
        config["previous"], config["current"],
        colors_only=args.colors_only, logo_only=args.logo_only
    )
    print(f"Built {len(replacements)} replacement rules")

    if not replacements:
        print("No changes needed — previous and current configs are identical.")
        return

    mode = "DRY RUN" if args.dry_run else "APPLYING"
    print(f"\n--- {mode} ---\n")

    total_changes = 0
    for f in files:
        changes = apply_replacements(f, replacements, dry_run=args.dry_run)
        if changes:
            print(f"{f.name}:")
            for c in changes:
                print(c)
            total_changes += len(changes)

    print(f"\n{'Would change' if args.dry_run else 'Changed'}: {total_changes} tokens across {len(files)} files")


if __name__ == "__main__":
    main()
