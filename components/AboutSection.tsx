"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";

const stats = [
  { target: 12, suffix: "", label: "лет на рынке" },
  { target: 87, suffix: "+", label: "сданных объектов" },
  { target: 250, suffix: "+", label: "сотрудников" },
  { target: 8, suffix: "", label: "мес — средний срок стройки" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-6">
            О компании
          </h2>
          <p className="text-white/70 leading-relaxed mb-4">
            SolidGround — это команда профессионалов с многолетним опытом в
            строительстве жилых и коммерческих объектов. Мы берём на себя все
            этапы: от проектирования до сдачи «под ключ».
          </p>
          <p className="text-white/70 leading-relaxed mb-8">
            Наши объекты — это не просто здания. Это продуманные пространства,
            где каждый метр работает на комфорт и функциональность. Мы строим
            так, чтобы вы гордились результатом.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-3 border border-gold text-gold font-semibold rounded-lg transition-all duration-300 hover:bg-gold hover:text-dark"
          >
            Подробнее
          </a>
        </motion.div>
        <motion.div
          className="flex-1 grid grid-cols-2 gap-8"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <Counter key={i} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
