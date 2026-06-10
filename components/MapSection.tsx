"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const regions = [
  { name: "Москва", objects: 28, x: 186, y: 136 },
  { name: "Санкт-Петербург", objects: 15, x: 163, y: 92 },
  { name: "Краснодар", objects: 12, x: 205, y: 218 },
  { name: "Казань", objects: 9, x: 228, y: 150 },
  { name: "Екатеринбург", objects: 7, x: 296, y: 145 },
  { name: "Новосибирск", objects: 5, x: 388, y: 170 },
  { name: "Ростов-на-Дону", objects: 6, x: 198, y: 200 },
  { name: "Калининград", objects: 3, x: 115, y: 135 },
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

function MapPin({ cx, cy, isActive }: { cx: number; cy: number; isActive: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="5" fill={isActive ? "#D4A843" : "rgba(212,168,67,0.5)"} />
      <circle
        cx={cx}
        cy={cy}
        r="10"
        fill="none"
        stroke={isActive ? "#D4A843" : "rgba(212,168,67,0.2)"}
        strokeWidth="1"
      />
    </g>
  );
}

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
        <svg viewBox="0 0 600 350" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line
                x1={50 + i * 130} y1={30} x2={50 + i * 130} y2={320}
                stroke="rgba(255,255,255,0.03)" strokeWidth="1"
              />
              <text x={50 + i * 130} y={338} textAnchor="middle" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="Manrope">
                {30 + i * 20}°
              </text>
            </g>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <line
                x1={50} y1={60 + i * 70} x2={570} y2={60 + i * 70}
                stroke="rgba(255,255,255,0.03)" strokeWidth="1"
              />
              <text x={42} y={64 + i * 70} textAnchor="end" fill="rgba(255,255,255,0.08)" fontSize="8" fontFamily="Manrope">
                {70 - i * 15}°
              </text>
            </g>
          ))}

          {/* Sea / ocean */}
          <path
            d="M100 50 C110 30, 160 25, 200 35 L250 30 L300 20 L350 25 L400 20 L450 25 L500 30 L530 35 L550 45 L560 60 L570 80 L575 100 L570 120 L560 140 L545 155 L530 165 L510 175 L495 185 L480 195 L465 205 L450 215 L435 225 L420 235 L400 245 L375 252 L350 258 L325 262 L300 265 L275 262 L250 258 L225 252 L200 248 L175 255 L155 260 L140 255 L130 245 L120 230 L110 210 L105 190 L100 170 L95 150 L92 130 L93 110 L95 90 Z"
            fill="rgba(59,130,246,0.04)"
            stroke="rgba(59,130,246,0.08)"
            strokeWidth="1"
          />

          {/* Russia territory */}
          <path
            d="M140 90 L150 75 L170 65 L190 55 L230 50 L280 45 L330 40 L380 42 L430 40 L480 45 L515 50 L540 58 L555 70 L560 85 L565 100 L558 115 L548 128 L535 140 L520 148 L505 155 L490 162 L475 170 L460 178 L445 188 L425 198 L405 205 L385 212 L365 218 L345 222 L325 225 L305 228 L285 230 L265 228 L245 225 L225 222 L205 220 L185 225 L170 232 L160 228 L155 218 L150 205 L148 190 L145 175 L142 160 L140 145 L139 130 L138 115 L138 100 Z"
            fill="rgba(212,168,67,0.08)"
            stroke="rgba(212,168,67,0.25)"
            strokeWidth="1.5"
          />

          {/* Kamchatka */}
          <path
            d="M540 75 L548 85 L555 100 L552 115 L545 125 L535 132 L528 125 L525 110 L530 90 Z"
            fill="rgba(212,168,67,0.08)"
            stroke="rgba(212,168,67,0.2)"
            strokeWidth="1"
          />

          {/* Crimea */}
          <path
            d="M175 218 L185 210 L195 212 L200 220 L195 228 L185 230 L178 226 Z"
            fill="rgba(212,168,67,0.08)"
            stroke="rgba(212,168,67,0.2)"
            strokeWidth="1"
          />

          {/* Kaliningrad */}
          <path
            d="M108 128 L115 122 L125 124 L128 132 L122 140 L112 138 Z"
            fill="rgba(212,168,67,0.08)"
            stroke="rgba(212,168,67,0.2)"
            strokeWidth="1"
          />

          {/* City markers */}
          {regions.map((r) => (
            <g key={r.name} className="cursor-pointer" onClick={() => setActiveRegion(r.name)}>
              <MapPin cx={r.x} cy={r.y} isActive={activeRegion === r.name} />
              <text
                x={r.x}
                y={r.y - 14}
                textAnchor="middle"
                fill={activeRegion === r.name ? "#D4A843" : "rgba(255,255,255,0.5)"}
                fontSize="9"
                fontFamily="Manrope, sans-serif"
                fontWeight={activeRegion === r.name ? "bold" : "normal"}
              >
                {r.name}
              </text>
            </g>
          ))}

          {/* Compass */}
          <g transform="translate(545, 295)">
            <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <polygon points="0,-10 3,0 -3,0" fill="#D4A843" />
            <polygon points="0,10 3,0 -3,0" fill="rgba(255,255,255,0.2)" />
            <text x="0" y="-16" textAnchor="middle" fill="#D4A843" fontSize="8" fontFamily="Manrope" fontWeight="bold">N</text>
          </g>
        </svg>

        {/* Info card */}
        {activeData && (
          <motion.div
            className="absolute bottom-6 left-6 bg-dark-700 border border-gold/30 rounded-lg px-4 py-3"
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
