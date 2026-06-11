"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: "Проектирование",
    description: "Архитектурные и конструктивные решения любой сложности",
    price: "от 1 500 ₽/м²",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
        <rect x="3" y="11" width="18" height="10" rx="1.5" />
        <path d="M7 11V7a2 2 0 012-2h6a2 2 0 012 2v4" />
        <line x1="12" y1="5" x2="12" y2="2" />
        <line x1="3" y1="16" x2="21" y2="16" />
      </svg>
    ),
    title: "Фундаментные работы",
    description: "Все типы фундаментов под любые грунты и нагрузки",
    price: "от 350 000 ₽",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7l9 4m0 0l9-4m-9 4v10" />
      </svg>
    ),
    title: "Возведение стен и кровли",
    description: "Кирпич, газоблок, дерево — под ключ с утеплением",
    price: "от 12 000 ₽/м²",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0l-2-2m2 2l2 2M9 7h6m-6 4h6m-6 4h4" />
      </svg>
    ),
    title: "Внутренняя отделка",
    description: "Чистовая отделка, инженерия, сантехника, электрика",
    price: "от 8 000 ₽/м²",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
        <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 10a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2zm10-5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
    title: "Ландшафтный дизайн",
    description: "Благоустройство территории, дорожки, газоны, освещение",
    price: "от 500 000 ₽",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-gold">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Ремонт и реконструкция",
    description: "Капитальный ремонт, перепланировка, усиление конструкций",
    price: "от 7 000 ₽/м²",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Наши услуги
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="group p-6 rounded-xl bg-dark-800 border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_8px_30px_rgba(212,168,67,0.15)]"
            variants={cardVariants}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-heading font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              {service.description}
            </p>
            <span className="text-gold font-semibold text-sm">{service.price}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
