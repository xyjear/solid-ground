"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MapContent = dynamic(() => import("./MapContent"), { ssr: false });

const offices = [
  { name: "Калининград", objects: 3 },
  { name: "Санкт-Петербург", objects: 15 },
  { name: "Москва", objects: 28 },
  { name: "Краснодар", objects: 12 },
  { name: "Ростов-на-Дону", objects: 6 },
  { name: "Казань", objects: 9 },
  { name: "Екатеринбург", objects: 7 },
  { name: "Новосибирск", objects: 5 },
];

export default function MapSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section id="map" className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Регионы работы
      </motion.h2>

      <div className="h-[300px] md:h-[450px] rounded-xl overflow-hidden border border-white/5 bg-dark-800">
        <MapContent activeRegion={activeRegion} onSelectRegion={setActiveRegion} />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl mx-auto">
        {offices.map((office) => (
          <button
            key={office.name}
            onClick={() => setActiveRegion(office.name === activeRegion ? null : office.name)}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
              activeRegion === office.name
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/10 text-white/50 hover:border-gold/50 hover:text-gold"
            }`}
          >
            {office.name}
          </button>
        ))}
      </div>
    </section>
  );
}
