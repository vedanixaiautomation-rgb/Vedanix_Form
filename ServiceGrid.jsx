import { motion } from "framer-motion";
import { services } from "../data/site";
import { Card } from "./ui/Card";

export function ServiceGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} viewport={{ once: true }}>
            <Card className="group h-full transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:shadow-glow">
              <Icon className="mb-5 text-cyan-200" size={30} />
              <h3 className="mb-3 text-lg font-black text-white light:text-slate-950">{service.title}</h3>
              <p className="text-sm leading-6 text-slate-400 light:text-slate-600">{service.text}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
