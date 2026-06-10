# Debug Error Report

Generated: 2026-06-10
Iteration: 2

## Summary
- FAIL: 0
- WARN: 3
- PASS: 6
- N/A: 0

---

### [🟢 Fixed]

#### D1: Lenis smooth scrolling broken (framer-motion sync)
- **Status:** 🟢 Fixed

#### E4 (scroll lock + cursor): Modal body scroll; CustomCursor global cursor
- **Status:** 🟢 Fixed

---

### [WARN] (should fix)

#### D2: Edge cases not fully handled
- **Files:** components/HeroSection.tsx, components/ContactSection.tsx
- **Issues:**
  - `isMobile` in HeroSection is a plain variable — not reactive to window resize
  - Form submission in ContactSection has zero validation (no required, no patterns)
  - Scene3D dynamic import has no loading fallback
- **Status:** 🟡 Open

#### D4: Dead code — ParallaxLayer unused; lineProgress prop unused
- **Files:** components/ParallaxLayer.tsx, components/TimelineSection.tsx
- **Issues:**
  - ParallaxLayer.tsx fully implemented but never imported
  - `lineProgress` prop on StageCard destructured but never used in JSX
- **Status:** 🟡 Open

#### E4: Accessibility gaps remain
- **Files:** components/Modal.tsx, multiple SVG components, components/ContactSection.tsx
- **Issues:**
  - Modal has no `role="dialog"`, `aria-modal`, or focus trap
  - Decorative SVGs lack `aria-hidden="true"` (ServicesSection, TimelineSection, ReviewsSection, ContactSection)
  - Form inputs use `outline-none` without custom focus-visible styles (keyboard users lose focus indicator)
  - No `prefers-reduced-motion` consideration across animated components
  - Form fields missing `required` / `aria-required`
- **Status:** 🟡 Open

---

### [PASS]
D1 (fixed), D3, D5, E1, E2, E3, E4 (scroll lock + cursor part fixed)
