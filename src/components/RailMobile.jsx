import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { profile } from "../data/profile.js";
import { withBase } from "../lib/base.js";
import { NAV_SECTIONS, goToSection, useActiveSection } from "../lib/sections.js";

function SheetAnchor({ id, label, number, onNavigate }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = useActiveSection();
  const isActive = pathname === "/" && active === id;

  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        if (pathname === "/") goToSection(id);
        else navigate("/", { state: { scrollTo: id } });
        onNavigate?.();
      }}
      className={`flex items-baseline gap-3 py-2 text-[0.95rem] font-medium transition-colors ${
        isActive ? "text-ink" : "text-soft hover:text-ink"
      }`}
    >
      <span
        className={`mono text-[0.7rem] tabular-nums ${
          isActive ? "text-accent" : "text-muted"
        }`}
      >
        {number}
      </span>
      {label}
    </a>
  );
}

export default function RailMobile() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-base/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-5 py-3.5">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-baseline gap-1.5 serif text-lg tracking-tight text-ink"
          >
            Amir
            <span className="h-px w-3 self-center bg-ink/50" />
            Kafi
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={withBase(profile.cvUrl)}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-block rounded-full bg-ink text-base text-[0.72rem] font-medium px-3.5 py-1.5"
            >
              Résumé ↓
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-ink hover:bg-card transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7" x2="21" y2="7" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sheet menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-40 w-[min(20rem,100%)] bg-base border-l border-border transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="flex flex-col h-full px-6 pt-20 pb-8 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <nav className="flex flex-col">
            {NAV_SECTIONS.map((s) => (
              <SheetAnchor
                key={s.id}
                id={s.id}
                label={s.label}
                number={s.number}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-border flex flex-col gap-3">
            <a
              href={withBase(profile.cvUrl)}
              target="_blank"
              rel="noreferrer"
              className="block text-center rounded-full bg-ink text-base text-[0.78rem] font-medium px-4 py-2.5"
            >
              Résumé ↓
            </a>
            <div className="flex items-center gap-5 text-sm text-soft">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors">
                GitHub
              </a>
              <a href={`mailto:${profile.email}`} className="hover:text-ink transition-colors">
                Email
              </a>
            </div>
            <span className="label-mono text-muted text-[0.58rem] mt-2">
              © {new Date().getFullYear()} · Syed Amir Kafi
            </span>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-ink/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
