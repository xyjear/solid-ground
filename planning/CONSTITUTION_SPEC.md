# Constitution

## Tech stack

- **Framework:** Next.js 16 (App Router), latest stable
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (new syntax: `@import "tailwindcss"`, `@theme inline`)
- **UI Animations:** Framer Motion (scroll-triggered, stagger, spring, count-up)
- **3D Graphics:** Three.js + @react-three/fiber + @react-three/drei
- **Smooth Scroll:** Lenis (`lenis/react` via `ReactLenis`)
- **Fonts:** Outfit (Google Fonts, via `next/font/google`, variable `--font-heading`) for headings; Manrope (Google Fonts, variable `--font-sans`) for body text
- **Package Manager:** npm

## Code conventions

- **Structure:** All sections as separate components in `/components/`, imported in `app/page.tsx`
- **Client components:** Marked with `'use client'` where needed (animations, 3D, interactivity)
- **Dynamic imports:** `Scene3D` loaded via `dynamic(() => import(...), { ssr: false })`
- **No comments:** Code is self-documenting, no explanatory comments
- **File naming:** PascalCase for components
- **Imports:** Absolute imports with `@/` alias (`@/components/HeroSection`, `@/app/globals.css`)
- **CSS:** Tailwind utility classes primarily; `@theme inline` for custom variables; `globals.css` for base styles and grain texture
- **Error handling:** Graceful degradation on mobile (no 3D, simplified parallax)

## Quality standards

- **Mobile-first responsive:** All sections adapt from mobile to desktop
- **Animations work on desktop; mobile gets graceful degradation:** 3D Canvas hidden < 768px, parallax simplified, smooth scroll disabled on touch devices
- **Performance:** Dynamic imports for heavy 3D; `next/image` for all images; Lenis `autoRaf: false` with Framer Motion frame integration
- **Build:** Must pass `npm run build` without errors (no `window is not defined` — 3D dynamically imported)
- **Typography:** No FOUT/FOIT — `next/font` loads optimally
- **Accessibility:** Semantic HTML, interactive elements focusable

## Delivery format

- Complete Next.js project with all files listed in specification
- Ready for `git push` → Vercel auto-deploy
- No `.vercelignore` needed

---

# Specification

## Project summary

Landing page for **SolidGround** — a construction company. One-page, dark-themed (background `#0a0a0a`), gold-accented (`#D4A843`), with 3D background, smooth scrolling, scroll-triggered animations, and 10 distinct content sections. All content in Russian.

## Scope

Working Next.js 16 project with the following file structure:

```
app/
  layout.tsx          — root layout (fonts, metadata, LenisProvider)
  page.tsx            — composition of all sections
  globals.css         — Tailwind v4 + @theme + custom styles + grain texture
components/
  LenisProvider.tsx   — Lenis smooth scroll integration
  Scene3D.tsx         — React Three Fiber 3D scene (hero background)
  FloatingShape.tsx   — individual geometric shape
  HeroSection.tsx     — first screen with 3D, title, CTA
  ServicesSection.tsx — 6 service cards
  AboutSection.tsx    — company info + animated counters
  PortfolioSection.tsx — project gallery with filters + modal
  TimelineSection.tsx — construction process timeline
  ReviewsSection.tsx  — horizontal client reviews carousel
  CalculatorSection.tsx — multi-step cost calculator
  MapSection.tsx      — SVG map of regions with clickable cities
  ContactSection.tsx  — contact form + company details
  Footer.tsx          — logo, links, copyright
  CustomCursor.tsx    — gold ring cursor follower
  ScrollProgressBar.tsx — gold scroll progress indicator
  ParallaxLayer.tsx   — reusable parallax wrapper
  Counter.tsx         — animated count-up component
  Modal.tsx           — reusable modal for portfolio gallery
public/
  noise.svg           — SVG noise filter for grain texture
```

## Sections — detailed requirements

### 1. HeroSection
- `'use client'`
- Fullscreen (`h-dvh`), dark bg with gold radial glow
- 3D scene via Canvas (fixed, `z-index: -1`): floating wireframe geometries (Icosahedron, Torus, Octahedron, Box) with slow rotation + Y-axis floating (`Math.sin(time + offset)`), gold `MeshBasicMaterial`, `AmbientLight` + `PointLight`
- Overlaid: h1 with gold gradient (`from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent`), fade-in animation (opacity 0→1, y 50→0)
- Subtitle about construction
- Two CTA buttons: "Рассчитать стоимость" (gold filled), "Наши проекты" (gold outline); hover scale 1.05 + glow
- Scroll indicator at bottom (animated arrow + "Листайте вниз")
- Mobile: no 3D Canvas

