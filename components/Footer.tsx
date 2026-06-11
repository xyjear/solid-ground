"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-2xl font-heading font-bold text-gold">
            SolidGround
          </span>
          <p className="text-white/40 text-sm mt-1">
            © {new Date().getFullYear()} SolidGround. Все права защищены.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#services" className="text-white/50 hover:text-gold transition-colors">
            Услуги
          </a>
          <a href="#portfolio" className="text-white/50 hover:text-gold transition-colors">
            Проекты
          </a>
          <a href="#about" className="text-white/50 hover:text-gold transition-colors">
            О нас
          </a>
          <a href="#contact" className="text-white/50 hover:text-gold transition-colors">
            Контакты
          </a>
          <button onClick={(e) => e.preventDefault()} className="bg-transparent border-none text-white/30 hover:text-gold transition-colors cursor-pointer">
            Политика конфиденциальности
          </button>
        </nav>
      </div>
    </footer>
  );
}
