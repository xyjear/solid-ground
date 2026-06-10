# Tasks

## Phase 1: Project initialization

### Task 1.1: Scaffold Next.js 16 project
- **What:** Create Next.js project with TypeScript, App Router, Tailwind CSS
- **Details:** `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm` in project root. Remove default boilerplate (page content, default styles).
- **Depends on:** none
- [x] Complete

### Task 1.2: Install additional dependencies
- **What:** Install framer-motion, three, @react-three/fiber, @react-three/drei, lenis
- **Details:** `npm install framer-motion three @react-three/fiber @react-three/drei lenis`
- **Depends on:** 1.1
- [x] Complete

### Task 1.3: Configure globals.css with Tailwind v4 theme
- **What:** Set up `@theme inline` with dark/gold palette, radial gradients, noise texture
- **Details:** `app/globals.css` — `@import "tailwindcss"`, `@theme inline` with `--color-dark: #0a0a0a`, `--color-gold: #D4A843`, `--font-sans`, `--font-heading`. Add `color-scheme: dark`, noise pseudo-element on body. No `tailwind.config.ts` file.
- **Depends on:** 1.1
- [x] Complete

### Task 1.4: Create next.config.ts
- **What:** Minimal Next.js config with images domain for placeholders
- **Details:** `next.config.ts` — allow `picsum.photos` in `remotePatterns` for `next/image`. Set `typescript.ignoreBuildErrors: false`.
- **Depends on:** 1.1
- [x] Complete

### Task 1.5: Set up fonts in layout.tsx
- **What:** Configure Manrope + Outfit via `next/font/google` in root layout
- **Details:** `app/layout.tsx` — import `Manrope` and `Outfit` from `next/font/google`, add both as CSS variables (`--font-sans`, `--font-heading`). Set metadata (title: "SolidGround — строительная компания", description). Wrap children in LenisProvider.
- **Depends on:** 1.1
- [x] Complete

### Task 1.6: Create noise.svg for grain texture
- **What:** SVG noise filter file
- **Details:** `public/noise.svg` — SVG with `<filter id="noise">` using `feTurbulence` (type="fractalNoise", baseFrequency="0.65", numOctaves="3", stitchTiles="stitch") and `feColorMatrix`. Applied via CSS pseudo-element in globals.css.
- **Depends on:** 1.1
- [x] Complete

## Phase 2: Core infrastructure & global effects

### Task 2.1: Create LenisProvider
- **What:** Smooth scroll provider with Framer Motion frame integration
- **Details:** `components/LenisProvider.tsx` — `'use client'`, `ReactLenis` from `lenis/react`, `useRef`, `useEffect` with `frame.update` from framer-motion, `cancelFrame` cleanup. Options: `lerp: 0.08, duration: 1.2, autoRaf: false`. Disable on touch devices.
- **Depends on:** 1.5
- [x] Complete

### Task 2.2: Create Scene3D + FloatingShape
- **What:** React Three Fiber 3D scene with floating wireframe geometries
- **Details:** `components/Scene3D.tsx` — `'use client'`, `Canvas` with `dpr={[1, 2]}`, camera position. Array of shapes: Icosahedron, Torus, Octahedron, Box. Each `FloatingShape.tsx` — `useFrame((state, delta) => ...)` for rotation (different speeds per axis) + Y float (`Math.sin(time * speed + phase)`). `MeshBasicMaterial` with `wireframe: true`, gold color. `AmbientLight` + `PointLight`. Receive scroll progress from context/prop to fade opacity.
- **Depends on:** 1.2
- [x] Complete

### Task 2.3: Create CustomCursor
- **What:** Gold ring + dot cursor follower
- **Details:** `components/CustomCursor.tsx` — `'use client'`, track `mouse` via framer-motion `useMotionValue`, `useSpring` for smooth following. Ring (div with border) + dot. Scale up on hover over CTA buttons (data-cursor attr or className check). Hide on mobile.
- **Depends on:** none
- [x] Complete

### Task 2.4: Create ScrollProgressBar
- **What:** Fixed gold progress bar at top of page
- **Details:** `components/ScrollProgressBar.tsx` — `'use client'`, `useScroll` from framer-motion (`scrollYProgress`), `useTransform` to scaleX. Fixed `div` at top, `h-0.5`, gold bg, `origin-left`, `scaleX` transform.
- **Depends on:** none
- [x] Complete

