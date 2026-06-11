"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Counter from "./Counter";
import Modal from "./Modal";

const stats = [
  { target: 14, suffix: "", label: "лет на рынке" },
  { target: 87, suffix: "+", label: "сданных объектов" },
  { target: 250, suffix: "+", label: "сотрудников" },
  { target: 8, suffix: "", label: "мес — средний срок стройки" },
];

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about" className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="bg-dark-800 p-5 md:p-8 rounded-xl max-w-2xl mx-auto space-y-6">
          <h3 className="text-2xl font-heading font-bold text-gold">О компании SolidGround</h3>
          <p className="text-white/70 leading-relaxed">
            SolidGround основана в 2012 году группой инженеров-строителей с многолетним опытом
            работы в крупнейших строительных компаниях России. За 14 лет мы прошли путь от
            небольших частных заказов до масштабных коммерческих проектов.
          </p>
          <p className="text-white/70 leading-relaxed">
            Наш подход — полная прозрачность на каждом этапе. Мы согласовываем смету,
            материалы и сроки до начала работ. Никаких скрытых платежей и неожиданных
            удорожаний. Каждый клиент получает личного куратора проекта, который отвечает
            на вопросы 24/7.
          </p>
          <p className="text-white/70 leading-relaxed">
            Мы используем только сертифицированные материалы от проверенных поставщиков.
            На объектах работают бригады с профильным образованием и опытом от 5 лет.
            На все работы даём гарантию до 5 лет.
          </p>
          <p className="text-white/70 leading-relaxed">
            За 14 лет мы сдали 87 объектов — от уютных загородных домов до бизнес-центров
            класса А. Средний срок строительства — 8 месяцев. 95% клиентов обращаются к нам
            повторно или рекомендуют знакомым.
          </p>
        </div>
      </Modal>
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
          <button
            onClick={() => setModalOpen(true)}
            className="inline-block px-8 py-3 border border-gold text-gold font-semibold rounded-lg transition-all duration-300 hover:bg-gold hover:text-dark"
          >
            Подробнее
          </button>
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
