"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stages = [
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
        <path d="M12 3v3m0 0l3-3m-3 3L9 3m3 3v3" />
      </svg>
    ),
    title: "Фундамент",
    description: "Геология, разметка, земляные работы, заливка фундамента с гидроизоляцией",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7l9 4m0 0l9-4m-9 4v10" />
      </svg>
    ),
    title: "Стены",
    description: "Возведение несущих и внутренних стен, утепление, перекрытия",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0l-2-2m2 2l2 2" />
      </svg>
    ),
    title: "Крыша",
    description: "Стропильная система, кровельное покрытие, водосточная система, утепление чердака",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    title: "Отделка",
    description: "Инженерные системы, стяжка, штукатурка, финишная отделка помещений",
  },
  {
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-gold">
        <path d="M9 12l2 2 4-4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
    title: "Сдача объекта",
    description: "Финишный контроль, подписание актов, передача ключей с гарантией",
  },
];

function StageCard({
  stage,
  index,
}: {
  stage: (typeof stages)[number];
  index: number;
}) {
  const isLeft = index % 2 === 0;
  return (
    <div className={`flex items-center justify-center gap-8 relative ${isLeft ? "" : "md:flex-row-reverse"}`}>
      <div className={`flex-1 ${isLeft ? "md:text-right md:pr-10" : "md:text-left md:pl-10"}`}>
        <motion.div
          className="bg-dark-800 border border-white/5 rounded-xl p-6"
          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-3">{stage.icon}</div>
          <h3 className="text-xl font-heading font-semibold text-white mb-2">
            {stage.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            {stage.description}
          </p>
        </motion.div>
      </div>
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-dark border-2 border-gold items-center justify-center shrink-0">
        <div className="w-2 h-2 rounded-full bg-gold" />
      </div>
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Как мы строим
      </motion.h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-white/10">
          <motion.div
            className="w-full bg-gold origin-top"
            style={{ height: lineHeight }}
          />
        </div>
        <div className="space-y-12 md:space-y-16">
          {stages.map((stage, i) => (
            <StageCard key={i} stage={stage} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
