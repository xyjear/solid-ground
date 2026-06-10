"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Modal from "./Modal";

const categories = ["Все", "Дома", "Коттеджи", "Коммерция"] as const;
type Category = (typeof categories)[number];

const projects = [
  {
    id: 1,
    title: "Дом у озера",
    area: "235 м²",
    type: "Дома" as Category,
    img: "https://picsum.photos/seed/house1/600/400",
  },
  {
    id: 2,
    title: "Коттедж «Сосновый»",
    area: "320 м²",
    type: "Коттеджи" as Category,
    img: "https://picsum.photos/seed/cottage1/600/400",
  },
  {
    id: 3,
    title: "Офисный центр West",
    area: "1 200 м²",
    type: "Коммерция" as Category,
    img: "https://picsum.photos/seed/office1/600/400",
  },
  {
    id: 4,
    title: "Дом «Берёзовая роща»",
    area: "185 м²",
    type: "Дома" as Category,
    img: "https://picsum.photos/seed/house2/600/400",
  },
  {
    id: 5,
    title: "Коттеджный посёлок «Ключи»",
    area: "280 м²",
    type: "Коттеджи" as Category,
    img: "https://picsum.photos/seed/cottage2/600/400",
  },
  {
    id: 6,
    title: "Торговый центр «Рынок»",
    area: "3 500 м²",
    type: "Коммерция" as Category,
    img: "https://picsum.photos/seed/commercial1/600/400",
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
    <section id="portfolio" className="py-24 px-4 max-w-6xl mx-auto">
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
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleOpen(project)}
          />
        ))}
      </motion.div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selected && (
          <div className="bg-dark-800 rounded-xl overflow-hidden">
            <div className="relative h-80">
              <Image
                src={selected.img}
                alt={selected.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                {selected.title}
              </h3>
              <div className="flex gap-4 text-white/60 text-sm mb-4">
                <span>Площадь: {selected.area}</span>
                <span className="text-gold">{selected.type}</span>
              </div>
              <p className="text-white/50 leading-relaxed">
                Подробная информация об объекте. Фотографии, планировки и
                используемые материалы — по запросу.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
