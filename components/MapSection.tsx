"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const offices = [
  { name: "Москва", objects: 28, x: 240, y: 188 },
  { name: "Санкт-Петербург", objects: 15, x: 210, y: 158 },
  { name: "Калининград", objects: 3, x: 170, y: 175 },
  { name: "Краснодар", objects: 12, x: 225, y: 252 },
  { name: "Ростов-на-Дону", objects: 6, x: 225, y: 240 },
  { name: "Казань", objects: 9, x: 260, y: 195 },
  { name: "Екатеринбург", objects: 7, x: 310, y: 190 },
  { name: "Новосибирск", objects: 5, x: 380, y: 205 },
];

const russiaPath = `
M 165 185
L 172 178 180 165 190 155 200 148 210 142 225 135 240 128
L 260 120 280 115 300 108 320 102 340 96 360 92 380 88
L 400 85 420 82 440 80 460 78 480 76 500 75 515 74
L 530 74 540 76 548 80 555 86 558 94 560 102 555 110
L 548 118 540 125 530 130 520 133 510 136 500 138
L 490 140 480 142 470 145

L 460 148 450 152 440 158 430 165
L 420 172 410 178 400 185 390 190 380 195 370 198
L 360 200 350 202 340 204 330 206 320 208
L 310 210 300 212 290 214 280 215 270 214
L 260 212 250 210 245 212 240 215 235 220
L 230 225 225 230 220 238 215 244

L 210 248 205 250 200 248 198 244
L 196 240 195 235 194 230 192 225
L 190 220 188 215 185 210 182 206
L 178 202 175 198 172 194 168 190
Z

M 168 168
C 160 155 155 148 148 142
C 140 135 132 130 125 128
C 118 126 112 128 108 132
C 105 136 104 142 106 148
C 108 154 112 158 118 162
C 125 166 130 168 135 170
C 140 172 145 172 150 170
C 155 168 160 165 165 160
Z

M 540 78
C 545 72 552 68 560 66 568 64 575 66
C 580 70 582 76 580 82 578 88 575 92
C 570 96 565 98 560 96 555 94 552 90
L 548 86 540 82 Z

M 200 254
C 195 248 188 244 180 244 172 244 166 248
C 162 252 160 258 162 264 164 270 168 274
C 174 276 180 275 184 270 188 265 192 260
Z
`;

const russiaOutlinePath = `
M 165 185
L 172 178 180 165 190 155 200 148 210 142 225 135 240 128
L 260 120 280 115 300 108 320 102 340 96 360 92 380 88
L 400 85 420 82 440 80 460 78 480 76 500 75 515 74
L 530 74 540 76 548 80 555 86 558 94 560 102 555 110
L 548 118 540 125 530 130 520 133 510 136 500 138
L 490 140 480 142 470 145

L 460 148 450 152 440 158 430 165
L 420 172 410 178 400 185 390 190 380 195 370 198
L 360 200 350 202 340 204 330 206 320 208
L 310 210 300 212 290 214 280 215 270 214
L 260 212 250 210 245 212 240 215 235 220
L 230 225 225 230 220 238 215 244

L 210 248 205 250 200 248 198 244
L 196 240 195 235 194 230 192 225
L 190 220 188 215 185 210 182 206
L 178 202 175 198 172 194 168 190
Z
`;

function MapPin({ cx, cy, isActive, onClick }: { cx: number; cy: number; isActive: boolean; onClick: () => void }) {
  return (
    <g onClick={onClick} className="cursor-pointer">
      <circle
        cx={cx} cy={cy} r={isActive ? 7 : 4}
        fill={isActive ? "#D4A843" : "rgba(212,168,67,0.6)"}
        stroke={isActive ? "#fff" : "rgba(212,168,67,0.3)"}
        strokeWidth={isActive ? 2 : 1}
        className="transition-all duration-300"
      />
      <circle
        cx={cx} cy={cy} r={isActive ? 14 : 9}
        fill="none"
        stroke={isActive ? "#D4A843" : "rgba(212,168,67,0.15)"}
        strokeWidth={1}
        className="transition-all duration-300"
      />
      <text
        x={cx} y={cy - (isActive ? 16 : 12)}
        textAnchor="middle"
        fill={isActive ? "#D4A843" : "rgba(255,255,255,0.5)"}
        fontSize={isActive ? 11 : 9}
        fontFamily="Manrope, sans-serif"
        fontWeight={isActive ? "bold" : "normal"}
        className="transition-all duration-300"
      >
        {offices.find((o) => o.x === cx && o.y === cy)?.name}
      </text>
    </g>
  );
}

export default function MapSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const activeData = offices.find((r) => r.name === activeRegion);

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
      <div className="relative bg-dark-800 rounded-xl border border-white/5 p-4 md:p-8 max-w-4xl mx-auto">
        <svg viewBox="100 60 500 240" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <path
            d={russiaPath}
            fill="rgba(212,168,67,0.08)"
            stroke="rgba(212,168,67,0.35)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d={russiaOutlinePath}
            fill="none"
            stroke="rgba(212,168,67,0.5)"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {offices.map((office) => (
            <MapPin
              key={office.name}
              cx={office.x}
              cy={office.y}
              isActive={activeRegion === office.name}
              onClick={() => setActiveRegion(office.name)}
            />
          ))}
        </svg>

        {activeData && (
          <motion.div
            className="absolute bottom-4 md:bottom-8 left-4 md:left-8 bg-dark-700 border border-gold/30 rounded-lg px-4 py-3"
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
        {offices.map((office) => (
          <button
            key={office.name}
            onClick={() => setActiveRegion(office.name)}
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
