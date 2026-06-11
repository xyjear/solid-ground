"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const categories = ["Все", "Дома", "Коттеджи", "Коммерция"] as const;
type Category = (typeof categories)[number];

const projects = [
  {
    id: 1,
    title: "Дом у озера",
    area: "235 м²",
    type: "Дома" as Category,
    img: "https://images.unsplash.com/photo-1627141234469-24711efb373c?w=600&h=400&fit=crop",
    description:
      "Двухэтажный дом из газоблока с панорамным остеклением и выходом на террасу. Монолитный фундамент, кровля из металлочерепицы. Выполнена внутренняя отделка, проведено отопление и водоснабжение. Участок — 12 соток, кадастровый номер 50:01:0000000:123.",
    highlights: ["Панорамные окна 6×2.5 м", "Терраса 40 м²", "Газоблок D500"],
  },
  {
    id: 2,
    title: "Коттедж «Сосновый»",
    area: "320 м²",
    type: "Коттеджи" as Category,
    img: "https://images.unsplash.com/photo-1719318701187-4f118bf4ecdd?w=600&h=400&fit=crop",
    description:
      "Кирпичный коттедж в окружении соснового леса. Цокольный этаж с техническими помещениями, первый этаж — кухня-гостиная 80 м² с камином, второй этаж — четыре спальни. Фасад облицован клинкерной плиткой. Придомовая территория — ландшафтный дизайн, мощение гранитом.",
    highlights: ["Камин с порталом из мрамора", "Клинкерный фасад", "Цокольный этаж 80 м²"],
  },
  {
    id: 3,
    title: "Офисный центр West",
    area: "1 200 м²",
    type: "Коммерция" as Category,
    img: "https://images.unsplash.com/photo-1624213012413-fda54df1810f?w=600&h=400&fit=crop",
    description:
      "Трёхэтажное офисное здание класса B+ с подземным паркингом на 20 машин. Каркас из монолитного железобетона, навесной вентилируемый фасад. Открытая планировка этажей, панорамное остекление, система климат-контроля. Объект сдан в 2024 году.",
    highlights: ["Подземный паркинг 20 м/м", "Вентилируемый фасад", "Климат-контроль"],
  },
  {
    id: 4,
    title: "Дом «Берёзовая роща»",
    area: "185 м²",
    type: "Дома" as Category,
    img: "https://images.unsplash.com/photo-1772313952254-dae19b91854b?w=600&h=400&fit=crop",
    description:
      "Одноэтажный дом из клеёного бруса 200×200 мм для постоянного проживания. Тёплый чердак, открытая веранда, терраса с барбекю. Инженерные системы — автономное отопление, септик. Срок строительства — 7 месяцев. Проект реализован в Московской области, Рузский район.",
    highlights: ["Клеёный брус 200 мм", "Автономное отопление", "Срок 7 месяцев"],
  },
  {
    id: 5,
    title: "Коттеджный посёлок «Ключи»",
    area: "280 м²",
    type: "Коттеджи" as Category,
    img: "https://images.unsplash.com/photo-1694793991685-4f6521a5e78f?w=600&h=400&fit=crop",
    description:
      "Головной дом в коттеджном посёлке — образцовый проект застройки. Каркасная технология с утеплением 250 мм, финишная отделка — штукатурный фасад. Внутри: гостиная с вторым светом, кабинет, мастер-спальня с гардеробной. Энергоэффективность класса А.",
    highlights: ["Второй свет 6 м высота", "Энергоэффективность А", "Каркас 250 мм утепление"],
  },
  {
    id: 6,
    title: "Торговый центр «Рынок»",
    area: "3 500 м²",
    type: "Коммерция" as Category,
    img: "https://images.unsplash.com/photo-1772386051129-24e70e7dfdf9?w=600&h=400&fit=crop",
    description:
      "Двухэтажный торговый центр с арендными помещениями от 20 до 500 м². Сборный железобетонный каркас, витражное остекление витрин, парковка на 80 машин. Объект полностью сдан в аренду. Пропускная способность — до 1 500 человек в день.",
    highlights: ["Витражное остекление", "Парковка 80 м/м", "Сдан в аренду 100%"],
  },
];

function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[number];
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-dark-800 border border-white/5"
      onClick={onClick}
      layoutId={`project-${project.id}`}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.div style={{ scale }} className="w-full h-full">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <div className="bg-gold text-dark px-3 py-1 rounded text-sm font-semibold self-start mb-2">
            {project.type}
          </div>
          <h3 className="text-white font-heading font-bold text-lg">
            {project.title}
          </h3>
          <span className="text-white/70 text-sm">{project.area}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [active, setActive] = useState<Category>("Все");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(
    null
  );

  const filtered =
    active === "Все"
      ? projects
      : projects.filter((p) => p.type === active);

  const handleOpen = (project: (typeof projects)[number]) => {
    setSelected(project);
    setModalOpen(true);
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Наши проекты
      </motion.h2>
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              active === cat
                ? "bg-gold text-dark"
                : "border border-white/10 text-white/60 hover:border-gold/50 hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onClick={() => handleOpen(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selected && (
          <div className="bg-dark-800 rounded-xl overflow-hidden">
            <div className="relative h-64 md:h-80">
              <Image
                src={selected.img}
                alt={selected.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8 space-y-5">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                {selected.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                <span>Площадь: {selected.area}</span>
                <span className="text-gold">{selected.type}</span>
              </div>
              <p className="text-white/50 leading-relaxed">
                {selected.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-md text-xs text-gold"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
