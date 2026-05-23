import { Bot, BrainCircuit, Cable, Code2, Cpu, Layers3, Network, Workflow } from "lucide-react";

export const services = [
  { title: "AI Automation", icon: Cpu, text: "Automate decisions, routing, summaries, and repetitive operational work." },
  { title: "Chatbot Development", icon: Bot, text: "Custom support, sales, and internal copilots trained around business flows." },
  { title: "Workflow Automation", icon: Workflow, text: "Multi-step approval, notification, and task systems that remove manual drag." },
  { title: "AI Integrations", icon: BrainCircuit, text: "Connect LLMs with CRMs, ERPs, documents, and data sources." },
  { title: "Web Development", icon: Code2, text: "Premium web apps, portals, dashboards, and conversion-focused sites." },
  { title: "SaaS Solutions", icon: Layers3, text: "Scalable SaaS products with billing-ready architecture and admin tooling." },
  { title: "API Automation", icon: Cable, text: "Reliable API orchestration, webhooks, queues, and third-party syncs." },
  { title: "Business Process Automation", icon: Network, text: "Map, measure, and modernize core processes with secure automation." }
];

export const fallbackProjects = [
  { title: "AI Sales Copilot", category: "AI Automation", summary: "Lead scoring, CRM enrichment, and contextual follow-up drafts.", tags: ["CRM", "LLM", "Sales"] },
  { title: "Support Bot Matrix", category: "Chatbot Development", summary: "A 24/7 customer support bot with escalation and knowledge search.", tags: ["Chatbot", "Support"] },
  { title: "SaaS Ops Console", category: "SaaS Solutions", summary: "Admin console with analytics, user management, and billing-ready modules.", tags: ["SaaS", "Dashboard"] },
  { title: "Workflow Nexus", category: "Workflow Automation", summary: "Cross-team approvals, reminders, and Slack/email notifications.", tags: ["Workflow", "API"] }
];

export const testimonials = [
  { name: "Aarav Mehta", role: "Founder, NovaOps", quote: "Vedanix turned scattered operations into a single intelligent workflow. The speed difference was immediate." },
  { name: "Riya Sharma", role: "COO, FinPilot", quote: "Their chatbot work felt like a real product team was inside our company, not an agency handoff." },
  { name: "Daniel Brooks", role: "CEO, CloudAxis", quote: "Premium design, serious backend thinking, and automation that actually survived real users." }
];
