"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type HouseType = "одноэтажный" | "двухэтажный" | "с мансардой" | null;
type Material = "кирпич" | "газоблок" | "дерево" | "каркас" | null;

const houseTypes = [
  { value: "одноэтажный" as const, label: "Одноэтажный", desc: "Компактное решение для семьи" },
  { value: "двухэтажный" as const, label: "Двухэтажный", desc: "Максимум полезной площади" },
  { value: "с мансардой" as const, label: "С мансардой", desc: "Экономично и уютно" },
];

const materials = [
  { value: "кирпич" as const, label: "Кирпич", icon: "🧱" },
  { value: "газоблок" as const, label: "Газоблок", icon: "🧊" },
  { value: "дерево" as const, label: "Дерево", icon: "🪵" },
  { value: "каркас" as const, label: "Каркас", icon: "🏗️" },
];

const options = [
  { value: "terrace", label: "Терраса" },
  { value: "garage", label: "Гараж" },
  { value: "secondLight", label: "Второй свет" },
  { value: "basement", label: "Цокольный этаж" },
];

function AnimatedPrice({ value }: { value: number }) {
  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 50, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    count.set(value);
  }, [value, count]);

  return (
    <motion.span className="text-5xl md:text-6xl font-heading font-bold text-gold">
      <motion.span>{rounded}</motion.span> ₽
    </motion.span>
  );
}

export default function CalculatorSection() {
  const [step, setStep] = useState(1);
  const [houseType, setHouseType] = useState<HouseType>(null);
  const [area, setArea] = useState(100);
  const [material, setMaterial] = useState<Material>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const resultRef = useRef<HTMLDivElement>(null);

  const toggleOption = (val: string) => {
    setSelectedOptions((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const calculatePrice = () => {
    const basePerM2 =
      material === "кирпич" ? 18000
      : material === "газоблок" ? 14000
      : material === "дерево" ? 16000
      : 12000;

    const typeFactor =
      houseType === "двухэтажный" ? 1.15
      : houseType === "с мансардой" ? 1.05
      : 1;

    const optionsCost = selectedOptions.length * 200000;

    return Math.round(area * basePerM2 * typeFactor + optionsCost);
  };

  const price = calculatePrice();
  const totalSteps = 4;

  const scrollToResult = () => {
    resultRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="calculator" className="py-24 px-4 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Калькулятор стоимости
      </motion.h2>

      <div className="flex justify-center gap-2 mb-10">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i < step ? "bg-gold w-10" : i === step ? "bg-gold/50 w-6" : "bg-white/10 w-6"
            }`}
          />
        ))}
      </div>

      <div className="bg-dark-800 border border-white/5 rounded-xl p-6 md:p-8">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-heading font-semibold text-white mb-6 text-center">
              Выберите тип дома
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {houseTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setHouseType(t.value)}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    houseType === t.value
                      ? "border-gold bg-gold/10"
                      : "border-white/10 hover:border-gold/50"
                  }`}
                >
                  <div className="text-lg font-heading font-semibold text-white mb-1">
                    {t.label}
                  </div>
                  <div className="text-sm text-white/50">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-heading font-semibold text-white mb-6 text-center">
              Площадь дома
            </h3>
            <div className="text-center">
              <div className="text-5xl font-heading font-bold text-gold mb-4">
                {area} м²
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full max-w-md accent-gold"
              />
              <div className="flex justify-between max-w-md mx-auto text-sm text-white/40 mt-2">
                <span>50 м²</span>
                <span>500 м²</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-heading font-semibold text-white mb-6 text-center">
              Выберите материал
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {materials.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMaterial(m.value)}
                  className={`p-6 rounded-xl border text-center transition-all ${
                    material === m.value
                      ? "border-gold bg-gold/10"
                      : "border-white/10 hover:border-gold/50"
                  }`}
                >
                  <div className="text-3xl mb-2">{m.icon}</div>
                  <div className="text-sm font-heading font-semibold text-white">
                    {m.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-heading font-semibold text-white mb-6 text-center">
              Дополнительные опции
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              {options.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOptions.includes(opt.value)
                      ? "border-gold bg-gold/10"
                      : "border-white/10 hover:border-gold/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(opt.value)}
                    onChange={() => toggleOption(opt.value)}
                    className="accent-gold"
                  />
                  <span className="text-white text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className={`px-6 py-3 rounded-lg border border-white/10 text-white/60 transition-all hover:border-gold/50 hover:text-gold ${
              step === 1 ? "invisible" : ""
            }`}
          >
            Назад
          </button>
          {step < totalSteps ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-8 py-3 bg-gold text-dark font-semibold rounded-lg transition-all hover:scale-105"
            >
              Далее
            </button>
          ) : (
            <button
              onClick={scrollToResult}
              className="px-8 py-3 bg-gold text-dark font-semibold rounded-lg transition-all hover:scale-105"
            >
              Получить смету
            </button>
          )}
        </div>
      </div>

      <div ref={resultRef} className="mt-10 text-center bg-dark-800 border border-white/5 rounded-xl p-8">
        <h3 className="text-lg text-white/60 mb-2">Ориентировочная стоимость</h3>
        <AnimatedPrice value={price} />
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/50 text-left max-w-lg mx-auto">
          <div>Площадь: {area} м²</div>
          <div>Тип: {houseType || "—"}</div>
          <div>Материал: {material || "—"}</div>
          <div>Опции: {selectedOptions.length || "—"}</div>
        </div>
      </div>
    </section>
  );
}
