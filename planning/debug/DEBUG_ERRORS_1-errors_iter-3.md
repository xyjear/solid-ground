# Debug Error Report

Generated: 2026-06-10
Iteration: 3

## Summary
- FAIL: 0
- WARN: 5 (1 existing + 4 manual)
- PASS: 11
- N/A: 0

---

### [🟢 Fixed]
D1 (Lenis logic), D2 (edge cases — isMobile, form validation), D4 (dead code — ParallaxLayer, lineProgress), E4 (a11y — SVGs, Modal, scroll lock, cursor, required, focus-visible, prefers-reduced-motion), G1, G3, G4, D3, D5, E1, E2, E3

---

### [WARN]

#### E4: ReviewsSection nav buttons lack accessible labels
- **File:** components/ReviewsSection.tsx:116–131, 134–142
- **Issue:** Prev/next buttons are icon-only with no `aria-label`; dot indicator buttons lack `aria-label` and `aria-current`
- **Status:** 🟡 Open

---

---

### [Manual] E4: 3D floating shapes blend with text — need blur/opacity/edge positioning
- **Check:** E4 — Visual clarity / accessibility
- **File:** components/FloatingShape.tsx, components/Scene3D.tsx
- **Issue:** Wireframe 3D shapes in hero overlap with centered text. Need blur, lower opacity, repositioned to screen edges
- **Source:** Manual report
- **Status:** 🔴 Open
- **Severity:** WARN

### [Manual] D1: "Рассчитать стоимость" button links to form, not calculator
- **Check:** D1 — Logical error
- **File:** components/HeroSection.tsx:41
- **Issue:** CTA button `href="#contact"` should link to `#calculator` so user lands on the interactive price calculator
- **Source:** Manual report
- **Status:** 🔴 Open
- **Severity:** WARN

### [Manual] C3: MapSection looks abstract — no terrain/roads, hard to recognize as map
- **Check:** C3 — Factual/visual correctness
- **File:** components/MapSection.tsx
- **Issue:** SVG map is just blobs with dots — no suggestion of Russia's geography (no coastline, no borders, no roads). Looks like abstract chart
- **Source:** Manual report
- **Status:** 🔴 Open
- **Severity:** WARN

### [Manual] D1: Calculator "Получить смету" button redundant — price updates dynamically
- **Check:** D1 — Logical error
- **File:** components/CalculatorSection.tsx:229–235
- **Issue:** After step 4, "Получить смету" button scrolls to price which is already shown below dynamically. Button serves no purpose — price is already visible
- **Source:** Manual report
- **Status:** 🔴 Open
- **Severity:** WARN
