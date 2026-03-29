# Frontend Design Rules — haarsh.ing

## Aesthetic Direction
Terminal-brutalist with warm human accents. NOT cold tech-bro minimal. NOT generic SaaS landing page.

## What This Portfolio MUST Feel Like
- Like reading a well-configured terminal — monospace, dark, information-dense
- But warm — terracotta orange accents, pixel art personality
- Every section should feel like it could be a CLI output
- Zero decorative noise. Every element earns its space.

## Typography Execution

### Two-Mono System
- **Fragment Mono** is the reading font. Body text, nav, descriptions, metadata, code, timestamps.
- **JetBrains Mono** is the display font. Headings, hero name, badges, buttons, card titles, accent text.
- These two fonts share the page. Fragment for content, JetBrains for hierarchy and punch.
- **Press Start 2P** exists only for the game section (deferred to v1.1). Do not load it in v1.

### Typography Rules
- Monospace is the default for EVERYTHING. No serif anywhere.
- Section labels in small-caps (Fragment Mono `font-variant: small-caps`).
- Nav items with leading slash: `/home` active, `/blogs /about` greyed out (v1)
- Hero name ends with colored period: `harsh.` (period in --accent-primary)
- Terminal prompt with blinking cursor as a design element, not decoration.
- Lowercase is default. Uppercase ONLY for badges and micro labels.
- Testimonial quotes: same Fragment Mono body font — differentiated by larger size (17px) and oversized accent-colored opening quotation mark (`"` in --accent-primary, JetBrains Mono, 28px). No closing quote (modern editorial style).

### Font Assignment Table
```
CONTEXT                               FONT               CASE         
─────────────────────────────────────────────────────────────────────
Navbar logo text                      JetBrains 600       lowercase    
Navbar links                          Fragment Mono       lowercase    
Section labels                        Fragment Mono SC    SMALL CAPS   
Section headings                      JetBrains 600       Title Case   
Card titles (company/project)         JetBrains 600       Title Case   
Card descriptions                     Fragment Mono       lowercase    
Badge text                            JetBrains 500       UPPERCASE    
Button text                           JetBrains 600       lowercase    
Terminal prompt text                  Fragment Mono       lowercase    
Body paragraphs                       Fragment Mono       Sentence     
Testimonial quotes                    Fragment Mono       Sentence     
Testimonial quotation mark            JetBrains 800       —            
Footer branding                       JetBrains 700       lowercase    
Copyright text                        Fragment Mono       lowercase    
```

## Icon Execution

### Two-Icon System
- **HugeIcons** (stroke rounded, free) — all functional UI icons: navigation arrows, social platform icons, external link indicators, service card icons, mail, close, hamburger, theme toggle.
- **JetBrains Mono Nerd Font glyphs** — terminal-themed decorative elements: tech language icons in badges (e.g.,  for React,  for TypeScript), powerline symbols, terminal prompt decorations, code-related glyphs.
- **Never mix the two in the same visual context.** A social button uses HugeIcons. A tech badge uses Nerd Font. They don't share space.
- **Lucide React is removed.** Do not install or reference.

## Color Application
- Dark theme is the star. Light theme must work but dark is primary.
- Orange (#D97757) is used sparingly — CTAs, active states, the avatar border, badge accents. NOT splashed everywhere.
- Green (#788C5D) only for: "available" status, "open source" badge, "online" status.
- Most text is --text-secondary, not --text-primary. Primary is for headings and emphasis only.
- Borders are barely visible (--border-default, --border-subtle). They structure, they don't decorate.

## Layout Rules
- Max content width: 800px for text-heavy sections (hero, about).
- Max container: 1200px for grid sections (projects, services).
- Generous vertical spacing between sections: 80-96px.
- No hero images or large background graphics. The pixel avatar IS the visual.
- Cards have minimal styling: --bg-secondary, thin border, radius-lg. Hover adds the accent border.

## Motion Philosophy
- Page load: staggered fade-in sequence (navbar → avatar → name → text → prompt).
- Scroll: IntersectionObserver reveals, fade + translateY, 300-400ms.
- Hover: border-color + translateY(-2px), 150-200ms. Subtle.
- NO parallax. NO horizontal scroll. NO scroll hijacking.
- Terminal cursor blink is the signature animation — it should feel ever-present.
- Avatar float (3s ease infinite) is the only continuous animation.
- Loading states: Claude Code braille dot spinner (⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏ at 80ms/frame) + text → green ✓ on complete. NEVER CSS spinners, skeletons, or progress bars.
- First visit: 2-3s terminal boot sequence ("init portfolio" → loading tokens → resolving fonts → rendering sections → ready). Stored in sessionStorage, skippable.

## Connections Section
- ASCII fire component on the left (keep — it's unique and terminal-authentic)
- Social grid on the right with 5 items: GitHub, LinkedIn, X, Email, Cal.com
- 5 items breaks 2×2 — use 3-top + 2-bottom layout or asymmetric grid

## What to NEVER Do
- Purple gradients on white backgrounds
- Generic card grids with stock photography
- Rounded profile photo in a circle
- "Let's connect!" or "Get in touch!" generic CTAs
- Hamburger menus with slide-in panels (use full-screen overlay)
- Loading spinners (use Claude Code braille dot spinner ⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏)
- Toast notifications (use terminal-style inline status messages)
- Smooth scroll to anchor with bouncy easing
- Drop shadows on cards (use border only)
- Gradient text effects
- Background patterns or mesh gradients
- Serif fonts anywhere (Lora is removed)
- Lucide icons (removed — use HugeIcons)

## What TO Do
- Terminal prompt (`harsh@haarsh.ing:~$ █`) as a recurring motif
- Status badges borrowed from CLI tools: [ONLINE] [IN DEV] [ARCHIVED]
- Numbered lists (01, 02, 03) for projects and services
- Arrow prefix for links: `→ github.com/harshistaken` or `↗ live`
- Monospace separators: ` · ` between metadata items
- ASCII art in the footer
- Green dot (●) for "available for freelance" with pulse animation
- Pixel art as the ONLY illustration style
- Nerd Font glyphs in tech badges for authentic terminal feel
- HugeIcons stroke icons for clean, consistent UI elements
