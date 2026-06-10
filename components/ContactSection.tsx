"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socials = [
  {
    name: "Telegram",
    href: "#",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "#",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "VK",
    href: "#",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M15.684 0H8.316C2.755 0 0 2.755 0 8.316v7.368C0 21.245 2.755 24 8.316 24h7.368C21.245 24 24 21.245 24 15.684V8.316C24 2.755 21.245 0 15.684 0zm3.472 17.2h-1.643c-.677 0-.801-.525-2.027-1.753-1.016-.997-1.465-1.137-1.708-1.137-.34 0-.447.108-.447.524v1.304c0 .397-.156.612-1.155.612-1.676 0-3.542-1.033-4.856-2.956C5.036 11.118 4.546 9.39 4.546 8.53c0-.438.156-.658.564-.658h1.643c.415 0 .575.187.733.612.81 2.212 2.163 4.153 2.72 4.153.208 0 .294-.085.294-.563v-2.184c-.073-1.025-.597-1.104-.597-1.466 0-.182.137-.346.36-.346h2.588c.31 0 .415.158.415.528v2.756c0 .317.14.415.233.415.19 0 .344-.107.672-.43 1.018-1.064 1.756-2.768 1.756-2.768.09-.213.238-.38.641-.38h1.643c.447 0 .55.242.447.57-.192.65-2.555 3.806-2.555 3.806-.244.368-.1.57 0 .775.23.37 1.4 1.398 1.4 2.789 0 .748-.553 1.132-.877 1.132z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-heading font-bold text-center bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 bg-clip-text text-transparent mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Свяжитесь с нами
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-12">
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-dark-800 border border-white/5 rounded-xl p-8 space-y-6"
        >
          {(["name", "phone", "email"] as const).map((field) => (
            <div key={field} className="relative">
              <input
                id={field}
                type={field === "email" ? "email" : "text"}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full bg-transparent border-b border-white/20 pb-2 pt-6 text-white outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:rounded transition-colors peer"
                required
                aria-required="true"
                placeholder=" "
              />
              <label
                htmlFor={field}
                className="absolute left-0 top-4 text-white/40 text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {field === "name" ? "Имя"
                  : field === "phone" ? "Телефон"
                  : "Email"}
              </label>
            </div>
          ))}
          <div className="relative">
            <textarea
              id="comment"
              value={form.comment}
              onChange={(e) =>
                setForm({ ...form, comment: e.target.value })
              }
              rows={4}
              className="w-full bg-transparent border-b border-white/20 pb-2 pt-6 text-white outline-none focus:border-gold transition-colors resize-none peer"
              placeholder=" "
            />
            <label
              htmlFor="comment"
              className="absolute left-0 top-4 text-white/40 text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Комментарий
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gold text-dark font-semibold rounded-lg transition-all hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Отправка...
              </>
            ) : (
              "Отправить заявку"
            )}
          </button>
          <AnimatePresence>
            {success && (
              <motion.div
                className="text-center text-green-400 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✓ Заявка отправлена!
              </motion.div>
            )}
          </AnimatePresence>
        </form>
        <div className="flex-1 space-y-6">
          <div className="bg-dark-800 border border-white/5 rounded-xl p-8 space-y-6">
            <div>
              <div className="text-gold text-sm font-semibold mb-1">Телефон</div>
              <a href="tel:+74951234567" className="text-white hover:text-gold transition-colors">
                +7 (495) 123-45-67
              </a>
            </div>
            <div>
              <div className="text-gold text-sm font-semibold mb-1">Email</div>
              <a href="mailto:info@solid-ground.ru" className="text-white hover:text-gold transition-colors">
                info@solid-ground.ru
              </a>
            </div>
            <div>
              <div className="text-gold text-sm font-semibold mb-1">Адрес</div>
              <div className="text-white/60">
                г. Москва, ул. Строителей, д. 15, офис 301
              </div>
            </div>
            <div>
              <div className="text-gold text-sm font-semibold mb-3">Соцсети</div>
              <div className="flex gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-white/40 hover:border-gold hover:text-gold transition-all"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
