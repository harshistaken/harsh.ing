# Figma Rules — haarsh.ing

## Reading Designs (Figma → Code)
- Always use `get_design_context` with `clientFrameworks: "react, next.js"` and `clientLanguages: "typescript, css"`.
- The returned code is REFERENCE only — adapt it to our design system tokens, don't copy raw hex values.
- Match the visual output exactly but use our CSS variables (`var(--bg-primary)`, `var(--text-secondary)`, etc.) instead of Figma's raw colors.
- Figma layer names should map to component names and className conventions.
- Screenshots from Figma are the source of truth for visual accuracy.

## Writing Designs (Code → Figma via use_figma)
- Always use auto-layout. No absolute positioning unless truly needed.
- Use Figma variables for colors (reference our variable collections).
- Set proper constraints: horizontal "FILL" for full-width, "HUG" for content-sized.
- Name every layer descriptively — no "Frame 247" or "Rectangle 12".
- Group related elements into frames with auto-layout.
- Set proper padding and gap values matching our 4px grid.
- Text layers: set correct font family, weight, size, line height from our type scale.
- Component naming: `section/hero`, `ui/badge/success`, `ui/button/primary`.

## Font Mapping (Code ↔ Figma)

| Code Font | Figma Font | Usage |
|-----------|------------|-------|
| Fragment Mono | Fragment Mono | Body, nav, descriptions, code, section labels |
| JetBrains Mono Nerd Font | JetBrains Mono | Headings, badges, buttons (Nerd Font glyphs won't render in Figma — use placeholder text or Figma icons) |
| Press Start 2P | Press Start 2P | Game UI only (v1.1) |

**Note**: Nerd Font glyphs (terminal icons) will NOT render in Figma. For tech badge language icons, use Figma's own icon components or text placeholders, and document which Nerd Font codepoint maps to each.

## Icon Mapping (Code ↔ Figma)

| Code | Figma |
|------|-------|
| HugeIcons (`@hugeicons/react`) | Use HugeIcons Figma plugin or equivalent stroke icons |
| Nerd Font glyphs | Use Figma icon components with a note linking to the glyph codepoint |

**Do NOT use Lucide in Figma designs.** Lucide has been removed from the project.

## Auto-Layout Rules
- Direction: VERTICAL for page sections, HORIZONTAL for rows.
- Primary axis alignment: usually MIN (top/left).
- Counter axis alignment: usually MIN or CENTER.
- Padding: use our spacing tokens (8, 12, 16, 20, 24, 32).
- Gap: use our spacing tokens.
- Fill container vs hug contents: fill for containers, hug for text/buttons.

## Variable Collections to Create
1. **colors/dark** — all --bg-*, --text-*, --border-* tokens for dark theme
2. **colors/light** — all tokens for light theme
3. **colors/accent** — theme-independent accent colors (--accent-primary, --accent-secondary, etc.)
4. **spacing** — all spacing tokens (4 through 128)
5. **radius** — sm (4), md (6), lg (8), xl (12), full (9999)

## CSS Variable ↔ Figma Variable Naming

| CSS Variable | Figma Variable |
|-------------|----------------|
| --bg-primary | colors/bg-primary |
| --bg-secondary | colors/bg-secondary |
| --text-primary | colors/text-primary |
| --text-secondary | colors/text-secondary |
| --accent-primary | colors/accent-primary |
| --border-default | colors/border-default |
| (etc.) | (etc.) |

## Text Style Names
Format: `font/role/size` — e.g., `jetbrains/display/48`, `fragment/body/15`
