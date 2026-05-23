import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="border-t border-cyan-200/10 bg-slate-950/75 py-12 light:bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[1.3fr_.8fr_.8fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3 font-black text-white light:text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/30 bg-cyan-300/10 text-cyan-200">V</span>
            Vedanix AI & Automation
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400 light:text-slate-600">Premium AI automation, intelligent chatbots, SaaS products, and secure business workflow systems.</p>
          <div className="mt-5 flex gap-3 text-cyan-200">
            <Linkedin size={19} /><Twitter size={19} /><Github size={19} /><Mail size={19} />
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Quick Links</h3>
          <div className="grid gap-2 text-sm text-slate-400 light:text-slate-600">
            <Link to="/services">Services</Link>
            <Link to="/projects">Portfolio</Link>
            <Link to="/contact">Book Consultation</Link>
            <Link to="/login">Admin</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Neural Dispatch</h3>
          <NewsletterForm />
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-sm text-slate-500 sm:px-6 lg:px-8">Copyright {new Date().getFullYear()} Vedanix AI & Automation. All rights reserved.</div>
    </footer>
  );
}