### Task 2.5: Create ParallaxLayer
- **What:** Reusable parallax wrapper component
- **Details:** `components/ParallaxLayer.tsx` — `'use client'`, `useRef`, `useScroll` (`scrollYProgress`), `useTransform` for Y offset (e.g., `[-20, 20]` range based on speed prop). Wrap children in `motion.div` with transformed style.
- **Depends on:** none
- [x] Complete

### Task 2.6: Create Counter component
- **What:** Animated count-up for statistics
- **Details:** `components/Counter.tsx` — `'use client'`, `useMotionValue` + `useSpring` (stiffness: 50, damping: 20), `useInView` to trigger. Counts from 0 to target with `+` suffix. `useTransform` for rounded display value.
- **Depends on:** none
- [x] Complete

### Task 2.7: Create Modal component
- **What:** Reusable overlay modal for portfolio gallery
- **Details:** `components/Modal.tsx` — `'use client'`, `AnimatePresence`, overlay backdrop (`rgba(0,0,0,0.9)`), close on Escape key + backdrop click. Animate scale + opacity on open/close. Render children inside.
- **Depends on:** none
- [x] Complete

## Phase 3: HeroSection (first screen)

### Task 3.1: Create HeroSection
- **What:** Full-screen hero with 3D scene, title, CTA, scroll indicator
- **Details:** `components/HeroSection.tsx` — `'use client'`. Fullscreen `h-dvh`, relative positioning. Gold radial gradient overlay (`bg-radial from-gold/10 to-transparent`). Dynamically import `Scene3D` (`dynamic(() => import('./Scene3D'), { ssr: false })`). Check mobile via `useMediaQuery` < 768px → skip 3D.
  - h1: "SolidGround — строим надёжно" with gold gradient (`from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent`), fade + slide up animation
  - Subtitle: "Проектирование и строительство домов, коттеджей и коммерческих объектов"
  - Two CTA buttons: "Рассчитать стоимость" (gold filled, `bg-gold text-dark`), "Наши проекты" (outline gold `border-gold text-gold`)
  - Hover: `scale: 1.05`, gold glow (`box-shadow: 0 0 20px rgba(212, 168, 67, 0.4)`)
  - Scroll indicator: animated bouncing arrow + "Листайте вниз" at bottom center
- **Depends on:** 2.2
- [x] Complete

## Phase 4: Content sections (Services, About, Portfolio, Timeline)

### Task 4.1: Create ServicesSection
- **What:** 6 service cards in scroll-reveal grid
- **Details:** `components/ServicesSection.tsx` — `'use client'`. Section with heading "Наши услуги". Grid: 2x3 on desktop, 1 col mobile (Tailwind grid). 6 cards with inline SVG icon, title, description, price "от X ₽". Scroll-reveal via `motion.div` with `initial/animate`, stagger `delayChildren: 0.1, staggerChildren: 0.1`. Hover: `y: -8`, `border-gold/50`, increased shadow.
- **Depends on:** none
- [x] Complete

### Task 4.2: Create AboutSection with Counters
- **What:** About company info + 4 animated counters
- **Details:** `components/AboutSection.tsx` — `'use client'`. 2-column flex: left (heading "О компании", 2 paragraphs, "Подробнее" button), right (4 Counter components: 12 лет, 87 объектов, 250+ сотрудников, 8 мес). Counter suffix logic: years → "", objects → "", employees → "", months → "".
- **Depends on:** 2.6
- [x] Complete

### Task 4.3: Create PortfolioSection with Modal
- **What:** Portfolio gallery with filters, hover effects, modal
- **Details:** `components/PortfolioSection.tsx` — `'use client'`. Filter buttons row: "Все", "Дома", "Коттеджи", "Коммерция" (active = gold). Card grid with `next/image` (placeholder picsum.photos), title, area (`м²`), type. Hover: dark overlay, gold details panel, `scale: 1.1` on image. Parallax via `useTransform` + element `scrollYProgress`. Click → Modal with gallery.
- **Depends on:** 2.5, 2.7
- [x] Complete

