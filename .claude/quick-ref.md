# Quick Reference — haarsh.ing

## Color Tokens (copy-paste)
```
DARK THEME:
  --bg-primary: #0D0D0C    --bg-secondary: #1A1A18   --bg-tertiary: #252523   --bg-surface: #2E2E2B
  --text-primary: #FAF9F5   --text-secondary: #B0AEA5  --text-tertiary: #7A7870  --text-muted: #4A4A44
  --border-default: #2E2E2B  --border-subtle: #1F1F1D   --border-strong: #3D3D38

LIGHT THEME:
  --bg-primary: #FAF9F5    --bg-secondary: #F0EFE8   --bg-tertiary: #E8E6DC   --bg-surface: #FFFFFF
  --text-primary: #141413   --text-secondary: #5C5B55  --text-tertiary: #8A8880  --text-muted: #B0AEA5
  --border-default: #E8E6DC  --border-subtle: #F0EFE8   --border-strong: #D0CEC5

ACCENTS (both themes):
  --accent-primary: #D97757       --accent-primary-hover: #C4684A   --accent-primary-muted: #D9775715
  --accent-secondary: #6A9BCC     --accent-tertiary: #788C5D
  --pixel-orange: #E8715A         --status-error: #CC5F5F           --status-warning: #D4A847
```

## Typography Quick Map
```
FONT VARIABLES:
  --font-fragment  (Fragment Mono)   → Tailwind: font-fragment
  --font-jetbrains (JetBrains Mono)  → Tailwind: font-jetbrains
  --font-nf        (Nerd Font)       → Tailwind: font-nf
  --font-micro     (Micro 5)         → Tailwind: font-micro

WHO USES WHAT:
  font-fragment  → body, nav links, descriptions, code, timestamps, terminal prompts
  font-jetbrains → hero name, page titles, card titles, badges, buttons, accent text
  font-micro     → navbar "HARSH" logo, section heading labels (18-24px, distinctive pixel feel)
  font-nf        → tech badge glyphs, powerline symbols (decorative only)

SIZES:
  display: JBM 48px/800    h1: JBM 36px/700    h2: JBM 28px/600    h3: JBM 22px/600    h4: JBM 18px/600
  body: FM 15px/400    body-sm: FM 13px/400    caption: FM 12px/400    micro: JBM 10px/500 UPPER
  section-label: FM SC 12px/400 small-caps    code: FM 14px/400    quote: FM 17px/400
```

## Icon Decision Tree
```
Is it a tech language/framework icon? → Nerd Font glyph (aria-hidden="true")
Is it anything else (nav, social, UI)? → HugeIcons (@hugeicons/core-free-icons)
Is it from Lucide? → NO. Lucide is removed. Find the HugeIcons equivalent.
```

## Spacing (4px grid)
```
--spacing-1: 4    --spacing-2: 8    --spacing-3: 12   --spacing-4: 16   --spacing-5: 20   --spacing-6: 24
--spacing-8: 32   --spacing-10: 40  --spacing-12: 48  --spacing-16: 64  --spacing-20: 80  --spacing-24: 96  --spacing-32: 128
```

## Radius
```
--radius-sm: 4px   --radius-md: 6px   --radius-lg: 8px   --radius-xl: 12px   --radius-full: 9999px
```

## Badge Variants
```
success:  bg accent-tertiary/12%    text accent-tertiary      [ONLINE] [OPEN SOURCE]
error:    bg status-error/12%       text status-error          [CLOSED] [ABANDONED]
warning:  bg status-warning/12%     text status-warning        [IN DEV] [IN PROGRESS]
info:     bg accent-secondary/12%   text accent-secondary      [FEATURED]
tech:     bg bg-tertiary            text text-secondary        [NEXT.JS] [REACT]
verified: bg accent-primary/12%     text accent-primary        [✓ VERIFIED]
```

## Braille Spinner
```
Frames: ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
Speed: 80ms/frame
Active: "⠋ loading..." in --text-muted
Done: "✓ loaded" → ✓ in --accent-tertiary, text in --text-secondary
```

## Social Links
```
github:    https://github.com/harshistaken
linkedin:  https://linkedin.com/in/harshistaken
x:         https://x.com/justharshbtw
email:     harshyadav.build@gmail.com
cal:       https://cal.com/harshistaken
```

## Key Constraints
- NEVER hardcode hex in components — use var(--token)
- NEVER use Lucide icons — use HugeIcons
- NEVER use Lora, Geist Mono, or Press Start 2P fonts — removed
- NEVER use CSS spinners/skeletons — use braille spinner
- NEVER use `any` in TypeScript
- ALL components must work in dark + light themes
- ALL animations must respect prefers-reduced-motion
- Nav links /blogs and /about are greyed out (--text-muted) in v1 — not linked
