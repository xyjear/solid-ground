"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const regions = [
  { name: "Москва", objects: 28, x: "45%", y: "30%" },
  { name: "Санкт-Петербург", objects: 15, x: "35%", y: "15%" },
  { name: "Краснодар", objects: 12, x: "55%", y: "55%" },
  { name: "Казань", objects: 9, x: "50%", y: "35%" },
  { name: "Екатеринбург", objects: 7, x: "70%", y: "32%" },
  { name: "Новосибирск", objects: 5, x: "82%", y: "40%" },
  { name: "Ростов-на-Дону", objects: 6, x: "55%", y: "48%" },
  { name: "Калининград", objects: 3, x: "20%", y: "22%" },
];

const cityTags = [
  { name: "Москва", objects: 28 },
  { name: "СПб", objects: 15 },
  { name: "Краснодар", objects: 12 },
  { name: "Казань", objects: 9 },
  { name: "Екатеринбург", objects: 7 },
  { name: "Новосибирск", objects: 5 },
  { name: "Ростов-на-Дону", objects: 6 },
  { name: "Калининград", objects: 3 },
];

export default function MapSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const activeData = regions.find((r) => r.name === activeRegion);

  return (
    <section id="map" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Регионы работы
      </motion.h2>
      <div className="relative bg-dark-800 rounded-xl border border-white/5 p-6 md:p-10 max-w-3xl mx-auto">
        <svg viewBox="0 0 600 400" className="w-full h-auto">
          <rect x="0" y="0" width="600" height="400" fill="none" />
          <path
            d="M180 80 L200 60 L260 50 L320 55 L380 70 L420 90 L440 110 L450 140 L440 170 L420 200 L400 220 L370 240 L340 250 L310 260 L280 270 L260 280 L240 290 L220 280 L200 260 L180 240 L160 210 L150 180 L155 150 L160 120 L170 100 Z"
            fill="rgba(212,168,67,0.08)"
            stroke="rgba(212,168,67,0.3)"
            strokeWidth="1"
          />
          <path
            d="M280 270 L300 280 L340 290 L380 300 L420 310 L440 320 L450 340 L440 360 L420 370 L390 375 L360 370 L340 360 L320 340 L300 320 L280 300 L270 280 Z"
            fill="rgba(212,168,67,0.05)"
            stroke="rgba(212,168,67,0.2)"
            strokeWidth="1"
          />
          <path
            d="M400 70 L430 80 L470 90 L500 110 L520 130 L530 150 L520 170 L500 190 L470 200 L440 200 L420 190 L400 170 L390 150 L385 130 L390 100 Z"
            fill="rgba(212,168,67,0.05)"
            stroke="rgba(212,168,67,0.2)"
            strokeWidth="1"
          />
          {regions.map((r) => (
            <g key={r.name}>
              <circle
                cx={r.x}
                cy={r.y}
                r="6"
                fill={activeRegion === r.name ? "#D4A843" : "rgba(212,168,67,0.4)"}
                stroke="#D4A843"
                strokeWidth="1"
                className="cursor-pointer transition-all"
                onClick={() => setActiveRegion(r.name)}
              />
              <text
                x={r.x}
                y={parseFloat(r.y) - 10}
                textAnchor="middle"
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                fontFamily="Manrope, sans-serif"
              >
                {r.name}
              </text>
            </g>
          ))}
        </svg>
        {activeData && (
          <motion.div
            className="absolute top-6 right-6 bg-dark-700 border border-gold/30 rounded-lg px-4 py-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-gold font-heading font-bold text-lg">
              {activeData.name}
            </div>
            <div className="text-white/60 text-sm">
              {activeData.objects} объектов
            </div>
          </motion.div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-2xl mx-auto">
        {cityTags.map((city) => (
          <button
            key={city.name}
            onClick={() => setActiveRegion(city.name)}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
              activeRegion === city.name
                ? "border-gold bg-gold/10 text-gold"
                : "border-white/10 text-white/50 hover:border-gold/50 hover:text-gold"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
    </section>
  );
}