### Task 4.4: Create TimelineSection
- **What:** Construction process vertical timeline
- **Details:** `components/TimelineSection.tsx` — `'use client'`. Section heading "Как мы строим". Vertical gold line center (animated `scaleY` on scroll). 5 stages: Фундамент, Стены, Крыша, Отделка, Сдача. Alternating left/right. Each: icon (SVG circle/icon), title, description. Scroll-reveal: slide from `x: -100` (left items) or `x: 100` (right items). Line thickness grows progressively via `useScroll` + `useTransform`.
- **Depends on:** none
- [x] Complete

## Phase 5: Interactive sections (Reviews, Calculator, Map)

### Task 5.1: Create ReviewsSection
- **What:** Horizontal carousel with autoplay
- **Details:** `components/ReviewsSection.tsx` — `'use client'`. Section heading "Отзывы клиентов". Horizontal scroll/slider container. Cards: avatar (circle `next/image`), name, project name, review text, 5 gold star icons (inline SVG). Autoplay with `useEffect` + `setInterval` (pause on hover via `onMouseEnter/Leave`). Left/right arrow buttons + dot indicators.
- **Depends on:** none
- [x] Complete

### Task 5.2: Create CalculatorSection
- **What:** Multi-step cost calculator (4 steps)
- **Details:** `components/CalculatorSection.tsx` — `'use client'`. Section heading "Калькулятор стоимости". 4 steps managed by state (`currentStep`):
  1. Тип дома: 3 selectable cards (одноэтажный / двухэтажный / с мансардой)
  2. Площадь: custom range input 50–500 м², display current value
  3. Материал: 4 cards with icons (кирпич / газоблок / дерево / каркас)
  4. Доп. опции: checkboxes (терраса, гараж, второй свет, цокольный этаж)
  - Final: animated price counter (0→calculated), breakdown table, "Получить смету" button → scroll to ContactSection
  - Navigation: "Назад" / "Далее" buttons
- **Depends on:** 2.6
- [x] Complete

### Task 5.3: Create MapSection
- **What:** SVG map with clickable regions and city tags
- **Details:** `components/MapSection.tsx` — `'use client'`. Section heading "Регионы работы". Simplified SVG of Russia (inline, hardcoded paths for main regions/districts). Clickable city tags below map (gold border, rounded). Click city → show object count near marker. Responsive SVG viewBox.
- **Depends on:** none
- [x] Complete

## Phase 6: ContactSection + Footer + polish

### Task 6.1: Create ContactSection
- **What:** Contact form with validation + company details
- **Details:** `components/ContactSection.tsx` — `'use client'`. Section heading "Свяжитесь с нами". 2-col: form left, info right. Form fields: name, phone, email (input), comment (textarea). Dark bg inputs, gold bottom-border, animated floating label (shrink on focus/have value). "Отправить заявку" button → loading spinner (animated SVG) → success notification (checkmark + "Заявка отправлена!"). Right column: phone, email, address, social icons (Telegram, WhatsApp, VK, YouTube) as links with SVG icons.
- **Depends on:** none
- [x] Complete

### Task 6.2: Create Footer
- **What:** Site footer with links
- **Details:** `components/Footer.tsx` — Logo "SolidGround" (text, gold), copyright "© 2024 SolidGround. Все права защищены.", links to sections (Услуги, Проекты, О нас, Контакты), "Политика конфиденциальности" link (href="#"). Gold top border.
- **Depends on:** none
- [x] Complete

### Task 6.3: Compose all sections in page.tsx
- **What:** Import and arrange all sections in the main page
- **Details:** `app/page.tsx` — import all sections, render in order: Hero, Services, About, Portfolio, Timeline, Reviews, Calculator, Map, Contact, Footer. Wrap in `<main>`.
- **Depends on:** 3.1, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 6.1, 6.2
- [x] Complete

### Task 6.4: Run build and fix errors
- **What:** Verify project builds without errors
- **Details:** Run `npm run build` from project root. Fix any TypeScript errors, missing imports, or configuration issues. Ensure no `window is not defined` errors (3D must be dynamic import with ssr: false).
- **Depends on:** 6.3
- [x] Complete
