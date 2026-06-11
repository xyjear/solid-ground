"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const offices = [
  { name: "Москва", objects: 28, coords: [55.76, 37.62] },
  { name: "Санкт-Петербург", objects: 15, coords: [59.93, 30.32] },
  { name: "Краснодар", objects: 12, coords: [45.04, 38.98] },
  { name: "Казань", objects: 9, coords: [55.79, 49.11] },
  { name: "Екатеринбург", objects: 7, coords: [56.84, 60.65] },
  { name: "Новосибирск", objects: 5, coords: [55.01, 82.92] },
  { name: "Ростов-на-Дону", objects: 6, coords: [47.23, 39.72] },
  { name: "Калининград", objects: 3, coords: [54.71, 20.51] },
];

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
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 160, center: [60, 60] }}
          viewBox="0 0 800 500"
          className="w-full h-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies
                .filter((g: any) => g.properties.iso_a3 === "RUS")
                .map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(212,168,67,0.08)"
                    stroke="rgba(212,168,67,0.3)"
                    strokeWidth={1}
                  />
                ))
            }
          </Geographies>
          {offices.map((office) => (
            <Marker
              key={office.name}
              coordinates={office.coords}
              onClick={() => setActiveRegion(office.name)}
            >
              <circle
                r={activeRegion === office.name ? 8 : 5}
                fill={activeRegion === office.name ? "#D4A843" : "rgba(212,168,67,0.5)"}
                stroke={activeRegion === office.name ? "#D4A843" : "rgba(212,168,67,0.2)"}
                strokeWidth={2}
                className="transition-all duration-300 cursor-pointer"
              />
              <text
                textAnchor="middle"
                y={-12}
                fill={activeRegion === office.name ? "#D4A843" : "rgba(255,255,255,0.5)"}
                fontSize={10}
                fontFamily="Manrope, sans-serif"
                fontWeight={activeRegion === office.name ? "bold" : "normal"}
              >
                {office.name}
              </text>
            </Marker>
          ))}
        </ComposableMap>

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
