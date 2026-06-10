# Plan

## Phase 1: Project initialization
**Goal:** Scaffold Next.js 16 project with all dependencies and base configuration
**Approach:**
- `npx create-next-app@latest` with TypeScript, App Router, Tailwind CSS
- Install dependencies: `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `lenis`
- Configure `globals.css` with Tailwind v4 `@import "tailwindcss"` + `@theme inline` variables (dark/gold palette)
- Create `next.config.ts` (minimal, images domain for picsum.photos)
- Set up `app/layout.tsx` with both fonts (Manrope + Outfit via `next/font/google`)
- Create `noise.svg` for grain texture
**Key decisions:** Outfit as Clash Display analog; picsum.photos for placeholder images

## Phase 2: Core infrastructure & global effects
**Goal:** Build shared components used across sections
**Approach:**
- `LenisProvider.tsx` — ReactLenis wrapper with Framer Motion frame integration (autoRaf: false)
- `Scene3D.tsx` + `FloatingShape.tsx` — dynamic import, Canvas with wireframe geometries, gold lighting, scroll-based opacity
- `CustomCursor.tsx` — gold ring + dot follower, scale on hoverable elements
- `ScrollProgressBar.tsx` — fixed top bar driven by scroll progress
- `ParallaxLayer.tsx` — reusable wrapper with useTransform + scrollYProgress
- `Counter.tsx` — count-up with motionValue + useSpring
- `Modal.tsx` — reusable overlay with close-on-escape
**Dependencies:** Phase 1 must be complete

## Phase 3: HeroSection (first screen)
**Goal:** Full-screen hero with 3D background, title, CTA, scroll indicator
**Approach:**
- `'use client'` component
- Dark bg + gold radial gradient overlay
- Import Scene3D dynamically (ssr: false), check mobile via matchMedia to skip
- Animated h1 with gold gradient text (framer-motion fade + slide up)
- Subtitle + two CTA buttons with hover effects
- Animated scroll indicator at bottom
- Mobile: no Canvas, static bg
**Dependencies:** Phase 2 for Scene3D, CustomCursor context

## Phase 4: Content sections (Services, About, Portfolio, Timeline)
**Goal:** Build the core informational sections with scroll-triggered animations
**Approach:**
- `ServicesSection.tsx` — 2x3 grid → 1 col mobile, 6 cards with SVG icons, stagger scroll-reveal
- `AboutSection.tsx` — 2-col layout, 4 animated Counters (spring-based)
- `PortfolioSection.tsx` — filter buttons, card grid with next/image, hover overlay/zoom, click → Modal with gallery; parallax per card
- `TimelineSection.tsx` — vertical center line (animated thickness), 5 stages alternating left/right, scroll-reveal with slide
**Dependencies:** Phase 3 layout style established; Counter, Modal, ParallaxLayer from Phase 2

## Phase 5: Interactive sections (Reviews, Calculator, Map)
**Goal:** Build the interactive/widget sections
**Approach:**
- `ReviewsSection.tsx` — horizontal carousel, autoplay + pause on hover, arrows + dots, 5-star gold ratings
- `CalculatorSection.tsx` — 4-step multi-step form (house type → area slider → material → extras), animated total price counter, "Получить смету" scrolls to contact
- `MapSection.tsx` — simplified SVG map of Russia, clickable city tags below, object count popup
**Dependencies:** Phase 4 complete (styling patterns established)

## Phase 6: ContactSection + Footer + polish
**Goal:** Final sections, integration testing, build verification
**Approach:**
- `ContactSection.tsx` — form with floating labels, gold bottom-border inputs, submit with loading spinner → success; social icons sidebar
- `Footer.tsx` — logo, links, copyright, privacy policy
- `app/page.tsx` — compose all sections in order
- `app/globals.css` — grain/noise pseudo-element, scrollbar styling, selection color
- Run `npm run build`, fix any errors
**Dependencies:** All previous phases

## High-level timeline
- **Estimated total effort:** ~800-1200 lines of code across 20+ files
- **Dependencies:** Strict sequential — each phase builds on the previous; no parallel phases

## Risks and edge cases
1. **Three.js SSR crash** — mitigated by dynamic import with `{ ssr: false }`; build will fail without it
2. **Tailwind v4 API changes** — `@theme inline` and `@import "tailwindcss"` syntax required; must not use `tailwind.config.ts`
3. **Mobile graceful degradation** — 3D disabled < 768px, parallax simplified, Lenis auto-adapts
4. **lenis/react import path** — monitor Lenis v1.x package structure; `lenis/react` may differ between versions
5. **next/image with picsum.photos** — domain must be whitelisted in `next.config.ts`
