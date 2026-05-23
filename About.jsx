import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { Card } from "../components/ui/Card";

const stats = [["48+", "Automations mapped"], ["72%", "Avg. manual work reduction"], ["24/7", "AI workflow availability"], ["4x", "Faster inquiry handling"]];

export function About() {
  return (
    <Section eyebrow="About Vedanix" title="We design intelligent systems that make companies feel lighter, faster, and more precise." text="Our mission is to help businesses adopt AI with real operational value: measurable workflows, secure integrations, and interfaces that teams enjoy using. Our vision is an enterprise stack where every repeated decision has an intelligent assistant nearby.">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-2xl font-black">Why Vedanix AI & Automation</h3>
          <p className="leading-7 text-slate-400 light:text-slate-600">We blend product design, backend engineering, and automation strategy. That means your chatbot, dashboard, integration, or SaaS module is not just visually sharp; it is connected to the systems that actually run the business.</p>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map(([value, label], index) => (
            <motion.div key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
              <Card>
                <div className="text-4xl font-black text-cyan-200">{value}</div>
                <div className="mt-2 text-sm text-slate-400 light:text-slate-600">{label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
