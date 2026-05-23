import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/Button";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const navClass = ({ isActive }) => `text-sm font-semibold transition ${isActive ? "text-cyan-200" : "text-slate-300 hover:text-white light:text-slate-700"}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-200/10 bg-slate-950/55 backdrop-blur-xl light:bg-white/75">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-200/30 bg-cyan-300/10 font-black text-cyan-200">V</span>
          <span className="font-black text-white light:text-slate-950">Vedanix</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} className={navClass}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="h-10 w-10 px-0" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button as={Link} to="/login" variant="outline">Admin</Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-cyan-200/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} className={navClass} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <Button as={Link} to="/login" variant="outline">Admin Login</Button>
          </div>
        </div>
      )}
    </header>
  );
}
