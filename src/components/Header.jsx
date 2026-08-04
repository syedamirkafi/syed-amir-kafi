import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { profile } from "../data/profile.js";
import { ThemeToggle } from "./ThemeToggle.jsx";

const NAV_ITEMS = [
  { n: "02", label: "PROJECTS", to: "/projects" },
  { n: "03", label: "WINS", to: "/wins" },
  { n: "04", label: "ABOUT", to: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 h-12 border-b border-ink/5 bg-base/80 backdrop-blur-sm">
      <Link
        to="/"
        className="label-mono font-semibold tracking-tight text-xs sm:text-sm text-ink/70 hover:text-ink transition-colors"
      >
        {profile.nameShort}
      </Link>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="label-mono text-[0.65rem] px-2.5 py-1.5 border border-ink/30 hover:border-ink transition-colors sm:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
      <nav
        className={`fixed top-12 left-0 right-0 border-b border-ink/10 bg-base/95 backdrop-blur-sm sm:hidden transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.n}
            to={item.to}
            className={`flex items-center gap-3 px-4 sm:px-6 py-4 label-mono text-sm border-b border-ink/5 transition-colors ${
              pathname.startsWith(item.to)
                ? "text-vital bg-ink/3"
                : "text-ink/60 hover:text-ink hover:bg-ink/3"
            }`}
          >
            <span className="text-ink/30">{item.n}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
