# Code Quality Rules — haarsh.ing

## TypeScript
- Strict mode always. `"strict": true` in tsconfig.
- No `any` — use `unknown` if type is truly unknown, then narrow.
- Prefer `interface` over `type` for object shapes.
- Export types from the same file as the component that uses them.
- Use `satisfies` operator for type-checked object literals.
- Enum alternative: use `as const` objects with inferred types.

## React / Next.js
- Default to React Server Components. Add `"use client"` only when needed (state, effects, event handlers, browser APIs).
- Never use `useEffect` for data fetching — use RSC or SWR/React Query.
- Props interfaces named `{ComponentName}Props`.
- Destructure props in function signature.
- Use `cn()` utility (from shadcn) for conditional classNames.
- No prop drilling beyond 2 levels — use composition or context.
- Avoid `forwardRef` unless building a primitive UI component.

## Component Pattern
```tsx
interface BadgeProps {
  variant: "success" | "error" | "warning" | "info" | "tech" | "verified";
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center h-[22px] px-2 rounded-sm", variantStyles[variant])}>
      {children}
    </span>
  );
}
```

## Icons

### HugeIcons (all UI icons)
```tsx
// CORRECT
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, Mail01Icon } from "@hugeicons/core-free-icons";

<HugeiconsIcon icon={Github01Icon} size={24} color="currentColor" strokeWidth={1.5} />

// NEVER — Lucide is removed from this project
import { Github } from "lucide-react"; // DO NOT USE
```

### Nerd Font Glyphs (terminal-themed elements only)
```tsx
// Use the nerd font CSS class for terminal glyphs
<span className="font-nerd" aria-hidden="true"></span> // React icon
<span className="font-nerd" aria-hidden="true"></span> // TypeScript icon

// ALWAYS: aria-hidden="true" (decorative only)
// ALWAYS: pair with a visible text label for accessibility
// NEVER: use for functional UI (navigation, actions, controls)
```

## Tailwind CSS v4
- Use `@theme` directive in globals.css for custom design tokens.
- Never use arbitrary values `[]` for design token colors — extend the theme.
- Use `@apply` sparingly — prefer utility classes directly.
- Group utilities logically: layout → spacing → typography → colors → effects.
- Responsive: mobile-first with `md:` and `lg:` breakpoints.

## CSS Custom Properties
- All theme colors MUST use CSS variables with semantic names.
- Define under `[data-theme="dark"]` and `[data-theme="light"]` in globals.css.
- Map to Tailwind via `@theme` directive using `var(--token-name)`.
- NEVER hardcode hex values in component files.
- Naming: `--bg-primary`, `--text-secondary`, `--border-default` (NOT `--bg-0`, `--fg-1`).

## Animations
- Simple (hover, focus, color): CSS transitions only.
- Scroll reveals: Framer Motion `motion.div` with `whileInView`.
- Complex sequences: Framer Motion variants.
- Always respect `prefers-reduced-motion` — disable animations when set.
- Cursor blink, avatar float, status pulse: pure CSS `@keyframes`.
- Braille spinner (⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏): JS interval at 80ms/frame, pure CSS fallback.
- No animation libraries beyond Framer Motion.
- NEVER use CSS spinners, skeleton loaders, or progress bars.

## Font Loading
- Fragment Mono: `next/font/google`, preload, `display: "swap"`, `subsets: ["latin"]`
- JetBrains Mono Nerd Font: `next/font/local` from `src/fonts/jetbrains-mono-nerd.woff2`, preload, `display: "swap"`
- Press Start 2P: DO NOT LOAD in v1. Deferred to v1.1 (game section).
- All fonts assigned to CSS variables in layout.tsx via className or style.

## File Naming
- Components: PascalCase (`Badge.tsx`, `Navbar.tsx`)
- Utilities/hooks: camelCase (`useTheme.ts`, `cn.ts`)
- Content/data: camelCase (`projects.ts`, `experience.ts`)
- Styles: kebab-case (`globals.css`)
- Font files: kebab-case (`jetbrains-mono-nerd.woff2`)

## Imports
- Absolute imports via `@/*` alias (configured in tsconfig).
- Group order: React → Next.js → external libs → internal components → types → styles.
- No barrel exports (`index.ts`) — import directly from component file.

## Performance
- Lazy load below-fold sections with Intersection Observer.
- Fonts: preload Fragment Mono + JetBrains Mono Nerd (both critical).
- Images: always `next/image` with proper `width`, `height`, `alt`.
- No `loading="eager"` on below-fold images.
- Nerd Font: subsetted to ~30-50 used glyphs via pyftsubset. Target: <20KB .woff2.
- HugeIcons: tree-shaken by bundler, ~1.5KB per icon imported.
- ASCII fire component: dynamic import when connections section enters viewport.
- Total first load target: < 350KB gzipped.
- Target metrics: FCP < 1.0s, LCP < 2.0s, TTI < 3.0s, CLS < 0.05

## Accessibility
- Every interactive element: keyboard accessible (focusable, Enter/Space activates).
- All images: descriptive `alt` text.
- Nerd Font glyphs: always `aria-hidden="true"` + adjacent text label.
- Color contrast: WCAG AA minimum (4.5:1 normal text, 3:1 large text).
- `prefers-reduced-motion`: disable ALL animations, show content immediately.
- Focus rings: visible, uses `--border-strong` color.
- Skip link: hidden, appears on Tab, jumps to main content.

## Git
- Conventional commits: `feat:`, `fix:`, `style:`, `refactor:`, `chore:`
- One component per commit when building sections.
- Never commit `.env` files or unsubsetted Nerd Font files (~1.5MB).
