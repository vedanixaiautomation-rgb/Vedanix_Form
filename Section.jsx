import { motion } from "framer-motion";

export function Section({ eyebrow, title, text, children, className = "" }) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || text) && (
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 max-w-3xl">
            {eyebrow && <p className="mb-3 text-sm font-bold uppercase text-cyan-200">{eyebrow}</p>}
            {title && <h2 className="text-3xl font-black text-white light:text-slate-950 md:text-5xl">{title}</h2>}
            {text && <p className="mt-4 text-base leading-7 text-slate-400 light:text-slate-600">{text}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
