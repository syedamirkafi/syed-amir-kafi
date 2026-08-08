import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { profile } from "../data/profile.js";
import { withBase } from "../lib/base.js";
import { NAV_SECTIONS, goToSection, useActiveSection } from "../lib/sections.js";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.5h4.56V23H.22V8.5zM8.34 8.5h4.37v1.98h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7V23h-4.55v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23H8.34V8.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.14c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18.92-.26 1.9-.38 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function NavAnchor({ id, label, number, onNavigate }) {
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
      className={`group flex items-baseline gap-3 py-1.5 text-[0.85rem] font-medium transition-colors ${
        isActive
          ? "text-ink"
          : "text-soft hover:text-ink"
      }`}
    >
      <span
        className={`mono text-[0.65rem] tabular-nums transition-colors ${
          isActive ? "text-accent" : "text-muted group-hover:text-soft"
        }`}
      >
        {number}
      </span>
      <span className="relative">
        {label}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </span>
    </a>
  );
}

export default function Rail() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      className="hidden lg:flex fixed top-0 bottom-0 left-0 w-14rem border-r border-border bg-base/80 backdrop-blur-md z-40"
      style={{ width: "14rem" }}
    >
      <div className="flex flex-col h-full px-7 py-8 w-full">
        {/* Brand monogram */}
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: hasScrolled ? "smooth" : "auto" });
          }}
          className="block mb-10"
        >
          <div className="serif text-2xl leading-none tracking-tight text-ink">
            Amir
          </div>
          <div className="h-px w-7 my-1 bg-ink/70" />
          <div className="serif text-2xl leading-none tracking-tight text-ink">
            Kafi
          </div>
          <div className="label-mono text-muted text-[0.6rem] mt-3">
            Business Analyst
          </div>
        </Link>

        {/* Sectioned nav */}
        <nav className="flex flex-col gap-0.5">
          {NAV_SECTIONS.map((s) => (
            <NavAnchor
              key={s.id}
              id={s.id}
              label={s.label}
              number={s.number}
            />
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          {/* Availability dot */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent kf-pulse" />
            <span className="label-mono text-soft text-[0.6rem]">
              Open to BA roles
            </span>
          </div>

          {/* Resume button */}
          <a
            href={withBase(profile.cvUrl)}
            target="_blank"
            rel="noreferrer"
            className="block text-center rounded-full bg-ink text-base text-[0.75rem] font-medium px-4 py-2.5 transition-colors hover:bg-ink/85"
          >
            Résumé ↓
          </a>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-soft hover:text-ink transition-colors"
            >
              <LinkedInIcon />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-soft hover:text-ink transition-colors"
            >
              <GitHubIcon />
            </a>
            <span className="ml-auto label-mono text-muted text-[0.58rem]">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
