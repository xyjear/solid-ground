```
Разработка лендинга для строительной компании SolidGround (Next.js 16)

Контент сайта на русском языке (все заголовки, тексты, кнопки, подписи, отзывы — русские).

## Требования

**Стек:**
- Next.js 16 (App Router) — последняя стабильная версия
- Tailwind CSS v4 (новый синтаксис с @theme, @import "tailwindcss")
- Framer Motion (анимации, scroll-triggered эффекты, stagger children)
- Three.js + @react-three/fiber + @react-three/drei (3D-сцена на hero)
- Lenis (smooth scrolling, интеграция с Framer Motion через frame.update)
- Шрифты: Clash Display (via next/font или Google Fonts) для заголовков + Manrope для текста

**Тема:** Тёмный фон (#0a0a0a), золотой акцент (gold / #D4A843), белый текст (white/off-white).
Использовать CSS-переменные через @theme inline в Tailwind v4.
Радиальные градиенты для подсветки (bg-radial from-gold/10 to-transparent).

**Адаптив:** Mobile-first, все анимации работают на десктопе, на мобилке — graceful degradation (без 3D, параллакс упрощён).

---

## Структура компонентов (app/page.tsx и компоненты в /components)

### 1. HeroSection — первый экран
- Client component ('use client')
- Fullscreen (h-dvh), тёмный фон + золотая радиальная подсветка по центру
- 3D-сцена на заднем плане через Canvas (фиксированная, z-index: -1):
  - Плавающие геометрические фигуры: IcosahedronGeometry, TorusGeometry, OctahedronGeometry, Box
  - Wireframe материал (MeshBasicMaterial с wireframe: true), золотой цвет
  - Медленное вращение каждого объекта с разной скоростью (useFrame с delta)
  - Лёгкое floating-движение по оси Y (Math.sin(time + offset))
  - AmbientLight + PointLight в золотых тонах
- Поверх 3D: крупный заголовок h1 с золотым градиентом (bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent)
  - Анимация появления: opacity 0→1, y 50→0, duration 1s, delay 0.5s
- Подзаголовок (текст про строительство)
- Две CTA-кнопки в ряд:
  - "Рассчитать стоимость" — золотая, filled
  - "Наши проекты" — outline с золотой обводкой
  - Hover: scale 1.05, glow эффект
- Scroll indicator внизу (анимированная стрелка, подсказка "Листайте вниз")

### 2. ServicesSection — услуги
- Scroll-reveal: каждый элемент появляется при скролле (motion.div с initial/animate)
- Сетка 2x3 карточек на десктопе → 1 колонка на мобилке
- Каждая карточка:
  - Иконка (SVG-иконка в золотом цвете: инструменты, проект, фундамент, крыша, отделка, ландшафт)
  - Заголовок услуги
  - Краткое описание (2-3 строки)
  - Цена "от X ₽"
- Hover: карточка приподнимается (y: -8), золотая обводка (border-gold/50), тень увеличивается
- Stagger animation: delayChildren: 0.1, staggerChildren: 0.1

### 3. AboutSection — о компании
- Две колонки: текст слева, цифры справа
- Слева: заголовок, текст о компании (2 абзаца), кнопка "Подробнее"
- Справа: 4 цифры-достижения с анимацией счётчика (count-up):
  - "12 лет на рынке"
  - "87 сданных объектов"
  - "250+ сотрудников"
  - "Средний срок стройки — 8 мес"
- Анимация счётчика: при попадании во вьюпорт числа бегут от 0 до финала (useMotionValue + useSpring из Framer Motion), с символом + в конце

### 4. PortfolioSection — портфолио объектов
- Фильтры: кнопки "Все", "Дома", "Коттеджи", "Коммерция" — активная в золотом цвете
- Masonry/сетка с карточками объектов
- Каждая карточка: фото (next/image), название, площадь, тип
- Hover: затемнение (overlay), сверху золотая плашка с деталями, плавный zoom фото (scale: 1.1)
- Parallax внутри карточки при скролле (useTransform с привязкой к scrollYProgress элемента)
- При клике на карточку — модальное окно с галереей фото объекта

### 5. TimelineSection — процесс стройки (WOW-эффект)
- Вертикальная линия по центру (золотая, анимированная толщина при скролле)
- 5 этапов: Фундамент → Стены → Крыша → Отделка → Сдача
- Каждый этап: слева/справа попеременно, иконка, заголовок, описание
- При скролле: элемент выезжает с соответствующей стороны (x: -100→0 или 100→0), линия дорисовывается
- На фоне: 3D-геометрия (облегчённая, React Three Fiber, но без Canvas — можно через div с HTML-следами или имитацию через SVG), меняющая цвет/форму по этапу

### 6. ReviewsSection — отзывы
- Горизонтальный слайдер/карусель
- Карточка отзыва: аватар (круглое фото), имя, название объекта, текст, 5 звёзд (золотые)
- Автоматическая прокрутка (autoplay), пауза на hover
- Стрелки навигации + точки

### 7. CalculatorSection — калькулятор стоимости дома
- Многошаговый (3-4 шага), без перезагрузки страницы
- Шаг 1 — Тип дома: карточки-выбор (одноэтажный, двухэтажный, с мансардой)
- Шаг 2 — Площадь: кастомный range-слайдер (от 50 до 500 м²), с отображением текущего значения
- Шаг 3 — Материал: карточки с иконками (кирпич, газоблок, дерево, каркас)
- Шаг 4 — Доп. опции: чекбоксы (терраса, гараж, второй свет, цокольный этаж)
- Итог: крупная анимированная цифра-цена (счётчик от 0 до финала), разбивка по пунктам
- Кнопка "Получить смету" — скролл к форме внизу

### 8. MapSection — карта регионов
- Стилизованная SVG-карта или iframe Яндекс.Карт с маркерами
- Под картой — список городов в виде кликабельных тегов (золотая обводка)
- При клике на город/маркер — показывать количество объектов

### 9. ContactSection — контакты
- Форма: имя, телефон, email, комментарий (textarea)
- Стиль: тёмный фон, поля ввода с золотым border-bottom, label анимированный (поднимается при фокусе)
- Кнопка "Отправить заявку" — при клике анимация загрузки (spinner), затем success notification
- Справа: телефон, почта, адрес, иконки соцсетей (Telegram, WhatsApp, VK, YouTube)

### 10. Footer
- Логотип, копирайт, ссылки на разделы, политику конфиденциальности

---

## Анимации и эффекты (глобально)
- Lenis smooth scrolling (lerp: 0.08, duration: 1.2)
- Parallax на фоновых слоях (useTransform + scrollYProgress)
- Scroll reveal каждой секции: staggered появление элементов
- Мышиный параллакс на карточках (motion.div с привязкой к mouse position)
- Кастомный курсор (золотое кольцо с точкой, изменяющее размер на CTA/hover)
- Grain/noise текстура поверх тёмных участков (CSS: псевдоэлемент с noise SVG filter)
- Count-up анимация для цифр
- Плавный gold градиент на заголовках
- Scroll-driven progress bar (золотая линия вверху/сбоку страницы)

---

## Технические детали

### Tailwind v4 (globals.css)
```css
@import "tailwindcss";

