"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const buildingProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const leftHeight = useTransform(buildingProgress, [0, 1], ["0%", "100%"]);
  const rightHeight = useTransform(buildingProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section ref={ref} className="relative h-dvh flex items-center justify-center overflow-hidden">
      {!isMobile && <Scene3D />}
      <div className="absolute inset-0 bg-radial from-gold/10 to-transparent pointer-events-none" />

      <motion.div
        className="absolute left-0 bottom-0 w-1.5 md:w-2 origin-bottom bg-gradient-to-t from-gold/40 to-transparent"
        style={{ height: leftHeight }}
      />
      <motion.div
        className="absolute left-3 md:left-6 bottom-0 w-1 md:w-1.5 origin-bottom bg-gradient-to-t from-gold/20 to-transparent"
        style={{ height: useTransform(buildingProgress, [0, 1], ["0%", "60%"]) }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-1.5 md:w-2 origin-bottom bg-gradient-to-t from-gold/40 to-transparent"
        style={{ height: rightHeight }}
      />
      <motion.div
        className="absolute right-3 md:right-6 bottom-0 w-1 md:w-1.5 origin-bottom bg-gradient-to-t from-gold/20 to-transparent"
        style={{ height: useTransform(buildingProgress, [0, 1], ["0%", "70%"]) }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl font-heading font-bold leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent">
            SolidGround
          </span>
          <br />
          <span className="bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent">
            строим надёжно
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Проектирование и строительство домов, коттеджей и коммерческих объектов
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#calculator"
            className="px-8 py-4 bg-gold text-dark font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,168,67,0.4)]"
          >
            Рассчитать стоимость
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 border border-gold text-gold font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,168,67,0.2)]"
          >
            Наши проекты
          </a>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-sm text-white/40">Листайте вниз</span>
        <motion.div
          className="w-5 h-5 border-b-2 border-r-2 border-gold rotate-45"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
