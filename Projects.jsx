import { ExternalLink, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Section } from "../components/Section";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { fallbackProjects } from "../data/site";
import { api } from "../lib/api";

export function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    api("/projects").then((data) => data.length && setProjects(data)).catch(() => {});
  }, []);

  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((project) => project.category === filter)), [filter, projects]);

  return (
    <Section eyebrow="Portfolio" title="Modern project showcases built for automation-first companies.">
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan-200"><SlidersHorizontal size={16} /> Filter</span>
        {categories.map((category) => (
          <button key={category} onClick={() => setFilter(category)} className={`rounded-lg border px-4 py-2 text-sm font-bold ${filter === category ? "border-cyan-200 bg-cyan-300 text-slate-950" : "border-cyan-200/20 bg-white/5"}`}>{category}</button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((project) => (
          <Card key={project.slug || project.title} className="group transition hover:-translate-y-1 hover:shadow-glow">
            <div className="mb-5 h-44 rounded-lg border border-cyan-200/15 bg-[linear-gradient(135deg,rgba(34,211,238,.18),rgba(255,255,255,.05))]" />
            <div className="text-sm font-bold text-cyan-200">{project.category}</div>
            <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
            <p className="mt-3 text-slate-400 light:text-slate-600">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">{project.tags?.map((tag) => <span key={tag} className="rounded-lg bg-white/10 px-3 py-1 text-xs">{tag}</span>)}</div>
            <Button as="a" href={project.liveUrl || "#"} target="_blank" rel="noreferrer" variant="outline" className="mt-6">Live Preview <ExternalLink size={16} /></Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}
