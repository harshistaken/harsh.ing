# HARSH × CLAUDE CODE — Portfolio Design System v2.1

> Production-ready design system for haarsh.ing — a Claude Code tribute portfolio.
> Updated: all decisions finalized. Font stack, icon system, section order, content, and architecture locked.

---

## 1. DESIGN PHILOSOPHY

### Concept: "Terminal Soul, Human Warmth"

Three layers fused into one visual language:

- **Layer 1 — Claude Code Terminal**: Dark backgrounds, monospace-first type, Clawd pixel mascot, ASCII art, status bars, creative loading verbs, `/path` navigation, blinking cursors
- **Layer 2 — Anthropic Brand Warmth**: Terracotta orange (#D97757), warm cream (#FAF9F5), pixel art personality
- **Layer 3 — Brutalist Developer Portfolio**: Content-first, monospace everything, numbered project lists, status badges (ONLINE / IN DEV / ARCHIVED), raw text presentation, zero decorative noise

### What Makes This Portfolio Unforgettable

A pixel art version of Harsh's face in Claude Code's Clawd mascot style, sitting inside a terminal-like interface where every section feels like a CLI output — but warm, not cold.

### Design Principles (Ranked)

1. **Monospace is the default** — everything is monospace, no serif anywhere
2. **Warm, not cold** — dark terminal, but orange accents make it feel human
3. **Content earns its space** — no filler sections, no decorative padding
4. **Terminal conventions everywhere** — `/paths`, `$prompts`, `[BADGES]`, `→` arrows, `·` separators
5. **Pixel art is the brand** — avatar, Clawd, game elements all share the same 8-bit visual language

---

## 2. TYPOGRAPHY SYSTEM

### 2.1 Font Stack (4 Fonts)

```
ROLE               FONT                    LOADING                          USAGE
─────────────────────────────────────────────────────────────────────────────────────────
PRIMARY MONO       Fragment Mono           next/font/google                 Body text, nav links, labels,
(Body/Nav/Code)    400 regular + italic    display: swap, subset: latin     metadata, descriptions, code,
var: --font-fragment  HAS SMALL CAPS (SC)  PRELOAD (critical)               terminal prompts

HEADING MONO       JetBrains Mono          next/font/google                 Display text, hero name,
(Display/Titles)   Variable: 100-800       display: swap, subset: latin     page titles, card titles,
var: --font-jetbrains                      PRELOAD (critical)               h1-h4, buttons, badges

PIXEL MICRO        Micro 5                 next/font/google                 Navbar "HARSH" logo text,
(Distinctive)      400 only                display: swap, subset: latin     section heading labels,
var: --font-micro                          PRELOAD (critical)               18-24px distinctive pixel feel

NERD GLYPHS        JetBrains Mono NF       next/font/local                  Tech badge language icons,
(Terminal icons)   Regular (400)           jb-nerd.woff2 (~34KB)            powerline symbols,
var: --font-nf                             display: swap                    terminal decorations only
```

**REMOVED**: Lora, Geist Mono, Press Start 2P.

### 2.2 Nerd Font Subsetting Strategy

The full JetBrains Mono Nerd Font is ~1.5MB. We subset to only the glyphs we use:

```
REQUIRED GLYPHS:
  Full Latin alphanumeric (A-Z, a-z, 0-9, punctuation)
  Powerline symbols: , , , , 
  Devicons: (React), (TypeScript), (JavaScript), (Node.js),
            (Python), (Git), (Docker), (Linux)
  Misc: (folder), (terminal), (code), (gear)

TARGET: ~30-50 extra glyphs beyond Latin → ~20KB .woff2
TOOL: pyftsubset (from fonttools) or glyphhanger
OUTPUT: /src/fonts/jetbrains-mono-nerd.woff2
```

### 2.3 Typography Hierarchy

```
TOKEN            FONT              SIZE    WEIGHT   TRACKING      LINE-H   USAGE
─────────────────────────────────────────────────────────────────────────────────────
--t-display      JetBrains Mono    48px    800      -0.03em       1.0      Hero name "harsh."
--t-h1           JetBrains Mono    36px    700      -0.02em       1.15     Page titles
--t-h2           JetBrains Mono    28px    600      -0.01em       1.2      Section headings
--t-h3           JetBrains Mono    22px    600      0             1.3      Subsection heads
--t-h4           JetBrains Mono    18px    600      0.01em        1.35     Card titles
--t-body         Fragment Mono     15px    400      0.01em        1.65     Body text, descriptions
--t-body-sm      Fragment Mono     13px    400      0.015em       1.55     Secondary text, metadata
--t-caption      Fragment Mono     12px    400      0.02em        1.4      Timestamps, dates
--t-micro        JetBrains Mono    10px    500      0.1em         1.3      UPPERCASE labels, badges
--t-code         Fragment Mono     14px    400      0             1.6      Code blocks, terminal output
--t-quote        Fragment Mono     17px    400      0.01em        1.65     Testimonial quotes
```

### 2.4 Font Usage Rules (STRICT)

```
CONTEXT                                    FONT               CASE
──────────────────────────────────────────────────────────────────────
Navbar logo text                           JetBrains 600       lowercase
Navbar links                               Fragment Mono       lowercase
Section labels                             Fragment Mono SC    SMALL CAPS
Section headings                           JetBrains 600       Title Case
Card titles (company/project)              JetBrains 600       Title Case
Card descriptions                          Fragment Mono       lowercase
Badge text                                 JetBrains 500       UPPERCASE
Button text                                JetBrains 600       lowercase
Terminal prompt text                       Fragment Mono       lowercase
Body paragraphs                            Fragment Mono       Sentence
Testimonial quotes                         Fragment Mono       Sentence
Testimonial opening quotation mark         JetBrains 800       —
Footer branding                            JetBrains 700       lowercase
Copyright text                             Fragment Mono       lowercase
Nerd Font glyphs in tech badges            JetBrains Nerd      —
```

### 2.5 Small Caps Usage (Fragment Mono SC)

```css
.section-label {
  font-family: "Fragment Mono", monospace;
  font-variant: small-caps;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}
```

Applies to: EXPERIENCE, PROJECTS, CONTRIBUTIONS, TESTIMONIALS, SERVICES, CONNECTIONS

---

## 3. COLOR SYSTEM

### 3.1 Dark Theme (Default)

| Token | Hex | Usage |
|---|---|---|
| --bg-primary | #0D0D0C | Page background |
| --bg-secondary | #1A1A18 | Cards, elevated surfaces |
| --bg-tertiary | #252523 | Code blocks, inputs |
| --bg-surface | #2E2E2B | Navbar, footer, status bars |
| --text-primary | #FAF9F5 | Primary text (headings, emphasis) |
| --text-secondary | #B0AEA5 | Body text, descriptions |
| --text-tertiary | #7A7870 | Placeholders, hints |
| --text-muted | #4A4A44 | Line numbers, subtle labels |
| --border-default | #2E2E2B | Card borders |
| --border-subtle | #1F1F1D | Dividers, separators |
| --border-strong | #3D3D38 | Focus rings, hover borders |

### 3.2 Light Theme

| Token | Hex | Usage |
|---|---|---|
| --bg-primary | #FAF9F5 | Page background |
| --bg-secondary | #F0EFE8 | Cards |
| --bg-tertiary | #E8E6DC | Code blocks, inputs |
| --bg-surface | #FFFFFF | Navbar, elevated |
| --text-primary | #141413 | Primary text |
| --text-secondary | #5C5B55 | Body text |
| --text-tertiary | #8A8880 | Placeholder |
| --text-muted | #B0AEA5 | Subtle |
| --border-default | #E8E6DC | Card borders |
| --border-subtle | #F0EFE8 | Dividers |
| --border-strong | #D0CEC5 | Focus rings |

### 3.3 Accents (Theme-Independent)

| Token | Hex | Usage |
|---|---|---|
| --accent-primary | #D97757 | Anthropic Orange — CTAs, links, active |
| --accent-primary-hover | #C4684A | Hover state |
| --accent-primary-muted | #D9775715 | 8% opacity backgrounds |
| --accent-secondary | #6A9BCC | Blue — info, secondary |
| --accent-tertiary | #788C5D | Green — success, online |
| --pixel-orange | #E8715A | Clawd mascot, brighter avatar |
| --status-error | #CC5F5F | Error, closed, abandoned |
| --status-warning | #D4A847 | Warning, in progress |
| --github-green-1 | #1a3a1a | GitHub graph level 1 |
| --github-green-2 | #2d6a2d | GitHub graph level 2 |
| --github-green-3 | #3d9a3d | GitHub graph level 3 |
| --github-green-4 | #4ecc4e | GitHub graph level 4 |

---

## 4. ICON SYSTEM

### 4.1 HugeIcons (UI Icons)

```
PACKAGE: @hugeicons/react + @hugeicons/core-free-icons
STYLE: Stroke Rounded (free, 5,100+ icons)
SIZE: 24px default, 20px small, 16px inline
COLOR: currentColor (inherits from parent)
STROKE-WIDTH: 1.5 (default)

USAGE:
  Navigation arrows, chevrons
  Social platform icons (GitHub, LinkedIn, X, Mail, Calendar)
  External link indicators
  Service card icons
  Close, hamburger, theme toggle
  General UI elements
```

### 4.2 JetBrains Mono Nerd Font (Terminal Glyphs)

```
FONT: JetBrains Mono Nerd Font (subsetted, self-hosted)
CSS CLASS: .font-nerd or the JetBrains font-family
ALWAYS: aria-hidden="true" (decorative only)
ALWAYS: pair with visible text label for accessibility

USAGE:
  Tech badge language icons (, , , )
  Terminal prompt decorations (, , )
  Powerline symbols in status bars
  Code-related decorative elements

NEVER: Use for functional UI (navigation, actions, controls)
```

### 4.3 Boundary Rule

HugeIcons and Nerd Font glyphs do NOT share the same visual context. A social link button uses HugeIcons. A tech stack badge uses Nerd Font. They occupy different semantic spaces.

---

## 5. PIXEL AVATAR SPECIFICATION

### 5.1 Style

Blocky rectangles, not smooth curves. Simple features: 2-pixel dot eyes, basic hair shape, minimal face detail. Limited palette: 4-5 colors max. Grid-based: 16×20 pixels at 8× scale (128×160px).

### 5.2 Specification

```
BASE GRID: 16 wide × 20 tall pixels
RENDER SIZE: 128×160px (8× scale)
IMAGE-RENDERING: pixelated / crisp-edges

COLOR PALETTE:
  Hair:       #1A1A18
  Skin:       #E8B89D
  Skin-shade: #C49A7E
  Eyes:       #0D0D0C
  Outline:    #2E2E2B
  Shirt:      #D97757 (accent-primary)
  Background: transparent

ANIMATION:
  Idle: float (translateY 0 → -6px → 0, 3s ease infinite)
  Hover: eyes blink (2-frame: open → closed → open, 200ms)
```

### 5.3 CSS Implementation

```css
.pixel-avatar {
  width: 128px;
  height: 160px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  border: 2px solid var(--accent-primary);
  border-radius: 4px;
  background: var(--bg-tertiary);
  animation: avatar-float 3s ease-in-out infinite;
}

@keyframes avatar-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

### 5.4 Favicon

Generate from the pixel avatar at 32×32 and 16×16. Use `image-rendering: pixelated` in the source, then export as ICO. Place at `/public/favicon.ico`.

---

## 6. SECTION SPECIFICATIONS

### Landing Page Order
1. Hero
2. Experience
3. Projects
4. GitHub Contribution Graph
5. Testimonials
6. Services
7. Connections
8. Footer

---

### 6.1 NAVBAR

```
┌──────────────────────────────────────────────────────────────────┐
│          HARSH                /WORK  /BLOGS  /ABOUT              │
└──────────────────────────────────────────────────────────────────┘

POSITION: sticky top-0 z-50
CONTAINER: max-w-2xl (672px), centered, px-6, py-3 (12px)
BACKGROUND: transparent (no bg color)
BACKDROP-FILTER: blur-lg saturate(180%)
BORDER: none

LOGO (left):
  Text: "HARSH" — Micro 5, 40px, all caps
  On / route: var(--accent-primary)
  On other routes: var(--text-primary), hover → var(--accent-primary)
  Below 360px: truncates to "H"

NAV LINKS (right):
  Font: JetBrains Mono 500, 14px, UPPERCASE
  Format: leading slash — /WORK /BLOGS /ABOUT
  Gap: 24px
  Active: var(--accent-primary)
  Inactive: var(--text-secondary), hover → var(--text-primary)
  Muted (v1, pages not built): var(--text-muted), cursor-default, no hover
  Transition: colors 200ms

MOBILE:
  No hamburger, no overlay — all fits in one row
  Below 360px: HARSH → H
```

### 6.2 HERO SECTION

```
LAYOUT: Two columns (60/40 split) on desktop, stacked on mobile
PADDING: 120px top, 80px bottom
MAX-WIDTH: 800px

LEFT COLUMN (Text):
  Name: "harsh." (trailing period in --accent-primary)
    Font: JetBrains Mono 800, 48px
    Color: var(--text-primary)
    Letter-spacing: -0.03em

  Title line:
    "full-stack developer · builder · freelancer"
    Font: Fragment Mono 400, 15px
    Color: var(--text-secondary)
    Margin-top: 6px

  Meta row:
    Font: Fragment Mono 400, 12px
    Color: var(--text-tertiary)
    Gap: 20px
    Items:
      "📍 pune, india"
      "● available for freelance" (● 6px, --accent-tertiary, pulse)
      "IST HH:MM" (auto-updating, 60s interval)
    Margin-top: 16px

  Bio: Fragment Mono 400, 15px, var(--text-secondary), max-width 480px
  Terminal prompt: "harsh@haarsh.ing:~$ █" Fragment Mono 400, 13px, var(--text-muted)

RIGHT COLUMN (Avatar):
  Pixel avatar: 128×160px, float animation, 2px border --accent-primary
  Mobile: centered above text, 96×120px
```

### 6.3 EXPERIENCE TIMELINE

```
SECTION LABEL: "experience" in Fragment Mono SC small-caps, 12px, var(--text-muted)

TIMELINE LINE: 2px wide, var(--border-default)
  Current position dot: var(--accent-primary) + pulse
  Past position dots: var(--text-muted)

ENTRIES (chronological, bottom to top):
  1. Upwork Freelance — Jan 2024 – Apr 2024
     Role: Full-Stack Developer & Designer
     [tech badges]

  2. Kleenestar LTD — May 2024 – Jul 2024
     Role: Frontend Engineer
     [tech badges]

  3. Hammurabi AI — Sept 2024 – Present
     Role: Frontend Engineer
     Active dot (green, pulsing)
     Border-left: 3px solid var(--accent-primary)
     [tech badges]

CARD SPEC:
  Background: var(--bg-secondary)
  Border: 1px solid var(--border-default)
  Border-radius: 8px
  Padding: 20px
  Hover: border-color var(--accent-primary), translateY(-1px)
  Company: JetBrains Mono 600, 16px, var(--text-primary)
  Date: Fragment Mono 400, 11px, var(--text-tertiary)
  Role: Fragment Mono 400, 13px, var(--text-secondary)
  Tech badges: row, gap 6px, margin-top 12px
```

### 6.4 PROJECTS (Numbered List)

```
SECTION LABEL: "projects" in Fragment Mono SC small-caps

FORMAT: Numbered list (not cards)

  ┌─────────────────────────────────────────────────────────────────┐
  │ 01 HAMMURABI AI ↗                        NEXT.JS, REACT, AI    │
  │                                                                 │
  │ legal ai platform for turkish lawyers. built the entire         │
  │ frontend — prosemirror editors, real-time systems, udf viewer.  │
  │                                                                 │
  │ [ONLINE]                                                        │
  │ sept 2024 — present                                             │
  ├─────────────────────────────────────────────────────────────────┤
  │ 02 KLEENESTAR ↗                          REACT, TYPESCRIPT      │
  │ ...                                                             │
  ├─────────────────────────────────────────────────────────────────┤
  │ 03 HAARSH.ING                            NEXT.JS, TAILWIND      │
  │                                                                 │
  │ this portfolio. claude code tribute. terminal-brutalist          │
  │ aesthetic with warm anthropic brand language.                    │
  │                                                                 │
  │ [IN DEV]                                                        │
  └─────────────────────────────────────────────────────────────────┘

TYPOGRAPHY:
  Number: JetBrains Mono 400, 14px, var(--text-muted)
  Title: JetBrains Mono 600, 16px, var(--text-primary), UPPERCASE
  "↗": inline, var(--accent-primary)
  Tags: Fragment Mono 400, 11px, var(--text-tertiary), right-aligned, UPPERCASE
  Description: Fragment Mono 400, 14px, var(--text-secondary)
  Status badge: see badge spec
  Date: Fragment Mono 400, 11px, var(--text-tertiary)
  Separator: 1px solid var(--border-subtle)
  Padding: 28px vertical per item

STATUS BADGES:
  [ONLINE]     — bg #788C5D20, text #788C5D, border #788C5D40
  [IN DEV]     — bg #D4A84720, text #D4A847, border #D4A84740
  [ARCHIVED]   — bg #B0AEA520, text #B0AEA5, border #B0AEA540
  [ABANDONED]  — bg #CC5F5F20, text #CC5F5F, border #CC5F5F40
```

### 6.5 GITHUB CONTRIBUTION GRAPH

```
SECTION LABEL: "contributions" in Fragment Mono SC small-caps

IMPLEMENTATION: react-github-calendar
USERNAME: harshistaken

CONTAINER: full-width, var(--bg-secondary), border 1px solid var(--border-default)
  Border-radius: 8px, padding: 24px

GRID:
  Squares: 10×10px, 2px gap, radius 2px
  Columns: 52 weeks + month labels
  Rows: 7 (Sun-Sat), day labels on left

COLOR SCALE (dark):
  Level 0: var(--bg-tertiary) #252523
  Level 1-4: #1a3a1a → #2d6a2d → #3d9a3d → #4ecc4e

COLOR SCALE (light):
  Level 0: var(--bg-tertiary) #E8E6DC
  Level 1-4: #c6e48b → #7bc96f → #449e48 → #196127

BELOW: "X contributions in the last 365 days" Fragment Mono 400, 12px, var(--text-tertiary)
HOVER: tooltip "X contributions on Mon, Jan 1 2026"
```

### 6.6 TESTIMONIALS

```
SECTION LABEL: "testimonials" in Fragment Mono SC small-caps

CONTENT: Mix of text testimonials and embedded video testimonials

TEXT TESTIMONIALS:
  Card background: var(--bg-secondary)
  Border: 1px solid var(--border-default)
  Border-radius: 8px
  Padding: 24px

  Opening quotation mark: """ in JetBrains Mono 800, 28px, var(--accent-primary)
  No closing quotation mark (modern editorial style)
  Quote text: Fragment Mono 400, 17px, var(--text-secondary), line-height 1.65
  Avatar: 40×40px circle, grayscale, border 1px solid var(--border-default)
  Name: JetBrains Mono 600, 14px, var(--text-primary)
  Title: Fragment Mono 400, 12px, var(--text-tertiary)

VIDEO TESTIMONIALS:
  Embed via lite-youtube-embed (lazy loading, ~10KB vs ~500KB raw iframe)
  Video strategy: compress raw files → upload YouTube (unlisted) → embed
  Thumbnail: auto from YouTube, with play button overlay
  Container: same card style as text testimonials
  16:9 aspect ratio for video

LAYOUT: 2 columns desktop (text + video mixed), 1 column mobile
  Gap: 16px
  Stagger entrance: 100ms delay per card
```

### 6.7 SERVICES

```
SECTION LABEL: "services" in Fragment Mono SC small-caps

LAYOUT: 3 columns desktop, stacked mobile
GAP: 20px

EACH CARD:
  Background: var(--bg-secondary)
  Border: 1px solid var(--border-default)
  Border-radius: 8px
  Padding: 32px
  Hover: border-left 3px solid var(--accent-primary), translateX(4px)

  Number: JetBrains Mono 700, 36px, var(--accent-primary)
  Title: JetBrains Mono 600, 15px, UPPERCASE, letter-spacing 0.05em
  Description: Fragment Mono 400, 13px, var(--text-secondary)
  Includes: Fragment Mono 400, 12px, var(--text-tertiary), "· " prefix
  CTA: "get started →" Fragment Mono 400, 13px, var(--accent-primary)

SERVICES:
  01 — CUSTOM DEVELOPMENT
  02 — SEO + WEB PRESENCE
  03 — CONTRACT HIRE

NOTE: "invoiced via Vynx Studio" can appear as a subtle note below the services section.
```

### 6.8 CONNECTIONS

```
SECTION LABEL: "connections" in Fragment Mono SC small-caps

LAYOUT: Two columns, asymmetric (55% left / 45% right)

LEFT — ASCII Fire Art:
  Component: ASCII Studio red fire animation
  Install: npx shadcn@latest add https://asciistudio.space/r/red-fire.json
  Container: 100% width, ~300px height
  Border: 1px solid var(--border-subtle), radius 8px
  Below: tagline in Fragment Mono italic — "always building, always shipping."

RIGHT — Social/Contact Grid:
  5 items: GitHub, LinkedIn, X, Email, Cal.com
  Layout: 3 top + 2 bottom (centered), gap 12px

  Each button:
    Background: var(--bg-secondary)
    Border: 1px solid var(--border-default)
    Border-radius: 8px
    Padding: 20px
    Icon: HugeIcons (24px, var(--text-secondary))
    Label: Fragment Mono 400, 12px, var(--text-tertiary)
    Hover: border-color var(--accent-primary), icon → --accent-primary, translateY(-2px)

  LINKS:
    github    → github.com/harshistaken
    linkedin  → linkedin.com/in/harshistaken
    x         → x.com/justharshbtw
    mail      → mailto:harshyadav.build@gmail.com
    cal       → cal.com/harshistaken (link-out for v1)

BELOW GRID:
  "say hi or book a call on cal.com ↗"
  Fragment Mono 400, 14px, var(--text-secondary)
  "cal.com ↗": var(--accent-primary), underline on hover
```

### 6.9 FOOTER

```
LAYOUT: Three sections — left, center, right
BACKGROUND: var(--bg-surface)
BORDER-TOP: 1px solid var(--border-subtle)
PADDING: 48px

LEFT:
  ASCII pixel art of avatar (monospace characters)
  Fragment Mono 400, 10px, var(--accent-primary)

CENTER:
  "harsh." — JetBrains Mono 600, 14px (period in --accent-primary)
  "© 2026. built with claude code." — Fragment Mono 400, 11px, var(--text-muted)

RIGHT:
  Social icons: github, linkedin, x — HugeIcons 20px, var(--text-tertiary), hover var(--text-primary)
  Theme toggle: same as navbar
  Gap: 16px
```

---

## 7. COMPONENT SPECIFICATIONS

### 7.1 Badge

```
HEIGHT: 22px
PADDING: 0 8px
BORDER-RADIUS: 4px
FONT: JetBrains Mono 500, 10px, UPPERCASE, letter-spacing 0.05em
DISPLAY: inline-flex, align-items center

VARIANTS:
  success:  bg var(--accent-tertiary) 12%, text var(--accent-tertiary), border 1px at 25%
  error:    bg var(--status-error) 12%, text var(--status-error), border 1px at 25%
  warning:  bg var(--status-warning) 12%, text var(--status-warning), border 1px at 25%
  info:     bg var(--accent-secondary) 12%, text var(--accent-secondary), border 1px at 25%
  tech:     bg var(--bg-tertiary), text var(--text-secondary), border 1px var(--border-default)
  verified: bg var(--accent-primary) 12%, text var(--accent-primary), border 1px at 25%
```

### 7.2 Buttons

```
PRIMARY:    bg var(--accent-primary), text var(--bg-primary), JetBrains 600 13px
SECONDARY:  bg transparent, text var(--accent-primary), border 1px --accent-primary
GHOST:      bg transparent, text var(--text-secondary), border 1px --border-default
TERMINAL:   bg var(--bg-tertiary), text var(--accent-primary), Fragment Mono 400 13px
            Format: "$ hire-harsh --now █" (blinking cursor)
PILL:       bg var(--bg-secondary), border-radius 9999px, text var(--text-secondary)

ALL: border-radius 6px (except pill), hover translateY(-1px), transition 200ms
```

---

## 8. MOTION & ANIMATION

### 8.1 Page Load Sequence

```
STEP 1 (0ms):    Navbar slides down (translateY -56px → 0, 400ms, ease-out)
STEP 2 (200ms):  Avatar fades in + scales (opacity 0→1, scale 0.9→1, 500ms, spring)
STEP 3 (400ms):  Name typewriter effect (letter by letter, 80ms per char)
STEP 4 (600ms):  Title + meta fade in (opacity 0→1, translateY 10px→0, 400ms)
STEP 5 (800ms):  Terminal prompt appears with cursor blink starting
STEP 6 (scroll): Each section fades in via IntersectionObserver
```

### 8.2 Scroll Animations

```
Section labels: fade + translateY(16px → 0), 300ms, threshold 0.1
Cards: stagger 80ms, fade + translateY(20px → 0), 400ms
Timeline nodes: scale(0 → 1), 300ms, threshold 0.3
GitHub graph: columns reveal left-to-right, 20ms stagger
Testimonials: fade + translateX(20px → 0), 300ms stagger

EASING: cubic-bezier(0.16, 1, 0.3, 1)
REDUCED MOTION: disable all, instant display
```

### 8.3 First-Visit Boot Sequence

```
TRIGGER: First visit only (tracked via sessionStorage)
DURATION: 2-3 seconds total, then fade to portfolio
SKIP: Return visitors go straight to page with staggered section reveals
REDUCED MOTION: Skip entirely, show page immediately

BACKGROUND: var(--bg-primary), full viewport
FONT: Fragment Mono 400, 13px
PROMPT COLOR: var(--accent-primary)
OUTPUT COLOR: var(--text-secondary)
CHECKMARK COLOR: var(--accent-tertiary) #788C5D
SPINNER COLOR: var(--text-muted)

SEQUENCE (typewriter, each line appears after previous completes):

  harsh@haarsh.ing:~$ init portfolio       ← types out, 60ms/char
                                            ← 200ms pause
  ⠋ loading tokens...                      ← braille spinner cycles
  ✓ loaded 847 design tokens               ← spinner → green checkmark
                                            ← 100ms pause
  ⠋ resolving fonts...                     ← braille spinner
  ✓ fragment mono (400, italic)            ← checkmark
  ✓ jetbrains mono nerd (43 glyphs)        ← checkmark, stacked fast
                                            ← 100ms pause
  ⠋ rendering sections...                  ← braille spinner
  ✓ hero                                   ← rapid-fire checkmarks
  ✓ experience                             ← 50ms between each
  ✓ projects
  ✓ contributions
  ✓ testimonials
  ✓ services
  ✓ connections
                                            ← 200ms pause
  ✓ portfolio ready.                       ← final line, accent-primary color
                                            ← 300ms hold
  [fade out terminal → fade in portfolio]  ← crossfade, 400ms

BRAILLE SPINNER FRAMES (cycle at 80ms per frame):
  ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏

IMPLEMENTATION:
  - Full-screen overlay component, z-50
  - sessionStorage key: "haarsh-boot-seen"
  - If key exists: skip, render page immediately
  - If key missing: play sequence, set key on complete
  - Escape key or click: skip to end immediately
  - All text pre-rendered, revealed via JS timing (not actual loading)
```

### 8.4 In-Page Loading States

```
For any async content (GitHub graph, testimonial videos, etc.):

SPINNER: Braille dots cycling — ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏
  Font: Fragment Mono 400, 13px, var(--text-muted)
  Speed: 80ms per frame
  Format: "⠋ loading contributions..." (text after spinner)
  Completion: spinner → "✓" in var(--accent-tertiary), text stays

NEVER use:
  - CSS spinners or rotating circles
  - Skeleton/shimmer loaders
  - Progress bars
  - Bouncing dots
```

### 8.5 404 Page

```
LAYOUT: Centered, max-width 600px, var(--bg-primary) full viewport
NOT INTERACTIVE (visual only, no real input)

DISPLAY:
  harsh@haarsh.ing:~$ cd /[attempted-path]
  bash: cd: /[attempted-path]: No such file or directory

  harsh@haarsh.ing:~$ ls ~/
    home/   (← linked, var(--accent-primary))

  harsh@haarsh.ing:~$ █                    ← blinking cursor

FONT: Fragment Mono 400, 14px
PROMPT: var(--accent-primary) for "harsh@haarsh.ing:~$"
OUTPUT: var(--text-secondary)
ERROR: var(--status-error) for "No such file or directory"
LINK: "home/" clickable, var(--accent-primary), navigates to /

BELOW TERMINAL:
  "lost? go home →" Fragment Mono 400, 13px, var(--text-muted)
  "go home →" is a link in var(--accent-primary)
```

---

## 9. RESPONSIVE BREAKPOINTS

```
BREAKPOINT        WIDTH           CONTAINER-PAD    KEY CHANGES
──────────────────────────────────────────────────────────────────
mobile            320-480px       20px             Stack everything, hamburger nav
mobile-lg         481-640px       24px             Slightly wider cards
tablet            641-768px       32px             2-col projects
tablet-lg         769-1024px      32px             Full nav, 2-col services
desktop           1025-1200px     48px             Full layout, 3-col services
desktop-lg        1201-1400px     48px             Max container

CONTAINER MAX: 1200px
APPROACH: Mobile-first (min-width queries)

FONT SCALING:
  --t-display: 48px → 36px (tablet) → 28px (mobile)
  --t-h1: 36px → 28px → 24px
  --t-h2: 28px → 22px → 20px
  --t-body: 15px (no change)
```

---

## 10. TECH STACK

```
FRAMEWORK:        Next.js 15+ (App Router, RSC, Turbopack)
LANGUAGE:         TypeScript (strict mode)
STYLING:          Tailwind CSS v4 + CSS custom properties
FONTS:            next/font/google (Fragment Mono) + next/font/local (JetBrains Mono Nerd)
ICONS:            @hugeicons/react + @hugeicons/core-free-icons (UI)
                  JetBrains Mono Nerd Font (terminal glyphs, subsetted)
ANIMATION:        Framer Motion (scroll, page transitions)
                  CSS animations (blink, float, pulse)
THEME:            next-themes (dark default)
BLOG:             next-mdx-remote (MDX files in /src/content/blogs/)
UI BASE:          shadcn/ui
ASCII FIRE:       npx shadcn@latest add https://asciistudio.space/r/red-fire.json
GITHUB GRAPH:     react-github-calendar
DEPLOYMENT:       Vercel
ANALYTICS:        Vercel Analytics
CONTENT:          MDX for blogs, static TS files for data

PACKAGES (v1):
  next next-themes
  framer-motion
  @hugeicons/react @hugeicons/core-free-icons
  react-github-calendar
  @vercel/analytics
  tailwindcss (v4)

PACKAGES (v1.1 — when blogs ship):
  next-mdx-remote
```

---

## 11. FILE STRUCTURE (v1 — Landing Page Only)

```
src/
├── app/
│   ├── layout.tsx              # fonts, theme, navbar, footer, analytics
│   ├── page.tsx                # landing (all 8 sections)
│   └── not-found.tsx           # terminal-themed 404
├── components/
│   ├── ui/                     # badge, button, card, section-label, nerd-icon
│   ├── layout/                 # navbar, footer, container, section
│   └── sections/               # hero, experience, projects, github-graph,
│                               # testimonials, services, connections
├── lib/
│   ├── theme.ts                # theme context
│   ├── fonts.ts                # font loading config
│   └── animations.ts           # framer motion variants
├── content/
│   ├── projects.ts
│   ├── experience.ts
│   ├── services.ts
│   └── testimonials.ts
├── fonts/
│   └── jetbrains-mono-nerd.woff2  # subsetted nerd font
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── og-image.png
└── app/
    └── globals.css            # CSS custom properties, resets
```

---

## 12. CSS CUSTOM PROPERTIES (COPY-PASTE READY)

```css
:root {
  /* FONTS */
  --font-fragment: "Fragment Mono", monospace;
  --font-jetbrains: "JetBrains Mono", monospace;
  --font-nerd: "JetBrains Mono NF", "JetBrains Mono", monospace;
  --font-pixel: "Press Start 2P", cursive;

  /* SPACING (4px grid) */
  --spacing-1: 4px; --spacing-2: 8px; --spacing-3: 12px; --spacing-4: 16px;
  --spacing-5: 20px; --spacing-6: 24px; --spacing-8: 32px; --spacing-10: 40px;
  --spacing-12: 48px; --spacing-16: 64px; --spacing-20: 80px; --spacing-24: 96px; --spacing-32: 128px;

  /* RADIUS */
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px; --radius-xl: 12px; --radius-full: 9999px;

  /* TIMING */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --dur-fast: 100ms; --dur-normal: 200ms; --dur-slow: 500ms;

  /* ACCENTS (theme-independent) */
  --accent-primary: #D97757;
  --accent-primary-hover: #C4684A;
  --accent-primary-muted: rgba(217, 119, 87, 0.08);
  --accent-secondary: #6A9BCC;
  --accent-tertiary: #788C5D;
  --pixel-orange: #E8715A;
  --status-error: #CC5F5F;
  --status-warning: #D4A847;
}

[data-theme="dark"] {
  --bg-primary: #0D0D0C;
  --bg-secondary: #1A1A18;
  --bg-tertiary: #252523;
  --bg-surface: #2E2E2B;
  --text-primary: #FAF9F5;
  --text-secondary: #B0AEA5;
  --text-tertiary: #7A7870;
  --text-muted: #4A4A44;
  --border-default: #2E2E2B;
  --border-subtle: #1F1F1D;
  --border-strong: #3D3D38;
}

[data-theme="light"] {
  --bg-primary: #FAF9F5;
  --bg-secondary: #F0EFE8;
  --bg-tertiary: #E8E6DC;
  --bg-surface: #FFFFFF;
  --text-primary: #141413;
  --text-secondary: #5C5B55;
  --text-tertiary: #8A8880;
  --text-muted: #B0AEA5;
  --border-default: #E8E6DC;
  --border-subtle: #F0EFE8;
  --border-strong: #D0CEC5;
}
```

---

## 13. SEO & META

```
Title: "harsh. — full-stack developer, builder, freelancer"
Description: "portfolio of harsh — full-stack developer building web apps,
             real-time systems, and AI-powered SaaS. a tribute to claude code."
OG Image: 1200×630px — dark bg, pixel avatar left, name + title right, orange accent
Favicon: pixel avatar scaled to 32×32 and 16×16
Theme-color meta: #0D0D0C (dark) / #FAF9F5 (light)
Robots: index, follow
Canonical: https://haarsh.ing
JSON-LD: Person schema with sameAs for social links
Language: en
```

---

## 14. PERFORMANCE BUDGET

```
FONT LOADING:
  Fragment Mono: preload (critical)
  JetBrains Mono Nerd: preload (critical, subsetted ~20KB)
  Press Start 2P: DO NOT LOAD in v1
  All: font-display: swap, subset: latin

PAGE WEIGHT:
  HTML/CSS/JS: < 200KB gzipped
  Fonts: < 100KB (2 fonts, Fragment ~60KB + JetBrains subset ~20KB)
  Icons: < 20KB (tree-shaken HugeIcons, ~1.5KB per icon)
  Images: < 100KB (pixel art, project screenshots lazy-loaded)
  ASCII fire: < 30KB (lazy loaded)
  Video embeds: lazy loaded via lite-youtube-embed (~10KB)
  Total first load: < 350KB

TARGET METRICS:
  FCP: < 1.0s  |  LCP: < 2.0s  |  TTI: < 3.0s  |  CLS: < 0.05  |  TBT: < 200ms
```

---

*Design System v2.1 — March 2026*
*Built for haarsh.ing · A tribute to Claude Code · Powered by Anthropic*
*Fonts: Fragment Mono SC + JetBrains Mono Nerd Font*
*Icons: HugeIcons (stroke) + Nerd Font (terminal glyphs)*