@theme inline {
  --color-dark: #0a0a0a;
  --color-dark-800: #121212;
  --color-dark-700: #1a1a1a;
  --color-gold: #D4A843;
  --color-gold-300: #E8C76A;
  --color-gold-500: #D4A843;
  --color-gold-700: #B8922E;
  --font-sans: "Manrope", sans-serif;
  --font-heading: "Clash Display", sans-serif;
}

:root {
  color-scheme: dark;
}
```

### Шрифты через next/font
```ts
import { Manrope } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' })
```
Clash Display — загрузить через Google Fonts или локально.

### Lenis + Framer Motion интеграция
```ts
// app/layout.tsx — обернуть в ReactLenis
// client-компонент LenisProvider
import { ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { cancelFrame, frame } from 'framer-motion'

function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  useEffect(() => {
    const update = (data) => lenisRef.current?.lenis?.raf(data.timestamp)
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [])
  return <ReactLenis root options={{ lerp: 0.08, duration: 1.2, autoRaf: false }} ref={lenisRef}>{children}</ReactLenis>
}
```

### 3D Hero (React Three Fiber)
- Canvas компонент с fixed позиционированием
- FloatingShapes: массив геометрий, каждая вращается с разной скоростью по осям X/Y/Z, колеблется по Y через sin(time * speed + phase)
- Wireframe MeshBasicMaterial, цвет золотой
- Постепенное изменение opacity при скролле (useScroll из Framer Motion + передача значения через props или контекст)

### Mobile fallback
- На устройствах < 768px: 3D Canvas не рендерится (useMediaQuery или window matchMedia)
- Parallax отключается на мобилках
- Smooth scroll отключается на мобилках (Lenis autoRaf: false + проверка touch)

---

## Структура файлов
```
app/
  layout.tsx          — корневой layout (шрифты, мета, LenisProvider)
  page.tsx            — сборка всех секций
  globals.css         — Tailwind v4 + @theme + кастомные стили
components/
  LenisProvider.tsx
  Scene3D.tsx         — React Three Fiber 3D-сцена
  FloatingShape.tsx   — отдельная геометрическая фигура
  HeroSection.tsx
  ServicesSection.tsx
  AboutSection.tsx
  PortfolioSection.tsx
  TimelineSection.tsx
  ReviewsSection.tsx
  CalculatorSection.tsx
  MapSection.tsx
  ContactSection.tsx
  Footer.tsx
  CustomCursor.tsx
  ScrollProgressBar.tsx
  ParallaxLayer.tsx
  Counter.tsx         — анимированный счётчик
  Modal.tsx
public/
  noise.svg           — для grain текстуры
```

---

## Деплой на Vercel

Проект сразу заточен под хостинг на Vercel:

- **Динамический импорт 3D-сцены:** `const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })` — Three.js не работает на сервере, только на клиенте. Без этого `build` упадёт с ошибкой `window is not defined`.
- **next/image:** все изображения через `import` или внешние хосты, прописанные в `next.config.ts`
- **next/font:** Google Fonts грузятся оптимально, без внешних запросов
- **next.config.ts:** минимальный — `output: 'standalone'` не нужен, Vercel сам собирает
- **package.json:** `next`, `react`, `react-dom`, `framer-motion`, `three`, `@react-three/fiber`, `@react-three/drei`, `lenis` — все в `dependencies`
- `.vercelignore` не нужен, `git push` → Vercel авто-деплой

## Задача

Создать полностью рабочий Next.js 16 проект лендинга для SolidGround по описанной структуре. Весь код должен быть production-ready, адаптивный, с корректными анимациями. Все секции должны быть реализованы с реальными данными (можно плейсхолдеры названий/текста, но стилистически законченные). Комментарии не ставить. Итоговый сайт — тёмный, технологичный, с золотыми акцентами, wow-эффектом при скролле через 3D-геометрию и таймлайн стройки.
```
