import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import { Card } from "../components/ui/Card";
import { api } from "../lib/api";

const fallbackPosts = [
  { title: "How AI Automation Reduces Operational Drag", category: "Automation", excerpt: "A practical guide to finding workflows that are ready for AI assistance.", tags: ["AI", "Ops"] },
  { title: "Building Chatbots That Do Real Work", category: "Chatbots", excerpt: "What separates a helpful AI assistant from a floating FAQ widget.", tags: ["Chatbot", "LLM"] }
];

export function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    api("/blog").then((data) => data.length && setPosts(data)).catch(() => {});
  }, []);

  return (
    <Section eyebrow="Blog" title="Field notes on AI, automation, and premium SaaS systems.">
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug || post.title}>
            <div className="text-sm font-bold text-cyan-200">{post.category}</div>
            <h3 className="mt-3 text-2xl font-black">{post.title}</h3>
            <p className="mt-3 text-slate-400 light:text-slate-600">{post.excerpt}</p>
            <div className="mt-5 flex gap-2">{post.tags?.map((tag) => <span key={tag} className="rounded-lg bg-white/10 px-3 py-1 text-xs">{tag}</span>)}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
