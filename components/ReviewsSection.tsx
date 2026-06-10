"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    name: "Алексей Петров",
    project: "Дом у озера, 235 м²",
    text: "Очень доволен результатом. Строители пришли чётко по графику, все этапы согласовывали. Дом получился тёплым и уютным. Спасибо команде SolidGround!",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
  },
  {
    name: "Елена Смирнова",
    project: "Коттедж «Сосновый», 320 м²",
    text: "Выбирали подрядчика долго и не ошиблись. Качество отделки на высоте, все инженерные системы работают отлично. Отдельное спасибо за ландшафт!",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
  },
  {
    name: "Дмитрий Иванов",
    project: "Офисный центр West, 1 200 м²",
    text: "Строили коммерческий объект — важны были сроки. SolidGround справились даже раньше. Коммуникация на уровне, все вопросы решались оперативно.",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
  },
  {
    name: "Ольга Кузнецова",
    project: "Дом «Берёзовая роща», 185 м²",
    text: "Строили первый дом — боялись, что будет много проблем. Но команда всё объясняла и консультировала на каждом этапе. Теперь рекомендуем всем знакомым!",
    avatar: "https://picsum.photos/seed/avatar4/100/100",
  },
  {
    name: "Сергей Новиков",
    project: "Коттеджный посёлок «Ключи»",
    text: "Заказывал коттедж под ключ. Работали 8 месяцев, как и обещали. Качество отличное, никаких скрытых дефектов. Буду обращаться ещё для бани.",
    avatar: "https://picsum.photos/seed/avatar5/100/100",
  },
];

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#D4A843" className="w-4 h-4">
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.77.91 5.33L10 13.47l-4.78 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      id="reviews"
      className="py-24 px-4 max-w-4xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Отзывы клиентов
      </motion.h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="bg-dark-800 border border-white/5 rounded-xl p-8 md:p-10 text-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border-2 border-gold">
              <Image
                src={reviews[current].avatar}
                alt={reviews[current].name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex justify-center mb-3">
              <Stars />
            </div>
            <h3 className="text-lg font-heading font-semibold text-white">
              {reviews[current].name}
            </h3>
            <p className="text-gold text-sm mb-4">{reviews[current].project}</p>
            <p className="text-white/60 leading-relaxed max-w-xl mx-auto">
              {reviews[current].text}
            </p>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-gold w-6" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
