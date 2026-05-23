import { motion } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Cpu, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "../components/Section";
import { ServiceGrid } from "../components/ServiceGrid";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { testimonials } from "../data/site";

function HeroVisual() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-cyan-200/20 bg-slate-950/45 p-6 shadow-glow">
      <div className="absolute inset-0 grid-bg opacity-80" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-cyan-300/5 to-transparent animate-scan" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40" />
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/35 bg-cyan-300/10 shadow-glow">
        <Cpu size={58} className="text-cyan-200" />
      </motion.div>
      {["CRM", "API", "LLM", "SaaS", "Ops"].map((item, index) => (
        <motion.span key={item} animate={{ y: [0, -12, 0] }} transition={{ duration: 3 + index * 0.3, repeat: Infinity }} className="absolute rounded-lg border border-cyan-200/20 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100" style={{ left: `${12 + index * 17}%`, top: `${18 + (index % 2) * 54}%` }}>{item}</motion.span>
      ))}
    </div>
  );
}

export function Home() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100"><Sparkles size={16} /> Futuristic AI systems for modern teams</div>
            <h1 className="neon-text text-5xl font-black leading-tight text-white light:text-slate-950 md:text-7xl">Powering the Future with AI & Automation</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 light:text-slate-600">Vedanix builds intelligent automation, premium SaaS interfaces, AI chatbots, and secure API systems that help businesses move faster with less manual work.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button as={Link} to="/contact">Get Started <ArrowRight size={18} /></Button>
              <Button as={Link} to="/contact" variant="outline"><Calendar size={18} /> Book Consultation</Button>
            </div>
          </motion.div>
          <HeroVisual />
        </div>
      </section>
      <Section eyebrow="Capabilities" title="Automation architecture with a premium product surface." text="From idea to deployment, Vedanix combines business process thinking, modern UI, and robust backend systems.">
        <ServiceGrid />
      </Section>
      <Section eyebrow="Proof" title="Trusted by teams building the next operating layer.">
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <CheckCircle2 className="mb-4 text-cyan-200" />
              <p className="text-slate-300 light:text-slate-700">"{item.quote}"</p>
              <div className="mt-5 font-bold">{item.name}</div>
              <div className="text-sm text-slate-400">{item.role}</div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
