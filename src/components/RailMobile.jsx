import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { profile } from "../data/profile.js";
import { withBase } from "../lib/base.js";
import { NAV_SECTIONS, goToSection, useActiveSection } from "../lib/sections.js";
import ThemeToggle from "./ThemeToggle.jsx";

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
      className={`flex items-baseline gap-3 py-4 px-2 text-[1rem] font-medium transition-colors ${
        isActive ? "text-ink" : "text-soft hover:text-ink"
      }`}
    >
      <span
        className={`mono text-[0.8rem] tabular-nums shrink-0 w-8 ${
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
  const sheetRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      // Focus trap
      const focusableElements = sheetRef.current?.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0];
      const lastElement = focusableElements?.[focusableElements.length - 1];
      firstElement?.focus();

      const handleTab = (e) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };
      document.addEventListener("keydown", handleTab);
      const handleEscape = (e) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleTab);
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        previousActiveElement.current?.focus();
      };
    }
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 glass border-b border-border"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <Link
            to="/"
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
              className="hidden sm:inline-block rounded-full bg-ink text-paper text-[0.72rem] font-medium px-3.5 py-1.5"
            >
              Résumé ↓
            </a>
            <ThemeToggle className="flex" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-border text-ink hover:bg-card transition-colors touch-manipulation"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
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
        id="mobile-menu"
        ref={sheetRef}
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-40 w-[min(22rem,100%)] glass-strong border-l border-border transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className="flex flex-col h-full px-6 pt-20 pb-8 overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <nav className="flex flex-col" role="navigation" aria-label="Main navigation">
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

          <div className="mt-auto pt-8 border-t border-border flex flex-col gap-4">
            <a
              href={withBase(profile.cvUrl)}
              target="_blank"
              rel="noreferrer"
              className="block text-center rounded-full bg-ink text-paper text-[0.85rem] font-medium px-4 py-3 touch-manipulation"
              style={{ minHeight: "44px" }}
            >
              Résumé ↓
            </a>
            <div className="flex items-center gap-6 text-sm text-soft">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors touch-manipulation" style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
                LinkedIn ↗
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors touch-manipulation" style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
                GitHub ↗
              </a>
              <a href={`mailto:${profile.email}`} className="hover:text-ink transition-colors touch-manipulation" style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
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
          aria-hidden="true"
        />
      )}
    </>
  );
}
