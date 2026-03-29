# haarsh.ing — Portfolio

## What This Is
Personal portfolio for Harsh at **haarsh.ing**. Terminal-brutalist aesthetic — a tribute to Claude Code, fused with Anthropic's warm brand language. Dark-first, monospace-first, pixel art elements.

**Positioning**: Full-stack web developer, available for freelance/contract work. Invoiced via Vynx Studio (registered sole proprietorship).

## Read Before Building
Before building ANY component, read these files in order:
1. `.claude/design-system.md` — Complete design system (colors, typography, spacing, every section spec)
2. `.claude/design-rules.md` — Aesthetic constraints, what to do / never do
3. `.claude/code-rules.md` — TypeScript, React, Tailwind, animation, performance rules
4. `.claude/figma-rules.md` — Figma ↔ code workflow
5. `.claude/quick-ref.md` — Compact token/color/typography lookup card for mid-build reference

## v1 Scope — Landing Page Only
Ship the landing page first. Nothing else until it's live on Vercel.

### What Ships
- Single route: `/` with 8 sections + navbar + footer
- Terminal-themed `not-found.tsx` (404)
- First-visit boot sequence (2-3s terminal animation, sessionStorage)
- Dark + light theme support
- Responsive (mobile-first)

### What Does NOT Ship (Deferred v1.1+)
- /blogs (MDX setup, next-mdx-remote)
- /about (Cal.com embed)
- /labs
- Game section (maze with Clawd, Press Start 2P font)

### Landing Page Section Order
1. **Navbar** — sticky, blur backdrop, logo + nav + theme toggle
2. **Hero** — "harsh." display name, title, status, bio, terminal prompt, pixel avatar
3. **Experience** — timeline, 3 entries (Upwork → Kleenestar → Hammurabi)
4. **Projects** — numbered list, 3 entries
5. **GitHub Graph** — contribution heatmap via react-github-calendar
6. **Testimonials** — text cards + embedded video (lite-youtube-embed)
7. **Services** — 3 cards (custom dev, SEO, contract hire)
8. **Connections** — ASCII fire + 5-item social grid
9. **Footer** — ASCII avatar, branding, social icons

## Stack
- Next.js 15+ (App Router, RSC, Turbopack)
- TypeScript (strict, no `any`)
- Tailwind CSS v4 (`@theme` directive for tokens)
- shadcn/ui (`npx shadcn@latest add <component>`)
- Framer Motion (scroll/page animations) + CSS (hover/blink/float)
- next-themes (dark default)
- @hugeicons/react + @hugeicons/core-free-icons (UI icons)
- JetBrains Mono Nerd Font (self-hosted, subsetted .woff2)
- react-github-calendar
- @vercel/analytics
- Deployment: Vercel

## Fonts (3 total, only 2 load in v1)

| Font | Loading | Role |
|------|---------|------|
| Fragment Mono | next/font/google, preload | Body, nav, descriptions, code, section labels (small-caps) |
| JetBrains Mono Nerd Font | next/font/local, preload, subsetted ~20KB | Headings, display, badges, buttons, accent text, terminal glyphs |
| Press Start 2P | DO NOT LOAD in v1 | Game only (v1.1) |

**REMOVED — do not install**: Lora, Geist Mono, Lucide React

## Icons — Two Systems

| System | Package | Use For |
|--------|---------|---------|
| HugeIcons (stroke rounded) | `@hugeicons/react` + `@hugeicons/core-free-icons` | All UI: nav, social, arrows, service cards, hamburger, theme toggle |
| Nerd Font glyphs | JetBrains Mono Nerd Font (self-hosted) | Terminal-themed: tech badge language icons, prompt decorations, powerline symbols |

They never share the same visual context. A social button = HugeIcons. A tech badge = Nerd Font.

## CSS Variable Naming
Semantic names everywhere. `--bg-primary`, `--text-secondary`, `--border-default`.
**NEVER** use short names (`--bg-0`, `--fg-1`) or hardcode hex in components.

## Real Content

### Links
- GitHub: github.com/harshistaken
- LinkedIn: linkedin.com/in/harshistaken
- X: x.com/justharshbtw
- Email: harshyadav.build@gmail.com
- Cal.com: cal.com/harshistaken

### Experience (chronological)
1. **Upwork Freelance** — Jan–Apr 2024 — Full-Stack Developer & Designer
2. **Kleenestar LTD** — May–Jul 2024 — Frontend Engineer
3. **Hammurabi AI** — Sept 2024–Present — Frontend Engineer (active)

### Projects
- 01 HAMMURABI AI — Legal AI platform. Landing page + limited screenshots (NDA). [ONLINE]
- 02 KLEENESTAR — Design files + screenshots. [status TBD]
- 03 HAARSH.ING — This portfolio. Claude Code tribute. [IN DEV]

## File Structure (v1)
```
src/
├── app/
│   ├── layout.tsx          # fonts, theme, navbar, footer, analytics
│   ├── page.tsx            # landing (all 8 sections)
│   └── not-found.tsx       # terminal-themed 404
├── components/
│   ├── ui/                 # badge, button, card, section-label
│   ├── layout/             # navbar, footer, container
│   └── sections/           # hero, experience, projects, github-graph,
│                           # testimonials, services, connections
├── lib/                    # theme, fonts, animations
├── content/                # projects.ts, experience.ts, services.ts, testimonials.ts
├── fonts/                  # jetbrains-mono-nerd.woff2 (subsetted)
├── public/                 # images, favicon.ico, og-image.png
└── app/
    └── globals.css         # CSS custom properties, resets
```

## Build Approach
Do NOT one-shot components. Build each one with precision:
1. Spec every detail (typography, spacing, states, interactions, edge cases)
2. Code it with production architecture
3. Test dark/light, mobile/desktop, reduced motion, keyboard nav
4. One component at a time. Get it right before moving on.