### 2. ServicesSection
- Scroll-reveal grid 2x3 → 1 col mobile
- 6 cards: icon (SVG), title, description, price ("от X ₽")
- Hover: y: -8, gold border, increased shadow
- Stagger animation (delayChildren, staggerChildren)

### 3. AboutSection
- 2-column: text left, stats right
- Left: heading, 2 paragraphs, "Подробнее" button
- Right: 4 animated counters (12 лет, 87 объектов, 250+ сотрудников, 8 мес)
- Counter animation: motionValue + spring, counts 0→final on viewport enter

### 4. PortfolioSection
- Filter buttons: "Все", "Дома", "Коттеджи", "Коммерция"; active = gold
- Card grid with `next/image`, title, area, type
- Hover: dark overlay, gold details panel, photo zoom 1.1
- Parallax within card on scroll (useTransform + scrollYProgress)
- Click → modal with gallery

### 5. TimelineSection
- Vertical gold line (center), animated thickness on scroll
- 5 stages: Фундамент → Стены → Крыша → Отделка → Сдача
- Alternating left/right layout; scroll-reveal with x: -100→0 / 100→0
- Line draws progressively as user scrolls

### 6. ReviewsSection
- Horizontal carousel with autoplay + pause on hover
- Cards: avatar (circle), name, project name, text, 5 gold stars
- Navigation arrows + dots

### 7. CalculatorSection
- Multi-step (4 steps), no page reload:
  1. House type (одноэтажный / двухэтажный / с мансардой)
  2. Area custom range slider (50–500 м²)
  3. Material cards (кирпич / газоблок / дерево / каркас)
  4. Extra options checkboxes (терраса, гараж, второй свет, цокольный этаж)
- Final: animated total price (counter 0→final) with breakdown
- "Получить смету" button → scroll to contact form

### 8. MapSection
- Stylized SVG map with region markers
- Clickable city tags (gold border) below map
- Click city/marker → show object count

### 9. ContactSection
- Form: name, phone, email, textarea
- Dark inputs with gold bottom-border, animated floating labels
- "Отправить заявку" button with loading spinner → success notification
- Right: phone, email, address, social icons (Telegram, WhatsApp, VK, YouTube)

### 10. Footer
- Logo, copyright, section links, privacy policy link

## Global animations & effects

- Lenis smooth scrolling (lerp: 0.08, duration: 1.2, autoRaf: false)
- Parallax on background layers (useTransform + scrollYProgress)
- Scroll reveal with staggered elements per section
- Mouse parallax on cards (mouse position → motion transform)
- Custom cursor: gold ring + dot, resizes on CTA/hover
- Grain/noise texture overlay via CSS pseudo-element + SVG filter
- Count-up animation for statistics
- Gold gradient on all headings
- Scroll-driven gold progress bar (top of page)

## Theme

- Background: `#0a0a0a` (dark), `#121212` (dark-800), `#1a1a1a` (dark-700)
- Accent: `#D4A843` (gold), `#E8C76A` (gold-300), `#B8922E` (gold-700)
- Text: white / off-white
- CSS variables via `@theme inline` in Tailwind v4
- Radial gradients for glow effects (`bg-radial from-gold/10 to-transparent`)

## Technical notes

- All Three.js imports dynamically loaded (SSR disabled)
- Mobile detection via `useMediaQuery` / `window.matchMedia` (< 768px)
- Tailwind v4 requires `@import "tailwindcss"` in globals.css
- `next.config.ts`: minimal config (no `output: 'standalone'`)
- npm dependencies: `next`, `react`, `react-dom`, `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `lenis`
- Font: Outfit as Google Fonts analog for Clash Display (headings); Manrope for body

## Data sources

- Services, stats, timeline stages, reviews, calculator options — hardcoded in respective components
- Portfolio items — placeholder photos via `picsum.photos` or local `/public` images
- Map — simplified SVG of Russia with region markers
- Icons — inline SVGs in components
