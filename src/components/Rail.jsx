import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NAV_SECTIONS, goToSection, useActiveSection } from "../lib/sections.js";

function useScrollProgress() {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") {
      setProgress(0);
      return;
    }
    let raf;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return progress;
}

function Dot({ id, label }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const active = useActiveSection();
  const isActive = pathname === "/" && active === id;

  return (
    <a
      href={`#${id}`}
      aria-label={label}
      onClick={(e) => {
        e.preventDefault();
        if (pathname === "/") goToSection(id);
        else navigate("/", { state: { scrollTo: id } });
      }}
      className="group relative flex items-center py-0.5"
    >
      <span
        className={`block h-1.5 rounded-full transition-all duration-300 ${
          isActive
            ? "w-5 bg-accent"
            : "w-1.5 bg-border-strong group-hover:bg-soft group-hover:w-3"
        }`}
      />
      <span
        className={`pointer-events-none absolute left-6 whitespace-nowrap rounded-full bg-base/90 px-2 py-0.5 label-mono text-[0.6rem] backdrop-blur transition-all duration-200 ${
          isActive
            ? "opacity-100 translate-x-0 text-ink"
            : "opacity-0 -translate-x-1 text-muted group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-soft group-focus-visible:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:text-soft"
        }`}
      >
        {label}
      </span>
    </a>
  );
}

export default function Rail() {
  const progress = useScrollProgress();

  return (
    <nav
      aria-label="Sections"
      className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
    >
      <div className="relative flex flex-col gap-3.5">
        <span
          aria-hidden="true"
          className="absolute left-[2.5px] top-1 bottom-1 w-px bg-border rounded-full"
        />
        <span
          aria-hidden="true"
          className="absolute left-[2.5px] top-1 w-px bg-accent rounded-full transition-[height] duration-150 ease-out"
          style={{ height: `calc((100% - 0.5rem) * ${progress})` }}
        />
        {NAV_SECTIONS.map((s) => (
          <Dot key={s.id} id={s.id} label={s.label} />
        ))}
      </div>
    </nav>
  );
}
